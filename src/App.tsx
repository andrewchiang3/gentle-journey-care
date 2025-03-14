
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import Confirmation from "./pages/Confirmation";
import Schedule from "./pages/Schedule";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Conditions from "./pages/Conditions";
import Medicines from "./pages/Medicines";
import ClinicsInfo from "./pages/ClinicsInfo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <div className="pt-14">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/clinics" element={<ClinicsInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
