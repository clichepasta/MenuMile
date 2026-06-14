'use client';

import React from 'react';
import { 
  useAvailableShifts, 
  useRiderShifts, 
  useClaimShift, 
  useDropShift,
  ShiftSlot 
} from '@/features/scheduling/hooks/useShifts';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function RiderShiftsPage() {
  const { data: availableShifts, isLoading: loadingAvailable, refetch: refetchAvailable } = useAvailableShifts();
  const { data: claimedShifts, isLoading: loadingClaimed, refetch: refetchClaimed } = useRiderShifts();

  const claimShiftMutation = useClaimShift();
  const dropShiftMutation = useDropShift();

  // Fallback demo data if the API returns empty/errors (great for local dev/demoing)
  const defaultAvailable: ShiftSlot[] = [
    { id: 101, startTime: '2026-06-15T08:00:00Z', endTime: '2026-06-15T12:00:00Z', isClaimed: false, region: 'Downtown Core' },
    { id: 102, startTime: '2026-06-15T12:30:00Z', endTime: '2026-06-15T16:30:00Z', isClaimed: false, region: 'Downtown Core' },
    { id: 103, startTime: '2026-06-16T17:00:00Z', endTime: '2026-06-16T21:00:00Z', isClaimed: false, region: 'Metro East' },
    { id: 104, startTime: '2026-06-17T09:00:00Z', endTime: '2026-06-17T15:00:00Z', isClaimed: false, region: 'West Suburbs' },
  ];

  const defaultClaimed: ShiftSlot[] = [
    { id: 201, startTime: '2026-06-14T07:00:00Z', endTime: '2026-06-14T11:00:00Z', isClaimed: true, region: 'Downtown Core' },
  ];

  const activeAvailable = availableShifts && availableShifts.length > 0 ? availableShifts : defaultAvailable;
  const activeClaimed = claimedShifts && claimedShifts.length > 0 ? claimedShifts : defaultClaimed;

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleClaim = (id: number) => {
    claimShiftMutation.mutate(id);
  };

  const handleDrop = (id: number) => {
    if (confirm('Are you sure you want to drop this claimed shift slot?')) {
      dropShiftMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Manage your shifts, claim open slots, and keep track of your active schedule.</p>
        </div>
        <button
          onClick={() => {
            refetchAvailable();
            refetchClaimed();
          }}
          className="self-start px-3.5 py-1.5 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
        >
          <RefreshCw size={13} />
          Sync Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Shifts List (Main Area) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <CalendarIcon size={18} className="text-amber-500" />
            Open Shift Slots
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeAvailable.map((shift) => (
              <div
                key={shift.id}
                className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-xl hover:border-slate-700/80 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700/60 rounded text-[10px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                      <MapPin size={10} className="text-amber-500" />
                      {shift.region}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{formatDate(shift.startTime)}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-200 font-semibold text-sm mb-6">
                    <Clock size={15} className="text-slate-400" />
                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                  </div>
                </div>

                <button
                  onClick={() => handleClaim(shift.id)}
                  disabled={claimShiftMutation.isPending}
                  className="w-full py-2 bg-slate-800 hover:bg-amber-500 hover:text-white border border-slate-700 hover:border-amber-400 text-slate-200 text-xs font-semibold rounded-lg transition cursor-pointer"
                >
                  Claim Shift
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Claimed Shifts Sidebar Summary */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <CheckCircle size={18} className="text-emerald-500" />
            Your Claims
          </h2>

          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-850 rounded-2xl p-5 space-y-4">
            {activeClaimed.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <AlertCircle size={28} className="mx-auto mb-2 text-slate-600" />
                <p className="text-xs">No claimed shifts for this period.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeClaimed.map((shift) => (
                  <div
                    key={shift.id}
                    className="p-4 bg-slate-950/80 border border-emerald-500/10 rounded-xl relative overflow-hidden group"
                  >
                    {/* Decorative border line */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />

                    <div className="flex justify-between items-start mb-2 pl-2">
                      <p className="text-xs font-semibold text-slate-300">{formatDate(shift.startTime)}</p>
                      <button
                        onClick={() => handleDrop(shift.id)}
                        disabled={dropShiftMutation.isPending}
                        className="text-[10px] text-red-400 hover:text-red-300 font-semibold transition cursor-pointer"
                      >
                        Drop
                      </button>
                    </div>

                    <div className="pl-2">
                      <p className="text-sm font-bold text-slate-200">
                        {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                      </p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin size={10} />
                        {shift.region}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="pt-2 border-t border-slate-800/80">
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Riders must claim open shifts at least 2 hours before the start. Dropping a claimed shift within 12 hours of the start time may affect scheduling metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
