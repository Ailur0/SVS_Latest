import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Printer, Package, Layers } from 'lucide-react';
import customBuckets from '@/assets/custom-buckets.jpg';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Customization = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const services = [
    {
      icon: Palette,
      title: 'Custom Colors',
      description: 'Choose from unlimited color options to match your brand identity perfectly.',
      features: ['Pantone color matching', 'Multi-color options', 'Metallic finishes', 'UV resistant colors'],
    },
    {
      icon: Printer,
      title: 'Custom Printing & Labeling',
      description: 'High-quality printing solutions for your branding needs.',
      features: ['Screen printing', 'In-mold labeling', 'Heat transfer', 'Offset printing'],
    },
    {
      icon: Package,
      title: 'Custom Sizes & Shapes',
      description: 'Tailored dimensions and designs to fit your specific requirements.',
      features: ['Custom capacities', 'Unique shapes', 'Special lids', 'Handle variations'],
    },
    {
      icon: Layers,
      title: 'Custom Mold Development',
      description: 'Create unique packaging solutions with custom mold development.',
      features: ['Prototype development', '3D design assistance', 'Rapid tooling', 'Exclusive designs'],
    },
  ];

  const process = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Discuss your requirements with our design team',
    },
    {
      step: 2,
      title: 'Design & Prototyping',
      description: 'Create designs and develop prototypes for approval',
    },
    {
      step: 3,
      title: 'Sample Production',
      description: 'Produce samples for testing and validation',
    },
    {
      step: 4,
      title: 'Mass Production',
      description: 'Full-scale production with quality assurance',
    },
    {
      step: 5,
      title: 'Delivery',
      description: 'Timely delivery of your custom products',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="bg-gradient-primary py-20">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white text-center">
              Custom Packaging Solutions
            </h1>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Your Brand, Your Way
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stand out in the market with custom packaging solutions tailored to your brand.
                From custom colors and printing to unique shapes and sizes, we bring your vision
                to life with precision and quality.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
              Customization Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <ScrollAnimation key={service.title} animation={index % 2 === 0 ? "fade-right" : "fade-left"} delay={index * 100}>
                    <Card className="hover:shadow-large transition-all duration-300 hover:scale-105 h-full">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-light text-primary animate-pulse">
                            <Icon className="h-6 w-6" />
                          </div>
                          <CardTitle>{service.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
              Our Customization Process
            </h2>
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Connection Line */}
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-border hidden lg:block" />
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {process.map((item) => (
                    <div key={item.step} className="relative text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-4 relative z-10">
                        {item.step}
                      </div>
                      <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
              Custom Solutions Portfolio
            </h2>
            <div className="max-w-4xl mx-auto">
              <img
                src={customBuckets}
                alt="Custom bucket solutions"
                className="w-full rounded-lg shadow-large mb-8"
              />
              <p className="text-center text-muted-foreground mb-8">
                We've successfully delivered custom packaging solutions for leading brands
                across various industries. From vibrant colors to unique designs, our
                expertise brings your packaging vision to life.
              </p>
              <div className="text-center">
                <Button variant="default" size="lg" onClick={() => {
                  toast({
                    title: 'Redirecting to Quote Request',
                    description: 'Please fill out the form to start your custom project.',
                  });
                  navigate('/quote');
                }}>
                  Start Your Custom Project
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

export default Customization;