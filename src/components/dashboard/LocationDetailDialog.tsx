import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, IndianRupee, Calendar, Maximize2 } from 'lucide-react';
import { Location } from '@/hooks/useLocations';
import { Tour } from '@/hooks/useTours';
import { ImageGallery } from './ImageGallery';

interface LocationDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: Location | null;
  linkedTours: Tour[];
  allLocations: Location[];
  onTourClick?: (tour: Tour) => void;
}

export const LocationDetailDialog: React.FC<LocationDetailDialogProps> = ({
  open,
  onOpenChange,
  location,
  linkedTours,
  allLocations,
  onTourClick,
}) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!location) return null;

  const galleryImages = allLocations.map(loc => ({
    src: loc.image,
    alt: loc.name,
    title: loc.name,
  }));

  const currentLocationIndex = allLocations.findIndex(l => l.id === location.id);

  const openGalleryAtLocation = () => {
    setGalleryIndex(currentLocationIndex >= 0 ? currentLocationIndex : 0);
    setGalleryOpen(true);
  };

  const getStatusColor = (status: Tour['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{location.name}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {location.address}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Image with gallery button */}
            <div className="relative group">
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-3 right-3 gap-1.5 opacity-90 hover:opacity-100"
                onClick={openGalleryAtLocation}
              >
                <Maximize2 className="h-4 w-4" />
                View All Images
              </Button>
              <Badge 
                className="absolute top-3 left-3 capitalize"
                variant="secondary"
              >
                {location.type}
              </Badge>
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{location.description}</p>

            {/* Coordinates */}
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">
                {location.coordinates.lat.toFixed(6)}, {location.coordinates.lng.toFixed(6)}
              </span>
            </div>

            <Separator />

            {/* Linked Tours */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Available Tours ({linkedTours.length})
              </h3>

              {linkedTours.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No tours currently available for this location.
                </p>
              ) : (
                <div className="grid gap-3">
                  {linkedTours.map((tour) => (
                    <Card 
                      key={tour.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onTourClick?.(tour)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <img
                            src={tour.image}
                            alt={tour.name}
                            className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium truncate">{tour.name}</h4>
                              <Badge className={getStatusColor(tour.status)} variant="secondary">
                                {tour.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                              {tour.description}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {tour.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <IndianRupee className="h-3 w-3" />
                                {tour.price.replace('₹', '')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ImageGallery
        images={galleryImages}
        initialIndex={galleryIndex}
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </>
  );
};
