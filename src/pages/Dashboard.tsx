import { Activity, TrendingUp, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlucoseCard } from "@/components/GlucoseCard";
import { StatCard } from "@/components/StatCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-b-3xl shadow-[var(--shadow-elevated)]">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-bold mb-1">GlicoSaúde</h1>
          <p className="text-sm opacity-90">Bem-vindo de volta! 👋</p>
        </div>
      </header>

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
