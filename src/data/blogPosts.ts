import post01 from '../CMS/01-what-is-ppcp-industrial-containers.md?raw';
import post02 from '../CMS/02-ppcp-vs-hdpe-paint-buckets.md?raw';
import post03 from '../CMS/03-lubricant-container-size-guide.md?raw';
import post04 from '../CMS/04-food-grade-plastic-edible-oil-containers.md?raw';
import post05 from '../CMS/05-prevent-container-deformation-cold-chain.md?raw';
import post06 from '../CMS/06-injection-moulding-vs-blow-moulding.md?raw';
import post07 from '../CMS/07-moq-custom-plastic-containers-india.md?raw';
import post08 from '../CMS/08-pp-vs-pet-packaging.md?raw';
import post09 from '../CMS/09-how-to-spec-custom-plastic-container.md?raw';
import post10 from '../CMS/10-plastic-paint-containers-recyclable.md?raw';
import post11 from '../CMS/11-what-is-iml-in-mould-labelling.md?raw';
import post12 from '../CMS/12-rigid-vs-flexible-packaging-industrial-chemicals.md?raw';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
  date: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-is-ppcp-industrial-containers',
    title: 'What Is PPCP and Why Do Manufacturers Prefer It for Industrial Containers?',
    description: 'PPCP (Polypropylene Copolymer) is a modified form of polypropylene that balances rigidity with impact resistance, making it the preferred material for industrial containers, paint buckets, and chemical storage that must survive rough handling, stacking loads, and temperature swings.',
    category: 'Materials',
    readTime: 4,
    date: '2026-03-19',
    content: post01,
  },
  {
    slug: 'ppcp-vs-hdpe-paint-buckets',
    title: 'PPCP vs HDPE: Which Plastic Is Better for Paint Buckets?',
    description: 'For most paint bucket applications, PPCP is the better choice — it is lighter, offers superior surface finish for labelling, and provides adequate chemical resistance for water-based and alkyd paints. HDPE becomes preferable only when strong solvents or aggressive chemicals are involved.',
    category: 'Materials',
    readTime: 3,
    date: '2026-03-19',
    content: post02,
  },
  {
    slug: 'lubricant-container-size-guide',
    title: 'How to Choose the Right Container Size for Industrial Lubricants',
    description: 'The right container size for industrial lubricants depends on your usage rate, storage conditions, and distribution channel — with 1L and 5L containers suited for retail and small workshops, and 10L to 20L containers preferred for fleet operators, OEMs, and bulk industrial buyers.',
    category: 'Packaging Design',
    readTime: 4,
    date: '2026-03-19',
    content: post03,
  },
  {
    slug: 'food-grade-plastic-edible-oil-containers',
    title: 'What Does Food-Grade Plastic Mean for Edible Oil Containers?',
    description: 'Food-grade plastic means the resin, colorants, and additives used in manufacturing the container comply with regulatory standards confirming no harmful substances will migrate into food or edible oils. In India, this is governed by IS 10146 and FSSAI regulations.',
    category: 'Food Grade',
    readTime: 4,
    date: '2026-03-19',
    content: post04,
  },
  {
    slug: 'prevent-container-deformation-cold-chain',
    title: 'How to Prevent Container Deformation During Cold-Chain Transport',
    description: 'Plastic container deformation during cold-chain transport is primarily prevented by choosing impact-resistant materials like PPCP, designing adequate wall thickness and rib reinforcement, and controlling stacking loads — since most deformation failures happen when containers are stacked at low temperatures.',
    category: 'Packaging Design',
    readTime: 3,
    date: '2026-03-19',
    content: post05,
  },
  {
    slug: 'injection-moulding-vs-blow-moulding',
    title: 'Injection Moulding vs Blow Moulding: Which Process Makes Better Containers?',
    description: 'Injection moulding produces better rigid containers — jars, tubs, buckets, and wide-mouth containers — with precise wall thickness, superior structural strength, and consistent dimensions. Blow moulding is the correct process for narrow-neck bottles and large tanks.',
    category: 'Manufacturing',
    readTime: 4,
    date: '2026-03-19',
    content: post06,
  },
  {
    slug: 'moq-custom-plastic-containers-india',
    title: 'What Is the Minimum Order Quantity for Custom Plastic Containers in India?',
    description: 'For standard-size PPCP containers using existing moulds, minimum order quantities in India typically start at 500–1,000 units per SKU. For custom sizes requiring new mould development, MOQs are higher — usually 2,000–5,000 units — to recover tooling investment.',
    category: 'Procurement',
    readTime: 3,
    date: '2026-03-19',
    content: post07,
  },
  {
    slug: 'pp-vs-pet-packaging',
    title: 'PP vs PET: Which Plastic Is Right for Your Product Packaging?',
    description: 'PP is better for rigid industrial containers, chemical packaging, and applications requiring heat resistance or wide-mouth formats. PET is better for transparent bottles and applications where clarity and gas barrier properties are critical. For most B2B industrial packaging, PP is the more versatile choice.',
    category: 'Materials',
    readTime: 4,
    date: '2026-03-19',
    content: post08,
  },
  {
    slug: 'how-to-spec-custom-plastic-container',
    title: 'How to Spec a Custom Plastic Container: 5 Things to Tell Your Manufacturer',
    description: 'To get an accurate quote and a container that works for your product, provide five pieces of information: required capacity and dimensions, neck finish and closure type, wall thickness or stacking load requirement, colour and decoration method, and material specification.',
    category: 'Procurement',
    readTime: 3,
    date: '2026-03-19',
    content: post09,
  },
  {
    slug: 'plastic-paint-containers-recyclable',
    title: 'Are Plastic Paint Containers Recyclable? What Manufacturers Need to Know',
    description: 'Yes, plastic paint containers made from PPCP or HDPE (resin codes #5 and #2) are technically recyclable, but their actual recyclability in India depends on container cleanliness, local waste collection infrastructure, and compliance with Plastic Waste Management Rules and EPR framework.',
    category: 'Sustainability',
    readTime: 4,
    date: '2026-03-19',
    content: post10,
  },
  {
    slug: 'what-is-iml-in-mould-labelling',
    title: 'What Is IML (In-Mould Labelling) and Why Are FMCG Brands Switching to It?',
    description: 'IML is a decoration process where a pre-printed plastic label is placed inside the injection mould before the container is formed — the molten plastic fuses with the label during moulding. FMCG brands adopt it for premium shelf aesthetics, no label peel, and compatibility with PP recycling streams.',
    category: 'Manufacturing',
    readTime: 4,
    date: '2026-03-19',
    content: post11,
  },
  {
    slug: 'rigid-vs-flexible-packaging-industrial-chemicals',
    title: 'Rigid vs Flexible Packaging: Which Is Better for Industrial Chemicals?',
    description: 'For most industrial chemicals — including solvents, lubricants, agrochemicals, adhesives, and coatings — rigid plastic containers are the better choice, providing superior chemical resistance, structural stability, and stackability over flexible packaging.',
    category: 'Packaging Design',
    readTime: 4,
    date: '2026-03-19',
    content: post12,
  },
];

export const CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}
