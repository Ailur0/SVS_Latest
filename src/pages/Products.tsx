import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, X, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// ─── Filter definitions ────────────────────────────────────────────────────

const CAPACITY_OPTIONS = ['Up to 1L', '1L – 5L', '5L – 10L', '10L+'] as const;
const CLOSURE_OPTIONS  = ['Flat Lid', 'CCD Closure', 'Round Lid', 'Spout Closure', 'Standard Cap'] as const;
const FEATURE_OPTIONS  = [
  'Tamper Evident', 'BPA Free', 'Stackable',
  'Spout Pour', 'Food Safe', 'Chemical Resistant',
] as const;

type CapacityOption = typeof CAPACITY_OPTIONS[number];
type ClosureOption  = typeof CLOSURE_OPTIONS[number];
type FeatureOption  = typeof FEATURE_OPTIONS[number];

interface Product {
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

// ─── Product data ──────────────────────────────────────────────────────────

const products: Record<'paint' | 'food' | 'lubricants', Product[]> = {
  paint: [
    {
      id: 'p1',
      name: '20kg Distemper Container',
      image: '/Paint/20kg-distemper-ccd.jpg',
      capacity: '20 kg',
      capacityGroup: '10L+',
      closure: 'CCD Closure',
      features: ['Tamper-evident CCD closure', 'Stackable design', 'UV resistant', 'Airtight seal'],
      tags: ['Tamper Evident', 'Stackable'],
      applications: 'Distemper, emulsion, primers',
    },
    {
      id: 'p2',
      name: '20kg Distemper Container',
      image: '/Paint/20kg-distemper-flat.jpg',
      capacity: '20 kg',
      capacityGroup: '10L+',
      closure: 'Flat Lid',
      features: ['Wide mouth for easy fill', 'Metal handle', 'Stackable', 'Recyclable PP'],
      tags: ['Stackable'],
      applications: 'Distemper, emulsion, paints',
    },
    {
      id: 'p3',
      name: '10kg Distemper Container',
      image: '/Paint/10kg-distemper-ccd.jpg',
      capacity: '10 kg',
      capacityGroup: '10L+',
      closure: 'CCD Closure',
      features: ['Tamper-evident CCD closure', 'Ergonomic handle', 'Stackable', 'UV resistant'],
      tags: ['Tamper Evident', 'Stackable'],
      applications: 'Paints, coatings, primers',
    },
    {
      id: 'p4',
      name: '10kg Distemper Container',
      image: '/Paint/10kg-distemper-flat.jpg',
      capacity: '10 kg',
      capacityGroup: '10L+',
      closure: 'Flat Lid',
      features: ['Wide mouth', 'Metal handle', 'Chemical resistant', 'Recyclable PP'],
      tags: ['Stackable'],
      applications: 'Water-based paints, emulsions',
    },
    {
      id: 'p5',
      name: '5kg Distemper Container',
      image: '/Paint/5kg-distemper-ccd.jpg',
      capacity: '5 kg',
      capacityGroup: '5L – 10L',
      closure: 'CCD Closure',
      features: ['Tamper-evident closure', 'Compact size', 'Stackable', 'UV resistant'],
      tags: ['Tamper Evident', 'Stackable'],
      applications: 'Paints, primers, small batch',
    },
    {
      id: 'p6',
      name: '5kg Distemper Container',
      image: '/Paint/5kg-distemper-flat.jpg',
      capacity: '5 kg',
      capacityGroup: '5L – 10L',
      closure: 'Flat Lid',
      features: ['Wide mouth', 'Ergonomic handle', 'Recyclable', 'Chemical resistant'],
      tags: ['Stackable'],
      applications: 'Water-based paints, coatings',
    },
    {
      id: 'p7',
      name: '2kg Distemper Container',
      image: '/Paint/2kg-distemper-flat.jpg',
      capacity: '2 kg',
      capacityGroup: '1L – 5L',
      closure: 'Flat Lid',
      features: ['Lightweight', 'Easy pour', 'Tamper evident', 'Recyclable PP'],
      tags: ['Tamper Evident'],
      applications: 'Small batch paints, samples',
    },
    {
      id: 'p8',
      name: '1kg Distemper Container',
      image: '/Paint/1kg-distemper-flat.jpg',
      capacity: '1 kg',
      capacityGroup: '1L – 5L',
      closure: 'Flat Lid',
      features: ['Compact design', 'Easy grip', 'Tamper evident', 'Recyclable'],
      tags: ['Tamper Evident'],
      applications: 'Paint samples, touch-up kits',
    },
    {
      id: 'p9',
      name: '100gm Round Container',
      image: '/Paint/100gms-round.jpg',
      capacity: '100 gm',
      capacityGroup: 'Up to 1L',
      closure: 'Round Lid',
      features: ['Mini format', 'Airtight seal', 'Tamper evident', 'Recyclable PP'],
      tags: ['Tamper Evident'],
      applications: 'Paint samples, specialty coatings',
    },
  ],
  food: [
    {
      id: 'f1',
      name: 'MRJ 10kg Round Container',
      image: '/Food Grade/MRJ_10kg-round.jpg',
      capacity: '10 kg',
      capacityGroup: '10L+',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Airtight seal', 'Stackable'],
      tags: ['Food Safe', 'BPA Free', 'Stackable'],
      applications: 'Edible oils, ghee, dairy products',
    },
    {
      id: 'f2',
      name: 'MRJ 4.4L Round Container',
      image: '/Food Grade/MRJ_4400ml-round.jpg',
      capacity: '4.4 L',
      capacityGroup: '1L – 5L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Odourless', 'Airtight'],
      tags: ['Food Safe', 'BPA Free'],
      applications: 'Dairy, oils, food ingredients',
    },
    {
      id: 'f3',
      name: 'MRJ 2kg Round Container',
      image: '/Food Grade/MRJ_2kg-round.jpg',
      capacity: '2 kg',
      capacityGroup: '1L – 5L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Easy clean', 'Stackable'],
      tags: ['Food Safe', 'BPA Free', 'Stackable'],
      applications: 'Curd, dairy, condiments',
    },
    {
      id: 'f4',
      name: 'MRJ 600ml Round Container',
      image: '/Food Grade/MRJ600-ml-round.jpg',
      capacity: '600 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Airtight lid', 'Lightweight'],
      tags: ['Food Safe', 'BPA Free'],
      applications: 'Curd, yogurt, dairy',
    },
    {
      id: 'f5',
      name: '1000ml Round Container',
      image: '/Food Grade/1000ml-round.jpg',
      capacity: '1000 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Tamper evident', 'Airtight'],
      tags: ['Food Safe', 'BPA Free', 'Tamper Evident'],
      applications: 'Dairy, ice cream, condiments',
    },
    {
      id: 'f6',
      name: '750ml Round Container (HUL)',
      image: '/Food Grade/750ml-round-hul.jpg',
      capacity: '750 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Airtight'],
      tags: ['Food Safe', 'BPA Free'],
      applications: 'Dairy, FMCG products',
    },
    {
      id: 'f7',
      name: '500ml Round Container (HUL)',
      image: '/Food Grade/500ml-round-hul.jpg',
      capacity: '500 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Tamper evident'],
      tags: ['Food Safe', 'BPA Free', 'Tamper Evident'],
      applications: 'FMCG, dairy, condiments',
    },
    {
      id: 'f8',
      name: '500ml Round Container',
      image: '/Food Grade/500ml-round.jpg',
      capacity: '500 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Airtight seal', 'Lightweight'],
      tags: ['Food Safe', 'BPA Free'],
      applications: 'Dairy, sauces, food products',
    },
    {
      id: 'f9',
      name: '460ml Round Container (Amul Masti)',
      image: '/Food Grade/460ml-round-amul-masti.jpg',
      capacity: '460 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Tamper evident'],
      tags: ['Food Safe', 'BPA Free', 'Tamper Evident'],
      applications: 'Curd, yogurt, dairy brands',
    },
    {
      id: 'f10',
      name: '460ml Round Container (Roto)',
      image: '/Food Grade/460ml-round-roto.jpg',
      capacity: '460 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Airtight', 'Stackable'],
      tags: ['Food Safe', 'BPA Free', 'Stackable'],
      applications: 'Dairy, curd, FMCG',
    },
    {
      id: 'f11',
      name: '360ml Round Container',
      image: '/Food Grade/360ml-round.jpg',
      capacity: '360 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Tamper evident', 'Lightweight'],
      tags: ['Food Safe', 'BPA Free', 'Tamper Evident'],
      applications: 'Dairy, condiments, sauces',
    },
    {
      id: 'f12',
      name: '125ml Round Container',
      image: '/Food Grade/125ml-round.jpg',
      capacity: '125 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Airtight', 'Single-serve format'],
      tags: ['Food Safe', 'BPA Free'],
      applications: 'Curd cups, yogurt, snacks',
    },
    {
      id: 'f13',
      name: '100ml Round Container',
      image: '/Food Grade/100ml-round.jpg',
      capacity: '100 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Round Lid',
      features: ['Food-safe PP', 'BPA free', 'Airtight', 'Mini format'],
      tags: ['Food Safe', 'BPA Free'],
      applications: 'Curd, dips, mini dairy packs',
    },
  ],
  lubricants: [
    {
      id: 'l1',
      name: 'ML 20L Container',
      image: '/Lubricants/ML 20L_flat.jpg',
      capacity: '20 L',
      capacityGroup: '10L+',
      closure: 'Flat Lid',
      features: ['HDPE construction', 'Chemical resistant', 'Stackable', 'Wide mouth fill'],
      tags: ['Chemical Resistant', 'Stackable'],
      applications: 'Engine oils, industrial lubricants',
    },
    {
      id: 'l2',
      name: 'ML 20L Container with Spout',
      image: '/Lubricants/ML 20_Spout.jpg',
      capacity: '20 L',
      capacityGroup: '10L+',
      closure: 'Spout Closure',
      features: ['Controlled pour spout', 'HDPE construction', 'Leak-resistant', 'Chemical resistant'],
      tags: ['Chemical Resistant', 'Spout Pour', 'Tamper Evident'],
      applications: 'Engine oils, gear oils, lubricants',
    },
    {
      id: 'l3',
      name: 'ML 10L Container',
      image: '/Lubricants/ML 10_flat.jpg',
      capacity: '10 L',
      capacityGroup: '5L – 10L',
      closure: 'Flat Lid',
      features: ['HDPE construction', 'Chemical resistant', 'Ergonomic handle', 'Stackable'],
      tags: ['Chemical Resistant', 'Stackable'],
      applications: 'Engine oils, hydraulic fluids',
    },
    {
      id: 'l4',
      name: 'ML 10L Container with Spout',
      image: '/Lubricants/ML 10_Spout.jpg',
      capacity: '10 L',
      capacityGroup: '5L – 10L',
      closure: 'Spout Closure',
      features: ['Controlled pour spout', 'HDPE construction', 'Leak-resistant', 'Tamper evident'],
      tags: ['Chemical Resistant', 'Spout Pour', 'Tamper Evident'],
      applications: 'Engine oils, transmission fluids',
    },
    {
      id: 'l5',
      name: 'ML 7.5L Container',
      image: '/Lubricants/ML 7.5_flat.jpg',
      capacity: '7.5 L',
      capacityGroup: '5L – 10L',
      closure: 'Flat Lid',
      features: ['HDPE construction', 'Chemical resistant', 'Ergonomic handle', 'Stackable'],
      tags: ['Chemical Resistant', 'Stackable'],
      applications: 'Gear oils, industrial lubricants',
    },
    {
      id: 'l6',
      name: 'ML 7.5L Container with Spout',
      image: '/Lubricants/ML 7.5_spout.jpg',
      capacity: '7.5 L',
      capacityGroup: '5L – 10L',
      closure: 'Spout Closure',
      features: ['Controlled pour spout', 'HDPE construction', 'Leak-resistant', 'Tamper evident'],
      tags: ['Chemical Resistant', 'Spout Pour', 'Tamper Evident'],
      applications: 'Engine oils, coolants',
    },
    {
      id: 'l7',
      name: 'ML 500ml Container',
      image: '/Lubricants/ML 05.jpg',
      capacity: '500 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Standard Cap',
      features: ['HDPE construction', 'Compact format', 'Chemical resistant', 'Tamper evident'],
      tags: ['Chemical Resistant', 'Tamper Evident'],
      applications: 'Specialty lubricants, additives',
    },
    {
      id: 'l8',
      name: 'ML 500ml Container with Spout',
      image: '/Lubricants/ML 05_Spout.jpg',
      capacity: '500 ml',
      capacityGroup: 'Up to 1L',
      closure: 'Spout Closure',
      features: ['Precision pour spout', 'HDPE construction', 'Chemical resistant', 'Compact'],
      tags: ['Chemical Resistant', 'Spout Pour'],
      applications: 'Specialty oils, chain lubricants',
    },
  ],
};

// ─── Category lookup (for share URLs) ─────────────────────────────────────

const productCategoryMap: Record<string, string> = {};
(Object.entries(products) as [string, Product[]][]).forEach(([cat, prods]) => {
  prods.forEach((p) => { productCategoryMap[p.id] = cat; });
});

// ─── Filter toggle helper ──────────────────────────────────────────────────

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  next.has(value) ? next.delete(value) : next.add(value);
  return next;
}

// ─── Filter chip component ─────────────────────────────────────────────────

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 whitespace-nowrap ${
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground'
      }`}
    >
      {label}
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

const Products = () => {
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const { toast } = useToast();

  const shareProduct = async (product: Product) => {
    const cat = productCategoryMap[product.id];
    const url = `${window.location.origin}/products?category=${cat}`;
    const shareData = {
      title: `${product.name} – SVS Polymer Industries`,
      text: `${product.name} | ${product.capacity} · ${product.closure} – SVS Polymer Industries`,
      url,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link copied!', description: 'Product link copied to clipboard.' });
    }
  };

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [capacityFilters, setCapacityFilters] = useState<Set<CapacityOption>>(new Set());
  const [closureFilters,  setClosureFilters]  = useState<Set<string>>(new Set());
  const [featureFilters,  setFeatureFilters]  = useState<Set<FeatureOption>>(new Set());

  const activeFilterCount =
    capacityFilters.size + closureFilters.size + featureFilters.size;

  const clearAllFilters = () => {
    setCapacityFilters(new Set());
    setClosureFilters(new Set());
    setFeatureFilters(new Set());
  };

  const allProducts: Product[] = [
    ...products.paint,
    ...products.food,
    ...products.lubricants,
  ];

  const poolByCategory: Product[] =
    selectedCategory === 'all'
      ? allProducts
      : products[selectedCategory as keyof typeof products] || [];

  const displayProducts = poolByCategory.filter((p) => {
    if (capacityFilters.size > 0 && !capacityFilters.has(p.capacityGroup)) return false;
    if (closureFilters.size  > 0 && !closureFilters.has(p.closure))         return false;
    if (featureFilters.size  > 0 && !p.tags.some((t) => featureFilters.has(t))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">

        <section className="py-8">
          <div className="container mx-auto px-4">

            {/* Page heading */}
            <div className="mb-8 pb-6 border-b border-border">
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Our Products</h1>
              <p className="text-muted-foreground mt-1.5 text-sm md:text-base">
                Rigid plastic packaging across paint, food grade, and lubricant sectors.
              </p>
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={(v) => { setSelectedCategory(v); clearAllFilters(); }}>
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="paint">Paint</TabsTrigger>
                <TabsTrigger value="food">Food Grade</TabsTrigger>
                <TabsTrigger value="lubricants">Lubricants</TabsTrigger>
              </TabsList>

              {/* Filter Bar */}
              <div className="mt-6 border border-border rounded-xl overflow-hidden">
                {/* Filter header toggle */}
                <button
                  onClick={() => setFiltersOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-5 py-3 bg-muted/60 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge variant="default" className="text-xs px-2 py-0 h-5">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {activeFilterCount > 0 && (
                      <button
                        onClick={(e) => { e.stopPropagation(); clearAllFilters(); }}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Clear all
                      </button>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {filtersOpen ? '▲' : '▼'}
                    </span>
                  </div>
                </button>

                {/* Filter groups */}
                {filtersOpen && (
                  <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-border bg-background">
                    {/* Capacity */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        Capacity
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {CAPACITY_OPTIONS.map((opt) => (
                          <FilterChip
                            key={opt}
                            label={opt}
                            active={capacityFilters.has(opt)}
                            onClick={() => setCapacityFilters((s) => toggle(s, opt))}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Closure Type */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        Closure Type
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {CLOSURE_OPTIONS.map((opt) => (
                          <FilterChip
                            key={opt}
                            label={opt}
                            active={closureFilters.has(opt)}
                            onClick={() => setClosureFilters((s) => toggle(s, opt))}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        Features
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {FEATURE_OPTIONS.map((opt) => (
                          <FilterChip
                            key={opt}
                            label={opt}
                            active={featureFilters.has(opt)}
                            onClick={() => setFeatureFilters((s) => toggle(s, opt))}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Active filter chips summary */}
              {activeFilterCount > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-muted-foreground">Active:</span>
                  {[...capacityFilters].map((f) => (
                    <button
                      key={f}
                      onClick={() => setCapacityFilters((s) => toggle(s, f))}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20"
                    >
                      {f} <X className="w-3 h-3" />
                    </button>
                  ))}
                  {[...closureFilters].map((f) => (
                    <button
                      key={f}
                      onClick={() => setClosureFilters((s) => toggle(s, f as ClosureOption))}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20"
                    >
                      {f} <X className="w-3 h-3" />
                    </button>
                  ))}
                  {[...featureFilters].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFeatureFilters((s) => toggle(s, f))}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20"
                    >
                      {f} <X className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              )}

              <TabsContent value={selectedCategory} className="mt-6">
                {displayProducts.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground">
                    <p className="text-lg font-medium mb-2">No products match your filters.</p>
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      Showing {displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayProducts.map((product, index) => (
                        <ScrollAnimation key={product.id} animation="fade-up" delay={index * 50}>
                          <Card className="hover:shadow-large transition-all duration-300 hover:scale-[1.02] h-full">
                            <CardHeader>
                              <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-muted">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-110"
                                />
                              </div>
                              <CardTitle className="text-lg leading-snug">{product.name}</CardTitle>
                              <CardDescription>
                                {product.capacity} &nbsp;·&nbsp; {product.closure}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {/* Feature tags */}
                                <div className="flex flex-wrap gap-1.5">
                                  {product.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1 text-sm">Applications:</h4>
                                  <p className="text-sm text-muted-foreground">{product.applications}</p>
                                </div>
                                <div className="flex gap-2 mt-1">
                                  <Link to="/quote" className="flex-1">
                                    <Button variant="outline" className="w-full">
                                      Request Quote
                                    </Button>
                                  </Link>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => shareProduct(product)}
                                    aria-label="Share product"
                                    title="Share"
                                  >
                                    <Share2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </ScrollAnimation>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>

            {/* Custom Solutions CTA */}
            <div className="mt-16 text-center bg-muted rounded-lg p-8">
              <h3 className="font-heading text-2xl font-semibold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We specialise in creating custom packaging solutions tailored to your specific
                requirements — from custom sizes and closures to branded decoration.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/customization">
                  <Button variant="default">Explore Customisation</Button>
                </Link>
                <Link to="/quote">
                  <Button variant="outline">Request Quote</Button>
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
