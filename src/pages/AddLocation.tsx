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
import { useLocations, Location } from "@/hooks/useLocations";
import { toast } from "sonner";
import { ArrowLeft, Save, MapPin, Image, Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface TripIdea {
  id: string;
  image: string;
  title: string;
  content: string;
}

interface GeneralInfo {
  id: string;
  title: string;
  desc: string;
  content: string;
}

const AddLocation = () => {
  const navigate = useNavigate();
  const { addLocation, locations } = useLocations();

  const [formData, setFormData] = useState({
    name: "",
    parent: "",
    description: "",
    bannerImage: "",
    lat: "",
    lng: "",
    address: "",
    type: "heritage" as Location["type"],
    status: "active" as Location["status"],
    featureImage: "",
    mapZoom: "8",
  });

  const [tripIdeas, setTripIdeas] = useState<TripIdea[]>([]);
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTripIdea = () => {
    setTripIdeas((prev) => [
      ...prev,
      { id: Date.now().toString(), image: "", title: "", content: "" },
    ]);
  };

  const removeTripIdea = (id: string) => {
    setTripIdeas((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTripIdea = (id: string, field: keyof TripIdea, value: string) => {
    setTripIdeas((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addGeneralInfoItem = () => {
    setGeneralInfo((prev) => [
      ...prev,
      { id: Date.now().toString(), title: "", desc: "", content: "" },
    ]);
  };

  const removeGeneralInfoItem = (id: string) => {
    setGeneralInfo((prev) => prev.filter((item) => item.id !== id));
  };

  const updateGeneralInfo = (
    id: string,
    field: keyof GeneralInfo,
    value: string
  ) => {
    setGeneralInfo((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter a location name");
      return;
    }

    const newLocation: Omit<Location, "id"> = {
      name: formData.name,
      description: formData.description,
      coordinates: {
        lat: parseFloat(formData.lat) || 0,
        lng: parseFloat(formData.lng) || 0,
      },
      address: formData.address,
      type: formData.type,
      status: formData.status,
      image: formData.featureImage || formData.bannerImage,
    };

    addLocation(newLocation);
    toast.success("Location added successfully!");
    navigate("/locations");
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
              onClick={() => navigate("/locations")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Add New Location
              </h1>
              <p className="text-muted-foreground">
                Create a new tour destination
              </p>
            </div>
          </div>
          <Button onClick={handleSubmit} className="gap-2">
            <Save className="h-4 w-4" />
            Save Location
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter location name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parent">Parent Location</Label>
                  <Select
                    value={formData.parent}
                    onValueChange={(value) =>
                      handleSelectChange("parent", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="-- Please Select --" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {locations.map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
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
                    placeholder="Enter detailed description about the location..."
                    rows={6}
                    className="resize-y"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Banner Image */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Banner Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bannerImage">Image URL</Label>
                    <Input
                      id="bannerImage"
                      name="bannerImage"
                      value={formData.bannerImage}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  {formData.bannerImage && (
                    <div className="mt-4">
                      <img
                        src={formData.bannerImage}
                        alt="Banner preview"
                        className="w-full max-w-xs h-32 object-cover rounded-lg border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Map Coordinates */}
            <Card>
              <CardHeader>
                <CardTitle>Geographic Coordinates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lat">Map Latitude</Label>
                    <Input
                      id="lat"
                      name="lat"
                      type="number"
                      step="any"
                      value={formData.lat}
                      onChange={handleInputChange}
                      placeholder="20.5519"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lng">Map Longitude</Label>
                    <Input
                      id="lng"
                      name="lng"
                      type="number"
                      step="any"
                      value={formData.lng}
                      onChange={handleInputChange}
                      placeholder="75.7033"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mapZoom">Map Zoom</Label>
                    <Input
                      id="mapZoom"
                      name="mapZoom"
                      type="number"
                      value={formData.mapZoom}
                      onChange={handleInputChange}
                      placeholder="8"
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Full address of the location"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Trip Ideas */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Trip Ideas</CardTitle>
                <Button variant="outline" size="sm" onClick={addTripIdea}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent>
                {tripIdeas.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No trip ideas added. Click "Add Item" to add one.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {tripIdeas.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-12 gap-4 items-start border-b pb-4"
                      >
                        <div className="col-span-3 space-y-2">
                          <Label>Image URL</Label>
                          <Input
                            value={item.image}
                            onChange={(e) =>
                              updateTripIdea(item.id, "image", e.target.value)
                            }
                            placeholder="Image URL"
                          />
                          {item.image && (
                            <img
                              src={item.image}
                              alt=""
                              className="w-full h-16 object-cover rounded"
                            />
                          )}
                        </div>
                        <div className="col-span-3 space-y-2">
                          <Label>Title/Link</Label>
                          <Input
                            value={item.title}
                            onChange={(e) =>
                              updateTripIdea(item.id, "title", e.target.value)
                            }
                            placeholder="Trip idea title"
                          />
                        </div>
                        <div className="col-span-5 space-y-2">
                          <Label>Content</Label>
                          <Textarea
                            value={item.content}
                            onChange={(e) =>
                              updateTripIdea(item.id, "content", e.target.value)
                            }
                            placeholder="Description"
                            rows={3}
                          />
                        </div>
                        <div className="col-span-1 pt-8">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeTripIdea(item.id)}
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

            {/* General Info */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>General Info</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addGeneralInfoItem}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent>
                {generalInfo.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No general info added. Click "Add Item" to add one.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {generalInfo.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-12 gap-4 items-start border-b pb-4"
                      >
                        <div className="col-span-3 space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={item.title}
                            onChange={(e) =>
                              updateGeneralInfo(item.id, "title", e.target.value)
                            }
                            placeholder="e.g., Time Zone"
                          />
                        </div>
                        <div className="col-span-4 space-y-2">
                          <Label>Description</Label>
                          <Input
                            value={item.desc}
                            onChange={(e) =>
                              updateGeneralInfo(item.id, "desc", e.target.value)
                            }
                            placeholder="e.g., IST (Indian Standard Time)"
                          />
                        </div>
                        <div className="col-span-4 space-y-2">
                          <Label>Content</Label>
                          <Input
                            value={item.content}
                            onChange={(e) =>
                              updateGeneralInfo(
                                item.id,
                                "content",
                                e.target.value
                              )
                            }
                            placeholder="e.g., UTC +05:30"
                          />
                        </div>
                        <div className="col-span-1 pt-8">
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeGeneralInfoItem(item.id)}
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
                      <SelectItem value="active">Publish</SelectItem>
                      <SelectItem value="inactive">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <Button onClick={handleSubmit} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Location Type */}
            <Card>
              <CardHeader>
                <CardTitle>Location Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heritage">Heritage</SelectItem>
                    <SelectItem value="temple">Temple</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="fort">Fort</SelectItem>
                    <SelectItem value="cave">Cave</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Feature Image */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  name="featureImage"
                  value={formData.featureImage}
                  onChange={handleInputChange}
                  placeholder="Feature image URL"
                />
                {formData.featureImage && (
                  <img
                    src={formData.featureImage}
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

export default AddLocation;
