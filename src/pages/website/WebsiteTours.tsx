import { useState, useMemo } from "react";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { useTours } from "@/hooks/useTours";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Search } from "lucide-react";

const WebsiteTours = () => {
  const { tours } = useTours();
  const [searchQuery, setSearchQuery] = useState("");
  const [durationFilter, setDurationFilter] = useState("all");

  const activeTours = useMemo(() => {
    return tours
      .filter((tour) => tour.status === "active")
      .filter((tour) => {
        const matchesSearch =
          tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDuration =
          durationFilter === "all" ||
          (durationFilter === "half" && tour.duration.toLowerCase().includes("half")) ||
          (durationFilter === "full" && tour.duration.toLowerCase().includes("full")) ||
          (durationFilter === "multi" && !tour.duration.toLowerCase().includes("half") && !tour.duration.toLowerCase().includes("full"));

        return matchesSearch && matchesDuration;
      });
  }, [tours, searchQuery, durationFilter]);

  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Our Tour Packages
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Explore our carefully curated tour packages designed to give you the best travel experience across Maharashtra's heritage sites and natural wonders.
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
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="half">Half Day</SelectItem>
                <SelectItem value="full">Full Day</SelectItem>
                <SelectItem value="multi">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {activeTours.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No tours found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeTours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-primary">
                      {tour.price}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg text-foreground mb-2">{tour.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tour.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {tour.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {tour.duration}
                      </span>
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

export default WebsiteTours;
