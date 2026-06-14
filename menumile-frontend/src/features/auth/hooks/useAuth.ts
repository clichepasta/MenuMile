import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuthStore, User } from '../store/authStore';

interface LoginResponse {
  accessToken: string;
  user: User;
}

export function useAuth() {
  const { user, accessToken, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  const loginMutation = useMutation<LoginResponse, Error, Record<string, string>>({
    mutationFn: async (credentials) => {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.accessToken);
      setAuth(data.user, data.accessToken);
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      clearAuth();
    },
    onError: () => {
      // Clear local auth regardless of API failure to prevent lockouts
      clearAuth();
    },
  });

  return {
    user,
    accessToken,
    isAuthenticated,
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
    logout: logoutMutation.mutate,
  };
}
