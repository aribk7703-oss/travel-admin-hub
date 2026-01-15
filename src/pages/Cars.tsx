import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Users, Tag, Filter } from "lucide-react";
import { useCars, type Car } from "@/hooks/useCars";
import { useCategories } from "@/hooks/useCategories";
import { CarFormDialog } from "@/components/dashboard/CarFormDialog";
import { toast } from "sonner";

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
  const navigate = useNavigate();
  const { cars, addCar, updateCar, deleteCar, stats } = useCars();
  const { getCategoryById, getCategoriesByType } = useCategories();
  const [formOpen, setFormOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const carCategories = getCategoriesByType('car');
  
  const filteredCars = useMemo(() => {
    if (categoryFilter === "all") return cars;
    if (categoryFilter === "none") return cars.filter(c => !c.category);
    return cars.filter(c => c.category === categoryFilter);
  }, [cars, categoryFilter]);

  const handleAddNew = () => {
    navigate("/cars/add");
  };

  const handleEditCar = (car: Car) => {
    navigate(`/cars/edit/${car.id}`);
  };

  const handleAdd = (car: Omit<Car, "id">) => {
    addCar(car);
    toast.success("Vehicle added successfully!");
  };

  const handleEdit = (car: Omit<Car, "id">) => {
    if (editingCar) {
      updateCar(editingCar.id, car);
      toast.success("Vehicle updated successfully!");
      setEditingCar(null);
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteCar(deleteId);
      toast.success("Vehicle deleted successfully!");
      setDeleteId(null);
    }
  };

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
          <Button className="bg-primary hover:bg-primary/90" onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Car
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Vehicles</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">{stats.maintenance}</div>
              <p className="text-sm text-muted-foreground">In Maintenance</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{stats.totalSeats}</div>
              <p className="text-sm text-muted-foreground">Total Seats</p>
            </CardContent>
          </Card>
        </div>

        {/* Cars Table */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-foreground">Fleet Inventory ({filteredCars.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="none">Uncategorized</SelectItem>
                  {carCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Vehicle</TableHead>
                  <TableHead className="text-muted-foreground">Category</TableHead>
                  <TableHead className="text-muted-foreground">Type</TableHead>
                  <TableHead className="text-muted-foreground">Capacity</TableHead>
                  <TableHead className="text-muted-foreground">Feature</TableHead>
                  <TableHead className="text-muted-foreground">Price</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.map((car) => (
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
                      {car.category ? (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          <Tag className="h-3 w-3 mr-1" />
                          {getCategoryById(car.category)?.name || 'Unknown'}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
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
                      <span className="text-muted-foreground">{car.feature}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">{car.pricePerKm}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(car.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditCar(car)}
                        >
                          <Edit className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => setDeleteId(car.id)}
                        >
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

      {/* Add Car Dialog */}
      <CarFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleAdd}
        mode="add"
      />

      {/* Edit Car Dialog */}
      <CarFormDialog
        open={!!editingCar}
        onOpenChange={(open) => !open && setEditingCar(null)}
        onSubmit={handleEdit}
        initialData={editingCar || undefined}
        mode="edit"
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Cars;
