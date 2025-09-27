import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ProductsSection from '@/components/home/ProductsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import StatsSection from '@/components/home/StatsSection';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <HeroSection />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* About Us Snippet */}
        <section className="py-24 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  ABOUT SVS POLYMER
                </span>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Market Leader in Plastic Packaging
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  With over two decades of excellence, SVS Polymer Industries combines 
                  advanced molding technology with sustainable practices to deliver 
                  superior packaging solutions trusted by industry leaders.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">20+</div>
                  <div className="text-muted-foreground">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">ISO</div>
                  <div className="text-muted-foreground">Certified Quality</div>
                </div>
              </div>
              
              <div className="text-center mt-10">
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  Discover Our Journey 
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        <ProductsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;