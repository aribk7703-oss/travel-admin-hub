import { Users, Fuel, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CarCardProps {
  id: string;
  image: string;
  model: string;
  seats: number;
  transmission: string;
  fuel: string;
  pricePerDay: number;
}

export const CarCard = ({
  id,
  image,
  model,
  seats,
  transmission,
  fuel,
  pricePerDay,
}: CarCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-card-hover transition-all duration-300">
      <div className="relative overflow-hidden bg-secondary/50 p-4">
        <img
          src={image}
          alt={model}
          className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {model}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{seats} Seats</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            <span>{fuel}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Per Day</span>
            <p className="text-lg font-bold text-primary">₹{pricePerDay.toLocaleString()}</p>
          </div>
          <Link to={`/booking?type=car&id=${id}`}>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Book Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
