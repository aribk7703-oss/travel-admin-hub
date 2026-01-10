import React, { useEffect, useRef, useState, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from '@/hooks/useLocations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Key, Search, Filter, X } from 'lucide-react';
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
  caves: 'hsl(220, 70%, 50%)',
  temples: 'hsl(340, 70%, 50%)',
  heritage: 'hsl(45, 80%, 45%)',
  forts: 'hsl(160, 60%, 40%)',
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

  // Update markers when filters change
  useEffect(() => {
    if (!map.current) return;
    
    // Update marker visibility based on filters
    markersRef.current.forEach((marker, index) => {
      const location = locations[index];
      if (location) {
        const element = marker.getElement();
        const isVisible = activeFilters.has(location.type as LocationType);
        element.style.display = isVisible ? 'flex' : 'none';
      }
    });
  }, [activeFilters, locations]);

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

      // Add markers for each location
      map.current.on('load', () => {
        locations.forEach((location) => {
          const typeColor = TYPE_COLORS[location.type as LocationType] || 'hsl(var(--primary))';
          const el = document.createElement('div');
          el.className = 'location-marker';
          el.dataset.type = location.type;
          el.style.cssText = `
            width: 32px;
            height: 32px;
            background: ${typeColor};
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
          `;
          el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
          
          el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.2)';
          });
          el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
          });

          const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML(`
              <div style="padding: 8px; min-width: 200px;">
                <img src="${location.image}" alt="${location.name}" style="width: 100%; height: 80px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;" />
                <h3 style="font-weight: 600; margin: 0 0 4px 0; font-size: 14px;">${location.name}</h3>
                <p style="font-size: 12px; color: #666; margin: 0; line-height: 1.4;">${location.description.slice(0, 80)}...</p>
                <span style="display: inline-block; margin-top: 8px; padding: 2px 8px; background: ${typeColor}22; color: ${typeColor}; border-radius: 12px; font-size: 11px; text-transform: capitalize; font-weight: 500;">${location.type}</span>
              </div>
            `);

          const marker = new mapboxgl.Marker(el)
            .setLngLat([location.coordinates.lng, location.coordinates.lat])
            .setPopup(popup)
            .addTo(map.current!);

          el.addEventListener('click', () => {
            onLocationClick?.(location);
          });

          markersRef.current.push(marker);
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
  }, [accessToken, locations, onLocationClick]);

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
