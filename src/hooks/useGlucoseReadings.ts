import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GlucoseReading {
  id: string;
  user_id: string;
  glucose_value: number;
  measurement_type: 'fasting' | 'postprandial' | 'random';
  measured_at: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface GlucoseReadingInsert {
  glucose_value: number;
  measurement_type: 'fasting' | 'postprandial' | 'random';
  measured_at?: string;
  notes?: string | null;
}

export const useGlucoseReadings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Buscar todas as medições do usuário
  const { data: readings = [], isLoading, error } = useQuery({
    queryKey: ['glucose-readings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('glucose_readings')
        .select('*')
        .order('measured_at', { ascending: false });

      if (error) throw error;
      return data as GlucoseReading[];
    },
  });

  // Inserir nova medição
  const insertReading = useMutation({
    mutationFn: async (reading: GlucoseReadingInsert) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const { data, error } = await supabase
        .from('glucose_readings')
        .insert({
          ...reading,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glucose-readings'] });
      toast({
        title: "Medição registrada!",
        description: "Sua glicemia foi salva com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao salvar medição",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Deletar medição
  const deleteReading = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('glucose_readings')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glucose-readings'] });
      toast({
        title: "Medição deletada",
        description: "Registro removido com sucesso.",
      });
    },
  });

  return {
    readings,
    isLoading,
    error,
    insertReading: insertReading.mutate,
    isInserting: insertReading.isPending,
    deleteReading: deleteReading.mutate,
  };
};
