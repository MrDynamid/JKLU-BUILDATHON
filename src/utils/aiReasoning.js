// AI Agent Reasoning Engine for JKLU First Semester Venues
// Campus academic slots: 9 AM to 5 PM (8 slots)

export const CAMPUS_TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

export function calculateWalkingDelay(fromRoom, toRoom) {
  if (!fromRoom || !toRoom) return null;
  if (fromRoom.id === toRoom.id) {
    return { minutes: 0, label: '0m walk · Same room', isZeroDelay: true };
  }
  if (fromRoom.building === toRoom.building && fromRoom.floor === toRoom.floor) {
    return {
      minutes: 0,
      label: `0m walk · ${toRoom.building} ${toRoom.floorLabel}`,
      isZeroDelay: true,
      reason: `Same floor as ${fromRoom.name || fromRoom.id}`
    };
  }
  if (fromRoom.building === toRoom.building) {
    const floorDiff = Math.abs(fromRoom.floor - toRoom.floor);
    return {
      minutes: floorDiff * 1.5,
      label: `${floorDiff * 1.5}m walk · ${toRoom.building}`,
      isZeroDelay: false,
      reason: `Floor ${fromRoom.floor} → ${toRoom.floor}`
    };
  }

  const pair = [fromRoom.building, toRoom.building].sort().join('-');
  const buildingDelays = {
    'EB1-EB2': 3,
    'EB1-TB': 5,
    'EB2-TB': 4,
    'EB1-IET': 4,
    'EB2-IET': 5,
    'IET-TB': 6
  };
  const mins = buildingDelays[pair] || 5;
  return {
    minutes: mins,
    label: `${mins}m walk · ${fromRoom.building} → ${toRoom.building}`,
    isZeroDelay: false,
    reason: `Walk between ${fromRoom.building} & ${toRoom.building}`
  };
}

export function calculateContinuousFreeHours(roomId, startTimeId, timetableState, facultyList) {
  const timeSlots = CAMPUS_TIME_SLOTS;
  const startIndex = timeSlots.indexOf(startTimeId);
  if (startIndex === -1) return { hours: 0, range: 'N/A', slots: [], isOccupiedAtSelected: false, firstAvailableSlot: '09:00' };

  const roomSchedule = timetableState[roomId] || {};

  const checkSlotFree = (slotId) => {
    const slotData = roomSchedule[slotId];
    if (!slotData || slotData.status === 'free') return true;
    if (slotData.status === 'booked') return false;
    if (slotData.facultyId) {
      const fac = facultyList.find(f => f.id === slotData.facultyId);
      if (fac && fac.onLeave) {
        return true;
      }
    }
    return false;
  };

  const isOccupiedAtSelected = !checkSlotFree(startTimeId);

  // 1. Calculate consecutive free slots from selected time
  let consecutiveFromSelected = 0;
  const freeSlotIds = [];

  if (!isOccupiedAtSelected) {
    for (let i = startIndex; i < timeSlots.length; i++) {
      const slotId = timeSlots[i];
      if (checkSlotFree(slotId)) {
        consecutiveFromSelected++;
        freeSlotIds.push(slotId);
      } else {
        break;
      }
    }
  }

  // 2. Also find the largest continuous free window across the whole day
  let maxWindow = 0;
  let maxStartIdx = -1;
  let currentWindow = 0;
  let currentStart = -1;

  for (let i = 0; i < timeSlots.length; i++) {
    if (checkSlotFree(timeSlots[i])) {
      if (currentWindow === 0) currentStart = i;
      currentWindow++;
      if (currentWindow > maxWindow) {
        maxWindow = currentWindow;
        maxStartIdx = currentStart;
      }
    } else {
      currentWindow = 0;
      currentStart = -1;
    }
  }

  const formatHour = (hStr) => {
    const h = parseInt(hStr.split(':')[0], 10);
    if (h === 12) return '12:00 PM';
    if (h > 12) return `${h - 12}:00 PM`;
    return `${h}:00 AM`;
  };

  const formatEndHour = (lastSlotId) => {
    const h = parseInt(lastSlotId.split(':')[0], 10) + 1;
    if (h === 12) return '12:00 PM';
    if (h > 12) return `${h - 12}:00 PM`;
    return `${h}:00 AM`;
  };

  let range = 'Occupied';
  if (consecutiveFromSelected > 0) {
    const startStr = formatHour(startTimeId);
    const endSlotId = timeSlots[startIndex + consecutiveFromSelected - 1];
    const endStr = formatEndHour(endSlotId);
    range = `${startStr} – ${endStr} (${consecutiveFromSelected}h straight)`;
  } else if (maxWindow > 0 && maxStartIdx !== -1) {
    const startStr = formatHour(timeSlots[maxStartIdx]);
    const endSlotId = timeSlots[maxStartIdx + maxWindow - 1];
    const endStr = formatEndHour(endSlotId);
    range = `Next: ${startStr} – ${endStr} (${maxWindow}h)`;
  }

  // First available slot in the day
  const firstAvailableSlot = timeSlots.find(s => checkSlotFree(s)) || '09:00';

  return {
    hours: consecutiveFromSelected,
    maxWindow,
    range,
    slots: freeSlotIds,
    isOccupiedAtSelected,
    firstAvailableSlot
  };
}

export function checkUnlockedViaLeave(roomId, timetableState, facultyList) {
  const roomSchedule = timetableState[roomId] || {};
  const unlockedSlots = [];

  Object.entries(roomSchedule).forEach(([timeSlot, slot]) => {
    if (slot.facultyId) {
      const fac = facultyList.find(f => f.id === slot.facultyId);
      if (fac && fac.onLeave) {
        unlockedSlots.push({
          timeSlot,
          teacher: fac.name,
          course: slot.title
        });
      }
    }
  });

  return {
    isUnlocked: unlockedSlots.length > 0,
    unlockedSlots
  };
}

export function parseNaturalLanguageQuery(queryText) {
  if (!queryText || !queryText.trim()) return null;
  const text = queryText.toLowerCase();

  const parsed = {
    capacity: null,
    displayTech: null,
    powerSockets: null,
    startTime: null,
    batch: null,
    day: null
  };

  if (text.includes('monday')) parsed.day = 'Monday';
  else if (text.includes('tuesday')) parsed.day = 'Tuesday';
  else if (text.includes('wednesday')) parsed.day = 'Wednesday';
  else if (text.includes('thursday')) parsed.day = 'Thursday';
  else if (text.includes('friday')) parsed.day = 'Friday';

  const capMatch = text.match(/(\d{2,3})\s*(?:seats|students|people|cap)?/i);
  if (capMatch && parseInt(capMatch[1], 10) >= 20) {
    parsed.capacity = parseInt(capMatch[1], 10);
  }

  if (text.includes('smart board') || text.includes('smartboard')) {
    parsed.displayTech = 'Smart Board';
  } else if (text.includes('projector')) {
    parsed.displayTech = 'Projector';
  }

  if (text.includes('lab') || text.includes('pc') || text.includes('coding') || text.includes('programming')) {
    parsed.powerSockets = 'High (Every Seat)';
  } else if (text.includes('amphitheatre') || text.includes('amp') || text.includes('auditorium')) {
    parsed.powerSockets = 'None / Low';
  } else if (text.includes('classroom')) {
    parsed.powerSockets = 'Medium';
  }

  const timeMatch = text.match(/(?:from|at)\s*(\d{1,2})(?::00)?\s*(am|pm)?/i);
  if (timeMatch) {
    let hour = parseInt(timeMatch[1], 10);
    const meridiem = timeMatch[2]?.toLowerCase();
    if (meridiem === 'pm' && hour < 12) hour += 12;
    if (meridiem === 'am' && hour === 12) hour = 0;
    if (!meridiem && hour < 8) hour += 12;
    if (hour >= 9 && hour <= 16) {
      parsed.startTime = `${hour.toString().padStart(2, '0')}:00`;
    }
  }

  // First semester sections: Sec A to J
  const secMatch = text.match(/sec(?:tion)?\s*([a-j])/i);
  if (secMatch) {
    const letter = secMatch[1].toUpperCase();
    const batchMap = {
      'A': 'Sec A (EB1-101)',
      'B': 'Sec B (EB1-102)',
      'C': 'Sec C (EB1-103)',
      'D': 'Sec D (EB1-104)',
      'E': 'Sec E (EB2-104)',
      'F': 'Sec F (EB2-105)',
      'G': 'Sec G (EB2-106)',
      'H': 'Sec H (EB2-205)',
      'I': 'Sec I (EB2-204)',
      'J': 'Sec J (EB2-202)'
    };
    if (batchMap[letter]) {
      parsed.batch = batchMap[letter];
    }
  }

  return parsed;
}
