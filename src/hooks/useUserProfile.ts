import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileInsert {
  id?: string;
  name: string;
  age: number;
  sex: 'masculino' | 'feminino' | 'outro';
  weight?: number | null;
  height?: number | null;
  diabetes_type: 'tipo1' | 'tipo2' | 'gestacional' | 'pre-diabetes';
  diagnosis_years: number;
  uses_insulin?: boolean;
  insulin_type?: string | null;
  uses_medication?: boolean;
  activity_level: 'sedentario' | 'moderado' | 'ativo';
  eating_habits: 'regular' | 'irregular';
  consumes_alcohol?: boolean;
  smokes?: boolean;
  onboarding_completed?: boolean;
}

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
  const { user } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      // Se não há usuário autenticado, tenta carregar do localStorage
      if (!user) {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            setProfile(JSON.parse(stored));
          }
        } catch (error) {
          console.error('Erro ao carregar perfil do localStorage:', error);
        }
        setLoading(false);
        return;
      }

      // Se há usuário autenticado, busca do Supabase
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const userProfile: UserProfile = {
            name: data.name,
            age: data.age,
            sex: data.sex,
            weight: data.weight ?? undefined,
            height: data.height ?? undefined,
            diabetesType: data.diabetes_type,
            diagnosisYears: data.diagnosis_years,
            usesInsulin: data.uses_insulin,
            insulinType: data.insulin_type ?? undefined,
            usesMedication: data.uses_medication,
            activityLevel: data.activity_level,
            eatingHabits: data.eating_habits,
            consumesAlcohol: data.consumes_alcohol,
            smokes: data.smokes,
            onboardingCompleted: data.onboarding_completed,
          };
          setProfile(userProfile);
          // Sincronizar com localStorage também
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userProfile));
        }
      } catch (error) {
        console.error('Erro ao carregar perfil do Supabase:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const saveProfile = async (data: UserProfile) => {
    try {
      // Sempre salvar no localStorage primeiro
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setProfile(data);

      // Se há usuário autenticado, salvar no Supabase
      if (user) {
        const profileData: ProfileInsert = {
          id: user.id,
          name: data.name,
          age: data.age,
          sex: data.sex,
          weight: data.weight ?? null,
          height: data.height ?? null,
          diabetes_type: data.diabetesType,
          diagnosis_years: data.diagnosisYears,
          uses_insulin: data.usesInsulin,
          insulin_type: data.insulinType ?? null,
          uses_medication: data.usesMedication,
          activity_level: data.activityLevel,
          eating_habits: data.eatingHabits,
          consumes_alcohol: data.consumesAlcohol,
          smokes: data.smokes,
          onboarding_completed: data.onboardingCompleted,
        };

        const { error } = await supabase
          .from('profiles')
          .upsert(profileData);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      throw error;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (profile) {
      const updated = { ...profile, ...data };
      await saveProfile(updated);
    }
  };

  const clearProfile = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
    
    // Se há usuário autenticado, deletar do Supabase
    if (user) {
      try {
        await supabase
          .from('profiles')
          .delete()
          .eq('id', user.id);
      } catch (error) {
        console.error('Erro ao deletar perfil do Supabase:', error);
      }
    }
  };

  return {
    profile,
    loading,
    saveProfile,
    updateProfile,
    clearProfile,
  };
};
