import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Tours", href: "/tours-listing" },
  { name: "Car Rental", href: "/car-rental" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Plane className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TravelGo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/booking">
              <Button className="bg-primary hover:bg-primary/90">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-2 py-2",
                    location.pathname === link.href
                      ? "text-primary bg-primary/10 rounded-lg"
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/booking" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Book Now
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
