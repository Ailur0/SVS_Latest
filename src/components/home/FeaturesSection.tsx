import { TrendingUp, Factory, Shield, PackageCheck } from 'lucide-react';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: TrendingUp,
    title: 'Market Leadership',
    metric: '6+ Years',
    description: 'Trusted by 200+ customers across food, paint, and lubricant sectors with consistent quality and on-time delivery.',
    link: '/about',
  },
  {
    icon: Factory,
    title: 'End-to-End Manufacturing',
    metric: 'In-House',
    description: 'From tooling and moulding to decoration and delivery — full control over quality at every step.',
    link: '/quality',
  },
  {
    icon: Shield,
    title: 'Certified Quality',
    metric: 'ISO Certified',
    description: 'International standards compliance with rigorous in-house testing for every product line.',
    link: '/quality',
  },
  {
    icon: PackageCheck,
    title: 'Custom Packaging',
    metric: 'Made to Order',
    description: 'Custom sizes, closures, and colours — tailored packaging solutions built to your exact specifications.',
    link: '/customization',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-up" className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            WHY CHOOSE US
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            The SVS Polymer Advantage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Corporate credibility of a large-scale manufacturer with the speed and clarity of a modern packaging partner.
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
              >
                <div className="bg-background rounded-xl p-6 h-full flex flex-col group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                    {feature.metric}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-1">
                    {feature.description}
                  </p>
                  <Link
                    to={feature.link}
                    className="mt-4 text-sm font-semibold text-primary hover:underline"
                  >
                    Learn more →
                  </Link>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
