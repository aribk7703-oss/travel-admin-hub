import { Link } from "react-router-dom";

interface FooterProps {
  sidebarCollapsed: boolean;
}

export const Footer = ({ sidebarCollapsed }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`fixed bottom-0 right-0 z-20 h-12 bg-card border-t border-border transition-all duration-300 ${
        sidebarCollapsed ? "left-16" : "left-64"
      }`}
    >
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <p className="text-sm text-muted-foreground">
          {currentYear} © Travel Admin Dashboard
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/about"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};
