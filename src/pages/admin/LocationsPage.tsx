import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const locations = [
  { id: 1, name: "Paris, France", tours: 12, status: "Active" },
  { id: 2, name: "Tokyo, Japan", tours: 8, status: "Active" },
  { id: 3, name: "New York, USA", tours: 15, status: "Active" },
  { id: 4, name: "Dubai, UAE", tours: 6, status: "Inactive" },
];

const LocationsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">All Locations</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search locations..." className="pl-10" />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location Name</TableHead>
                <TableHead>Tours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell className="font-medium">{location.name}</TableCell>
                  <TableCell>{location.tours}</TableCell>
                  <TableCell>
                    <Badge variant={location.status === "Active" ? "default" : "secondary"}>
                      {location.status}
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

export default LocationsPage;
