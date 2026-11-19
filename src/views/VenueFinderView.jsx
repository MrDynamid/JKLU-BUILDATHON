import React from 'react';
import { Search, RotateCcw, Filter, Calendar, Clock } from 'lucide-react';
import { TIME_SLOTS, FIRST_SEM_BATCHES, DAYS_OF_WEEK } from '../data/campusData';
import { VenueCard } from '../components/VenueCard';
import { CustomSelect } from '../components/CustomSelect';

export function VenueFinderView({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  selectedTime,
  setSelectedTime,
  selectedDay,
  setSelectedDay,
  minCapacity,
  setMinCapacity,
  displayTech,
  setDisplayTech,
  powerFilter,
  setPowerFilter,
  targetBatch,
  setTargetBatch,
  onResetFilters,
  rankedVenues,
  timetableState,
  facultyList,
  onBookVenue,
  isProcessing
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-4 font-sans">
      {/* Top Section — Hybrid Search & Filter Bar */}
      <div className="space-y-3 bg-white p-4 rounded-2xl border border-zinc-200/90 shadow-2xs">
        {/* Natural Language Smart Search Bar */}
        <form onSubmit={onSearchSubmit} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search venues, capacity or equipment (e.g., "Room for 60 students from 11 AM with Smart Board")'
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-zinc-200 focus:border-zinc-900 focus:outline-hidden bg-zinc-50/50 hover:bg-white focus:bg-white placeholder-zinc-400 transition-all font-sans"
            />
          </div>
          <button
            type="submit"
            disabled={isProcessing}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-900 text-white hover:bg-zinc-800 transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span>Smart Search</span>
          </button>
        </form>

        {/* Quick Filter Pills / Dropdowns in a single responsive row */}
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-zinc-100">
          {/* Active Day Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 font-medium text-[11px]">Day:</span>
            <CustomSelect
              value={selectedDay}
              onChange={setSelectedDay}
              options={DAYS_OF_WEEK.map(day => ({ value: day, label: day }))}
              icon={Calendar}
              buttonClassName="bg-zinc-50 border-zinc-200 py-1 font-semibold"
            />
          </div>

          {/* Start Time */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 font-medium text-[11px]">Time:</span>
            <CustomSelect
              value={selectedTime}
              onChange={setSelectedTime}
              options={TIME_SLOTS.map(slot => ({ value: slot.id, label: `${slot.label} (${slot.range})` }))}
              icon={Clock}
              buttonClassName="bg-zinc-50 border-zinc-200 py-1 font-semibold"
            />
          </div>

          {/* Minimum Capacity */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 font-medium text-[11px]">Capacity:</span>
            <CustomSelect
              value={minCapacity}
              onChange={setMinCapacity}
              options={[
                { value: 'all', label: 'All Capacities' },
                { value: '30', label: '30+ Seats' },
                { value: '60', label: '60+ Seats (Classrooms)' },
                { value: '70', label: '70+ Seats (Labs)' },
                { value: '200', label: '200 Seats (Amphitheatre)' }
              ]}
              buttonClassName="bg-zinc-50 border-zinc-200 py-1 font-semibold"
            />
          </div>

          {/* Display Tech */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 font-medium text-[11px]">Display:</span>
            <CustomSelect
              value={displayTech}
              onChange={setDisplayTech}
              options={[
                { value: 'all', label: 'All Displays' },
                { value: 'Smart Board', label: 'Smart Board' },
                { value: 'Projector', label: 'Projector' }
              ]}
              buttonClassName="bg-zinc-50 border-zinc-200 py-1 font-semibold"
            />
          </div>

          {/* Power Sockets / Room Type */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 font-medium text-[11px]">Type:</span>
            <CustomSelect
              value={powerFilter}
              onChange={setPowerFilter}
              options={[
                { value: 'all', label: 'All Venue Types' },
                { value: 'Medium', label: 'Medium (Classrooms)' },
                { value: 'High (Every Seat)', label: 'High + PCs (Labs)' },
                { value: 'None / Low', label: '200 Seating (Amphitheatre)' }
              ]}
              buttonClassName="bg-zinc-50 border-zinc-200 py-1 font-semibold"
            />
          </div>

          {/* Target Batch (For Zero Walking Delay) */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400 font-medium text-[11px]">Batch:</span>
            <CustomSelect
              value={targetBatch}
              onChange={setTargetBatch}
              options={FIRST_SEM_BATCHES.map(b => ({ value: b, label: b }))}
              buttonClassName="bg-zinc-50 border-zinc-200 py-1 text-emerald-800 font-bold"
            />
          </div>

          <button
            type="button"
            onClick={onResetFilters}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer ml-auto"
            title="Reset All Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
        <div className="flex items-center gap-2">
          <span>Schedule for <strong className="text-zinc-900 font-bold">{selectedDay}</strong></span>
          <span className="text-zinc-300">·</span>
          <span>Found <strong>{rankedVenues.length}</strong> venues</span>
        </div>

        {targetBatch !== 'General' && (
          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Proximity Optimized for {targetBatch}
          </span>
        )}
      </div>

      {/* Ranked Results Grid */}
      {rankedVenues.length === 0 ? (
        <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center">
          <Filter className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-zinc-700">No rooms match criteria for {selectedDay}</h3>
          <p className="text-xs text-zinc-400 mt-1">Try lowering the minimum capacity or selecting all displays.</p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-3 px-3 py-1.5 text-xs font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rankedVenues.map(({ venue, rank, continuousFree, walkingDelay, unlockedStatus }) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              rank={rank}
              continuousFree={continuousFree}
              walkingDelay={walkingDelay}
              unlockedStatus={unlockedStatus}
              schedule={timetableState[venue.id]}
              facultyList={facultyList}
              selectedTime={selectedTime}
              onBookVenue={onBookVenue}
              targetBatch={targetBatch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
