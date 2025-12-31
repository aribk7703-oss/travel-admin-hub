import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const coupons = [
  { id: 1, code: "SUMMER20", discount: "20%", type: "Percentage", uses: 45, status: "Active" },
  { id: 2, code: "FLAT50", discount: "$50", type: "Fixed", uses: 23, status: "Active" },
  { id: 3, code: "WELCOME10", discount: "10%", type: "Percentage", uses: 156, status: "Active" },
  { id: 4, code: "WINTER15", discount: "15%", type: "Percentage", uses: 0, status: "Expired" },
];

const CouponsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Coupons</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Coupon
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search coupons..." className="pl-10" />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Uses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium font-mono">{coupon.code}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>{coupon.type}</TableCell>
                  <TableCell>{coupon.uses}</TableCell>
                  <TableCell>
                    <Badge variant={coupon.status === "Active" ? "default" : "secondary"}>
                      {coupon.status}
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

export default CouponsPage;
