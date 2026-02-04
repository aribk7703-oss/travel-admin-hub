import { useState, useEffect } from "react";

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

const STORAGE_KEY = "media_files";

export const useMedia = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFiles(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const saveFiles = (newFiles: MediaFile[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFiles));
    setFiles(newFiles);
  };

  const addFile = (file: File): Promise<MediaFile> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const newFile: MediaFile = {
          id: crypto.randomUUID(),
          name: file.name,
          url: reader.result as string,
          type: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
        const updatedFiles = [newFile, ...files];
        saveFiles(updatedFiles);
        resolve(newFile);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const deleteFile = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id);
    saveFiles(updatedFiles);
  };

  const deleteMultiple = (ids: string[]) => {
    const updatedFiles = files.filter((f) => !ids.includes(f.id));
    saveFiles(updatedFiles);
  };

  const updateFile = (id: string, updates: Partial<MediaFile>) => {
    const updatedFiles = files.map((f) =>
      f.id === id ? { ...f, ...updates } : f
    );
    saveFiles(updatedFiles);
  };

  return {
    files,
    isLoading,
    addFile,
    deleteFile,
    deleteMultiple,
    updateFile,
  };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
