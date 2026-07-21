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
import {
  products,
  CAPACITY_OPTIONS,
  CLOSURE_OPTIONS,
  FEATURE_OPTIONS,
  type Product,
  type CapacityOption,
  type ClosureOption,
  type FeatureOption,
} from '@/data/products';

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
      <main className="">

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
                                  loading="lazy"
                                  width="300"
                                  height="300"
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
