import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useUserProfile, UserProfile } from "@/hooks/useUserProfile";
import { Heart, Syringe, Apple, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Onboarding = () => {
  const navigate = useNavigate();
  const { saveProfile } = useUserProfile();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    sex: 'masculino',
    diabetesType: 'tipo2',
    usesInsulin: false,
    usesMedication: false,
    activityLevel: 'moderado',
    eatingHabits: 'regular',
    consumesAlcohol: false,
    smokes: false,
  });

  const updateField = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    const completeProfile: UserProfile = {
      name: formData.name || '',
      age: formData.age || 0,
      sex: formData.sex || 'outro',
      weight: formData.weight,
      height: formData.height,
      diabetesType: formData.diabetesType || 'tipo2',
      diagnosisYears: formData.diagnosisYears || 0,
      usesInsulin: formData.usesInsulin || false,
      insulinType: formData.insulinType,
      usesMedication: formData.usesMedication || false,
      activityLevel: formData.activityLevel || 'moderado',
      eatingHabits: formData.eatingHabits || 'regular',
      consumesAlcohol: formData.consumesAlcohol || false,
      smokes: formData.smokes || false,
      onboardingCompleted: true,
    };

    saveProfile(completeProfile);
    toast({
      title: "Configurações salvas!",
      description: "Seu GlicoSaúde foi personalizado com base no seu perfil.",
    });
    navigate('/');
  };

  const progressValue = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-bold mb-2">Bem-vindo ao GlicoSaúde 💙</h1>
          <p className="text-sm opacity-90">
            Antes de começarmos, conte um pouco sobre você para personalizarmos sua experiência.
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 pt-6 max-w-screen-lg mx-auto w-full">
        <div className="mb-2 text-sm text-muted-foreground text-center">
          Passo {step} de 3
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>

      {/* Content */}
      <main className="flex-1 px-6 pt-8 pb-24 max-w-screen-lg mx-auto w-full">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Perfil do Usuário</h2>
                <p className="text-sm text-muted-foreground">Informações básicas sobre você</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <Label htmlFor="age">Idade *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) => updateField('age', parseInt(e.target.value))}
                  placeholder="Sua idade"
                />
              </div>

              <div>
                <Label>Sexo *</Label>
                <Select value={formData.sex} onValueChange={(value) => updateField('sex', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="weight">Peso (kg) - Opcional</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => updateField('weight', parseFloat(e.target.value))}
                  placeholder="Seu peso"
                />
              </div>

              <div>
                <Label htmlFor="height">Altura (cm) - Opcional</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height || ''}
                  onChange={(e) => updateField('height', parseFloat(e.target.value))}
                  placeholder="Sua altura"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <Syringe className="h-6 w-6 text-success" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Saúde e Tratamento</h2>
                <p className="text-sm text-muted-foreground">Informações sobre sua diabetes</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Tipo de diabetes *</Label>
                <Select value={formData.diabetesType} onValueChange={(value) => updateField('diabetesType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tipo1">Tipo 1</SelectItem>
                    <SelectItem value="tipo2">Tipo 2</SelectItem>
                    <SelectItem value="gestacional">Gestacional</SelectItem>
                    <SelectItem value="pre-diabetes">Pré-diabetes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="diagnosisYears">Tempo de diagnóstico (anos) *</Label>
                <Input
                  id="diagnosisYears"
                  type="number"
                  value={formData.diagnosisYears || ''}
                  onChange={(e) => updateField('diagnosisYears', parseInt(e.target.value))}
                  placeholder="Há quantos anos?"
                />
              </div>

              <div>
                <Label>Usa insulina? *</Label>
                <Select
                  value={formData.usesInsulin ? 'sim' : 'nao'}
                  onValueChange={(value) => updateField('usesInsulin', value === 'sim')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.usesInsulin && (
                <div>
                  <Label htmlFor="insulinType">Tipo de insulina</Label>
                  <Input
                    id="insulinType"
                    value={formData.insulinType || ''}
                    onChange={(e) => updateField('insulinType', e.target.value)}
                    placeholder="Ex: NPH, Regular, Rápida"
                  />
                </div>
              )}

              <div>
                <Label>Usa medicamentos orais? *</Label>
                <Select
                  value={formData.usesMedication ? 'sim' : 'nao'}
                  onValueChange={(value) => updateField('usesMedication', value === 'sim')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Apple className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Hábitos</h2>
                <p className="text-sm text-muted-foreground">Seu estilo de vida</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Nível de atividade física *</Label>
                <Select value={formData.activityLevel} onValueChange={(value) => updateField('activityLevel', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentário</SelectItem>
                    <SelectItem value="moderado">Moderado</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Alimentação *</Label>
                <Select value={formData.eatingHabits} onValueChange={(value) => updateField('eatingHabits', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="irregular">Irregular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Consome álcool? *</Label>
                <Select
                  value={formData.consumesAlcohol ? 'sim' : 'nao'}
                  onValueChange={(value) => updateField('consumesAlcohol', value === 'sim')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Fuma? *</Label>
                <Select
                  value={formData.smokes ? 'sim' : 'nao'}
                  onValueChange={(value) => updateField('smokes', value === 'sim')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8 p-4 bg-success/10 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-success">Quase lá!</p>
                <p className="text-muted-foreground mt-1">
                  Suas informações nos ajudam a personalizar sua experiência e fornecer insights mais precisos.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="max-w-screen-lg mx-auto flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep} className="flex-1">
              Voltar
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={nextStep} className="flex-1">
              Próximo
            </Button>
          ) : (
            <Button onClick={handleComplete} className="flex-1 bg-success hover:bg-success/90">
              Concluir
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
