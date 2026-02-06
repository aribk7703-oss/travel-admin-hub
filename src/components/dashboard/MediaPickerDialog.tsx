import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMedia, formatFileSize, MediaFile } from "@/hooks/useMedia";
import { useToast } from "@/hooks/use-toast";
import { Search, Upload, Check, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
  accept?: "images" | "all";
}

export const MediaPickerDialog = ({
  open,
  onOpenChange,
  onSelect,
  accept = "images",
}: MediaPickerDialogProps) => {
  const { files, isLoading, addFile } = useMedia();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = accept === "images" ? file.type.startsWith("image/") : true;
    return matchesSearch && matchesType;
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    setIsUploading(true);
    try {
      const file = uploadedFiles[0];
      const newFile = await addFile(file);
      setSelectedUrl(newFile.url);
      toast({ title: "File uploaded", description: `${file.name} uploaded successfully.` });
    } catch {
      toast({ title: "Upload failed", description: "There was an error uploading your file.", variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleConfirm = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
      onOpenChange(false);
      setSelectedUrl(null);
      setSearchQuery("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select from Media Library</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept === "images" ? "image/*" : "*"}
            className="hidden"
            onChange={handleUpload}
          />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No files found. Upload one to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-1">
              {filteredFiles.map((file) => {
                const isImage = file.type.startsWith("image/");
                const isSelected = selectedUrl === file.url;

                return (
                  <div
                    key={file.id}
                    className={cn(
                      "relative rounded-lg border overflow-hidden cursor-pointer transition-all hover:shadow-md",
                      isSelected && "ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedUrl(file.url)}
                  >
                    {isSelected && (
                      <div className="absolute top-1 right-1 z-10 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      {isImage ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="p-1.5">
                      <p className="text-xs font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedUrl}>
            Select Image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
