import { useState, useMemo } from "react";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { TourCard } from "@/components/website/TourCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const allTours = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop",
    name: "Taj Mahal Sunrise Tour",
    location: "Agra",
    duration: "1 Day",
    price: 2500,
    rating: 4.9,
    featured: true,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop",
    name: "Kerala Backwaters",
    location: "Kerala",
    duration: "3 Days",
    price: 12000,
    rating: 4.8,
    featured: true,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    name: "Himalayan Adventure",
    location: "Himachal",
    duration: "5 Days",
    price: 18000,
    rating: 4.7,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop",
    name: "Goa Beach Paradise",
    location: "Goa",
    duration: "4 Days",
    price: 15000,
    rating: 4.6,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop",
    name: "Rajasthan Royal Tour",
    location: "Rajasthan",
    duration: "7 Days",
    price: 35000,
    rating: 4.9,
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=600&h=400&fit=crop",
    name: "Varanasi Spiritual Journey",
    location: "Varanasi",
    duration: "2 Days",
    price: 5000,
    rating: 4.5,
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=600&h=400&fit=crop",
    name: "Andaman Islands Escape",
    location: "Andaman",
    duration: "6 Days",
    price: 45000,
    rating: 4.8,
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
    name: "Ladakh Bike Adventure",
    location: "Ladakh",
    duration: "10 Days",
    price: 55000,
    rating: 4.9,
  },
];

const locations = ["All", "Agra", "Kerala", "Himachal", "Goa", "Rajasthan", "Varanasi", "Andaman", "Ladakh"];
const durations = ["All", "1 Day", "2 Days", "3 Days", "4 Days", "5 Days", "6 Days", "7 Days", "10 Days"];

const ToursListing = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [duration, setDuration] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTours = useMemo(() => {
    return allTours.filter((tour) => {
      const matchesSearch = tour.name.toLowerCase().includes(search.toLowerCase()) ||
                           tour.location.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = location === "All" || tour.location === location;
      const matchesDuration = duration === "All" || tour.duration === duration;
      const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1];
      
      return matchesSearch && matchesLocation && matchesDuration && matchesPrice;
    });
  }, [search, location, duration, priceRange]);

  return (
    <WebsiteLayout>
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Explore Our Tours</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Discover amazing destinations and book your next adventure with us.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="lg:hidden">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <aside className={`lg:w-72 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-card p-6 rounded-lg border border-border sticky top-24">
              <h3 className="font-semibold text-lg mb-6 text-foreground">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tours..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((dur) => (
                      <SelectItem key={dur} value={dur}>{dur}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-4 block">
                  Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={60000}
                  step={1000}
                  className="mt-2"
                />
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearch("");
                  setLocation("All");
                  setDuration("All");
                  setPriceRange([0, 60000]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Tours Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredTours.length} tour{filteredTours.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} {...tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-lg border border-border">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Tours Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
};

export default ToursListing;
