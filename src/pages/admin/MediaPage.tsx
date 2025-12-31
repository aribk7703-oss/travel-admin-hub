import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Upload, Image, Trash2 } from "lucide-react";

const mediaItems = [
  { id: 1, name: "beach-resort.jpg", type: "Image", size: "2.4 MB", date: "2024-01-15" },
  { id: 2, name: "mountain-tour.jpg", type: "Image", size: "1.8 MB", date: "2024-01-14" },
  { id: 3, name: "city-view.jpg", type: "Image", size: "3.2 MB", date: "2024-01-13" },
  { id: 4, name: "desert-safari.jpg", type: "Image", size: "2.1 MB", date: "2024-01-12" },
  { id: 5, name: "cruise-ship.jpg", type: "Image", size: "2.8 MB", date: "2024-01-11" },
  { id: 6, name: "hotel-room.jpg", type: "Image", size: "1.5 MB", date: "2024-01-10" },
];

const MediaPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search media..." className="pl-10" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {mediaItems.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden group">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <Image className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.size}</p>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="destructive" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MediaPage;
