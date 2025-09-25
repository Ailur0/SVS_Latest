import { Shield, Award, Recycle, Truck } from 'lucide-react';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Superior Quality',
      description: 'ISO certified manufacturing with rigorous quality control at every step',
      color: 'text-primary',
    },
    {
      icon: Award,
      title: 'Customization Expertise',
      description: 'Custom colors, sizes, and branding solutions tailored to your needs',
      color: 'text-secondary',
    },
    {
      icon: Recycle,
      title: 'Sustainable Practices',
      description: 'Eco-friendly materials and processes for a greener tomorrow',
      color: 'text-primary',
    },
    {
      icon: Truck,
      title: 'On-Time Delivery',
      description: 'Reliable logistics ensuring your products arrive when promised',
      color: 'text-secondary',
    },
  ];

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-up" className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            WHY CHOOSE US
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            The SVS Polymer Advantage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combining cutting-edge technology with sustainable practices to deliver 
            packaging solutions that exceed expectations.
          </p>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ScrollAnimation
                key={feature.title}
                animation="scale"
                delay={index * 100}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light mb-4 ${feature.color}`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;