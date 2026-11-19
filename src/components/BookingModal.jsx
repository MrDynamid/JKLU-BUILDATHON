import React, { useEffect, useRef, useState, useMemo } from 'react';
import { X, CheckCircle2, AlertTriangle, Clock, Calendar, Users, Building, ShieldAlert } from 'lucide-react';
import { TIME_SLOTS } from '../data/campusData';
import { CustomSelect } from './CustomSelect';

export function BookingModal({
  isOpen,
  onClose,
  venue,
  defaultStartTime,
  targetBatch,
  onSubmitBooking,
  roomSchedule = {},
  facultyList = [],
  selectedDay = 'Monday',
  weeklyTimetableState = {},
  allVenues = [],
  onSwitchVenue
}) {
  const dialogRef = useRef(null);
  const [purpose, setPurpose] = useState('Extra Lecture / Tutorial');
  const [customNote, setCustomNote] = useState('');
  const [startTime, setStartTime] = useState(defaultStartTime || '11:00');
  const [duration, setDuration] = useState('1');
  const [batchName, setBatchName] = useState('Sec A');
  const [selectedSections, setSelectedSections] = useState(['Sec A']);
  const [attendees, setAttendees] = useState(venue?.capacity || 60);
  const [organizerName, setOrganizerName] = useState('Prof. A. Kumar (Dept. of CSE)');
  const [isPermanent, setIsPermanent] = useState(false);

  const AVAILABLE_SECTIONS = ['Sec A', 'Sec B', 'Sec C', 'Sec D', 'Sec E', 'Sec F', 'Sec G', 'Sec H', 'Sec I', 'Sec J'];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // Synchronize section and attendee count on open
    let initialSec = 'Sec A';
    if (targetBatch && targetBatch !== 'General' && targetBatch !== 'None / General Workshop') {
      const match = targetBatch.match(/Sec\s+[A-J]/i);
      initialSec = match ? match[0] : targetBatch;
    } else if (venue?.homeSection && venue.homeSection.startsWith('Sec ')) {
      initialSec = venue.homeSection;
    }

    setSelectedSections([initialSec]);
    setBatchName(initialSec);
    setAttendees(60);

    if (defaultStartTime) {
      setStartTime(defaultStartTime);
    }
  }, [isOpen, venue, defaultStartTime, targetBatch]);

  // Helper to get slot status
  const getSlotStatus = (slotId) => {
    if (!venue || !roomSchedule) return { isFree: true, label: 'Available', color: 'emerald' };
    const slotData = roomSchedule[slotId];
    if (!slotData || slotData.status === 'free') {
      return { isFree: true, label: slotId === '12:00' ? 'Lunch Break (Available)' : 'Available', color: 'emerald' };
    }
    if (slotData.status === 'booked') {
      return { isFree: false, label: 'Reserved / Booked', color: 'slate', course: slotData.title || 'Reserved' };
    }
    if (slotData.facultyId) {
      const fac = facultyList.find(f => f.id === slotData.facultyId);
      if (fac && fac.onLeave) {
        return { isFree: true, isUnlocked: true, label: `Faculty on Leave (${fac.name})`, color: 'amber' };
      }
    }
    return { 
      isFree: false, 
      label: `Occupied: ${slotData.title || 'Class'}${slotData.teacher ? ` (${slotData.teacher})` : ''}`,
      course: slotData.title,
      teacher: slotData.teacher,
      color: 'rose'
    };
  };

  const handleToggleSection = (sec) => {
    setSelectedSections(prev => {
      let next;
      if (prev.includes(sec)) {
        next = prev.filter(s => s !== sec);
        if (next.length === 0) next = [sec];
      } else {
        next = [...prev, sec];
      }
      setBatchName(next.join(' + '));
      setAttendees(next.length * 60);
      return next;
    });
  };

  // Evaluate the selected booking window for conflicts
  const windowEvaluation = useMemo(() => {
    const startIdx = TIME_SLOTS.findIndex(s => s.id === startTime);
    const durationNum = parseInt(duration, 10);
    const checkedSlots = [];
    const conflicts = [];

    // Capacity check
    const isOverCapacity = attendees > (venue?.capacity || 60);
    if (isOverCapacity) {
      conflicts.push({
        slot: { label: 'Room Capacity' },
        status: { 
          label: `Headcount (${attendees} students) exceeds venue capacity (${venue?.capacity} seats). Merge requires high-capacity venue like IET Amphitheatre (200 seats).` 
        }
      });
    }

    const dayTimetable = weeklyTimetableState[selectedDay] || {};

    for (let i = 0; i < durationNum; i++) {
      const currentSlot = TIME_SLOTS[startIdx + i];
      if (currentSlot) {
        const status = getSlotStatus(currentSlot.id);
        checkedSlots.push({ slot: currentSlot, status });
        if (!status.isFree) {
          conflicts.push({ slot: currentSlot, status });
        }

        // Dual-Schedule Sync: check if any of the selected sections already have a class in another room
        selectedSections.forEach(sec => {
          Object.entries(dayTimetable).forEach(([rId, sched]) => {
            const roomSlot = sched[currentSlot.id];
            if (roomSlot && roomSlot.status === 'occupied' && roomSlot.batch) {
              if (roomSlot.batch.includes(sec) && rId !== venue?.id) {
                conflicts.push({
                  slot: currentSlot,
                  status: {
                    label: `Section Clash: ${sec} already has "${roomSlot.title || 'Class'}" in ${rId}`
                  }
                });
              }
            }
          });
        });
      } else {
        conflicts.push({ 
          slot: { label: 'After 5 PM' }, 
          status: { label: 'Outside campus operating hours (Campus closes at 5:00 PM)' } 
        });
      }
    }

    return {
      hasConflict: conflicts.length > 0,
      conflicts,
      checkedSlots
    };
  }, [startTime, duration, roomSchedule, facultyList, venue, attendees, selectedSections, selectedDay, weeklyTimetableState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (windowEvaluation.hasConflict) return; // Prevent booking occupied slot

    const durationNum = parseInt(duration, 10);
    const startHourNum = parseInt(startTime.split(':')[0], 10);
    const endHourNum = startHourNum + durationNum;

    const formatHour = (h) => {
      if (h === 12) return '12:00 PM';
      if (h > 12) return `${(h - 12).toString().padStart(2, '0')}:00 PM`;
      return `${h.toString().padStart(2, '0')}:00 AM`;
    };

    const timeSlotLabel = `${formatHour(startHourNum)} – ${formatHour(endHourNum)} (${durationNum}h)`;

    onSubmitBooking({
      id: `req-${Date.now().toString().slice(-4)}`,
      roomId: venue.id,
      roomName: venue.name,
      day: selectedDay,
      timeSlot: timeSlotLabel,
      startTime,
      duration: durationNum,
      purpose: customNote ? `${purpose}: ${customNote}` : purpose,
      requestedBy: organizerName,
      requestedAt: 'Just now',
      batch: batchName,
      capacity: attendees,
      status: 'pending',
      isPermanent,
      isMergedSections: selectedSections.length > 1,
      mergedSections: selectedSections
    });

    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="booking-dialog-title"
      className="m-auto p-0 rounded-2xl bg-white shadow-2xl border border-zinc-200 max-w-lg w-full text-zinc-900 backdrop:bg-zinc-900/50 backdrop:backdrop-blur-xs open:animate-in open:fade-in open:zoom-in-95 duration-150"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold px-2 py-0.5 rounded-md bg-zinc-900 text-white font-sans">
                {venue?.id}
              </span>
              <h2 id="booking-dialog-title" className="text-base font-bold text-zinc-900 font-sans">
                Request Venue Booking
              </h2>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              {venue?.name} · {venue?.building} {venue?.floorLabel} · {venue?.capacity} seats ({venue?.type})
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Schedule Strip: Visual Slot Availability Picker (9 AM to 5 PM) */}
        <div className="mt-4 p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-800 mb-2">
            <span>Room Availability (9 AM – 5 PM)</span>
            <span className="text-[10px] text-zinc-400 font-normal">Click an available slot to select</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
            {TIME_SLOTS.map((slot) => {
              const status = getSlotStatus(slot.id);
              const isSelected = slot.id === startTime;

              let chipClass = 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200';
              if (status.color === 'rose') {
                chipClass = 'bg-rose-100 text-rose-800 border-rose-300 opacity-80';
              } else if (status.color === 'amber') {
                chipClass = 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200';
              } else if (status.color === 'slate') {
                chipClass = 'bg-zinc-200 text-zinc-600 border-zinc-300 opacity-60';
              }

              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setStartTime(slot.id)}
                  title={`${slot.label}: ${status.label}`}
                  className={`px-1.5 py-1 text-center rounded text-[11px] font-semibold border transition-all cursor-pointer ${chipClass} ${
                    isSelected ? 'ring-2 ring-zinc-900 ring-offset-1 font-bold' : ''
                  }`}
                >
                  <div className="text-[10px] leading-tight">{slot.label}</div>
                  <div className="text-[9px] font-medium truncate mt-0.5">
                    {slot.id === '12:00' ? (status.isFree ? 'Lunch Break' : (status.course || 'Reserved')) : (status.isFree ? (status.isUnlocked ? 'Faculty on Leave' : 'Available') : 'Occupied')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conflict / Availability Alert */}
        <div className="mt-3">
          {windowEvaluation.hasConflict ? (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-rose-950">Cannot Book Occupied Slot:</strong>
                <ul className="mt-1 space-y-0.5 list-disc list-inside text-rose-800 text-[11px]">
                  {windowEvaluation.conflicts.map((c, i) => (
                    <li key={i}>
                      <strong>{c.slot.label}:</strong> {c.status.label}
                    </li>
                  ))}
                </ul>
                <p className="mt-1 text-[11px] text-rose-700 font-medium">
                  Please pick another start time or adjust duration to avoid overlapping with scheduled classes.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Verified Available:</strong> All requested slots ({startTime} for {duration}h) are completely free.
              </span>
            </div>
          )}
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Start Time
              </label>
              <CustomSelect
                value={startTime}
                onChange={setStartTime}
                options={TIME_SLOTS.map((s) => {
                  const status = getSlotStatus(s.id);
                  let statusDescription = 'Available';
                  if (!status.isFree) {
                    statusDescription = 'Occupied';
                  } else if (status.isUnlocked) {
                    statusDescription = 'Faculty on Leave (Available)';
                  }
                  return {
                    value: s.id,
                    label: `${s.label} (${s.id === '12:00' ? 'Lunch' : statusDescription})`,
                    badge: status.isUnlocked ? 'Freed' : (!status.isFree ? 'Occupied' : null)
                  };
                })}
                className="w-full"
                buttonClassName="py-2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Duration
              </label>
              <CustomSelect
                value={duration}
                onChange={setDuration}
                options={[
                  { value: '1', label: '1 Hour' },
                  { value: '2', label: '2 Hours' },
                  { value: '3', label: '3 Hours' },
                  { value: '4', label: '4 Hours' }
                ]}
                className="w-full"
                buttonClassName="py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Purpose
            </label>
            <CustomSelect
              value={purpose}
              onChange={setPurpose}
              options={[
                { value: 'Extra Lecture / Remedial Class', label: 'Extra Lecture / Remedial Class' },
                { value: 'Technical Workshop / Bootcamp', label: 'Technical Workshop / Bootcamp' },
                { value: 'Hackathon Mentorship & Sprint', label: 'Hackathon Mentorship & Sprint' },
                { value: 'Guest Lecture & Industry Talk', label: 'Guest Lecture & Industry Talk' },
                { value: 'Student Society / Club Meeting', label: 'Student Society / Club Meeting' }
              ]}
              className="w-full"
              buttonClassName="py-2 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Topic / Note
            </label>
            <input
              type="text"
              placeholder="e.g. Operating Systems Lab Session / AI Workshop"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:border-zinc-900 focus:outline-hidden"
            />
          </div>

          {/* Scope Toggle: One-Time vs Permanent Master Timetable */}
          <div className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="font-bold text-zinc-900 block font-sans">
                Booking Schedule Scope
              </span>
              <span className="text-zinc-500 text-[11px]">
                One-time session override vs recurring semester master timetable commit.
              </span>
            </div>
            <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-0.5 shadow-2xs shrink-0">
              <button
                type="button"
                onClick={() => setIsPermanent(false)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  !isPermanent ? 'bg-zinc-900 text-white shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Today Only
              </button>
              <button
                type="button"
                onClick={() => setIsPermanent(true)}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  isPermanent ? 'bg-indigo-600 text-white shadow-2xs' : 'text-indigo-700 hover:text-indigo-900'
                }`}
              >
                Permanent Master
              </button>
            </div>
          </div>

          {/* Combined Multi-Section Lecture Mode (2+ Sections Merged) */}
          <div className="p-3 rounded-xl border border-zinc-200 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-zinc-800 flex items-center gap-1.5 font-sans">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Section Selector (Merge Sections)</span>
              </label>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                selectedSections.length > 1 
                  ? 'bg-purple-100 text-purple-900 border border-purple-200' 
                  : 'bg-zinc-100 text-zinc-700'
              }`}>
                {selectedSections.length > 1 ? `${selectedSections.length} Sections Merged (${attendees} Seats)` : 'Single Section (60 Seats)'}
              </span>
            </div>

            {/* Quick-toggle section pills */}
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_SECTIONS.map(sec => {
                const isSelected = selectedSections.includes(sec);
                return (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => handleToggleSection(sec)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    {sec}
                  </button>
                );
              })}
            </div>

            {/* Capacity scaling indicator & High-Capacity venue recommendation */}
            {attendees > (venue?.capacity || 60) ? (
              <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-amber-950 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Capacity Warning: {attendees} attendees exceed {venue?.id} ({venue?.capacity} seats)</span>
                  </div>
                  <div className="text-[11px] text-amber-800 mt-0.5">
                    Merged sections require high-capacity venue (e.g. 200-seater IET Amphitheatre).
                  </div>
                </div>
                {onSwitchVenue && (
                  <button
                    type="button"
                    onClick={() => onSwitchVenue('IET-AMP')}
                    className="px-2.5 py-1 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-md shadow-2xs transition-colors shrink-0 cursor-pointer"
                  >
                    Switch to IET-AMP (200 Seats)
                  </button>
                )}
              </div>
            ) : selectedSections.length > 1 ? (
              <div className="mt-1.5 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Capacity Fit:</strong> {venue?.name} ({venue?.capacity} seats) accommodates merged headcount ({attendees} students).
                </span>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Target Section(s)
              </label>
              <input
                type="text"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                placeholder="e.g. Sec A or Sec A + Sec B"
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:border-zinc-900 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Expected Attendees
              </label>
              <input
                type="number"
                min="1"
                max={venue?.capacity || 200}
                value={attendees}
                onChange={(e) => setAttendees(parseInt(e.target.value, 10) || 60)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:border-zinc-900 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Organizer / Professor Name
            </label>
            <input
              type="text"
              value={organizerName}
              onChange={(e) => setOrganizerName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:border-zinc-900 focus:outline-hidden"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">
              Submitted to Admin Gate for governance confirmation
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={windowEvaluation.hasConflict}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  windowEvaluation.hasConflict
                    ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800 cursor-pointer shadow-xs'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${windowEvaluation.hasConflict ? 'text-zinc-400' : 'text-emerald-400'}`} />
                <span>{windowEvaluation.hasConflict ? 'Occupied (Cannot Book)' : 'Submit Request'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}
