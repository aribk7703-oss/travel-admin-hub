import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MapPin, Plus, Pencil, Trash2, Mountain, Church, Landmark, Castle, Images, Tag, Filter, Search } from 'lucide-react';
import { useLocations, Location } from '@/hooks/useLocations';
import { useCategories } from '@/hooks/useCategories';
import { useTours, Tour } from '@/hooks/useTours';
import { LocationFormDialog } from '@/components/dashboard/LocationFormDialog';
import LocationsMap from '@/components/dashboard/LocationsMap';
import { LocationDetailDialog } from '@/components/dashboard/LocationDetailDialog';
import { ImageGallery } from '@/components/dashboard/ImageGallery';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Locations = () => {
  const navigate = useNavigate();
  const { locations, addLocation, updateLocation, deleteLocation, stats } = useLocations();
  const { tours } = useTours();
  const { getCategoryById, getCategoriesByType } = useCategories();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [detailLocation, setDetailLocation] = useState<Location | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkStatusOpen, setBulkStatusOpen] = useState(false);
  const [newBulkStatus, setNewBulkStatus] = useState<Location['status']>("active");
  const [searchQuery, setSearchQuery] = useState("");

  const locationCategories = getCategoriesByType('location');
  
  const filteredLocations = useMemo(() => {
    let result = locations;
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(l => 
        l.name.toLowerCase().includes(query) || 
        l.description.toLowerCase().includes(query) ||
        l.address.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (categoryFilter === "none") {
      result = result.filter(l => !l.category);
    } else if (categoryFilter !== "all") {
      result = result.filter(l => l.category === categoryFilter);
    }
    
    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter(l => l.status === statusFilter);
    }
    
    return result;
  }, [locations, categoryFilter, statusFilter, searchQuery]);

  const allSelected = filteredLocations.length > 0 && selectedIds.length === filteredLocations.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < filteredLocations.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredLocations.map(l => l.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleBulkDelete = () => {
    selectedIds.forEach(id => deleteLocation(id));
    toast.success(`${selectedIds.length} location(s) deleted successfully!`);
    setSelectedIds([]);
    setBulkDeleteOpen(false);
  };

  const handleBulkStatusChange = () => {
    selectedIds.forEach(id => updateLocation(id, { status: newBulkStatus }));
    toast.success(`${selectedIds.length} location(s) updated to ${newBulkStatus}!`);
    setSelectedIds([]);
    setBulkStatusOpen(false);
  };

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

        {/* Bulk Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg border">
            <span className="text-sm font-medium">{selectedIds.length} item(s) selected</span>
            <div className="flex items-center gap-2 ml-auto">
              <Select value={newBulkStatus} onValueChange={(v) => setNewBulkStatus(v as Location['status'])}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Change status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => setBulkStatusOpen(true)}>
                Change Status
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setBulkDeleteOpen(true)}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete Selected
              </Button>
            </div>
          </div>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>All Locations ({filteredLocations.length})</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="none">Uncategorized</SelectItem>
                  {locationCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox 
                      checked={allSelected} 
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                      {...(someSelected ? { "data-state": "indeterminate" } : {})}
                    />
                  </TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Coordinates</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map((location) => (
                  <TableRow key={location.id} data-state={selectedIds.includes(location.id) ? "selected" : undefined}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedIds.includes(location.id)} 
                        onCheckedChange={(checked) => handleSelectOne(location.id, !!checked)}
                        aria-label={`Select ${location.name}`}
                      />
                    </TableCell>
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
                      {location.category ? (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          <Tag className="h-3 w-3 mr-1" />
                          {getCategoryById(location.category)?.name || 'Unknown'}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
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

      {/* Bulk Delete Confirmation */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedIds.length} Location(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected locations from your list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-destructive text-destructive-foreground">
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Status Change Confirmation */}
      <AlertDialog open={bulkStatusOpen} onOpenChange={setBulkStatusOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Status of {selectedIds.length} Location(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              This will change the status of all selected locations to "{newBulkStatus}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkStatusChange}>
              Update Status
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