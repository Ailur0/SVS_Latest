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
        "All orders are subject to acceptance and stock or production availability",
        "Delivery timelines are estimates and may vary based on order size and location",
        "Risk of loss transfers to the buyer upon handover to the carrier or transporter",
        "Custom orders are subject to agreed specifications, lead times, and advance payment terms",
        "Minimum order quantities may apply for certain product lines and custom requirements"
      ]
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: [
        "Payment terms are agreed upon at the time of order confirmation",
        "Custom and made-to-order products require advance payment as per the agreed schedule",
        "We accept bank transfers and other mutually agreed payment methods",
        "Prices are subject to revision; any changes will be communicated before order confirmation",
        "Late payments may attract interest as per mutually agreed terms"
      ]
    },
    {
      icon: Scale,
      title: "Warranties & Liabilities",
      content: [
        "Products are warranted against manufacturing defects at the time of delivery",
        "Claims for damaged or defective goods must be raised within 7 days of receipt",
        "Our liability is limited to replacement of the defective product or a credit note",
        "We are not liable for losses arising from misuse, improper storage, or third-party modifications",
        "We are not liable for indirect or consequential damages under any circumstances"
      ]
    },
    {
      icon: Globe,
      title: "Intellectual Property",
      content: [
        "All website content, including text, images, and designs, is the property of SVS Polymer Industries",
        "Custom designs and specifications provided by customers remain the property of the customer",
        "SVS Polymer Industries retains the right to use product images for portfolio and marketing purposes unless otherwise agreed",
        "Unauthorised use of our brand name, logo, or trademarks is not permitted"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-accent/10 via-background to-primary/10 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
                <FileText className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold text-accent">Legal Agreement</span>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
                Terms &amp; Conditions
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Please read these terms carefully before placing an order or using our services.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Effective Date: January 2026
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="scale" className="max-w-3xl mx-auto">
              <Alert className="border-primary/50 bg-primary/5">
                <AlertCircle className="h-5 w-5 text-primary" />
                <AlertDescription className="text-foreground text-sm">
                  <strong>Important:</strong> By accessing our website or purchasing our products,
                  you agree to be bound by these terms and conditions. If you disagree with any
                  part of these terms, please do not use our services.
                </AlertDescription>
              </Alert>
            </ScrollAnimation>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-10 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-3xl mx-auto">
              <Card className="p-6 md:p-8 bg-card/50 border-border">
                <Gavel className="w-10 h-10 text-accent mb-4" />
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
                  Agreement to Terms
                </h2>
                <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                  <p>
                    These Terms and Conditions ("Terms") govern your use of the SVS Polymer Industries
                    website and the purchase of our products. They constitute a binding agreement
                    between you and SVS Polymer Industries, Hyderabad.
                  </p>
                  <p>
                    We reserve the right to update these Terms at any time. Continued use of our
                    services after any changes constitutes your acceptance of the revised Terms.
                  </p>
                </div>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Main Sections */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <ScrollAnimation animation="fade-up" className="mb-10 text-center">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  Key Terms &amp; Conditions
                </h2>
              </ScrollAnimation>

              <div className="grid gap-6">
                {sections.map((section, index) => (
                  <ScrollAnimation
                    key={index}
                    animation={index % 2 === 0 ? "fade-right" : "fade-left"}
                    delay={index * 100}
                  >
                    <Card className="p-6 md:p-8 bg-card hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-accent/10 rounded-lg flex-shrink-0">
                          <section.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                            {section.title}
                          </h3>
                          <ul className="space-y-2">
                            {section.content.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
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

        {/* Additional Provisions */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">
                Additional Provisions
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                <ScrollAnimation animation="scale" delay={100}>
                  <Card className="p-5 bg-card h-full">
                    <h3 className="font-heading text-base font-bold text-foreground mb-2">
                      Force Majeure
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We shall not be liable for delays or failure to perform due to circumstances
                      beyond our reasonable control, including natural disasters, strikes, or
                      government actions.
                    </p>
                  </Card>
                </ScrollAnimation>

                <ScrollAnimation animation="scale" delay={200}>
                  <Card className="p-5 bg-card h-full">
                    <h3 className="font-heading text-base font-bold text-foreground mb-2">
                      Dispute Resolution
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Any disputes shall first be resolved through mutual negotiation. If unresolved,
                      disputes shall be submitted to arbitration in accordance with applicable
                      Indian law.
                    </p>
                  </Card>
                </ScrollAnimation>

                <ScrollAnimation animation="scale" delay={300}>
                  <Card className="p-5 bg-card h-full">
                    <h3 className="font-heading text-base font-bold text-foreground mb-2">
                      Governing Law
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      These Terms are governed by the laws of India. Any legal proceedings shall
                      be brought exclusively in the courts of Hyderabad, Telangana.
                    </p>
                  </Card>
                </ScrollAnimation>

                <ScrollAnimation animation="scale" delay={400}>
                  <Card className="p-5 bg-card h-full">
                    <h3 className="font-heading text-base font-bold text-foreground mb-2">
                      Severability
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      If any provision of these Terms is found unenforceable, the remaining
                      provisions shall continue in full force and effect.
                    </p>
                  </Card>
                </ScrollAnimation>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-3xl mx-auto text-center">
              <Card className="p-8 md:p-10 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
                <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
                  Have Questions?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm">
                  For any questions about these Terms &amp; Conditions, please contact us before
                  placing an order.
                </p>
                <div className="space-y-1 text-muted-foreground text-sm">
                  <p>Email: svspolymerinds@gmail.com</p>
                  <p>Phone: +91 96526 96819</p>
                  <p>Address: Plot No. 156 &amp; 157, Navodaya Society I.E., Phase-V, IDA, Cherlapally, Hyderabad – 500 051</p>
                </div>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Acceptance */}
        <section className="py-10 bg-accent/5 border-t border-accent/10">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-3xl mx-auto text-center">
              <p className="text-sm text-muted-foreground">
                By using our website or services, you acknowledge that you have read, understood,
                and agree to be bound by these Terms &amp; Conditions and our Privacy Policy.
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
