import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MapPin, Plus, Pencil, Trash2, Mountain, Church, Landmark, Castle, Images } from 'lucide-react';
import { useLocations, Location } from '@/hooks/useLocations';
import { useTours, Tour } from '@/hooks/useTours';
import { LocationFormDialog } from '@/components/dashboard/LocationFormDialog';
import LocationsMap from '@/components/dashboard/LocationsMap';
import { LocationDetailDialog } from '@/components/dashboard/LocationDetailDialog';
import { ImageGallery } from '@/components/dashboard/ImageGallery';

const Locations = () => {
  const navigate = useNavigate();
  const { locations, addLocation, updateLocation, deleteLocation, stats } = useLocations();
  const { tours } = useTours();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [detailLocation, setDetailLocation] = useState<Location | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Get tours linked to a location by matching location name in tour's location field
  const getLinkedTours = (location: Location): Tour[] => {
    const locationName = location.name.toLowerCase();
    return tours.filter(tour => {
      const tourLocation = tour.location.toLowerCase();
      return tourLocation.includes(locationName) || 
             locationName.includes(tourLocation.split('→').pop()?.trim() || '') ||
             tourLocation.includes(location.address.split(',')[0].toLowerCase());
    });
  };

  const linkedToursForDetail = useMemo(() => {
    if (!detailLocation) return [];
    return getLinkedTours(detailLocation);
  }, [detailLocation, tours]);

  const galleryImages = useMemo(() => 
    locations.map(loc => ({
      src: loc.image,
      alt: loc.name,
      title: loc.name,
    })), [locations]);

  const handleAdd = () => {
    navigate("/locations/add");
  };

  const handleEdit = (location: Location) => {
    navigate(`/locations/edit/${location.id}`);
  };

  const handleQuickEdit = (location: Location) => {
    setEditingLocation(location);
    setDialogOpen(true);
  };

  const handleLocationClick = (location: Location) => {
    setDetailLocation(location);
  };

  const openGallery = (index: number = 0) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  const handleSubmit = (data: Omit<Location, 'id'>) => {
    if (editingLocation) {
      updateLocation(editingLocation.id, data);
    } else {
      addLocation(data);
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteLocation(deleteId);
      setDeleteId(null);
    }
  };

  const getTypeIcon = (type: Location['type']) => {
    switch (type) {
      case 'cave': return <Mountain className="h-4 w-4" />;
      case 'temple': return <Church className="h-4 w-4" />;
      case 'fort': return <Castle className="h-4 w-4" />;
      default: return <Landmark className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: Location['type']) => {
    switch (type) {
      case 'cave': return 'bg-amber-100 text-amber-800';
      case 'temple': return 'bg-purple-100 text-purple-800';
      case 'fort': return 'bg-stone-100 text-stone-800';
      case 'heritage': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Locations</h1>
            <p className="text-muted-foreground">Manage tour destinations and coordinates</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => openGallery()}>
              <Images className="h-4 w-4 mr-2" />
              Gallery
            </Button>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Locations"
            value={stats.total.toString()}
            subtitle={`${stats.active} active`}
            icon={MapPin}
            variant="purple"
          />
          <StatCard
            title="Caves"
            value={stats.caves.toString()}
            subtitle="Rock-cut sites"
            icon={Mountain}
            variant="pink"
          />
          <StatCard
            title="Temples"
            value={stats.temples.toString()}
            subtitle="Religious sites"
            icon={Church}
            variant="teal"
          />
          <StatCard
            title="Heritage Sites"
            value={stats.heritage.toString()}
            subtitle="Historical monuments"
            icon={Landmark}
            variant="cyan"
          />
        </div>

        <LocationsMap 
          locations={locations} 
          onLocationClick={handleLocationClick}
        />

        <Card>
          <CardHeader>
            <CardTitle>All Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Coordinates</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell>
                      <div 
                        className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                        onClick={() => handleLocationClick(location)}
                      >
                        <img
                          src={location.image}
                          alt={location.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-primary hover:underline">{location.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1 max-w-[200px]">
                            {location.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getTypeBadgeColor(location.type)}>
                        <span className="flex items-center gap-1">
                          {getTypeIcon(location.type)}
                          {location.type}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-mono">
                        {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground line-clamp-1 max-w-[150px]">
                        {location.address}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={location.status === 'active' ? 'default' : 'secondary'}>
                        {location.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(location)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(location.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <LocationFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        location={editingLocation}
        onSubmit={handleSubmit}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Location</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this location? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <LocationDetailDialog
        open={!!detailLocation}
        onOpenChange={(open) => !open && setDetailLocation(null)}
        location={detailLocation}
        linkedTours={linkedToursForDetail}
        allLocations={locations}
      />

      <ImageGallery
        images={galleryImages}
        initialIndex={galleryIndex}
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </DashboardLayout>
  );
};

export default Locations;
