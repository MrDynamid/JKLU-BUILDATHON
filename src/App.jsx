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
  parseNaturalLanguageQuery,
  findOptimalRescheduleOption
} from './utils/aiReasoning';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AiDrawer } from './components/AiDrawer';
import { BookingModal } from './components/BookingModal';
import { TimetableView } from './views/TimetableView';
import { ClassExchangeModal } from './components/ClassExchangeModal';
import { ToastContainer } from './components/Toast';
import { LoginPortal } from './components/LoginPortal';
import { VenueFinderView } from './views/VenueFinderView';
import { FacultyLeaveView } from './views/FacultyLeaveView';
import { AdminGateView } from './views/AdminGateView';

export function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('jklu_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Navigation & Role State
  const [activeRole, setActiveRole] = useState(() => {
    try {
      const saved = localStorage.getItem('jklu_auth_user');
      if (saved) {
        const u = JSON.parse(saved);
        if (u?.role) return u.role;
      }
    } catch (e) { }
    return 'professor';
  }); // 'professor' | 'admin'
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const saved = localStorage.getItem('jklu_auth_user');
      if (saved) {
        const u = JSON.parse(saved);
        if (u?.role === 'admin') return 'admin';
      }
    } catch (e) { }
    return 'venues';
  }); // 'venues' | 'leave' | 'admin'
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
  const TIMETABLE_VERSION = 'v5_official_perfect_master';

  const [weeklyTimetableState, setWeeklyTimetableState] = useState(() => {
    try {
      if (localStorage.getItem('jklu_timetable_version') !== TIMETABLE_VERSION) {
        localStorage.removeItem('jklu_weekly_timetable_official_pdf');
        localStorage.removeItem('jklu_faculty_official_pdf');
        localStorage.setItem('jklu_timetable_version', TIMETABLE_VERSION);
        return INITIAL_WEEKLY_TIMETABLES;
      }
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
      if (localStorage.getItem('jklu_timetable_version') !== TIMETABLE_VERSION) {
        return INITIAL_FACULTY;
      }
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
  const [timetableInitialFacultyId, setTimetableInitialFacultyId] = useState(null);
  const [timetableInitialBatch, setTimetableInitialBatch] = useState(null);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [exchangeModalInitialSlot, setExchangeModalInitialSlot] = useState(null);
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
    } catch (e) { }
  }, [weeklyTimetableState]);

  useEffect(() => {
    try {
      localStorage.setItem('jklu_faculty_official_pdf', JSON.stringify(facultyList));
    } catch (e) { }
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

  // Sync tab switch with active role
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'admin') {
      setActiveRole('admin');
    } else {
      setActiveRole('professor');
    }
  };

  // Sync role switch with appropriate view
  const handleRoleChange = (role) => {
    setActiveRole(role);
    if (role === 'admin') {
      setActiveTab('admin');
    } else {
      if (activeTab === 'admin') {
        setActiveTab('venues');
      }
    }
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem('jklu_auth_user', JSON.stringify(userData));
    } catch (e) { }
    if (userData.role === 'admin') {
      setActiveRole('admin');
      setActiveTab('admin');
    } else {
      setActiveRole('professor');
      setActiveTab('venues');
    }
    addToast(
      'Welcome to JKLU Portal',
      `Signed in as ${userData.displayName} (${userData.roleLabel || userData.role}).`,
      'success'
    );
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('jklu_auth_user');
    } catch (e) { }
    setCurrentUser(null);
    addToast('Signed Out', 'You have been safely signed out to the login portal.', 'info');
  };

  const handleOpenTimetable = (facultyId = null, batch = null) => {
    if (facultyId) setTimetableInitialFacultyId(facultyId);
    if (batch) setTimetableInitialBatch(batch);
    setActiveTab('timetable');
  };

  const handleResetSchedule = () => {
    try {
      localStorage.removeItem('jklu_weekly_timetable_official_pdf');
      localStorage.removeItem('jklu_faculty_official_pdf');
      localStorage.setItem('jklu_timetable_version', TIMETABLE_VERSION);
    } catch (e) { }
    setWeeklyTimetableState(INITIAL_WEEKLY_TIMETABLES);
    setFacultyList(INITIAL_FACULTY);
    addToast(
      'Schedule Restored',
      'All classes have been unrescheduled and restored to the official master schedule.',
      'success'
    );
  };

  const handleOpenExchangeModal = (slot = null) => {
    setExchangeModalInitialSlot(slot);
    setIsExchangeModalOpen(true);
  };

  const handleRescheduleSlot = (reschedulePayload) => {
    const slot = reschedulePayload?.slot || reschedulePayload;
    if (!slot) return;
    const originDay = slot.day || selectedDay;
    const originRoom = slot.roomId;
    const originTime = slot.time;

    let targetDay = reschedulePayload?.targetDay;
    let targetTime = reschedulePayload?.targetTime;
    let targetRoom = reschedulePayload?.targetRoomId;
    let targetVenueName = targetRoom;

    if (!targetDay || !targetTime || !targetRoom) {
      // Give options to reschedule when & where instead of 1-click silent swap
      handleOpenExchangeModal({
        ...slot,
        mode: 'reschedule',
        day: originDay,
        time: originTime,
        roomId: originRoom,
        teacher: slot.teacher,
        course: slot.course || slot.title,
        batch: slot.batch
      });
      return;
    } else {
      const v = VENUES.find(venue => venue.id === targetRoom);
      if (v) targetVenueName = v.name;
    }

    // Determine facultyId if missing
    let targetFacultyId = slot.facultyId;
    if (!targetFacultyId && slot.teacher) {
      const matched = facultyList.find(f => f.name === slot.teacher);
      if (matched) targetFacultyId = matched.id;
    }

    // 1. Update master weekly timetable
    const isPermanent = reschedulePayload?.isPermanent || false;

    setWeeklyTimetableState(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      // Free old slot
      if (updated[originDay]?.[originRoom]?.[originTime]) {
        updated[originDay][originRoom][originTime] = { status: 'free' };
      }
      // Set new slot
      if (!updated[targetDay]) updated[targetDay] = {};
      if (!updated[targetDay][targetRoom]) updated[targetDay][targetRoom] = {};
      updated[targetDay][targetRoom][targetTime] = {
        status: 'occupied',
        title: slot.course || slot.title,
        teacher: slot.teacher || 'Assigned Faculty',
        facultyId: targetFacultyId,
        batch: slot.batch || (slot.course?.match(/Sec\s*[A-J]/i)?.[0] || 'General'),
        isRescheduled: true,
        isPermanentMasterChange: isPermanent,
        rescheduledFrom: { roomId: originRoom, time: originTime, day: originDay }
      };
      return updated;
    });

    // 2. Update faculty list assignedSlots
    if (targetFacultyId) {
      setFacultyList(prev => prev.map(f => {
        if (f.id === targetFacultyId || f.name === slot.teacher) {
          const assigned = JSON.parse(JSON.stringify(f.assignedSlots || {}));
          if (assigned[originDay]) {
            assigned[originDay] = assigned[originDay].filter(s => !(s.roomId === originRoom && s.time === originTime));
          }
          if (!assigned[targetDay]) assigned[targetDay] = [];
          assigned[targetDay].push({
            roomId: targetRoom,
            time: targetTime,
            course: slot.course || slot.title,
            isRescheduled: true,
            isPermanentMasterChange: isPermanent
          });
          return { ...f, assignedSlots: assigned };
        }
        return f;
      }));
    }

    // 3. Celebratory Toast
    addToast(
      isPermanent ? '⚡ Master Timetable Overwritten!' : '⚡ Class Rescheduled Successfully!',
      `Moved "${slot.course || slot.title}" to ${targetVenueName} at ${targetTime} (${targetDay})${isPermanent ? ' permanently across semester master schedule' : ''} with 0 conflict.`,
      'success'
    );

    // 4. Trace Log
    setTraces(prev => [
      {
        id: Date.now().toString(),
        step: prev.length + 1,
        tag: isPermanent ? '[MASTER COMMIT]' : '[RESCHEDULE]',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: `${isPermanent ? 'Permanent master schedule update: ' : 'Relocated: '}${slot.course || slot.title} (${slot.teacher || 'Faculty'}) from ${originRoom} (${originTime}, ${originDay}) to ${targetRoom} at ${targetTime} (${targetDay}).`
      },
      ...prev
    ]);
  };

  const handleExchangeClasses = ({ slotA, slotB }) => {
    if (!slotA || !slotB) return;

    // Enforce mutual section rule
    const getSec = (s) => {
      const str = `${s.batch || ''} ${s.course || ''} ${s.title || ''}`;
      const m = str.match(/Sec\s*([A-J])/i);
      return m ? `Sec ${m[1].toUpperCase()}` : null;
    };
    const secA = getSec(slotA);
    const secB = getSec(slotB);
    if (secA && secB && secA !== secB) {
      addToast(
        'Mutual Section Rule',
        `Class exchange restricted: Both classes must belong to the same mutual section (${secA} ≠ ${secB}).`,
        'error'
      );
      return;
    }

    const dayA = slotA.day;
    const roomA = slotA.roomId;
    const timeA = slotA.time;

    const dayB = slotB.day;
    const roomB = slotB.roomId;
    const timeB = slotB.time;

    const facultyAId = slotA.facultyId || facultyList.find(f => f.name === slotA.teacher)?.id;
    const facultyBId = slotB.facultyId || facultyList.find(f => f.name === slotB.teacher)?.id;

    // 1. Update weeklyTimetableState
    setWeeklyTimetableState(prev => {
      const updated = JSON.parse(JSON.stringify(prev));
      const origA = updated[dayA]?.[roomA]?.[timeA] || {};
      const origB = updated[dayB]?.[roomB]?.[timeB] || {};

      if (!updated[dayA]) updated[dayA] = {};
      if (!updated[dayA][roomA]) updated[dayA][roomA] = {};
      if (!updated[dayB]) updated[dayB] = {};
      if (!updated[dayB][roomB]) updated[dayB][roomB] = {};

      // Swap contents:
      // At Slot A (Room A, Day A, Time A), put Course B & Teacher B
      updated[dayA][roomA][timeA] = {
        ...origB,
        title: slotB.course || origB.title,
        teacher: slotB.teacher || origB.teacher,
        facultyId: facultyBId,
        batch: slotB.batch || origB.batch || 'General',
        isExchanged: true,
        exchangedWith: slotA.teacher,
        status: 'occupied'
      };

      // At Slot B (Room B, Day B, Time B), put Course A & Teacher A
      updated[dayB][roomB][timeB] = {
        ...origA,
        title: slotA.course || origA.title,
        teacher: slotA.teacher || origA.teacher,
        facultyId: facultyAId,
        batch: slotA.batch || origA.batch || 'General',
        isExchanged: true,
        exchangedWith: slotB.teacher,
        status: 'occupied'
      };

      return updated;
    });

    // 2. Update facultyList
    setFacultyList(prev => prev.map(f => {
      let assigned = JSON.parse(JSON.stringify(f.assignedSlots || {}));

      // If Faculty A
      if (f.id === facultyAId || f.name === slotA.teacher) {
        if (assigned[dayA]) {
          assigned[dayA] = assigned[dayA].filter(s => !(s.roomId === roomA && s.time === timeA));
        }
        if (!assigned[dayB]) assigned[dayB] = [];
        assigned[dayB].push({
          roomId: roomB,
          time: timeB,
          course: slotA.course,
          isExchanged: true,
          exchangedWith: slotB.teacher
        });
        return { ...f, assignedSlots: assigned };
      }

      // If Faculty B
      if (f.id === facultyBId || f.name === slotB.teacher) {
        if (assigned[dayB]) {
          assigned[dayB] = assigned[dayB].filter(s => !(s.roomId === roomB && s.time === timeB));
        }
        if (!assigned[dayA]) assigned[dayA] = [];
        assigned[dayA].push({
          roomId: roomA,
          time: timeA,
          course: slotB.course,
          isExchanged: true,
          exchangedWith: slotA.teacher
        });
        return { ...f, assignedSlots: assigned };
      }

      return f;
    }));

    // 3. Celebratory Toast
    addToast(
      '⇄ Class Exchange Successful!',
      `Successfully exchanged classes between ${slotA.teacher} (${dayA} ${timeA}) and ${slotB.teacher} (${dayB} ${timeB}).`,
      'success'
    );

    // 4. Trace Log
    setTraces(prev => [
      {
        id: Date.now().toString(),
        step: prev.length + 1,
        tag: '[CLASS EXCHANGE]',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: `Faculty Swapped: ${slotA.teacher} taking ${roomB} at ${timeB} (${dayB}) ⇄ ${slotB.teacher} taking ${roomA} at ${timeA} (${dayA}). Both schedules updated.`
      },
      ...prev
    ]);
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
      // If batch had a class in the preceding hour, use that room;
      // otherwise fallback to the section's allocated home room.
      let fromRoom = null;
      if (batchPriorLocation) {
        fromRoom = {
          id: batchPriorLocation.roomId,
          name: batchPriorLocation.roomId,
          building: batchPriorLocation.building,
          floor: batchPriorLocation.floor
        };
      } else if (targetBatch && targetBatch !== 'General' && targetBatch !== 'None / General Workshop') {
        const match = targetBatch.match(/Sec\s+[A-J]/i);
        const cleanSec = match ? match[0] : targetBatch;
        const homeVenue = VENUES.find(v => v.homeSection === cleanSec);
        if (homeVenue) {
          fromRoom = {
            id: homeVenue.id,
            name: homeVenue.name,
            building: homeVenue.building,
            floor: homeVenue.floor
          };
        }
      }

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

  // Approve Booking (Locks slots on the specific day's schedule or permanent master update)
  const handleApproveBooking = (bookingId) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (!targetBooking) return;

    const bookingDay = targetBooking.day || selectedDay;
    const startIdx = TIME_SLOTS.findIndex(s => s.id === targetBooking.startTime);
    const duration = targetBooking.duration || 1;
    const isPermanent = targetBooking.isPermanent || false;

    setWeeklyTimetableState((prev) => {
      const updated = JSON.parse(JSON.stringify(prev));
      const daysToUpdate = isPermanent ? DAYS_OF_WEEK : [bookingDay];

      daysToUpdate.forEach(d => {
        if (!updated[d]) updated[d] = {};
        if (!updated[d][targetBooking.roomId]) updated[d][targetBooking.roomId] = {};

        for (let i = 0; i < duration; i++) {
          const slot = TIME_SLOTS[startIdx + i];
          if (slot) {
            updated[d][targetBooking.roomId][slot.id] = {
              status: 'booked',
              title: targetBooking.purpose,
              batch: targetBooking.batch,
              bookedBy: targetBooking.requestedBy,
              isPermanentMasterChange: isPermanent
            };
          }
        }

        // Feature 2: Dual-Schedule Sync & Room Release for Merged Sections
        // If 2+ sections merged, release their original separate classrooms at that hour
        if (targetBooking.isMergedSections && Array.isArray(targetBooking.mergedSections)) {
          Object.keys(updated[d]).forEach(rId => {
            if (rId !== targetBooking.roomId) {
              for (let i = 0; i < duration; i++) {
                const slot = TIME_SLOTS[startIdx + i];
                if (slot) {
                  const rSlot = updated[d][rId]?.[slot.id];
                  if (rSlot && rSlot.status === 'occupied' && rSlot.batch) {
                    const match = targetBooking.mergedSections.some(sec => rSlot.batch.includes(sec));
                    if (match) {
                      updated[d][rId][slot.id] = { status: 'free' };
                    }
                  }
                }
              }
            }
          });
        }
      });

      return updated;
    });

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'approved' } : b))
    );

    addToast(
      isPermanent ? 'Permanent Master Timetable Overwritten' : 'Booking Approved & Locked',
      `Room ${targetBooking.roomName} successfully locked for ${isPermanent ? 'recurring weekly timetable' : `${bookingDay} (${targetBooking.timeSlot})`} on master timetable.`,
      'success'
    );

    setTraces(prev => [
      {
        id: Date.now().toString(),
        step: prev.length + 1,
        tag: isPermanent ? '[MASTER COMMIT]' : '[LOCK]',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: `${isPermanent ? 'Permanent Master Schedule Commit: ' : 'Single-day lock: '}Room ${targetBooking.roomName} booked for ${targetBooking.batch} (${targetBooking.purpose}) at ${targetBooking.timeSlot}.`
      },
      ...prev
    ]);
  };

  const handleCommitGeneratedTimetable = (newTimetable, updatedFaculty) => {
    if (newTimetable) setWeeklyTimetableState(newTimetable);
    if (updatedFaculty) setFacultyList(updatedFaculty);
    addToast(
      '🎉 Master Timetable Deployed!',
      'Zero-Walk Constraint solver schedule has been committed to the live campus master schedule.',
      'success'
    );
    setTraces(prev => [
      {
        id: Date.now().toString(),
        step: prev.length + 1,
        tag: '[GENERATOR]',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: 'Zero-Walk Constraint Solver (Google OR-Tools CP-SAT) deployed new semester master timetable for Sections A–J.'
      },
      ...prev
    ]);
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

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 font-sans">
        <LoginPortal onLogin={handleLogin} />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50/50 font-sans text-zinc-900 overflow-hidden">
      {/* Top Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        activeRole={activeRole}
        setActiveRole={handleRoleChange}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          onApplyPreset={handleApplyPreset}
          facultyOnLeaveCount={facultyOnLeaveCount}
          pendingBookingsCount={pendingBookingsCount}
          freeVenuesCount={freeVenuesCount}
          totalVenuesCount={VENUES.length}
          unlockedSlotsCount={unlockedSlotsCount}
          onOpenTimetable={handleOpenTimetable}
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
              onSelectDay={setSelectedDay}
              onOpenTimetable={handleOpenTimetable}
              onRescheduleSlot={handleRescheduleSlot}
              onOpenExchangeModal={handleOpenExchangeModal}
              onBookVenue={handleOpenBooking}
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
              venues={VENUES}
              facultyList={facultyList}
              onCommitGeneratedTimetable={handleCommitGeneratedTimetable}
            />
          )}

          {activeTab === 'timetable' && (
            <TimetableView
              facultyList={facultyList}
              weeklyTimetableState={weeklyTimetableState}
              selectedFacultyId={timetableInitialFacultyId}
              selectedBatch={timetableInitialBatch}
              onRescheduleSlot={handleRescheduleSlot}
              onOpenExchangeModal={handleOpenExchangeModal}
              onExchangeClasses={handleExchangeClasses}
              onResetSchedule={handleResetSchedule}
            />
          )}
        </main>
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
        selectedDay={selectedDay}
        weeklyTimetableState={weeklyTimetableState}
        allVenues={VENUES}
        onSwitchVenue={(venueId) => {
          const v = VENUES.find(item => item.id === venueId);
          if (v) setSelectedBookingVenue(v);
        }}
      />

      {/* Teacher Class Exchange & Reschedule Modal */}
      <ClassExchangeModal
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        initialSlot={exchangeModalInitialSlot}
        facultyList={facultyList}
        weeklyTimetableState={weeklyTimetableState}
        venues={VENUES}
        onConfirmExchange={handleExchangeClasses}
        onConfirmReschedule={handleRescheduleSlot}
      />

      {/* Popover Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export default App;
