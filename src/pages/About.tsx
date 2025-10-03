import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, Target, Award, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const About = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const team = [
    {
      name: "Praveen Kumar Mohan",
      role: "Lead Engineer & Co-founder",
      bio: "Undergratuate student at SKCET, specializing in AI and machine learning",
      avatar: "PK",
      rating: 5
    },
    {
      name: "Mugundha B",
      role: "Software Specialist",
      bio: "Undergratuate student at SKCET, Expert in computer vision and machine learning for waste classification",
      avatar: "MB",
      rating: 5
    },
    {
      name: "Pranesha G",
      role: "Product Manager",
      bio: "Undergratuate student at SKCET, Specialist in IoT devices and smart home automation systems",
      avatar: "PG",
      rating: 5
    }
  ];

  const testimonials = [
    {
      name: "Partheev V",
      location: "Tamil Nadu, India",
      rating: 5,
      comment: "This robot has completely transformed how we handle waste at home. Installation was easy and it works flawlessly!",
      date: "2 weeks ago"
    },
    {
      name: "Nithish Kumar P",
      location: "Bangalore, India",
      rating: 5,
      comment: "Amazing technology! Our recycling rate increased by 80% and we're earning points for proper segregation.",
      date: "1 month ago"
    },
    {
      name: "Mohamed Aaseem M",
      location: "Palakkad, India",
      rating: 4,
      comment: "Great product with excellent customer support. The mobile app could use some improvements but overall very satisfied.",
      date: "3 weeks ago"
    },
    {
      name: "SivaKumar",
      location: "Delhi, India",
      rating: 5,
      comment: "Worth every penny! The robot is smart, efficient, and has made waste management effortless for our family.",
      date: "1 week ago"
    }
  ];

  const faqs = [
    {
      question: "How accurate is the waste detection system?",
      answer: "Our waste detection system boasts 95% accuracy in waste classification. It continuously learns and improves through machine learning algorithms."
    },
    {
      question: "What maintenance is required?",
      answer: "Minimal maintenance is required. Simply empty the bins when full and clean the sensors monthly with the provided cleaning kit."
    },
    {
      question: "Is the robot compatible with all home types?",
      answer: "Yes, the robot is designed to work in various home environments. It requires a minimum space of 2x2 feet and a standard power outlet."
    },
    {
      question: "How does the reward system work?",
      answer: "You earn eco-points for proper waste segregation. Points can be redeemed for discounts, coupons, and exclusive environmental initiatives."
    },
    {
      question: "What happens if the robot malfunctions?",
      answer: "We provide 24/7 technical support and a 2-year warranty. Remote diagnostics help resolve most issues quickly."
    },
    {
      question: "Can I monitor waste data remotely?",
      answer: "Yes, our mobile app provides real-time monitoring, analytics, and notifications from anywhere."
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen page-enter">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-hero-gradient text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About EcoBot
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Pioneering the future of sustainable waste management through innovative  technology
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                Our Mission
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Creating a Sustainable Future
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                We believe that proper waste management is the cornerstone of environmental sustainability. 
                Our Smart Waste Segregation Robot combines  technology with user-friendly 
                design to make eco-conscious living accessible to every household.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center group hover:shadow-hover transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Developing solutions for sustainable living
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center group hover:shadow-hover transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-success/10 rounded-full flex items-center justify-center group-hover:bg-success/20 transition-colors">
                      <Users className="h-8 w-8 text-success" />
                    </div>
                    <CardTitle>Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Building a community of environmentally conscious individuals
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center group hover:shadow-hover transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Award className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle>Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Making a measurable positive impact on our planet's future
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Our Team
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet the Developers
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A passionate team of engineers, designers, and environmental advocates
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <Card key={member.name} className="text-center group hover:shadow-hover transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                    <div className="flex justify-center space-x-1">
                      {[...Array(member.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Customer Reviews
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real feedback from families who've transformed their waste management
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="group hover:shadow-hover transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.location}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">"{testimonial.comment}"</p>
                    <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our Smart Waste Segregation Robot
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="group hover:shadow-card transition-all duration-300">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {faq.question}
                      </CardTitle>
                      {expandedFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedFaq === index && (
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the EcoBot Family?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your journey towards sustainable waste management today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <Button size="lg" className="bg-primary-gradient">
                <Link to="/buy">
                Get Your EcoBot
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link to="/scheduledemo">
                Schedule Demo
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

export default About;