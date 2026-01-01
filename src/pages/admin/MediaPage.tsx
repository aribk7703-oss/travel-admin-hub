import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Upload, Image, Trash2, Eye, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaItem {
  id: number;
  name: string;
  type: string;
  size: string;
  url: string;
  date: string;
}

const initialMediaItems: MediaItem[] = [
  { id: 1, name: "beach-resort.jpg", type: "Image", size: "2.4 MB", url: "/placeholder.svg", date: "2024-01-15" },
  { id: 2, name: "mountain-tour.jpg", type: "Image", size: "1.8 MB", url: "/placeholder.svg", date: "2024-01-14" },
  { id: 3, name: "city-view.jpg", type: "Image", size: "3.2 MB", url: "/placeholder.svg", date: "2024-01-13" },
  { id: 4, name: "desert-safari.jpg", type: "Image", size: "2.1 MB", url: "/placeholder.svg", date: "2024-01-12" },
  { id: 5, name: "cruise-ship.jpg", type: "Image", size: "2.8 MB", url: "/placeholder.svg", date: "2024-01-11" },
  { id: 6, name: "hotel-room.jpg", type: "Image", size: "1.5 MB", url: "/placeholder.svg", date: "2024-01-10" },
];

const MediaPage = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);

  const filteredMedia = mediaItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpload = () => {
    if (!uploadFiles || uploadFiles.length === 0) return;
    
    const newItems: MediaItem[] = Array.from(uploadFiles).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: file.type.startsWith("image/") ? "Image" : "File",
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      url: "/placeholder.svg",
      date: new Date().toISOString().split("T")[0],
    }));
    
    setMediaItems([...newItems, ...mediaItems]);
    setIsUploadOpen(false);
    setUploadFiles(null);
    toast({ title: "Files Uploaded", description: `${uploadFiles.length} file(s) uploaded successfully.` });
  };

  const handleDelete = () => {
    if (!selectedMedia) return;
    setMediaItems(mediaItems.filter(item => item.id !== selectedMedia.id));
    setIsDeleteOpen(false);
    toast({ title: "File Deleted", description: `"${selectedMedia.name}" has been deleted.`, variant: "destructive" });
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    toast({ title: "URL Copied", description: "Image URL copied to clipboard." });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <Button onClick={() => setIsUploadOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search media..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden group relative">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <Image className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.size}</p>
              </div>
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => { setSelectedMedia(item); setIsViewOpen(true); }}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => copyUrl(item.url)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => { setSelectedMedia(item); setIsDeleteOpen(true); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No media files found.
          </div>
        )}
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>Upload images and files to your media library.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div 
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">Click to select files or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
              <input 
                ref={fileInputRef}
                type="file" 
                multiple 
                accept="image/*"
                className="hidden" 
                onChange={(e) => setUploadFiles(e.target.files)}
              />
            </div>
            {uploadFiles && uploadFiles.length > 0 && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">{uploadFiles.length} file(s) selected</p>
                <ul className="text-xs text-muted-foreground mt-1">
                  {Array.from(uploadFiles).slice(0, 3).map((file, i) => (
                    <li key={i}>{file.name}</li>
                  ))}
                  {uploadFiles.length > 3 && <li>...and {uploadFiles.length - 3} more</li>}
                </ul>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsUploadOpen(false); setUploadFiles(null); }}>Cancel</Button>
            <Button onClick={handleUpload} disabled={!uploadFiles || uploadFiles.length === 0}>Upload Files</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>File Details</DialogTitle>
          </DialogHeader>
          {selectedMedia && (
            <div className="space-y-4 py-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Image className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">File Name</Label>
                  <p className="font-medium">{selectedMedia.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Size</Label>
                  <p className="font-medium">{selectedMedia.size}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Type</Label>
                  <p className="font-medium">{selectedMedia.type}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">{selectedMedia.date}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">URL</Label>
                <div className="flex gap-2 mt-1">
                  <Input value={window.location.origin + selectedMedia.url} readOnly className="text-xs" />
                  <Button variant="outline" size="icon" onClick={() => copyUrl(selectedMedia.url)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete "{selectedMedia?.name}"? This action cannot be undone.</AlertDialogDescription>
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

export default MediaPage;
