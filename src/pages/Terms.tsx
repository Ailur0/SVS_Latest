import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { FileText, Scale, AlertCircle, Users, Package, CreditCard, Globe, Gavel } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Terms = () => {
  const sections = [
    {
      icon: Package,
      title: "Product Orders & Delivery",
      content: [
        "All orders are subject to acceptance and availability",
        "Delivery times are estimates and not guaranteed",
        "Risk of loss transfers upon delivery to the carrier",
        "Custom orders may have different terms and lead times",
        "Minimum order quantities may apply for certain products"
      ]
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: [
        "Payment terms are net 30 days unless otherwise agreed",
        "Late payments may incur interest charges",
        "We accept bank transfers, cheques, and approved credit",
        "Custom orders require 50% advance payment",
        "Prices are subject to change with 30 days notice"
      ]
    },
    {
      icon: Scale,
      title: "Warranties & Liabilities",
      content: [
        "Products are warranted against manufacturing defects",
        "Warranty period is 12 months from delivery date",
        "Liability is limited to product replacement or refund",
        "We are not liable for consequential or indirect damages",
        "Claims must be made within 7 days of delivery"
      ]
    },
    {
      icon: Globe,
      title: "Intellectual Property",
      content: [
        "All content on this website is our property",
        "Custom designs remain property of the customer",
        "We retain rights to use project images for marketing",
        "Trademark and logo usage requires written permission",
        "Patent and design rights are respected"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-accent/10 via-background to-primary/10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
                <FileText className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold text-accent">Legal Agreement</span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Terms & Conditions
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Please read these terms and conditions carefully before using our services 
                or purchasing our products.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Effective Date: January 1, 2024
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="scale" className="max-w-4xl mx-auto">
              <Alert className="border-primary/50 bg-primary/5">
                <AlertCircle className="h-5 w-5 text-primary" />
                <AlertDescription className="text-foreground">
                  <strong>Important:</strong> By accessing our website or purchasing our products, 
                  you agree to be bound by these terms and conditions. If you disagree with any 
                  part of these terms, please do not use our services.
                </AlertDescription>
              </Alert>
            </ScrollAnimation>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-4xl mx-auto">
              <Card className="p-8 bg-card/50 backdrop-blur border-border">
                <Gavel className="w-12 h-12 text-accent mb-4" />
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Agreement to Terms
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    These Terms and Conditions ("Terms") govern your use of the SVS Polymer Industries 
                    website and the purchase of our products. These Terms constitute a legally binding 
                    agreement between you and SVS Polymer Industries.
                  </p>
                  <p>
                    We reserve the right to update or modify these Terms at any time without prior notice. 
                    Your continued use of our services following any changes indicates your acceptance 
                    of the new Terms.
                  </p>
                </div>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Main Sections */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ScrollAnimation animation="fade-up" className="mb-12 text-center">
                <h2 className="font-heading text-3xl font-bold text-foreground">
                  Key Terms & Conditions
                </h2>
              </ScrollAnimation>
              
              <div className="grid gap-8">
                {sections.map((section, index) => (
                  <ScrollAnimation 
                    key={index} 
                    animation={index % 2 === 0 ? "fade-right" : "fade-left"} 
                    delay={index * 100}
                  >
                    <Card className="p-8 bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <section.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                            {section.title}
                          </h3>
                          <ul className="space-y-3">
                            {section.content.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Terms */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-4xl mx-auto">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
                Additional Provisions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <ScrollAnimation animation="scale" delay={100}>
                  <Card className="p-6 bg-card h-full">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                      Force Majeure
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We shall not be liable for any failure or delay in performance due to 
                      circumstances beyond our reasonable control, including but not limited to 
                      acts of God, natural disasters, war, terrorism, riots, embargoes, or strikes.
                    </p>
                  </Card>
                </ScrollAnimation>
                
                <ScrollAnimation animation="scale" delay={200}>
                  <Card className="p-6 bg-card h-full">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                      Dispute Resolution
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Any disputes arising from these Terms shall be resolved through negotiation. 
                      If negotiation fails, disputes shall be submitted to binding arbitration 
                      in accordance with Indian law.
                    </p>
                  </Card>
                </ScrollAnimation>
                
                <ScrollAnimation animation="scale" delay={300}>
                  <Card className="p-6 bg-card h-full">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                      Governing Law
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      These Terms shall be governed by and construed in accordance with the laws 
                      of India. Any legal action or proceeding shall be brought exclusively in 
                      the courts of Haryana, India.
                    </p>
                  </Card>
                </ScrollAnimation>
                
                <ScrollAnimation animation="scale" delay={400}>
                  <Card className="p-6 bg-card h-full">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                      Severability
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      If any provision of these Terms is found to be unenforceable or invalid, 
                      that provision shall be limited or eliminated to the minimum extent necessary 
                      so that these Terms shall otherwise remain in full force and effect.
                    </p>
                  </Card>
                </ScrollAnimation>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-4xl mx-auto text-center">
              <Card className="p-12 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
                <Users className="w-16 h-16 text-accent mx-auto mb-6" />
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Have Questions?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  If you have any questions about these Terms & Conditions, please contact our 
                  legal department for clarification before using our services.
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: legal@svspolymer.com</p>
                  <p>Phone: +91 98765 43210</p>
                  <p>Business Hours: Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
                </div>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Acceptance */}
        <section className="py-12 bg-accent/5 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground">
                By using our website or services, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms & Conditions and our Privacy Policy.
              </p>
            </ScrollAnimation>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;