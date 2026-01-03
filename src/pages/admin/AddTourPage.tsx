import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Upload, Plus, Trash2, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ItineraryDay {
  id: string;
  day: number;
  title: string;
  description: string;
  meals: string;
  accommodation: string;
}

const categories = ["Cultural", "Nature", "Adventure", "Beach", "Spiritual", "Wildlife", "Honeymoon"];
const locations = ["Jaipur", "Kerala", "Goa", "Manali", "Varanasi", "Mumbai", "Delhi", "Agra", "Udaipur"];

const AddTourPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    location: "",
    category: "",
    price: "",
    discountPrice: "",
    duration: "",
    groupSize: "",
    difficulty: "Easy",
    overview: "",
    highlights: "",
    inclusions: "",
    exclusions: "",
    status: "draft",
    featured: false,
    metaTitle: "",
    metaDescription: "",
  });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { id: "1", day: 1, title: "", description: "", meals: "", accommodation: "" },
  ]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "name" && typeof value === "string"
        ? { slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }
        : {}),
    }));
  };

  const addItineraryDay = () => {
    const newDay: ItineraryDay = {
      id: Date.now().toString(),
      day: itinerary.length + 1,
      title: "",
      description: "",
      meals: "",
      accommodation: "",
    };
    setItinerary([...itinerary, newDay]);
  };

  const updateItineraryDay = (id: string, field: keyof ItineraryDay, value: string | number) => {
    setItinerary(
      itinerary.map((day) => (day.id === id ? { ...day, [field]: value } : day))
    );
  };

  const removeItineraryDay = (id: string) => {
    if (itinerary.length > 1) {
      const updated = itinerary.filter((day) => day.id !== id);
      setItinerary(updated.map((day, index) => ({ ...day, day: index + 1 })));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.category || !formData.price) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would be an API call
    toast({
      title: "Tour Created",
      description: `"${formData.name}" has been created successfully.`,
    });
    
    navigate("/admin/tours");
  };

  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/tours")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Add New Tour</h1>
              <p className="text-muted-foreground">Create a new tour package</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/tours")}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Save Tour
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Details</TabsTrigger>
            <TabsTrigger value="media">Images</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tour Information</CardTitle>
                <CardDescription>Enter the basic details of your tour package.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tour Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g., Explore Jaipur Heritage"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange("slug", e.target.value)}
                      placeholder="explore-jaipur-heritage"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => handleInputChange("location", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      placeholder="e.g., 3 Days / 2 Nights"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groupSize">Group Size</Label>
                    <Input
                      id="groupSize"
                      value={formData.groupSize}
                      onChange={(e) => handleInputChange("groupSize", e.target.value)}
                      placeholder="e.g., 2-15 people"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => handleInputChange("difficulty", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Challenging">Challenging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overview">Tour Overview</Label>
                  <Textarea
                    id="overview"
                    value={formData.overview}
                    onChange={(e) => handleInputChange("overview", e.target.value)}
                    placeholder="Write a detailed overview of the tour..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highlights">Highlights (one per line)</Label>
                  <Textarea
                    id="highlights"
                    value={formData.highlights}
                    onChange={(e) => handleInputChange("highlights", e.target.value)}
                    placeholder="Visit Amber Fort&#10;Explore Hawa Mahal&#10;Traditional Rajasthani dinner"
                    rows={4}
                  />
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange("featured", checked)}
                    />
                    <Label htmlFor="featured">Featured Tour</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="status">Status:</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleInputChange("status", value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Day-wise Itinerary</CardTitle>
                  <CardDescription>Plan the tour schedule day by day.</CardDescription>
                </div>
                <Button type="button" onClick={addItineraryDay} variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Day
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {itinerary.map((day) => (
                  <div
                    key={day.id}
                    className="border border-border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                        <span className="font-semibold text-primary">Day {day.day}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItineraryDay(day.id)}
                        disabled={itinerary.length === 1}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Day Title</Label>
                        <Input
                          value={day.title}
                          onChange={(e) => updateItineraryDay(day.id, "title", e.target.value)}
                          placeholder="e.g., Arrival & City Tour"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Meals Included</Label>
                        <Input
                          value={day.meals}
                          onChange={(e) => updateItineraryDay(day.id, "meals", e.target.value)}
                          placeholder="e.g., Breakfast, Lunch, Dinner"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={day.description}
                        onChange={(e) => updateItineraryDay(day.id, "description", e.target.value)}
                        placeholder="Describe the day's activities..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Accommodation</Label>
                      <Input
                        value={day.accommodation}
                        onChange={(e) => updateItineraryDay(day.id, "accommodation", e.target.value)}
                        placeholder="e.g., 4-Star Hotel in City Center"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>Set tour pricing details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Regular Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="15000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountPrice">Discounted Price (₹)</Label>
                    <Input
                      id="discountPrice"
                      type="number"
                      value={formData.discountPrice}
                      onChange={(e) => handleInputChange("discountPrice", e.target.value)}
                      placeholder="12000"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inclusions & Exclusions</CardTitle>
                  <CardDescription>What's included and not included.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="inclusions">Inclusions (one per line)</Label>
                    <Textarea
                      id="inclusions"
                      value={formData.inclusions}
                      onChange={(e) => handleInputChange("inclusions", e.target.value)}
                      placeholder="Hotel accommodation&#10;Daily breakfast&#10;Airport transfers&#10;Sightseeing as per itinerary"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exclusions">Exclusions (one per line)</Label>
                    <Textarea
                      id="exclusions"
                      value={formData.exclusions}
                      onChange={(e) => handleInputChange("exclusions", e.target.value)}
                      placeholder="Airfare&#10;Personal expenses&#10;Travel insurance&#10;Tips and gratuities"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tour Images</CardTitle>
                <CardDescription>Upload images for the tour gallery.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop images here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    PNG, JPG up to 5MB each. First image will be the featured image.
                  </p>
                  <Button type="button" variant="outline">
                    Select Images
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize your tour for search engines.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                    placeholder="Explore Jaipur Heritage Tour | Green Cab Tours"
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended: 50-60 characters
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                    placeholder="Discover the rich heritage of Jaipur with our 3-day guided tour. Visit Amber Fort, Hawa Mahal, and more. Book now!"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended: 150-160 characters
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </DashboardLayout>
  );
};

export default AddTourPage;
