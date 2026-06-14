'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import Sidebar from './sidebar';
import Header from './header';
import { Loader2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRoles?: ('CUSTOMER' | 'DELIVERY_PARTNER' | 'RESTAURANT_STAFF' | 'ADMIN')[];
}

export default function DashboardLayout({ children, allowedRoles }: DashboardLayoutProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [mounted, isAuthenticated, router]);

  useEffect(() => {
    if (mounted && isAuthenticated && user && allowedRoles) {
      if (!allowedRoles.includes(user.role)) {
        // Redirect if user doesn't have required permission role
        if (user.role === 'DELIVERY_PARTNER') router.replace('/rider/shifts');
        else if (user.role === 'RESTAURANT_STAFF') router.replace('/restaurant/kitchen');
        else if (user.role === 'ADMIN') router.replace('/admin/dashboard');
        else router.replace('/customer/dashboard');
      }
    }
  }, [mounted, isAuthenticated, user, allowedRoles, router]);

  if (!mounted || !isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <Loader2 size={32} className="animate-spin text-amber-500 mb-2" />
        <p className="text-xs uppercase tracking-widest font-semibold">Authorizing Session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main View Shell */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header Bar */}
        <Header />

        {/* Content area */}
        <main className="flex-1 p-6 overflow-y-auto bg-slate-950/95 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
