import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Layers, 
  CheckCircle2, 
  ArrowLeftRight, 
  RotateCcw,
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  ChevronDown,
  Building,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { TIME_SLOTS, DAYS_OF_WEEK, VENUES } from '../data/campusData';
import { CustomSelect } from '../components/CustomSelect';

export function TimetableView({
  facultyList = [],
  weeklyTimetableState = {},
  selectedFacultyId: propFacultyId,
  selectedBatch: propBatch,
  onRescheduleSlot,
  onOpenExchangeModal,
  onExchangeClasses,
  onResetSchedule
}) {
  const [viewMode, setViewMode] = useState('faculty'); // 'faculty' | 'batch' | 'room'
  const [selectedFacultyId, setSelectedFacultyId] = useState(propFacultyId || facultyList[0]?.id || 'fac-1');
  const [selectedBatch, setSelectedBatch] = useState(propBatch || 'Sec A');
  const [selectedRoomId, setSelectedRoomId] = useState('EB1-101');
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Sync when prop changes from parent navigation
  React.useEffect(() => {
    if (propFacultyId) {
      setSelectedFacultyId(propFacultyId);
      setViewMode('faculty');
    }
  }, [propFacultyId]);

  React.useEffect(() => {
    if (propBatch) {
      setSelectedBatch(propBatch);
      setViewMode('batch');
    }
  }, [propBatch]);

  const availableBatches = ['Sec A', 'Sec B', 'Sec C', 'Sec D', 'Sec E', 'Sec F', 'Sec G', 'Sec H', 'Sec I', 'Sec J'];

  const selectedFaculty = useMemo(() => {
    return facultyList.find(f => f.id === selectedFacultyId) || facultyList[0];
  }, [facultyList, selectedFacultyId]);

  const selectedVenue = useMemo(() => {
    return VENUES.find(v => v.id === selectedRoomId) || VENUES[0];
  }, [selectedRoomId]);

  // Build the timetable matrix data for the selected mode
  const timetableMatrix = useMemo(() => {
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
              isExchanged: s.isExchanged,
              exchangedWith: s.exchangedWith,
              batch: s.course.includes('Sec') ? s.course.match(/Sec\s*[A-J]/i)?.[0] : (s.batch || 'General')
            };
          }
        });
      });
    } else if (viewMode === 'room') {
      // Room mode: scan weeklyTimetableState for selectedRoomId
      DAYS_OF_WEEK.forEach(day => {
        const roomSched = weeklyTimetableState[day]?.[selectedRoomId] || {};
        Object.entries(roomSched).forEach(([timeId, slotData]) => {
          if (slotData && slotData.status === 'occupied') {
            matrix[day][timeId] = {
              course: slotData.title,
              roomId: selectedRoomId,
              time: timeId,
              day,
              teacher: slotData.teacher || 'Assigned Faculty',
              facultyId: slotData.facultyId,
              batch: slotData.batch || 'General',
              isRescheduled: slotData.isRescheduled,
              isExchanged: slotData.isExchanged,
              exchangedWith: slotData.exchangedWith
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
                const itemData = {
                  course: slotData.title,
                  roomId,
                  time: timeId,
                  day,
                  teacher: slotData.teacher || 'Assigned Faculty',
                  facultyId: slotData.facultyId,
                  batch: selectedBatch,
                  isRescheduled: slotData.isRescheduled,
                  isExchanged: slotData.isExchanged,
                  exchangedWith: slotData.exchangedWith
                };

                // Support concurrent group splits (e.g. A1 in Lab, A2 in Tutorial)
                if (matrix[day][timeId]) {
                  if (Array.isArray(matrix[day][timeId])) {
                    matrix[day][timeId].push(itemData);
                  } else {
                    matrix[day][timeId] = [matrix[day][timeId], itemData];
                  }
                } else {
                  matrix[day][timeId] = itemData;
                }
              }
            }
          });
        });
      });
    }

    return matrix;
  }, [viewMode, selectedFaculty, selectedBatch, selectedRoomId, weeklyTimetableState]);

  // Total scheduled count
  const totalWeeklyClasses = useMemo(() => {
    let count = 0;
    DAYS_OF_WEEK.forEach(day => {
      TIME_SLOTS.forEach(slot => {
        if (slot.id !== '12:00' && timetableMatrix[day]?.[slot.id]) {
          const val = timetableMatrix[day][slot.id];
          count += Array.isArray(val) ? val.length : 1;
        }
      });
    });
    return count;
  }, [timetableMatrix]);

  // Export timetable dataset to CSV or Excel-Ready format
  const handleExportCSV = (excelMode = false) => {
    const headers = ['Day', 'Time Slot', 'Room No.', 'Building', 'Course Name', 'Section / Batch', 'Assigned Professor', 'Status'];
    const rows = [headers];

    DAYS_OF_WEEK.forEach(day => {
      const dayRooms = weeklyTimetableState[day] || {};
      Object.entries(dayRooms).forEach(([roomId, roomSched]) => {
        Object.entries(roomSched).forEach(([timeId, slotData]) => {
          if (slotData && slotData.status === 'occupied') {
            const venue = VENUES.find(v => v.id === roomId);
            rows.push([
              day,
              timeId,
              roomId,
              venue?.building || 'Campus',
              `"${(slotData.title || '').replace(/"/g, '""')}"`,
              `"${(slotData.batch || '').replace(/"/g, '""')}"`,
              `"${(slotData.teacher || '').replace(/"/g, '""')}"`,
              slotData.isRescheduled ? 'Rescheduled' : (slotData.isExchanged ? 'Exchanged' : 'Standard')
            ]);
          }
        });
      });
    });

    const csvContent = (excelMode ? '\uFEFF' : '') + rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = excelMode ? 'jklu_master_timetable_excel.csv' : 'jklu_master_timetable.csv';
    link.click();
    URL.revokeObjectURL(url);
    setIsExportOpen(false);
  };

  // Pop out to a dedicated browser window/tab (PDF / Print layout)
  const handleOpenInSeparateWindow = () => {
    let title = `JKLU Timetable - ${selectedFaculty?.name || 'Faculty'}`;
    let subtitle = `${selectedFaculty?.department} · ${selectedFaculty?.course}`;
    if (viewMode === 'batch') {
      title = `JKLU Timetable - Section ${selectedBatch}`;
      subtitle = 'First Semester Group · Official Academic Schedule';
    } else if (viewMode === 'room') {
      title = `JKLU Timetable - Room ${selectedRoomId}`;
      subtitle = 'Venue Master Schedule · Academic Session 2026-27';
    }

    const newWindow = window.open('', '_blank', 'width=1150,height=800,menubar=no,toolbar=no,location=no,status=no');
    if (!newWindow) {
      alert('Popup blocked. Please allow popups for this site to open the timetable in a separate window.');
      return;
    }

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
              <p class="text-xs text-slate-500">${subtitle}</p>
            </div>
            <div class="no-print flex items-center gap-2">
              <button onclick="window.print()" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5">
                Print Timetable
              </button>
            </div>
          </div>

          <!-- Schedule Table -->
          <div class="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold">
                  <th class="py-3 px-3 w-28 text-center border-r border-slate-200">Time</th>
                  ${DAYS_OF_WEEK.map(day => `<th class="py-3 px-4 text-center border-r border-slate-200 last:border-r-0">${day}</th>`).join('')}
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
                            <span>Campus Lunch Break</span>
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
                      const itemVal = timetableMatrix[day]?.[slot.id];
                      if (!itemVal) {
                        return `<td class="py-2.5 px-3 border-r border-slate-100 last:border-r-0 text-center text-slate-300 text-[11px]">—</td>`;
                      }
                      const items = Array.isArray(itemVal) ? itemVal : [itemVal];
                      return `
                        <td class="py-2 px-2.5 border-r border-slate-100 last:border-r-0">
                          ${items.map(item => `
                            <div class="p-1.5 rounded-lg bg-blue-50/70 border border-blue-200/60 mb-1 last:mb-0">
                              <div class="font-bold text-slate-900 text-xs">${item.course}</div>
                              <div class="mt-1 flex items-center gap-1.5 text-[10px]">
                                <span class="font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">${item.roomId}</span>
                                <span class="text-slate-500">${item.teacher || item.batch}</span>
                              </div>
                            </div>
                          `).join('')}
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

  // Helper to render a single class slot card inside a table cell
  const renderSlotCard = (item, isSubItem = false) => {
    const isLab = (item.course || '').toLowerCase().includes('lab');
    const isTutorial = (item.course || '').toLowerCase().includes('tutorial') || (item.course || '').includes('(T');

    let cellBorder = 'border-l-4 border-blue-500 bg-white hover:bg-blue-50/40';
    if (item.isRescheduled) {
      cellBorder = 'border-l-4 border-purple-600 bg-purple-50/70 hover:bg-purple-100/80';
    } else if (item.isExchanged) {
      cellBorder = 'border-l-4 border-blue-600 bg-blue-50/70 hover:bg-blue-100/80';
    } else if (isLab) {
      cellBorder = 'border-l-4 border-teal-500 bg-teal-50/40 hover:bg-teal-50/70';
    } else if (isTutorial) {
      cellBorder = 'border-l-4 border-indigo-500 bg-indigo-50/30 hover:bg-indigo-50/60';
    }

    return (
      <div 
        key={item.roomId + item.course}
        onClick={() => onOpenExchangeModal && onOpenExchangeModal(item)}
        title="Click to reschedule or exchange this class"
        className={`p-2 rounded-xl border border-zinc-200/80 transition-all cursor-pointer group shadow-2xs ${cellBorder} ${isSubItem ? 'mb-1.5 last:mb-0' : ''}`}
      >
        <div className="flex flex-col justify-between h-full space-y-1">
          <div>
            <div className="font-bold text-zinc-900 text-xs leading-tight line-clamp-2 group-hover:text-blue-900">
              {item.course}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1 text-[10px]">
              <span className="font-bold font-mono px-1.5 py-0.2 rounded bg-white text-zinc-800 border border-zinc-200 shadow-2xs">
                {item.roomId}
              </span>
              {item.batch && (
                <span className="font-semibold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {item.batch}
                </span>
              )}
              {item.isRescheduled && (
                <span className="font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-900 border border-purple-200">
                  Rescheduled
                </span>
              )}
              {item.isExchanged && (
                <span className="font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 border border-blue-200" title={item.exchangedWith ? `Exchanged with ${item.exchangedWith}` : 'Exchanged'}>
                  ⇄ Swapped
                </span>
              )}
            </div>
          </div>

          <div className="pt-1 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-500">
            <span className="truncate max-w-[130px] font-medium" title={item.teacher}>
              {item.teacher}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-4 font-sans">
      {/* Top Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/60">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
                  Campus Timetable & Academic Scheduler
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Semester 1 Live Matrix
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Inspect 5-day academic schedules filtered by Faculty, Student Section, or Classroom, with live class exchange and conflict-free rescheduling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selector Sub-bar with View Filter & One-Click Export Engine */}
      <div className="px-5 py-3.5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-500">View By:</span>
            <CustomSelect
              value={viewMode}
              onChange={setViewMode}
              options={[
                { value: 'faculty', label: 'Faculty Member' },
                { value: 'batch', label: 'Student Section (Sec A-J)' },
                { value: 'room', label: 'Room / Classroom' }
              ]}
              buttonClassName="bg-zinc-50 border-zinc-200 py-1.5"
            />
          </div>

          {viewMode === 'faculty' && (
            <CustomSelect
              value={selectedFacultyId}
              onChange={setSelectedFacultyId}
              options={facultyList.map(f => ({
                value: f.id,
                label: `${f.name} — ${f.course}`
              }))}
              buttonClassName="bg-white border-zinc-200 py-1.5 max-w-sm"
            />
          )}

          {viewMode === 'batch' && (
            <CustomSelect
              value={selectedBatch}
              onChange={setSelectedBatch}
              options={availableBatches.map(b => ({
                value: b,
                label: `${b} (First Semester)`
              }))}
              buttonClassName="bg-white border-zinc-200 py-1.5"
            />
          )}

          {viewMode === 'room' && (
            <CustomSelect
              value={selectedRoomId}
              onChange={setSelectedRoomId}
              options={VENUES.map(v => ({
                value: v.id,
                label: `${v.id} (${v.name} · ${v.capacity} seats)`
              }))}
              buttonClassName="bg-white border-zinc-200 py-1.5"
            />
          )}
        </div>

        {/* Right side: Summary Metric + Export Engine Dropdown */}
        <div className="flex items-center gap-2 relative">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-zinc-50 rounded-lg border border-zinc-200 text-xs">
            <span className="text-zinc-500">Weekly Classes:</span>
            <strong className="text-zinc-900 font-bold">{totalWeeklyClasses} Classes</strong>
          </div>

          {viewMode === 'faculty' && selectedFaculty && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-zinc-50 rounded-lg border border-zinc-200">
              <span className={`w-2 h-2 rounded-full ${selectedFaculty.onLeave ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="font-semibold text-zinc-700">
                {selectedFaculty.onLeave ? 'On Leave' : 'Present'}
              </span>
            </div>
          )}

          {/* Dedicated One-Click Export Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsExportOpen(prev => !prev)}
              className="px-3 py-1.5 text-xs font-bold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-lg border border-zinc-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-zinc-600" />
              <span>Export Timetable</span>
              <ChevronDown className="w-3 h-3 text-zinc-500" />
            </button>

            {isExportOpen && (
              <div 
                className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-zinc-200 py-1.5 z-50 text-xs animate-in fade-in duration-100"
                onClick={() => setIsExportOpen(false)}
              >
                <div className="px-3 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Download Timetable
                </div>
                <button
                  type="button"
                  onClick={() => handleExportCSV(false)}
                  className="w-full px-3 py-2 text-left hover:bg-zinc-50 flex items-center gap-2 text-zinc-700 font-medium cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-bold text-zinc-900">Export CSV</div>
                    <div className="text-[10px] text-zinc-400">Master campus dataset (CSV)</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportCSV(true)}
                  className="w-full px-3 py-2 text-left hover:bg-zinc-50 flex items-center gap-2 text-zinc-700 font-medium cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-bold text-zinc-900">Export Excel-Ready Format</div>
                    <div className="text-[10px] text-zinc-400">Formatted with UTF-8 BOM</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={handleOpenInSeparateWindow}
                  className="w-full px-3 py-2 text-left hover:bg-zinc-50 flex items-center gap-2 text-zinc-700 font-medium cursor-pointer border-t border-zinc-100 mt-1"
                >
                  <Printer className="w-4 h-4 text-indigo-600" />
                  <div>
                    <div className="font-bold text-zinc-900">Printable Schedule (PDF)</div>
                    <div className="text-[10px] text-zinc-400">Filtered official PDF layout</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Context Information Strip */}
      <div className="p-3.5 rounded-xl bg-white border border-zinc-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        {viewMode === 'faculty' && selectedFaculty && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
              {selectedFaculty.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, '').trim()[0]}
            </div>
            <div>
              <div className="font-bold text-zinc-900">{selectedFaculty.name}</div>
              <div className="text-zinc-500 text-[11px]">{selectedFaculty.department} · {selectedFaculty.course}</div>
            </div>
          </div>
        )}

        {viewMode === 'batch' && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
              {selectedBatch.replace('Sec ', '')}
            </div>
            <div>
              <div className="font-bold text-zinc-900">First Semester — Section {selectedBatch.replace('Sec ', '')}</div>
              <div className="text-zinc-500 text-[11px]">Academic Schedule · EB1 / EB2 / TB Labs</div>
            </div>
          </div>
        )}

        {viewMode === 'room' && selectedVenue && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
              {selectedVenue.id.split('-')[0]}
            </div>
            <div>
              <div className="font-bold text-zinc-900">{selectedVenue.id} ({selectedVenue.name})</div>
              <div className="text-zinc-500 text-[11px]">{selectedVenue.building} · {selectedVenue.floorLabel} · {selectedVenue.capacity} seats ({selectedVenue.type})</div>
            </div>
          </div>
        )}

        <div className="text-zinc-400 text-[11px]">
          Click any lecture cell to initiate an <strong className="text-blue-700">Exchange</strong> or <strong className="text-purple-700">Reschedule</strong>.
        </div>
      </div>

      {/* Main Weekly Matrix Grid */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100/80 border-b border-zinc-200 text-zinc-700 font-bold">
                <th className="py-3 px-3 w-28 text-center border-r border-zinc-200">Time</th>
                {DAYS_OF_WEEK.map(day => (
                  <th key={day} className="py-3 px-4 text-center border-r border-zinc-200 last:border-r-0">
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
                      <td className="py-3 px-2 text-center font-bold text-amber-900 bg-amber-100/70 border-r border-amber-200 font-mono text-[11px]">
                        <div>12 PM</div>
                        <div className="text-[9px] text-amber-700 font-semibold leading-tight">12:00 - 1:00</div>
                      </td>
                      <td colSpan={DAYS_OF_WEEK.length} className="py-2.5 px-4 text-center bg-amber-50/50">
                        <div className="flex items-center justify-center gap-2 text-amber-950 font-bold text-xs">
                          <span>Campus Lunch Break</span>
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
                      const itemVal = timetableMatrix[day]?.[slot.id];
                      if (!itemVal) {
                        return (
                          <td key={day} className="py-3 px-3 border-r border-zinc-100 last:border-r-0 text-center text-zinc-300 text-[11px]">
                            <span className="text-zinc-300 font-normal select-none">—</span>
                          </td>
                        );
                      }

                      const items = Array.isArray(itemVal) ? itemVal : [itemVal];
                      return (
                        <td key={day} className="py-2 px-2.5 border-r border-zinc-100 last:border-r-0 align-top">
                          {items.map((item, idx) => renderSlotCard(item, items.length > 1))}
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
    </div>
  );
}

export default TimetableView;
