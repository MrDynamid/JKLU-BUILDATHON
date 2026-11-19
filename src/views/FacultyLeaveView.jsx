import React from 'react';
import { 
  RotateCcw, 
  Sparkles, 
  UserCheck, 
  UserX, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Calendar,
  ExternalLink,
  ArrowLeftRight,
  CalendarClock
} from 'lucide-react';

function getInitials(name = '') {
  const parts = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, '').trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (parts[0]?.[0] || 'F').toUpperCase();
}

export function FacultyLeaveView({
  facultyList,
  onToggleLeave,
  onResetAllLeave,
  unlockedRoomsList,
  selectedDay = 'Monday',
  onOpenTimetable,
  onOpenExchangeModal
}) {
  const onLeaveCount = facultyList.filter(f => f.onLeave).length;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200/90 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight font-sans">
              Faculty on Leave & Slot Reallocation
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {selectedDay} Roster
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Mark professors on leave for {selectedDay} to immediately unlock their classrooms for other classes, or reschedule and exchange sessions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Teacher Class Exchange Trigger */}
          <button
            type="button"
            onClick={() => onOpenExchangeModal && onOpenExchangeModal(null)}
            className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
            <span>Exchange Classes</span>
          </button>

          {/* Global Timetable Window Trigger */}
          <button
            type="button"
            onClick={() => onOpenTimetable && onOpenTimetable(null)}
            className="px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50 rounded-lg border border-zinc-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>Campus Timetable</span>
          </button>

          {onLeaveCount > 0 && (
            <button
              type="button"
              onClick={onResetAllLeave}
              className="px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50 rounded-lg border border-zinc-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
              <span>Reset All</span>
            </button>
          )}
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facultyList.map((faculty) => {
          const isOnLeave = faculty.onLeave;
          const assignedDaySlots = Array.isArray(faculty.assignedSlots)
            ? faculty.assignedSlots
            : (faculty.assignedSlots?.[selectedDay] || []);

          const initials = getInitials(faculty.name);

          return (
            <div
              key={faculty.id}
              className={`p-4 rounded-2xl border transition-all duration-200 bg-white shadow-2xs flex flex-col justify-between ${
                isOnLeave 
                  ? 'border-amber-300 ring-2 ring-amber-200/60 bg-amber-50/15' 
                  : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div>
                {/* Professor Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {/* Modern Avatar with Initials */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 select-none shadow-2xs ${
                      isOnLeave 
                        ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                        : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}>
                      {initials}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-zinc-900 font-sans leading-tight">
                          {faculty.name}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5 leading-snug">
                        {faculty.course} · <span className="text-zinc-400">{faculty.department}</span>
                      </p>

                      <div className="mt-1.5 flex items-center gap-2 text-[11px]">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-semibold border ${
                          isOnLeave 
                            ? 'bg-amber-50 text-amber-900 border-amber-200' 
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isOnLeave ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                          <span>{isOnLeave ? 'On Leave Today' : 'Present on Campus'}</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => onOpenTimetable && onOpenTimetable(faculty.id)}
                          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline flex items-center gap-1 cursor-pointer ml-1"
                        >
                          <ExternalLink className="w-3 h-3 text-blue-500" />
                          <span>Timetable</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* iOS Style Presence Toggle Switch */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleLeave(faculty.id)}
                      aria-pressed={isOnLeave}
                      title={isOnLeave ? 'Click to mark Present' : 'Click to mark On Leave'}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        isOnLeave ? 'bg-amber-500' : 'bg-zinc-300 hover:bg-zinc-400'
                      }`}
                    >
                      <span className="sr-only">Toggle Leave</span>
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                          isOnLeave ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className="text-[9px] font-bold tracking-wider text-zinc-400 uppercase">
                      {isOnLeave ? 'ON LEAVE' : 'PRESENT'}
                    </span>
                  </div>
                </div>

                {/* Scheduled Class Slots for Selected Day */}
                <div className="mt-4 pt-3 border-t border-zinc-100 space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                    <span>Scheduled Slots for {selectedDay} ({assignedDaySlots.length})</span>
                    {isOnLeave && (
                      <span className="text-amber-800 font-bold normal-case bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                        Classrooms Unlocked
                      </span>
                    )}
                  </div>

                  {assignedDaySlots.length === 0 ? (
                    <div className="text-xs text-zinc-400 italic py-2 text-center bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200">
                      No scheduled lectures or labs for {selectedDay}.
                    </div>
                  ) : (
                    assignedDaySlots.map((slot, sIdx) => {
                      const batchTag = slot.course?.includes('Sec')
                        ? slot.course.match(/Sec\s*[A-J]/i)?.[0]
                        : (slot.batch || 'General');

                      return (
                        <div
                          key={sIdx}
                          className={`p-2.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                            isOnLeave 
                              ? 'bg-amber-50/70 text-amber-950 border-amber-200/90' 
                              : 'bg-zinc-50/70 text-zinc-800 border-zinc-200/70 hover:bg-white hover:border-zinc-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Room Badge */}
                            <span className="font-bold font-mono px-2 py-0.5 rounded-md bg-white text-zinc-900 border border-zinc-200 text-xs shadow-2xs shrink-0">
                              {slot.roomId}
                            </span>

                            {/* Time Badge */}
                            <div className="flex items-center gap-1 font-semibold text-zinc-600 shrink-0 text-[11px]">
                              <Clock className="w-3 h-3 text-zinc-400" />
                              <span>{slot.time}</span>
                            </div>

                            {/* Course Title & Batch */}
                            <div className="truncate">
                              <span className="font-semibold text-zinc-900 truncate">
                                {slot.course}
                              </span>
                              {batchTag && (
                                <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                                  {batchTag}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                            {/* Exchange Button */}
                            <button
                              type="button"
                              onClick={() => onOpenExchangeModal && onOpenExchangeModal({
                                ...slot,
                                mode: 'exchange',
                                day: selectedDay,
                                teacher: faculty.name,
                                facultyId: faculty.id,
                                batch: batchTag
                              })}
                              title="Exchange this slot with another faculty member"
                              className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 active:bg-blue-200 text-blue-700 border border-blue-200/90 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                            >
                              <ArrowLeftRight className="w-3 h-3 text-blue-600" />
                              <span>Exchange</span>
                            </button>

                            {/* Reschedule Button */}
                            <button
                              type="button"
                              onClick={() => onOpenExchangeModal && onOpenExchangeModal({
                                ...slot,
                                mode: 'reschedule',
                                day: selectedDay,
                                teacher: faculty.name,
                                facultyId: faculty.id,
                                batch: batchTag
                              })}
                              title="Pick a clash-free alternative slot or custom time"
                              className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-900 border border-purple-200/90 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                            >
                              <CalendarClock className="w-3 h-3 text-purple-700" />
                              <span>Reschedule</span>
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Unlocked Rooms Summary Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-zinc-900 font-sans">
              Real-Time Freed Slots Summary ({selectedDay})
            </h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            {unlockedRoomsList.length} Classroom Slots Freed
          </span>
        </div>

        {unlockedRoomsList.length === 0 ? (
          <div className="p-8 text-center text-xs text-zinc-400">
            <CheckCircle2 className="w-6 h-6 text-zinc-300 mx-auto mb-1.5" />
            <p className="font-medium text-zinc-600">All faculty members are currently marked present on {selectedDay}.</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Toggle any professor above to simulate an emergency leave and watch their room instantly turn green!
            </p>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {unlockedRoomsList.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-zinc-900 font-sans">{item.roomId}</span>
                    <span className="text-[10px] text-zinc-400">({item.building})</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 truncate max-w-[170px]">{item.course}</div>
                  <div className="text-[10px] text-amber-800 font-semibold mt-0.5">{item.teacher}</div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-900 text-xs block">{item.timeSlot}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-200/70 text-amber-900 mt-0.5 inline-block">
                    Freed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyLeaveView;
