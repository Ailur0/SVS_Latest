import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message sent successfully!',
      description: 'We will get back to you within 24 hours.',
    });
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="bg-gradient-primary py-20">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white text-center">
              Get in Touch
            </h1>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="mt-1"
                    />
                  </div>
                  <Button type="submit" variant="default" size="lg">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <ScrollAnimation animation="fade-left" delay={100}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-primary" />
                          Phone
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>+91 98765 43210</p>
                        <p>+91 98765 43211</p>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>

                  <ScrollAnimation animation="fade-left" delay={200}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-primary" />
                          Email
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>info@svspolymer.com</p>
                        <p>sales@svspolymer.com</p>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>

                  <ScrollAnimation animation="fade-left" delay={300}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          SVS Polymer Industries<br />
                          Industrial Area, Phase 2<br />
                          Bangalore, Karnataka 560058<br />
                          India
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>

                  <ScrollAnimation animation="fade-left" delay={400}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          Business Hours
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-8">
              Find Us on Map
            </h2>
            <div className="max-w-6xl mx-auto rounded-lg overflow-hidden shadow-large">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5686825785576!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNCJF!5e0!3m2!1sen!2sin!4v1635959195877!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SVS Polymer Industries Location"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;