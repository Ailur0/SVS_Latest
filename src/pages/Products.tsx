import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import paintBucket from '@/assets/paint-bucket.jpg';
import foodBucket from '@/assets/food-bucket.jpg';
import industrialBucket from '@/assets/industrial-bucket.jpg';
import customBuckets from '@/assets/custom-buckets.jpg';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

const Products = () => {
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const products = {
    paint: [
      {
        id: 1,
        name: 'Premium Paint Bucket - 20L',
        image: paintBucket,
        capacity: '20 Liters',
        features: ['Airtight seal', 'Metal handle', 'Stackable design', 'UV resistant'],
        applications: 'Paints, primers, coatings',
      },
      {
        id: 2,
        name: 'Paint Container - 10L',
        image: paintBucket,
        capacity: '10 Liters',
        features: ['Easy pour spout', 'Tamper evident', 'Chemical resistant'],
        applications: 'Water-based paints, emulsions',
      },
      {
        id: 3,
        name: 'Paint Bucket - 5L',
        image: paintBucket,
        capacity: '5 Liters',
        features: ['Compact size', 'Ergonomic handle', 'Recyclable'],
        applications: 'Small batch paints, samples',
      },
    ],
    food: [
      {
        id: 4,
        name: 'Food Grade Container - 15L',
        image: foodBucket,
        capacity: '15 Liters',
        features: ['FDA approved', 'BPA free', 'Odorless', 'Microwave safe'],
        applications: 'Dairy products, oils, sauces',
      },
      {
        id: 5,
        name: 'Curd Bucket - 10L',
        image: foodBucket,
        capacity: '10 Liters',
        features: ['Food safe material', 'Easy clean', 'Temperature resistant'],
        applications: 'Curd, yogurt, dairy products',
      },
      {
        id: 6,
        name: 'Food Storage - 5L',
        image: foodBucket,
        capacity: '5 Liters',
        features: ['Transparent option', 'Airtight lid', 'Freezer safe'],
        applications: 'Food ingredients, preserves',
      },
    ],
    industrial: [
      {
        id: 7,
        name: 'Heavy Duty Bucket - 25L',
        image: industrialBucket,
        capacity: '25 Liters',
        features: ['Reinforced walls', 'Chemical resistant', 'Heavy duty handle'],
        applications: 'Grease, lubricants, chemicals',
      },
      {
        id: 8,
        name: 'Industrial Container - 20L',
        image: industrialBucket,
        capacity: '20 Liters',
        features: ['Impact resistant', 'Wide mouth', 'UN certified'],
        applications: 'Industrial chemicals, adhesives',
      },
      {
        id: 9,
        name: 'Chemical Bucket - 15L',
        image: industrialBucket,
        capacity: '15 Liters',
        features: ['Acid resistant', 'Safety lid', 'Warning labels'],
        applications: 'Hazardous materials, solvents',
      },
    ],
  };

  const allProducts = [...products.paint, ...products.food, ...products.industrial];
  const displayProducts = selectedCategory === 'all' 
    ? allProducts 
    : products[selectedCategory as keyof typeof products] || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="bg-gradient-primary py-20">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white text-center">
              Our Products
            </h1>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="paint">Paint</TabsTrigger>
                <TabsTrigger value="food">Food Grade</TabsTrigger>
                <TabsTrigger value="industrial">Industrial</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedCategory} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayProducts.map((product, index) => (
                    <ScrollAnimation key={product.id} animation="fade-up" delay={index * 100}>
                      <Card className="hover:shadow-large transition-all duration-300 hover:scale-105 h-full">
                        <CardHeader>
                          <div className="aspect-square overflow-hidden rounded-lg mb-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                          <CardTitle>{product.name}</CardTitle>
                          <CardDescription>Capacity: {product.capacity}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Key Features:</h4>
                              <ul className="text-sm text-muted-foreground list-disc list-inside">
                                {product.features.map((feature, index) => (
                                  <li key={index}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Applications:</h4>
                              <p className="text-sm text-muted-foreground">
                                {product.applications}
                              </p>
                            </div>
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollAnimation>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Custom Solutions CTA */}
            <div className="mt-16 text-center bg-muted rounded-lg p-8">
              <h3 className="font-heading text-2xl font-semibold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We specialize in creating custom packaging solutions tailored to your specific
                requirements. From custom sizes to branded designs, we've got you covered.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="default" onClick={() => window.location.href = '/customization'}>
                  Explore Customization
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/quote'}>
                  Request Quote
                </Button>
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