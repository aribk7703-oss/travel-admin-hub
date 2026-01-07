import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MapPin,
  Plane,
  Car,
  Ticket,
  Star,
  Newspaper,
  FileText,
  Image,
  Users,
  CreditCard,
  MessageSquare,
  Menu as MenuIcon,
  Wallet,
  Palette,
  Settings,
  Wrench,
  BarChart3,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  {
    title: "Location",
    icon: MapPin,
    children: [
      { title: "All Locations", href: "/locations" },
      { title: "Add Location", href: "/locations/add" },
    ],
  },
  {
    title: "Tour",
    icon: Plane,
    children: [
      { title: "All Tours", href: "/tours" },
      { title: "Add Tour", href: "/tours/add" },
      { title: "Categories", href: "/tours/categories" },
    ],
  },
  {
    title: "Car",
    icon: Car,
    children: [
      { title: "All Cars", href: "/cars" },
      { title: "Add Car", href: "/cars/add" },
    ],
  },
  { title: "Coupon", icon: Ticket, href: "/coupons" },
  { title: "Reviews", icon: Star, href: "/reviews" },
];

const contentItems: NavItem[] = [
  {
    title: "News",
    icon: Newspaper,
    children: [
      { title: "All News", href: "/news" },
      { title: "Add News", href: "/news/add" },
    ],
  },
  { title: "Page", icon: FileText, href: "/pages" },
  { title: "Media", icon: Image, href: "/media" },
];

const systemItems: NavItem[] = [
  {
    title: "Users",
    icon: Users,
    children: [
      { title: "All Users", href: "/users" },
      { title: "Add User", href: "/users/add" },
    ],
  },
  {
    title: "User Plans",
    icon: CreditCard,
    children: [
      { title: "All Plans", href: "/plans" },
      { title: "Add Plan", href: "/plans/add" },
    ],
  },
  { title: "Popup", icon: MessageSquare, href: "/popup" },
  { title: "Menu", icon: MenuIcon, href: "/menu" },
  { title: "Payouts", icon: Wallet, href: "/payouts" },
  { title: "Themes", icon: Palette, href: "/themes" },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General", href: "/settings/general" },
      { title: "Payment", href: "/settings/payment" },
      { title: "Email", href: "/settings/email" },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    children: [
      { title: "Import", href: "/tools/import" },
      { title: "Export", href: "/tools/export" },
    ],
  },
  { title: "Reports", icon: BarChart3, href: "/reports" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NavItemComponent = ({
  item,
  collapsed,
  expandedItems,
  toggleExpanded,
  navigate,
  currentPath,
}: {
  item: NavItem;
  collapsed: boolean;
  expandedItems: string[];
  toggleExpanded: (item: string) => void;
  navigate: (path: string) => void;
  currentPath: string;
}) => {
  const isActive = item.href === currentPath || item.children?.some(c => c.href === currentPath);
  const isExpanded = expandedItems.includes(item.title);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) {
            toggleExpanded(item.title);
          } else if (item.href) {
            navigate(item.href);
          }
        }}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{item.title}</span>
            {hasChildren && (
              <span className="transition-transform duration-200">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </span>
            )}
          </>
        )}
      </button>

      {!collapsed && hasChildren && isExpanded && (
        <div className="ml-8 mt-1 space-y-1 animate-fade-in">
          {item.children!.map((child) => (
            <button
              key={child.title}
              onClick={() => navigate(child.href)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm rounded-lg transition-colors",
                currentPath === child.href
                  ? "text-sidebar-primary bg-sidebar-accent/30"
                  : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/30"
              )}
            >
              {child.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const NavSection = ({
  title,
  items,
  collapsed,
  expandedItems,
  toggleExpanded,
  navigate,
  currentPath,
}: {
  title?: string;
  items: NavItem[];
  collapsed: boolean;
  expandedItems: string[];
  toggleExpanded: (item: string) => void;
  navigate: (path: string) => void;
  currentPath: string;
}) => (
  <div className="space-y-1">
    {title && !collapsed && (
      <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-muted">
        {title}
      </p>
    )}
    {items.map((item) => (
      <NavItemComponent
        key={item.title}
        item={item}
        collapsed={collapsed}
        expandedItems={expandedItems}
        toggleExpanded={toggleExpanded}
        navigate={navigate}
        currentPath={currentPath}
      />
    ))}
  </div>
);

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 sidebar-scrollbar overflow-y-auto",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-sidebar-ring flex items-center justify-center">
              <Plane className="h-5 w-5 text-sidebar-primary" />
            </div>
            <span className="text-lg font-bold text-sidebar-primary">
              TravelAdmin
            </span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto h-8 w-8 rounded-lg bg-sidebar-ring flex items-center justify-center">
            <Plane className="h-5 w-5 text-sidebar-primary" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-6">
        <NavSection
          items={navItems}
          collapsed={collapsed}
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
          navigate={navigate}
          currentPath={currentPath}
        />

        <NavSection
          title="Content"
          items={contentItems}
          collapsed={collapsed}
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
          navigate={navigate}
          currentPath={currentPath}
        />

        <NavSection
          title="System"
          items={systemItems}
          collapsed={collapsed}
          expandedItems={expandedItems}
          toggleExpanded={toggleExpanded}
          navigate={navigate}
          currentPath={currentPath}
        />
      </nav>
    </aside>
  );
};
