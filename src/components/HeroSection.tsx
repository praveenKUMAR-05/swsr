import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import robotHero from "@/assets/robot-hero.jpg";

export const HeroSection = () => {
  const features = [
    "Waste Detection",
    "3 Sorting Bins",
    "Real-time Monitoring",
    "Government Compliant",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.1)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Enter the
                <span className="block text-primary">Smart Bin Era!</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Revolutionize your waste management with  automatic
                sorting, real-time monitoring, and eco-friendly solutions for a
                sustainable future.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center space-x-2 text-muted-foreground"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/buy">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-eco group animate-button-glow"
                >
                  Buy Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-secondary animate-button-slide border-2 border-primary text-primary font-bold hover:bg-primary hover:text-black shadow-md transition-all"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Robot Image */}
          <div className="relative animate-scale-in">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-hover">
              <img
                src={robotHero}
                alt="Smart Waste Segregation Robot with 4-bin sorting system (blue, green, pink, gray bins) on wheeled platform with Arduino components"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/30 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse delay-300" />
          </div>
        </div>
      </div>
    </section>
  );
};
