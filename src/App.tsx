import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// GreenCab Pages
import GCHome from "./pages/greencab/GCHome";
import GCAbout from "./pages/greencab/GCAbout";
import GCServices from "./pages/greencab/GCServices";
import GCContact from "./pages/greencab/GCContact";
import GCAdminDashboard from "./pages/greencab/GCAdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* GreenCab Public Routes */}
          <Route path="/" element={<GCHome />} />
          <Route path="/about" element={<GCAbout />} />
          <Route path="/services" element={<GCServices />} />
          <Route path="/contact" element={<GCContact />} />
          
          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<GCAdminDashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
