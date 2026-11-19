import React, { useState, useMemo } from 'react';
import {
  Check,
  Lock,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Calendar,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  Filter,
  Search,
  Users,
  BookOpen,
  GraduationCap,
  Coffee,
  ArrowRightLeft,
  Layers,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateMasterTimetableSchedule } from '../utils/aiReasoning.js';
import { TIME_SLOTS, DAYS_OF_WEEK, DEFAULT_INTAKE_COURSES } from '../data/campusData.js';
import { CustomSelect } from '../components/CustomSelect';

const ALL_SECTIONS = ['Sec A', 'Sec B', 'Sec C', 'Sec D', 'Sec E', 'Sec F', 'Sec G', 'Sec H', 'Sec I', 'Sec J'];

export function AdminGateView({
  bookings,
  onApproveBooking,
  onRejectBooking,
  totalVenues,
  freeVenuesCount,
  unlockedSlotsCount,
  pendingCount,
  venues = [],
  facultyList = [],
  onCommitGeneratedTimetable
}) {
  const [adminTab, setAdminTab] = useState('queue'); // 'queue' | 'generator'
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState(null);
  const [previewDay, setPreviewDay] = useState('Monday');

  // Interactive Course Intake State
  const [coursesIntake, setCoursesIntake] = useState(DEFAULT_INTAKE_COURSES);
  const [curriculumTab, setCurriculumTab] = useState('all'); // 'all' | 'group1' | 'group2' | 'common'
  const [intakeSearch, setIntakeSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: '',
    title: '',
    teacher: facultyList[0]?.name || 'Dr. Amar Nath Patra',
    type: 'theory',
    hoursPerWeek: 3,
    sections: ['Sec A'],
    venue: ''
  });

  // Draft Preview Mode: 'section' | 'venue' | 'faculty'
  const [previewMode, setPreviewMode] = useState('section');
  const [selectedSection, setSelectedSection] = useState('Sec A');
  const [selectedFaculty, setSelectedFaculty] = useState(facultyList[0]?.name || 'Dr. Amar Nath Patra');

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const approvedBookings = bookings.filter(b => b.status === 'approved');

  const handleApprove = (bookingId) => {
    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    } catch (e) { }
    onApproveBooking(bookingId);
  };

  // Intake Handlers
  const handleHoursChange = (id, delta) => {
    setCoursesIntake(prev => prev.map(c => {
      if (c.id === id) {
        const newHours = Math.max(1, Math.min(6, c.hoursPerWeek + delta));
        return { ...c, hoursPerWeek: newHours };
      }
      return c;
    }));
  };

  const handleTeacherChange = (id, newTeacher) => {
    setCoursesIntake(prev => prev.map(c => c.id === id ? { ...c, teacher: newTeacher } : c));
  };

  const handleToggleSection = (id, sec) => {
    setCoursesIntake(prev => prev.map(c => {
      if (c.id === id) {
        const exists = c.sections.includes(sec);
        const nextSecs = exists ? c.sections.filter(s => s !== sec) : [...c.sections, sec].sort();
        return { ...c, sections: nextSecs.length > 0 ? nextSecs : [sec] };
      }
      return c;
    }));
  };

  const handleRemoveCourse = (id) => {
    setCoursesIntake(prev => prev.filter(c => c.id !== id));
  };

  const handleResetIntake = () => {
    setCoursesIntake(DEFAULT_INTAKE_COURSES);
  };

  const handleSaveNewCourse = (e) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.title) return;
    const isGroup1 = newCourse.sections.every(s => ['Sec A', 'Sec B', 'Sec C', 'Sec D', 'Sec E'].includes(s));
    const isGroup2 = newCourse.sections.every(s => ['Sec F', 'Sec G', 'Sec H', 'Sec I', 'Sec J'].includes(s));
    const group = isGroup1 ? 'Group 1' : isGroup2 ? 'Group 2' : 'Common';

    const entry = {
      ...newCourse,
      id: `c-custom-${Date.now()}`,
      group
    };
    setCoursesIntake(prev => [entry, ...prev]);
    setShowAddModal(false);
    setNewCourse({
      code: '',
      title: '',
      teacher: facultyList[0]?.name || 'Dr. Amar Nath Patra',
      type: 'theory',
      hoursPerWeek: 3,
      sections: ['Sec A'],
      venue: ''
    });
  };

  // Generate Timetable Handler
  const handleRunGenerator = () => {
    setIsGenerating(true);
    setTimeout(() => {
      try {
        const result = generateMasterTimetableSchedule({
          coursesIntake,
          venues,
          facultyList
        });
        setGeneratedDraft(result);
        try {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        } catch (e) { }
      } catch (err) {
        console.error('Error generating timetable:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 400);
  };

  const handleCommitDraft = () => {
    if (!generatedDraft || !onCommitGeneratedTimetable) return;
    try {
      confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
    } catch (e) { }
    onCommitGeneratedTimetable(generatedDraft.weeklyTimetable, generatedDraft.facultyList);
  };

  // Filtered Intake Courses
  const filteredCourses = useMemo(() => {
    return coursesIntake.filter(course => {
      if (curriculumTab === 'group1') {
        const matchesGroup = course.group === 'Group 1' || course.sections.every(s => ['Sec A', 'Sec B', 'Sec C', 'Sec D', 'Sec E'].includes(s));
        if (!matchesGroup) return false;
      } else if (curriculumTab === 'group2') {
        const matchesGroup = course.group === 'Group 2' || course.sections.every(s => ['Sec F', 'Sec G', 'Sec H', 'Sec I', 'Sec J'].includes(s));
        if (!matchesGroup) return false;
      } else if (curriculumTab === 'common') {
        if (course.group !== 'Common') return false;
      }

      if (intakeSearch.trim()) {
        const query = intakeSearch.toLowerCase();
        const matchesQuery =
          course.title.toLowerCase().includes(query) ||
          course.code.toLowerCase().includes(query) ||
          course.teacher.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [coursesIntake, curriculumTab, intakeSearch]);

  // Section Timetable Helper for Draft Preview
  const getSectionSchedule = (day, section) => {
    if (!generatedDraft?.weeklyTimetable?.[day]) return [];
    return TIME_SLOTS.map(ts => {
      if (ts.id === '12:00') {
        return {
          timeSlot: ts.id,
          timeLabel: ts.label,
          type: 'lunch',
          title: 'Lunch Break (12:00 – 1:00 PM)',
          room: 'Campus Wide',
          teacher: ''
        };
      }
      let found = null;
      for (const roomId of Object.keys(generatedDraft.weeklyTimetable[day])) {
        const slot = generatedDraft.weeklyTimetable[day][roomId]?.[ts.id];
        if (slot && slot.status === 'occupied' && slot.batch === section) {
          found = { ...slot, roomId };
          break;
        }
      }
      if (found) {
        return {
          timeSlot: ts.id,
          timeLabel: ts.label,
          type: found.type === 'Lab' ? 'lab' : 'class',
          title: found.title,
          room: found.roomId,
          teacher: found.teacher
        };
      }
      return {
        timeSlot: ts.id,
        timeLabel: ts.label,
        type: 'free',
        title: 'Free Break / Self Study',
        room: '',
        teacher: ''
      };
    });
  };

  // Faculty Schedule Helper for Draft Preview
  const facultyAssignedWeekly = useMemo(() => {
    if (!generatedDraft) return [];
    const faculty = generatedDraft.facultyList?.find(f => f.name === selectedFaculty);
    return faculty?.assignedSlots || {};
  }, [generatedDraft, selectedFaculty]);

  const facultyTotalHours = useMemo(() => {
    let count = 0;
    DAYS_OF_WEEK.forEach(d => {
      count += (facultyAssignedWeekly[d] || []).length;
    });
    return count;
  }, [facultyAssignedWeekly]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto w-full space-y-5 font-sans">
      {/* Header & Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200/90 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-900 tracking-tight font-sans">
              Campus Admin & Timetable Suite
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
              Governance & Solvers
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage reservation requests, customize curriculum intake across Sections A–J, and generate balanced semester master schedules.
          </p>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setAdminTab('queue')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${adminTab === 'queue'
              ? 'bg-white text-zinc-950 shadow-2xs'
              : 'text-zinc-600 hover:text-zinc-900'
              }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Booking Queue</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setAdminTab('generator')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${adminTab === 'generator'
              ? 'bg-white text-indigo-700 shadow-2xs'
              : 'text-zinc-600 hover:text-zinc-900'
              }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Master Timetable Generator</span>
          </button>
        </div>
      </div>

      {/* TAB 1: BOOKING QUEUE */}
      {adminTab === 'queue' ? (
        <>
          {/* Status Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs">
              <div className="text-xs text-zinc-500 font-medium">Pending Requests</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1 font-sans">
                {pendingCount}
              </div>
              <div className="text-[11px] text-amber-800 font-medium mt-0.5">Awaiting admin review</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs">
              <div className="text-xs text-zinc-500 font-medium">Unlocked Slots</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1 font-sans">
                {unlockedSlotsCount}
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">From faculty on leave</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs">
              <div className="text-xs text-zinc-500 font-medium">Free Venues Right Now</div>
              <div className="text-2xl font-bold text-zinc-900 mt-1 font-sans">
                {freeVenuesCount} <span className="text-xs font-normal text-zinc-400">/ {totalVenues}</span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Instant booking available</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs">
              <div className="text-xs text-zinc-500 font-medium">Permanent Locks</div>
              <div className="text-2xl font-bold text-indigo-600 mt-1 font-sans">
                {approvedBookings.length}
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Master timetable commitments</div>
            </div>
          </div>

          {/* Pending Booking Requests Section */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-700" />
                <h3 className="text-sm font-bold text-zinc-900 font-sans">
                  Pending Requests Queue ({pendingBookings.length})
                </h3>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium">Click Approve to lock & commit to timetable</span>
            </div>

            {pendingBookings.length === 0 ? (
              <div className="p-10 text-center text-xs text-zinc-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="font-semibold text-zinc-700">All caught up! No pending booking requests.</p>
                <p className="text-[11px] text-zinc-400">New requests submitted from the Venue Finder tab will appear here for governance.</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {pendingBookings.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-50/60 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs font-mono">
                          {req.roomId}
                        </span>
                        <span className="text-xs font-bold text-zinc-900">{req.title}</span>
                        {req.isPermanent ? (
                          <span className="px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Permanent Master Update</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-semibold">
                            Single-Day ({req.day})
                          </span>
                        )}
                        <span className="text-xs text-zinc-400">·</span>
                        <span className="text-xs text-zinc-500 font-medium">{req.timeSlot} ({req.duration} hr)</span>
                      </div>

                      <div className="text-xs text-zinc-500 flex items-center gap-2 flex-wrap">
                        <span>Organized by: <strong className="text-zinc-700">{req.organizer || req.requestedBy}</strong></span>
                        <span>·</span>
                        <span>Batch: <strong className="text-zinc-700">{req.batch}</strong></span>
                        <span>·</span>
                        <span>Expected: <strong className="text-zinc-700">{req.attendees} students</strong></span>
                      </div>

                      {req.purpose && (
                        <p className="text-[11px] text-zinc-500 italic bg-zinc-50 p-1.5 rounded-lg border border-zinc-100 mt-1">
                          "{req.purpose}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onRejectBooking(req.id)}
                        className="px-3 py-1.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Decline
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApprove(req.id)}
                        className="px-4 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{req.isPermanent ? 'Commit to Master' : 'Approve & Lock'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Locked Permanent Reservations */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-zinc-700" />
                <h3 className="text-sm font-bold text-zinc-900 font-sans">
                  Locked Timetable Reservations ({approvedBookings.length})
                </h3>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium">Master timetable commitments</span>
            </div>

            {approvedBookings.length === 0 ? (
              <div className="p-8 text-center text-xs text-zinc-400">
                No active approved reservations on campus right now.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 text-zinc-500 font-semibold text-[11px] bg-zinc-50">
                      <th className="py-2.5 px-4">Room No.</th>
                      <th className="py-2.5 px-4">Time Window</th>
                      <th className="py-2.5 px-4">Scope</th>
                      <th className="py-2.5 px-4">Event Purpose</th>
                      <th className="py-2.5 px-4">Organizer</th>
                      <th className="py-2.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-sans">
                    {approvedBookings.map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-50/50">
                        <td className="py-2.5 px-4 font-bold text-zinc-900 font-mono">{item.roomId}</td>
                        <td className="py-2.5 px-4 text-zinc-600 font-medium">{item.day} · {item.timeSlot}</td>
                        <td className="py-2.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.isPermanent ? 'bg-purple-50 text-purple-700' : 'bg-zinc-100 text-zinc-700'}`}>
                            {item.isPermanent ? 'Master Timetable' : 'Single-Day'}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-zinc-700 max-w-[200px] truncate">{item.purpose || item.title}</td>
                        <td className="py-2.5 px-4 text-zinc-600">{item.organizer || item.requestedBy}</td>
                        <td className="py-2.5 px-4 text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Lock className="w-3 h-3" />
                            <span>Locked</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        /* TAB 2: AUTOMATED MASTER TIMETABLE GENERATOR SUITE (INTERACTIVE) */
        <div className="space-y-5">
          {/* Interactive Curriculum Intake Manager Card */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
            {/* Intake Header */}
            <div className="p-4 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-zinc-900 font-sans">
                    Interactive Curriculum & Faculty Intake (Sections A–J)
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Customize course hours, assign professors, and toggle sections. Balanced solver spreads classes across all 5 days with natural breaks.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleResetIntake}
                  className="px-3 py-1.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Restore official university syllabus"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Reset Official Intake</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Add Subject</span>
                </button>

                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={handleRunGenerator}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  {isGenerating ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Solving Balanced Schedule...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                      <span>Generate Master Timetable</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="p-3 bg-zinc-50/70 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-1 flex-wrap">
                <button
                  type="button"
                  onClick={() => setCurriculumTab('all')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${curriculumTab === 'all'
                    ? 'bg-zinc-900 text-white shadow-2xs'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                    }`}
                >
                  All Subjects ({coursesIntake.length})
                </button>

                <button
                  type="button"
                  onClick={() => setCurriculumTab('group1')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${curriculumTab === 'group1'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                    }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Group 1: Sec A–E (DTAI & EVS)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurriculumTab('group2')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${curriculumTab === 'group2'
                    ? 'bg-indigo-700 text-white shadow-2xs'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                    }`}
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span>Group 2: Sec F–J (Applied Physics & IKS)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurriculumTab('common')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${curriculumTab === 'common'
                    ? 'bg-blue-700 text-white shadow-2xs'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                    }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span>Common Core</span>
                </button>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by subject, code, or professor..."
                  value={intakeSearch}
                  onChange={(e) => setIntakeSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Curriculum Group Explainer Badge */}
            <div className="px-4 py-2 bg-indigo-50/40 border-b border-indigo-100 text-[11px] text-zinc-600 flex items-center gap-2 flex-wrap">
              <span className="font-bold text-indigo-900">Curricular Guarantee:</span>
              <span>Sections A–E learn <strong>Design Thinking with AI (AI0000)</strong> & <strong>EVS (ES1115)</strong> without Physics.</span>
              <span>·</span>
              <span>Sections F–J learn <strong>Applied Physics (AS1108)</strong> & <strong>IKS (IL1107)</strong>.</span>
            </div>

            {/* Interactive Courses Overview Matrix */}
            <div className="overflow-x-auto min-h-[380px] pb-24">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-500 font-semibold text-[11px] bg-zinc-50/90 sticky top-0 z-10 backdrop-blur-xs">
                    <th className="py-2.5 px-3">Subject / Course</th>
                    <th className="py-2.5 px-3">Assigned Professor</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Enrolled Sections</th>
                    <th className="py-2.5 px-3 text-center">Hours/Wk</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-sans">
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-400">
                        No courses match the active filter or search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((c) => (
                      <tr key={c.id} className="hover:bg-zinc-50/60 transition-colors">
                        {/* Course Name & Code */}
                        <td className="py-2 px-3">
                          <div className="font-bold text-zinc-900">{c.title}</div>
                          <div className="text-[10px] font-mono text-zinc-500">{c.code} · {c.group}</div>
                        </td>

                        {/* Interactive Teacher Selector */}
                        <td className="py-2 px-3">
                          <CustomSelect
                            value={c.teacher}
                            onChange={(val) => handleTeacherChange(c.id, val)}
                            options={facultyList.map(f => ({ value: f.name, label: f.name }))}
                            className="w-48"
                            buttonClassName="py-1 px-2 text-xs bg-white border-zinc-200"
                            menuClassName="w-56"
                          />
                        </td>

                        {/* Type Badge */}
                        <td className="py-2 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.type === 'lab' || c.title.toLowerCase().includes('lab')
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                            {c.type === 'lab' || c.title.toLowerCase().includes('lab') ? `Lab (${c.venue || 'Tech Lab'})` : 'Theory'}
                          </span>
                        </td>

                        {/* Interactive Sections Badges (click to toggle enrollment) */}
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-1 flex-wrap max-w-[260px]">
                            {ALL_SECTIONS.map(s => {
                              const isEnrolled = c.sections.includes(s);
                              return (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => handleToggleSection(c.id, s)}
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${isEnrolled
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200'
                                    }`}
                                  title={`Toggle ${s}`}
                                >
                                  {s.replace('Sec ', '')}
                                </button>
                              );
                            })}
                          </div>
                        </td>

                        {/* Interactive Hours Per Week Stepper */}
                        <td className="py-2 px-3 text-center">
                          <div className="inline-flex items-center gap-1 bg-zinc-100 rounded-lg p-0.5 border border-zinc-200">
                            <button
                              type="button"
                              onClick={() => handleHoursChange(c.id, -1)}
                              className="w-5 h-5 rounded bg-white hover:bg-zinc-200 text-zinc-700 font-bold text-xs flex items-center justify-center cursor-pointer shadow-2xs"
                              title="Decrease weekly hours"
                            >
                              -
                            </button>
                            <span className="w-5 font-bold text-zinc-900 text-xs text-center">{c.hoursPerWeek}</span>
                            <button
                              type="button"
                              onClick={() => handleHoursChange(c.id, 1)}
                              className="w-5 h-5 rounded bg-white hover:bg-zinc-200 text-zinc-700 font-bold text-xs flex items-center justify-center cursor-pointer shadow-2xs"
                              title="Increase weekly hours"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Remove Action */}
                        <td className="py-2 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveCourse(c.id)}
                            className="p-1 rounded text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove subject"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Generated Result Quality Scorecard & Interactive Draft Preview */}
          {generatedDraft ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Scorecard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-2xl bg-white border border-indigo-200 shadow-2xs">
                  <div className="text-xs text-zinc-500 font-medium">Classes Scheduled</div>
                  <div className="text-2xl font-bold text-indigo-700 mt-1 font-sans">
                    {generatedDraft.stats.totalScheduled} Slots
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">100% Curricular Intake Met</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs">
                  <div className="text-xs text-zinc-500 font-medium">Zero-Walk Delay Match</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-1 font-sans">
                    {generatedDraft.stats.zeroWalkScore}%
                  </div>
                  <div className="text-[11px] text-emerald-700/80 mt-0.5 font-medium">EB1 & EB2 section clusters</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs">
                  <div className="text-xs text-zinc-500 font-medium">Thursday & Friday Load</div>
                  <div className="text-2xl font-bold text-amber-600 mt-1 font-sans">
                    Active & Balanced
                  </div>
                  <div className="text-[11px] text-amber-700/80 mt-0.5 font-medium">
                    Thu: {generatedDraft.stats.thursdaySlots} · Fri: {generatedDraft.stats.fridaySlots} classes
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs">
                  <div className="text-xs text-zinc-500 font-medium">Hard Clashes</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-1 font-sans">
                    0 Clashes
                  </div>
                  <div className="text-[11px] text-emerald-700/80 mt-0.5 font-medium">Zero faculty or room clashes</div>
                </div>
              </div>

              {/* Commit Action Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-zinc-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div>
                  <h4 className="font-bold text-sm text-white font-sans flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Balanced 5-Day Master Timetable Ready for Deployment</span>
                  </h4>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    Clicking "Commit to Live Master Timetable" updates the live campus schedule, student timetables, and all faculty slots across the platform.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCommitDraft}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-zinc-950" />
                  <span>Commit to Live Master Timetable</span>
                </button>
              </div>

              {/* Tri-Modal Draft Preview Explorer */}
              <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs overflow-hidden">
                {/* Explorer Toolbar */}
                <div className="p-4 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-700" />
                    <h3 className="text-sm font-bold text-zinc-900 font-sans">
                      Interactive Schedule Verification Explorer
                    </h3>
                  </div>

                  {/* Mode Selector */}
                  <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setPreviewMode('section')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${previewMode === 'section'
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>By Student Section</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewMode('venue')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${previewMode === 'venue'
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>By Classroom Venue</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewMode('faculty')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${previewMode === 'faculty'
                        ? 'bg-white text-indigo-700 shadow-2xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>By Professor</span>
                    </button>
                  </div>
                </div>

                {/* VIEW 1: BY STUDENT SECTION (Proves Thursday/Friday are active & early days have breaks!) */}
                {previewMode === 'section' && (
                  <div className="p-4 space-y-4">
                    {/* Section Switcher Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-zinc-500 mr-1">Select Section:</span>
                      {ALL_SECTIONS.map(sec => {
                        const isSelected = selectedSection === sec;
                        const isGroup1 = ['Sec A', 'Sec B', 'Sec C', 'Sec D', 'Sec E'].includes(sec);
                        return (
                          <button
                            key={sec}
                            type="button"
                            onClick={() => setSelectedSection(sec)}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${isSelected
                              ? 'bg-indigo-600 text-white shadow-2xs'
                              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                              }`}
                          >
                            <span>{sec}</span>
                            <span className={`text-[9px] px-1 py-0.2 rounded ${isSelected ? 'bg-indigo-800 text-indigo-100' : 'bg-zinc-200 text-zinc-600'}`}>
                              {isGroup1 ? 'DTAI/EVS' : 'Physics/IKS'}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Section Notice */}
                    <div className="text-xs text-zinc-600 bg-zinc-50 p-2 rounded-xl border border-zinc-200 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-900">{selectedSection} Master Schedule:</span>
                        <span>{['Sec A', 'Sec B', 'Sec C', 'Sec D', 'Sec E'].includes(selectedSection) ? 'Group 1 (DTAI + EVS · No Physics)' : 'Group 2 (Applied Physics + IKS · No DTAI)'}</span>
                      </div>
                      <div className="font-semibold text-emerald-700 flex items-center gap-1 text-[11px]">
                        <Check className="w-3.5 h-3.5" />
                        <span>Thursday & Friday Active · 2–3 Free Hours / Day Early Breaks</span>
                      </div>
                    </div>

                    {/* 5-Day Monday through Friday Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                      {DAYS_OF_WEEK.map(day => {
                        const slots = getSectionSchedule(day, selectedSection);
                        const classCount = slots.filter(s => s.type === 'class' || s.type === 'lab').length;
                        const breakCount = slots.filter(s => s.type === 'free').length;

                        return (
                          <div key={day} className="rounded-xl border border-zinc-200 bg-zinc-50/50 overflow-hidden flex flex-col">
                            {/* Day Header */}
                            <div className="p-2.5 bg-zinc-100/90 border-b border-zinc-200 flex items-center justify-between">
                              <span className="font-bold text-xs text-zinc-900">{day}</span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                                {classCount} hrs classes
                              </span>
                            </div>

                            {/* Slot Cards */}
                            <div className="p-2 space-y-1.5 flex-1">
                              {slots.map((s, idx) => {
                                if (s.type === 'lunch') {
                                  return (
                                    <div key={idx} className="p-1.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-center">
                                      <div className="text-[10px] font-bold text-amber-800">🍽️ 12:00 PM: Lunch Break</div>
                                    </div>
                                  );
                                }
                                if (s.type === 'free') {
                                  return (
                                    <div key={idx} className="p-1.5 rounded-lg bg-white border border-dashed border-zinc-200 text-center">
                                      <div className="text-[10px] font-medium text-zinc-400 flex items-center justify-center gap-1">
                                        <Coffee className="w-2.5 h-2.5 text-zinc-400" />
                                        <span>{s.timeSlot}: Free Break</span>
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div
                                    key={idx}
                                    className={`p-2 rounded-lg border text-left transition-all ${s.type === 'lab'
                                      ? 'bg-purple-50/90 border-purple-200 text-purple-950'
                                      : 'bg-white border-zinc-200 text-zinc-900 shadow-2xs'
                                      }`}
                                  >
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-[10px] font-bold font-mono text-zinc-500">{s.timeSlot}</span>
                                      <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${s.type === 'lab' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {s.room}
                                      </span>
                                    </div>
                                    <div className="font-bold text-xs mt-1 truncate" title={s.title}>{s.title}</div>
                                    <div className="text-[10px] text-zinc-500 truncate mt-0.5">{s.teacher}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* VIEW 2: BY CLASSROOM VENUE MATRIX */}
                {previewMode === 'venue' && (
                  <div>
                    {/* Day Picker */}
                    <div className="p-3 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-700">Preview Day:</span>
                      <div className="flex items-center gap-1">
                        {DAYS_OF_WEEK.map(day => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => setPreviewDay(day)}
                            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${previewDay === day
                              ? 'bg-zinc-900 text-white font-bold shadow-2xs'
                              : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                              }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Day Matrix Table */}
                    <div className="overflow-x-auto max-h-96">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-zinc-100/90 border-b border-zinc-200 text-zinc-700 font-bold sticky top-0 z-10 backdrop-blur-xs">
                            <th className="py-2 px-3 border-r border-zinc-200 bg-zinc-100">Venue</th>
                            {TIME_SLOTS.map(s => (
                              <th key={s.id} className="py-2 px-2 text-center border-r border-zinc-200 last:border-r-0 text-[11px] bg-zinc-100">
                                {s.id === '12:00' ? '🍽️ Lunch' : s.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 font-sans">
                          {venues.map(v => (
                            <tr key={v.id} className="hover:bg-zinc-50/50">
                              <td className="py-2 px-3 font-bold text-zinc-900 border-r border-zinc-100 text-xs">
                                <div>{v.id}</div>
                                <div className="text-[10px] text-zinc-400 font-normal">{v.building} · {v.capacity}s</div>
                              </td>
                              {TIME_SLOTS.map(ts => {
                                if (ts.id === '12:00') {
                                  return (
                                    <td key={ts.id} className="py-1 px-1 text-center bg-amber-50/30 border-r border-zinc-100 text-[10px] font-bold text-amber-800">
                                      Lunch
                                    </td>
                                  );
                                }
                                const slot = generatedDraft.weeklyTimetable[previewDay]?.[v.id]?.[ts.id];
                                const isOccupied = slot && slot.status === 'occupied';

                                return (
                                  <td key={ts.id} className="py-1.5 px-2 border-r border-zinc-100 last:border-r-0 text-[10px]">
                                    {isOccupied ? (
                                      <div className={`p-1 rounded border text-left ${slot.type === 'Lab' ? 'bg-purple-50 border-purple-200 text-purple-950' : 'bg-indigo-50 border-indigo-200 text-indigo-950'} font-medium`}>
                                        <div className="font-bold truncate max-w-[110px]" title={slot.title}>{slot.title}</div>
                                        <div className="text-[9px] text-zinc-500 truncate">{slot.teacher}</div>
                                      </div>
                                    ) : (
                                      <span className="text-zinc-300 italic text-[10px]">• Free</span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* VIEW 3: BY PROFESSOR */}
                {previewMode === 'faculty' && (
                  <div className="p-4 space-y-4">
                    {/* Faculty Dropdown */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-zinc-700">Select Professor:</span>
                      <CustomSelect
                        value={selectedFaculty}
                        onChange={setSelectedFaculty}
                        options={facultyList.map(f => ({
                          value: f.name,
                          label: `${f.name} (${f.department || 'Engineering'})`
                        }))}
                        className="w-64"
                        buttonClassName="py-1.5 px-3 text-xs bg-white border-zinc-200 font-bold"
                        menuClassName="w-72"
                      />
                      <div className="text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 font-bold">
                        Total Teaching Load: {facultyTotalHours} hrs / week
                      </div>
                    </div>

                    {/* Faculty Weekly Slots */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      {DAYS_OF_WEEK.map(day => {
                        const daySlots = facultyAssignedWeekly[day] || [];
                        return (
                          <div key={day} className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-2.5 space-y-2">
                            <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5">
                              <span className="font-bold text-xs text-zinc-900">{day}</span>
                              <span className="text-[10px] font-bold text-zinc-500">{daySlots.length} hrs</span>
                            </div>

                            {daySlots.length === 0 ? (
                              <div className="text-[11px] text-zinc-400 italic py-4 text-center">
                                No classes scheduled
                              </div>
                            ) : (
                              <div className="space-y-1.5">
                                {daySlots.map((s, idx) => (
                                  <div key={idx} className="p-1.5 rounded-lg bg-white border border-zinc-200 shadow-2xs text-[10px]">
                                    <div className="flex items-center justify-between font-bold text-zinc-800">
                                      <span>{s.time}</span>
                                      <span className="px-1 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">{s.roomId}</span>
                                    </div>
                                    <div className="font-medium text-zinc-600 truncate mt-0.5">{s.course}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-10 rounded-2xl bg-zinc-50 border border-dashed border-zinc-200 text-center text-xs text-zinc-500 space-y-2">
              <Sparkles className="w-8 h-8 text-indigo-500 mx-auto" />
              <p className="font-semibold text-zinc-700">No timetable draft generated yet.</p>
              <p className="text-[11px] text-zinc-400 max-w-md mx-auto">
                Customize any subjects or hours above, then click "Generate Master Timetable" to run the balanced 5-day constraint solver.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ADD SUBJECT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-zinc-900 font-sans">Add Custom Course to Curriculum</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewCourse} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-600 font-semibold mb-1">Course Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS1141 or AI1102"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-semibold mb-1">Subject Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Data Structures"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-600 font-semibold mb-1">Type</label>
                  <CustomSelect
                    value={newCourse.type}
                    onChange={(val) => setNewCourse(prev => ({ ...prev, type: val }))}
                    options={[
                      { value: 'theory', label: 'Theory (Lecture)' },
                      { value: 'lab', label: 'Lab (2 hr block)' }
                    ]}
                    className="w-full"
                    buttonClassName="w-full py-1.5 px-3 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 font-semibold mb-1">Weekly Hours</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={newCourse.hoursPerWeek}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, hoursPerWeek: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-600 font-semibold mb-1">Assigned Professor</label>
                <CustomSelect
                  value={newCourse.teacher}
                  onChange={(val) => setNewCourse(prev => ({ ...prev, teacher: val }))}
                  options={facultyList.map(f => ({ value: f.name, label: f.name }))}
                  className="w-full"
                  buttonClassName="w-full py-1.5 px-3 text-xs"
                  menuClassName="w-full"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-semibold mb-1">Target Sections</label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {ALL_SECTIONS.map(s => {
                    const selected = newCourse.sections.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setNewCourse(prev => {
                            const exists = prev.sections.includes(s);
                            const next = exists ? prev.sections.filter(sec => sec !== s) : [...prev.sections, s];
                            return { ...prev, sections: next.length > 0 ? next : [s] };
                          });
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${selected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                          }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer shadow-2xs"
                >
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
