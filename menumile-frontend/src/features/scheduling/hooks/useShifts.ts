import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export interface ShiftSlot {
  id: number;
  startTime: string;
  endTime: string;
  isClaimed: boolean;
  claimedBy?: string;
  region?: string;
}

export function useAvailableShifts() {
  return useQuery<ShiftSlot[], Error>({
    queryKey: ['shifts', 'available'],
    queryFn: async () => {
      const { data } = await api.get('/shifts/available');
      return data;
    },
  });
}

export function useRiderShifts() {
  return useQuery<ShiftSlot[], Error>({
    queryKey: ['shifts', 'claimed'],
    queryFn: async () => {
      const { data } = await api.get('/shifts/claimed');
      return data;
    },
  });
}

export function useClaimShift() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (shiftId: number) => {
      await api.post(`/shifts/${shiftId}/claim`);
    },
    onSuccess: () => {
      // Invalidate both lists on successful claim
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
    },
  });
}

export function useDropShift() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (shiftId: number) => {
      await api.post(`/shifts/${shiftId}/drop`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shifts'] });
    },
  });
}
