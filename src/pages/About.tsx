import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Lightbulb, Heart } from 'lucide-react';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To deliver innovative and sustainable plastic packaging solutions that help businesses succeed while protecting our environment.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously improving our products and processes through research and development to stay ahead of market needs.',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Building long-term partnerships by understanding and exceeding our customers expectations at every interaction.',
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices and materials that minimize environmental impact without compromising quality.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="bg-gradient-primary py-20">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white text-center">
                About SVS Polymer Industries
              </h1>
            </ScrollAnimation>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2000, SVS Polymer Industries began as a small manufacturing unit
                  with a vision to revolutionize the plastic packaging industry. Over the years,
                  we have grown into one of the region's most trusted manufacturers of high-quality
                  plastic buckets and containers.
                </p>
                <p>
                  Our journey has been marked by continuous innovation, unwavering commitment to
                  quality, and a deep understanding of our customers' needs. From serving local
                  paint manufacturers to partnering with multinational food processing companies,
                  we have consistently delivered products that meet the highest standards.
                </p>
                <p>
                  Today, with state-of-the-art manufacturing facilities and a team of dedicated
                  professionals, we produce millions of containers annually, serving diverse
                  industries across the country. Our success is built on the foundation of trust,
                  quality, and the relationships we've cultivated with our clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
              Our Values & Vision
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <ScrollAnimation key={value.title} animation="scale" delay={index * 100}>
                    <Card className="text-center hover:shadow-large transition-all duration-300 hover:scale-105 h-full">
                      <CardContent className="pt-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-light text-primary mb-4">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-2">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                );
              })}
            </div>
          </div>
        </section>

        {/* Manufacturing Philosophy */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                Manufacturing Philosophy
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At SVS Polymer Industries, quality is not just a goal—it's our way of life.
                  Every product that leaves our facility undergoes rigorous quality checks and
                  meets international standards. We believe that excellence in manufacturing comes
                  from attention to detail at every stage of production.
                </p>
                <p>
                  Our manufacturing philosophy centers on three pillars: Innovation, Sustainability,
                  and Reliability. We invest heavily in modern machinery and technology to ensure
                  consistent product quality. Our team of skilled technicians and engineers work
                  tirelessly to optimize processes and develop new solutions.
                </p>
                <p>
                  We are committed to sustainable manufacturing practices, using recyclable materials
                  whenever possible and minimizing waste throughout our production cycle. This
                  commitment extends to our supply chain, where we partner with suppliers who share
                  our values of environmental responsibility.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;