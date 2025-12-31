import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const cars = [
  { id: 1, name: "Toyota Camry", type: "Sedan", seats: 5, price: 50, status: "Available" },
  { id: 2, name: "Honda CR-V", type: "SUV", seats: 7, price: 75, status: "Available" },
  { id: 3, name: "BMW 5 Series", type: "Luxury", seats: 5, price: 120, status: "Rented" },
  { id: 4, name: "Mercedes Sprinter", type: "Van", seats: 12, price: 150, status: "Available" },
];

const CarsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">All Cars</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Car
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search cars..." className="pl-10" />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Car Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead>Price/Day</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell className="font-medium">{car.name}</TableCell>
                  <TableCell>{car.type}</TableCell>
                  <TableCell>{car.seats}</TableCell>
                  <TableCell>${car.price}</TableCell>
                  <TableCell>
                    <Badge variant={car.status === "Available" ? "default" : "secondary"}>
                      {car.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CarsPage;
