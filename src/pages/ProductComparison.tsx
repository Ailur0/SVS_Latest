import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Check, X, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const products = [
  {
    id: "paint-bucket",
    name: "Paint Bucket",
    category: "Industrial",
    price: "$2.50 - $5.00",
    sizes: ["1L", "5L", "10L", "20L"],
    features: {
      material: "Food-Grade Plastic",
      lidType: "Snap-On Lid",
      handle: "Metal Wire Handle",
      temperature: "-20°C to 60°C",
      stackable: true,
      recyclable: true,
      customizable: true,
      foodSafe: true,
      chemicalResistant: false,
      uvProtection: false,
      minOrder: "500 units",
      leadTime: "7-10 days",
    },
  },
  {
    id: "food-bucket",
    name: "Food Storage Bucket",
    category: "Food & Beverage",
    price: "$3.00 - $7.00",
    sizes: ["2L", "5L", "10L", "15L", "25L"],
    features: {
      material: "FDA Approved PP",
      lidType: "Airtight Seal",
      handle: "Ergonomic Plastic",
      temperature: "-40°C to 100°C",
      stackable: true,
      recyclable: true,
      customizable: true,
      foodSafe: true,
      chemicalResistant: false,
      uvProtection: true,
      minOrder: "250 units",
      leadTime: "5-7 days",
    },
  },
  {
    id: "industrial-bucket",
    name: "Heavy-Duty Industrial",
    category: "Industrial",
    price: "$5.00 - $12.00",
    sizes: ["5L", "10L", "20L", "30L"],
    features: {
      material: "High-Density PE",
      lidType: "Tamper-Evident",
      handle: "Reinforced Steel",
      temperature: "-30°C to 80°C",
      stackable: true,
      recyclable: true,
      customizable: true,
      foodSafe: false,
      chemicalResistant: true,
      uvProtection: true,
      minOrder: "100 units",
      leadTime: "10-14 days",
    },
  },
  {
    id: "chemical-bucket",
    name: "Chemical Resistant",
    category: "Chemical",
    price: "$8.00 - $15.00",
    sizes: ["5L", "10L", "20L"],
    features: {
      material: "Special Grade HDPE",
      lidType: "Chemical Seal",
      handle: "Anti-Corrosion",
      temperature: "-50°C to 90°C",
      stackable: false,
      recyclable: true,
      customizable: false,
      foodSafe: false,
      chemicalResistant: true,
      uvProtection: true,
      minOrder: "200 units",
      leadTime: "14-21 days",
    },
  },
];

type FeatureKey = keyof typeof products[0]["features"];

const featureLabels: Record<FeatureKey, string> = {
  material: "Material",
  lidType: "Lid Type",
  handle: "Handle Type",
  temperature: "Temperature Range",
  stackable: "Stackable",
  recyclable: "Recyclable",
  customizable: "Custom Branding",
  foodSafe: "Food Safe",
  chemicalResistant: "Chemical Resistant",
  uvProtection: "UV Protection",
  minOrder: "Minimum Order",
  leadTime: "Lead Time",
};

export default function ProductComparison() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    products[0].id,
    products[1].id,
  ]);

  const handleProductSelect = (index: number, productId: string) => {
    const newSelection = [...selectedProducts];
    newSelection[index] = productId;
    setSelectedProducts(newSelection);
    
    toast({
      title: "Product Selected",
      description: `${products.find(p => p.id === productId)?.name} added to comparison`,
    });
  };

  const addComparison = () => {
    if (selectedProducts.length < 4) {
      const availableProduct = products.find(
        (p) => !selectedProducts.includes(p.id)
      );
      if (availableProduct) {
        setSelectedProducts([...selectedProducts, availableProduct.id]);
        toast({
          title: "Product Added",
          description: "Another product slot has been added for comparison",
        });
      }
    } else {
      toast({
        title: "Maximum Reached",
        description: "You can compare up to 4 products at a time",
        variant: "destructive"
      });
    }
  };

  const removeComparison = (index: number) => {
    if (selectedProducts.length > 2) {
      setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
      toast({
        title: "Product Removed",
        description: "Product has been removed from comparison",
      });
    } else {
      toast({
        title: "Minimum Required",
        description: "You need at least 2 products to compare",
        variant: "destructive"
      });
    }
  };

  const renderFeatureValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-600" />
      ) : (
        <X className="h-5 w-5 text-red-600" />
      );
    }
    return <span className="text-foreground">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Product Comparison Tool
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare our bucket models side-by-side to find the perfect solution for your needs
            </p>
          </div>
        </ScrollAnimation>

        <div className="mb-8">
          <ScrollAnimation delay={100}>
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {products.map((product) => (
                  <Badge
                    key={product.id}
                    variant={
                      selectedProducts.includes(product.id)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer py-2 px-4"
                    onClick={() => {
                      if (!selectedProducts.includes(product.id)) {
                        handleProductSelect(
                          selectedProducts.length > 0 ? 0 : 1,
                          product.id
                        );
                      }
                    }}
                  >
                    {product.name}
                  </Badge>
                ))}
              </div>
              {selectedProducts.length < 4 && (
                <Button onClick={addComparison} size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Product
                </Button>
              )}
            </div>
          </ScrollAnimation>
        </div>

        <ScrollAnimation delay={200}>
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[200px_repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
                {/* Header Row */}
                <div className="font-semibold text-lg text-foreground p-4">
                  Select Products
                </div>
                {selectedProducts.map((productId, index) => {
                  const product = products.find((p) => p.id === productId)!;
                  return (
                    <div key={index} className="relative">
                      <Card className="p-4">
                        <Select
                          value={productId}
                          onValueChange={(value) =>
                            handleProductSelect(index, value)
                          }
                        >
                          <SelectTrigger className="w-full mb-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((p) => (
                              <SelectItem
                                key={p.id}
                                value={p.id}
                                disabled={
                                  selectedProducts.includes(p.id) &&
                                  p.id !== productId
                                }
                              >
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="text-center">
                          <h3 className="font-semibold text-foreground">
                            {product.name}
                          </h3>
                          <Badge variant="secondary" className="mt-1">
                            {product.category}
                          </Badge>
                          <p className="text-primary font-semibold mt-2">
                            {product.price}
                          </p>
                        </div>
                        {selectedProducts.length > 2 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeComparison(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </Card>
                    </div>
                  );
                })}
              </div>

              {/* Feature Rows */}
              {(Object.keys(featureLabels) as FeatureKey[]).map(
                (featureKey) => (
                  <div
                    key={featureKey}
                    className="grid grid-cols-[200px_repeat(auto-fit,_minmax(200px,_1fr))] gap-4 mt-2"
                  >
                    <div className="p-4 font-medium text-muted-foreground">
                      {featureLabels[featureKey]}
                    </div>
                    {selectedProducts.map((productId, index) => {
                      const product = products.find(
                        (p) => p.id === productId
                      )!;
                      return (
                        <div
                          key={index}
                          className="p-4 bg-muted/20 rounded-lg flex items-center justify-center"
                        >
                          {renderFeatureValue(product.features[featureKey])}
                        </div>
                      );
                    })}
                  </div>
                )
              )}

              {/* Sizes Row */}
              <div className="grid grid-cols-[200px_repeat(auto-fit,_minmax(200px,_1fr))] gap-4 mt-2">
                <div className="p-4 font-medium text-muted-foreground">
                  Available Sizes
                </div>
                {selectedProducts.map((productId, index) => {
                  const product = products.find((p) => p.id === productId)!;
                  return (
                    <div
                      key={index}
                      className="p-4 bg-muted/20 rounded-lg"
                    >
                      <div className="flex flex-wrap gap-1 justify-center">
                        {product.sizes.map((size) => (
                          <Badge key={size} variant="outline">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={300}>
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Need Help Choosing?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our experts are ready to help you find the perfect bucket solution
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={() => {
                toast({
                  title: "Redirecting to Quote Request",
                  description: "Taking you to the quote request form",
                });
                navigate('/quote');
              }}>
                Get Custom Quote
              </Button>
              <Button size="lg" variant="outline" onClick={() => {
                toast({
                  title: "Contact Expert",
                  description: "Connecting you with our product experts",
                });
                navigate('/contact');
              }}>
                Contact Expert
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </main>

      <Footer />
    </div>
  );
}