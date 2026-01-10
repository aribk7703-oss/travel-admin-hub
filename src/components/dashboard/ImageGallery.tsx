import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: { src: string; alt: string; title?: string }[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  initialIndex = 0,
  open,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, goToPrevious, goToNext]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Image counter */}
      <div className="absolute top-4 left-4 text-white/80 text-sm font-medium z-10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 z-10"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      {/* Main image */}
      <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[75vh] object-contain rounded-lg"
        />
        {currentImage.title && (
          <h3 className="text-white text-xl font-semibold mt-4">{currentImage.title}</h3>
        )}
      </div>

      {/* Next button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12 z-10"
        onClick={goToNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] p-2 z-10">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-16 h-12 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all",
              index === currentIndex 
                ? "border-white opacity-100 scale-105" 
                : "border-transparent opacity-50 hover:opacity-80"
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

interface GalleryTriggerProps {
  onClick: () => void;
  className?: string;
}

export const GalleryTrigger: React.FC<GalleryTriggerProps> = ({ onClick, className }) => (
  <Button
    variant="secondary"
    size="sm"
    onClick={onClick}
    className={cn("gap-1.5", className)}
  >
    <Maximize2 className="h-4 w-4" />
    View Gallery
  </Button>
);
