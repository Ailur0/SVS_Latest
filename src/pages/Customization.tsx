import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Printer, Package, Layers } from 'lucide-react';
import customBuckets from '@/assets/custom-buckets.jpg';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/ui/page-header';
import { customization } from '@/data/pageContent';

const SERVICE_ICONS = [Palette, Printer, Package, Layers];

const Customization = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const services = customization.services.map((service, index) => ({
    ...service,
    icon: SERVICE_ICONS[index] ?? Package,
  }));

  const process = customization.process.map((item, index) => ({
    ...item,
    step: index + 1,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="">
        <PageHeader title={customization.heroTitle} subtitle={customization.heroSubtitle} />

        {/* Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                {customization.introHeading}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {customization.introText}
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-12 bg-muted">
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
        <section className="py-12">
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
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
              Custom Solutions Portfolio
            </h2>
            <div className="max-w-4xl mx-auto">
              <img
                src={customBuckets}
                alt="Custom bucket solutions"
                loading="lazy"
                width="800"
                height="600"
                className="w-full rounded-lg shadow-large mb-8"
              />
              <p className="text-center text-muted-foreground mb-8">
                {customization.portfolioText}
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