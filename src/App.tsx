import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import EmailConfirm from "./pages/EmailConfirm";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CorporationDashboard from "./pages/CorporationDashboard";
import ComplaintStatus from "./pages/ComplaintStatus";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Awareness from "./pages/Awareness";
import { Buy } from "./pages/Buy";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import ScheduleDemo from "./pages/scheduledemo";
import PaymentGateway from "./pages/paymentgateway";
import WorkerDashboard from "./pages/Workerdashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/email-confirm" element={<EmailConfirm />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/corporation-dashboard" element={
              <ProtectedRoute allowedRoles={["admin", "corporate", "corporation_head"]}>
                <CorporationDashboard />
              </ProtectedRoute>
            } />
            <Route path="/complaint-status" element={
              <ProtectedRoute>
                <ComplaintStatus />
              </ProtectedRoute>
            } />
            <Route path="/worker-dashboard" element={
              <ProtectedRoute allowedRoles={["worker"]}>
                <WorkerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/scheduledemo" element={<ScheduleDemo />} />
            <Route path="/paymentgateway" element={<PaymentGateway />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
