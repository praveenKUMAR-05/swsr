import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Cpu, Recycle, Zap, Shield, Award } from "lucide-react";
import robotComponents from "@/assets/a1.jpg";

export const ProductFeatures = () => {
  const features = [
    {
      icon: Bot,
      title: "Waste Detection",
      description: "Advanced computer vision identifies waste types with 95% accuracy",
      badge: "Smart AI"
    },
    {
      icon: Cpu,
      title: "Arduino Integration",
      description: "Reliable microcontroller system for seamless operation",
      badge: "Technology"
    },
    {
      icon: Recycle,
      title: "3-Bin Sorting System",
      description: "Separate bins for organic, recyclable, hazardous, and general waste",
      badge: "Eco-Friendly"
    },
    {
      icon: Zap,
      title: "Real-time Monitoring",
      description: "Live updates and data analytics through mobile dashboard",
      badge: "Smart Tech"
    },
    {
      icon: Shield,
      title: "Government Compliant",
      description: "Meets all local and national waste management regulations",
      badge: "Certified"
    },
    {
      icon: Award,
      title: "Reward System",
      description: "Earn points and badges for proper waste segregation",
      badge: "Gamified"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Product Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Product Does
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Combining technology with sustainable practices to revolutionize 
            how we handle waste in modern households and communities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Product Image */}
          <div className="relative">
            <img
              src={robotComponents}
              alt="Arduino circuit diagram showing servo motor, sensors, and electronic components for smart waste robot"
              className="w-full rounded-2xl shadow-card"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
          </div>

          {/* Features Grid */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="group hover:shadow-eco transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{feature.title}</h3>
                        <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                          {feature.badge}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};