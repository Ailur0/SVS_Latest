import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Award, Shield, FileCheck } from 'lucide-react';
import qualityLab from '@/assets/quality-lab.jpg';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

const Quality = () => {
  const certifications = [
    {
      name: 'ISO 9001:2015',
      description: 'Quality Management System certification ensuring consistent quality',
      icon: Award,
    },
    {
      name: 'ISO 14001:2015',
      description: 'Environmental Management System for sustainable operations',
      icon: Shield,
    },
    {
      name: 'FDA Approved',
      description: 'Food and Drug Administration approval for food-grade products',
      icon: FileCheck,
    },
    {
      name: 'BIS Standards',
      description: 'Bureau of Indian Standards compliance for all products',
      icon: CheckCircle,
    },
  ];

  const testingProcedures = [
    'Raw Material Inspection',
    'In-Process Quality Checks',
    'Dimensional Accuracy Testing',
    'Leak and Pressure Testing',
    'Drop Impact Testing',
    'Chemical Resistance Testing',
    'UV Stability Testing',
    'Final Product Inspection',
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
                Our Commitment to Quality
              </h1>
            </ScrollAnimation>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground mb-8">
                At SVS Polymer Industries, quality is not just a department—it's a company-wide
                commitment that drives everything we do. From raw material selection to final
                product delivery, we maintain the highest standards of quality control and
                assurance to ensure our customers receive products that exceed expectations.
              </p>
              <p className="text-lg text-muted-foreground">
                Our state-of-the-art quality control laboratory is equipped with advanced testing
                equipment and staffed by experienced professionals who ensure every product meets
                stringent quality parameters before leaving our facility.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-muted">
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
        <section className="py-20">
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
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quality Assurance Process */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
              Our Quality Assurance Process
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Raw Material Selection
                    </h3>
                    <p className="text-muted-foreground">
                      We source only the highest quality virgin and food-grade plastics from
                      certified suppliers, ensuring consistency and safety.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Production Monitoring
                    </h3>
                    <p className="text-muted-foreground">
                      Continuous monitoring during production with real-time quality checks
                      ensures adherence to specifications.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Testing & Validation
                    </h3>
                    <p className="text-muted-foreground">
                      Comprehensive testing including physical, chemical, and performance tests
                      validate product quality.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      Final Inspection
                    </h3>
                    <p className="text-muted-foreground">
                      100% inspection of finished products before packaging and dispatch
                      ensures zero defects reach our customers.
                    </p>
                  </div>
                </div>
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