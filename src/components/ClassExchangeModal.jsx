import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  ArrowLeftRight, 
  Zap, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  User,
  Building,
  RotateCcw
} from 'lucide-react';
import { TIME_SLOTS, DAYS_OF_WEEK } from '../data/campusData';
import { findOptimalRescheduleOption, findTopRescheduleOptions } from '../utils/aiReasoning';
import { CustomSelect } from './CustomSelect';

// Helper to extract clean section key (e.g., 'Sec A', 'Sec B')
function getSlotSection(slot) {
  if (!slot) return null;
  const str = `${slot.batch || ''} ${slot.course || ''} ${slot.title || ''}`;
  const match = str.match(/Sec\s*([A-J])/i);
  return match ? `Sec ${match[1].toUpperCase()}` : (slot.batch || null);
}

export function ClassExchangeModal({
  isOpen,
  onClose,
  initialSlot = null,
  facultyList = [],
  weeklyTimetableState = {},
  venues = [],
  onConfirmExchange,
  onConfirmReschedule
}) {
  const [activeTab, setActiveTab] = useState('exchange'); // 'exchange' | 'reschedule'

  // Teacher A state
  const [facultyAId, setFacultyAId] = useState(facultyList[0]?.id || 'fac-1');
  const [selectedSlotAIndex, setSelectedSlotAIndex] = useState(0);

  // Teacher B state
  const [facultyBId, setFacultyBId] = useState(facultyList[1]?.id || 'fac-2');
  const [selectedSlotBIndex, setSelectedSlotBIndex] = useState(0);

  // Reschedule custom destination state
  const [targetDay, setTargetDay] = useState('Monday');
  const [targetTime, setTargetTime] = useState('11:00');
  const [targetRoomId, setTargetRoomId] = useState(venues[0]?.id || 'EB1-101');
  const [isPermanent, setIsPermanent] = useState(false);

  // Sync initial slot when opened
  useEffect(() => {
    if (initialSlot && isOpen) {
      if (initialSlot.mode) {
        setActiveTab(initialSlot.mode);
      }
      if (initialSlot.facultyId) {
        setFacultyAId(initialSlot.facultyId);
      } else if (initialSlot.teacher) {
        const found = facultyList.find(f => f.name === initialSlot.teacher);
        if (found) setFacultyAId(found.id);
      }
      if (initialSlot.day) setTargetDay(initialSlot.day);
      if (initialSlot.time) setTargetTime(initialSlot.time);
      if (initialSlot.roomId) setTargetRoomId(initialSlot.roomId);
    }
  }, [initialSlot, isOpen, facultyList]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const facultyA = useMemo(() => {
    return facultyList.find(f => f.id === facultyAId) || facultyList[0];
  }, [facultyList, facultyAId]);

  // Extract all slots for a given faculty member across the week
  const getFacultyWeeklySlots = (faculty) => {
    if (!faculty) return [];
    const assigned = faculty.assignedSlots || {};
    const slots = [];

    DAYS_OF_WEEK.forEach(day => {
      const daySlots = Array.isArray(assigned) 
        ? assigned 
        : (assigned[day] || []);

      daySlots.forEach(s => {
        slots.push({
          ...s,
          day,
          teacher: faculty.name,
          facultyId: faculty.id,
          batch: s.course?.includes('Sec') ? s.course.match(/Sec\s*[A-J]/i)?.[0] : (s.batch || 'General')
        });
      });
    });

    return slots;
  };

  const slotsA = useMemo(() => getFacultyWeeklySlots(facultyA), [facultyA]);

  // Set default slot indices if out of bounds
  useEffect(() => {
    if (selectedSlotAIndex >= slotsA.length) {
      setSelectedSlotAIndex(0);
    }
  }, [slotsA, selectedSlotAIndex]);

  const activeSlotA = slotsA[selectedSlotAIndex] || slotsA[0] || initialSlot;
  const targetSection = useMemo(() => getSlotSection(activeSlotA), [activeSlotA]);

  // Restrict Teacher B candidates ONLY to faculty teaching in the same mutual section
  const eligibleFacultyBList = useMemo(() => {
    return facultyList.filter(f => {
      if (f.id === facultyAId) return false;
      if (!targetSection) return true;
      const fSlots = getFacultyWeeklySlots(f);
      return fSlots.some(s => getSlotSection(s) === targetSection);
    });
  }, [facultyList, facultyAId, targetSection]);

  // Auto-switch facultyBId if current is not in mutual section candidates
  useEffect(() => {
    if (eligibleFacultyBList.length > 0) {
      if (!eligibleFacultyBList.some(f => f.id === facultyBId)) {
        setFacultyBId(eligibleFacultyBList[0].id);
        setSelectedSlotBIndex(0);
      }
    }
  }, [eligibleFacultyBList, facultyBId]);

  const facultyB = useMemo(() => {
    return facultyList.find(f => f.id === facultyBId) || eligibleFacultyBList[0] || null;
  }, [facultyList, facultyBId, eligibleFacultyBList]);

  // Filter Teacher B's classes to ONLY those belonging to the mutual section
  const slotsB = useMemo(() => {
    if (!facultyB) return [];
    const allSlots = getFacultyWeeklySlots(facultyB);
    if (!targetSection) return allSlots;
    return allSlots.filter(s => getSlotSection(s) === targetSection);
  }, [facultyB, targetSection]);

  useEffect(() => {
    if (selectedSlotBIndex >= slotsB.length) {
      setSelectedSlotBIndex(0);
    }
  }, [slotsB, selectedSlotBIndex]);

  const activeSlotB = slotsB[selectedSlotBIndex] || slotsB[0];

  // Conflict and Mutual Section Validation
  const conflictReport = useMemo(() => {
    if (!activeSlotA) {
      return { hasClash: true, message: 'Please select a class for Teacher A.' };
    }
    if (eligibleFacultyBList.length === 0) {
      return { 
        hasClash: true, 
        message: `⛔ Mutual Section Lock: No other faculty members currently teach classes in ${targetSection || 'this section'} to exchange with.` 
      };
    }
    if (!activeSlotB) {
      return { 
        hasClash: true, 
        message: `Please select a matching class in mutual section ${targetSection} for ${facultyB?.name || 'Teacher B'}.` 
      };
    }

    const secA = getSlotSection(activeSlotA);
    const secB = getSlotSection(activeSlotB);

    if (secA && secB && secA !== secB) {
      return {
        hasClash: true,
        message: `⛔ Mutual Section Rule: Exchange restricted to classes within the exact same section (${secA} ≠ ${secB}).`
      };
    }

    // Check if Teacher A already has another class at Teacher B's day and time
    const profAClash = slotsA.some(s => 
      s !== activeSlotA && s.day === activeSlotB.day && s.time === activeSlotB.time
    );

    // Check if Teacher B already has another class at Teacher A's day and time
    const allSlotsOfB = facultyB ? getFacultyWeeklySlots(facultyB) : [];
    const profBClash = allSlotsOfB.some(s => 
      s !== activeSlotB && s.day === activeSlotA.day && s.time === activeSlotA.time
    );

    if (profAClash && profBClash) {
      return { 
        hasClash: true, 
        message: `Both ${facultyA?.name} and ${facultyB?.name} have conflicting commitments at these respective hours.` 
      };
    }
    if (profAClash) {
      return { 
        hasClash: true, 
        message: `${facultyA?.name} already teaches another class on ${activeSlotB.day} at ${activeSlotB.time}.` 
      };
    }
    if (profBClash) {
      return { 
        hasClash: true, 
        message: `${facultyB?.name} already teaches another class on ${activeSlotA.day} at ${activeSlotA.time}.` 
      };
    }

    return { 
      hasClash: false, 
      message: `✓ Mutual Section Confirmed (${secA}): Both professors are ready to swap.` 
    };
  }, [activeSlotA, activeSlotB, slotsA, facultyB, facultyA, targetSection, eligibleFacultyBList]);

  // AI Recommended optimal clash-free reschedule slots for activeSlotA
  const topRescheduleOptions = useMemo(() => {
    if (!activeSlotA) return [];
    return findTopRescheduleOptions({
      slot: activeSlotA,
      day: activeSlotA.day || targetDay,
      weeklyTimetableState,
      facultyList,
      venues,
      limit: 3
    });
  }, [activeSlotA, targetDay, weeklyTimetableState, facultyList, venues]);

  const aiRecommendedReschedule = topRescheduleOptions[0] || null;

  // Availability check for custom target room/time
  const customSlotStatus = useMemo(() => {
    if (targetTime === '12:00') {
      return { isFree: false, label: 'Campus Lunch Break (12–1 PM)' };
    }
    const dayTimetable = weeklyTimetableState[targetDay] || {};
    const roomSlot = dayTimetable[targetRoomId]?.[targetTime];
    const isFree = !roomSlot || roomSlot.status === 'free';
    if (isFree) {
      return { isFree: true, label: '✓ Room is Free & Available for Booking' };
    }
    return { isFree: false, label: `⚠️ Occupied: ${roomSlot.title || 'Class'} (${roomSlot.teacher || 'Assigned'})` };
  }, [weeklyTimetableState, targetDay, targetRoomId, targetTime]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-zinc-900/60 backdrop-blur-xs font-sans animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border border-zinc-200/90 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 bg-zinc-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100/70 text-blue-800">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 tracking-tight">
                Exchange class
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="flex items-center bg-zinc-200/70 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('exchange')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'exchange' ? 'bg-white text-zinc-900 shadow-2xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
                <span>Exchange with Faculty</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reschedule')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'reschedule' ? 'bg-white text-zinc-900 shadow-2xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-purple-600" />
                <span>Relocate / Reschedule</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === 'exchange' ? (
            /* TAB 1: TEACHER CLASS EXCHANGE */
            <div className="space-y-4">
              {/* Teacher Selector Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column 1: Teacher A */}
                <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>Teacher A (Initiator)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                      {slotsA.length} Classes
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-600 block mb-1">
                      Select Faculty Member:
                    </label>
                    <CustomSelect
                      value={facultyAId}
                      onChange={(val) => {
                        setFacultyAId(val);
                        setSelectedSlotAIndex(0);
                      }}
                      options={facultyList.map(f => ({
                        value: f.id,
                        label: `${f.name} — ${f.course}`
                      }))}
                      className="w-full"
                      buttonClassName="p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-600 block mb-1">
                      Choose Class to Exchange:
                    </label>
                    {slotsA.length === 0 ? (
                      <div className="text-xs text-zinc-400 italic p-3 bg-white rounded-lg border border-zinc-200">
                        No scheduled classes found for this professor.
                      </div>
                    ) : (
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {slotsA.map((slot, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedSlotAIndex(idx)}
                            className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                              selectedSlotAIndex === idx
                                ? 'bg-blue-50/80 border-blue-400 ring-1 ring-blue-300 font-semibold'
                                : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-zinc-900">{slot.day} · {slot.time}</span>
                              <div className="flex items-center gap-1">
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                                  {getSlotSection(slot) || 'General'}
                                </span>
                                <span className="px-1.5 py-0.5 bg-zinc-100 rounded text-[10px] font-mono font-bold text-zinc-700">
                                  {slot.roomId}
                                </span>
                              </div>
                            </div>
                            <div className="text-[11px] text-zinc-600 mt-0.5 truncate">
                              {slot.course}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Column 2: Teacher B */}
                <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>Teacher B (Exchange Partner)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold">
                      {slotsB.length} Classes in {targetSection || 'Mutual'}
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-600 block mb-1">
                      Faculty Teaching in Mutual Section ({targetSection || 'General'}):
                    </label>
                    {eligibleFacultyBList.length === 0 ? (
                      <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                        No other faculty members currently teach in mutual section {targetSection}.
                      </div>
                    ) : (
                      <CustomSelect
                        value={facultyBId}
                        onChange={(val) => {
                          setFacultyBId(val);
                          setSelectedSlotBIndex(0);
                        }}
                        options={eligibleFacultyBList.map(f => ({
                          value: f.id,
                          label: `${f.name} — ${f.course}`
                        }))}
                        className="w-full"
                        buttonClassName="p-2 bg-white"
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-600 block mb-1">
                      Choose Mutual Section Class ({targetSection || 'All'}):
                    </label>
                    {slotsB.length === 0 ? (
                      <div className="text-xs text-zinc-400 italic p-3 bg-white rounded-lg border border-zinc-200">
                        {targetSection 
                          ? `No classes found for this professor in mutual section ${targetSection}.`
                          : 'No scheduled classes found for this professor.'}
                      </div>
                    ) : (
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {slotsB.map((slot, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedSlotBIndex(idx)}
                            className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                              selectedSlotBIndex === idx
                                ? 'bg-purple-50/80 border-purple-400 ring-1 ring-purple-300 font-semibold'
                                : 'bg-white border-zinc-200 hover:border-zinc-300 text-zinc-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-zinc-900">{slot.day} · {slot.time}</span>
                              <div className="flex items-center gap-1">
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                                  {getSlotSection(slot) || targetSection}
                                </span>
                                <span className="px-1.5 py-0.5 bg-zinc-100 rounded text-[10px] font-mono font-bold text-zinc-700">
                                  {slot.roomId}
                                </span>
                              </div>
                            </div>
                            <div className="text-[11px] text-zinc-600 mt-0.5 truncate">
                              {slot.course}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: RELOCATE / RESCHEDULE */
            <div className="space-y-5">
              {/* Current Selected Class Card */}
              <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/60 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Class Being Rescheduled
                  </span>
                  <div className="text-sm font-bold text-zinc-900 mt-0.5">
                    {activeSlotA?.course || 'Selected Lecture'}
                  </div>
                  <div className="text-xs text-zinc-600 mt-1 flex flex-wrap items-center gap-2.5">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-zinc-400" />{activeSlotA?.teacher || facultyA?.name}</span>
                    <span className="text-zinc-300">•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-zinc-400" />{activeSlotA?.roomId}</span>
                    <span className="text-zinc-300">•</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-zinc-400" />{activeSlotA?.day || targetDay} at {activeSlotA?.time || targetTime}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-zinc-200 text-zinc-700 font-bold">
                    Section: {activeSlotA?.batch || 'General'}
                  </span>
                </div>
              </div>

              {/* Permanent vs Temporary Toggle */}
              <div className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div>
                  <span className="font-bold text-zinc-900 block font-sans">
                    Schedule Scope
                  </span>
                  <span className="text-zinc-500 text-[11px]">
                    Choose whether this change applies only today or permanently updates the semester timetable.
                  </span>
                </div>
                <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5 shadow-2xs shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsPermanent(false)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      !isPermanent ? 'bg-zinc-900 text-white shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    Today Only (One-Time)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPermanent(true)}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isPermanent ? 'bg-indigo-600 text-white shadow-2xs' : 'text-indigo-700 hover:text-indigo-900'
                    }`}
                  >
                    <span>Permanent Master Update</span>
                  </button>
                </div>
              </div>

              {/* Option 1: Top 3 Clash-Free Alternative Slots */}
              <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-purple-950 font-sans">
                      Top Clash-Free Alternative Slots (Schedule Scan)
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900">
                    Mutual Free Scan
                  </span>
                </div>

                {topRescheduleOptions && topRescheduleOptions.length > 0 ? (
                  <div className="space-y-2">
                    {topRescheduleOptions.map((opt, idx) => (
                      <div 
                        key={idx}
                        className="p-3 bg-white rounded-xl border border-zinc-200 hover:border-purple-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-900">
                              Option #{idx + 1}
                            </span>
                            <span className="font-bold text-zinc-900 font-sans">
                              {opt.venue.name} ({opt.venue.building})
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              opt.isZeroDelay 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                : opt.badgeType === 'floor-transit'
                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                : 'bg-zinc-100 text-zinc-700'
                            }`}>
                              {opt.walkLabel || (opt.isZeroDelay ? '0 min walk · Same Floor' : 'Clash-Free')}
                            </span>
                          </div>
                          <div className="text-[11px] text-zinc-500 mt-1 flex flex-wrap items-center gap-2.5">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-zinc-400" /><strong>{opt.day}</strong> at <strong>{opt.time}</strong></span>
                            <span className="text-zinc-300">•</span>
                            <span className="flex items-center gap-1"><Users className="w-3 h-3 text-zinc-400" />{opt.venue.capacity} seats</span>
                            <span className="text-zinc-300">•</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-zinc-400" />Lunch Break (12–1 PM)</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            onConfirmReschedule({
                              slot: activeSlotA,
                              targetDay: opt.day,
                              targetTime: opt.time,
                              targetRoomId: opt.venue.id,
                              isPermanent
                            });
                            onClose();
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors shrink-0"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5" />
                          <span>Select This Slot</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-zinc-500 italic p-2 bg-white rounded-lg border border-zinc-200">
                    No automatic clash-free recommendations found. You can pick a custom slot below.
                  </div>
                )}
              </div>

              {/* Option 2: Custom Target Room & Time Selector */}
              <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-3">
                <span className="text-xs font-bold text-zinc-800 block">
                  Or Pick a Custom Target Day, Time & Room:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-zinc-600 font-semibold block mb-1">Target Day:</label>
                    <CustomSelect
                      value={targetDay}
                      onChange={setTargetDay}
                      options={DAYS_OF_WEEK.map(d => ({ value: d, label: d }))}
                      className="w-full"
                      buttonClassName="p-2 bg-zinc-50 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-600 font-semibold block mb-1">Target Time:</label>
                    <CustomSelect
                      value={targetTime}
                      onChange={setTargetTime}
                      options={TIME_SLOTS.map(t => ({
                        value: t.id,
                        label: `${t.label} (${t.range}) ${t.isLunch ? '· Lunch' : ''}`,
                        disabled: t.isLunch
                      }))}
                      className="w-full"
                      buttonClassName="p-2 bg-zinc-50 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-600 font-semibold block mb-1">Target Venue:</label>
                    <CustomSelect
                      value={targetRoomId}
                      onChange={setTargetRoomId}
                      options={venues.map(v => ({
                        value: v.id,
                        label: `${v.name} (${v.type}, ${v.capacity}s)`
                      }))}
                      className="w-full"
                      buttonClassName="p-2 bg-zinc-50 font-bold"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-zinc-100">
                  <span className={`font-semibold ${customSlotStatus.isFree ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {customSlotStatus.label}
                  </span>

                  <button
                    type="button"
                    disabled={!customSlotStatus.isFree}
                    onClick={() => {
                      onConfirmReschedule({
                        slot: activeSlotA,
                        targetDay,
                        targetTime,
                        targetRoomId,
                        isPermanent
                      });
                      onClose();
                    }}
                    className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                      customSlotStatus.isFree
                        ? 'bg-zinc-900 hover:bg-zinc-800 text-white'
                        : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    }`}
                  >
                    Confirm Move to {targetRoomId}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs">
          <div className="text-zinc-500">
            {activeTab === 'exchange' ? (
              conflictReport.hasClash ? (
                <span className="text-amber-700 font-semibold">{conflictReport.message}</span>
              ) : (
                <span>Swapping slots updates both professors' schedules and room matrix in real-time.</span>
              )
            ) : (
              <span>Relocating moves the class to the selected open classroom slot.</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-100 font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {activeTab === 'exchange' && (
              <button
                type="button"
                disabled={!activeSlotA || !activeSlotB || conflictReport.hasClash}
                onClick={() => {
                  onConfirmExchange({ slotA: activeSlotA, slotB: activeSlotB, isPermanent });
                  onClose();
                }}
                className={`px-4 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                  activeSlotA && activeSlotB && !conflictReport.hasClash
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>Confirm Class Exchange</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassExchangeModal;