import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  role: 'CUSTOMER' | 'DELIVERY_PARTNER' | 'RESTAURANT_STAFF' | 'ADMIN';
  branchId?: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
}

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('access_token');
    const userProfileStr = localStorage.getItem('user_profile');
    if (accessToken && userProfileStr) {
      try {
        const user = JSON.parse(userProfileStr);
        return {
          user,
          accessToken,
          isAuthenticated: true,
        };
      } catch (e) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
      }
    }
  }
  return {
    user: null,
    accessToken: null,
    isAuthenticated: false,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),
  setAuth: (user, accessToken) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('user_profile', JSON.stringify(user));
    }
    set({ user, accessToken, isAuthenticated: true });
  },
  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_profile');
    }
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
}));

