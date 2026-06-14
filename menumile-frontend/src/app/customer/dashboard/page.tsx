'use client';

import React from 'react';
import { Utensils, Star, Clock } from 'lucide-react';

export default function CustomerDashboardPage() {
  const restaurants = [
    { id: '1', name: 'Gourmet Grillhouse', rating: '4.8', prepTime: '20-30 min', category: 'American, Steaks' },
    { id: '2', name: 'Bella Italia', rating: '4.6', prepTime: '25-35 min', category: 'Italian, Pizza' },
    { id: '3', name: 'Matcha & Sweet', rating: '4.9', prepTime: '10-15 min', category: 'Beverages, Desserts' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-400">Order from certified multi-tenant kitchen outlets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700/80 transition duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Utensils size={18} />
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10">
                  <Star size={12} className="fill-amber-400" />
                  {restaurant.rating}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-200">{restaurant.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{restaurant.category}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock size={12} />
                {restaurant.prepTime}
              </span>

              <button className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-lg transition cursor-pointer">
                Order Online
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
