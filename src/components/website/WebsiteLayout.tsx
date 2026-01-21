import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Car, Compass, Map, Home, Menu, X, Users, Briefcase, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: "/website", label: "Home", icon: Home },
  { href: "/website/about", label: "About", icon: Users },
  { href: "/website/services", label: "Services", icon: Briefcase },
  { href: "/website/tours", label: "Tours", icon: Compass },
  { href: "/website/destinations", label: "Destinations", icon: Map },
  { href: "/website/fleet", label: "Our Fleet", icon: Car },
  { href: "/website/blog", label: "Blog", icon: FileText },
  { href: "/website/contact", label: "Contact", icon: Mail },
];

export const WebsiteLayout = ({ children }: WebsiteLayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/website" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Compass className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">TravelAdmin</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Contact & Admin Link */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  Admin Dashboard
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Admin Dashboard
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            {/* About */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Compass className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">TravelAdmin</span>
              </div>
              <p className="text-sm text-primary-foreground/80">
                Your trusted travel partner for exploring incredible destinations across Maharashtra and beyond.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="hover:text-primary-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-semibold">Contact Us</h3>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  info@traveladmin.com
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>Station Road, Aurangabad, Maharashtra 431001</span>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div className="space-y-4">
              <h3 className="font-semibold">Business Hours</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Monday - Saturday</li>
                <li>9:00 AM - 8:00 PM</li>
                <li className="pt-2">Sunday</li>
                <li>10:00 AM - 6:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} TravelAdmin. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
