import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Shield, Lock, Eye, Database, UserCheck, Bell, FileText, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';

const sectionStyles = [
  {
    border: 'border-l-4 border-l-blue-500',
    bg: 'bg-blue-50/60 dark:bg-blue-950/20',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  },
  {
    border: 'border-l-4 border-l-emerald-500',
    bg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  },
  {
    border: 'border-l-4 border-l-amber-500',
    bg: 'bg-amber-50/60 dark:bg-amber-950/20',
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  },
  {
    border: 'border-l-4 border-l-violet-500',
    bg: 'bg-violet-50/60 dark:bg-violet-950/20',
    iconBg: 'bg-violet-100 dark:bg-violet-900/40',
    iconColor: 'text-violet-600 dark:text-violet-400',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
  },
];

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Contact information: name, email address, phone number, and company name",
        "Product enquiry details and customisation requirements you share with us",
        "Communication history including emails and messages sent through our website",
        "Basic website usage data (pages visited, browser type) via standard analytics"
      ]
    },
    {
      icon: Shield,
      title: "How We Use Your Information",
      content: [
        "Respond to product enquiries, quotation requests, and sample requests",
        "Process and coordinate orders placed with SVS Polymer Industries",
        "Send transactional communications related to your enquiry or order",
        "Improve our website and product offerings based on feedback"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "Your information is stored securely and accessed only by authorised personnel",
        "We do not sell, rent, or share your personal data with third parties for marketing",
        "Data shared with us is used solely for the purposes described in this policy",
        "We take reasonable steps to protect your information from unauthorised access"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Request access to the personal information we hold about you",
        "Ask us to correct any inaccurate or incomplete information",
        "Request that we delete your data if it is no longer required",
        "Withdraw consent for marketing communications at any time"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <ScrollAnimation animation="fade-up" className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Privacy Policy</span>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
                Your Privacy Matters
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                SVS Polymer Industries is committed to protecting your personal information
                and being transparent about how we use it.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last Updated: March 2026
              </p>
            </ScrollAnimation>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-3xl mx-auto">
              <Card className="p-6 md:p-8 bg-card/50 border-border">
                <Eye className="w-10 h-10 text-primary mb-4" />
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
                  Our Commitment
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  SVS Polymer Industries ("we", "our", or "us") respects your privacy. This policy explains
                  how we collect, use, and protect your personal information when you visit our website
                  or contact us regarding our packaging products. By using this site, you agree to
                  the practices described below.
                </p>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Main Sections */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {sections.map((section, index) => {
                const styles = sectionStyles[index];
                const Icon = section.icon;
                return (
                  <ScrollAnimation
                    key={index}
                    animation={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                    delay={index * 100}
                  >
                    <Card className={`p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 ${styles.border} ${styles.bg}`}>
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 ${styles.iconBg} rounded-lg flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${styles.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>
                              0{index + 1}
                            </span>
                            <h3 className="font-heading text-lg font-bold text-foreground">
                              {section.title}
                            </h3>
                          </div>
                          <ul className="space-y-2">
                            {section.content.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${styles.iconColor.replace('text-', 'bg-')}`}></div>
                                <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </ScrollAnimation>
                );
              })}
            </div>
          </div>
        </section>

        {/* Cookies Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-3xl mx-auto">
              <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <Bell className="w-10 h-10 text-primary mb-4" />
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
                  Cookie Policy
                </h2>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Our website may use cookies — small text files stored on your device — to
                  remember your preferences and understand how visitors use the site. No personally
                  identifiable information is collected through cookies. You can disable cookies
                  through your browser settings at any time.
                </p>
              </Card>
            </ScrollAnimation>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="scale" className="max-w-3xl mx-auto text-center">
              <Card className="p-8 md:p-10 bg-card border-border">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
                  Privacy Questions?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm">
                  If you have any questions about this privacy policy or how we handle your
                  personal information, please contact us directly.
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

        {/* Updates Notice */}
        <section className="py-10 bg-primary/5 border-t border-primary/10">
          <div className="container mx-auto px-4">
            <ScrollAnimation animation="fade-up" className="max-w-3xl mx-auto text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                We may update this privacy policy from time to time. Changes will be reflected
                on this page with a revised "Last Updated" date.
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
