import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Car, Compass, Map, Home, Menu, X, Users, Briefcase, FileText, ChevronDown, Mountain, Building, Waves } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: "/website", label: "Home", icon: Home },
  { href: "/website/about", label: "About", icon: Users },
];

const serviceLinks = [
  { href: "/website/services", label: "City Taxi" },
  { href: "/website/services", label: "Airport Pickup" },
  { href: "/website/services", label: "Heritage Tours" },
  { href: "/website/services", label: "Outstation Cab" },
  { href: "/website/services", label: "Corporate Events" },
];

const oneWayRoutes = [
  "Aurangabad → Pune",
  "Aurangabad → Mumbai",
  "Aurangabad → Shirdi",
  "Aurangabad → Nashik",
  "Aurangabad → Nagpur",
  "Aurangabad → Hyderabad",
];

const tourLinks = [
  { href: "/website/tours", label: "Ajanta Caves" },
  { href: "/website/tours", label: "Ellora Caves" },
  { href: "/website/tours", label: "Grishneshwar Jyotirlinga" },
  { href: "/website/tours", label: "Aurangabad Caves" },
  { href: "/website/tours", label: "Bibi Ka Maqbara" },
  { href: "/website/tours", label: "Panchakki" },
  { href: "/website/tours", label: "Daulatabad Fort" },
  { href: "/website/tours", label: "Khuldabad" },
  { href: "/website/tours", label: "Shirdi" },
];

const tourismCategories = [
  {
    title: "🛕 Spiritual Places",
    links: ["Shirdi", "Pandharpur", "Trimbakeshwar", "Bhimashankar", "Tuljapur"]
  },
  {
    title: "🏰 Heritage & Historical",
    links: ["Ajanta Caves", "Ellora Caves", "Daulatabad Fort", "Raigad Fort", "Sindhudurg Fort"]
  },
  {
    title: "⛰️ Nature & Hill Stations",
    links: ["Mahabaleshwar", "Lonavala", "Matheran", "Bhandardara", "Chikhaldara"]
  },
  {
    title: "🏖️ Coastal & Beach",
    links: ["Alibaug", "Tarkarli", "Ganpatipule", "Murud Janjira", "Ratnagiri"]
  }
];

export const WebsiteLayout = ({ children }: WebsiteLayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen flex flex-col bg-background font-['Poppins',sans-serif]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/website" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">GreenCab</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    Services <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {serviceLinks.map((link) => (
                    <DropdownMenuItem key={link.label} asChild>
                      <Link to={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>One Way Cab</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {oneWayRoutes.map((route) => (
                        <DropdownMenuItem key={route}>
                          <Link to="/website/services">{route}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                to="/website/fleet"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/website/fleet")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Fleet
              </Link>

              {/* Tours Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive("/website/tours")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}>
                    Tours <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {tourLinks.map((link) => (
                    <DropdownMenuItem key={link.label} asChild>
                      <Link to={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                to="/website/blog"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/website/blog")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Blog
              </Link>

              <Link
                to="/website/contact"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/website/contact")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="sm">Login</Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">Sign Up</Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <Link to="/website" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted">Home</Link>
              <Link to="/website/about" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted">About</Link>
              <Link to="/website/services" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted">Services</Link>
              <Link to="/website/fleet" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted">Fleet</Link>
              <Link to="/website/tours" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted">Tours</Link>
              <Link to="/website/blog" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted">Blog</Link>
              <Link to="/website/contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted">Contact Us</Link>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">Login</Button>
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">Sign Up</Button>
              </div>
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
        {/* Tourism Section */}
        <div className="container mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold mb-8 text-center">📍 Top Tourist Places in Maharashtra</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {tourismCategories.map((category) => (
              <div key={category.title}>
                <h4 className="font-semibold mb-4">{category.title}</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  {category.links.map((link) => (
                    <li key={link}>
                      <Link to="/website/destinations" className="hover:text-primary-foreground transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer */}
        <div className="border-t border-primary-foreground/20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* About */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold">GreenCab</span>
                </div>
                <p className="text-sm text-primary-foreground/80">
                  Safe, reliable and eco-friendly cab services in Aurangabad with professional drivers.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="font-semibold">Quick Links</h3>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li><Link to="/website" className="hover:text-primary-foreground transition-colors">Home</Link></li>
                  <li><Link to="/website/services" className="hover:text-primary-foreground transition-colors">Services</Link></li>
                  <li><Link to="/website/fleet" className="hover:text-primary-foreground transition-colors">Our Fleet</Link></li>
                  <li><Link to="/website/blog" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="font-semibold">Services</h3>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li><Link to="/website/services" className="hover:text-primary-foreground transition-colors">City Taxi</Link></li>
                  <li><Link to="/website/services" className="hover:text-primary-foreground transition-colors">Airport Pickup</Link></li>
                  <li><Link to="/website/services" className="hover:text-primary-foreground transition-colors">Heritage Tours</Link></li>
                  <li><Link to="/website/services" className="hover:text-primary-foreground transition-colors">Outstation Cab</Link></li>
                  <li><Link to="/website/services" className="hover:text-primary-foreground transition-colors">Corporate Events</Link></li>
                  <li><Link to="/website/services" className="hover:text-primary-foreground transition-colors">One Way Cab</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="font-semibold">Contact</h3>
                <div className="text-sm text-primary-foreground/80">
                  <p>24/7 Helpline</p>
                  <p className="font-bold text-green-400 mt-1">+91 99701 78500</p>
                  <p className="mt-4">Aurangabad, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="container mx-auto px-4 text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Green Cab Service. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
