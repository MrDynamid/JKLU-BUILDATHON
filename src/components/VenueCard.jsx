import React from 'react';
import { TimelineBar } from './TimelineBar';
import { Users, Tv, Zap, Monitor, MapPin, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function VenueCard({
  venue,
  rank,
  continuousFree,
  walkingDelay,
  unlockedStatus,
  schedule,
  facultyList,
  selectedTime,
  onBookVenue,
  targetBatch
}) {
  const isZeroDelay = walkingDelay?.isZeroDelay;
  const isOccupiedAtSelected = continuousFree?.isOccupiedAtSelected;

  const handleSlotClick = (slotId, slotInfo) => {
    // If user clicks any slot on the timeline bar, open booking modal for that slot
    onBookVenue(venue, slotId);
  };

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between p-4.5 shadow-xs hover:shadow-md ${
      rank === 1 ? 'border-zinc-800 ring-2 ring-zinc-800/10' : 'border-zinc-200/90 hover:border-zinc-300'
    }`}>
      <div>
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                rank === 1 
                  ? 'bg-zinc-900 text-white shadow-2xs' 
                  : rank <= 3 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold' 
                  : 'bg-zinc-100 text-zinc-600 font-semibold'
              }`}>
                #{rank}
              </span>
              <h3 className="text-lg font-bold text-zinc-900 tracking-tight font-sans">
                {venue.name}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1 font-sans">
              <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
              <span>{venue.building} · {venue.floorLabel}</span>
              {venue.homeSection && <span className="text-zinc-400">({venue.homeSection})</span>}
            </p>
          </div>

          <span className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 font-medium shrink-0 border border-zinc-200/60 font-sans">
            {venue.type}
          </span>
        </div>

        {/* Highlight Metric Badge: Max Continuous Free Window */}
        <div className={`my-2.5 flex items-center justify-between text-xs py-2 px-3 rounded-xl border ${
          !isOccupiedAtSelected
            ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900'
            : 'bg-zinc-50 border-zinc-200 text-zinc-700'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              !isOccupiedAtSelected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-400'
            }`} />
            <div>
              {!isOccupiedAtSelected ? (
                <div className="font-sans">
                  <span className="text-emerald-800 font-medium">Available: </span>
                  <strong className="text-emerald-950 font-bold">{continuousFree.range}</strong>
                </div>
              ) : (
                <div className="font-sans">
                  <span className="text-rose-600 font-semibold">Occupied at {selectedTime}</span>
                  <span className="text-zinc-500 text-[11px] ml-1.5 font-normal">({continuousFree.range})</span>
                </div>
              )}
            </div>
          </div>

          {!isOccupiedAtSelected && continuousFree.hours > 0 && (
            <span className="text-[11px] font-bold text-emerald-800 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200/80 shrink-0 shadow-2xs font-sans">
              {continuousFree.hours}h Free
            </span>
          )}
        </div>

        {/* Dynamic Context Badges */}
        <div className="space-y-1.5 mb-3 font-sans">
          {isZeroDelay && (
            <div className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-2 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              <span className="truncate">{walkingDelay.label}</span>
            </div>
          )}

          {unlockedStatus?.isUnlocked && (
            <div className="text-[11px] font-medium text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg flex items-center gap-2 border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span className="truncate">
                Faculty on Leave: {unlockedStatus.unlockedSlots.map(s => `${s.teacher} (${s.timeSlot})`).join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Hardware Specifications */}
        <div className="text-xs text-zinc-600 flex flex-wrap items-center gap-3 py-1.5 px-1 border-y border-zinc-100 font-sans">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-zinc-400" />
            <strong className="font-semibold text-zinc-800">{venue.capacity}</strong> seats
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Tv className="w-3.5 h-3.5 text-zinc-400" />
            <span>{venue.displayTech}</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            {venue.pcs > 0 ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-zinc-400" />
                <span>{venue.pcs} PCs</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-zinc-400" />
                <span>{venue.powerSockets}</span>
              </>
            )}
          </span>
        </div>

        {/* Visual Daily Timeline Bar (9 AM to 5 PM) */}
        <div className="pt-2.5 mt-1 font-sans">
          <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
            <span>Daily Schedule (Click slot to book)</span>
          </div>
          <TimelineBar 
            roomSchedule={schedule} 
            facultyList={facultyList}
            selectedTime={selectedTime}
            onSelectSlot={handleSlotClick}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center justify-between font-sans">
        <span className="text-xs text-zinc-400 font-medium">
          {venue.building} · {venue.floorLabel}
        </span>
        
        <button
          type="button"
          onClick={() => {
            const initialSlot = isOccupiedAtSelected 
              ? (continuousFree.firstAvailableSlot || '09:00') 
              : selectedTime;
            onBookVenue(venue, initialSlot);
          }}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
            isOccupiedAtSelected
              ? 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-300'
              : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-2xs'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{isOccupiedAtSelected ? 'Select Available Slot' : 'Request Booking'}</span>
        </button>
      </div>
    </div>
  );
}
