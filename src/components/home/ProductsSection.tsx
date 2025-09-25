import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import paintBucket from '@/assets/paint-bucket.jpg';
import foodBucket from '@/assets/food-bucket.jpg';
import industrialBucket from '@/assets/industrial-bucket.jpg';
import customBuckets from '@/assets/custom-buckets.jpg';

const ProductsSection = () => {
  const products = [
    {
      title: 'Paint Buckets',
      description: 'Premium quality containers for paint and coating applications',
      image: paintBucket,
      link: '/products?category=paint',
    },
    {
      title: 'Food Grade',
      description: 'Safe and certified containers for food and dairy products',
      image: foodBucket,
      link: '/products?category=food',
    },
    {
      title: 'Industrial',
      description: 'Heavy-duty buckets for grease, chemicals, and industrial use',
      image: industrialBucket,
      link: '/products?category=industrial',
    },
    {
      title: 'Custom Solutions',
      description: 'Tailored packaging solutions with your branding',
      image: customBuckets,
      link: '/customization',
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-up" className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            OUR PRODUCTS
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive Packaging Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Industry-leading plastic containers engineered for diverse applications 
            with customization capabilities to match your brand identity.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ScrollAnimation
              key={product.title}
              animation="fade-up"
              delay={index * 100}
            >
              <Card className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 h-full">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{product.title}</CardTitle>
                  <CardDescription className="mb-4">
                    {product.description}
                  </CardDescription>
                  <Link to={product.link}>
                    <Button variant="link" className="p-0 h-auto font-semibold">
                      Learn More →
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