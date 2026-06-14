'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Bell, Shield } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Helper to resolve route page titles
  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return 'Welcome';
    
    // Capitalize and format the last segment
    const lastSegment = segments[segments.length - 1];
    return lastSegment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (!user) return null;

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-10 sticky top-0">
      {/* Dynamic Title */}
      <div>
        <h1 className="text-base font-semibold text-slate-100">{getPageTitle()}</h1>
      </div>

      {/* Action items */}
      <div className="flex items-center gap-4">
        {/* Branch / Status indicator */}
        {user.branchId && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 border border-slate-700/60 text-[11px] font-medium text-slate-400">
            <Shield size={12} className="text-amber-500" />
            Branch: {user.branchId}
          </div>
        )}

        {/* Notification Bell */}
        <button className="w-8 h-8 rounded-lg border border-slate-800 hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 transition relative cursor-pointer">
          <Bell size={16} />
          {/* Notification badge */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-800" />

        {/* Role tag */}
        <div className="text-right">
          <p className="text-xs font-semibold text-slate-300 leading-tight">
            {user.name || 'Demo User'}
          </p>
          <span className="text-[10px] text-slate-500 font-medium tracking-wider">
            {user.role === 'DELIVERY_PARTNER' ? 'Delivery Rider' : 'Kitchen Operations'}
          </span>
        </div>
      </div>
    </header>
  );
}
