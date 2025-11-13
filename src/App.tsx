import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import Dashboard from "./pages/Dashboard";
import Registro from "./pages/Registro";
import Historico from "./pages/Historico";
import Premium from "./pages/Premium";
import Perfil from "./pages/Perfil";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import Instalar from "./pages/Instalar";
import { useUserProfile } from "@/hooks/useUserProfile";

const AppRoutes = () => {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  const needsOnboarding = !profile?.onboardingCompleted;

  return (
    <>
      <Routes>
        {needsOnboarding ? (
          <>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/instalar" element={<Instalar />} />
            <Route path="*" element={<Navigate to="/onboarding" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/instalar" element={<Instalar />} />
            <Route path="/onboarding" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
      {!needsOnboarding && <BottomNav />}
    </>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
