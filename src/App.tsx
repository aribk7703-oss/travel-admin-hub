import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";

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
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import BookingsPage from "./pages/admin/BookingsPage";
import ServicesPage from "./pages/admin/ServicesPage";
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
        <AdminAuthProvider>
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
            
            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><ServicesPage /></ProtectedRoute>} />
            <Route path="/admin/tours" element={<ProtectedRoute><ToursAdminPage /></ProtectedRoute>} />
            <Route path="/admin/tours/add" element={<ProtectedRoute><AddTourPage /></ProtectedRoute>} />
            <Route path="/admin/tours/:id/edit" element={<ProtectedRoute><AddTourPage /></ProtectedRoute>} />
            <Route path="/admin/tours/categories" element={<ProtectedRoute><GenericAdminPage /></ProtectedRoute>} />
            <Route path="/admin/locations" element={<ProtectedRoute><LocationsPage /></ProtectedRoute>} />
            <Route path="/admin/locations/add" element={<ProtectedRoute><GenericAdminPage /></ProtectedRoute>} />
            <Route path="/admin/cars" element={<ProtectedRoute><CarsPage /></ProtectedRoute>} />
            <Route path="/admin/cars/add" element={<ProtectedRoute><GenericAdminPage /></ProtectedRoute>} />
            <Route path="/admin/coupons" element={<ProtectedRoute><CouponsPage /></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute><ReviewsPage /></ProtectedRoute>} />
            <Route path="/admin/news" element={<ProtectedRoute><NewsPage /></ProtectedRoute>} />
            <Route path="/admin/news/add" element={<ProtectedRoute><GenericAdminPage /></ProtectedRoute>} />
            <Route path="/admin/pages" element={<ProtectedRoute><PagesPage /></ProtectedRoute>} />
            <Route path="/admin/media" element={<ProtectedRoute><MediaPage /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
            <Route path="/admin/users/add" element={<ProtectedRoute><GenericAdminPage /></ProtectedRoute>} />
            <Route path="/admin/plans" element={<ProtectedRoute><PlansPage /></ProtectedRoute>} />
            <Route path="/admin/plans/add" element={<ProtectedRoute><GenericAdminPage /></ProtectedRoute>} />
            <Route path="/admin/popup" element={<ProtectedRoute><GenericAdminPage /></ProtectedRoute>} />
            <Route path="/admin/menu" element={<ProtectedRoute><GenericAdminPage /></ProtectedRoute>} />
            <Route path="/admin/payouts" element={<ProtectedRoute><GenericAdminPage /></ProtectedRoute>} />
            <Route path="/admin/themes" element={<ProtectedRoute><GenericAdminPage /></ProtectedRoute>} />
            <Route path="/admin/settings/*" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="/admin/tools/*" element={<ProtectedRoute><GenericAdminPage /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
