import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, Package, Palette, Truck, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const bucketTypes = {
  standard: {
    name: "Standard Bucket",
    basePrice: 2.5,
    sizeMultiplier: {
      "1L": 0.8,
      "5L": 1,
      "10L": 1.5,
      "20L": 2.2,
      "30L": 3,
    },
  },
  foodGrade: {
    name: "Food Grade Bucket",
    basePrice: 3.5,
    sizeMultiplier: {
      "2L": 0.9,
      "5L": 1,
      "10L": 1.6,
      "15L": 2,
      "25L": 2.8,
    },
  },
  industrial: {
    name: "Heavy-Duty Industrial",
    basePrice: 5,
    sizeMultiplier: {
      "5L": 1,
      "10L": 1.7,
      "20L": 2.5,
      "30L": 3.5,
    },
  },
  chemical: {
    name: "Chemical Resistant",
    basePrice: 8,
    sizeMultiplier: {
      "5L": 1,
      "10L": 1.8,
      "20L": 2.8,
    },
  },
};

const customizations = {
  color: { name: "Custom Color", price: 0.15 },
  logo: { name: "Logo Printing", price: 0.25 },
  label: { name: "Custom Label", price: 0.2 },
  handle: { name: "Premium Handle", price: 0.3 },
  lid: { name: "Special Lid", price: 0.4 },
};

export default function CostCalculator() {
  const { toast } = useToast();
  const [bucketType, setBucketType] = useState<keyof typeof bucketTypes>("standard");
  const [size, setSize] = useState("5L");
  const [quantity, setQuantity] = useState(500);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [urgentDelivery, setUrgentDelivery] = useState(false);

  const calculatePrice = () => {
    const bucket = bucketTypes[bucketType];
    const sizeMultiplier = bucket.sizeMultiplier[size as keyof typeof bucket.sizeMultiplier] || 1;
    let unitPrice = bucket.basePrice * sizeMultiplier;

    // Add customization costs
    selectedCustomizations.forEach((custom) => {
      const customization = customizations[custom as keyof typeof customizations];
      if (customization) {
        unitPrice += customization.price;
      }
    });

    // Quantity discounts
    let discount = 0;
    if (quantity >= 10000) discount = 0.2;
    else if (quantity >= 5000) discount = 0.15;
    else if (quantity >= 2000) discount = 0.1;
    else if (quantity >= 1000) discount = 0.05;

    unitPrice = unitPrice * (1 - discount);

    // Urgent delivery surcharge
    if (urgentDelivery) {
      unitPrice = unitPrice * 1.15;
    }

    const totalPrice = unitPrice * quantity;
    const savings = bucket.basePrice * sizeMultiplier * quantity - totalPrice;

    return { unitPrice, totalPrice, discount, savings };
  };

  const { unitPrice, totalPrice, discount, savings } = calculatePrice();

  const toggleCustomization = (custom: string) => {
    setSelectedCustomizations((prev) =>
      prev.includes(custom)
        ? prev.filter((c) => c !== custom)
        : [...prev, custom]
    );
  };

  const generateQuote = () => {
    const quote = {
      type: bucketTypes[bucketType].name,
      size,
      quantity,
      customizations: selectedCustomizations,
      urgentDelivery,
      unitPrice: unitPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      discount: (discount * 100).toFixed(0) + "%",
      date: new Date().toLocaleDateString(),
    };

    // Create a text file content
    const content = `
BUCKETPRO COST ESTIMATE
========================
Date: ${quote.date}

Product Details:
- Type: ${quote.type}
- Size: ${quote.size}
- Quantity: ${quote.quantity.toLocaleString()} units

Customizations:
${quote.customizations.length ? quote.customizations.map(c => `- ${customizations[c as keyof typeof customizations].name}`).join('\n') : '- None'}

Delivery: ${quote.urgentDelivery ? 'Urgent (7 days)' : 'Standard (14-21 days)'}

Pricing:
- Unit Price: $${quote.unitPrice}
- Total Price: $${quote.totalPrice}
- Volume Discount: ${quote.discount}

Note: This is an estimate. Final pricing may vary based on specifications.
    `;

    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quote-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Quote Downloaded",
      description: `Your quote has been saved as ${a.download}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Cost Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant pricing estimates for your bucket orders with our interactive calculator
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator">
                <Calculator className="h-4 w-4 mr-2" />
                Calculator
              </TabsTrigger>
              <TabsTrigger value="bulk">
                <Package className="h-4 w-4 mr-2" />
                Bulk Pricing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Configuration Panel */}
                <div className="lg:col-span-2 space-y-6">
                  <ScrollAnimation delay={100}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Product Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Bucket Type */}
                        <div className="space-y-2">
                          <Label>Bucket Type <span className="text-destructive">*</span></Label>
                          <Select
                            value={bucketType}
                            onValueChange={(value) => setBucketType(value as keyof typeof bucketTypes)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(bucketTypes).map(([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Size */}
                        <div className="space-y-2">
                          <Label>Size <span className="text-destructive">*</span></Label>
                          <Select
                            value={size}
                            onValueChange={setSize}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(bucketTypes[bucketType].sizeMultiplier).map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Quantity */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Quantity <span className="text-destructive">*</span></Label>
                            <span className="text-sm font-medium text-primary">
                              {quantity.toLocaleString()} units
                            </span>
                          </div>
                          <Slider
                            value={[quantity]}
                            onValueChange={(value) => setQuantity(value[0])}
                            min={100}
                            max={20000}
                            step={100}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>100</span>
                            <span>20,000</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>

                  <ScrollAnimation delay={200}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Customization Options</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {Object.entries(customizations).map(([key, value]) => (
                            <div
                              key={key}
                              onClick={() => toggleCustomization(key)}
                              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedCustomizations.includes(key)
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <div className="text-sm font-medium text-foreground">
                                {value.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                +${value.price}/unit
                              </div>
                            </div>
                          ))}
                        </div>

                        <Separator className="my-4" />

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="urgent">Urgent Delivery</Label>
                            <p className="text-xs text-muted-foreground">
                              7-day delivery (+15% surcharge)
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            id="urgent"
                            checked={urgentDelivery}
                            onChange={(e) => setUrgentDelivery(e.target.checked)}
                            className="h-4 w-4"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                </div>

                {/* Pricing Summary */}
                <div className="lg:col-span-1">
                  <ScrollAnimation delay={300}>
                    <Card className="sticky top-24">
                      <CardHeader>
                        <CardTitle>Pricing Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Unit Price</span>
                            <span className="font-medium text-foreground">
                              ${unitPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Quantity</span>
                            <span className="font-medium text-foreground">
                              {quantity.toLocaleString()}
                            </span>
                          </div>
                          {discount > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Volume Discount</span>
                              <Badge variant="secondary">
                                -{(discount * 100).toFixed(0)}%
                              </Badge>
                            </div>
                          )}
                          {urgentDelivery && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Urgent Delivery</span>
                              <span className="text-orange-600">+15%</span>
                            </div>
                          )}
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-baseline">
                              <span className="text-lg font-semibold text-foreground">
                                Total Cost
                              </span>
                              <span className="text-2xl font-bold text-primary">
                                ${totalPrice.toFixed(2)}
                              </span>
                            </div>
                            {savings > 0 && (
                              <p className="text-sm text-green-600 text-right mt-1">
                                You save ${savings.toFixed(2)}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Button 
                              className="w-full" 
                              size="lg"
                              onClick={generateQuote}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download Quote
                            </Button>
                            <Button 
                              className="w-full" 
                              size="lg" 
                              variant="outline"
                              asChild
                            >
                              <a href="/quote">Request Official Quote</a>
                            </Button>
                          </div>

                          <div className="pt-4 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Truck className="h-3 w-3" />
                              <span>Free shipping on orders over $5,000</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Palette className="h-3 w-3" />
                              <span>Custom colors available</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Package className="h-3 w-3" />
                              <span>Bulk discounts applied</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bulk" className="mt-6">
              <ScrollAnimation>
                <Card>
                  <CardHeader>
                    <CardTitle>Volume Discount Tiers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { range: "100 - 999", discount: "Standard Price", color: "secondary" },
                        { range: "1,000 - 1,999", discount: "5% Off", color: "default" },
                        { range: "2,000 - 4,999", discount: "10% Off", color: "default" },
                        { range: "5,000 - 9,999", discount: "15% Off", color: "default" },
                        { range: "10,000+", discount: "20% Off", color: "default", highlight: true },
                      ].map((tier, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-2 ${
                            tier.highlight
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          }`}
                        >
                          <div className="text-lg font-semibold text-foreground">
                            {tier.range}
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">units</div>
                          <Badge variant={tier.color as any}>
                            {tier.discount}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 text-foreground">
                        Additional Benefits for Bulk Orders
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Orders 5,000+</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Free custom color matching</li>
                            <li>• Priority production queue</li>
                            <li>• Dedicated account manager</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Orders 10,000+</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Free logo printing setup</li>
                            <li>• Extended payment terms</li>
                            <li>• Free shipping nationwide</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}