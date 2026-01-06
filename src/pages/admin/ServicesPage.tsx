import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { servicesApi, Service } from "@/lib/api";

const ServicesPage = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    pricePerKm: "",
    image: "",
    isActive: true,
  });

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const data = await servicesApi.getAll();
      setServices(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      basePrice: "",
      pricePerKm: "",
      image: "",
      isActive: true,
    });
  };

  const handleCreate = async () => {
    try {
      const newService = await servicesApi.create({
        name: formData.name,
        description: formData.description,
        basePrice: parseFloat(formData.basePrice) || 0,
        pricePerKm: parseFloat(formData.pricePerKm) || 0,
        image: formData.image || "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
        isActive: formData.isActive,
      });
      setServices([newService, ...services]);
      setIsCreateOpen(false);
      resetForm();
      toast({ title: "Service Added", description: `"${newService.name}" has been added.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to create service", variant: "destructive" });
    }
  };

  const handleEdit = async () => {
    if (!selectedService) return;
    try {
      const updated = await servicesApi.update(selectedService.id, {
        name: formData.name,
        description: formData.description,
        basePrice: parseFloat(formData.basePrice) || 0,
        pricePerKm: parseFloat(formData.pricePerKm) || 0,
        image: formData.image,
        isActive: formData.isActive,
      });
      if (updated) {
        setServices(services.map(s => s.id === selectedService.id ? updated : s));
        setIsEditOpen(false);
        resetForm();
        toast({ title: "Service Updated", description: "Service has been updated successfully." });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update service", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!selectedService) return;
    try {
      await servicesApi.delete(selectedService.id);
      setServices(services.filter(s => s.id !== selectedService.id));
      setIsDeleteOpen(false);
      toast({ title: "Service Deleted", description: `"${selectedService.name}" has been deleted.`, variant: "destructive" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete service", variant: "destructive" });
    }
  };

  const openEdit = (service: Service) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      description: service.description,
      basePrice: service.basePrice.toString(),
      pricePerKm: service.pricePerKm.toString(),
      image: service.image,
      isActive: service.isActive,
    });
    setIsEditOpen(true);
  };

  const toggleActive = async (service: Service) => {
    try {
      const updated = await servicesApi.update(service.id, { isActive: !service.isActive });
      if (updated) {
        setServices(services.map(s => s.id === service.id ? updated : s));
        toast({
          title: updated.isActive ? "Service Activated" : "Service Deactivated",
          description: `"${service.name}" is now ${updated.isActive ? 'active' : 'inactive'}.`,
        });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update service", variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Services Management</h1>
            <p className="text-muted-foreground">Manage taxi and travel services</p>
          </div>
          <Button onClick={() => { resetForm(); setIsCreateOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search services..." 
              className="pl-10" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Service</TableHead>
                <TableHead className="font-semibold">Base Price</TableHead>
                <TableHead className="font-semibold">Per Km</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    Loading services...
                  </TableCell>
                </TableRow>
              ) : filteredServices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No services found
                  </TableCell>
                </TableRow>
              ) : (
                filteredServices.map((service) => (
                  <TableRow key={service.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={service.image} 
                          alt={service.name} 
                          className="h-10 w-14 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>₹{service.basePrice.toLocaleString()}</TableCell>
                    <TableCell>₹{service.pricePerKm}/km</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={service.isActive} 
                          onCheckedChange={() => toggleActive(service)}
                        />
                        <Badge variant={service.isActive ? "default" : "secondary"}>
                          {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => { setSelectedService(service); setIsDeleteOpen(true); }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>Add a new taxi or travel service.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Service Name</Label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                placeholder="e.g., Airport Transfer"
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                placeholder="Service description..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Base Price (₹)</Label>
                <Input 
                  type="number" 
                  value={formData.basePrice} 
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Price Per Km (₹)</Label>
                <Input 
                  type="number" 
                  value={formData.pricePerKm} 
                  onChange={(e) => setFormData({ ...formData, pricePerKm: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Image URL</Label>
              <Input 
                value={formData.image} 
                onChange={(e) => setFormData({ ...formData, image: e.target.value })} 
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={formData.isActive} 
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Add Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Update service details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Service Name</Label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Base Price (₹)</Label>
                <Input 
                  type="number" 
                  value={formData.basePrice} 
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Price Per Km (₹)</Label>
                <Input 
                  type="number" 
                  value={formData.pricePerKm} 
                  onChange={(e) => setFormData({ ...formData, pricePerKm: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Image URL</Label>
              <Input 
                value={formData.image} 
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={formData.isActive} 
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label>Active</Label>
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
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedService?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default ServicesPage;
