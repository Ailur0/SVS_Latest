import { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Clock, ChevronRight, ArrowLeft, ArrowRight, Share2, Linkedin, Link2, Check, MessageCircle, Twitter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { blogPosts, getBlogPost } from '@/data/blogPosts';

const SITE_URL = 'https://www.svspolymerinds.com';

const categoryColors: Record<string, string> = {
  Materials: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Packaging Design': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  'Food Grade': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Manufacturing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Procurement: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  Sustainability: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function extractFAQs(content: string): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = [];
  const lines = content.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    const qMatch = line.match(/^\*\*Q\d+\.\s*(.+?)\*\*$/);
    if (qMatch) {
      const question = qMatch[1].replace(/\?$/, '') + '?';
      const answerLines: string[] = [];
      i++;
      while (i < lines.length) {
        const next = lines[i].trim();
        if (next.match(/^\*\*Q\d+\./) || next.startsWith('##') || next.startsWith('---')) break;
        if (next) answerLines.push(next);
        i++;
      }
      if (answerLines.length > 0) {
        faqs.push({ question, answer: answerLines.join(' ').replace(/\*\*/g, '') });
      }
    } else {
      i++;
    }
  }
  return faqs;
}

function extractHeadings(content: string): Array<{ text: string; id: string }> {
  return content
    .split('\n')
    .filter(line => line.startsWith('## '))
    .map(line => {
      const text = line.replace(/^## /, '').trim();
      return { text, id: slugify(text) };
    });
}

/** Split content before FAQ section so we render FAQs separately */
function splitContent(content: string): { body: string; hasFaq: boolean } {
  const faqIndex = content.indexOf('\n## Frequently Asked Questions');
  if (faqIndex === -1) return { body: content, hasFaq: false };
  return { body: content.slice(0, faqIndex), hasFaq: true };
}

function resolveHref(href: string): { to?: string; href?: string } {
  if (href.startsWith(SITE_URL)) return { to: href.replace(SITE_URL, '') };
  return { href };
}

function ShareBar({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5" /> Share
      </span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="p-1.5 rounded-full bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Share on X"
        className="p-1.5 rounded-full bg-foreground/10 text-foreground hover:bg-foreground hover:text-background transition-all"
      >
        <Twitter className="w-3.5 h-3.5" />
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
        target="_blank" rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="p-1.5 rounded-full bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366] hover:text-white transition-all"
      >
        <MessageCircle className="w-3.5 h-3.5" />
      </a>
      <button
        onClick={copy}
        aria-label="Copy link"
        className={`p-1.5 rounded-full transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground'}`}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

function TableOfContents({ headings, activeId }: { headings: Array<{ text: string; id: string }>; activeId: string }) {
  if (headings.length === 0) return null;
  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contents</p>
      <ul className="space-y-1">
        {headings.map(h => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block text-xs leading-snug py-1 px-2 rounded-md transition-all ${
                activeId === h.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const articleRef = useRef<HTMLElement>(null);

  const faqs = useMemo(() => post ? extractFAQs(post.content) : [], [post]);
  const headings = useMemo(() => post ? extractHeadings(post.content) : [], [post]);
  const { body } = useMemo(() => post ? splitContent(post.content) : { body: '', hasFaq: false }, [post]);

  const relatedPosts = useMemo(() =>
    post ? blogPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3) : [],
    [post]
  );

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const visible = window.innerHeight - top;
      setReadingProgress(Math.min(100, Math.max(0, (visible / height) * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active heading tracker
  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );
    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  // SEO
  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | SVS Polymer Industries`;

    const setMetaName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setMetaProp = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };

    setMetaName('description', post.description);
    setMetaProp('og:title', post.title);
    setMetaProp('og:description', post.description);
    setMetaProp('og:url', `${SITE_URL}/blog/${post.slug}`);
    setMetaProp('og:type', 'article');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) { canonical = document.createElement('link') as HTMLLinkElement; canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = `${SITE_URL}/blog/${post.slug}`;

    const schemas: object[] = [{
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Organization', name: 'SVS Polymer Industries', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'SVS Polymer Industries', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    }];

    if (faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      });
    }

    document.querySelectorAll('script[data-blog-schema]').forEach(el => el.remove());
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-blog-schema', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => { document.querySelectorAll('script[data-blog-schema]').forEach(el => el.remove()); };
  }, [post, faqs]);

  if (!post) return <Navigate to="/blog" replace />;

  const currentIndex = blogPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const mdComponents: React.ComponentProps<typeof ReactMarkdown>['components'] = {
    a: ({ href = '', children }) => {
      const resolved = resolveHref(href);
      if (resolved.to) return <Link to={resolved.to}>{children}</Link>;
      return <a href={resolved.href} target="_blank" rel="noopener noreferrer">{children}</a>;
    },
    h2: ({ children }) => {
      const text = String(children);
      const id = slugify(text);
      return (
        <h2 id={id} className="group flex items-center gap-2 scroll-mt-24">
          <span className="w-1 h-6 rounded-full bg-primary flex-shrink-0" />
          {children}
          <a href={`#${id}`} className="opacity-0 group-hover:opacity-40 text-muted-foreground hover:opacity-100 transition-opacity text-sm ml-1" aria-label="Link to section">#</a>
        </h2>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-xl border border-border shadow-sm">
        <table className="min-w-full divide-y divide-border">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-primary/5">{children}</thead>,
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wide">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-muted-foreground border-t border-border">{children}</td>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary bg-primary/5 rounded-r-lg px-4 py-3 my-4 text-foreground not-italic">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => {
      const text = String(children);
      // The first bold paragraph in each post is the "answer summary" — render it as a callout
      return <strong className="text-foreground font-semibold">{text}</strong>;
    },
    hr: () => <hr className="border-border my-8" />,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-primary z-[60] transition-all duration-100"
        style={{ width: `${readingProgress}%` }}
      />

      <Header />

      {/* Hero band */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/12 via-primary/5 to-accent/8 pt-[72px]">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-primary/5 pointer-events-none" />
        <div className="absolute -right-8 -bottom-12 w-40 h-40 rounded-full bg-accent/5 pointer-events-none" />

        <div className="container mx-auto px-4 py-10 md:py-12 relative z-10 max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5 flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-foreground line-clamp-1">{post.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-muted text-muted-foreground'}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {post.readTime} min read
            </span>
          </div>

          <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight max-w-3xl">
            {post.title}
          </h1>

          {/* Answer summary callout */}
          <div className="mt-5 p-4 rounded-xl bg-primary/8 border border-primary/20 max-w-3xl">
            <p className="text-sm md:text-base leading-relaxed text-foreground/80 font-medium">
              {post.description}
            </p>
          </div>

          {/* Share bar */}
          <div className="mt-5">
            <ShareBar title={post.title} url={postUrl} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary/30 via-border to-transparent" />
      </div>

      {/* Body — two-column on large screens */}
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="flex gap-10 items-start">

          {/* Article */}
          <article
            ref={articleRef}
            className="flex-1 min-w-0 prose prose-neutral dark:prose-invert max-w-none
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:not-prose
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-[15px]
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-hr:border-border
              prose-li:text-muted-foreground prose-li:text-[15px] prose-li:leading-relaxed
              prose-ul:space-y-1 prose-ol:space-y-1"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {body}
            </ReactMarkdown>

            {/* FAQ accordion */}
            {faqs.length > 0 && (
              <div className="not-prose mt-10">
                <h2 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-primary flex-shrink-0" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="rounded-xl border border-border overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-foreground text-sm pr-4">{faq.question}</span>
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>
                          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-current"><path d="M4 0h2v10H4zM0 4h10v2H0z"/></svg>
                        </span>
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border bg-muted/20">
                          <p className="pt-3">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sticky sidebar — desktop only */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 space-y-4">
            <TableOfContents headings={headings} activeId={activeHeading} />

            {/* Share card */}
            <div className="rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Share this article</p>
              <ShareBar title={post.title} url={postUrl} />
            </div>

            {/* Back to blog */}
            <Link to="/blog" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors px-1">
              <ArrowLeft className="w-3.5 h-3.5" /> All articles
            </Link>
          </aside>

        </div>

        {/* Prev / Next */}
        {(prevPost || nextPost) && (
          <ScrollAnimation animation="fade-up">
            <div className="flex flex-col sm:flex-row gap-3 mt-12 pt-8 border-t border-border max-w-3xl">
              {prevPost && (
                <Link to={`/blog/${prevPost.slug}`} className="flex-1 group">
                  <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <ArrowLeft className="w-3 h-3" /> Previous
                      </div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{prevPost.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              )}
              {nextPost && (
                <Link to={`/blog/${nextPost.slug}`} className="flex-1 group">
                  <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 h-full">
                    <CardContent className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-1">
                        Next <ArrowRight className="w-3 h-3" />
                      </div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">{nextPost.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>
          </ScrollAnimation>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <ScrollAnimation animation="fade-up">
            <div className="mt-12 max-w-3xl">
              <h3 className="font-heading font-bold text-lg text-foreground mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map(rp => (
                  <Link key={rp.slug} to={`/blog/${rp.slug}`} className="group">
                    <Card className="h-full hover:shadow-md transition-all hover:-translate-y-0.5">
                      <CardContent className="p-4">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-3 leading-snug">{rp.title}</p>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                          <Clock className="w-3 h-3" /> {rp.readTime} min
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        )}

        {/* CTA */}
        <ScrollAnimation animation="fade-up">
          <div className="mt-12 max-w-3xl rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/8 border border-primary/20 p-8 text-center">
            <h3 className="font-heading font-bold text-xl text-foreground mb-2">Need custom plastic containers?</h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              Talk to our packaging experts. We'll help you spec the right material, size, and closure for your product.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/quote"><Button size="default" className="px-6">Request a Quote</Button></Link>
              <Link to="/contact"><Button variant="outline" size="default" className="px-6">Contact Us</Button></Link>
            </div>
          </div>
        </ScrollAnimation>

      </main>

      <Footer />
    </div>
  );
}
