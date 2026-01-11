import React, { useEffect, useRef, useState, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from '@/hooks/useLocations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Key, Search, Filter, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Toggle } from '@/components/ui/toggle';

interface LocationsMapProps {
  locations: Location[];
  onLocationClick?: (location: Location) => void;
}

const MAPBOX_TOKEN_KEY = 'mapbox_public_token';

const LOCATION_TYPES = ['caves', 'temples', 'heritage', 'forts'] as const;
type LocationType = typeof LOCATION_TYPES[number];

const TYPE_COLORS: Record<LocationType, string> = {
  caves: '#3b82f6',
  temples: '#ec4899',
  heritage: '#f59e0b',
  forts: '#10b981',
};

const LocationsMap: React.FC<LocationsMapProps> = ({ locations, onLocationClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  
  const [accessToken, setAccessToken] = useState(() => 
    localStorage.getItem(MAPBOX_TOKEN_KEY) || ''
  );
  const [tokenInput, setTokenInput] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<LocationType>>(new Set(LOCATION_TYPES));
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapError, setMapError] = useState<string | null>(null);
  const [clusteringEnabled, setClusteringEnabled] = useState(true);

  const saveToken = () => {
    if (tokenInput.trim()) {
      localStorage.setItem(MAPBOX_TOKEN_KEY, tokenInput.trim());
      setAccessToken(tokenInput.trim());
      setMapError(null);
    }
  };

  const clearToken = () => {
    localStorage.removeItem(MAPBOX_TOKEN_KEY);
    setAccessToken('');
    setTokenInput('');
    map.current?.remove();
  };

  const toggleFilter = (type: LocationType) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const filteredLocations = useMemo(() => {
    return locations.filter(loc => activeFilters.has(loc.type as LocationType));
  }, [locations, activeFilters]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return locations;
    return locations.filter(loc => 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [locations, searchQuery]);

  const flyToLocation = (location: Location) => {
    if (map.current) {
      map.current.flyTo({
        center: [location.coordinates.lng, location.coordinates.lat],
        zoom: 14,
        pitch: 45,
        duration: 2000,
      });
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Create GeoJSON data from locations
  const geojsonData = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: filteredLocations.map(loc => ({
      type: 'Feature' as const,
      properties: {
        id: loc.id,
        name: loc.name,
        description: loc.description,
        type: loc.type,
        image: loc.image,
        color: TYPE_COLORS[loc.type as LocationType] || '#6366f1',
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [loc.coordinates.lng, loc.coordinates.lat],
      },
    })),
  }), [filteredLocations]);

  // Update source data when filters change
  useEffect(() => {
    if (!map.current || !map.current.getSource('locations')) return;
    
    const source = map.current.getSource('locations') as mapboxgl.GeoJSONSource;
    source.setData(geojsonData);
  }, [geojsonData]);

  useEffect(() => {
    if (!mapContainer.current || !accessToken) return;

    try {
      mapboxgl.accessToken = accessToken;

      // Calculate center from all locations
      const avgLat = locations.reduce((sum, loc) => sum + loc.coordinates.lat, 0) / locations.length;
      const avgLng = locations.reduce((sum, loc) => sum + loc.coordinates.lng, 0) / locations.length;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        zoom: 8,
        center: [avgLng || 75.3, avgLat || 20],
        pitch: 30,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true }),
        'top-right'
      );

      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Invalid Mapbox token. Please check your token and try again.');
      });

      map.current.on('load', () => {
        if (!map.current) return;

        // Add GeoJSON source with clustering
        map.current.addSource('locations', {
          type: 'geojson',
          data: geojsonData,
          cluster: clusteringEnabled,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        // Cluster circles layer
        map.current.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'locations',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#6366f1',
              5, '#8b5cf6',
              10, '#a855f7',
              20, '#c026d3',
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              5, 25,
              10, 30,
              20, 35,
            ],
            'circle-stroke-width': 3,
            'circle-stroke-color': '#ffffff',
          },
        });

        // Cluster count labels
        map.current.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'locations',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 14,
          },
          paint: {
            'text-color': '#ffffff',
          },
        });

        // Individual location points
        map.current.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'locations',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': ['get', 'color'],
            'circle-radius': 10,
            'circle-stroke-width': 3,
            'circle-stroke-color': '#ffffff',
          },
        });

        // Click on cluster to zoom in
        map.current.on('click', 'clusters', (e) => {
          if (!map.current) return;
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: ['clusters'],
          });
          const clusterId = features[0]?.properties?.cluster_id;
          const source = map.current.getSource('locations') as mapboxgl.GeoJSONSource;
          
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err || !map.current) return;

            map.current.easeTo({
              center: (features[0].geometry as GeoJSON.Point).coordinates as [number, number],
              zoom: zoom,
            });
          });
        });

        // Click on individual point
        map.current.on('click', 'unclustered-point', (e) => {
          if (!e.features?.[0]) return;
          const props = e.features[0].properties;
          const coords = (e.features[0].geometry as GeoJSON.Point).coordinates.slice() as [number, number];

          const location = locations.find(l => l.id === props?.id);
          if (location) {
            onLocationClick?.(location);
          }

          // Show popup
          new mapboxgl.Popup({ offset: 15, closeButton: false })
            .setLngLat(coords)
            .setHTML(`
              <div style="padding: 8px; min-width: 200px;">
                <img src="${props?.image}" alt="${props?.name}" style="width: 100%; height: 80px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;" />
                <h3 style="font-weight: 600; margin: 0 0 4px 0; font-size: 14px;">${props?.name}</h3>
                <p style="font-size: 12px; color: #666; margin: 0; line-height: 1.4;">${props?.description?.slice(0, 80)}...</p>
                <span style="display: inline-block; margin-top: 8px; padding: 2px 8px; background: ${props?.color}22; color: ${props?.color}; border-radius: 12px; font-size: 11px; text-transform: capitalize; font-weight: 500;">${props?.type}</span>
              </div>
            `)
            .addTo(map.current!);
        });

        // Cursor changes
        map.current.on('mouseenter', 'clusters', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });
        map.current.on('mouseleave', 'clusters', () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });
        map.current.on('mouseenter', 'unclustered-point', () => {
          if (map.current) map.current.getCanvas().style.cursor = 'pointer';
        });
        map.current.on('mouseleave', 'unclustered-point', () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });

        // Fit bounds to show all markers
        if (locations.length > 0) {
          const bounds = new mapboxgl.LngLatBounds();
          locations.forEach((loc) => {
            bounds.extend([loc.coordinates.lng, loc.coordinates.lat]);
          });
          map.current?.fitBounds(bounds, { padding: 60, maxZoom: 10 });
        }
      });
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map. Please check your token.');
    }

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, [accessToken, locations, onLocationClick, clusteringEnabled]);

  if (!accessToken) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Mapbox API Token Required
          </CardTitle>
          <CardDescription>
            To display the interactive map, please enter your Mapbox public token. 
            Get one free at{' '}
            <a 
              href="https://mapbox.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              mapbox.com
            </a>
            {' '}(Tokens section in dashboard after signup).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="flex-1"
            />
            <Button onClick={saveToken} disabled={!tokenInput.trim()}>
              <MapPin className="h-4 w-4 mr-2" />
              Enable Map
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (mapError) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Map Error</CardTitle>
          <CardDescription>{mapError}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={clearToken}>
            Enter New Token
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Map
          </CardTitle>
          <div className="flex items-center gap-2">
            {/* Clustering Toggle */}
            <Toggle
              pressed={clusteringEnabled}
              onPressedChange={setClusteringEnabled}
              size="sm"
              className="gap-1.5"
              aria-label="Toggle clustering"
            >
              <Layers className="h-4 w-4" />
              Clustering
            </Toggle>
            
            {/* Search */}
            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="end">
                <Command>
                  <CommandInput 
                    placeholder="Search locations..." 
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No locations found.</CommandEmpty>
                    <CommandGroup heading="Locations">
                      {searchResults.map((location) => (
                        <CommandItem
                          key={location.id}
                          value={location.name}
                          onSelect={() => flyToLocation(location)}
                          className="cursor-pointer"
                        >
                          <MapPin className="mr-2 h-4 w-4" style={{ color: TYPE_COLORS[location.type as LocationType] }} />
                          <div className="flex flex-col">
                            <span>{location.name}</span>
                            <span className="text-xs text-muted-foreground capitalize">{location.type}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            <Button variant="ghost" size="sm" onClick={clearToken}>
              Change Token
            </Button>
          </div>
        </div>
        
        {/* Filter toggles */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {LOCATION_TYPES.map((type) => (
            <Toggle
              key={type}
              pressed={activeFilters.has(type)}
              onPressedChange={() => toggleFilter(type)}
              size="sm"
              className="capitalize data-[state=on]:text-white gap-1.5"
              style={{
                backgroundColor: activeFilters.has(type) ? TYPE_COLORS[type] : undefined,
              }}
            >
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: activeFilters.has(type) ? 'white' : TYPE_COLORS[type] }}
              />
              {type}
            </Toggle>
          ))}
          <Badge variant="secondary" className="ml-auto">
            {filteredLocations.length} of {locations.length} shown
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-[400px] rounded-b-lg overflow-hidden">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationsMap;
