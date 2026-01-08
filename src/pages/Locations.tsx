import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MapPin, Plus, Pencil, Trash2, Mountain, Church, Landmark, Castle, CheckCircle } from 'lucide-react';
import { useLocations, Location } from '@/hooks/useLocations';
import { LocationFormDialog } from '@/components/dashboard/LocationFormDialog';

const Locations = () => {
  const { locations, addLocation, updateLocation, deleteLocation, stats } = useLocations();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingLocation(null);
    setDialogOpen(true);
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setDialogOpen(true);
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
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
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
                      <div className="flex items-center gap-3">
                        <img
                          src={location.image}
                          alt={location.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{location.name}</div>
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
    </DashboardLayout>
  );
};

export default Locations;
