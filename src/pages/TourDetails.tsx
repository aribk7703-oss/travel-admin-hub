import { useParams, Link } from "react-router-dom";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  Star, 
  Calendar, 
  Users, 
  Check, 
  X, 
  MessageCircle,
  FileText,
  ChevronLeft
} from "lucide-react";

const tourData: Record<string, any> = {
  "1": {
    id: "1",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=600&fit=crop",
    name: "Taj Mahal Sunrise Tour",
    location: "Agra, Uttar Pradesh",
    duration: "1 Day",
    price: 2500,
    rating: 4.9,
    reviews: 256,
    groupSize: "2-15 people",
    description: "Experience the magical beauty of the Taj Mahal at sunrise, when the marble monument glows in the golden morning light. This iconic UNESCO World Heritage Site is one of the most recognized structures in the world and a symbol of eternal love. Our expert guide will share fascinating stories about its history, architecture, and the love story behind its creation.",
    highlights: [
      "Witness the stunning sunrise at Taj Mahal",
      "Expert English-speaking guide",
      "Skip-the-line entry tickets",
      "Photo opportunities at the best spots",
      "Visit to Agra Fort included",
    ],
    itinerary: [
      { time: "5:00 AM", activity: "Pickup from your hotel in Agra" },
      { time: "5:30 AM", activity: "Arrive at Taj Mahal east gate" },
      { time: "6:00 AM", activity: "Enter Taj Mahal for sunrise viewing" },
      { time: "8:30 AM", activity: "Guided tour of Taj Mahal complex" },
      { time: "10:00 AM", activity: "Visit Agra Fort" },
      { time: "12:00 PM", activity: "Drop back at hotel" },
    ],
    included: [
      "Hotel pickup and drop-off",
      "All entry tickets",
      "Professional English-speaking guide",
      "Bottled water",
      "All taxes and fees",
    ],
    excluded: [
      "Meals and snacks",
      "Tips and gratuities",
      "Personal expenses",
      "Camera fees (if applicable)",
    ],
  },
  "2": {
    id: "2",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&h=600&fit=crop",
    name: "Kerala Backwaters",
    location: "Alleppey, Kerala",
    duration: "3 Days",
    price: 12000,
    rating: 4.8,
    reviews: 189,
    groupSize: "2-8 people",
    description: "Immerse yourself in the serene beauty of Kerala's famous backwaters. Cruise through palm-fringed canals on a traditional houseboat, witness local village life, and experience the unique ecosystem of this tropical paradise. This 3-day journey offers the perfect blend of relaxation and cultural exploration.",
    highlights: [
      "Overnight stay on a traditional houseboat",
      "Authentic Kerala cuisine on board",
      "Village walks and local experiences",
      "Canoeing through narrow canals",
      "Beautiful sunset views",
    ],
    itinerary: [
      { time: "Day 1", activity: "Arrive in Alleppey, board houseboat, cruise and overnight stay" },
      { time: "Day 2", activity: "Morning cruise, village visit, canoeing, evening at houseboat" },
      { time: "Day 3", activity: "Sunrise views, breakfast, disembark and departure" },
    ],
    included: [
      "All meals on houseboat",
      "Houseboat accommodation",
      "Canoeing experience",
      "Village tour",
      "All taxes and fees",
    ],
    excluded: [
      "Transport to/from Alleppey",
      "Personal expenses",
      "Tips and gratuities",
      "Travel insurance",
    ],
  },
};

const TourDetails = () => {
  const { id } = useParams();
  const tour = tourData[id || "1"] || tourData["1"];

  const handleWhatsAppBooking = () => {
    const message = encodeURIComponent(`Hi, I'm interested in booking the "${tour.name}" tour. Please provide more details.`);
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank");
  };

  return (
    <WebsiteLayout>
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/tours-listing" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Tours
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] lg:h-[500px]">
        <img
          src={tour.image}
          alt={tour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Badge className="mb-4 bg-primary text-primary-foreground">Featured Tour</Badge>
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">{tour.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {tour.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {tour.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {tour.groupSize}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                {tour.rating} ({tour.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">About This Tour</h2>
              <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
            </section>

            {/* Highlights */}
            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Tour Highlights</h2>
              <ul className="space-y-3">
                {tour.highlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item: { time: string; activity: string }, index: number) => (
                  <div key={index} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="shrink-0">
                      <span className="inline-flex items-center justify-center h-10 w-20 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {item.time}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Included / Excluded */}
            <div className="grid md:grid-cols-2 gap-6">
              <section className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Check className="h-5 w-5 text-success" />
                  What's Included
                </h2>
                <ul className="space-y-2">
                  {tour.included.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <X className="h-5 w-5 text-destructive" />
                  What's Excluded
                </h2>
                <ul className="space-y-2">
                  {tour.excluded.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg border border-border sticky top-24 space-y-6">
              <div>
                <span className="text-sm text-muted-foreground">Starting from</span>
                <p className="text-3xl font-bold text-primary">₹{tour.price.toLocaleString()}</p>
                <span className="text-sm text-muted-foreground">per person</span>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-success hover:bg-success/90"
                  onClick={handleWhatsAppBooking}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Book via WhatsApp
                </Button>
                
                <Link to={`/booking?tour=${tour.id}`} className="block">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Inquiry Form
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-border space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Free cancellation up to 24 hours before</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Group size: {tour.groupSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
};

export default TourDetails;
