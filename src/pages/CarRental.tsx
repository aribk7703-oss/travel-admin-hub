import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { CarCard } from "@/components/website/CarCard";
import { Car } from "lucide-react";

const cars = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop",
    model: "Toyota Innova Crysta",
    seats: 7,
    transmission: "Manual",
    fuel: "Diesel",
    pricePerDay: 3500,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&h=400&fit=crop",
    model: "Maruti Swift Dzire",
    seats: 5,
    transmission: "Auto",
    fuel: "Petrol",
    pricePerDay: 1800,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop",
    model: "Mahindra XUV500",
    seats: 7,
    transmission: "Manual",
    fuel: "Diesel",
    pricePerDay: 4000,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=600&h=400&fit=crop",
    model: "Honda City",
    seats: 5,
    transmission: "Auto",
    fuel: "Petrol",
    pricePerDay: 2500,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    model: "Toyota Fortuner",
    seats: 7,
    transmission: "Auto",
    fuel: "Diesel",
    pricePerDay: 6000,
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop",
    model: "Maruti Ertiga",
    seats: 7,
    transmission: "Manual",
    fuel: "CNG",
    pricePerDay: 2800,
  },
];

const CarRental = () => {
  return (
    <WebsiteLayout>
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Car Rental Services</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Choose from our wide range of well-maintained vehicles for a comfortable journey.
          </p>
        </div>
      </section>

      {/* Cars Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Car className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Available Vehicles</h2>
              <p className="text-sm text-muted-foreground">{cars.length} cars available</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-card p-8 rounded-lg border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">Rental Information</h3>
          <div className="grid md:grid-cols-3 gap-6 text-muted-foreground text-sm">
            <div>
              <h4 className="font-medium text-foreground mb-2">Documents Required</h4>
              <ul className="space-y-1">
                <li>• Valid Driving License</li>
                <li>• Government ID Proof</li>
                <li>• Address Proof</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Included in Rental</h4>
              <ul className="space-y-1">
                <li>• Unlimited Kilometers</li>
                <li>• 24/7 Roadside Assistance</li>
                <li>• Basic Insurance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Terms & Conditions</h4>
              <ul className="space-y-1">
                <li>• Minimum age: 21 years</li>
                <li>• Security deposit required</li>
                <li>• Fuel policy: Same to Same</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
};

export default CarRental;
