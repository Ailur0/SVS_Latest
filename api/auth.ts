export const config = { runtime: 'edge' };

export default function handler(request: Request): Response {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response('Missing GITHUB_OAUTH_CLIENT_ID environment variable', { status: 500 });
  }

  const requestUrl = new URL(request.url);
  const scope = requestUrl.searchParams.get('scope') || 'repo,user';

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('scope', scope);

  return Response.redirect(authorizeUrl.toString(), 302);
}
