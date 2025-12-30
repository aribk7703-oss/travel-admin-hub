import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Tour {
  id: string;
  name: string;
  location: string;
  category: string;
  price: number;
  duration: string;
  status: "active" | "draft" | "inactive";
  rating: number;
  bookings: number;
  createdAt: string;
}

const initialTours: Tour[] = [
  {
    id: "1",
    name: "Explore Jaipur Heritage",
    location: "Jaipur, Rajasthan",
    category: "Cultural",
    price: 15000,
    duration: "3 Days",
    status: "active",
    rating: 4.8,
    bookings: 124,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Kerala Backwaters Cruise",
    location: "Alleppey, Kerala",
    category: "Nature",
    price: 22000,
    duration: "4 Days",
    status: "active",
    rating: 4.9,
    bookings: 89,
    createdAt: "2024-02-10",
  },
  {
    id: "3",
    name: "Himalayan Adventure Trek",
    location: "Manali, Himachal",
    category: "Adventure",
    price: 35000,
    duration: "7 Days",
    status: "draft",
    rating: 4.7,
    bookings: 45,
    createdAt: "2024-03-05",
  },
  {
    id: "4",
    name: "Goa Beach Retreat",
    location: "Goa",
    category: "Beach",
    price: 18000,
    duration: "5 Days",
    status: "active",
    rating: 4.6,
    bookings: 210,
    createdAt: "2024-01-20",
  },
  {
    id: "5",
    name: "Varanasi Spiritual Journey",
    location: "Varanasi, UP",
    category: "Spiritual",
    price: 12000,
    duration: "2 Days",
    status: "inactive",
    rating: 4.5,
    bookings: 67,
    createdAt: "2024-02-28",
  },
];

const categories = ["All", "Cultural", "Nature", "Adventure", "Beach", "Spiritual"];
const statuses = ["All", "active", "draft", "inactive"];

const Tours = () => {
  const { toast } = useToast();
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    price: "",
    duration: "",
    status: "draft" as Tour["status"],
    description: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      category: "",
      price: "",
      duration: "",
      status: "draft",
      description: "",
    });
  };

  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || tour.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || tour.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreate = () => {
    const newTour: Tour = {
      id: Date.now().toString(),
      name: formData.name,
      location: formData.location,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      duration: formData.duration,
      status: formData.status,
      rating: 0,
      bookings: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTours([newTour, ...tours]);
    setIsCreateOpen(false);
    resetForm();
    toast({
      title: "Tour Created",
      description: `"${newTour.name}" has been created successfully.`,
    });
  };

  const handleEdit = () => {
    if (!selectedTour) return;
    const updatedTours = tours.map((tour) =>
      tour.id === selectedTour.id
        ? {
            ...tour,
            name: formData.name,
            location: formData.location,
            category: formData.category,
            price: parseFloat(formData.price) || 0,
            duration: formData.duration,
            status: formData.status,
          }
        : tour
    );
    setTours(updatedTours);
    setIsEditOpen(false);
    setSelectedTour(null);
    resetForm();
    toast({
      title: "Tour Updated",
      description: "Tour has been updated successfully.",
    });
  };

  const handleDelete = () => {
    if (!selectedTour) return;
    setTours(tours.filter((tour) => tour.id !== selectedTour.id));
    setIsDeleteOpen(false);
    toast({
      title: "Tour Deleted",
      description: `"${selectedTour.name}" has been deleted.`,
      variant: "destructive",
    });
    setSelectedTour(null);
  };

  const openEditDialog = (tour: Tour) => {
    setSelectedTour(tour);
    setFormData({
      name: tour.name,
      location: tour.location,
      category: tour.category,
      price: tour.price.toString(),
      duration: tour.duration,
      status: tour.status,
      description: "",
    });
    setIsEditOpen(true);
  };

  const openViewDialog = (tour: Tour) => {
    setSelectedTour(tour);
    setIsViewOpen(true);
  };

  const openDeleteDialog = (tour: Tour) => {
    setSelectedTour(tour);
    setIsDeleteOpen(true);
  };

  const getStatusBadge = (status: Tour["status"]) => {
    const variants = {
      active: "bg-success/10 text-success border-success/20",
      draft: "bg-warning/10 text-warning border-warning/20",
      inactive: "bg-muted text-muted-foreground border-border",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tour Management</h1>
            <p className="text-muted-foreground">Manage all your tours and packages</p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Tour
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tours by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "All" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Tour Name</TableHead>
                <TableHead className="font-semibold">Location</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Duration</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Bookings</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTours.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    No tours found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredTours.map((tour) => (
                  <TableRow key={tour.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{tour.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {tour.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{tour.location}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{tour.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">₹{tour.price.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{tour.duration}</TableCell>
                    <TableCell>{getStatusBadge(tour.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{tour.bookings}</span>
                        <span className="text-xs text-muted-foreground">({tour.rating}★)</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => openViewDialog(tour)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(tour)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Tour
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteDialog(tour)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Tour
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredTours.length} of {tours.length} tours
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Tour</DialogTitle>
            <DialogDescription>Create a new tour package for your customers.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tour Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter tour name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "All").map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Enter price"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 3 Days"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Tour["status"]) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter tour description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create Tour</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Tour</DialogTitle>
            <DialogDescription>Update tour information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Tour Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "All").map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price (₹)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Tour["status"]) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Tour Details</DialogTitle>
          </DialogHeader>
          {selectedTour && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{selectedTour.name}</h3>
                  <p className="text-muted-foreground">{selectedTour.location}</p>
                </div>
                {getStatusBadge(selectedTour.status)}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedTour.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{selectedTour.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium">₹{selectedTour.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-medium">{selectedTour.rating} ★</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="font-medium">{selectedTour.bookings}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created At</p>
                  <p className="font-medium">{selectedTour.createdAt}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewOpen(false);
              if (selectedTour) openEditDialog(selectedTour);
            }}>
              Edit Tour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tour</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedTour?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Tours;
