import { useState, useRef, useCallback } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
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
 import { useMedia, formatFileSize, MediaFile, FileTypeFilter, filterByType, Folder } from "@/hooks/useMedia";
import { useToast } from "@/hooks/use-toast";
import { ImageEditorDialog } from "@/components/dashboard/ImageEditorDialog";
import {
  Upload,
  Search,
  Trash2,
  Image as ImageIcon,
  FileText,
  FileVideo,
  FileAudio,
  File,
  Download,
  Copy,
  Eye,
  Grid3X3,
  List,
  Pencil,
   FolderIcon,
   FolderPlus,
   ChevronRight,
   MoveRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
 import { Badge } from "@/components/ui/badge";

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return ImageIcon;
  if (type.startsWith("video/")) return FileVideo;
  if (type.startsWith("audio/")) return FileAudio;
  if (type.includes("pdf") || type.includes("document")) return FileText;
  return File;
};

const Media = () => {
   const { files, folders, isLoading, addFile, deleteFile, deleteMultiple, updateFile, moveToFolder, addFolder, deleteFolder } = useMedia();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editingFile, setEditingFile] = useState<MediaFile | null>(null);
   const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
   const [typeFilter, setTypeFilter] = useState<FileTypeFilter>("all");
   const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
   const [newFolderName, setNewFolderName] = useState("");
   const [moveDialogOpen, setMoveDialogOpen] = useState(false);

   // Filter files by current folder, search query, and type
   const filteredFiles = filterByType(
     files.filter((file) => {
       const matchesFolder = currentFolderId ? file.folder_id === currentFolderId : true;
       const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
       return matchesFolder && matchesSearch;
     }),
     typeFilter
   );

   const currentFolder = folders.find((f) => f.id === currentFolderId);
 
   const processFiles = async (fileList: FileList | globalThis.File[]) => {
    const filesToUpload = Array.from(fileList);
    if (filesToUpload.length === 0) return;

    setIsUploading(true);
    try {
      for (const file of filesToUpload) {
         await addFile(file, currentFolderId || undefined);
      }
      toast({
        title: "Upload successful",
        description: `${filesToUpload.length} file(s) uploaded successfully.`,
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;
    await processFiles(uploadedFiles);
  };

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set dragging to false if we're leaving the drop zone entirely
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      await processFiles(droppedFiles);
    }
  }, []);

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

   const handleDeleteSelected = async () => {
     await deleteMultiple(selectedFiles);
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

   const handleImageSave = async (editedImageUrl: string) => {
    if (editingFile) {
       await updateFile(editingFile.id, { url: editedImageUrl });
      toast({
        title: "Image saved",
        description: "Your edits have been saved successfully.",
      });
      setEditingFile(null);
    }
  };
 
   const handleCreateFolder = async () => {
     if (!newFolderName.trim()) return;
     try {
       await addFolder(newFolderName.trim(), currentFolderId || undefined);
       toast({
         title: "Folder created",
         description: `Folder "${newFolderName}" has been created.`,
       });
       setNewFolderName("");
       setNewFolderDialogOpen(false);
     } catch (error) {
       toast({
         title: "Error",
         description: "Failed to create folder.",
         variant: "destructive",
       });
     }
   };
 
   const handleMoveFiles = async (targetFolderId: string | null) => {
     await moveToFolder(selectedFiles, targetFolderId);
     toast({
       title: "Files moved",
       description: `${selectedFiles.length} file(s) moved successfully.`,
     });
     setSelectedFiles([]);
     setMoveDialogOpen(false);
   };
 
   const handleDeleteFolder = async (folderId: string) => {
     await deleteFolder(folderId);
     if (currentFolderId === folderId) {
       setCurrentFolderId(null);
     }
     toast({ title: "Folder deleted" });
   };

  return (
    <DashboardLayout>
      <div 
        className="space-y-6"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Drag Overlay */}
        {isDragging && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="border-4 border-dashed border-primary rounded-xl p-12 bg-primary/5">
              <div className="flex flex-col items-center gap-4">
                <Upload className="h-16 w-16 text-primary animate-bounce" />
                <p className="text-xl font-medium text-primary">Drop files here to upload</p>
                <p className="text-muted-foreground">Release to add files to your media library</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
            <p className="text-muted-foreground">
              Manage your images, videos, and other files
            </p>
          </div>
           <div className="flex gap-2">
             <Button
               variant="outline"
               onClick={() => setNewFolderDialogOpen(true)}
             >
               <FolderPlus className="mr-2 h-4 w-4" />
               New Folder
             </Button>
             <Button
               onClick={() => fileInputRef.current?.click()}
               disabled={isUploading}
             >
               <Upload className="mr-2 h-4 w-4" />
               {isUploading ? "Uploading..." : "Upload Files"}
             </Button>
           </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
 
         {/* Breadcrumb and Folder Navigation */}
         <div className="flex flex-wrap items-center gap-2">
           <Button
             variant={currentFolderId === null ? "secondary" : "ghost"}
             size="sm"
             onClick={() => setCurrentFolderId(null)}
           >
             <FolderIcon className="mr-2 h-4 w-4" />
             All Files
           </Button>
           {currentFolder && (
             <>
               <ChevronRight className="h-4 w-4 text-muted-foreground" />
               <Badge variant="secondary">{currentFolder.name}</Badge>
             </>
           )}
         </div>
 
         {/* Folders Grid */}
         {folders.length > 0 && currentFolderId === null && (
           <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
             {folders.map((folder) => (
               <div
                 key={folder.id}
                 className="group relative rounded-lg border bg-card p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                 onClick={() => setCurrentFolderId(folder.id)}
               >
                 <div className="flex items-center gap-2">
                   <FolderIcon className="h-8 w-8 text-primary" />
                   <span className="text-sm font-medium truncate">{folder.name}</span>
                 </div>
                 <span className="text-xs text-muted-foreground">
                   {files.filter((f) => f.folder_id === folder.id).length} files
                 </span>
                 <Button
                   size="icon"
                   variant="ghost"
                   className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
                   onClick={(e) => {
                     e.stopPropagation();
                     handleDeleteFolder(folder.id);
                   }}
                 >
                   <Trash2 className="h-3 w-3" />
                 </Button>
               </div>
             ))}
           </div>
         )}

        {/* Drop Zone (when empty) */}
        {filteredFiles.length === 0 && !isLoading && (
          <div 
            className={cn(
              "border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer",
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Drag & drop files here
            </h3>
            <p className="text-muted-foreground mb-4">
              or click to browse your computer
            </p>
            <p className="text-sm text-muted-foreground">
              Supports images, videos, audio, PDFs, and documents
            </p>
          </div>
        )}

        {/* Toolbar */}
         {(files.length > 0 || searchQuery) && (
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
               <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as FileTypeFilter)}>
                 <SelectTrigger className="w-[130px]">
                   <SelectValue placeholder="All Types" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">All Types</SelectItem>
                   <SelectItem value="images">Images</SelectItem>
                   <SelectItem value="videos">Videos</SelectItem>
                   <SelectItem value="audio">Audio</SelectItem>
                   <SelectItem value="documents">Documents</SelectItem>
                 </SelectContent>
               </Select>
              {selectedFiles.length > 0 && (
                 <>
                   <Button
                     variant="outline"
                     size="sm"
                     onClick={() => setMoveDialogOpen(true)}
                   >
                     <MoveRight className="mr-2 h-4 w-4" />
                     Move
                   </Button>
                   <Button
                     variant="destructive"
                     size="sm"
                     onClick={() => setDeleteDialogOpen(true)}
                   >
                     <Trash2 className="mr-2 h-4 w-4" />
                     Delete ({selectedFiles.length})
                   </Button>
                 </>
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
        )}

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
        ) : filteredFiles.length === 0 && searchQuery ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground">No files found</h3>
            <p className="text-muted-foreground">
              Try a different search term
            </p>
          </div>
        ) : viewMode === "grid" && filteredFiles.length > 0 ? (
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
                    {isImage && (
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => setEditingFile(file)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
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
        ) : filteredFiles.length > 0 ? (
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
                    {isImage && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setEditingFile(file)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
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
        ) : null}

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
                  {previewFile.type.startsWith("image/") && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPreviewFile(null);
                        setEditingFile(previewFile);
                      }}
                      className="flex-1"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Image
                    </Button>
                  )}
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

        {/* Image Editor Dialog */}
        {editingFile && (
          <ImageEditorDialog
            open={!!editingFile}
            onOpenChange={(open) => !open && setEditingFile(null)}
            imageUrl={editingFile.url}
            imageName={editingFile.name}
            onSave={handleImageSave}
          />
        )}
 
         {/* New Folder Dialog */}
         <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
           <DialogContent>
             <DialogHeader>
               <DialogTitle>Create New Folder</DialogTitle>
             </DialogHeader>
             <div className="space-y-4">
               <Input
                 placeholder="Folder name"
                 value={newFolderName}
                 onChange={(e) => setNewFolderName(e.target.value)}
                 onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
               />
               <div className="flex justify-end gap-2">
                 <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
                   Cancel
                 </Button>
                 <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
                   Create
                 </Button>
               </div>
             </div>
           </DialogContent>
         </Dialog>
 
         {/* Move to Folder Dialog */}
         <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
           <DialogContent>
             <DialogHeader>
               <DialogTitle>Move {selectedFiles.length} file(s) to folder</DialogTitle>
             </DialogHeader>
             <div className="space-y-2">
               <Button
                 variant="outline"
                 className="w-full justify-start"
                 onClick={() => handleMoveFiles(null)}
               >
                 <FolderIcon className="mr-2 h-4 w-4" />
                 Root (No folder)
               </Button>
               {folders.map((folder) => (
                 <Button
                   key={folder.id}
                   variant="outline"
                   className="w-full justify-start"
                   onClick={() => handleMoveFiles(folder.id)}
                 >
                   <FolderIcon className="mr-2 h-4 w-4 text-primary" />
                   {folder.name}
                 </Button>
               ))}
             </div>
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
