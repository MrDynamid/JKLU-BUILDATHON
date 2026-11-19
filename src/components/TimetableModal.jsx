import React, { useEffect, useRef, useState, useMemo } from 'react';
import { 
  X, 
  ExternalLink, 
  Zap, 
  Calendar, 
  Clock, 
  Building, 
  Users, 
  Sparkles, 
  Printer, 
  User, 
  Layers,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { TIME_SLOTS, DAYS_OF_WEEK } from '../data/campusData';
import { CustomSelect } from './CustomSelect';

export function TimetableModal({
  isOpen,
  onClose,
  initialFacultyId,
  initialBatch,
  facultyList = [],
  weeklyTimetableState = {},
  onRescheduleSlot
}) {
  const dialogRef = useRef(null);
  const [viewMode, setViewMode] = useState('faculty'); // 'faculty' | 'batch'
  const [selectedFacultyId, setSelectedFacultyId] = useState(initialFacultyId || facultyList[0]?.id || 'fac-1');
  const [selectedBatch, setSelectedBatch] = useState(initialBatch || 'Sec A');

  // Available batches
  const availableBatches = ['Sec A', 'Sec B', 'Sec C', 'Sec D', 'Sec E', 'Sec F', 'Sec G', 'Sec H', 'Sec I', 'Sec J'];

  useEffect(() => {
    if (initialFacultyId) {
      setSelectedFacultyId(initialFacultyId);
      setViewMode('faculty');
    }
    if (initialBatch) {
      setSelectedBatch(initialBatch);
      setViewMode('batch');
    }
  }, [initialFacultyId, initialBatch]);

  // Modal open / close synchronization
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

  const selectedFaculty = useMemo(() => {
    return facultyList.find(f => f.id === selectedFacultyId) || facultyList[0];
  }, [facultyList, selectedFacultyId]);

  // Build the timetable matrix data for the selected mode
  const timetableMatrix = useMemo(() => {
    // Structure: { [day]: { [timeId]: slotInfo } }
    const matrix = {};
    DAYS_OF_WEEK.forEach(day => {
      matrix[day] = {};
      TIME_SLOTS.forEach(slot => {
        matrix[day][slot.id] = null;
      });
    });

    if (viewMode === 'faculty') {
      if (!selectedFaculty) return matrix;
      const assigned = selectedFaculty.assignedSlots || {};

      DAYS_OF_WEEK.forEach(day => {
        const daySlots = Array.isArray(assigned) 
          ? assigned 
          : (assigned[day] || []);

        daySlots.forEach(s => {
          if (matrix[day] && s.time) {
            matrix[day][s.time] = {
              course: s.course,
              roomId: s.roomId,
              time: s.time,
              day,
              teacher: selectedFaculty.name,
              facultyId: selectedFaculty.id,
              onLeave: selectedFaculty.onLeave,
              isRescheduled: s.isRescheduled,
              batch: s.course.includes('Sec') ? s.course.match(/Sec\s*[A-J]/i)?.[0] : 'General'
            };
          }
        });
      });
    } else {
      // Batch mode: scan weeklyTimetableState across all rooms
      DAYS_OF_WEEK.forEach(day => {
        const dayRooms = weeklyTimetableState[day] || {};
        Object.entries(dayRooms).forEach(([roomId, roomSched]) => {
          Object.entries(roomSched).forEach(([timeId, slotData]) => {
            if (slotData && slotData.status === 'occupied') {
              const matchesBatch = slotData.batch?.includes(selectedBatch) || slotData.title?.includes(selectedBatch);
              if (matchesBatch) {
                matrix[day][timeId] = {
                  course: slotData.title,
                  roomId,
                  time: timeId,
                  day,
                  teacher: slotData.teacher || 'Assigned Faculty',
                  facultyId: slotData.facultyId,
                  batch: selectedBatch,
                  isRescheduled: slotData.isRescheduled
                };
              }
            }
          });
        });
      });
    }

    return matrix;
  }, [viewMode, selectedFaculty, selectedBatch, weeklyTimetableState]);

  // Open timetable in a separate native browser window
  const handleOpenInSeparateWindow = () => {
    const title = viewMode === 'faculty' 
      ? `JKLU Timetable - ${selectedFaculty?.name || 'Faculty'}` 
      : `JKLU Timetable - Batch ${selectedBatch}`;

    const newWindow = window.open('', '_blank', 'width=1100,height=750,menubar=no,toolbar=no,location=no,status=no');
    if (!newWindow) {
      alert('Popup blocked. Please allow popups for this site to open the timetable in a separate window.');
      return;
    }

    // Generate HTML for the popup window
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Inter', sans-serif; }
          .mono { font-family: 'JetBrains Mono', monospace; }
          @media print {
            .no-print { display: none !important; }
            body { padding: 0; background: white; color: black; }
          }
        </style>
      </head>
      <body class="bg-slate-50 text-slate-800 p-6">
        <div class="max-w-6xl mx-auto space-y-4">
          <!-- Top Header -->
          <div class="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xl font-black text-slate-900 tracking-tight">JK Lakshmipat University</span>
                <span class="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Academic Year 2026-27</span>
              </div>
              <h1 class="text-lg font-bold text-slate-800 mt-1">${title}</h1>
              <p class="text-xs text-slate-500">${viewMode === 'faculty' ? `${selectedFaculty?.department} · ${selectedFaculty?.course}` : `First Semester Group · Official Academic Schedule`}</p>
            </div>
            <div class="no-print flex items-center gap-2">
              <button onclick="window.print()" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5">
                🖨️ Print Timetable
              </button>
            </div>
          </div>

          <!-- Schedule Table -->
          <div class="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold">
                  <th class="py-3 px-3 w-24 text-center border-r border-slate-200">Time Slot</th>
                  ${DAYS_OF_WEEK.map(day => `<th class="py-3 px-3 text-center border-r border-slate-200 last:border-r-0">${day}</th>`).join('')}
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-sans">
                ${TIME_SLOTS.map(slot => {
                  if (slot.id === '12:00') {
                    return `
                      <tr class="bg-amber-50/70 border-y border-amber-200">
                        <td class="py-2.5 px-2 text-center font-bold text-amber-900 bg-amber-100/70 border-r border-amber-200 mono text-[11px]">
                          12 PM
                          <div class="text-[9px] text-amber-700 font-semibold">12:00 - 1:00</div>
                        </td>
                        <td colspan="5" class="py-2.5 px-4 text-center bg-amber-50/50">
                          <div class="inline-flex items-center justify-center gap-2 text-amber-950 font-bold text-xs">
                            <span>Lunch</span>
                          </div>
                        </td>
                      </tr>
                    `;
                  }
                  return `
                  <tr class="hover:bg-slate-50/50">
                    <td class="py-3 px-2 text-center font-bold text-slate-600 bg-slate-50/50 border-r border-slate-200 mono text-[11px]">
                      ${slot.label}
                      <div class="text-[9px] text-slate-400 font-normal">${slot.range.split(' ')[0]}</div>
                    </td>
                    ${DAYS_OF_WEEK.map(day => {
                      const item = timetableMatrix[day]?.[slot.id];
                      if (!item) {
                        return `<td class="py-2.5 px-3 border-r border-slate-100 last:border-r-0 text-center text-slate-300 text-[11px]">Free</td>`;
                      }
                      return `
                        <td class="py-2.5 px-3 border-r border-slate-100 last:border-r-0 bg-blue-50/40">
                          <div class="font-bold text-slate-900 text-xs">${item.course}</div>
                          <div class="mt-1 flex items-center gap-1.5 text-[10px]">
                            <span class="font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">${item.roomId}</span>
                            <span class="text-slate-500">${item.teacher || item.batch}</span>
                          </div>
                        </td>
                      `;
                    }).join('')}
                  </tr>
                `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <!-- Footer Timestamp -->
          <div class="text-[11px] text-slate-400 flex items-center justify-between pt-2">
            <span>Generated via JKLU Smart Timetable & Dynamic Scheduler</span>
            <span>Document Active for Academic Session 2026-27</span>
          </div>
        </div>
      </body>
      </html>
    `;

    newWindow.document.write(htmlContent);
    newWindow.document.close();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="fixed inset-0 m-auto p-0 rounded-3xl bg-white text-zinc-900 border border-zinc-200/90 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-sm max-w-5xl w-[94vw] max-h-[90vh] overflow-hidden flex flex-col font-sans"
    >
      {/* Modal Top Header */}
      <div className="p-4 sm:p-5 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/50">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <Calendar className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
              Campus Weekly Timetable Window
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Sem 1 Live Grid
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            View full weekly schedules by faculty or batch, perform 1-click AI rescheduling, or pop out to a separate window.
          </p>
        </div>

        {/* View Mode Toggle & Popout Action */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-zinc-200/70 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('faculty')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'faculty' ? 'bg-white text-zinc-900 shadow-2xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Faculty
            </button>
            <button
              type="button"
              onClick={() => setViewMode('batch')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'batch' ? 'bg-white text-zinc-900 shadow-2xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Batch / Sec
            </button>
          </div>

          {/* Open in Separate Browser Window Button */}
          <button
            type="button"
            onClick={handleOpenInSeparateWindow}
            title="Open timetable in a separate dedicated window"
            className="px-3 py-1.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-xs font-bold text-zinc-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Pop Out Window</span>
          </button>

          {/* Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Selector Sub-bar */}
      <div className="px-5 py-3 border-b border-zinc-100 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-zinc-500">
            {viewMode === 'faculty' ? 'Select Faculty Member:' : 'Select First Semester Batch:'}
          </span>
          {viewMode === 'faculty' ? (
            <CustomSelect
              value={selectedFacultyId}
              onChange={setSelectedFacultyId}
              options={facultyList.map(f => ({
                value: f.id,
                label: `${f.name} — ${f.course}`
              }))}
              className="min-w-[220px]"
              buttonClassName="bg-zinc-50 border-zinc-200 py-1.5"
            />
          ) : (
            <CustomSelect
              value={selectedBatch}
              onChange={setSelectedBatch}
              options={availableBatches.map(b => ({
                value: b,
                label: `${b} (First Semester)`
              }))}
              className="min-w-[180px]"
              buttonClassName="bg-zinc-50 border-zinc-200 py-1.5"
            />
          )}
        </div>

        {viewMode === 'faculty' && selectedFaculty && (
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${selectedFaculty.onLeave ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            <span className="font-medium text-zinc-600">
              {selectedFaculty.onLeave ? 'Currently on Leave' : 'Present on Campus'}
            </span>
          </div>
        )}
      </div>

      {/* Main Weekly Matrix Grid */}
      <div className="flex-1 overflow-auto p-4 sm:p-5">
        <div className="min-w-[760px] bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100/80 border-b border-zinc-200 text-zinc-700 font-bold">
                <th className="py-3 px-3 w-24 text-center border-r border-zinc-200">Time</th>
                {DAYS_OF_WEEK.map(day => (
                  <th key={day} className="py-3 px-3 text-center border-r border-zinc-200 last:border-r-0">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-sans">
              {TIME_SLOTS.map(slot => {
                if (slot.id === '12:00') {
                  return (
                    <tr key={slot.id} className="bg-amber-50/70 border-y border-amber-200/90">
                      <td className="py-2.5 px-2 text-center font-bold text-amber-900 bg-amber-100/70 border-r border-amber-200 font-mono text-[11px]">
                        <div>12 PM</div>
                        <div className="text-[9px] text-amber-700 font-semibold leading-tight">12:00 - 1:00</div>
                      </td>
                      <td colSpan={DAYS_OF_WEEK.length} className="py-2.5 px-4 text-center bg-amber-50/50">
                        <div className="flex items-center justify-center gap-2 text-amber-950 font-bold text-xs">
                          <span>Lunch</span>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={slot.id} className="hover:bg-zinc-50/50">
                    <td className="py-3 px-2 text-center font-bold text-zinc-600 bg-zinc-50/50 border-r border-zinc-200 font-mono text-[11px]">
                      <div>{slot.label}</div>
                      <div className="text-[9px] text-zinc-400 font-normal leading-tight">{slot.range.split(' ')[0]}</div>
                    </td>
                    {DAYS_OF_WEEK.map(day => {
                      const item = timetableMatrix[day]?.[slot.id];
                      if (!item) {
                        return (
                          <td key={day} className="py-2.5 px-3 border-r border-zinc-100 last:border-r-0 text-center text-zinc-300 text-[11px]">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-200 mr-1" />
                            <span>Free</span>
                          </td>
                        );
                      }

                      return (
                        <td key={day} className="py-2 px-2.5 border-r border-zinc-100 last:border-r-0 bg-blue-50/30 hover:bg-blue-50/60 transition-colors">
                          <div className="flex flex-col justify-between h-full space-y-1.5">
                            <div>
                              <div className="font-bold text-zinc-900 text-[11px] leading-tight line-clamp-2">
                                {item.course}
                              </div>
                              <div className="mt-1 flex flex-wrap items-center gap-1 text-[10px]">
                                <span className="font-bold px-1.5 py-0.2 rounded bg-white text-zinc-800 border border-zinc-200">
                                  {item.roomId}
                                </span>
                                {item.batch && (
                                  <span className="font-medium px-1 py-0.2 rounded bg-blue-100 text-blue-800">
                                    {item.batch}
                                  </span>
                                )}
                                {item.isRescheduled && (
                                  <span className="font-bold px-1 py-0.2 rounded bg-purple-100 text-purple-800">
                                    Rescheduled
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* 1-Click Reschedule Trigger Button */}
                            <div className="pt-1 border-t border-blue-100/60 flex items-center justify-between">
                              <span className="text-[10px] text-zinc-400 truncate max-w-[80px]">
                                {item.teacher}
                              </span>
                              <button
                                type="button"
                                onClick={() => onRescheduleSlot(item)}
                                title="Pick a clash-free alternative slot or custom time"
                                className="px-2 py-0.5 rounded-md bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                              >
                                <Zap className="w-2.5 h-2.5 fill-current" />
                                <span>Reschedule</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Bottom Bar */}
      <div className="p-3 px-5 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Click <strong>"Reschedule"</strong> on any lecture to choose a clash-free alternative slot or custom venue.</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </dialog>
  );
}

export default TimetableModal;
