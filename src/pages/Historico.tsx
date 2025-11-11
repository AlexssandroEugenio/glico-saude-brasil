import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlucoseCard } from "@/components/GlucoseCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { date: "Seg", value: 95 },
  { date: "Ter", value: 102 },
  { date: "Qua", value: 88 },
  { date: "Qui", value: 98 },
  { date: "Sex", value: 92 },
  { date: "Sáb", value: 105 },
  { date: "Dom", value: 89 },
];

const mockReadings = [
  { value: 95, timestamp: "Hoje, 14:30", type: "postprandial" as const, trend: "stable" as const },
  { value: 88, timestamp: "Hoje, 08:00", type: "fasting" as const, trend: "down" as const },
  { value: 102, timestamp: "Ontem, 20:15", type: "postprandial" as const, trend: "up" as const },
  { value: 92, timestamp: "Ontem, 12:00", type: "postprandial" as const, trend: "stable" as const },
];

const Historico = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6">
        <div className="max-w-screen-lg mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mb-4 text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Histórico</h1>
          <p className="text-sm opacity-90">Suas medições e tendências</p>
        </div>
      </header>

      <main className="max-w-screen-lg mx-auto px-4 pt-6 space-y-6">
        {/* Graph */}
        <Card className="shadow-[var(--shadow-elevated)]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Últimos 7 Dias
            </CardTitle>
            <Button variant="ghost" size="icon" className="text-primary">
              <Download className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs" 
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    className="text-xs"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Média da semana: <span className="font-semibold text-success">95 mg/dL</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Readings List */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-foreground">Medições Recentes</h2>
          <div className="space-y-3">
            {mockReadings.map((reading, index) => (
              <GlucoseCard key={index} {...reading} />
            ))}
          </div>
        </section>

        {/* Premium upsell */}
        <Card className="bg-gradient-to-br from-premium to-premium/80 text-premium-foreground border-0 shadow-[var(--shadow-elevated)]">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold mb-2">Relatórios Avançados</h3>
            <p className="text-sm opacity-90 mb-4">
              Acesse relatórios detalhados, análises de tendências e exportação em PDF
            </p>
            <Button
              onClick={() => navigate("/premium")}
              className="bg-white text-premium hover:bg-white/90"
            >
              Ativar Premium
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Historico;
