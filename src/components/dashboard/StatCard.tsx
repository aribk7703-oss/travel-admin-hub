import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  variant: "purple" | "pink" | "teal" | "cyan";
}

const variantClasses = {
  purple: "stat-card-purple",
  pink: "stat-card-pink",
  teal: "stat-card-teal",
  cyan: "stat-card-cyan",
};

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-xl p-5 text-primary-foreground overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg",
        variantClasses[variant]
      )}
    >
      {/* Background Icon */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
        <Icon className="h-16 w-16" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-sm font-medium uppercase tracking-wide opacity-90">
          {title}
        </p>
        <p className="mt-2 text-3xl font-bold">{value}</p>
        <p className="mt-1 text-sm opacity-80">{subtitle}</p>
      </div>
    </div>
  );
};
