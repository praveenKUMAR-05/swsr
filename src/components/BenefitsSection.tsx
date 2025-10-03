import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Timer, Trophy, Building, Trees } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: Trees,
      title: "Environmental Impact",
      description: "Reduce household waste by up to 60% through proper segregation and recycling optimization.",
      color: "text-success",
      bgColor: "bg-success/10",
      stats: "60% Waste Reduction"
    },
    {
      icon: Timer,
      title: "Smart Automation",
      description: "Fully automated sorting saves 2+ hours weekly while ensuring perfect waste categorization.",
      color: "text-primary",
      bgColor: "bg-primary/10",
      stats: "2+ Hours Saved Weekly"
    },
    {
      icon: Trophy,
      title: "Reward System",
      description: "Earn eco-points, unlock achievements, and redeem exclusive coupons for sustainable practices.",
      color: "text-accent",
      bgColor: "bg-accent/10",
      stats: "Gamified Experience"
    },
    {
      icon: Building,
      title: "Government Compliance",
      description: "Meet all local regulations and contribute to national waste management initiatives.",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      stats: "100% Compliant"
    }
  ];

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            Benefits
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Our Solution
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of waste management with benefits that extend beyond 
            just sorting - contributing to a cleaner, more sustainable world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title} 
              className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-2 border-0 shadow-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${benefit.bgColor}`}>
                    <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                  </div>
                  <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                    {benefit.stats}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 shadow-eco">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to Transform Your Waste Management?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join thousands of households already making a positive environmental impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                🌱 Eco-Friendly Certified
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                🏆 Award Winning Design
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                ⚡ Energy Efficient
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};