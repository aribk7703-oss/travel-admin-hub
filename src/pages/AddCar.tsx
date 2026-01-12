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
import { useCars, Car } from "@/hooks/useCars";
import { toast } from "sonner";
import { ArrowLeft, Save, Car as CarIcon, Image, Plus, Trash2, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

interface VehicleFeature {
  id: string;
  name: string;
  enabled: boolean;
}

const defaultFeatures: VehicleFeature[] = [
  { id: "ac", name: "Air Conditioning", enabled: true },
  { id: "music", name: "Music System", enabled: true },
  { id: "gps", name: "GPS Navigation", enabled: false },
  { id: "wifi", name: "WiFi", enabled: false },
  { id: "charger", name: "Phone Charger", enabled: true },
  { id: "firstaid", name: "First Aid Kit", enabled: true },
  { id: "water", name: "Water Bottles", enabled: true },
  { id: "luggage", name: "Luggage Carrier", enabled: false },
];

const AddCar = () => {
  const navigate = useNavigate();
  const { addCar } = useCars();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    seats: "",
    feature: "",
    pricePerKm: "",
    status: "active" as Car["status"],
    image: "",
    description: "",
    fuelType: "",
    transmission: "",
    year: "",
    licensePlate: "",
    driverName: "",
    driverPhone: "",
  });

  const [features, setFeatures] = useState<VehicleFeature[]>(defaultFeatures);
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

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
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
      toast.error("Please enter a vehicle name");
      return;
    }

    if (!formData.type) {
      toast.error("Please select a vehicle type");
      return;
    }

    const enabledFeatures = features
      .filter((f) => f.enabled)
      .map((f) => f.name)
      .join(", ");

    const newCar: Omit<Car, "id"> = {
      name: formData.name,
      type: formData.type,
      seats: parseInt(formData.seats) || 4,
      feature: formData.feature || enabledFeatures || "AC, Music",
      pricePerKm: formData.pricePerKm ? `₹${formData.pricePerKm}/km` : "₹15/km",
      status: formData.status,
      image: formData.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400",
    };

    addCar(newCar);
    toast.success("Vehicle added successfully!");
    navigate("/cars");
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
              onClick={() => navigate("/cars")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Add New Vehicle
              </h1>
              <p className="text-muted-foreground">
                Add a new car to your fleet
              </p>
            </div>
          </div>
          <Button onClick={handleSubmit} className="gap-2">
            <Save className="h-4 w-4" />
            Save Vehicle
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CarIcon className="h-5 w-5" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Vehicle Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Executive Sedan"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Vehicle Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        handleSelectChange("type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Hatchback">Hatchback</SelectItem>
                        <SelectItem value="MUV">MUV</SelectItem>
                        <SelectItem value="Traveller">Tempo Traveller</SelectItem>
                        <SelectItem value="Bus">Bus / Coach</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Vehicle description and special notes..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="seats">Seating Capacity</Label>
                    <Input
                      id="seats"
                      name="seats"
                      type="number"
                      value={formData.seats}
                      onChange={handleInputChange}
                      placeholder="4"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Select
                      value={formData.fuelType}
                      onValueChange={(value) =>
                        handleSelectChange("fuelType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="CNG">CNG</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission</Label>
                    <Select
                      value={formData.transmission}
                      onValueChange={(value) =>
                        handleSelectChange("transmission", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="Automatic">Automatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      placeholder="2023"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">License Plate</Label>
                    <Input
                      id="licensePlate"
                      name="licensePlate"
                      value={formData.licensePlate}
                      onChange={handleInputChange}
                      placeholder="MH-20-AB-1234"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pricePerKm">Price per KM (₹)</Label>
                    <Input
                      id="pricePerKm"
                      name="pricePerKm"
                      type="number"
                      value={formData.pricePerKm}
                      onChange={handleInputChange}
                      placeholder="15"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feature">Highlight Feature</Label>
                    <Input
                      id="feature"
                      name="feature"
                      value={formData.feature}
                      onChange={handleInputChange}
                      placeholder="e.g., 3 Bags, Fully AC"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Vehicle Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {features.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={feature.id}
                        checked={feature.enabled}
                        onCheckedChange={() => toggleFeature(feature.id)}
                      />
                      <Label
                        htmlFor={feature.id}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {feature.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Driver Information */}
            <Card>
              <CardHeader>
                <CardTitle>Driver Information (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driverName">Driver Name</Label>
                    <Input
                      id="driverName"
                      name="driverName"
                      value={formData.driverName}
                      onChange={handleInputChange}
                      placeholder="Driver's full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driverPhone">Driver Phone</Label>
                    <Input
                      id="driverPhone"
                      name="driverPhone"
                      value={formData.driverPhone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
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
                    No gallery images. Click "Add Image" to add vehicle photos.
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <Button onClick={handleSubmit} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Vehicle
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

export default AddCar;
