import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminRoute } from "@/components/AdminRoute";
import Index from "./pages/Index";
import Cars from "./pages/Cars";
import Tours from "./pages/Tours";
import Locations from "./pages/Locations";
import AddLocation from "./pages/AddLocation";
import AddTour from "./pages/AddTour";
import AddCar from "./pages/AddCar";
import Categories from "./pages/Categories";
import Blog from "./pages/Blog";
import Pages from "./pages/Pages";
import Media from "./pages/Media";
import Users from "./pages/Users";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import AccessDenied from "./pages/AccessDenied";
import NotFound from "./pages/NotFound";
import WebsiteHome from "./pages/website/WebsiteHome";
import WebsiteAbout from "./pages/website/WebsiteAbout";
import WebsiteServices from "./pages/website/WebsiteServices";
import WebsiteTours from "./pages/website/WebsiteTours";
import WebsiteTourDetail from "./pages/website/WebsiteTourDetail";
import WebsiteDestinations from "./pages/website/WebsiteDestinations";
import WebsiteFleet from "./pages/website/WebsiteFleet";
import WebsiteContact from "./pages/website/WebsiteContact";
import WebsiteBlog from "./pages/website/WebsiteBlog";
import WebsiteBlogArticle from "./pages/website/WebsiteBlogArticle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth & Access Routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Admin-Only Dashboard Routes */}
          <Route path="/" element={<AdminRoute><Index /></AdminRoute>} />
          <Route path="/cars" element={<AdminRoute><Cars /></AdminRoute>} />
          <Route path="/cars/add" element={<AdminRoute><AddCar /></AdminRoute>} />
          <Route path="/cars/edit/:id" element={<AdminRoute><AddCar /></AdminRoute>} />
          <Route path="/cars/categories" element={<Navigate to="/categories?type=car" replace />} />
          <Route path="/tours" element={<AdminRoute><Tours /></AdminRoute>} />
          <Route path="/tours/add" element={<AdminRoute><AddTour /></AdminRoute>} />
          <Route path="/tours/edit/:id" element={<AdminRoute><AddTour /></AdminRoute>} />
          <Route path="/tours/categories" element={<Navigate to="/categories?type=tour" replace />} />
          <Route path="/locations" element={<AdminRoute><Locations /></AdminRoute>} />
          <Route path="/locations/add" element={<AdminRoute><AddLocation /></AdminRoute>} />
          <Route path="/locations/edit/:id" element={<AdminRoute><AddLocation /></AdminRoute>} />
          <Route path="/locations/categories" element={<Navigate to="/categories?type=location" replace />} />
          <Route path="/categories" element={<AdminRoute><Categories /></AdminRoute>} />
          <Route path="/blog" element={<AdminRoute><Blog /></AdminRoute>} />
          <Route path="/pages" element={<AdminRoute><Pages /></AdminRoute>} />
          <Route path="/media" element={<AdminRoute><Media /></AdminRoute>} />
          <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />

          {/* Public Website Routes */}
          <Route path="/website" element={<WebsiteHome />} />
          <Route path="/website/about" element={<WebsiteAbout />} />
          <Route path="/website/services" element={<WebsiteServices />} />
          <Route path="/website/tours" element={<WebsiteTours />} />
          <Route path="/website/tours/:id" element={<WebsiteTourDetail />} />
          <Route path="/website/destinations" element={<WebsiteDestinations />} />
          <Route path="/website/fleet" element={<WebsiteFleet />} />
          <Route path="/website/contact" element={<WebsiteContact />} />
          <Route path="/website/blog" element={<WebsiteBlog />} />
          <Route path="/website/blog/:slug" element={<WebsiteBlogArticle />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
