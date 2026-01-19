import { useState, useMemo } from "react";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { useCars } from "@/hooks/useCars";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Briefcase } from "lucide-react";

const WebsiteFleet = () => {
  const { cars } = useCars();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const activeCars = useMemo(() => {
    return cars
      .filter((car) => car.status === "active")
      .filter((car) => {
        const matchesSearch =
          car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.feature.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = typeFilter === "all" || car.type === typeFilter;

        return matchesSearch && matchesType;
      });
  }, [cars, searchQuery, typeFilter]);

  const carTypes = useMemo(() => {
    const types = new Set(cars.map((car) => car.type));
    return Array.from(types);
  }, [cars]);

  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Our Fleet
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Choose from our wide range of well-maintained vehicles. From budget-friendly options to premium luxury, we have the perfect ride for every journey.
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
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Vehicle Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {carTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {activeCars.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No vehicles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeCars.map((car) => (
                <Card key={car.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3" variant="secondary">
                      {car.type}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg text-foreground mb-3">{car.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {car.seats} Seats
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {car.feature}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{car.pricePerKm}</span>
                      <Badge variant="outline" className="text-xs">
                        Available Now
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Professional Drivers</h3>
              <p className="text-sm text-muted-foreground">
                All our vehicles come with experienced, courteous drivers who know the local routes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Well Maintained</h3>
              <p className="text-sm text-muted-foreground">
                Regular servicing and maintenance ensures a safe and comfortable journey.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Transparent Pricing</h3>
              <p className="text-sm text-muted-foreground">
                No hidden charges. What you see is what you pay.
              </p>
            </div>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default WebsiteFleet;
