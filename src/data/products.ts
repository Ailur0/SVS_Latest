import { parseFrontmatter } from '@/lib/frontmatter';

export const CAPACITY_OPTIONS = ['Up to 1L', '1L – 5L', '5L – 10L', '10L+'] as const;
export const CLOSURE_OPTIONS = ['Flat Lid', 'CCD Closure', 'Round Lid', 'Spout Closure', 'Standard Cap'] as const;
export const FEATURE_OPTIONS = [
  'Tamper Evident', 'BPA Free', 'Stackable',
  'Spout Pour', 'Food Safe', 'Chemical Resistant',
] as const;

export type CapacityOption = typeof CAPACITY_OPTIONS[number];
export type ClosureOption = typeof CLOSURE_OPTIONS[number];
export type FeatureOption = typeof FEATURE_OPTIONS[number];

export interface Product {
  id: string;
  name: string;
  image: string;
  capacity: string;
  capacityGroup: CapacityOption;
  closure: ClosureOption | 'Standard Cap';
  features: string[];
  tags: FeatureOption[];
  applications: string;
}

interface ProductFrontmatter extends Product {
  category: 'paint' | 'food' | 'lubricants';
}

const modules = import.meta.glob<string>('/content/products/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const allProducts: ProductFrontmatter[] = Object.values(modules)
  .map((raw) => parseFrontmatter<ProductFrontmatter>(raw).data)
  .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

export const products: Record<'paint' | 'food' | 'lubricants', Product[]> = {
  paint: allProducts.filter(p => p.category === 'paint'),
  food: allProducts.filter(p => p.category === 'food'),
  lubricants: allProducts.filter(p => p.category === 'lubricants'),
};
