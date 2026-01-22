import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { useTours } from "@/hooks/useTours";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TourBookingDialog from "@/components/dashboard/TourBookingDialog";
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  Calendar, 
  Users, 
  Camera, 
  ChevronRight,
  Star,
  CheckCircle,
  Phone,
  ArrowLeft
} from "lucide-react";

const WebsiteTourDetail = () => {
  const { id } = useParams();
  const { tours, getTourById } = useTours();
  const [bookingOpen, setBookingOpen] = useState(false);

  const tour = getTourById(Number(id));
  
  // Get related tours (same category or location)
  const relatedTours = tours
    .filter(t => t.id !== tour?.id && t.status === "active")
    .slice(0, 3);

  if (!tour) {
    return (
      <WebsiteLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Tour Not Found</h1>
          <p className="text-muted-foreground mb-8">The tour you're looking for doesn't exist.</p>
          <Link to="/website/tours">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tours
            </Button>
          </Link>
        </div>
      </WebsiteLayout>
    );
  }

  const highlights = [
    "Professional English-speaking guide",
    "Air-conditioned vehicle",
    "All entrance fees included",
    "Complimentary water bottles",
    "Hotel pickup and drop-off",
    "Flexible cancellation policy"
  ];

  const itinerary = [
    { time: "06:00 AM", activity: "Pick-up from your hotel/location" },
    { time: "08:30 AM", activity: `Arrive at ${tour.name.split(' ')[0]}` },
    { time: "09:00 AM", activity: "Guided tour begins" },
    { time: "12:30 PM", activity: "Lunch break at local restaurant" },
    { time: "02:00 PM", activity: "Continue exploration" },
    { time: "05:00 PM", activity: "Departure for return journey" },
    { time: "07:30 PM", activity: "Drop-off at your location" }
  ];

  return (
    <WebsiteLayout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/website" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/website/tours" className="hover:text-primary transition-colors">Tours</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{tour.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="aspect-[21/9] w-full overflow-hidden">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <Badge className="bg-primary mb-4">{tour.duration}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{tour.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {tour.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {tour.duration}
              </span>
              <span className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                4.8 (120+ reviews)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Tour Overview</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {tour.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Experience the magnificence of {tour.name} with our expertly guided tour. 
                    This journey takes you through centuries of history, art, and culture. 
                    Our knowledgeable guides will share fascinating stories and insights about 
                    the architectural marvels and historical significance of each site.
                  </p>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Tour Highlights</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Itinerary */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Sample Itinerary</h2>
                  <div className="space-y-4">
                    {itinerary.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          {index < itinerary.length - 1 && (
                            <div className="w-0.5 h-full bg-border mt-1" />
                          )}
                        </div>
                        <div className="pb-4">
                          <p className="font-semibold text-foreground">{item.time}</p>
                          <p className="text-muted-foreground">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* What to Bring */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-foreground mb-4">What to Bring</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Comfortable walking shoes",
                      "Sun protection (hat, sunscreen)",
                      "Camera",
                      "Valid ID proof",
                      "Light snacks if needed",
                      "Reusable water bottle"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Camera className="h-5 w-5 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-2 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-3xl font-bold text-primary">{tour.price}</span>
                      <span className="text-muted-foreground">/ person</span>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>Duration: {tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>Location: {tour.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Users className="h-5 w-5 text-primary" />
                        <span>Group Size: 1-10 persons</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span>Available: Daily</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full mb-3" 
                      size="lg"
                      onClick={() => setBookingOpen(true)}
                    >
                      Book This Tour
                    </Button>

                    <Button variant="outline" className="w-full" size="lg" asChild>
                      <a href="tel:+919876543210">
                        <Phone className="h-4 w-4 mr-2" />
                        Call to Inquire
                      </a>
                    </Button>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Free cancellation up to 24 hours before
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedTours.map((relatedTour) => (
                <Link key={relatedTour.id} to={`/website/tours/${relatedTour.id}`}>
                  <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={relatedTour.image}
                        alt={relatedTour.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-primary">
                        {relatedTour.price}
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-lg text-foreground mb-2">{relatedTour.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {relatedTour.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {relatedTour.duration}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Dialog */}
      <TourBookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        tour={tour}
      />
    </WebsiteLayout>
  );
};

export default WebsiteTourDetail;
