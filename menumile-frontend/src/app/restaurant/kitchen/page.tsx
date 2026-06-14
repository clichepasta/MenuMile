'use client';

import React, { useState } from 'react';
import { ChefHat, Clock, Check, ChevronRight, Play, CheckCircle2 } from 'lucide-react';

interface MockTask {
  id: string;
  orderId: string;
  tableOrAddress: string;
  item: string;
  notes?: string;
  quantity: number;
  station: 'Grills' | 'Beverages' | 'Bakery' | 'Salads';
  status: 'PENDING' | 'COOKING' | 'COMPLETED';
}

export default function KitchenPrepPage() {
  const [tasks, setTasks] = useState<MockTask[]>([
    { id: 't1', orderId: '#1092', tableOrAddress: 'Table 4', item: 'Prime Ribeye Steak', quantity: 2, notes: 'Medium Rare, extra butter', station: 'Grills', status: 'PENDING' },
    { id: 't2', orderId: '#1092', tableOrAddress: 'Table 4', item: 'Loaded Baked Potato', quantity: 2, station: 'Grills', status: 'PENDING' },
    { id: 't3', orderId: '#1093', tableOrAddress: 'Delivery (1.2mi)', item: 'Spicy Chicken Burger', quantity: 1, notes: 'No mayo', station: 'Grills', status: 'COOKING' },
    { id: 't4', orderId: '#1093', tableOrAddress: 'Delivery (1.2mi)', item: 'Iced Matcha Latte', quantity: 1, notes: 'Oat milk', station: 'Beverages', status: 'COMPLETED' },
    { id: 't5', orderId: '#1094', tableOrAddress: 'Table 9', item: 'Chocolate Lava Cake', quantity: 1, station: 'Bakery', status: 'PENDING' },
    { id: 't6', orderId: '#1094', tableOrAddress: 'Table 9', item: 'Espresso Double Shot', quantity: 2, station: 'Beverages', status: 'COOKING' },
  ]);

  const stations: ('Grills' | 'Beverages' | 'Bakery' | 'Salads')[] = ['Grills', 'Beverages', 'Bakery', 'Salads'];
  const [selectedStation, setSelectedStation] = useState<'Grills' | 'Beverages' | 'Bakery' | 'Salads'>('Grills');

  const handleStatusUpdate = (taskId: string, newStatus: 'PENDING' | 'COOKING' | 'COMPLETED') => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => task.station === selectedStation);
  };

  const currentTasks = getFilteredTasks();

  return (
    <div className="space-y-6">
      {/* Station Selector Bar */}
      <div className="flex border-b border-slate-800 gap-1 overflow-x-auto pb-px">
        {stations.map(station => {
          const count = tasks.filter(t => t.station === station && t.status !== 'COMPLETED').length;
          const isSelected = selectedStation === station;

          return (
            <button
              key={station}
              onClick={() => setSelectedStation(station)}
              className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider transition cursor-pointer border-b-2 flex items-center gap-2 whitespace-nowrap ${
                isSelected
                  ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
              }`}
            >
              <ChefHat size={14} />
              {station}
              {count > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-orange-600 text-[10px] text-white font-bold">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending (To-Do) Section */}
        <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>To Prepare</span>
            <span className="text-xs font-normal text-slate-500">
              {currentTasks.filter(t => t.status === 'PENDING').length} Items
            </span>
          </h3>

          <div className="space-y-3">
            {currentTasks.filter(t => t.status === 'PENDING').length === 0 ? (
              <p className="text-xs text-slate-600 text-center py-6">No pending items.</p>
            ) : (
              currentTasks
                .filter(t => t.status === 'PENDING')
                .map(task => (
                  <div key={task.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-amber-500">{task.orderId}</span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock size={11} /> {task.tableOrAddress}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-200">
                        {task.quantity}x {task.item}
                      </h4>
                      {task.notes && <p className="text-xs text-orange-400 mt-1 italic">Note: {task.notes}</p>}
                    </div>

                    <button
                      onClick={() => handleStatusUpdate(task.id, 'COOKING')}
                      className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Play size={12} /> Start Cooking
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Cooking Section */}
        <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Cooking</span>
            <span className="text-xs font-normal text-slate-500">
              {currentTasks.filter(t => t.status === 'COOKING').length} Items
            </span>
          </h3>

          <div className="space-y-3">
            {currentTasks.filter(t => t.status === 'COOKING').length === 0 ? (
              <p className="text-xs text-slate-600 text-center py-6">No items currently cooking.</p>
            ) : (
              currentTasks
                .filter(t => t.status === 'COOKING')
                .map(task => (
                  <div key={task.id} className="p-4 bg-slate-900 border border-amber-500/20 rounded-xl space-y-3 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 animate-pulse" />
                    
                    <div className="flex justify-between text-xs pl-1">
                      <span className="font-bold text-amber-500">{task.orderId}</span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock size={11} /> {task.tableOrAddress}
                      </span>
                    </div>

                    <div className="pl-1">
                      <h4 className="text-sm font-bold text-slate-200">
                        {task.quantity}x {task.item}
                      </h4>
                      {task.notes && <p className="text-xs text-orange-400 mt-1 italic">Note: {task.notes}</p>}
                    </div>

                    <button
                      onClick={() => handleStatusUpdate(task.id, 'COMPLETED')}
                      className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Check size={14} /> Mark Completed
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Completed Section */}
        <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Completed</span>
            <span className="text-xs font-normal text-slate-500">
              {currentTasks.filter(t => t.status === 'COMPLETED').length} Items
            </span>
          </h3>

          <div className="space-y-3">
            {currentTasks.filter(t => t.status === 'COMPLETED').length === 0 ? (
              <p className="text-xs text-slate-600 text-center py-6">No completed items.</p>
            ) : (
              currentTasks
                .filter(t => t.status === 'COMPLETED')
                .map(task => (
                  <div key={task.id} className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2 opacity-60">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-500">{task.orderId}</span>
                      <span className="text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 size={11} /> Ready
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-400 line-through">
                        {task.quantity}x {task.item}
                      </h4>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
