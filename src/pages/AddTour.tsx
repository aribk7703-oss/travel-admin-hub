import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useTours, Tour } from "@/hooks/useTours";
import { useLocations } from "@/hooks/useLocations";
import { toast } from "sonner";
import { ArrowLeft, Save, Plane, Image, Plus, Trash2, Clock, IndianRupee } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Itinerary {
  id: string;
  day: string;
  title: string;
  description: string;
}

interface Inclusion {
  id: string;
  item: string;
  included: boolean;
}

const AddTour = () => {
  const navigate = useNavigate();
  const { addTour } = useTours();
  const { locations } = useLocations();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    duration: "",
    price: "",
    status: "active" as Tour["status"],
    image: "",
    category: "",
    maxGuests: "",
    minGuests: "",
    startTime: "",
    meetingPoint: "",
  });

  const [itinerary, setItinerary] = useState<Itinerary[]>([]);
  const [inclusions, setInclusions] = useState<Inclusion[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Itinerary management
  const addItineraryItem = () => {
    setItinerary((prev) => [
      ...prev,
      { id: Date.now().toString(), day: `Day ${prev.length + 1}`, title: "", description: "" },
    ]);
  };

  const removeItineraryItem = (id: string) => {
    setItinerary((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItinerary = (id: string, field: keyof Itinerary, value: string) => {
    setItinerary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Inclusions management
  const addInclusion = () => {
    setInclusions((prev) => [
      ...prev,
      { id: Date.now().toString(), item: "", included: true },
    ]);
  };

  const removeInclusion = (id: string) => {
    setInclusions((prev) => prev.filter((item) => item.id !== id));
  };

  const updateInclusion = (id: string, field: keyof Inclusion, value: string | boolean) => {
    setInclusions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Gallery management
  const addGalleryImage = () => {
    setGalleryImages((prev) => [...prev, ""]);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateGalleryImage = (index: number, value: string) => {
    setGalleryImages((prev) =>
      prev.map((img, i) => (i === index ? value : img))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter a tour name");
      return;
    }

    if (!formData.location) {
      toast.error("Please select a location");
      return;
    }

    const newTour: Omit<Tour, "id"> = {
      name: formData.name,
      description: formData.description,
      location: formData.location,
      duration: formData.duration || "Full Day",
      price: formData.price ? `₹${formData.price}` : "₹0",
      status: formData.status,
      image: formData.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400",
    };

    addTour(newTour);
    toast.success("Tour added successfully!");
    navigate("/tours");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/tours")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Add New Tour
              </h1>
              <p className="text-muted-foreground">
                Create a new tour package
              </p>
            </div>
          </div>
          <Button onClick={handleSubmit} className="gap-2">
            <Save className="h-4 w-4" />
            Save Tour
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tour Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Tour Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tour Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter tour name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) =>
                      handleSelectChange("location", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc.id} value={loc.name}>
                          {loc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed tour description..."
                    rows={6}
                    className="resize-y"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="heritage">Heritage & Culture</SelectItem>
                      <SelectItem value="spiritual">Spiritual & Pilgrimage</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="nature">Nature & Wildlife</SelectItem>
                      <SelectItem value="city">City Tours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Duration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5" />
                  Pricing & Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="2500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select
                      value={formData.duration}
                      onValueChange={(value) =>
                        handleSelectChange("duration", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2 Hours">2 Hours</SelectItem>
                        <SelectItem value="3 Hours">3 Hours</SelectItem>
                        <SelectItem value="Half Day">Half Day</SelectItem>
                        <SelectItem value="Full Day">Full Day</SelectItem>
                        <SelectItem value="2 Days">2 Days</SelectItem>
                        <SelectItem value="3 Days">3 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minGuests">Min Guests</Label>
                    <Input
                      id="minGuests"
                      name="minGuests"
                      type="number"
                      value={formData.minGuests}
                      onChange={handleInputChange}
                      placeholder="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxGuests">Max Guests</Label>
                    <Input
                      id="maxGuests"
                      name="maxGuests"
                      type="number"
                      value={formData.maxGuests}
                      onChange={handleInputChange}
                      placeholder="20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meetingPoint">Meeting Point</Label>
                    <Input
                      id="meetingPoint"
                      name="meetingPoint"
                      value={formData.meetingPoint}
                      onChange={handleInputChange}
                      placeholder="Hotel pickup / Bus station"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Itinerary
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addItineraryItem}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Day
                </Button>
              </CardHeader>
              <CardContent>
                {itinerary.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No itinerary added. Click "Add Day" to create tour schedule.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {itinerary.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-12 gap-4 items-start border-b pb-4"
                      >
                        <div className="col-span-2 space-y-2">
                          <Label>Day</Label>
                          <Input
                            value={item.day}
                            onChange={(e) =>
                              updateItinerary(item.id, "day", e.target.value)
                            }
                            placeholder="Day 1"
                          />
                        </div>
                        <div className="col-span-3 space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={item.title}
                            onChange={(e) =>
                              updateItinerary(item.id, "title", e.target.value)
                            }
                            placeholder="Activity title"
                          />
                        </div>
                        <div className="col-span-6 space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={item.description}
                            onChange={(e) =>
                              updateItinerary(item.id, "description", e.target.value)
                            }
                            placeholder="What happens on this day..."
                            rows={2}
                          />
                        </div>
                        <div className="col-span-1 pt-8">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeItineraryItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Inclusions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Inclusions & Exclusions</CardTitle>
                <Button variant="outline" size="sm" onClick={addInclusion}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent>
                {inclusions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No inclusions added. Click "Add Item" to specify what's included.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {inclusions.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4"
                      >
                        <Select
                          value={item.included ? "included" : "excluded"}
                          onValueChange={(value) =>
                            updateInclusion(item.id, "included", value === "included")
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="included">Included</SelectItem>
                            <SelectItem value="excluded">Excluded</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          value={item.item}
                          onChange={(e) =>
                            updateInclusion(item.id, "item", e.target.value)
                          }
                          placeholder="e.g., Lunch, Transport, Entry fees"
                          className="flex-1"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeInclusion(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Gallery Images
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addGalleryImage}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Image
                </Button>
              </CardHeader>
              <CardContent>
                {galleryImages.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No gallery images. Click "Add Image" to add tour photos.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((img, index) => (
                      <div key={index} className="space-y-2">
                        <Input
                          value={img}
                          onChange={(e) => updateGalleryImage(index, e.target.value)}
                          placeholder="Image URL"
                        />
                        {img && (
                          <div className="relative">
                            <img
                              src={img}
                              alt=""
                              className="w-full h-24 object-cover rounded"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6"
                              onClick={() => removeGalleryImage(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Status */}
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Published</SelectItem>
                      <SelectItem value="inactive">Draft</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <Button onClick={handleSubmit} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Tour
                </Button>
              </CardContent>
            </Card>

            {/* Feature Image */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Feature image URL"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Feature preview"
                    className="w-full h-40 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddTour;
