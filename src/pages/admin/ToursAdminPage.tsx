import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  slug: string;
  location: string;
  category: string;
  price: number;
  duration: string;
  status: "active" | "draft" | "inactive";
  rating: number;
  bookings: number;
  featured: boolean;
  createdAt: string;
}

const initialTours: Tour[] = [
  {
    id: "1",
    name: "Explore Jaipur Heritage",
    slug: "explore-jaipur-heritage",
    location: "Jaipur, Rajasthan",
    category: "Cultural",
    price: 15000,
    duration: "3 Days",
    status: "active",
    rating: 4.8,
    bookings: 124,
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Kerala Backwaters Cruise",
    slug: "kerala-backwaters-cruise",
    location: "Alleppey, Kerala",
    category: "Nature",
    price: 22000,
    duration: "4 Days",
    status: "active",
    rating: 4.9,
    bookings: 89,
    featured: true,
    createdAt: "2024-02-10",
  },
  {
    id: "3",
    name: "Himalayan Adventure Trek",
    slug: "himalayan-adventure-trek",
    location: "Manali, Himachal",
    category: "Adventure",
    price: 35000,
    duration: "7 Days",
    status: "draft",
    rating: 4.7,
    bookings: 45,
    featured: false,
    createdAt: "2024-03-05",
  },
  {
    id: "4",
    name: "Goa Beach Retreat",
    slug: "goa-beach-retreat",
    location: "Goa",
    category: "Beach",
    price: 18000,
    duration: "5 Days",
    status: "active",
    rating: 4.6,
    bookings: 210,
    featured: false,
    createdAt: "2024-01-20",
  },
  {
    id: "5",
    name: "Varanasi Spiritual Journey",
    slug: "varanasi-spiritual-journey",
    location: "Varanasi, UP",
    category: "Spiritual",
    price: 12000,
    duration: "2 Days",
    status: "inactive",
    rating: 4.5,
    bookings: 67,
    featured: false,
    createdAt: "2024-02-28",
  },
];

const categories = ["All", "Cultural", "Nature", "Adventure", "Beach", "Spiritual"];
const statuses = ["All", "active", "draft", "inactive"];

const ToursAdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || tour.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || tour.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
          <Button onClick={() => navigate("/admin/tours/add")} className="gap-2">
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
                        <p className="text-xs text-muted-foreground">/{tour.slug}</p>
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
                          <DropdownMenuItem onClick={() => window.open(`/tour/${tour.slug}`, "_blank")}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Live
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/admin/tours/${tour.id}/edit`)}>
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

      {/* Delete Dialog */}
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

export default ToursAdminPage;
