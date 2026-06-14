'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { 
  Calendar, 
  Clock, 
  LayoutDashboard, 
  LogOut, 
  Utensils, 
  User, 
  Settings, 
  ShieldAlert,
  ClipboardList
} from 'lucide-react';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const getLinksForRole = (): SidebarLink[] => {
    if (!user) return [];

    switch (user.role) {
      case 'DELIVERY_PARTNER':
        return [
          { href: '/rider/shifts', label: 'Claim Shifts', icon: Calendar },
          { href: '/rider/deliveries', label: 'My Deliveries', icon: Clock },
          { href: '/rider/profile', label: 'Rider Profile', icon: User },
        ];
      case 'RESTAURANT_STAFF':
        return [
          { href: '/restaurant/kitchen', label: 'Kitchen Prep', icon: Utensils },
          { href: '/restaurant/menu', label: 'Menu Editor', icon: ClipboardList },
          { href: '/restaurant/settings', label: 'Branch Config', icon: Settings },
        ];
      case 'ADMIN':
        return [
          { href: '/admin/dashboard', label: 'System Overview', icon: LayoutDashboard },
          { href: '/admin/tenants', label: 'Verify Tenants', icon: ShieldAlert },
        ];
      case 'CUSTOMER':
      default:
        return [
          { href: '/customer/dashboard', label: 'Order Foods', icon: Utensils },
          { href: '/customer/history', label: 'Order History', icon: ClipboardList },
        ];
    }
  };

  const links = getLinksForRole();

  if (!user) return null;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Brand Logo Header */}
      <div className="h-16 px-6 border-b border-slate-800 flex items-center gap-2">
        <div className="w-7 h-7 rounded bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
          MM
        </div>
        <span className="font-bold tracking-tight text-slate-100 text-sm">MenuMile Portal</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                isActive
                  ? 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-500 pl-2.5'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User Footer Profile & Sign Out */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold text-slate-300 uppercase">
            {user.name ? user.name.slice(0, 2) : 'US'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-200 truncate leading-none">
              {user.name || 'User'}
            </p>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block mt-1">
              {user.role.replace('_', ' ')}
            </span>
          </div>
        </div>

        <button
          onClick={() => logout()}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-slate-800 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 text-slate-400 rounded-lg text-xs font-medium transition cursor-pointer"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
