import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Factory, Package, Award, Users } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Factory,
      title: "Market Leader",
      description: "20+ years of manufacturing excellence",
      highlight: "Since 2004"
    },
    {
      icon: Package,
      title: "Production Capacity",
      description: "10,000+ units daily production",
      highlight: "State-of-the-art"
    },
    {
      icon: Award,
      title: "Quality Certified",
      description: "ISO 9001:2015 certified facility",
      highlight: "International Standards"
    },
    {
      icon: Users,
      title: "Client Base",
      description: "Serving 500+ satisfied clients",
      highlight: "Pan India Presence"
    }
  ];

  return (
    <section className="py-16 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <ScrollAnimation
              key={stat.title}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {stat.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {stat.description}
                </p>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {stat.highlight}
                </span>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;