import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Eye, Trash2, Star, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  tour: string;
  user: string;
  email: string;
  rating: number;
  comment: string;
  status: "Approved" | "Pending" | "Rejected";
  date: string;
}

const initialReviews: Review[] = [
  { id: 1, tour: "Paris City Tour", user: "John Doe", email: "john@example.com", rating: 5, comment: "Amazing experience! Highly recommended.", status: "Approved", date: "2024-01-15" },
  { id: 2, tour: "Tokyo Adventure", user: "Jane Smith", email: "jane@example.com", rating: 4, comment: "Great tour but a bit rushed.", status: "Pending", date: "2024-01-14" },
  { id: 3, tour: "Dubai Desert Safari", user: "Mike Johnson", email: "mike@example.com", rating: 5, comment: "Unforgettable experience!", status: "Approved", date: "2024-01-13" },
  { id: 4, tour: "New York City Walk", user: "Sarah Wilson", email: "sarah@example.com", rating: 3, comment: "Average experience.", status: "Rejected", date: "2024-01-12" },
];

const ReviewsPage = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const filteredReviews = reviews.filter(review =>
    review.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (reviewId: number, newStatus: Review["status"]) => {
    setReviews(reviews.map(review => review.id === reviewId ? { ...review, status: newStatus } : review));
    toast({ 
      title: `Review ${newStatus}`, 
      description: `Review has been ${newStatus.toLowerCase()}.`,
      variant: newStatus === "Rejected" ? "destructive" : "default"
    });
  };

  const handleDelete = () => {
    if (!selectedReview) return;
    setReviews(reviews.filter(review => review.id !== selectedReview.id));
    setIsDeleteOpen(false);
    toast({ title: "Review Deleted", description: "Review has been deleted.", variant: "destructive" });
  };

  const openView = (review: Review) => {
    setSelectedReview(review);
    setIsViewOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search reviews..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.tour}</TableCell>
                  <TableCell>{review.user}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      review.status === "Approved" ? "default" : 
                      review.status === "Pending" ? "secondary" : "destructive"
                    }>
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell className="text-right space-x-1">
                    {review.status === "Pending" && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleStatusChange(review.id, "Approved")} className="text-green-600 hover:text-green-700">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleStatusChange(review.id, "Rejected")} className="text-red-600 hover:text-red-700">
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => openView(review)}><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedReview(review); setIsDeleteOpen(true); }}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>View full review information.</DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Tour</Label>
                  <p className="font-medium">{selectedReview.tour}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">{selectedReview.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">User</Label>
                  <p className="font-medium">{selectedReview.user}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedReview.email}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Rating</Label>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < selectedReview.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Comment</Label>
                <p className="mt-1 p-3 bg-muted rounded-lg">{selectedReview.comment}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Status</Label>
                <div className="mt-1">
                  <Select 
                    value={selectedReview.status} 
                    onValueChange={(v: Review["status"]) => {
                      handleStatusChange(selectedReview.id, v);
                      setSelectedReview({ ...selectedReview, status: v });
                    }}
                  >
                    <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this review from "{selectedReview?.user}"? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default ReviewsPage;
