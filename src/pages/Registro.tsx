import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useGlucoseReadings } from "@/hooks/useGlucoseReadings";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Activity } from "lucide-react";

const Registro = () => {
  const [glucose, setGlucose] = useState("");
  const [type, setType] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { insertReading, isInserting } = useGlucoseReadings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!glucose || !type) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const glucoseValue = parseInt(glucose);
    if (glucoseValue <= 0 || glucoseValue >= 600) {
      toast({
        title: "Valor inválido",
        description: "O valor da glicemia deve estar entre 1 e 599 mg/dL.",
        variant: "destructive",
      });
      return;
    }

    insertReading({
      glucose_value: glucoseValue,
      measurement_type: type as 'fasting' | 'postprandial' | 'random',
      measured_at: new Date().toISOString(),
    });

    setGlucose("");
    setType("");
    
    setTimeout(() => navigate("/historico"), 1000);
  };

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
          <h1 className="text-2xl font-bold">Nova Medição</h1>
          <p className="text-sm opacity-90">Registre sua glicemia</p>
        </div>
      </header>

      <main className="max-w-screen-lg mx-auto px-4 pt-6">
        <Card className="shadow-[var(--shadow-elevated)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Dados da Medição
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="glucose">Glicemia (mg/dL)</Label>
                <Input
                  id="glucose"
                  type="number"
                  placeholder="Ex: 95"
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Medição</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="type" className="h-12">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fasting">Jejum</SelectItem>
                    <SelectItem value="postprandial">Pós-refeição (2h)</SelectItem>
                    <SelectItem value="random">Aleatória</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 space-y-3">
              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-primary hover:bg-primary/90"
                disabled={isInserting}
              >
                {isInserting ? "Salvando..." : "Registrar Medição"}
              </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-base"
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-muted/50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-2 text-foreground">Valores de Referência</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• <span className="text-success">Normal:</span> 70-100 mg/dL (jejum)</li>
              <li>• <span className="text-warning">Pré-diabetes:</span> 100-125 mg/dL</li>
              <li>• <span className="text-destructive">Diabetes:</span> ≥126 mg/dL</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Registro;
