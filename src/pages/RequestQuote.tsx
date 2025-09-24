import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

const RequestQuote = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    productType: '',
    capacity: '',
    quantity: '',
    customization: [],
    additionalRequirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Quote request submitted!',
      description: 'Our sales team will contact you within 24 hours with a detailed quotation.',
    });
    // Reset form
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      productType: '',
      capacity: '',
      quantity: '',
      customization: [],
      additionalRequirements: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData({
      ...formData,
      customization: checked
        ? [...formData.customization, value]
        : formData.customization.filter((item) => item !== value),
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
              Request a Custom Quote
            </h1>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <ScrollAnimation animation="fade-up">
                <div className="bg-card rounded-lg shadow-large p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Get Your Personalized Quote
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below with your requirements, and our team will provide
                  you with a competitive quote tailored to your needs.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-lg font-semibold">Company Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name <span className="text-destructive">*</span></Label>
                      <Input
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    <div>
                      <Label htmlFor="contactPerson">Contact Person <span className="text-destructive">*</span></Label>
                      <Input
                          id="contactPerson"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Label htmlFor="phone">Phone <span className="text-destructive">*</span></Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Requirements */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-lg font-semibold">Product Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productType">Product Type <span className="text-destructive">*</span></Label>
                    <Select
                          value={formData.productType}
                          onValueChange={(value) => handleSelectChange('productType', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select product type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paint">Paint Buckets</SelectItem>
                            <SelectItem value="food">Food Grade Containers</SelectItem>
                            <SelectItem value="industrial">Industrial Buckets</SelectItem>
                            <SelectItem value="custom">Custom Design</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="capacity">Capacity <span className="text-destructive">*</span></Label>
                        <Select
                          value={formData.capacity}
                          onValueChange={(value) => handleSelectChange('capacity', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5L">5 Liters</SelectItem>
                            <SelectItem value="10L">10 Liters</SelectItem>
                            <SelectItem value="15L">15 Liters</SelectItem>
                            <SelectItem value="20L">20 Liters</SelectItem>
                            <SelectItem value="25L">25 Liters</SelectItem>
                            <SelectItem value="custom">Custom Size</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="quantity">Quantity (Units) <span className="text-destructive">*</span></Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        placeholder="Minimum order: 1000 units"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Customization Options */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-lg font-semibold">Customization Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="customColor"
                          onCheckedChange={(checked) =>
                            handleCheckboxChange('customColor', checked as boolean)
                          }
                        />
                        <Label htmlFor="customColor" className="font-normal cursor-pointer">
                          Custom Colors
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="printing"
                          onCheckedChange={(checked) =>
                            handleCheckboxChange('printing', checked as boolean)
                          }
                        />
                        <Label htmlFor="printing" className="font-normal cursor-pointer">
                          Custom Printing/Labeling
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="customMold"
                          onCheckedChange={(checked) =>
                            handleCheckboxChange('customMold', checked as boolean)
                          }
                        />
                        <Label htmlFor="customMold" className="font-normal cursor-pointer">
                          Custom Mold Development
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <Label htmlFor="additionalRequirements">
                      Additional Requirements or Specifications
                    </Label>
                    <Textarea
                      id="additionalRequirements"
                      name="additionalRequirements"
                      value={formData.additionalRequirements}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Please provide any specific requirements, certifications needed, or other details..."
                      className="mt-1"
                    />
                  </div>

                  {/* Privacy Statement */}
                  <div className="text-sm text-muted-foreground">
                    <p>
                      * Required fields. We respect your privacy and will use your information
                      only to process your quote request and communicate with you about our products.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" variant="secondary" size="lg" className="w-full">
                    Submit Quote Request
                  </Button>
                </form>
                </div>
              </ScrollAnimation>

              {/* Process Explanation */}
              <div className="mt-12 text-center">
                <h3 className="font-heading text-xl font-semibold mb-4">
                  What Happens Next?
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>1. Our team will review your requirements within 24 hours</p>
                  <p>2. We'll prepare a detailed quotation based on your specifications</p>
                  <p>3. A sales representative will contact you to discuss the quote</p>
                  <p>4. We can provide samples if needed before you place the order</p>
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

export default RequestQuote;