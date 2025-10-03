import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  FileText, 
  Phone, 
  Mail, 
  AlertTriangle, 
  Info,
  BookOpen,
  Headphones
} from "lucide-react";

interface Link {
  title: string;
  description: string;
  url: string;
  icon: React.ComponentType<any>;
  category: "emergency" | "info" | "support" | "documentation";
  isExternal?: boolean;
}

export const ImportantLinks = () => {
  const links: Link[] = [
    {
      title: "Emergency Waste Collection",
      description: "Report urgent waste management issues",
      url: "tel:1800-WASTE-911",
      icon: AlertTriangle,
      category: "emergency",
      isExternal: true
    },
    {
      title: "Waste Management Guidelines",
      description: "Official segregation rules and regulations",
      url: "/resources",
      icon: BookOpen,
      category: "documentation"
    },
    {
      title: "Customer Support",
      description: "Get help with your smart bin system",
      url: "mailto:support@ecobot.com",
      icon: Headphones,
      category: "support",
      isExternal: true
    },
    {
      title: "Government Portal",
      description: "Official waste management authority",
      url: "https://gov.in/waste-management",
      icon: Info,
      category: "info",
      isExternal: true
    },
    {
      title: "Complaint Registration",
      description: "File complaints about waste collection",
      url: "https://complaints.wastemanagement.gov.in",
      icon: FileText,
      category: "support",
      isExternal: true
    },
    {
      title: "Recycling Centers",
      description: "Find nearby recycling facilities",
      url: "https://recycling.gov.in/centers",
      icon: ExternalLink,
      category: "info",
      isExternal: true
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "emergency":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "info":
        return "bg-primary/10 text-primary border-primary/20";
      case "support":
        return "bg-accent/10 text-accent border-accent/20";
      case "documentation":
        return "bg-secondary/10 text-secondary-foreground border-secondary/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "emergency":
        return "Emergency";
      case "info":
        return "Information";
      case "support":
        return "Support";
      case "documentation":
        return "Documentation";
      default:
        return "General";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ExternalLink className="h-5 w-5" />
          <span>Important Links</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {links.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/5 transition-colors group"
            >
              <div className="flex items-start space-x-3 flex-1">
                <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <link.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{link.title}</h4>
                    <Badge variant="outline" className={getCategoryColor(link.category)}>
                      {getCategoryLabel(link.category)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 flex-shrink-0"
                onClick={() => {
                  if (link.isExternal) {
                    window.open(link.url, '_blank', 'noopener,noreferrer');
                  } else {
                    window.location.href = link.url;
                  }
                }}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};