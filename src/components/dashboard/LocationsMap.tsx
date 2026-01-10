import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from '@/hooks/useLocations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Key } from 'lucide-react';

interface LocationsMapProps {
  locations: Location[];
  onLocationClick?: (location: Location) => void;
}

const MAPBOX_TOKEN_KEY = 'mapbox_public_token';

const LocationsMap: React.FC<LocationsMapProps> = ({ locations, onLocationClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  
  const [accessToken, setAccessToken] = useState(() => 
    localStorage.getItem(MAPBOX_TOKEN_KEY) || ''
  );
  const [tokenInput, setTokenInput] = useState('');
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
    map.current = null;
  };

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
          const el = document.createElement('div');
          el.className = 'location-marker';
          el.style.cssText = `
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.8) 100%);
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
                <span style="display: inline-block; margin-top: 8px; padding: 2px 8px; background: #f0f0f0; border-radius: 12px; font-size: 11px; text-transform: capitalize;">${location.type}</span>
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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Map
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={clearToken}>
            Change Token
          </Button>
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
