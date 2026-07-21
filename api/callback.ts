export const config = { runtime: 'edge' };

function renderPostMessage(status: 'success' | 'error', payload: Record<string, string>): string {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const safeMessage = JSON.stringify(message).replace(/</g, '\\u003c');

  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(${safeMessage}, e.origin);
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`;
}

export default async function handler(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  const html = await (async () => {
    if (!code || !clientId || !clientSecret) {
      return renderPostMessage('error', { message: 'Missing authorization code or OAuth app credentials.' });
    }

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || tokenData.error || !tokenData.access_token) {
      const message = tokenData.error_description || 'GitHub did not return an access token.';
      return renderPostMessage('error', { message });
    }

    return renderPostMessage('success', { token: tokenData.access_token, provider: 'github' });
  })();

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
