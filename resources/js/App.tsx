import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ConsultationModalProvider } from "@/contexts/ConsultationModalContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AppointmentsPending from "./pages/admin/AppointmentsPending";
import AppointmentsOngoing from "./pages/admin/AppointmentsOngoing";
import AppointmentsHistory from "./pages/admin/AppointmentsHistory";
import MessagesPending from "./pages/admin/MessagesPending";
import MessagesHistory from "./pages/admin/MessagesHistory";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAccount from "./pages/admin/AdminAccount";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminAuthProvider>
            <ConsultationModalProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact-us" element={<ContactUs />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/appointments/pending" element={<ProtectedRoute><AppointmentsPending /></ProtectedRoute>} />
                <Route path="/admin/appointments/ongoing" element={<ProtectedRoute><AppointmentsOngoing /></ProtectedRoute>} />
                <Route path="/admin/appointments/history" element={<ProtectedRoute><AppointmentsHistory /></ProtectedRoute>} />
                <Route path="/admin/messages/pending" element={<ProtectedRoute><MessagesPending /></ProtectedRoute>} />
                <Route path="/admin/messages/history" element={<ProtectedRoute><MessagesHistory /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute requireSuperAdmin><AdminUsers /></ProtectedRoute>} />
                <Route path="/admin/account" element={<ProtectedRoute><AdminAccount /></ProtectedRoute>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ConsultationModalProvider>
          </AdminAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
