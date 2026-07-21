import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Award, Shield, FileCheck } from 'lucide-react';
import qualityLab from '@/assets/quality-lab.jpg';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import PageHeader from '@/components/ui/page-header';
import { quality } from '@/data/pageContent';

const CERTIFICATION_ICONS = [Award, Shield, FileCheck, CheckCircle];

const Quality = () => {
  const certifications = quality.certifications.map((cert, index) => ({
    ...cert,
    icon: CERTIFICATION_ICONS[index] ?? CheckCircle,
  }));

  const testingProcedures = quality.testingProcedures;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="">
        <PageHeader title={quality.heroTitle} subtitle={quality.heroSubtitle} />

        {/* Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {quality.introParagraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground mb-8 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
              Certifications & Standards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <ScrollAnimation key={cert.name} animation="fade-up" delay={index * 100}>
                    <Card className="text-center hover:shadow-large transition-all duration-300 hover:scale-105 h-full">
                      <CardContent className="pt-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-light text-primary mb-4">
                          <Icon className="h-8 w-8" />
                        </div>
                        <h3 className="font-heading text-xl font-semibold mb-2">
                          {cert.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {cert.description}
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testing Procedures */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Rigorous Testing Procedures
                </h2>
                <p className="text-muted-foreground mb-8">
                  Every product undergoes comprehensive testing at multiple stages of production
                  to ensure it meets our exacting standards and your requirements.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {testingProcedures.map((procedure) => (
                    <div key={procedure} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{procedure}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-large">
                <img
                  src={qualityLab}
                  alt="Quality Control Laboratory"
                  loading="lazy"
                  width="600"
                  height="400"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quality Assurance Process */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
              Our Quality Assurance Process
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {quality.qaSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
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

export default Quality;