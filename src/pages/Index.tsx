import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { EarningChart } from "@/components/dashboard/EarningChart";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { DollarSign, Gift, CalendarCheck, Zap } from "lucide-react";

const Index = () => {
  const adminEmail = "admin@traveladmin.com";

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Message */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground uppercase">
            Welcome {adminEmail}!
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Revenue"
            value="₹0"
            subtitle="Total revenue"
            icon={DollarSign}
            variant="purple"
          />
          <StatCard
            title="Earning"
            value="₹0"
            subtitle="Total Earning"
            icon={Gift}
            variant="pink"
          />
          <StatCard
            title="Bookings"
            value="0"
            subtitle="Total bookings"
            icon={CalendarCheck}
            variant="teal"
          />
          <StatCard
            title="Services"
            value="11"
            subtitle="Total bookable services"
            icon={Zap}
            variant="cyan"
          />
        </div>

        {/* Charts and Tables Grid */}
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <EarningChart />
          </div>
          <div className="lg:col-span-2">
            <RecentBookings />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
