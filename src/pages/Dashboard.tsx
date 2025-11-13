import { useState, useEffect } from "react";
import { Activity, TrendingUp, Calendar, Target, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlucoseCard } from "@/components/GlucoseCard";
import { StatCard } from "@/components/StatCard";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { usePWAInstall } from "@/hooks/usePWAInstall";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const { isInstalled } = usePWAInstall();
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const bannerDismissed = localStorage.getItem('pwa_install_banner_dismissed');
    if (!isInstalled && !bannerDismissed) {
      setShowInstallBanner(true);
    }
  }, [isInstalled]);

  const handleDismissBanner = () => {
    localStorage.setItem('pwa_install_banner_dismissed', 'true');
    setShowInstallBanner(false);
  };

  const getDiabetesTypeLabel = () => {
    if (!profile?.diabetesType) return '';
    const types: Record<string, string> = {
      tipo1: 'Diabetes Tipo 1',
      tipo2: 'Diabetes Tipo 2',
      gestacional: 'Diabetes Gestacional',
      'pre-diabetes': 'Pré-diabetes',
    };
    return types[profile.diabetesType] || '';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-b-3xl shadow-[var(--shadow-elevated)]">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-bold mb-1">GlicoSaúde</h1>
          <p className="text-sm opacity-90">
            {profile?.name ? `${getGreeting()}, ${profile.name}! 👋` : 'Bem-vindo de volta! 👋'}
          </p>
          {profile?.diabetesType && (
            <p className="text-xs opacity-75 mt-1">{getDiabetesTypeLabel()}</p>
          )}
        </div>
      </header>

      {/* Banner de instalação PWA */}
      {showInstallBanner && (
        <div className="max-w-screen-lg mx-auto px-4 pt-4 animate-fade-in">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg flex-shrink-0">
              <Download className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                💡 Instale o app para acesso mais rápido!
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Adicione à tela inicial e use offline
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/instalar")}
              className="text-primary hover:text-primary/90 font-semibold flex-shrink-0"
            >
              Como instalar →
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismissBanner}
              className="flex-shrink-0 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <main className="max-w-screen-lg mx-auto px-4 pt-6 space-y-6">
        {/* Quick Stats */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-foreground">Resumo de Hoje</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              title="Média"
              value="98"
              subtitle="mg/dL"
              icon={Activity}
              variant="success"
            />
            <StatCard
              title="Medições"
              value="4"
              subtitle="hoje"
              icon={Calendar}
              variant="default"
            />
            <StatCard
              title="Meta"
              value="85%"
              subtitle="atingida"
              icon={Target}
              variant="success"
            />
            <StatCard
              title="Tendência"
              value="↓ 5%"
              subtitle="vs ontem"
              icon={TrendingUp}
              variant="success"
            />
          </div>
        </section>

        {/* Latest Reading */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Última Medição</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/historico")}
              className="text-primary hover:text-primary/90"
            >
              Ver todas
            </Button>
          </div>
          <GlucoseCard
            value={95}
            timestamp="Há 2 horas"
            type="postprandial"
            trend="stable"
          />
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-foreground">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => navigate("/registro")}
              className="h-24 flex flex-col gap-2 bg-primary hover:bg-primary/90"
            >
              <Activity className="h-6 w-6" />
              <span>Nova Medição</span>
            </Button>
            <Button
              onClick={() => navigate("/premium")}
              className="h-24 flex flex-col gap-2 bg-gradient-to-br from-premium to-premium/80 hover:from-premium/90 hover:to-premium/70 border-0"
            >
              <TrendingUp className="h-6 w-6" />
              <span>Ver Insights</span>
            </Button>
          </div>
        </section>

        {/* Premium CTA */}
        <section className="bg-gradient-to-br from-premium to-premium/80 rounded-2xl p-6 text-premium-foreground shadow-[var(--shadow-elevated)]">
          <h3 className="text-xl font-bold mb-2">Desbloqueie Todo o Potencial</h3>
          <p className="text-sm opacity-90 mb-4">
            Relatórios avançados, insights com IA e muito mais com o GlicoSaúde Premium
          </p>
          <Button
            onClick={() => navigate("/premium")}
            className="w-full bg-white text-premium hover:bg-white/90"
          >
            Conhecer Premium
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
