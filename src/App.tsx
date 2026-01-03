import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import HomePage from "./pages/HomePage";
import ToursListing from "./pages/ToursListing";
import TourDetails from "./pages/TourDetails";
import CarRental from "./pages/CarRental";
import BookingPage from "./pages/BookingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

// Admin Pages
import DashboardPage from "./pages/admin/DashboardPage";
import ToursAdminPage from "./pages/admin/ToursAdminPage";
import AddTourPage from "./pages/admin/AddTourPage";
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
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursListing />} />
          <Route path="/tour/:id" element={<TourDetails />} />
          <Route path="/packages" element={<ToursListing />} />
          <Route path="/car-rental" element={<CarRental />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/tours" element={<ToursAdminPage />} />
          <Route path="/admin/tours/add" element={<AddTourPage />} />
          <Route path="/admin/tours/:id/edit" element={<AddTourPage />} />
          <Route path="/admin/tours/categories" element={<GenericAdminPage />} />
          <Route path="/admin/locations" element={<LocationsPage />} />
          <Route path="/admin/locations/add" element={<GenericAdminPage />} />
          <Route path="/admin/cars" element={<CarsPage />} />
          <Route path="/admin/cars/add" element={<GenericAdminPage />} />
          <Route path="/admin/coupons" element={<CouponsPage />} />
          <Route path="/admin/reviews" element={<ReviewsPage />} />
          <Route path="/admin/news" element={<NewsPage />} />
          <Route path="/admin/news/add" element={<GenericAdminPage />} />
          <Route path="/admin/pages" element={<PagesPage />} />
          <Route path="/admin/media" element={<MediaPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/users/add" element={<GenericAdminPage />} />
          <Route path="/admin/plans" element={<PlansPage />} />
          <Route path="/admin/plans/add" element={<GenericAdminPage />} />
          <Route path="/admin/popup" element={<GenericAdminPage />} />
          <Route path="/admin/menu" element={<GenericAdminPage />} />
          <Route path="/admin/payouts" element={<GenericAdminPage />} />
          <Route path="/admin/themes" element={<GenericAdminPage />} />
          <Route path="/admin/settings/*" element={<SettingsPage />} />
          <Route path="/admin/tools/*" element={<GenericAdminPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
