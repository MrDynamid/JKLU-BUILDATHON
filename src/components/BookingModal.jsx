import React, { useEffect, useRef, useState, useMemo } from 'react';
import { X, CheckCircle2, AlertTriangle, Clock, Calendar, Users, Building, ShieldAlert } from 'lucide-react';
import { TIME_SLOTS } from '../data/campusData';

export function BookingModal({
  isOpen,
  onClose,
  venue,
  defaultStartTime,
  targetBatch,
  onSubmitBooking,
  roomSchedule = {},
  facultyList = []
}) {
  const dialogRef = useRef(null);
  const [purpose, setPurpose] = useState('Extra Lecture / Tutorial');
  const [customNote, setCustomNote] = useState('');
  const [startTime, setStartTime] = useState(defaultStartTime || '11:00');
  const [duration, setDuration] = useState('1');
  const [batchName, setBatchName] = useState(targetBatch || 'Sem 1 - Sec J');
  const [attendees, setAttendees] = useState(venue?.capacity || 60);
  const [organizerName, setOrganizerName] = useState('Prof. A. Kumar (Dept. of CSE)');

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
    if (venue) {
      setAttendees(venue.capacity || 60);
    }
    if (defaultStartTime) {
      setStartTime(defaultStartTime);
    }
    if (targetBatch && targetBatch !== 'None / General Workshop') {
      setBatchName(targetBatch);
    }
  }, [venue, defaultStartTime, targetBatch]);

  // Helper to get slot status
  const getSlotStatus = (slotId) => {
    if (!venue || !roomSchedule) return { isFree: true, label: 'Available', color: 'emerald' };
    const slotData = roomSchedule[slotId];
    if (!slotData || slotData.status === 'free') {
      return { isFree: true, label: 'Available', color: 'emerald' };
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

  // Evaluate the selected booking window for conflicts
  const windowEvaluation = useMemo(() => {
    const startIdx = TIME_SLOTS.findIndex(s => s.id === startTime);
    const durationNum = parseInt(duration, 10);
    const checkedSlots = [];
    const conflicts = [];

    for (let i = 0; i < durationNum; i++) {
      const currentSlot = TIME_SLOTS[startIdx + i];
      if (currentSlot) {
        const status = getSlotStatus(currentSlot.id);
        checkedSlots.push({ slot: currentSlot, status });
        if (!status.isFree) {
          conflicts.push({ slot: currentSlot, status });
        }
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
  }, [startTime, duration, roomSchedule, facultyList, venue]);

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
      timeSlot: timeSlotLabel,
      startTime,
      duration: durationNum,
      purpose: customNote ? `${purpose}: ${customNote}` : purpose,
      requestedBy: organizerName,
      requestedAt: 'Just now',
      batch: batchName,
      capacity: attendees,
      status: 'pending'
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
                    {status.isFree ? (status.isUnlocked ? 'On Leave' : 'Available') : 'Occupied'}
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
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 bg-white font-medium focus:border-zinc-900 focus:outline-hidden"
              >
                {TIME_SLOTS.map((s) => {
                  const status = getSlotStatus(s.id);
                  let statusDescription = 'Available';
                  if (!status.isFree) {
                    statusDescription = 'Occupied';
                  } else if (status.isUnlocked) {
                    statusDescription = 'Faculty on Leave (Available)';
                  }

                  return (
                    <option key={s.id} value={s.id}>
                      {s.label} ({statusDescription})
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 bg-white font-medium focus:border-zinc-900 focus:outline-hidden"
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Purpose
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 bg-white font-medium focus:border-zinc-900 focus:outline-hidden"
            >
              <option value="Extra Lecture / Remedial Class">Extra Lecture / Remedial Class</option>
              <option value="Technical Workshop / Bootcamp">Technical Workshop / Bootcamp</option>
              <option value="Hackathon Mentorship & Sprint">Hackathon Mentorship & Sprint</option>
              <option value="Guest Lecture & Industry Talk">Guest Lecture & Industry Talk</option>
              <option value="Student Society / Club Meeting">Student Society / Club Meeting</option>
            </select>
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Target Batch
              </label>
              <input
                type="text"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
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
                onChange={(e) => setAttendees(e.target.value)}
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
