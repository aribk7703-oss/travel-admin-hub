import { WebsiteLayout } from "@/components/website/WebsiteLayout";
import { Users, Target, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To provide exceptional travel experiences that create lasting memories and inspire exploration of the world's most beautiful destinations."
  },
  {
    icon: Heart,
    title: "Our Passion",
    description: "We are passionate about connecting people with unique cultures, breathtaking landscapes, and unforgettable adventures."
  },
  {
    icon: Award,
    title: "Our Commitment",
    description: "We are committed to delivering quality service, safety, and satisfaction in every journey we organize."
  },
  {
    icon: Users,
    title: "Our Team",
    description: "Our experienced team of travel experts works tirelessly to ensure your trip exceeds expectations."
  }
];

const WebsiteAbout = () => {
  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover who we are and why thousands of travelers trust us for their adventures
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded with a simple vision – to make travel accessible, enjoyable, and memorable 
                  for everyone. What started as a small local tour company has grown into a trusted 
                  name in travel services.
                </p>
                <p>
                  Over the years, we have helped thousands of travelers explore incredible destinations, 
                  from historic heritage sites to serene natural wonders. Our deep knowledge of local 
                  culture and hidden gems sets us apart.
                </p>
                <p>
                  Today, we continue to innovate and expand our offerings while staying true to our 
                  core values of quality, authenticity, and customer satisfaction.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-2xl aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <Users className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground">10+ Years of Excellence</p>
                <p className="text-muted-foreground">Serving happy travelers since 2014</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            What Drives Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary mb-2">500+</p>
              <p className="text-muted-foreground">Tours Completed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">10K+</p>
              <p className="text-muted-foreground">Happy Travelers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-muted-foreground">Destinations</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">4.9</p>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};

export default WebsiteAbout;
