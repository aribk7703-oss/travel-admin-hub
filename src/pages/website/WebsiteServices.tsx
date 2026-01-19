import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { Car, Compass, Map, Camera, Shield, Clock, Headphones, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Compass,
    title: "Guided Tours",
    description: "Expert-led tours to historical sites, natural wonders, and cultural hotspots with comprehensive itineraries.",
    features: ["Professional guides", "All-inclusive packages", "Small group sizes"]
  },
  {
    icon: Car,
    title: "Car Rentals",
    description: "Premium fleet of well-maintained vehicles for self-drive adventures or chauffeur-driven comfort.",
    features: ["Wide vehicle selection", "24/7 roadside assistance", "Flexible rental periods"]
  },
  {
    icon: Map,
    title: "Custom Itineraries",
    description: "Personalized travel plans tailored to your interests, schedule, and budget for a unique experience.",
    features: ["Personalized planning", "Local expertise", "Flexible modifications"]
  },
  {
    icon: Camera,
    title: "Photography Tours",
    description: "Specialized tours designed for photography enthusiasts to capture stunning moments and landscapes.",
    features: ["Scenic locations", "Golden hour timing", "Expert tips"]
  }
];

const benefits = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your safety is our priority with verified drivers, insured vehicles, and 24/7 support."
  },
  {
    icon: Clock,
    title: "Time-Saving",
    description: "Pre-planned itineraries and seamless logistics so you can focus on enjoying your trip."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you before, during, and after your journey."
  },
  {
    icon: CreditCard,
    title: "Best Prices",
    description: "Competitive pricing with transparent costs and no hidden fees for all our services."
  }
];

const WebsiteServices = () => {
  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive travel solutions designed to make your journey seamless and memorable
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border shadow-md hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 bg-card shadow-md text-center">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Contact us today to discuss your travel plans and let us help you create unforgettable memories.
            </p>
            <a
              href="/website/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-foreground text-primary font-medium rounded-lg hover:bg-primary-foreground/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default WebsiteServices;
