import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Video, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
const Resources = () => {
  const resources = [
    {
      title: "User Manual PDF",
      description: "Complete guide on setting up and using your Smart Waste Segregation Robot",
      type: "PDF",
      size: "2.4 MB",
      icon: FileText,
      downloadUrl: "#",
      featured: true
    },
    {
      title: "Quick Start Guide",
      description: "Get started with your robot in 5 easy steps",
      type: "PDF",
      size: "850 KB",
      icon: BookOpen,
      downloadUrl: "#",
      featured: false
    },
    {
      title: "Installation Video",
      description: "Step-by-step video tutorial for robot setup and configuration",
      type: "Video",
      size: "Watch Online",
      icon: Video,
      downloadUrl: "#",
      featured: true
    },
    {
      title: "Troubleshooting Guide",
      description: "Common issues and their solutions",
      type: "PDF",
      size: "1.2 MB",
      icon: FileText,
      downloadUrl: "#",
      featured: false
    }
  ];

  const instructions = [
    {
      step: 1,
      title: "Unboxing & Setup",
      description: "Carefully unpack your robot and check all components are included"
    },
    {
      step: 2,
      title: "Power Connection",
      description: "Connect the power adapter and ensure the LED indicator shows green"
    },
    {
      step: 3,
      title: "Bin Configuration",
      description: "Attach the 4 sorting bins according to the color-coded labels"
    },
    {
      step: 4,
      title: "Wi-Fi Setup",
      description: "Connect the robot to your home Wi-Fi network using the mobile app"
    },
    {
      step: 5,
      title: "Calibration",
      description: "Run the initial calibration process for optimal sorting accuracy"
    },
    {
      step: 6,
      title: "Testing",
      description: "Test with sample waste items to ensure proper segregation"
    }
  ];

  const rules = [
    "🟢 Green Bin: Organic waste (food scraps, biodegradable materials)",
    "🔵 Blue Bin: Recyclable materials (plastic bottles, paper, metal cans)",
    "🔴 Red Bin: Hazardous waste (batteries, electronics, chemicals)",
    "⚫ Black Bin: General waste (non-recyclable, non-organic items)",
    "🧼 Clean containers before disposal for better recycling",
    "🚫 Do not dispose of liquids or wet items in recyclable bins",
    "📏 Ensure items fit within the bin opening (max 30cm diameter)",
    "⚡ Keep the robot charging dock clear and accessible"
  ];

  return (
    <div className="min-h-screen page-enter">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Resources & Documentation
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Everything you need to get the most out of your Smart Waste Segregation Robot
            </p>
          </div>
        </section>

        {/* Downloadable Resources */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Downloads
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Downloadable Resources
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Access comprehensive documentation, guides, and tutorials
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card 
                  key={resource.title}
                  className={`group hover:shadow-hover transition-all duration-300 hover:-translate-y-1 ${
                    resource.featured ? 'ring-2 ring-primary/20' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <resource.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {resource.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {resource.type}
                            </Badge>
                            {resource.featured && (
                              <Badge className="text-xs bg-primary">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {resource.size}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {resource.description}
                    </CardDescription>
                    <Button className="w-full bg-primary-gradient">
                      <Download className="h-4 w-4 mr-2" />
                      Download Resource
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Step by Step
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Setup Instructions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Follow these simple steps to get your robot up and running
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {instructions.map((instruction, index) => (
                  <Card key={instruction.step} className="group hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {instruction.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {instruction.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {instruction.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rules */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Guidelines
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Usage Rules & Guidelines
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Important rules to ensure optimal performance and longevity
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="shadow-eco">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Waste Segregation Rules
                  </CardTitle>
                  <CardDescription className="text-center">
                    Follow these guidelines for proper waste sorting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {rules.map((rule, index) => (
                      <div 
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <span className="text-lg">{rule.split(' ')[0]}</span>
                        <span className="text-sm flex-1">{rule.substring(rule.indexOf(' ') + 1)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Additional Help?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary-gradient">
                <Link to="/Contact" >
                Contact Support
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link to="/about#faq" >
                Visit FAQ
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;