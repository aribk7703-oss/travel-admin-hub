import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategories, Category } from "@/hooks/useCategories";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Search } from "lucide-react";

const Categories = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type") as "location" | "tour" | "car" | null;
  const categoryType = typeParam || "tour";
  
  const { categories, addCategory, updateCategory, deleteCategory, getCategoriesByType, getParentCategories } = useCategories();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    parent: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredCategories = getCategoriesByType(categoryType).filter(
    (cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const parentCategories = getParentCategories(categoryType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      updateCategory(editingId, {
        name: formData.name,
        parent: formData.parent || null,
        description: formData.description,
      });
      toast({
        title: "Category Updated",
        description: "Category has been updated successfully",
      });
      setEditingId(null);
    } else {
      addCategory({
        name: formData.name,
        parent: formData.parent || null,
        description: formData.description,
        type: categoryType,
        status: "publish",
      });
      toast({
        title: "Category Added",
        description: "New category has been added successfully",
      });
    }
    
    setFormData({ name: "", parent: "", description: "" });
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      parent: category.parent || "",
      description: category.description,
    });
    setEditingId(category.id);
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteCategory(itemToDelete);
      toast({
        title: "Category Deleted",
        description: "Category has been deleted successfully",
      });
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleBulkAction = () => {
    if (bulkAction === "delete" && selectedItems.length > 0) {
      selectedItems.forEach((id) => deleteCategory(id));
      setSelectedItems([]);
      toast({
        title: "Categories Deleted",
        description: `${selectedItems.length} categories have been deleted`,
      });
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredCategories.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredCategories.map((c) => c.id));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getTypeLabel = () => {
    switch (categoryType) {
      case "location": return "Location";
      case "tour": return "Tour";
      case "car": return "Car";
      default: return "Tour";
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", parent: "", description: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{getTypeLabel()} Categories</h1>
          <p className="text-muted-foreground">Manage categories for {getTypeLabel().toLowerCase()}s</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Category Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{editingId ? "Edit" : "Add"} Category</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Category name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parent">Parent</Label>
                  <Select
                    value={formData.parent}
                    onValueChange={(value) => setFormData({ ...formData, parent: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Please Select --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-- None --</SelectItem>
                      {parentCategories
                        .filter((cat) => cat.id !== editingId)
                        .map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Category description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingId ? "Update" : "Add"} Category
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Categories Table */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Select value={bulkAction} onValueChange={setBulkAction}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Bulk Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delete">Delete</SelectItem>
                      <SelectItem value="publish">Publish</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="secondary" onClick={handleBulkAction} disabled={selectedItems.length === 0}>
                    Apply
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name"
                    className="pl-10 w-full sm:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={selectedItems.length === filteredCategories.length && filteredCategories.length > 0}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No categories found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCategories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedItems.includes(category.id)}
                              onCheckedChange={() => toggleSelectItem(category.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium text-primary">
                            {category.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {category.slug}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={category.status === "publish" ? "default" : "secondary"}
                              className={category.status === "publish" ? "bg-emerald-500" : ""}
                            >
                              {category.status === "publish" ? "Publish" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(category.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(category)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(category.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Categories;
