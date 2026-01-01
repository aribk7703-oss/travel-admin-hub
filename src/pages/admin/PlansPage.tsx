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
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  id: number;
  name: string;
  price: number;
  duration: "Monthly" | "Yearly";
  features: string;
  users: number;
  status: "Active" | "Inactive";
}

const initialPlans: Plan[] = [
  { id: 1, name: "Basic", price: 9.99, duration: "Monthly", features: "5 Tours, Basic Support", users: 45, status: "Active" },
  { id: 2, name: "Professional", price: 29.99, duration: "Monthly", features: "20 Tours, Priority Support, Analytics", users: 120, status: "Active" },
  { id: 3, name: "Enterprise", price: 99.99, duration: "Monthly", features: "Unlimited Tours, 24/7 Support, Custom Features", users: 25, status: "Active" },
  { id: 4, name: "Yearly Basic", price: 99.99, duration: "Yearly", features: "5 Tours, Basic Support, 2 Months Free", users: 80, status: "Active" },
];

const PlansPage = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({ name: "", price: "", duration: "Monthly" as Plan["duration"], features: "", status: "Active" as Plan["status"] });

  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => setFormData({ name: "", price: "", duration: "Monthly", features: "", status: "Active" });

  const handleCreate = () => {
    const newPlan: Plan = {
      id: Date.now(),
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      duration: formData.duration,
      features: formData.features,
      users: 0,
      status: formData.status,
    };
    setPlans([newPlan, ...plans]);
    setIsCreateOpen(false);
    resetForm();
    toast({ title: "Plan Created", description: `"${newPlan.name}" has been created.` });
  };

  const handleEdit = () => {
    if (!selectedPlan) return;
    setPlans(plans.map(plan => plan.id === selectedPlan.id ? { 
      ...plan, 
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      duration: formData.duration,
      features: formData.features,
      status: formData.status,
    } : plan));
    setIsEditOpen(false);
    resetForm();
    toast({ title: "Plan Updated", description: "Plan has been updated successfully." });
  };

  const handleDelete = () => {
    if (!selectedPlan) return;
    setPlans(plans.filter(plan => plan.id !== selectedPlan.id));
    setIsDeleteOpen(false);
    toast({ title: "Plan Deleted", description: `"${selectedPlan.name}" has been deleted.`, variant: "destructive" });
  };

  const openEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setFormData({ name: plan.name, price: plan.price.toString(), duration: plan.duration, features: plan.features, status: plan.status });
    setIsEditOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">User Plans</h1>
          <Button onClick={() => { resetForm(); setIsCreateOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search plans..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Active Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>${plan.price}</TableCell>
                  <TableCell>{plan.duration}</TableCell>
                  <TableCell>{plan.users}</TableCell>
                  <TableCell>
                    <Badge variant={plan.status === "Active" ? "default" : "secondary"}>{plan.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(plan)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedPlan(plan); setIsDeleteOpen(true); }}><Trash2 className="h-4 w-4" /></Button>
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
            <DialogTitle>Create Plan</DialogTitle>
            <DialogDescription>Add a new subscription plan.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Plan Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Professional" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Price ($)</Label>
                <Input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="29.99" />
              </div>
              <div className="grid gap-2">
                <Label>Duration</Label>
                <Select value={formData.duration} onValueChange={(v: Plan["duration"]) => setFormData({ ...formData, duration: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Features</Label>
              <Textarea value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} placeholder="List features separated by commas..." />
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v: Plan["status"]) => setFormData({ ...formData, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Plan</DialogTitle>
            <DialogDescription>Update plan details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Plan Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Price ($)</Label>
                <Input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Duration</Label>
                <Select value={formData.duration} onValueChange={(v: Plan["duration"]) => setFormData({ ...formData, duration: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Features</Label>
              <Textarea value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v: Plan["status"]) => setFormData({ ...formData, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
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
            <AlertDialogTitle>Delete Plan</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete "{selectedPlan?.name}"? This will affect {selectedPlan?.users} active users.</AlertDialogDescription>
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

export default PlansPage;
