import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Crown, TrendingUp, FileText, Zap, Shield, Users } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Análises Avançadas",
    description: "Insights detalhados com IA sobre seus padrões glicêmicos"
  },
  {
    icon: FileText,
    title: "Relatórios PDF",
    description: "Exporte relatórios completos para compartilhar com seu médico"
  },
  {
    icon: Zap,
    title: "Alertas Inteligentes",
    description: "Notificações personalizadas baseadas em seus objetivos"
  },
  {
    icon: Shield,
    title: "Backup na Nuvem",
    description: "Seus dados seguros e sincronizados em todos dispositivos"
  },
  {
    icon: Users,
    title: "Compartilhamento",
    description: "Compartilhe dados com família e profissionais de saúde"
  },
];

const plans = [
  {
    name: "Mensal",
    price: "R$ 19,90",
    period: "/mês",
    recommended: false,
  },
  {
    name: "Anual",
    price: "R$ 159,90",
    period: "/ano",
    recommended: true,
    savings: "Economize 33%",
  },
];

const Premium = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-premium to-premium/80 text-premium-foreground p-6">
        <div className="max-w-screen-lg mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mb-4 text-premium-foreground hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-6 w-6" />
            <h1 className="text-2xl font-bold">GlicoSaúde Premium</h1>
          </div>
          <p className="text-sm opacity-90">Controle ainda mais eficiente da sua saúde</p>
        </div>
      </header>

      <main className="max-w-screen-lg mx-auto px-4 pt-6 space-y-6">
        {/* Features */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Recursos Premium</h2>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-[var(--shadow-card)]">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-premium/10 text-premium rounded-lg">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Plans */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Escolha seu Plano</h2>
          <div className="space-y-3">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`shadow-[var(--shadow-card)] ${
                  plan.recommended ? "border-2 border-premium" : ""
                }`}
              >
                <CardContent className="p-6">
                  {plan.recommended && (
                    <div className="mb-3 px-3 py-1 bg-premium/10 text-premium text-xs font-semibold rounded-full inline-block">
                      Mais Popular
                    </div>
                  )}
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                      {plan.savings && (
                        <p className="text-sm text-success font-medium">{plan.savings}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-sm text-muted-foreground">{plan.period}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className={`w-full h-12 ${
                      plan.recommended 
                        ? "bg-premium hover:bg-premium/90" 
                        : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    Assinar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 text-foreground">O que está incluído</h3>
            <ul className="space-y-3">
              {[
                "Registros ilimitados de glicemia",
                "Gráficos e relatórios avançados",
                "Insights personalizados com IA",
                "Exportação de dados em PDF",
                "Suporte prioritário",
                "Sem anúncios"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="p-1 bg-success/10 text-success rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Guarantee */}
        <Card className="border-2 border-primary/20">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2 text-foreground">Garantia de 7 Dias</h3>
            <p className="text-sm text-muted-foreground">
              Experimente sem riscos. Se não estiver satisfeito, devolvemos 100% do seu dinheiro.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Premium;
