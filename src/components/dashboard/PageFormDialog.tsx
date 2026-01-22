import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Page } from '@/hooks/usePages';
import { toast } from '@/hooks/use-toast';

interface PageFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page?: Page | null;
  onSave: (data: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const PageFormDialog: React.FC<PageFormDialogProps> = ({ open, onOpenChange, page, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    author: 'Admin',
    status: 'draft' as 'published' | 'draft',
    isHomepage: false,
  });

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title,
        slug: page.slug,
        content: page.content,
        author: page.author,
        status: page.status,
        isHomepage: page.isHomepage,
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        content: '',
        author: 'Admin',
        status: 'draft',
        isHomepage: false,
      });
    }
  }, [page, open]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and slug.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    onOpenChange(false);
    
    toast({
      title: page ? "Page Updated" : "Page Created",
      description: `${formData.title} has been ${page ? 'updated' : 'created'} successfully.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{page ? 'Edit Page' : 'Add New Page'}</DialogTitle>
          <DialogDescription>
            {page ? 'Update the page details below.' : 'Create a new page for your website.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title *</Label>
              <Input
                id="title"
                placeholder="Enter page title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                placeholder="page-url-slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                placeholder="Author name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'published' | 'draft') => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Page Content (HTML)</Label>
            <Textarea
              id="content"
              placeholder="<h1>Page Title</h1><p>Your content here...</p>"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={10}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isHomepage"
              checked={formData.isHomepage}
              onCheckedChange={(checked) => setFormData({ ...formData, isHomepage: checked })}
            />
            <Label htmlFor="isHomepage">Set as Homepage</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {page ? 'Update Page' : 'Create Page'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PageFormDialog;
