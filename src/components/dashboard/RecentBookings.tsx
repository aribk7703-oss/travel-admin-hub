import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Booking } from "@/types";

interface RecentBookingsProps {
  bookings?: Booking[];
}

const statusColors: Record<Booking['status'], string> = {
  completed: "bg-success/10 text-success border-success/20",
  confirmed: "bg-primary/10 text-primary border-primary/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export const RecentBookings = ({ bookings = [] }: RecentBookingsProps) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Bookings
        </CardTitle>
        <Button 
          variant="link" 
          size="sm" 
          className="gap-1 text-primary"
          onClick={() => navigate("/admin/bookings")}
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Tour/Service</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No recent bookings
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking, index) => (
                <TableRow key={booking.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.customerName}</p>
                      <p className="text-xs text-muted-foreground">{booking.customerPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {booking.tourTitle}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ₹{booking.totalPrice.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={statusColors[booking.status]}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {booking.createdAt}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
