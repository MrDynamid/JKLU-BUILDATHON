import React from 'react';
import { Check, X, Lock, CheckCircle2, ShieldCheck, Clock, Users, Building } from 'lucide-react';
import confetti from 'canvas-confetti';

export function AdminGateView({
  bookings,
  onApproveBooking,
  onRejectBooking,
  totalVenues,
  freeVenuesCount,
  unlockedSlotsCount,
  pendingCount
}) {
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const approvedBookings = bookings.filter(b => b.status === 'approved');

  const handleApprove = (bookingId) => {
    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    } catch (e) {}
    onApproveBooking(bookingId);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-5 font-sans">
      {/* Header */}
      <div className="border-b border-zinc-200/90 pb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight font-sans">
            Admin Approval Gate & Campus Overview
          </h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
            Human-in-the-Loop Governance
          </span>
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">
          Review, approve, or reject reservation requests. Approved bookings automatically lock slots on the campus master schedule.
        </p>
      </div>

      {/* 4 Quick Campus Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
          <div className="text-xs text-zinc-500 font-medium">Total Venues</div>
          <div className="text-2xl font-bold text-zinc-900 mt-1 font-sans">{totalVenues}</div>
          <div className="text-[11px] text-zinc-400 mt-0.5">EB1, EB2, TB & IET</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
          <div className="text-xs text-zinc-500 font-medium">Currently Available</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1 font-sans">{freeVenuesCount}</div>
          <div className="text-[11px] text-emerald-700/80 mt-0.5 font-medium">Available for booking</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
          <div className="text-xs text-zinc-500 font-medium">Faculty on Leave</div>
          <div className="text-2xl font-bold text-amber-600 mt-1 font-sans">{unlockedSlotsCount}</div>
          <div className="text-[11px] text-amber-700/80 mt-0.5 font-medium">Slots freed today</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
          <div className="text-xs text-zinc-500 font-medium">Pending Approvals</div>
          <div className="text-2xl font-bold text-zinc-900 mt-1 font-sans">{pendingCount}</div>
          <div className="text-[11px] text-zinc-400 mt-0.5">Awaiting human review</div>
        </div>
      </div>

      {/* Pending Requests Queue */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-500" />
            <h3 className="text-sm font-bold text-zinc-900 font-sans">
              Pending Requests Queue ({pendingBookings.length})
            </h3>
          </div>
          <span className="text-[11px] text-zinc-400">
            Click Approve to commit to timetable
          </span>
        </div>

        {pendingBookings.length === 0 ? (
          <div className="p-10 text-center text-xs text-zinc-400">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-zinc-700">All caught up! No pending booking requests.</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              New requests submitted from the Venue Finder tab will appear here for governance.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {pendingBookings.map((req) => (
              <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-zinc-50/50 transition-colors">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200 font-sans">
                      {req.roomId}
                    </span>
                    <span className="font-bold text-zinc-900 font-sans text-sm">{req.purpose}</span>
                    <span className="text-zinc-300">·</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {req.day ? `${req.day} · ` : ''}{req.timeSlot}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1 flex flex-wrap items-center gap-2 font-sans">
                    <span>Organizer: <strong>{req.requestedBy}</strong></span>
                    <span>·</span>
                    <span>Batch: {req.batch}</span>
                    <span>·</span>
                    <span>{req.capacity} attendees</span>
                    <span>·</span>
                    <span className="text-zinc-400">{req.requestedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => onRejectBooking(req.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:text-rose-700 hover:bg-rose-50 rounded-lg border border-zinc-200 transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprove(req.id)}
                    className="px-3.5 py-1.5 text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Approve & Lock</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmed / Locked Bookings Log */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-zinc-700" />
            <h3 className="text-sm font-bold text-zinc-900 font-sans">
              Locked Timetable Reservations ({approvedBookings.length})
            </h3>
          </div>
          <span className="text-[11px] text-zinc-400">
            Master timetable commitments
          </span>
        </div>

        {approvedBookings.length === 0 ? (
          <div className="p-6 text-center text-xs text-zinc-400">
            No bookings approved yet today.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-500 font-semibold text-[11px] bg-zinc-50">
                  <th className="py-2.5 px-4">Room No.</th>
                  <th className="py-2.5 px-4">Time Window</th>
                  <th className="py-2.5 px-4">Event Purpose</th>
                  <th className="py-2.5 px-4">Organizer</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans">
                {approvedBookings.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-zinc-900">{item.roomId}</td>
                    <td className="py-2.5 px-4 font-semibold text-zinc-700">{item.day ? `${item.day} · ` : ''}{item.timeSlot}</td>
                    <td className="py-2.5 px-4 text-zinc-800 font-medium">{item.purpose}</td>
                    <td className="py-2.5 px-4 text-zinc-500">{item.requestedBy}</td>
                    <td className="py-2.5 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 w-fit">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Locked</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
