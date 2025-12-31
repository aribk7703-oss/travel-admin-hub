import { Link } from "react-router-dom";
import { MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TourCardProps {
  id: string;
  image: string;
  name: string;
  location: string;
  duration: string;
  price: number;
  rating?: number;
  featured?: boolean;
}

export const TourCard = ({
  id,
  image,
  name,
  location,
  duration,
  price,
  rating = 4.5,
  featured = false,
}: TourCardProps) => {
  return (
    <Card className="group overflow-hidden border-border hover:shadow-card-hover transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {featured && (
          <span className="absolute top-3 left-3 bg-warning text-warning-foreground text-xs font-semibold px-2 py-1 rounded">
            Featured
          </span>
        )}
        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
          <Star className="h-3 w-3 fill-warning text-warning" />
          {rating}
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <p className="text-lg font-bold text-primary">₹{price.toLocaleString()}</p>
          </div>
          <Link to={`/tour/${id}`}>
            <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
