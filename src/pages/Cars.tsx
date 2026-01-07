import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Users, Briefcase, Fuel, Snowflake, Tv } from "lucide-react";

interface Car {
  id: number;
  name: string;
  type: string;
  seats: number;
  feature: string;
  featureIcon: React.ComponentType<{ className?: string }>;
  pricePerKm: string;
  status: "active" | "inactive" | "maintenance";
  image: string;
}

const carsData: Car[] = [
  {
    id: 1,
    name: "Executive Sedan",
    type: "Sedan",
    seats: 4,
    feature: "3 Bags",
    featureIcon: Briefcase,
    pricePerKm: "₹13/km",
    status: "active",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&h=120&fit=crop",
  },
  {
    id: 2,
    name: "Premium SUV",
    type: "SUV",
    seats: 7,
    feature: "5 Bags",
    featureIcon: Briefcase,
    pricePerKm: "₹18/km",
    status: "active",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=200&h=120&fit=crop",
  },
  {
    id: 3,
    name: "City Hatchback",
    type: "Hatchback",
    seats: 4,
    feature: "Budget",
    featureIcon: Briefcase,
    pricePerKm: "₹11/km",
    status: "active",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=120&fit=crop",
  },
  {
    id: 4,
    name: "Tempo Traveller",
    type: "Traveller",
    seats: 17,
    feature: "Fully AC",
    featureIcon: Snowflake,
    pricePerKm: "₹24/km",
    status: "active",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=120&fit=crop",
  },
  {
    id: 5,
    name: "Economy MUV",
    type: "MUV",
    seats: 6,
    feature: "Diesel",
    featureIcon: Fuel,
    pricePerKm: "₹15/km",
    status: "maintenance",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=120&fit=crop",
  },
  {
    id: 6,
    name: "Luxury Tourist Coach",
    type: "Bus",
    seats: 40,
    feature: "Video Coach",
    featureIcon: Tv,
    pricePerKm: "Contact",
    status: "active",
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=200&h=120&fit=crop",
  },
];

const getStatusBadge = (status: Car["status"]) => {
  const variants = {
    active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    inactive: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    maintenance: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  };
  return (
    <Badge className={`${variants[status]} border-0 font-medium`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const Cars = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Car Management
            </h1>
            <p className="text-muted-foreground">
              Manage your fleet of vehicles for tour bookings
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add New Car
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">6</div>
              <p className="text-sm text-muted-foreground">Total Vehicles</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">5</div>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <p className="text-sm text-muted-foreground">In Maintenance</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">78</div>
              <p className="text-sm text-muted-foreground">Total Seats</p>
            </CardContent>
          </Card>
        </div>

        {/* Cars Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Fleet Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Vehicle</TableHead>
                  <TableHead className="text-muted-foreground">Type</TableHead>
                  <TableHead className="text-muted-foreground">Capacity</TableHead>
                  <TableHead className="text-muted-foreground">Feature</TableHead>
                  <TableHead className="text-muted-foreground">Price</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carsData.map((car) => (
                  <TableRow key={car.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="h-12 w-20 rounded-lg object-cover"
                        />
                        <span className="font-medium text-foreground">{car.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-border text-muted-foreground">
                        {car.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{car.seats} Seats</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <car.featureIcon className="h-4 w-4" />
                        <span>{car.feature}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">{car.pricePerKm}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(car.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Cars;
