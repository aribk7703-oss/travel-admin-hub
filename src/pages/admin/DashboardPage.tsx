import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { EarningChart } from "@/components/dashboard/EarningChart";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Car, Users, IndianRupee, TrendingUp, Calendar, MapPin, Star } from "lucide-react";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Bookings"
            value="1,284"
            subtitle="+12.5% from last month"
            icon={Calendar}
            variant="purple"
          />
          <StatCard
            title="Total Revenue"
            value="₹12,45,800"
            subtitle="+8.2% from last month"
            icon={IndianRupee}
            variant="pink"
          />
          <StatCard
            title="Active Tours"
            value="45"
            subtitle="+3 new this week"
            icon={Plane}
            variant="teal"
          />
          <StatCard
            title="Total Customers"
            value="3,892"
            subtitle="+156 new customers"
            icon={Users}
            variant="cyan"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EarningChart />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Destinations</p>
                    <p className="text-xs text-muted-foreground">Active locations</p>
                  </div>
                </div>
                <span className="text-xl font-bold">28</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                    <Car className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Vehicles</p>
                    <p className="text-xs text-muted-foreground">Available cars</p>
                  </div>
                </div>
                <span className="text-xl font-bold">18</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Avg. Rating</p>
                    <p className="text-xs text-muted-foreground">Customer reviews</p>
                  </div>
                </div>
                <span className="text-xl font-bold">4.8</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pending</p>
                    <p className="text-xs text-muted-foreground">Bookings to confirm</p>
                  </div>
                </div>
                <span className="text-xl font-bold">12</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <RecentBookings />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
