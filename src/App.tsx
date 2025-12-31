import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import HomePage from "./pages/HomePage";
import ToursListing from "./pages/ToursListing";
import TourDetails from "./pages/TourDetails";
import CarRental from "./pages/CarRental";
import BookingPage from "./pages/BookingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

// Admin Pages
import LocationsPage from "./pages/admin/LocationsPage";
import CarsPage from "./pages/admin/CarsPage";
import CouponsPage from "./pages/admin/CouponsPage";
import ReviewsPage from "./pages/admin/ReviewsPage";
import NewsPage from "./pages/admin/NewsPage";
import PagesPage from "./pages/admin/PagesPage";
import MediaPage from "./pages/admin/MediaPage";
import UsersPage from "./pages/admin/UsersPage";
import PlansPage from "./pages/admin/PlansPage";
import SettingsPage from "./pages/admin/SettingsPage";
import ReportsPage from "./pages/admin/ReportsPage";
import GenericAdminPage from "./pages/admin/GenericAdminPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours-listing" element={<ToursListing />} />
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path="/car-rental" element={<CarRental />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Admin Routes */}
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/locations/add" element={<GenericAdminPage />} />
          <Route path="/tours/add" element={<GenericAdminPage />} />
          <Route path="/tours/categories" element={<GenericAdminPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/add" element={<GenericAdminPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/add" element={<GenericAdminPage />} />
          <Route path="/pages" element={<PagesPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/add" element={<GenericAdminPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/plans/add" element={<GenericAdminPage />} />
          <Route path="/popup" element={<GenericAdminPage />} />
          <Route path="/menu" element={<GenericAdminPage />} />
          <Route path="/payouts" element={<GenericAdminPage />} />
          <Route path="/themes" element={<GenericAdminPage />} />
          <Route path="/settings/*" element={<SettingsPage />} />
          <Route path="/tools/*" element={<GenericAdminPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
