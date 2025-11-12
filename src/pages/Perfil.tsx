import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserProfile, UserProfile } from "@/hooks/useUserProfile";
import { User, Save, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Perfil = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, clearProfile } = useUserProfile();
  const [formData, setFormData] = useState<UserProfile | null>(profile);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const updateField = (field: keyof UserProfile, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const handleSave = () => {
    if (formData) {
      updateProfile(formData);
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });
    }
  };

  const handleClearProfile = () => {
    clearProfile();
    toast({
      title: "Perfil excluído",
      description: "Seus dados foram removidos do dispositivo.",
    });
    navigate('/onboarding');
  };

  if (!profile || !formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Nenhum perfil encontrado</h2>
          <p className="text-muted-foreground mb-4">Complete seu cadastro para personalizar sua experiência</p>
          <Button onClick={() => navigate('/onboarding')}>
            Completar Cadastro
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-b-3xl shadow-[var(--shadow-elevated)]">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-2xl font-bold mb-1">Meu Perfil</h1>
          <p className="text-sm opacity-90">Gerencie suas informações pessoais</p>
        </div>
      </header>

      <main className="max-w-screen-lg mx-auto px-4 pt-6 space-y-6">
        {/* Perfil do Usuário */}
        <section className="bg-card rounded-2xl p-6 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Informações Básicas
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) => updateField('age', parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label>Sexo</Label>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => updateField('weight', parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height || ''}
                  onChange={(e) => updateField('height', parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Saúde e Tratamento */}
        <section className="bg-card rounded-2xl p-6 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-semibold mb-4">Saúde e Tratamento</h2>
          <div className="space-y-4">
            <div>
              <Label>Tipo de diabetes</Label>
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
              <Label htmlFor="diagnosisYears">Tempo de diagnóstico (anos)</Label>
              <Input
                id="diagnosisYears"
                type="number"
                value={formData.diagnosisYears || ''}
                onChange={(e) => updateField('diagnosisYears', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label>Usa insulina?</Label>
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
                />
              </div>
            )}
          </div>
        </section>

        {/* Hábitos */}
        <section className="bg-card rounded-2xl p-6 shadow-[var(--shadow-soft)]">
          <h2 className="text-lg font-semibold mb-4">Hábitos de Vida</h2>
          <div className="space-y-4">
            <div>
              <Label>Nível de atividade física</Label>
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
              <Label>Alimentação</Label>
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
          </div>
        </section>

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={handleSave} className="w-full" size="lg">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full" size="lg">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Perfil
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Todos os seus dados serão removidos do dispositivo.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearProfile}>
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </div>
  );
};

export default Perfil;
