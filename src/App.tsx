import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Cars from "./pages/Cars";
import Tours from "./pages/Tours";
import Locations from "./pages/Locations";
import AddLocation from "./pages/AddLocation";
import AddTour from "./pages/AddTour";
import AddCar from "./pages/AddCar";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import WebsiteHome from "./pages/website/WebsiteHome";
import WebsiteAbout from "./pages/website/WebsiteAbout";
import WebsiteServices from "./pages/website/WebsiteServices";
import WebsiteTours from "./pages/website/WebsiteTours";
import WebsiteDestinations from "./pages/website/WebsiteDestinations";
import WebsiteFleet from "./pages/website/WebsiteFleet";
import WebsiteContact from "./pages/website/WebsiteContact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/add" element={<AddCar />} />
          <Route path="/cars/edit/:id" element={<AddCar />} />
          <Route path="/cars/categories" element={<Navigate to="/categories?type=car" replace />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/add" element={<AddTour />} />
          <Route path="/tours/edit/:id" element={<AddTour />} />
          <Route path="/tours/categories" element={<Navigate to="/categories?type=tour" replace />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/add" element={<AddLocation />} />
          <Route path="/locations/edit/:id" element={<AddLocation />} />
          <Route path="/locations/categories" element={<Navigate to="/categories?type=location" replace />} />
          <Route path="/categories" element={<Categories />} />
          {/* Public Website Routes */}
          <Route path="/website" element={<WebsiteHome />} />
          <Route path="/website/about" element={<WebsiteAbout />} />
          <Route path="/website/services" element={<WebsiteServices />} />
          <Route path="/website/tours" element={<WebsiteTours />} />
          <Route path="/website/destinations" element={<WebsiteDestinations />} />
          <Route path="/website/fleet" element={<WebsiteFleet />} />
          <Route path="/website/contact" element={<WebsiteContact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
