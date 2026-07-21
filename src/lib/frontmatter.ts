import * as yaml from 'js-yaml';

/** Parses `---\nYAML\n---\nbody` files written by Decap CMS. */
export function parseFrontmatter<T>(raw: string): { data: T; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {} as T, content: raw };
  }
  const data = (yaml.load(match[1]) ?? {}) as T;
  return { data, content: match[2] };
}
