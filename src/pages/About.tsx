import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Lightbulb, Heart } from 'lucide-react';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import PageHeader from '@/components/ui/page-header';
import { about } from '@/data/pageContent';

const VALUE_ICONS = [Target, Lightbulb, Users, Heart];

const About = () => {
  const values = about.values.map((value, index) => ({
    ...value,
    icon: VALUE_ICONS[index] ?? Target,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="">
        <PageHeader title={about.heroTitle} />

        {/* Company Story */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                {about.storyHeading}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                {about.storyParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 bg-muted">
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
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                {about.philosophyHeading}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                {about.philosophyParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
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