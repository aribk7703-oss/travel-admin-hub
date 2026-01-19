import { useState, useMemo } from "react";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { useLocations } from "@/hooks/useLocations";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search } from "lucide-react";

const WebsiteDestinations = () => {
  const { locations } = useLocations();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const activeLocations = useMemo(() => {
    return locations
      .filter((location) => location.status === "active")
      .filter((location) => {
        const matchesSearch =
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.address.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = typeFilter === "all" || location.type === typeFilter;

        return matchesSearch && matchesType;
      });
  }, [locations, searchQuery, typeFilter]);

  const locationTypes = ["cave", "temple", "heritage", "fort", "city"];

  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Explore Destinations
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Discover the rich cultural heritage and natural beauty of Maharashtra. From ancient caves to majestic forts, explore destinations that tell stories of centuries past.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {locationTypes.map((type) => (
                  <SelectItem key={type} value={type} className="capitalize">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {activeLocations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No destinations found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {activeLocations.map((location) => (
                <Card key={location.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 capitalize" variant="secondary">
                      {location.type}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{location.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{location.description}</p>
                    <div className="flex items-start gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{location.address}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default WebsiteDestinations;
