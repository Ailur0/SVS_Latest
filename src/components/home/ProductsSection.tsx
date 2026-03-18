import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

const categories = [
  {
    title: 'Paint Containers',
    description: 'Paint packaging from 1Ltr to 20Ltr with flat lid and CCD closure options.',
    image: '/Paint/20kg-distemper-ccd.jpg',
    link: '/products?category=paint',
  },
  {
    title: 'Food Grade',
    description: 'BPA-free, food-safe round containers from 1000ml to 20Ltr for dairy, oils, and FMCG.',
    image: '/Food Grade/MRJ_10kg-round.jpg',
    link: '/products?category=food',
  },
  {
    title: 'Lubricants',
    description: 'PPCP containers with flat and spout closures for engine oils and industrial lubricants.',
    image: '/Lubricants/ML 20_Spout.jpg',
    link: '/products?category=lubricants',
  },
];

const ProductsSection = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-up" className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            OUR PRODUCTS
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Packaging for Every Sector
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Shelf-ready, tamper-safe, high-volume rigid plastic packaging — designed for performance and compliance across industries.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <ScrollAnimation
              key={cat.title}
              animation="fade-up"
              delay={index * 100}
            >
              <Card className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 h-full">
                <CardHeader className="p-0">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-muted">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{cat.title}</CardTitle>
                  <CardDescription className="mb-4">{cat.description}</CardDescription>
                  <Link to={cat.link}>
                    <Button variant="link" className="p-0 h-auto font-semibold">
                      View Products →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-up" className="text-center mt-12">
          <Link to="/products">
            <Button variant="default" size="lg">
              View All Products
            </Button>
          </Link>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ProductsSection;
