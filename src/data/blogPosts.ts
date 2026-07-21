import { parseFrontmatter } from '@/lib/frontmatter';

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
  date: string;
  order: number;
  content: string;
  faqs: BlogFAQ[];
}

type BlogFrontmatter = Omit<BlogPost, 'content'>;

const modules = import.meta.glob<string>('/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const blogPosts: BlogPost[] = Object.values(modules)
  .map((raw) => {
    const { data, content } = parseFrontmatter<BlogFrontmatter>(raw);
    return { ...data, content: content.trim() };
  })
  .sort((a, b) => a.order - b.order);

export const CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}
