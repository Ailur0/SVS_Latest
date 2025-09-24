import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Shield, Lock, Eye, Database, UserCheck, Bell, FileText, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Contact information (name, email, phone number, company details)",
        "Product preferences and customization requirements",
        "Communication history and support inquiries",
        "Website usage data and analytics"
      ]
    },
    {
      icon: Shield,
      title: "How We Use Your Information",
      content: [
        "Process and fulfill your product orders",
        "Provide customer support and respond to inquiries",
        "Send important updates about your orders",
        "Improve our products and services"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "Industry-standard encryption for data transmission",
        "Secure servers with restricted access",
        "Regular security audits and updates",
        "Compliance with data protection regulations"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access your personal information",
        "Request corrections to your data",
        "Opt-out of marketing communications",
        "Request deletion of your information"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Privacy Policy</span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
                Your Privacy Matters to Us
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                At SVS Polymer Industries, we are committed to protecting your personal information 
                and being transparent about how we collect, use, and safeguard your data.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last Updated: January 2024
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-4xl mx-auto">
              <Card className="p-8 bg-card/50 backdrop-blur border-border">
                <Eye className="w-12 h-12 text-primary mb-4" />
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Our Commitment to Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  SVS Polymer Industries ("we," "our," or "us") respects your privacy and is committed 
                  to protecting your personal data. This privacy policy explains how we collect, use, 
                  disclose, and safeguard your information when you visit our website or engage with 
                  our services. Please read this privacy policy carefully. If you do not agree with 
                  the terms of this privacy policy, please do not access the site.
                </p>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Main Sections */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((section, index) => (
                <ScrollAnimation 
                  key={index} 
                  animation="fade-left" 
                  delay={index * 100}
                >
                  <Card className="p-8 bg-card hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                          {section.title}
                        </h3>
                        <ul className="space-y-2">
                          {section.content.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
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
        </section>

        {/* Cookies Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-4xl mx-auto">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <Bell className="w-12 h-12 text-primary mb-4" />
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Cookie Policy
                </h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies to enhance your browsing experience and analyze our traffic. 
                  Cookies are small text files stored on your device that help us:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span className="text-muted-foreground">Remember your preferences and settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span className="text-muted-foreground">Understand how you use our website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span className="text-muted-foreground">Improve our services and user experience</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  You can control cookies through your browser settings. However, disabling cookies 
                  may affect your ability to use certain features of our website.
                </p>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="scale" className="max-w-4xl mx-auto text-center">
              <Card className="p-12 bg-card border-border">
                <Mail className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                  Questions About Privacy?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  If you have any questions or concerns about our privacy policy or how we handle 
                  your personal information, please don't hesitate to contact us.
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: privacy@svspolymer.com</p>
                  <p>Phone: +91 98765 43210</p>
                  <p>Address: Plot No. 123, Industrial Area, Phase II, Gurugram, Haryana 122001</p>
                </div>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Updates Notice */}
        <section className="py-12 bg-primary/5 border-t border-primary/10">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-4xl mx-auto text-center">
              <FileText className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new privacy policy on this page and updating the "Last Updated" 
                date. You are advised to review this privacy policy periodically for any changes.
              </p>
            </ScrollAnimation>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;