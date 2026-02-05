 import { useState, useEffect } from "react";
 import { supabase } from "@/integrations/supabase/client";

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
   folder_id?: string | null;
}

 export interface Folder {
   id: string;
   name: string;
   slug: string;
   parent_id: string | null;
   created_at: string;
   updated_at: string;
 }
 
 export type FileTypeFilter = "all" | "images" | "videos" | "audio" | "documents";

export const useMedia = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
   const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
     fetchData();
  }, []);

   const fetchData = async () => {
     setIsLoading(true);
     try {
       // Fetch folders
       const { data: foldersData, error: foldersError } = await supabase
         .from("folders")
         .select("*")
         .order("name");
 
       if (foldersError) throw foldersError;
       setFolders(foldersData || []);
 
       // Fetch media files
       const { data: filesData, error: filesError } = await supabase
         .from("media_files")
         .select("*")
         .order("created_at", { ascending: false });
 
       if (filesError) throw filesError;
       
       setFiles(
         (filesData || []).map((f) => ({
           id: f.id,
           name: f.name,
           url: f.url,
           type: f.type,
           size: f.size,
           uploadedAt: f.created_at,
           folder_id: f.folder_id,
         }))
       );
     } catch (error) {
       console.error("Error fetching media data:", error);
     } finally {
       setIsLoading(false);
     }
   };

   const addFile = async (file: File, folderId?: string): Promise<MediaFile> => {
     const fileExt = file.name.split(".").pop();
     const filePath = `${crypto.randomUUID()}.${fileExt}`;
 
     // Upload to storage
     const { error: uploadError } = await supabase.storage
       .from("media")
       .upload(filePath, file);
 
     if (uploadError) throw uploadError;
 
     // Get public URL
     const { data: urlData } = supabase.storage
       .from("media")
       .getPublicUrl(filePath);
 
     // Insert into database
     const { data: insertedFile, error: insertError } = await supabase
       .from("media_files")
       .insert({
         name: file.name,
         storage_path: filePath,
         url: urlData.publicUrl,
         type: file.type,
         size: file.size,
         folder_id: folderId || null,
       })
       .select()
       .single();
 
     if (insertError) throw insertError;
 
     const newFile: MediaFile = {
       id: insertedFile.id,
       name: insertedFile.name,
       url: insertedFile.url,
       type: insertedFile.type,
       size: insertedFile.size,
       uploadedAt: insertedFile.created_at,
       folder_id: insertedFile.folder_id,
     };
 
     setFiles((prev) => [newFile, ...prev]);
     return newFile;
  };

   const deleteFile = async (id: string) => {
     // Get storage path first
     const { data: fileData } = await supabase
       .from("media_files")
       .select("storage_path")
       .eq("id", id)
       .maybeSingle();
 
     if (fileData?.storage_path) {
       await supabase.storage.from("media").remove([fileData.storage_path]);
     }
 
     await supabase.from("media_files").delete().eq("id", id);
     setFiles((prev) => prev.filter((f) => f.id !== id));
  };

   const deleteMultiple = async (ids: string[]) => {
     // Get storage paths
     const { data: filesData } = await supabase
       .from("media_files")
       .select("storage_path")
       .in("id", ids);
 
     if (filesData && filesData.length > 0) {
       const paths = filesData.map((f) => f.storage_path).filter(Boolean);
       if (paths.length > 0) {
         await supabase.storage.from("media").remove(paths);
       }
     }
 
     await supabase.from("media_files").delete().in("id", ids);
     setFiles((prev) => prev.filter((f) => !ids.includes(f.id)));
  };

   const updateFile = async (id: string, updates: Partial<MediaFile>) => {
     const dbUpdates: Record<string, unknown> = {};
     if (updates.name !== undefined) dbUpdates.name = updates.name;
     if (updates.url !== undefined) dbUpdates.url = updates.url;
     if (updates.folder_id !== undefined) dbUpdates.folder_id = updates.folder_id;
 
     await supabase.from("media_files").update(dbUpdates).eq("id", id);
     setFiles((prev) =>
       prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
     );
   };
 
   const moveToFolder = async (fileIds: string[], folderId: string | null) => {
     await supabase
       .from("media_files")
       .update({ folder_id: folderId })
       .in("id", fileIds);
 
     setFiles((prev) =>
       prev.map((f) =>
         fileIds.includes(f.id) ? { ...f, folder_id: folderId } : f
       )
     );
   };
 
   const addFolder = async (name: string, parentId?: string): Promise<Folder> => {
     const slug = name.toLowerCase().replace(/\s+/g, "-");
     const { data, error } = await supabase
       .from("folders")
       .insert({
         name,
         slug,
         parent_id: parentId || null,
       })
       .select()
       .single();
 
     if (error) throw error;
     setFolders((prev) => [...prev, data]);
     return data;
   };
 
   const deleteFolder = async (id: string) => {
     await supabase.from("folders").delete().eq("id", id);
     setFolders((prev) => prev.filter((f) => f.id !== id));
  };

  return {
    files,
     folders,
    isLoading,
    addFile,
    deleteFile,
    deleteMultiple,
    updateFile,
     moveToFolder,
     addFolder,
     deleteFolder,
     refetch: fetchData,
  };
};

 export const getFileTypeCategory = (type: string): FileTypeFilter => {
   if (type.startsWith("image/")) return "images";
   if (type.startsWith("video/")) return "videos";
   if (type.startsWith("audio/")) return "audio";
   if (
     type.includes("pdf") ||
     type.includes("document") ||
     type.includes("word") ||
     type.includes("text/")
   )
     return "documents";
   return "all";
 };
 
 export const filterByType = (
   files: MediaFile[],
   filter: FileTypeFilter
 ): MediaFile[] => {
   if (filter === "all") return files;
   return files.filter((file) => getFileTypeCategory(file.type) === filter);
 };
 
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
