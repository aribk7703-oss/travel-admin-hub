import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Trash2, Star } from "lucide-react";

const reviews = [
  { id: 1, tour: "Paris City Tour", user: "John Doe", rating: 5, status: "Approved", date: "2024-01-15" },
  { id: 2, tour: "Tokyo Adventure", user: "Jane Smith", rating: 4, status: "Pending", date: "2024-01-14" },
  { id: 3, tour: "Dubai Desert Safari", user: "Mike Johnson", rating: 5, status: "Approved", date: "2024-01-13" },
  { id: 4, tour: "New York City Walk", user: "Sarah Wilson", rating: 3, status: "Rejected", date: "2024-01-12" },
];

const ReviewsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search reviews..." className="pl-10" />
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
              {reviews.map((review) => (
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
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
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

export default ReviewsPage;
