import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
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
import { useMedia, formatFileSize, MediaFile } from "@/hooks/useMedia";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  Search,
  Trash2,
  Image as ImageIcon,
  FileText,
  FileVideo,
  FileAudio,
  File,
  X,
  Download,
  Copy,
  Eye,
  Grid3X3,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return ImageIcon;
  if (type.startsWith("video/")) return FileVideo;
  if (type.startsWith("audio/")) return FileAudio;
  if (type.includes("pdf") || type.includes("document")) return FileText;
  return File;
};

const Media = () => {
  const { files, isLoading, addFile, deleteFile, deleteMultiple } = useMedia();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploading, setIsUploading] = useState(false);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    setIsUploading(true);
    try {
      for (const file of Array.from(uploadedFiles)) {
        await addFile(file);
      }
      toast({
        title: "Upload successful",
        description: `${uploadedFiles.length} file(s) uploaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSelectFile = (id: string) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map((f) => f.id));
    }
  };

  const handleDeleteSelected = () => {
    deleteMultiple(selectedFiles);
    setSelectedFiles([]);
    setDeleteDialogOpen(false);
    toast({
      title: "Files deleted",
      description: `${selectedFiles.length} file(s) have been deleted.`,
    });
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "The file URL has been copied to clipboard.",
    });
  };

  const handleDownload = (file: MediaFile) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
            <p className="text-muted-foreground">
              Manage your images, videos, and other files
            </p>
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            {selectedFiles.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete ({selectedFiles.length})
              </Button>
            )}
            <div className="flex rounded-lg border">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Select All */}
        {filteredFiles.length > 0 && (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm text-muted-foreground">
              {selectedFiles.length > 0
                ? `${selectedFiles.length} of ${filteredFiles.length} selected`
                : `${filteredFiles.length} files`}
            </span>
          </div>
        )}

        {/* Files Grid/List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground">No files found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try a different search term" : "Upload your first file to get started"}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredFiles.map((file) => {
              const FileIcon = getFileIcon(file.type);
              const isImage = file.type.startsWith("image/");
              const isSelected = selectedFiles.includes(file.id);

              return (
                <div
                  key={file.id}
                  className={cn(
                    "group relative rounded-lg border bg-card overflow-hidden transition-all hover:shadow-md",
                    isSelected && "ring-2 ring-primary"
                  )}
                >
                  <div className="absolute top-2 left-2 z-10">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleSelectFile(file.id)}
                      className="bg-background"
                    />
                  </div>
                  <div
                    className="aspect-square flex items-center justify-center bg-muted cursor-pointer"
                    onClick={() => setPreviewFile(file)}
                  >
                    {isImage ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FileIcon className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={() => setPreviewFile(file)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={() => handleCopyUrl(file.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8"
                      onClick={() => {
                        deleteFile(file.id);
                        toast({ title: "File deleted" });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border bg-card">
            {filteredFiles.map((file, index) => {
              const FileIcon = getFileIcon(file.type);
              const isImage = file.type.startsWith("image/");
              const isSelected = selectedFiles.includes(file.id);

              return (
                <div
                  key={file.id}
                  className={cn(
                    "flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors",
                    index !== filteredFiles.length - 1 && "border-b",
                    isSelected && "bg-primary/5"
                  )}
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleSelectFile(file.id)}
                  />
                  <div className="h-12 w-12 rounded overflow-hidden bg-muted flex items-center justify-center shrink-0">
                    {isImage ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FileIcon className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)} •{" "}
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setPreviewFile(file)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDownload(file)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleCopyUrl(file.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        deleteFile(file.id);
                        toast({ title: "File deleted" });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Preview Dialog */}
        <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="truncate pr-8">{previewFile?.name}</DialogTitle>
            </DialogHeader>
            {previewFile && (
              <div className="space-y-4">
                <div className="flex items-center justify-center bg-muted rounded-lg min-h-[300px] max-h-[60vh] overflow-hidden">
                  {previewFile.type.startsWith("image/") ? (
                    <img
                      src={previewFile.url}
                      alt={previewFile.name}
                      className="max-h-[60vh] object-contain"
                    />
                  ) : previewFile.type.startsWith("video/") ? (
                    <video
                      src={previewFile.url}
                      controls
                      className="max-h-[60vh]"
                    />
                  ) : previewFile.type.startsWith("audio/") ? (
                    <audio src={previewFile.url} controls />
                  ) : (
                    <div className="flex flex-col items-center gap-4 py-12">
                      {(() => {
                        const FileIcon = getFileIcon(previewFile.type);
                        return <FileIcon className="h-16 w-16 text-muted-foreground" />;
                      })()}
                      <p className="text-muted-foreground">Preview not available</p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">File size</p>
                    <p className="font-medium">{formatFileSize(previewFile.size)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium">{previewFile.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uploaded</p>
                    <p className="font-medium">
                      {new Date(previewFile.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleDownload(previewFile)} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleCopyUrl(previewFile.url)}
                    className="flex-1"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy URL
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete files?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedFiles.length} file(s)? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteSelected}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default Media;
