import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, MapPin, Clock, Map, CalendarPlus, Tag } from "lucide-react";
import { useTours, Tour } from "@/hooks/useTours";
import { useCategories } from "@/hooks/useCategories";
import { TourFormDialog } from "@/components/dashboard/TourFormDialog";
import TourBookingDialog from "@/components/dashboard/TourBookingDialog";

const Tours = () => {
  const navigate = useNavigate();
  const { tours, addTour, updateTour, deleteTour, stats } = useTours();
  const { getCategoryById } = useCategories();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [bookingTour, setBookingTour] = useState<Tour | null>(null);

  const handleAdd = () => {
    navigate("/tours/add");
  };

  const handleEdit = (tour: Tour) => {
    navigate(`/tours/edit/${tour.id}`);
  };

  const handleQuickEdit = (tour: Tour) => {
    setEditingTour(tour);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: Omit<Tour, 'id'>) => {
    if (editingTour) {
      updateTour(editingTour.id, data);
    } else {
      addTour(data);
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteTour(deleteId);
      setDeleteId(null);
    }
  };

  const getStatusBadge = (status: Tour['status']) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      upcoming: "bg-blue-100 text-blue-800",
    };
    return <Badge className={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tour Management</h1>
            <p className="text-muted-foreground">Manage your heritage tour packages</p>
          </div>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Tour
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Inactive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tours Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              All Tours ({tours.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={tour.image}
                          alt={tour.name}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-medium">{tour.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{tour.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {tour.category ? (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          <Tag className="h-3 w-3 mr-1" />
                          {getCategoryById(tour.category)?.name || 'Unknown'}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        {tour.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {tour.duration}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-primary">{tour.price}</TableCell>
                    <TableCell>{getStatusBadge(tour.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setBookingTour(tour)}
                          className="gap-1"
                        >
                          <CalendarPlus className="h-4 w-4" />
                          Book
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(tour)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(tour.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4" />
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

      <TourFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        tour={editingTour}
        onSubmit={handleSubmit}
      />

      <TourBookingDialog
        open={!!bookingTour}
        onOpenChange={(open) => !open && setBookingTour(null)}
        tour={bookingTour}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tour?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the tour from your list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Tours;
