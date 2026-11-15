import React, { useState, useMemo, useEffect } from 'react';
import {
  VENUES,
  INITIAL_WEEKLY_TIMETABLES,
  INITIAL_TIMETABLE,
  INITIAL_FACULTY,
  INITIAL_BOOKINGS,
  WEEKLY_BATCH_SCHEDULES,
  BATCH_SCHEDULES,
  TIME_SLOTS,
  DAYS_OF_WEEK
} from './data/campusData';
import {
  calculateContinuousFreeHours,
  calculateWalkingDelay,
  checkUnlockedViaLeave,
  parseNaturalLanguageQuery
} from './utils/aiReasoning';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AiDrawer } from './components/AiDrawer';
import { BookingModal } from './components/BookingModal';
import { ToastContainer } from './components/Toast';
import { VenueFinderView } from './views/VenueFinderView';
import { FacultyLeaveView } from './views/FacultyLeaveView';
import { AdminGateView } from './views/AdminGateView';

export function App() {
  // Navigation & Role State
  const [activeRole, setActiveRole] = useState('professor'); // 'professor' | 'admin'
  const [activeTab, setActiveTab] = useState('venues'); // 'venues' | 'leave' | 'admin'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Active Calendar Day & Time State
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [searchQuery, setSearchQuery] = useState('');
  const [minCapacity, setMinCapacity] = useState('all');
  const [displayTech, setDisplayTech] = useState('all');
  const [powerFilter, setPowerFilter] = useState('all');
  const [targetBatch, setTargetBatch] = useState('Sec J (EB2-202)');

  // Master Data State: Weekly Timetables (Monday through Friday)
  const [weeklyTimetableState, setWeeklyTimetableState] = useState(() => {
    try {
      const saved = localStorage.getItem('jklu_weekly_timetable_official_pdf');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.Monday && parsed.Tuesday) return parsed;
      }
      return INITIAL_WEEKLY_TIMETABLES;
    } catch (e) {
      return INITIAL_WEEKLY_TIMETABLES;
    }
  });

  const [facultyList, setFacultyList] = useState(() => {
    try {
      const saved = localStorage.getItem('jklu_faculty_official_pdf');
      return saved ? JSON.parse(saved) : INITIAL_FACULTY;
    } catch (e) {
      return INITIAL_FACULTY;
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('jklu_bookings_state');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch (e) {
      return INITIAL_BOOKINGS;
    }
  });

  // Active timetable for the currently selected day
  const currentDayTimetable = useMemo(() => {
    return weeklyTimetableState[selectedDay] || weeklyTimetableState['Monday'] || INITIAL_WEEKLY_TIMETABLES.Monday;
  }, [weeklyTimetableState, selectedDay]);

  // UI Interactive State
  const [selectedBookingVenue, setSelectedBookingVenue] = useState(null);
  const [bookingDefaultSlot, setBookingDefaultSlot] = useState('11:00');
  const [toasts, setToasts] = useState([]);
  const [traces, setTraces] = useState([
    {
      id: 'init-1',
      step: 1,
      tag: '[SEM 1 READY]',
      time: '11:00 AM',
      message: 'Weekly campus timetable active (Monday–Friday across EB1, EB2, TB, IET).'
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-persist weekly state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jklu_weekly_timetable_official_pdf', JSON.stringify(weeklyTimetableState));
    } catch (e) {}
  }, [weeklyTimetableState]);

  useEffect(() => {
    try {
      localStorage.setItem('jklu_faculty_official_pdf', JSON.stringify(facultyList));
    } catch (e) {}
  }, [facultyList]);

  useEffect(() => {
    try {
      localStorage.setItem('jklu_bookings_state', JSON.stringify(bookings));
    } catch (e) { }
  }, [bookings]);

  // Toast Helper
  const addToast = (title, message, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync role switch with appropriate view
  const handleRoleChange = (role) => {
    setActiveRole(role);
    if (role === 'admin') {
      setActiveTab('admin');
      addToast('Switched to Admin Gate', 'Human-in-the-Loop Governance & Campus Overview active.', 'info');
    } else {
      setActiveTab('venues');
      addToast('Switched to Professor / Organiser View', 'Venue Finder & Smart Booking Portal active.', 'info');
    }
  };

  // Calculate batch prior location to compute Zero Walking Delay for selectedDay
  const batchPriorLocation = useMemo(() => {
    if (!targetBatch || targetBatch === 'General' || targetBatch === 'None / General Workshop') return null;
    const daySchedules = WEEKLY_BATCH_SCHEDULES[selectedDay] || WEEKLY_BATCH_SCHEDULES['Monday'];
    const schedule = daySchedules?.[targetBatch];
    if (!schedule) return null;

    // Determine the hour prior to selectedTime
    const hourNum = parseInt(selectedTime.split(':')[0], 10);
    const priorHourNum = hourNum - 1;
    const priorSlotId = `${priorHourNum.toString().padStart(2, '0')}:00`;

    const priorSlot = schedule[priorSlotId];
    if (priorSlot) {
      return {
        ...priorSlot,
        priorSlotId,
        batch: targetBatch
      };
    }
    return null;
  }, [targetBatch, selectedTime, selectedDay]);

  // Evaluated & Ranked Venues Memo for Selected Day and Time
  const rankedVenues = useMemo(() => {
    // 1. Filter venues by capacity, displayTech, powerSockets
    const filtered = VENUES.filter((venue) => {
      if (minCapacity !== 'all') {
        const requiredCap = parseInt(minCapacity, 10);
        if (venue.capacity < requiredCap) return false;
      }

      if (displayTech !== 'all' && venue.displayTech !== displayTech) {
        return false;
      }

      if (powerFilter !== 'all') {
        if (powerFilter === 'None / Low' && venue.powerSockets !== 'None / Low') return false;
        if (powerFilter === 'High (Every Seat)' && venue.powerSockets !== 'High (Every Seat)') return false;
        if (powerFilter === 'Medium' && venue.powerSockets !== 'Medium') return false;
      }

      return true;
    });

    // 2. Score and calculate heuristics for each venue on selectedDay
    const scored = filtered.map((venue) => {
      const continuousFree = calculateContinuousFreeHours(
        venue.id,
        selectedTime,
        currentDayTimetable,
        facultyList
      );

      const unlockedStatus = checkUnlockedViaLeave(
        venue.id,
        currentDayTimetable,
        facultyList
      );

      // Prior room for walking delay calculation
      const fromRoom = batchPriorLocation ? {
        id: batchPriorLocation.roomId,
        name: batchPriorLocation.roomId,
        building: batchPriorLocation.building,
        floor: batchPriorLocation.floor
      } : null;

      const walkingDelay = fromRoom ? calculateWalkingDelay(fromRoom, venue) : null;

      // Ranking Score calculation
      let score = 0;

      // Zero Walking Delay gives major boost (500 pts)
      if (walkingDelay?.isZeroDelay) {
        score += 500;
      } else if (walkingDelay) {
        score -= walkingDelay.minutes * 20;
      }

      // Continuous free hours gives high weight (90 pts per hour)
      score += continuousFree.hours * 90;

      // If room has unlocked slots via leave today, bonus 150 pts
      if (unlockedStatus.isUnlocked) {
        score += 150;
      }

      // If venue is occupied at the exact selected time, penalty
      if (continuousFree.isOccupiedAtSelected) {
        score -= 800;
      }

      return {
        venue,
        score,
        continuousFree,
        walkingDelay,
        unlockedStatus
      };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Assign rank #1, #2, etc.
    return scored.map((item, index) => ({
      ...item,
      rank: index + 1
    }));
  }, [minCapacity, displayTech, powerFilter, selectedTime, currentDayTimetable, facultyList, batchPriorLocation]);

  // Generate complete 5-step AI reasoning trace whenever parameters or active day change
  useEffect(() => {
    if (rankedVenues.length > 0) {
      const topPick = rankedVenues[0];
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const facultyOnLeave = facultyList.filter(f => f.onLeave);
      const unlockedRooms = [];
      facultyOnLeave.forEach(f => {
        const daySlots = Array.isArray(f.assignedSlots)
          ? f.assignedSlots
          : (f.assignedSlots?.[selectedDay] || []);
        daySlots.forEach(s => unlockedRooms.push(`${s.roomId} (${s.time})`));
      });

      const newTraces = [
        {
          id: `step1-${Date.now()}`,
          step: 1,
          tag: '[STEP 1]',
          time: nowTime,
          message: `Parsed Query & Day Constraints: ${selectedDay} · ${selectedTime}`,
          details: `Day: ${selectedDay} | Time: ${selectedTime} | Capacity >= ${minCapacity === 'all' ? 'Any' : minCapacity} | Display: ${displayTech} | Type: ${powerFilter}`
        },
        {
          id: `step2-${Date.now() + 1}`,
          step: 2,
          tag: '[STEP 2]',
          time: nowTime,
          message: `Scanned Faculty Leave Log for ${selectedDay}`,
          details: facultyOnLeave.length > 0
            ? `Unlocked ${unlockedRooms.length} room slot(s) for ${selectedDay}: ${unlockedRooms.join(', ')} (${facultyOnLeave.map(f => f.name).join(', ')} on leave)`
            : `All faculty members are currently present on ${selectedDay}. Standard timetable constraints applied.`
        },
        {
          id: `step3-${Date.now() + 2}`,
          step: 3,
          tag: '[STEP 3]',
          time: nowTime,
          message: `Evaluated ${selectedDay} Continuous Free Durations`,
          details: `Computed continuous free hour blocks from ${selectedTime} to 5:00 PM across all 15 campus venues.`
        },
        {
          id: `step4-${Date.now() + 3}`,
          step: 4,
          tag: '[STEP 4]',
          time: nowTime,
          message: `Applied Zero Walking Delay Check (${selectedDay})`,
          details: batchPriorLocation
            ? `Target Batch: ${targetBatch}. Prior room on ${selectedDay} at ${(parseInt(selectedTime.split(':')[0], 10) - 1).toString().padStart(2, '0')}:00 was ${batchPriorLocation.roomId} (${batchPriorLocation.building} ${batchPriorLocation.floor === 0 ? 'Ground' : `Floor ${batchPriorLocation.floor}`}). Boosted same-floor venues!`
            : `Batch set to ${targetBatch}. No prior room constraint recorded for this time slot on ${selectedDay}.`
        },
        {
          id: `res-${Date.now() + 4}`,
          isResult: true,
          tag: '[RESULT]',
          time: nowTime,
          message: `Ranked ${topPick.venue.name} as #1 for ${selectedDay}`,
          details: `Score: ${topPick.score} pts · Free Duration: ${topPick.continuousFree.range} · Proximity: ${topPick.walkingDelay?.label || 'Direct'} · Capacity: ${topPick.venue.capacity} seats`
        }
      ];

      setTraces(newTraces);
    }
  }, [selectedDay, selectedTime, minCapacity, displayTech, powerFilter, targetBatch, facultyList, batchPriorLocation, rankedVenues]);

  // Natural Language Search Handler
  const handleNaturalLanguageSearch = (queryText) => {
    const text = queryText || searchQuery;
    if (!text.trim()) return;

    setIsProcessing(true);
    const parsed = parseNaturalLanguageQuery(text);

    if (parsed) {
      if (parsed.day) setSelectedDay(parsed.day);
      if (parsed.capacity) {
        if (parsed.capacity >= 200) setMinCapacity('200');
        else if (parsed.capacity >= 70) setMinCapacity('70');
        else if (parsed.capacity >= 60) setMinCapacity('60');
        else setMinCapacity('30');
      }
      if (parsed.displayTech) setDisplayTech(parsed.displayTech);
      if (parsed.powerSockets) setPowerFilter(parsed.powerSockets);
      if (parsed.startTime) setSelectedTime(parsed.startTime);
      if (parsed.batch) setTargetBatch(parsed.batch);

      addToast('AI Agent Query Parsed', `Applied parameters from: "${text}"`, 'success');
    }

    setTimeout(() => {
      setIsProcessing(false);
    }, 350);
  };

  // Toggle Faculty On Leave Handler for Active Day
  const handleToggleFacultyLeave = (facultyId) => {
    setFacultyList((prev) =>
      prev.map((f) => {
        if (f.id === facultyId) {
          const nextState = !f.onLeave;
          const daySlots = Array.isArray(f.assignedSlots)
            ? f.assignedSlots
            : (f.assignedSlots?.[selectedDay] || []);
          const affectedRooms = daySlots.map((s) => `${s.roomId} (${s.time})`).join(', ');

          if (nextState) {
            addToast(
              `Faculty on Leave — ${selectedDay} Slots Freed`,
              daySlots.length > 0
                ? `Freed classroom slot(s) [${affectedRooms}] · ${f.name} marked on leave for ${selectedDay}.`
                : `${f.name} marked on leave (no classes scheduled for ${selectedDay}).`,
              'amber'
            );
          } else {
            addToast(
              'Schedule Restored',
              `${f.name} restored to present on campus.`,
              'info'
            );
          }

          return { ...f, onLeave: nextState };
        }
        return f;
      })
    );
  };

  // Reset all faculty leave
  const handleResetAllLeave = () => {
    setFacultyList((prev) => prev.map((f) => ({ ...f, onLeave: false })));
    addToast('Faculty Schedule Reset', 'All faculty members restored to present.', 'info');
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchQuery('');
    setMinCapacity('all');
    setDisplayTech('all');
    setPowerFilter('all');
    setTargetBatch('General');
    setSelectedTime('11:00');
    addToast('Filters Reset', 'Default campus parameters restored.', 'info');
  };

  // Preset Handler from Sidebar
  const handleApplyPreset = (preset) => {
    if (preset.capacity) setMinCapacity(preset.capacity.toString());
    if (preset.displayTech) setDisplayTech(preset.displayTech);
    if (preset.powerSockets) setPowerFilter(preset.powerSockets);
    if (preset.batch) setTargetBatch(preset.batch);
    if (preset.startTime) setSelectedTime(preset.startTime);
    setActiveTab('venues');
    addToast('Preset Applied', `Agent tuned for: ${preset.displayTech || preset.powerSockets || preset.batch || 'Target Criteria'}`, 'success');
  };

  // Submit Booking Request (Records Active Day)
  const handleSubmitBooking = (newBooking) => {
    const bookingWithDay = {
      ...newBooking,
      day: selectedDay
    };
    setBookings((prev) => [bookingWithDay, ...prev]);
    addToast(
      'Booking Request Queued',
      `Submitted request for ${newBooking.roomName} on ${selectedDay} (${newBooking.timeSlot}). Awaiting Admin Gate approval.`,
      'success'
    );
  };

  // Approve Booking (Locks slots on the specific day's schedule)
  const handleApproveBooking = (bookingId) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (!targetBooking) return;

    const bookingDay = targetBooking.day || selectedDay;
    const startIdx = TIME_SLOTS.findIndex(s => s.id === targetBooking.startTime);
    const duration = targetBooking.duration || 1;

    setWeeklyTimetableState((prev) => {
      const dayTimetable = { ...(prev[bookingDay] || INITIAL_WEEKLY_TIMETABLES[bookingDay] || {}) };
      const roomSchedule = { ...(dayTimetable[targetBooking.roomId] || {}) };

      for (let i = 0; i < duration; i++) {
        const slot = TIME_SLOTS[startIdx + i];
        if (slot) {
          roomSchedule[slot.id] = {
            status: 'booked',
            title: targetBooking.purpose,
            batch: targetBooking.batch,
            bookedBy: targetBooking.requestedBy
          };
        }
      }

      return {
        ...prev,
        [bookingDay]: {
          ...dayTimetable,
          [targetBooking.roomId]: roomSchedule
        }
      };
    });

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'approved' } : b))
    );

    addToast(
      'Booking Approved & Locked',
      `Room ${targetBooking.roomName} successfully locked for ${bookingDay} (${targetBooking.timeSlot}) on master timetable.`,
      'success'
    );
  };

  // Reject Booking
  const handleRejectBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'rejected' } : b))
    );
    addToast('Booking Rejected', 'Slot remains free for other reservations.', 'info');
  };

  // State Backup & Export Handler
  const handleExportBackup = () => {
    const backupData = {
      appName: 'JKLU VenueSense',
      version: '2.0.0',
      exportTime: new Date().toISOString(),
      selectedDay,
      selectedTime,
      weeklyTimetableState,
      facultyList,
      bookings
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `jklu-campus-weekly-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast('Backup Exported', 'Downloaded complete 5-day campus timetable and booking state.', 'success');
  };

  // State Import & Restore Handler
  const handleImportBackup = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.weeklyTimetableState) setWeeklyTimetableState(data.weeklyTimetableState);
        else if (data.timetableState) setWeeklyTimetableState({ ...INITIAL_WEEKLY_TIMETABLES, [selectedDay]: data.timetableState });
        if (data.facultyList) setFacultyList(data.facultyList);
        if (data.bookings) setBookings(data.bookings);
        addToast('State Restored', 'Campus weekly timetable loaded successfully.', 'success');
      } catch (err) {
        addToast('Import Failed', 'Invalid JSON backup file format.', 'rose');
      }
    };
    reader.readAsText(file);
  };

  // Reset to Official Timetables Handler
  const handleResetTimetable = () => {
    setWeeklyTimetableState(INITIAL_WEEKLY_TIMETABLES);
    setFacultyList(INITIAL_FACULTY);
    setBookings(INITIAL_BOOKINGS);
    localStorage.removeItem('jklu_weekly_timetable_official_pdf');
    localStorage.removeItem('jklu_faculty_official_pdf');
    localStorage.removeItem('jklu_weekly_timetable_state');
    localStorage.removeItem('jklu_faculty_state');
    localStorage.removeItem('jklu_bookings_state');
    addToast('Official Timetables Restored', 'Reset all 5 days (Monday–Friday) to official schedule.', 'info');
  };

  // Telemetry metric counts for active day
  const facultyOnLeaveCount = facultyList.filter((f) => f.onLeave).length;
  const pendingBookingsCount = bookings.filter((b) => b.status === 'pending').length;

  const unlockedSlotsCount = useMemo(() => {
    let count = 0;
    facultyList.forEach((f) => {
      if (f.onLeave) {
        const daySlots = Array.isArray(f.assignedSlots)
          ? f.assignedSlots
          : (f.assignedSlots?.[selectedDay] || []);
        count += daySlots.length;
      }
    });
    return count;
  }, [facultyList, selectedDay]);

  const freeVenuesCount = useMemo(() => {
    return VENUES.filter((v) => {
      const slot = currentDayTimetable[v.id]?.[selectedTime];
      if (!slot || slot.status === 'free') return true;
      if (slot.facultyId) {
        const fac = facultyList.find((f) => f.id === slot.facultyId);
        if (fac && fac.onLeave) return true;
      }
      return false;
    }).length;
  }, [currentDayTimetable, selectedTime, facultyList]);

  // Unlocked rooms list for active day
  const unlockedRoomsList = useMemo(() => {
    const list = [];
    facultyList.forEach((f) => {
      if (f.onLeave) {
        const daySlots = Array.isArray(f.assignedSlots)
          ? f.assignedSlots
          : (f.assignedSlots?.[selectedDay] || []);
        daySlots.forEach((slot) => {
          const venue = VENUES.find((v) => v.id === slot.roomId);
          list.push({
            roomId: slot.roomId,
            building: venue?.building || 'EB',
            timeSlot: slot.time,
            teacher: f.name,
            course: slot.course
          });
        });
      }
    });
    return list;
  }, [facultyList, selectedDay]);

  // Handle Book Venue with optional prefilled slot
  const handleOpenBooking = (venue, preferredSlot) => {
    setSelectedBookingVenue(venue);
    if (preferredSlot) {
      setBookingDefaultSlot(preferredSlot);
    } else {
      setBookingDefaultSlot(selectedTime);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50/50 font-sans text-zinc-900 overflow-hidden">
      {/* Top Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRole={activeRole}
        setActiveRole={handleRoleChange}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        traceCount={traces.length}
        unlockedCount={unlockedSlotsCount}
        pendingCount={pendingBookingsCount}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
        onResetTimetable={handleResetTimetable}
      />

      {/* Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onApplyPreset={handleApplyPreset}
          facultyOnLeaveCount={facultyOnLeaveCount}
          pendingBookingsCount={pendingBookingsCount}
          freeVenuesCount={freeVenuesCount}
          totalVenuesCount={VENUES.length}
          unlockedSlotsCount={unlockedSlotsCount}
        />

        {/* Center Main Workspace */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
          {activeTab === 'venues' && (
            <VenueFinderView
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearchSubmit={(e) => {
                e.preventDefault();
                handleNaturalLanguageSearch(searchQuery);
              }}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              minCapacity={minCapacity}
              setMinCapacity={setMinCapacity}
              displayTech={displayTech}
              setDisplayTech={setDisplayTech}
              powerFilter={powerFilter}
              setPowerFilter={setPowerFilter}
              targetBatch={targetBatch}
              setTargetBatch={setTargetBatch}
              onResetFilters={handleResetFilters}
              rankedVenues={rankedVenues}
              timetableState={currentDayTimetable}
              facultyList={facultyList}
              onBookVenue={handleOpenBooking}
              isProcessing={isProcessing}
            />
          )}

          {activeTab === 'leave' && (
            <FacultyLeaveView
              facultyList={facultyList}
              onToggleLeave={handleToggleFacultyLeave}
              onResetAllLeave={handleResetAllLeave}
              unlockedRoomsList={unlockedRoomsList}
              selectedDay={selectedDay}
            />
          )}

          {activeTab === 'admin' && (
            <AdminGateView
              bookings={bookings}
              onApproveBooking={handleApproveBooking}
              onRejectBooking={handleRejectBooking}
              totalVenues={VENUES.length}
              freeVenuesCount={freeVenuesCount}
              unlockedSlotsCount={unlockedSlotsCount}
              pendingCount={pendingBookingsCount}
            />
          )}
        </main>

        {/* Column 3: Collapsible Right AI Agent Reasoning & Chat Drawer */}
        <AiDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          traces={traces}
          onClearTraces={() => setTraces([])}
          onAskAgent={(query) => handleNaturalLanguageSearch(query)}
          isProcessing={isProcessing}
        />
      </div>

      {/* Booking Modal with Complete Occupied Slot Prevention */}
      <BookingModal
        isOpen={!!selectedBookingVenue}
        onClose={() => setSelectedBookingVenue(null)}
        venue={selectedBookingVenue}
        defaultStartTime={bookingDefaultSlot || selectedTime}
        targetBatch={targetBatch}
        onSubmitBooking={handleSubmitBooking}
        roomSchedule={currentDayTimetable[selectedBookingVenue?.id] || {}}
        facultyList={facultyList}
      />

      {/* Popover Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
