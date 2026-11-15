import React, { useState, useRef } from 'react';
import { 
  Building2, 
  Clock, 
  Terminal, 
  Search, 
  UserX, 
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  Database,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { TIME_SLOTS } from '../data/campusData';

export function Header({
  activeTab,
  setActiveTab,
  activeRole,
  setActiveRole,
  selectedTime,
  setSelectedTime,
  selectedDay,
  setSelectedDay,
  isDrawerOpen,
  setIsDrawerOpen,
  traceCount,
  unlockedCount,
  pendingCount,
  onExportBackup,
  onImportBackup,
  onResetTimetable
}) {
  const [isBackupMenuOpen, setIsBackupMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  const tabs = [
    { id: 'venues', label: 'Venues', icon: Search },
    { 
      id: 'leave', 
      label: 'Faculty Leave', 
      icon: UserX,
      badge: unlockedCount > 0 ? unlockedCount : null 
    },
    { 
      id: 'admin', 
      label: 'Admin Gate', 
      icon: ShieldCheck,
      badge: pendingCount > 0 ? pendingCount : null 
    }
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      e.target.value = '';
      setIsBackupMenuOpen(false);
    }
  };

  return (
    <header className="h-14 bg-white border-b border-zinc-200/90 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0 select-none shadow-2xs">
      {/* Brand & Project Info */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold shadow-xs">
          <Building2 className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-zinc-900 tracking-tight font-sans">
              JKLU VenueSense
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              PS-02 AI Agent
            </span>
          </div>
          <p className="hidden md:block text-[10px] text-zinc-400 font-medium">
            Smart Campus Venue & Timetable Discovery · Sem 1
          </p>
        </div>
      </div>

      {/* Tabs */}
      <nav className="hidden md:flex items-center p-1 bg-zinc-100 rounded-xl text-xs font-medium text-zinc-600 border border-zinc-200/60">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-white text-zinc-900 font-bold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-900' : 'text-zinc-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  tab.id === 'leave' ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-900 text-white'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Controls & Role Switcher */}
      <div className="flex items-center gap-2.5">
        {/* Active Day Selector */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-700 bg-zinc-50 rounded-lg border border-zinc-200">
          <span className="text-[11px] text-zinc-400 font-medium">Day:</span>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="bg-transparent font-semibold text-zinc-900 focus:outline-hidden cursor-pointer"
          >
            {days.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Active Time Selector (9 AM to 5 PM) */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-700 bg-zinc-50 rounded-lg border border-zinc-200">
          <Clock className="w-3.5 h-3.5 text-zinc-400" />
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

        {/* Quick Role Switcher (Professor / Organiser vs Admin) */}
        <div className="flex items-center p-1 bg-zinc-100 rounded-lg text-xs font-medium border border-zinc-200/60">
          <button
            type="button"
            onClick={() => setActiveRole('professor')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              activeRole === 'professor' 
                ? 'bg-white text-zinc-900 font-bold shadow-2xs' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Professor View
          </button>
          <button
            type="button"
            onClick={() => setActiveRole('admin')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              activeRole === 'admin' 
                ? 'bg-white text-zinc-900 font-bold shadow-2xs' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Admin View
          </button>
        </div>

        {/* State Backup & Reset Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsBackupMenuOpen(!isBackupMenuOpen)}
            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200 transition-colors cursor-pointer flex items-center gap-1"
            title="Backup & Restore Timetable State"
          >
            <Database className="w-3.5 h-3.5 text-zinc-600" />
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>

          {isBackupMenuOpen && (
            <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-zinc-200 py-1.5 z-50 text-xs font-sans animate-in fade-in zoom-in-95">
              <div className="px-3 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Timetable Data & Backup
              </div>
              <button
                type="button"
                onClick={() => {
                  onExportBackup();
                  setIsBackupMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-zinc-50 flex items-center gap-2 text-zinc-700 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-zinc-500" />
                <span>Export State Backup (.json)</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full text-left px-3 py-1.5 hover:bg-zinc-50 flex items-center gap-2 text-zinc-700 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-zinc-500" />
                <span>Import / Restore State</span>
              </button>
              <div className="border-t border-zinc-100 my-1" />
              <button
                type="button"
                onClick={() => {
                  onResetTimetable();
                  setIsBackupMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-rose-50 text-rose-600 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Official Timetable</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* AI Reasoning Drawer Toggle */}
        <button
          type="button"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
            isDrawerOpen
              ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
              : 'bg-white text-zinc-800 border-zinc-200 hover:bg-zinc-50'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-500" />
          <span className="hidden sm:inline">Agent Trace</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      </div>
    </header>
  );
}
