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

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  status: "Published" | "Draft";
  updated: string;
}

const initialPages: Page[] = [
  { id: 1, title: "About Us", slug: "/about", content: "About us page content...", metaTitle: "About Us - Travel Co", metaDescription: "Learn about our travel company", status: "Published", updated: "2024-01-15" },
  { id: 2, title: "Terms & Conditions", slug: "/terms", content: "Terms content...", metaTitle: "Terms & Conditions", metaDescription: "Our terms and conditions", status: "Published", updated: "2024-01-14" },
  { id: 3, title: "Privacy Policy", slug: "/privacy", content: "Privacy policy content...", metaTitle: "Privacy Policy", metaDescription: "Our privacy policy", status: "Published", updated: "2024-01-13" },
  { id: 4, title: "FAQ", slug: "/faq", content: "FAQ content...", metaTitle: "FAQ", metaDescription: "Frequently asked questions", status: "Draft", updated: "2024-01-12" },
];

const PagesPage = () => {
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>(initialPages);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({ title: "", slug: "", content: "", metaTitle: "", metaDescription: "", status: "Draft" as Page["status"] });

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => setFormData({ title: "", slug: "", content: "", metaTitle: "", metaDescription: "", status: "Draft" });

  const generateSlug = (title: string) => "/" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleCreate = () => {
    const newPage: Page = {
      id: Date.now(),
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      content: formData.content,
      metaTitle: formData.metaTitle || formData.title,
      metaDescription: formData.metaDescription,
      status: formData.status,
      updated: new Date().toISOString().split("T")[0],
    };
    setPages([newPage, ...pages]);
    setIsCreateOpen(false);
    resetForm();
    toast({ title: "Page Created", description: `"${newPage.title}" has been created.` });
  };

  const handleEdit = () => {
    if (!selectedPage) return;
    setPages(pages.map(page => page.id === selectedPage.id ? { 
      ...page, 
      ...formData,
      updated: new Date().toISOString().split("T")[0],
    } : page));
    setIsEditOpen(false);
    resetForm();
    toast({ title: "Page Updated", description: "Page has been updated." });
  };

  const handleDelete = () => {
    if (!selectedPage) return;
    setPages(pages.filter(page => page.id !== selectedPage.id));
    setIsDeleteOpen(false);
    toast({ title: "Page Deleted", description: `"${selectedPage.title}" has been deleted.`, variant: "destructive" });
  };

  const openEdit = (page: Page) => {
    setSelectedPage(page);
    setFormData({ title: page.title, slug: page.slug, content: page.content, metaTitle: page.metaTitle, metaDescription: page.metaDescription, status: page.status });
    setIsEditOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Pages</h1>
          <Button onClick={() => { resetForm(); setIsCreateOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Page
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search pages..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell className="font-mono text-sm">{page.slug}</TableCell>
                  <TableCell>
                    <Badge variant={page.status === "Published" ? "default" : "secondary"}>{page.status}</Badge>
                  </TableCell>
                  <TableCell>{page.updated}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(page)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedPage(page); setIsDeleteOpen(true); }}><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Page</DialogTitle>
            <DialogDescription>Add a new static page to your website.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Page Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., About Us" />
              </div>
              <div className="grid gap-2">
                <Label>Slug</Label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="e.g., /about-us" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Content</Label>
              <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Page content..." rows={6} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Meta Title (SEO)</Label>
                <Input value={formData.metaTitle} onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })} placeholder="SEO title" />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v: Page["status"]) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Meta Description (SEO)</Label>
              <Textarea value={formData.metaDescription} onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })} placeholder="SEO description..." rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Page</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
            <DialogDescription>Update page details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Page Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Slug</Label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Content</Label>
              <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={6} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Meta Title (SEO)</Label>
                <Input value={formData.metaTitle} onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v: Page["status"]) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Meta Description (SEO)</Label>
              <Textarea value={formData.metaDescription} onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })} rows={2} />
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
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete "{selectedPage?.title}"? This action cannot be undone.</AlertDialogDescription>
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

export default PagesPage;
