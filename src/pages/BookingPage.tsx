import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: searchParams.get("type") || "tour",
    tourOrCar: searchParams.get("tour") || searchParams.get("id") || "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: "Inquiry Submitted!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  if (isSubmitted) {
    return (
      <WebsiteLayout>
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Thank You!</h1>
            <p className="text-muted-foreground mb-8">
              Your inquiry has been submitted successfully. Our team will contact you within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>Submit Another Inquiry</Button>
          </div>
        </div>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout>
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Book Your Trip</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Fill out the form below and our team will get back to you with the best options.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Inquiry Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service Type</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tour">Tour Booking</SelectItem>
                    <SelectItem value="car">Car Rental</SelectItem>
                    <SelectItem value="package">Travel Package</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your travel plans, preferred dates, number of travelers, etc."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Submit Inquiry
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-center text-muted-foreground">
            <p className="mb-2">Need immediate assistance?</p>
            <p>
              Call us at <a href="tel:+1234567890" className="text-primary font-medium">+1 234 567 8900</a> or 
              WhatsApp at <a href="https://wa.me/1234567890" className="text-primary font-medium">+1 234 567 8900</a>
            </p>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
};

export default BookingPage;
