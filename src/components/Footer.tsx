import { Link } from "react-router-dom";
import { Recycle, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Resources", href: "/resources" },
        { name: "About", href: "/about" },
        { name: "Awareness", href: "/awareness" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Product",
      links: [
        { name: "Features", href: "/#features" },
        { name: "How it Works", href: "/resources" },
        { name: "Benefits", href: "/#benefits" },
        { name: "Buy Now", href: "/buy" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "User Manual", href: "/resources" },
        { name: "FAQ", href: "/about#faq" },
        { name: "Login", href: "/login" },
      ],
    },
  ];

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
              <Recycle className="h-8 w-8" />
              <span>EcoBot</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Revolutionizing waste management with smart waste segregation technology.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@ecobot.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 EcoBot. All rights reserved. Built for a sustainable future.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-4 md:mt-0">
            <MapPin className="h-4 w-4" />
            <span>Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};