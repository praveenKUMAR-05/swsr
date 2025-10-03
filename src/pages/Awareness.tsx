import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp, Recycle, Users, Globe, Target } from "lucide-react";

const Awareness = () => {
  const challenges = [
    {
      title: "Increasing Waste Generation",
      description: "Urban areas generate 2.01 billion tonnes of municipal solid waste annually, expected to grow to 3.40 billion tonnes by 2050.",
      impact: "High",
      icon: TrendingUp,
      stats: "70% increase expected"
    },
    {
      title: "Poor Segregation Practices",
      description: "Less than 20% of waste is properly segregated at source, leading to contamination and reduced recycling efficiency.",
      impact: "Critical",
      icon: AlertTriangle,
      stats: "80% improperly sorted"
    },
    {
      title: "Limited Infrastructure",
      description: "Many cities lack adequate waste management infrastructure, leading to illegal dumping and environmental damage.",
      impact: "High",
      icon: Users,
      stats: "60% lack infrastructure"
    },
    {
      title: "Environmental Impact",
      description: "Improper waste management contributes to air, water, and soil pollution, affecting public health and ecosystems.",
      impact: "Critical",
      icon: Globe,
      stats: "30% health impact"
    }
  ];

  const whySegregation = [
    {
      title: "Resource Recovery",
      description: "Proper segregation enables recovery of valuable materials like metals, paper, and plastics for recycling.",
      benefit: "90% material recovery possible",
      color: "text-success"
    },
    {
      title: "Reduced Landfill Burden",
      description: "Segregated organic waste can be composted, reducing landfill load by up to 40%.",
      benefit: "40% landfill reduction",
      color: "text-primary"
    },
    {
      title: "Energy Generation",
      description: "Organic waste can be converted to biogas, providing renewable energy for communities.",
      benefit: "Clean energy production",
      color: "text-accent"
    },
    {
      title: "Economic Benefits",
      description: "Proper waste management creates jobs and generates revenue through material sales.",
      benefit: "Job creation & revenue",
      color: "text-destructive"
    }
  ];

  const stats = [
    { label: "Global Waste Generation", value: "2.01B", unit: "tonnes/year", progress: 85 },
    { label: "Recycling Rate", value: "13.5%", unit: "globally", progress: 14 },
    { label: "Organic Waste", value: "44%", unit: "of total waste", progress: 44 },
    { label: "Plastic Waste", value: "12%", unit: "of total waste", progress: 12 }
  ];

  return (
    <div className="min-h-screen page-enter">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Waste Management Awareness
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Understanding the critical importance of proper waste segregation and management for a sustainable future
            </p>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Global Impact
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Numbers Tell the Story
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Current waste management statistics reveal the urgent need for better practices
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={stat.label} className="text-center group hover:shadow-hover transition-all duration-300">
                  <CardHeader>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <CardTitle className="text-lg">{stat.label}</CardTitle>
                    <CardDescription>{stat.unit}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={stat.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {stat.progress}% of capacity
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Government Challenges */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Government Challenges
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Challenges Faced by Governments
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Understanding the complex challenges governments face in waste management
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {challenges.map((challenge, index) => (
                <Card key={challenge.title} className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${
                          challenge.impact === 'Critical' ? 'bg-destructive/10' : 'bg-primary/10'
                        }`}>
                          <challenge.icon className={`h-6 w-6 ${
                            challenge.impact === 'Critical' ? 'text-destructive' : 'text-primary'
                          }`} />
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {challenge.title}
                          </CardTitle>
                        </div>
                      </div>
                      <Badge 
                        variant={challenge.impact === 'Critical' ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        {challenge.impact}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-primary">Impact:</span>
                      <span className="font-bold">{challenge.stats}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Segregation Matters */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Critical Importance
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Segregation is Critical
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Proper waste segregation is the foundation of effective waste management and environmental protection
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {whySegregation.map((reason, index) => (
                <Card 
                  key={reason.title} 
                  className="group hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {reason.title}
                      </CardTitle>
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {reason.description}
                    </p>
                    <div className="bg-primary/5 rounded-lg p-3">
                      <span className={`font-bold ${reason.color}`}>
                        {reason.benefit}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Infographic Section */}
        <section className="py-20 bg-hero-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              The Impact of Smart Segregation
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <Recycle className="h-12 w-12 mx-auto mb-4 text-accent" />
                <div className="text-3xl font-bold mb-2">75%</div>
                <div className="text-white/90">Increase in recycling efficiency</div>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-accent" />
                <div className="text-3xl font-bold mb-2">50%</div>
                <div className="text-white/90">Reduction in waste collection costs</div>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <Globe className="h-12 w-12 mx-auto mb-4 text-accent" />
                <div className="text-3xl font-bold mb-2">40%</div>
                <div className="text-white/90">Lower carbon footprint</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Be Part of the Solution
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Every household that adopts proper waste segregation makes a significant impact on our environment. 
                Join the movement towards sustainable waste management with EcoBot.
              </p>
              
              <div className="bg-gradient-to-r from-primary/10 via-success/10 to-accent/10 rounded-3xl p-8">
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Start Segregating</h4>
                      <p className="text-sm text-muted-foreground">Begin with simple sorting at home</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Educate Others</h4>
                      <p className="text-sm text-muted-foreground">Share knowledge with family and friends</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Use Smart Tech</h4>
                      <p className="text-sm text-muted-foreground">Leverage AI for perfect segregation</p>
                    </div>
                  </div>
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

export default Awareness;