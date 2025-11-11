import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface GlucoseCardProps {
  value: number;
  timestamp: string;
  type: "fasting" | "postprandial" | "random";
  trend?: "up" | "down" | "stable";
}

export const GlucoseCard = ({ value, timestamp, type, trend = "stable" }: GlucoseCardProps) => {
  const getStatus = (value: number) => {
    if (value < 70) return { label: "Baixa", color: "text-warning" };
    if (value >= 70 && value <= 100) return { label: "Normal", color: "text-success" };
    if (value > 100 && value <= 125) return { label: "Pré-diabetes", color: "text-warning" };
    return { label: "Alta", color: "text-destructive" };
  };

  const status = getStatus(value);
  
  const typeLabels = {
    fasting: "Jejum",
    postprandial: "Pós-refeição",
    random: "Aleatória"
  };

  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;

  return (
    <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <p className="text-sm text-muted-foreground">{typeLabels[type]}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">{value}</p>
              <span className="text-sm text-muted-foreground">mg/dL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("text-sm font-medium", status.color)}>{status.label}</span>
              <TrendIcon className={cn("h-3 w-3", status.color)} />
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-right">
            {timestamp}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
