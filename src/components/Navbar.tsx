import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Recycle, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = [
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Awareness", href: "/awareness" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-foreground font-bold text-xl">
            <Recycle className="h-8 w-8 text-primary" />
            <span>EcoBot</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border">
                  {user ? (
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                      </Button>
                      <Button onClick={handleSignOut} variant="ghost" className="w-full">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                      </Button>
                      <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link to="/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};