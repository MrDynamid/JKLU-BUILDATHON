import React from 'react';
import { Search, Sparkles, RotateCcw, Filter, Calendar, Clock } from 'lucide-react';
import { TIME_SLOTS, FIRST_SEM_BATCHES, DAYS_OF_WEEK } from '../data/campusData';
import { VenueCard } from '../components/VenueCard';

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
        {/* Natural Language AI Search Bar */}
        <form onSubmit={onSearchSubmit} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Try AI prompt: "Find a room for 60 students from 11 AM with a Smart Board on Tuesday"'
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-zinc-200 focus:border-zinc-900 focus:outline-hidden bg-zinc-50/50 hover:bg-white focus:bg-white placeholder-zinc-400 transition-all font-sans"
            />
          </div>
          <button
            type="submit"
            disabled={isProcessing}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-900 text-white hover:bg-zinc-800 transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Ask Agent</span>
          </button>
        </form>

        {/* Quick Filter Pills / Dropdowns in a single responsive row */}
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-zinc-100">
          {/* Active Day Selector */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-400 font-medium">Day:</span>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="bg-transparent font-semibold text-zinc-900 focus:outline-hidden cursor-pointer font-sans"
            >
              {DAYS_OF_WEEK.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          {/* Start Time */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-400 font-medium">Time:</span>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="bg-transparent font-semibold text-zinc-900 focus:outline-hidden cursor-pointer font-sans"
            >
              {TIME_SLOTS.map(slot => (
                <option key={slot.id} value={slot.id}>{slot.label} ({slot.range})</option>
              ))}
            </select>
          </div>

          {/* Minimum Capacity */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200">
            <span className="text-zinc-400 font-medium">Capacity:</span>
            <select
              value={minCapacity}
              onChange={(e) => setMinCapacity(e.target.value)}
              className="bg-transparent font-semibold text-zinc-900 focus:outline-hidden cursor-pointer font-sans"
            >
              <option value="all">All Capacities</option>
              <option value="30">30+ Seats</option>
              <option value="60">60+ Seats (Classrooms)</option>
              <option value="70">70+ Seats (Labs)</option>
              <option value="200">200 Seats (Amphitheatre)</option>
            </select>
          </div>

          {/* Display Tech */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200">
            <span className="text-zinc-400 font-medium">Display:</span>
            <select
              value={displayTech}
              onChange={(e) => setDisplayTech(e.target.value)}
              className="bg-transparent font-semibold text-zinc-900 focus:outline-hidden cursor-pointer font-sans"
            >
              <option value="all">All Displays</option>
              <option value="Smart Board">Smart Board</option>
              <option value="Projector">Projector</option>
            </select>
          </div>

          {/* Power Sockets / Room Type */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200">
            <span className="text-zinc-400 font-medium">Type:</span>
            <select
              value={powerFilter}
              onChange={(e) => setPowerFilter(e.target.value)}
              className="bg-transparent font-semibold text-zinc-900 focus:outline-hidden cursor-pointer font-sans"
            >
              <option value="all">All Venue Types</option>
              <option value="Medium">Medium (Classrooms)</option>
              <option value="High (Every Seat)">High + PCs (Labs)</option>
              <option value="None / Low">200 Seating (Amphitheatre)</option>
            </select>
          </div>

          {/* Target Batch (For Zero Walking Delay) */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200">
            <span className="text-zinc-400 font-medium">Batch (0-Walk):</span>
            <select
              value={targetBatch}
              onChange={(e) => setTargetBatch(e.target.value)}
              className="bg-transparent font-semibold text-emerald-800 focus:outline-hidden cursor-pointer font-sans"
            >
              {FIRST_SEM_BATCHES.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
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
