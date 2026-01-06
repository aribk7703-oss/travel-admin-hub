import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { EarningChart } from "@/components/dashboard/EarningChart";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Car, Users, IndianRupee, TrendingUp, Calendar, MapPin, Star, Loader2, ClipboardList } from "lucide-react";
import { dashboardApi } from "@/lib/api";
import { Booking } from "@/types";

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  activeTours: number;
  availableCars: number;
  totalCars: number;
  activeServices: number;
  recentBookings: Booking[];
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await dashboardApi.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
          </div>
          <Button onClick={() => navigate("/admin/bookings")} className="gap-2">
            <ClipboardList className="h-4 w-4" />
            View All Bookings
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Bookings"
            value={stats?.totalBookings.toString() || "0"}
            subtitle={`${stats?.pendingBookings || 0} pending`}
            icon={Calendar}
            variant="purple"
          />
          <StatCard
            title="Total Revenue"
            value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`}
            subtitle="From confirmed bookings"
            icon={IndianRupee}
            variant="pink"
          />
          <StatCard
            title="Active Tours"
            value={stats?.activeTours.toString() || "0"}
            subtitle="Available packages"
            icon={Plane}
            variant="teal"
          />
          <StatCard
            title="Fleet Size"
            value={`${stats?.availableCars || 0}/${stats?.totalCars || 0}`}
            subtitle="Available vehicles"
            icon={Car}
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
                    <p className="text-sm font-medium">Services</p>
                    <p className="text-xs text-muted-foreground">Active services</p>
                  </div>
                </div>
                <span className="text-xl font-bold">{stats?.activeServices || 0}</span>
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
                <span className="text-xl font-bold">{stats?.availableCars || 0}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Confirmed</p>
                    <p className="text-xs text-muted-foreground">Bookings</p>
                  </div>
                </div>
                <span className="text-xl font-bold">{stats?.confirmedBookings || 0}</span>
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
                <span className="text-xl font-bold">{stats?.pendingBookings || 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <RecentBookings bookings={stats?.recentBookings || []} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
