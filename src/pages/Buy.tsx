import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ArrowRight, Home, Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import robotHero from "@/assets/robot-hero.jpg";
import robotComponents from "@/assets/amt.jpg";

export const Buy = () => {
  const navigate = useNavigate(); // ✅ navigation hook

  const products = [
    {
      id: "home",
      name: "Home Spaces",
      image: robotHero,
      icon: Home,
      description: "Perfect for households and residential use",
      features: ["Residential areas", "Family homes", "Small apartments"],
      specs: ["Capacity: 4x80L", "Height: 130cm", "Diameter: 60cm"],
      price: "₹4,000*",
      originalPrice: "₹5000",
      popular: false,
    },
    {
      id: "commercial",
      name: "Commercial Spaces",
      image: robotComponents,
      icon: Building2,
      description: "Built for offices, schools, and public areas",
      features: [
        "Offices",
        "Schools & Universities",
        "Shopping centers",
        "Public buildings",
      ],
      specs: ["Capacity: 4x100L", "Height: 146cm", "Diameter: 70cm"],
      price: "₹10,500*",
      originalPrice: "₹15500",
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Products Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-eco transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="w-full h-80 rounded-xl overflow-hidden mb-8 bg-muted/30">
                    <img
                      src={product.image}
                      alt={`${product.name} - Smart Waste Segregation Robot with 4-bin sorting system`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Title */}
                  <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                    {product.name}
                  </h2>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {product.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center text-muted-foreground"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0" />
                        <span className="text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specifications */}
                  <div className="space-y-3 mb-8">
                    {product.specs.map((spec) => (
                      <div
                        key={spec}
                        className="flex items-center text-muted-foreground"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0" />
                        <span className="text-lg">{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-primary mb-2">
                      {product.price}
                    </div>
                    <div className="text-muted-foreground">*</div>
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    <Button
                      onClick={() => navigate("/paymentgateway")} // ✅ redirect here
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full text-lg font-medium"
                      size="lg"
                    >
                      {product.id === "home" ? "Buy Now" : "Pre-order"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-16 text-center text-sm text-muted-foreground max-w-4xl mx-auto space-y-1">
              <p>* Processing time: within 5 working days of receiving the payment.</p>
              <p>* Shipping fees: within 3 working days of fulfillment to PAN Express.</p>
              <p>* All prices are inclusive of VAT.</p>
              <p>
                ** Units for pre-ordering are expected. The ordering requires a deposit
                of 10% of the total price.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        {/* (unchanged code) */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Need a custom quote? Let's discuss your requirements.
              </h2>
              <p className="text-primary text-lg">
                We'll get back to you within 24 hours.
              </p>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8">
              <form className="grid md:grid-cols-2 gap-6">
                <Input 
                  placeholder="First name" 
                  className="bg-background border-muted text-foreground rounded-lg px-4 py-3"
                />
                <Input 
                  placeholder="Last name" 
                  className="bg-background border-muted text-foreground rounded-lg px-4 py-3"
                />
                <Input 
                  placeholder="Business email" 
                  type="email" 
                  className="bg-background border-muted text-foreground rounded-lg px-4 py-3"
                />
                <Input 
                  placeholder="Company name" 
                  className="bg-background border-muted text-foreground rounded-lg px-4 py-3"
                />
                <Input 
                  placeholder="Phone (optional)" 
                  type="tel" 
                  className="md:col-span-2 bg-background border-muted text-foreground rounded-lg px-4 py-3"
                />
                <Textarea 
                  placeholder="Type your message..." 
                  className="md:col-span-2 min-h-32 bg-background border-muted text-foreground rounded-lg px-4 py-3"
                />
                
                <div className="md:col-span-2 space-y-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 accent-primary" />
                    <span className="text-sm text-muted-foreground">
                      I agree to EcoBot's{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  
                  <div className="text-center">
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full text-lg font-medium"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
