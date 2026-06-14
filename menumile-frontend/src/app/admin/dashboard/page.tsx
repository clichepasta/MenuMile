'use client';

import React from 'react';
import { Shield, Users, Building, Activity, BellRing } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { name: 'Active Restaurants', value: '18', icon: Building, color: 'text-amber-500 bg-amber-500/10' },
    { name: 'Delivery Partners', value: '42', icon: Users, color: 'text-orange-500 bg-orange-500/10' },
    { name: 'Pending Onboarding', value: '4', icon: BellRing, color: 'text-red-400 bg-red-500/10' },
    { name: 'System Status', value: 'Operational', icon: Activity, color: 'text-emerald-400 bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.name}</p>
                <h3 className="text-2xl font-bold text-slate-100 mt-2">{stat.value}</h3>
              </div>
              <div className={`p-3.5 rounded-xl ${stat.color}`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tenant Verification Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Shield size={16} className="text-amber-500" />
          Recent Restaurant Registrations
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4">Restaurant Name</th>
                <th className="pb-3 px-4">Contact</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              <tr className="text-slate-350">
                <td className="py-3.5 pr-4 font-semibold text-slate-200">Bakehouse Deli</td>
                <td className="py-3.5 px-4 text-xs font-mono">contact@bakehouse.com</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-semibold uppercase">
                    Pending
                  </span>
                </td>
                <td className="py-3.5 pl-4 text-right">
                  <button className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-medium cursor-pointer transition">
                    Review FSSAI
                  </button>
                </td>
              </tr>
              <tr className="text-slate-350">
                <td className="py-3.5 pr-4 font-semibold text-slate-200">The Pizzeria (Branch 2)</td>
                <td className="py-3.5 px-4 text-xs font-mono">hq@pizzeria.co</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-semibold uppercase">
                    Approved
                  </span>
                </td>
                <td className="py-3.5 pl-4 text-right text-xs text-slate-500">
                  Approved 2h ago
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
