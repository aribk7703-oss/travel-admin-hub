import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { usePages, Page } from "@/hooks/usePages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageFormDialog from "@/components/dashboard/PageFormDialog";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";
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

const Pages = () => {
  const { pages, addPage, updatePage, deletePage, deletePages, setAsHomepage, stats } = usePages();
  const [searchQuery, setSearchQuery] = useState("");
  const [bulkAction, setBulkAction] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<Page | null>(null);

  const filteredPages = useMemo(() => {
    return pages.filter((page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pages, searchQuery]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredPages.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(i => i !== id));
    }
  };

  const handleBulkApply = () => {
    if (!bulkAction || selectedIds.length === 0) {
      toast({
        title: "No Action Selected",
        description: "Please select an action and at least one page.",
        variant: "destructive",
      });
      return;
    }

    if (bulkAction === "delete") {
      deletePages(selectedIds);
      toast({
        title: "Pages Deleted",
        description: `${selectedIds.length} page(s) have been deleted.`,
      });
    } else if (bulkAction === "publish") {
      selectedIds.forEach(id => updatePage(id, { status: 'published' }));
      toast({
        title: "Pages Published",
        description: `${selectedIds.length} page(s) have been published.`,
      });
    } else if (bulkAction === "draft") {
      selectedIds.forEach(id => updatePage(id, { status: 'draft' }));
      toast({
        title: "Pages Set to Draft",
        description: `${selectedIds.length} page(s) have been set to draft.`,
      });
    }

    setSelectedIds([]);
    setBulkAction("");
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setFormOpen(true);
  };

  const handleDelete = (page: Page) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (pageToDelete) {
      deletePage(pageToDelete.id);
      toast({
        title: "Page Deleted",
        description: `${pageToDelete.title} has been deleted.`,
      });
    }
    setDeleteDialogOpen(false);
    setPageToDelete(null);
  };

  const handleSave = (data: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingPage) {
      updatePage(editingPage.id, data);
    } else {
      addPage(data);
    }
    setEditingPage(null);
  };

  const handleSetHomepage = (page: Page) => {
    setAsHomepage(page.id);
    toast({
      title: "Homepage Updated",
      description: `${page.title} is now set as the homepage.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">All Pages</h1>
            <p className="text-muted-foreground">
              {stats.total} total • {stats.published} published • {stats.draft} draft
            </p>
          </div>
          <Button onClick={() => { setEditingPage(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add new page
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Select value={bulkAction} onValueChange={setBulkAction}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Bulk Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publish">Publish</SelectItem>
                <SelectItem value="draft">Set to Draft</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleBulkApply}
              disabled={selectedIds.length === 0}
            >
              Apply
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[200px]"
              />
            </div>
            <Button variant="outline" size="sm">
              Search Page
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedIds.length === filteredPages.length && filteredPages.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No pages found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(page.id)}
                        onCheckedChange={(checked) => handleSelectOne(page.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-medium cursor-pointer hover:underline">
                          {page.title}
                        </span>
                        {page.isHomepage && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Homepage
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{page.author}</TableCell>
                    <TableCell>{page.updatedAt}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={page.status === 'published' ? 'default' : 'secondary'}
                        className={page.status === 'published' ? 'bg-primary' : ''}
                      >
                        {page.status === 'published' ? 'Publish' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions <MoreHorizontal className="h-4 w-4 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(page)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          {!page.isHomepage && (
                            <DropdownMenuItem onClick={() => handleSetHomepage(page)}>
                              <Home className="h-4 w-4 mr-2" />
                              Set as Homepage
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleDelete(page)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
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
      </div>

      {/* Form Dialog */}
      <PageFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        page={editingPage}
        onSave={handleSave}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{pageToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default Pages;
