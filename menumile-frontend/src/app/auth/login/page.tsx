'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const loginSchema = zod.object({
  email: zod.string().email('Please enter a valid email address'),
  password: zod.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFields = zod.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, isError, error } = useAuth();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFields) => {
    login(data, {
      onSuccess: (res) => {
        // Redirect based on user role
        const role = res.user.role;
        if (role === 'DELIVERY_PARTNER') router.push('/rider/shifts');
        else if (role === 'RESTAURANT_STAFF') router.push('/restaurant/kitchen');
        else if (role === 'ADMIN') router.push('/admin/dashboard');
        else router.push('/customer/dashboard');
      },
    });
  };

  // Helper for quick developer mock login to speed up testing
  const handleMockLogin = (role: 'CUSTOMER' | 'DELIVERY_PARTNER' | 'RESTAURANT_STAFF' | 'ADMIN') => {
    const mockUser = {
      id: `mock-${role.toLowerCase()}-123`,
      email: `${role.toLowerCase()}@menumile.com`,
      name: `Demo ${role.charAt(0) + role.slice(1).toLowerCase().replace('_', ' ')}`,
      role,
      branchId: role === 'RESTAURANT_STAFF' ? 'mock-branch-456' : undefined,
    };
    const mockToken = 'mock-jwt-token-xyz';
    localStorage.setItem('access_token', mockToken);
    setAuth(mockUser, mockToken);

    if (role === 'DELIVERY_PARTNER') router.push('/rider/shifts');
    else if (role === 'RESTAURANT_STAFF') router.push('/restaurant/kitchen');
    else if (role === 'ADMIN') router.push('/admin/dashboard');
    else router.push('/customer/dashboard');
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-slate-100 text-center mb-6">Sign In</h3>

      {isError && (
        <div className="p-3 mb-4 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
          {error?.message || 'Invalid email or password.'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="name@company.com"
            className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-amber-500 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none transition text-sm"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-amber-500 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none transition text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-medium rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Developer Mock Section */}
      <div className="mt-8 pt-6 border-t border-slate-800/80">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Developer Quick Access (Mock Login)
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleMockLogin('CUSTOMER')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition cursor-pointer font-medium"
          >
            Mock Customer
          </button>
          <button
            onClick={() => handleMockLogin('DELIVERY_PARTNER')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition cursor-pointer font-medium"
          >
            Mock Rider
          </button>
          <button
            onClick={() => handleMockLogin('RESTAURANT_STAFF')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition cursor-pointer font-medium"
          >
            Mock Restaurant
          </button>
          <button
            onClick={() => handleMockLogin('ADMIN')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition cursor-pointer font-medium"
          >
            Mock Admin
          </button>
        </div>
      </div>
    </div>
  );
}
