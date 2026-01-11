import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tour } from '@/hooks/useTours';
import { CalendarIcon, Users, MapPin, Clock, Check } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface TourBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: Tour | null;
}

interface BookingFormData {
  customerName: string;
  email: string;
  phone: string;
  date: Date | undefined;
  guests: string;
  specialRequests: string;
}

const TourBookingDialog: React.FC<TourBookingDialogProps> = ({ open, onOpenChange, tour }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    email: '',
    phone: '',
    date: undefined,
    guests: '2',
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.email || !formData.phone || !formData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate booking submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setBookingSuccess(true);
    
    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${tour?.name} on ${format(formData.date, 'PPP')} has been confirmed.`,
    });

    // Reset after showing success
    setTimeout(() => {
      setBookingSuccess(false);
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        date: undefined,
        guests: '2',
        specialRequests: '',
      });
      onOpenChange(false);
    }, 2000);
  };

  if (!tour) return null;

  if (bookingSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Booking Confirmed!</h3>
            <p className="text-muted-foreground">
              We've sent a confirmation email to {formData.email}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Tour</DialogTitle>
          <DialogDescription>
            Complete the form below to book your tour experience.
          </DialogDescription>
        </DialogHeader>

        {/* Tour Summary */}
        <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-24 h-16 object-cover rounded-md"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground truncate">{tour.name}</h4>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {tour.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {tour.duration}
              </span>
            </div>
            <p className="text-lg font-bold text-primary mt-1">{tour.price}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Name */}
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              placeholder="Enter your full name"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Date and Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tour Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData({ ...formData, date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Select
                value={formData.guests}
                onValueChange={(value) => setFormData({ ...formData, guests: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              placeholder="Any dietary requirements, accessibility needs, or other requests..."
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              rows={3}
            />
          </div>

          {/* Price Summary */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tour Price (per person)</span>
              <span>{tour.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Guests</span>
              <span>x {formData.guests}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-primary">
                ₹{(parseInt(tour.price.replace(/[₹,]/g, '')) * parseInt(formData.guests)).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TourBookingDialog;
