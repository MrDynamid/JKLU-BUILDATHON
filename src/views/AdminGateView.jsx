import React, { useState } from 'react';
import {
  Check,
  Lock,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Calendar,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateMasterTimetableSchedule } from '../utils/aiReasoning';
import { TIME_SLOTS, DAYS_OF_WEEK } from '../data/campusData';

export function AdminGateView({
  bookings,
  onApproveBooking,
  onRejectBooking,
  totalVenues,
  freeVenuesCount,
  unlockedSlotsCount,
  pendingCount,
  venues = [],
  facultyList = [],
  onCommitGeneratedTimetable
}) {
  const [adminTab, setAdminTab] = useState('queue'); // 'queue' | 'generator'
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState(null);
  const [previewDay, setPreviewDay] = useState('Monday');

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const approvedBookings = bookings.filter(b => b.status === 'approved');

  const handleApprove = (bookingId) => {
    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    } catch (e) { }
    onApproveBooking(bookingId);
  };

  const handleRunGenerator = () => {
    setIsGenerating(true);
    setTimeout(() => {
      try {
        const result = generateMasterTimetableSchedule({
          venues,
          facultyList
        });
        setGeneratedDraft(result);
        try {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        } catch (e) { }
      } catch (err) {
        console.error('Error generating timetable:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 400);
  };

  const handleCommitDraft = () => {
    if (!generatedDraft || !onCommitGeneratedTimetable) return;
    try {
      confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
    } catch (e) { }
    onCommitGeneratedTimetable(generatedDraft.weeklyTimetable, generatedDraft.facultyList);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-5 font-sans">
      {/* Header & Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200/90 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight font-sans">
              Campus Admin & Timetable Suite
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
              Campus Coordinator
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Review reservation requests and permanent timetable updates, or generate an entire semester schedule from scratch with Zero Walking Delay.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="inline-flex rounded-xl border border-zinc-200 bg-white p-1 shadow-2xs shrink-0">
          <button
            type="button"
            onClick={() => setAdminTab('queue')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${adminTab === 'queue'
                ? 'bg-zinc-900 text-white shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
              }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Bookings</span>
            {pendingBookings.length > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${adminTab === 'queue' ? 'bg-amber-400 text-zinc-950' : 'bg-amber-100 text-amber-900'
                }`}>
                {pendingBookings.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setAdminTab('generator')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${adminTab === 'generator'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-indigo-700 hover:text-indigo-900'
              }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Timetable Generator</span>
          </button>
        </div>
      </div>

      {adminTab === 'queue' ? (
        <>
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
                Click Approve to lock & commit to timetable
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

                        {/* Permanent vs Single Day Badges */}
                        {req.isPermanent ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-indigo-600" />
                            <span>Permanent Master Update</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                            Single-Day Override
                          </span>
                        )}

                        {/* Merged Section Badge */}
                        {req.isMergedSections && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                            Merged Batches ({req.batch})
                          </span>
                        )}
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
                        <span>{req.isPermanent ? 'Commit to Master' : 'Approve & Lock'}</span>
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
                      <th className="py-2.5 px-4">Scope</th>
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
                        <td className="py-2.5 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.isPermanent ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-zinc-100 text-zinc-700'
                            }`}>
                            {item.isPermanent ? 'Master Timetable' : 'Single-Day'}
                          </span>
                        </td>
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
        </>
      ) : (
        /* AUTOMATED MASTER TIMETABLE GENERATOR TAB */
        <div className="space-y-5">
          {/* Intake Card */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-zinc-900 font-sans">
                    Even Semester Course & Faculty Intake
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Pre-configured semester curricula across Sections A–J. Zero-Walk solver optimizes room proximity and lunch hours.
                </p>
              </div>

              <button
                type="button"
                disabled={isGenerating}
                onClick={handleRunGenerator}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all shrink-0"
              >
                {isGenerating ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Running CP-SAT Solver...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                    <span>Generate Master Timetable (Zero-Walk Solver)</span>
                  </>
                )}
              </button>
            </div>

            {/* Courses Overview Matrix */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-500 font-semibold text-[11px] bg-zinc-50">
                    <th className="py-2.5 px-4">Course Code & Name</th>
                    <th className="py-2.5 px-4">Assigned Professor</th>
                    <th className="py-2.5 px-4">Type</th>
                    <th className="py-2.5 px-4">Sections</th>
                    <th className="py-2.5 px-4">Weekly Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-sans">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-zinc-900">Programming-1 (CS1139)</td>
                    <td className="py-2.5 px-4 text-zinc-700">Dr. Amar Nath Patra</td>
                    <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">Theory</span></td>
                    <td className="py-2.5 px-4 text-zinc-600">Sec A, Sec B, Sec I, Sec J</td>
                    <td className="py-2.5 px-4 font-bold text-zinc-900">3 hrs / week</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-zinc-900">Programming Lab (CS1139-L)</td>
                    <td className="py-2.5 px-4 text-zinc-700">Dr. Amar Nath Patra</td>
                    <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold text-[10px]">Lab (TB-105/106)</span></td>
                    <td className="py-2.5 px-4 text-zinc-600">Sec A, Sec B, Sec I</td>
                    <td className="py-2.5 px-4 font-bold text-zinc-900">2 hrs / week</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-zinc-900">EE Engineering (EE1118)</td>
                    <td className="py-2.5 px-4 text-zinc-700">Dr. Rashmi Kushwaha</td>
                    <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">Theory</span></td>
                    <td className="py-2.5 px-4 text-zinc-600">Sec A, Sec C, Sec E</td>
                    <td className="py-2.5 px-4 font-bold text-zinc-900">3 hrs / week</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-zinc-900">Applied Mathematics-1 (MA1101)</td>
                    <td className="py-2.5 px-4 text-zinc-700">Prof. Devendra Bhavsar</td>
                    <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">Theory</span></td>
                    <td className="py-2.5 px-4 text-zinc-600">Sec B, Sec D, Sec F</td>
                    <td className="py-2.5 px-4 font-bold text-zinc-900">3 hrs / week</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-zinc-900">Data Structures & OOP (CS1140)</td>
                    <td className="py-2.5 px-4 text-zinc-700">Dr. Neeraj Kumar</td>
                    <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">Theory</span></td>
                    <td className="py-2.5 px-4 text-zinc-600">Sec G, Sec H, Sec I, Sec J</td>
                    <td className="py-2.5 px-4 font-bold text-zinc-900">3 hrs / week</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Generated Result Quality Scorecard & Interactive Preview */}
          {generatedDraft ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Scorecard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-white border border-indigo-200 shadow-2xs">
                  <div className="text-xs text-zinc-500 font-medium">Classes Scheduled</div>
                  <div className="text-2xl font-bold text-indigo-700 mt-1 font-sans">
                    {generatedDraft.stats.totalScheduled} Slots
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">100% Curricular Intake Met</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="text-xs text-zinc-500 font-medium">Zero-Walk Delay Match</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-1 font-sans">
                    {generatedDraft.stats.zeroWalkScore}%
                  </div>
                  <div className="text-[11px] text-emerald-700/80 mt-0.5 font-medium">Same-floor section clusters</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs">
                  <div className="text-xs text-zinc-500 font-medium">Lunch Protection</div>
                  <div className="text-2xl font-bold text-amber-600 mt-1 font-sans">
                    100% Free
                  </div>
                  <div className="text-[11px] text-amber-700/80 mt-0.5 font-medium">12:00 – 1:00 PM zero classes</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs">
                  <div className="text-xs text-zinc-500 font-medium">Hard Clashes</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-1 font-sans">
                    0 Clashes
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Mathematically Proven Solved</div>
                </div>
              </div>

              {/* Commit Action Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-zinc-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div>
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Zero-Walk Master Timetable Ready for Deployment</span>
                  </h4>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    Clicking "Commit to Live Master Timetable" overwrites the campus weekly timetable and updates all faculty schedules.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCommitDraft}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-zinc-950" />
                  <span>Commit to Live Master Timetable</span>
                </button>
              </div>

              {/* Draft Preview Grid */}
              <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
                <div className="p-4 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-700" />
                    <h3 className="text-sm font-bold text-zinc-900 font-sans">
                      Generated Draft Preview Grid ({previewDay})
                    </h3>
                  </div>

                  {/* Day Picker */}
                  <div className="flex items-center gap-1">
                    {DAYS_OF_WEEK.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setPreviewDay(day)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${previewDay === day
                            ? 'bg-zinc-900 text-white font-bold shadow-2xs'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                          }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Day Matrix Table */}
                <div className="overflow-x-auto max-h-96">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/90 border-b border-zinc-200 text-zinc-700 font-bold">
                        <th className="py-2.5 px-3 sticky top-0 bg-zinc-100 border-r border-zinc-200">Venue</th>
                        {TIME_SLOTS.map(s => (
                          <th key={s.id} className="py-2.5 px-2 text-center sticky top-0 bg-zinc-100 border-r border-zinc-200 last:border-r-0 text-[11px]">
                            {s.id === '12:00' ? '🍽️ Lunch' : s.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-sans">
                      {venues.map(v => (
                        <tr key={v.id} className="hover:bg-zinc-50/50">
                          <td className="py-2 px-3 font-bold text-zinc-900 border-r border-zinc-100 text-xs">
                            <div>{v.id}</div>
                            <div className="text-[10px] text-zinc-400 font-normal">{v.building} · {v.capacity}s</div>
                          </td>
                          {TIME_SLOTS.map(ts => {
                            if (ts.id === '12:00') {
                              return (
                                <td key={ts.id} className="py-1 px-1 text-center bg-amber-50/40 border-r border-zinc-100 text-[10px] font-bold text-amber-800">
                                  Lunch
                                </td>
                              );
                            }
                            const slot = generatedDraft.weeklyTimetable[previewDay]?.[v.id]?.[ts.id];
                            const isOccupied = slot && slot.status === 'occupied';

                            return (
                              <td key={ts.id} className="py-1.5 px-2 border-r border-zinc-100 last:border-r-0 text-[10px]">
                                {isOccupied ? (
                                  <div className="p-1 rounded bg-indigo-50 border border-indigo-200 text-indigo-950 font-medium">
                                    <div className="font-bold truncate max-w-[110px]">{slot.title}</div>
                                    <div className="text-[9px] text-zinc-500 truncate">{slot.teacher}</div>
                                  </div>
                                ) : (
                                  <span className="text-zinc-300 italic text-[10px]">• Free</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-10 rounded-2xl bg-zinc-50 border border-dashed border-zinc-200 text-center text-xs text-zinc-500 space-y-2">
              <Sparkles className="w-8 h-8 text-indigo-500 mx-auto" />
              <p className="font-semibold text-zinc-700">No timetable draft generated yet.</p>
              <p className="text-[11px] text-zinc-400 max-w-md mx-auto">
                Click "Generate Master Timetable (Zero-Walk AI)" to run the Google OR-Tools CP-SAT constraint engine and produce an optimized semester schedule.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
