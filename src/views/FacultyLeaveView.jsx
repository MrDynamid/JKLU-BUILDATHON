import React from 'react';
import { RotateCcw, Sparkles, UserCheck, UserX, Clock, MapPin, CheckCircle2, Calendar } from 'lucide-react';

export function FacultyLeaveView({
  facultyList,
  onToggleLeave,
  onResetAllLeave,
  unlockedRoomsList,
  selectedDay = 'Monday'
}) {
  const onLeaveCount = facultyList.filter(f => f.onLeave).length;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200/90 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight font-sans">
              Live Faculty on Leave Slot Unlocker
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {selectedDay} Roster
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Mark professors on leave for {selectedDay} to watch their scheduled classrooms immediately unlock in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onLeaveCount > 0 && (
            <button
              type="button"
              onClick={onResetAllLeave}
              className="px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50 rounded-lg border border-zinc-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
              <span>Reset All to Present</span>
            </button>
          )}
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {facultyList.map((faculty) => {
          const isOnLeave = faculty.onLeave;
          const assignedDaySlots = Array.isArray(faculty.assignedSlots)
            ? faculty.assignedSlots
            : (faculty.assignedSlots?.[selectedDay] || []);

          return (
            <div
              key={faculty.id}
              className={`p-4 rounded-2xl border transition-all duration-200 bg-white shadow-2xs ${
                isOnLeave 
                  ? 'border-amber-300 ring-2 ring-amber-200/70 bg-amber-50/20' 
                  : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                    isOnLeave ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-700'
                  }`}>
                    {isOnLeave ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 font-sans">
                      {faculty.name}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      {faculty.course} · {faculty.department}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isOnLeave ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                      <span className={`text-[11px] font-semibold ${isOnLeave ? 'text-amber-800' : 'text-emerald-700'}`}>
                        {isOnLeave ? 'On Leave Today (Slots Freed)' : 'Present on Campus'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Prominent Toggle Switch */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleLeave(faculty.id)}
                    aria-pressed={isOnLeave}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      isOnLeave ? 'bg-amber-500' : 'bg-zinc-300'
                    }`}
                  >
                    <span className="sr-only">Toggle Leave</span>
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                        isOnLeave ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-[10px] font-bold text-zinc-400">
                    {isOnLeave ? 'ON LEAVE' : 'PRESENT'}
                  </span>
                </div>
              </div>

              {/* Scheduled Class Slots for Selected Day */}
              <div className="mt-3.5 pt-3 border-t border-zinc-100 space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  Scheduled Slots for {selectedDay}
                </div>
                {assignedDaySlots.length === 0 ? (
                  <div className="text-xs text-zinc-400 italic py-1">
                    No scheduled lectures or labs for {selectedDay}.
                  </div>
                ) : (
                  assignedDaySlots.map((slot, sIdx) => (
                    <div
                      key={sIdx}
                      className={`flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg border transition-all ${
                        isOnLeave 
                          ? 'bg-amber-50 text-amber-950 border-amber-200/80 font-medium' 
                          : 'bg-zinc-50 text-zinc-700 border-zinc-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-900 font-sans">{slot.roomId}</span>
                        <span className="text-zinc-500 truncate">{slot.course}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-600 font-semibold shrink-0">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        <span>{slot.time}</span>
                        {isOnLeave && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-zinc-950 ml-1">
                            Freed
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
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
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-500 font-semibold text-[11px] bg-zinc-50">
                  <th className="py-2.5 px-4">Room No.</th>
                  <th className="py-2.5 px-4">Building</th>
                  <th className="py-2.5 px-4">Time Window</th>
                  <th className="py-2.5 px-4">Assigned Faculty</th>
                  <th className="py-2.5 px-4">Original Subject</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans">
                {unlockedRoomsList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-zinc-900">{item.roomId}</td>
                    <td className="py-2.5 px-4 text-zinc-600">{item.building}</td>
                    <td className="py-2.5 px-4 font-semibold text-emerald-700">{item.timeSlot}</td>
                    <td className="py-2.5 px-4 text-zinc-800">{item.teacher}</td>
                    <td className="py-2.5 px-4 text-zinc-500">{item.course}</td>
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
