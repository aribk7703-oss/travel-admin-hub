import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { Users, Award, MapPin, Calendar } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Travelers" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: MapPin, value: "100+", label: "Destinations" },
  { icon: Calendar, value: "500+", label: "Tours Completed" },
];

const AboutPage = () => {
  return (
    <WebsiteLayout>
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Your trusted travel partner for unforgettable journeys.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2009, TravelGo has been at the forefront of providing exceptional travel 
                experiences to thousands of satisfied customers. What started as a small local tour 
                operator has grown into a trusted name in the travel industry.
              </p>
              <p>
                Our team of passionate travel experts is dedicated to creating personalized itineraries 
                that cater to every traveler's unique preferences. Whether you're seeking adventure, 
                relaxation, or cultural immersion, we have the perfect journey waiting for you.
              </p>
              <p>
                We believe that travel is not just about visiting new places—it's about creating 
                memories that last a lifetime. That's why we go above and beyond to ensure every 
                aspect of your trip is carefully planned and flawlessly executed.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
              alt="Our team"
              className="rounded-lg shadow-card w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
              <p className="text-3xl font-bold">15+</p>
              <p className="text-sm opacity-80">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-lg border border-border text-center hover:shadow-card transition-shadow"
            >
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card p-8 rounded-lg border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              To provide exceptional travel experiences that inspire, educate, and create lasting 
              memories for our customers. We strive to make travel accessible, enjoyable, and 
              hassle-free for everyone.
            </p>
          </div>
          <div className="bg-card p-8 rounded-lg border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Our Values</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong className="text-foreground">Integrity:</strong> Honest and transparent dealings</li>
              <li>• <strong className="text-foreground">Quality:</strong> Excellence in every service</li>
              <li>• <strong className="text-foreground">Safety:</strong> Your well-being is our priority</li>
              <li>• <strong className="text-foreground">Innovation:</strong> Constantly improving experiences</li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 lg:p-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Choose TravelGo?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Expert Knowledge</h4>
              <p className="text-primary-foreground/80 text-sm">
                Our team has first-hand experience of all destinations we offer.
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Best Prices</h4>
              <p className="text-primary-foreground/80 text-sm">
                Competitive pricing with no hidden costs or surprise fees.
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">24/7 Support</h4>
              <p className="text-primary-foreground/80 text-sm">
                Round-the-clock assistance whenever you need us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
};

export default AboutPage;
