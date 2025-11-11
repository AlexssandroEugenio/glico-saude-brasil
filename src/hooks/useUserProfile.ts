import { useState, useEffect } from 'react';

export interface UserProfile {
  // Etapa 1 - Perfil do Usuário
  name: string;
  age: number;
  sex: 'masculino' | 'feminino' | 'outro';
  weight?: number;
  height?: number;
  
  // Etapa 2 - Saúde e Tratamento
  diabetesType: 'tipo1' | 'tipo2' | 'gestacional' | 'pre-diabetes';
  diagnosisYears: number;
  usesInsulin: boolean;
  insulinType?: string;
  usesMedication: boolean;
  
  // Etapa 3 - Hábitos
  activityLevel: 'sedentario' | 'moderado' | 'ativo';
  eatingHabits: 'regular' | 'irregular';
  consumesAlcohol: boolean;
  smokes: boolean;
  
  // Controle
  onboardingCompleted: boolean;
}

const STORAGE_KEY = 'glicosaude_user_profile';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProfile(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = (data: UserProfile) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setProfile(data);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (profile) {
      const updated = { ...profile, ...data };
      saveProfile(updated);
    }
  };

  const clearProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
  };

  return {
    profile,
    loading,
    saveProfile,
    updateProfile,
    clearProfile,
  };
};
