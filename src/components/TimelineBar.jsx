import React from 'react';
import { TIME_SLOTS } from '../data/campusData';

export function TimelineBar({ 
  roomSchedule, 
  facultyList = [], 
  selectedTime, 
  onSelectSlot 
}) {
  return (
    <div className="w-full select-none font-sans">
      {/* 8-slot Grid representing 9:00 AM to 5:00 PM */}
      <div className="grid grid-cols-8 gap-1 h-2.5 w-full rounded-md overflow-hidden bg-zinc-100 p-0.5">
        {TIME_SLOTS.map((slot) => {
          const slotData = roomSchedule?.[slot.id];
          const isSelected = slot.id === selectedTime;

          let isFree = !slotData || slotData.status === 'free';
          let isLeaveUnlocked = false;
          let isBooked = slotData?.status === 'booked';
          let tooltipTitle = `${slot.range}: Available`;

          if (slotData && slotData.status === 'occupied') {
            if (slotData.facultyId) {
              const fac = facultyList.find(f => f.id === slotData.facultyId);
              if (fac && fac.onLeave) {
                isFree = true;
                isLeaveUnlocked = true;
                tooltipTitle = `${slot.range}: Faculty on Leave (${fac.name}) · [${slotData.title}]`;
              } else {
                tooltipTitle = `${slot.range}: Occupied (${slotData.title || 'Class'}${slotData.teacher ? ` - ${slotData.teacher}` : ''})`;
              }
            } else {
              tooltipTitle = `${slot.range}: Occupied (${slotData.title || 'Class'}${slotData.teacher ? ` - ${slotData.teacher}` : ''})`;
            }
          } else if (isBooked) {
            tooltipTitle = `${slot.range}: Reserved / Booked (${slotData.title || 'Admin Confirmed'})`;
          }

          // Visual theme colors:
          // Available = Emerald green
          // Faculty on Leave = Amber
          // Occupied = Rose red
          // Booked = Slate / Dark
          let bgClass = 'bg-emerald-500';
          if (isLeaveUnlocked) {
            bgClass = 'bg-amber-400';
          } else if (isBooked) {
            bgClass = 'bg-slate-900';
          } else if (!isFree) {
            bgClass = 'bg-rose-400 hover:bg-rose-500';
          } else {
            bgClass = 'bg-emerald-500 hover:bg-emerald-600';
          }

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => onSelectSlot && onSelectSlot(slot.id, { isFree, isLeaveUnlocked, isBooked })}
              title={tooltipTitle}
              className={`h-full w-full rounded-xs cursor-pointer transition-all ${bgClass} ${
                isSelected ? 'ring-2 ring-zinc-900 ring-offset-1 scale-105 z-10' : 'hover:opacity-90'
              }`}
            />
          );
        })}
      </div>

      {/* Timeline Labels: 9 AM to 5 PM */}
      <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-1.5 px-0.5 font-sans">
        <span className="font-semibold text-zinc-700">9 AM</span>
        <div className="flex items-center gap-2.5 text-[10px]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-zinc-600 font-medium">Available</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-zinc-600 font-medium">Faculty on Leave</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span className="text-zinc-600 font-medium">Occupied</span>
          </span>
        </div>
        <span className="font-semibold text-zinc-700">5 PM</span>
      </div>
    </div>
  );
}
