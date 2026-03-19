import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import PageHeader from '@/components/ui/page-header';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { blogPosts, CATEGORIES } from '@/data/blogPosts';

const categoryColors: Record<string, string> = {
  Materials: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Packaging Design': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  'Food Grade': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Manufacturing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Procurement: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  Sustainability: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="Industry Insights"
        subtitle="Technical guides and practical knowledge for packaging buyers, product managers, and procurement teams."
      />

      <main className="container mx-auto px-4 py-12">

        {/* Category filter */}
        <ScrollAnimation animation="fade-up">
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <ScrollAnimation key={post.slug} animation="fade-up" delay={i * 60}>
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
                  <CardContent className="p-6 flex flex-col h-full">

                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-muted text-muted-foreground'}`}>
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min read
                      </span>
                    </div>

                    <h2 className="font-heading text-base font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-3">
                      {post.title}
                    </h2>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                      {post.description}
                    </p>

                    <div className="flex items-center gap-1 text-sm font-medium text-primary mt-4">
                      Read article
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>

                  </CardContent>
                </Card>
              </Link>
            </ScrollAnimation>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
