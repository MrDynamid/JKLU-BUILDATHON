import React, { useState, useMemo } from 'react';
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
  CalendarClock,
  Search,
  Filter,
  X,
  Plus
} from 'lucide-react';
import { DAYS_OF_WEEK } from '../data/campusData';

function getInitials(name = '') {
  const parts = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, '').trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (parts[0]?.[0] || 'F').toUpperCase();
}

const DEPT_CATEGORIES = [
  { id: 'all', label: 'All Faculty', count: 28 },
  { id: 'cse', label: 'Computer Science', match: 'Computer Science', count: 5 },
  { id: 'ee', label: 'Electrical Eng', match: 'Electrical', count: 7 },
  { id: 'math', label: 'Mathematics', match: 'Math', count: 7 },
  { id: 'physics', label: 'Physics', match: 'Physics', count: 2 },
  { id: 'comm', label: 'Communication & IKS', match: 'Communication', count: 4 },
  { id: 'design', label: 'Design & EVS', match: 'Design|Environmental', count: 3 }
];

export function FacultyLeaveView({
  facultyList = [],
  onToggleLeave,
  onResetAllLeave,
  unlockedRoomsList = [],
  selectedDay = 'Monday',
  onSelectDay,
  onOpenTimetable,
  onOpenExchangeModal,
  onBookVenue
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'leave' | 'present'

  const onLeaveCount = facultyList.filter(f => f.onLeave).length;
  const presentCount = facultyList.length - onLeaveCount;

  // Filtered faculty list
  const filteredFaculty = useMemo(() => {
    return facultyList.filter(f => {
      // 1. Department Filter
      if (selectedDept !== 'all') {
        const cat = DEPT_CATEGORIES.find(c => c.id === selectedDept);
        if (cat) {
          const reg = new RegExp(cat.match, 'i');
          if (!reg.test(f.department)) return false;
        }
      }

      // 2. Status Filter
      if (statusFilter === 'leave' && !f.onLeave) return false;
      if (statusFilter === 'present' && f.onLeave) return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(q);
        const matchesDept = (f.department || '').toLowerCase().includes(q);
        const matchesCourse = (f.course || '').toLowerCase().includes(q);
        const daySlots = Array.isArray(f.assignedSlots) 
          ? f.assignedSlots 
          : (f.assignedSlots?.[selectedDay] || []);
        const matchesSlot = daySlots.some(s => 
          (s.roomId || '').toLowerCase().includes(q) || 
          (s.course || '').toLowerCase().includes(q) ||
          (s.batch || '').toLowerCase().includes(q)
        );
        return matchesName || matchesDept || matchesCourse || matchesSlot;
      }

      return true;
    });
  }, [facultyList, selectedDept, statusFilter, searchQuery, selectedDay]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-4 font-sans">
      {/* Top Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
              Faculty Leave & Class Reallocation Suite
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {facultyList.length} Faculty Members
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-1 max-w-2xl">
            Toggle a professor's attendance to immediately unlock their assigned classrooms for student bookings, or perform seamless class exchanges and conflict-free rescheduling.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onOpenExchangeModal && onOpenExchangeModal(null)}
            className="px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
            <span>Exchange Classes</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenTimetable && onOpenTimetable(null)}
            className="px-3.5 py-2 text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50 rounded-xl border border-zinc-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>Campus Timetable</span>
          </button>

          {onLeaveCount > 0 && (
            <button
              type="button"
              onClick={onResetAllLeave}
              className="px-3.5 py-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>Reset All ({onLeaveCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Day Selector Strip */}
      <div className="bg-white p-3 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>Select Day:</span>
          </span>
          <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-50 p-1">
            {DAYS_OF_WEEK.map(day => {
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onSelectDay && onSelectDay(day)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/60'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-xs">Viewing:</span>
          <span className="font-bold text-zinc-800 bg-zinc-100 px-2.5 py-0.5 rounded-lg border border-zinc-200">
            {selectedDay} Schedule
          </span>
          {unlockedRoomsList.length > 0 && (
            <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>{unlockedRoomsList.length} Rooms Freed</span>
            </span>
          )}
        </div>
      </div>

      {/* Quick Filters Sub-Bar: Department Pills + Live Search + Status Pills */}
      <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-3">
        {/* Department Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {DEPT_CATEGORIES.map(cat => {
              const isSelected = selectedDept === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedDept(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 text-white shadow-2xs'
                      : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200/70'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
          </div>

          {/* Status Quick Filter Pills */}
          <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 text-xs font-medium shrink-0">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                statusFilter === 'all' ? 'bg-white font-bold text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All ({facultyList.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('leave')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'leave' ? 'bg-amber-500 font-bold text-white shadow-2xs' : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusFilter === 'leave' ? 'bg-white' : 'bg-amber-500'}`} />
              <span>On Leave ({onLeaveCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('present')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === 'present' ? 'bg-emerald-600 font-bold text-white shadow-2xs' : 'text-emerald-800 hover:text-emerald-950'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusFilter === 'present' ? 'bg-white' : 'bg-emerald-500'}`} />
              <span>Present ({presentCount})</span>
            </button>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search faculty by name, department, course title, or room number..."
            className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-zinc-200 focus:border-zinc-900 focus:outline-hidden bg-zinc-50/50 hover:bg-white focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
        <span>Showing <strong>{filteredFaculty.length}</strong> of {facultyList.length} faculty members</span>
        <span className="text-zinc-400">Semester 1 Timetable</span>
      </div>

      {/* Faculty Cards Grid */}
      {filteredFaculty.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-zinc-200 shadow-2xs">
          <UserX className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-zinc-700">No faculty members found</p>
          <p className="text-xs text-zinc-400 mt-1">Try adjusting your department filter, status toggle, or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredFaculty.map((faculty) => {
            const isOnLeave = faculty.onLeave;
            const initials = getInitials(faculty.name);

            // Get slots for currently selected day
            const assignedDaySlots = Array.isArray(faculty.assignedSlots)
              ? faculty.assignedSlots
              : (faculty.assignedSlots?.[selectedDay] || []);

            return (
              <div
                key={faculty.id}
                className={`rounded-2xl border p-4.5 transition-all duration-200 shadow-xs flex flex-col justify-between ${
                  isOnLeave
                    ? 'bg-amber-50/30 border-amber-300 ring-2 ring-amber-200/60'
                    : 'bg-white border-zinc-200/90 hover:border-zinc-300'
                }`}
              >
                <div>
                  {/* Faculty Header Row */}
                  <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-zinc-100">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Initials Avatar */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                        isOnLeave 
                          ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                          : 'bg-zinc-100 text-zinc-800 border border-zinc-200'
                      }`}>
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-zinc-900 text-sm tracking-tight truncate">
                            {faculty.name}
                          </h3>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              isOnLeave
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            {isOnLeave ? 'ON LEAVE' : 'PRESENT'}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 truncate mt-0.5">
                          {faculty.course} · {faculty.department}
                        </p>
                      </div>
                    </div>

                    {/* Attendance Toggle Switch */}
                    <div className="flex flex-col items-end shrink-0">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={!isOnLeave}
                        onClick={() => onToggleLeave(faculty.id)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                          !isOnLeave ? 'bg-emerald-600' : 'bg-zinc-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            !isOnLeave ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                      <span className="text-[10px] text-zinc-400 mt-1 font-semibold uppercase tracking-wider">
                        {!isOnLeave ? 'Present' : 'Leave'}
                      </span>
                    </div>
                  </div>

                  {/* Timetable Link & Status Bar */}
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-3 px-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isOnLeave ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                      <span className="font-medium">
                        {isOnLeave ? `On Leave (${selectedDay})` : 'Present on Campus'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenTimetable && onOpenTimetable(faculty.id, null)}
                      className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 transition-colors cursor-pointer text-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>View Timetable</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>

                  {/* Scheduled Slots for Currently Selected Day */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Scheduled Slots for {selectedDay} ({assignedDaySlots.length})</span>
                      {isOnLeave && assignedDaySlots.length > 0 && (
                        <span className="text-amber-800 font-bold lowercase text-[10px]">
                          all classrooms freed today
                        </span>
                      )}
                    </div>

                    {assignedDaySlots.length === 0 ? (
                      <div className="text-xs text-zinc-400 italic py-2.5 text-center bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200">
                        No scheduled lectures or labs for {selectedDay}.
                      </div>
                    ) : (
                      assignedDaySlots.map((slot, sIdx) => {
                        const batchTag = slot.batch || (slot.course?.includes('Sec')
                          ? slot.course.match(/Sec\s*[A-J]/i)?.[0]
                          : 'General');

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
                              {isOnLeave ? (
                                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-300">
                                  Freed Slot
                                </span>
                              ) : (
                                <>
                                  {/* Exchange Button (Blue) */}
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

                                  {/* Reschedule Button (Royal Purple) */}
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
                                </>
                              )}
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
      )}

      {/* Live Unlocked Rooms Summary Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-zinc-900">
              Real-Time Freed Classroom Slots ({selectedDay})
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
              Toggle any professor above to simulate an emergency leave and watch their room instantly turn available on the campus map!
            </p>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {unlockedRoomsList.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs hover:border-amber-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-zinc-900 font-mono">{item.roomId}</span>
                    <span className="text-[10px] text-zinc-400">({item.building})</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 truncate max-w-[170px]">{item.course}</div>
                  <div className="text-[10px] text-amber-800 font-semibold mt-0.5">{item.teacher}</div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span className="font-mono font-bold text-amber-900 text-xs block">{item.timeSlot}</span>
                  <button
                    type="button"
                    onClick={() => onBookVenue && onBookVenue({ id: item.roomId, name: item.roomId, building: item.building }, item.timeSlot)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200/80 hover:bg-amber-300 text-amber-950 flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  >
                    <Plus className="w-2.5 h-2.5" />
                    <span>Book</span>
                  </button>
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
