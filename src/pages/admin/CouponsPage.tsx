import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Coupon {
  id: number;
  code: string;
  discount: string;
  type: "Percentage" | "Fixed";
  minOrder: number;
  uses: number;
  maxUses: number;
  status: "Active" | "Expired" | "Inactive";
  expiryDate: string;
}

const initialCoupons: Coupon[] = [
  { id: 1, code: "SUMMER20", discount: "20", type: "Percentage", minOrder: 100, uses: 45, maxUses: 100, status: "Active", expiryDate: "2024-06-30" },
  { id: 2, code: "FLAT50", discount: "50", type: "Fixed", minOrder: 200, uses: 23, maxUses: 50, status: "Active", expiryDate: "2024-05-15" },
  { id: 3, code: "WELCOME10", discount: "10", type: "Percentage", minOrder: 0, uses: 156, maxUses: 500, status: "Active", expiryDate: "2024-12-31" },
  { id: 4, code: "WINTER15", discount: "15", type: "Percentage", minOrder: 150, uses: 0, maxUses: 100, status: "Expired", expiryDate: "2024-01-01" },
];

const CouponsPage = () => {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({ 
    code: "", discount: "", type: "Percentage" as Coupon["type"], 
    minOrder: "", maxUses: "", status: "Active" as Coupon["status"], expiryDate: "" 
  });

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => setFormData({ code: "", discount: "", type: "Percentage", minOrder: "", maxUses: "", status: "Active", expiryDate: "" });

  const handleCreate = () => {
    const newCoupon: Coupon = {
      id: Date.now(),
      code: formData.code.toUpperCase(),
      discount: formData.discount,
      type: formData.type,
      minOrder: parseFloat(formData.minOrder) || 0,
      uses: 0,
      maxUses: parseInt(formData.maxUses) || 100,
      status: formData.status,
      expiryDate: formData.expiryDate,
    };
    setCoupons([newCoupon, ...coupons]);
    setIsCreateOpen(false);
    resetForm();
    toast({ title: "Coupon Created", description: `"${newCoupon.code}" has been created.` });
  };

  const handleEdit = () => {
    if (!selectedCoupon) return;
    setCoupons(coupons.map(coupon => coupon.id === selectedCoupon.id ? { 
      ...coupon,
      code: formData.code.toUpperCase(),
      discount: formData.discount,
      type: formData.type,
      minOrder: parseFloat(formData.minOrder) || 0,
      maxUses: parseInt(formData.maxUses) || 100,
      status: formData.status,
      expiryDate: formData.expiryDate,
    } : coupon));
    setIsEditOpen(false);
    resetForm();
    toast({ title: "Coupon Updated", description: "Coupon has been updated successfully." });
  };

  const handleDelete = () => {
    if (!selectedCoupon) return;
    setCoupons(coupons.filter(coupon => coupon.id !== selectedCoupon.id));
    setIsDeleteOpen(false);
    toast({ title: "Coupon Deleted", description: `"${selectedCoupon.code}" has been deleted.`, variant: "destructive" });
  };

  const openEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormData({ 
      code: coupon.code, 
      discount: coupon.discount, 
      type: coupon.type, 
      minOrder: coupon.minOrder.toString(), 
      maxUses: coupon.maxUses.toString(), 
      status: coupon.status,
      expiryDate: coupon.expiryDate,
    });
    setIsEditOpen(true);
  };

  const formatDiscount = (coupon: Coupon) => coupon.type === "Percentage" ? `${coupon.discount}%` : `$${coupon.discount}`;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Coupons</h1>
          <Button onClick={() => { resetForm(); setIsCreateOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Coupon
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search coupons..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Min Order</TableHead>
                <TableHead>Uses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium font-mono">{coupon.code}</TableCell>
                  <TableCell>{formatDiscount(coupon)}</TableCell>
                  <TableCell>{coupon.type}</TableCell>
                  <TableCell>${coupon.minOrder}</TableCell>
                  <TableCell>{coupon.uses}/{coupon.maxUses}</TableCell>
                  <TableCell>
                    <Badge variant={coupon.status === "Active" ? "default" : coupon.status === "Expired" ? "destructive" : "secondary"}>{coupon.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(coupon)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedCoupon(coupon); setIsDeleteOpen(true); }}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Coupon</DialogTitle>
            <DialogDescription>Create a new discount coupon.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Coupon Code</Label>
              <Input value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} placeholder="e.g., SUMMER20" className="uppercase" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Discount Value</Label>
                <Input type="number" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} placeholder="e.g., 20" />
              </div>
              <div className="grid gap-2">
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={(v: Coupon["type"]) => setFormData({ ...formData, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Percentage">Percentage (%)</SelectItem>
                    <SelectItem value="Fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Minimum Order ($)</Label>
                <Input type="number" value={formData.minOrder} onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })} placeholder="0" />
              </div>
              <div className="grid gap-2">
                <Label>Max Uses</Label>
                <Input type="number" value={formData.maxUses} onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })} placeholder="100" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Expiry Date</Label>
                <Input type="date" value={formData.expiryDate} onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v: Coupon["status"]) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Coupon</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
            <DialogDescription>Update coupon details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Coupon Code</Label>
              <Input value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} className="uppercase" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Discount Value</Label>
                <Input type="number" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={(v: Coupon["type"]) => setFormData({ ...formData, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Percentage">Percentage (%)</SelectItem>
                    <SelectItem value="Fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Minimum Order ($)</Label>
                <Input type="number" value={formData.minOrder} onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Max Uses</Label>
                <Input type="number" value={formData.maxUses} onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Expiry Date</Label>
                <Input type="date" value={formData.expiryDate} onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v: Coupon["status"]) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Coupon</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete "{selectedCoupon?.code}"? This action cannot be undone.</AlertDialogDescription>
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

export default CouponsPage;
