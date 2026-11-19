import React from 'react';
import { 
  Clock, 
  LogOut 
} from 'lucide-react';
import { TIME_SLOTS } from '../data/campusData';
import { CustomSelect } from './CustomSelect';

export function Header({
  activeTab,
  setActiveTab,
  activeRole,
  setActiveRole,
  selectedTime,
  setSelectedTime,
  selectedDay,
  setSelectedDay,
  currentUser,
  onLogout
}) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const isAdminActive = activeTab === 'admin' || activeRole === 'admin';

  return (
    <header className="h-14 bg-white border-b border-zinc-200/90 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0 select-none shadow-2xs font-sans">
      {/* Brand & Logo matching JKLU iON Login Portal */}
      <div className="flex items-center gap-3">
        <div className="flex items-center tracking-tight">
          <span className="text-xl font-black text-slate-900 tracking-tighter">
            jklu
          </span>
          <div className="relative flex items-center ml-0.5">
            <span className="text-xl font-extrabold text-blue-600">
              i
            </span>
            <div className="relative mx-0.5 flex items-center justify-center">
              <span className="text-xl font-black text-slate-900">
                O
              </span>
              {/* Power notch indicator inside O */}
              <div className="absolute top-1 w-0.5 h-1.5 bg-rose-500 rounded-full" />
            </div>
            <span className="text-xl font-black text-slate-900">
              N
            </span>
          </div>
          <span className="h-5 w-px bg-slate-300 mx-2.5 hidden sm:inline-block" />
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-slate-900 tracking-tight leading-none">
              VenueSense
            </span>
            <span className="text-[9px] font-semibold text-slate-400 leading-none mt-0.5">
              Smart Campus Discovery
            </span>
          </div>
        </div>
      </div>

      {/* Controls & Role Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Active Day Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-zinc-400 font-medium">Day:</span>
          <CustomSelect
            value={selectedDay}
            onChange={setSelectedDay}
            options={days.map(d => ({ value: d, label: d }))}
            buttonClassName="py-1 px-2.5 bg-zinc-50 border-zinc-200"
          />
        </div>

        {/* Active Time Selector (9 AM to 5 PM) */}
        <div className="hidden lg:flex items-center gap-1.5">
          <CustomSelect
            value={selectedTime}
            onChange={setSelectedTime}
            icon={Clock}
            options={TIME_SLOTS.map(slot => ({
              value: slot.id,
              label: `${slot.label} (${slot.range})`
            }))}
            buttonClassName="py-1 px-2.5 bg-zinc-50 border-zinc-200 font-sans"
          />
        </div>

        {/* Quick Role Switcher (Synchronized with Sidebar) */}
        <div className="flex items-center p-1 bg-zinc-100 rounded-lg text-xs font-medium border border-zinc-200/60">
          <button
            type="button"
            onClick={() => {
              setActiveRole('professor');
              if (activeTab === 'admin') {
                setActiveTab('venues');
              }
            }}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              !isAdminActive
                ? 'bg-white text-zinc-900 font-bold shadow-2xs' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Professor View
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveRole('admin');
              setActiveTab('admin');
            }}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
              isAdminActive
                ? 'bg-white text-zinc-900 font-bold shadow-2xs' 
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Admin View
          </button>
        </div>

        {/* User Profile & Logout */}
        {currentUser && (
          <div className="flex items-center gap-2 pl-2 border-l border-zinc-200">
            <div className="hidden xl:flex flex-col text-right">
              <span className="text-xs font-bold text-zinc-900 leading-tight">
                {currentUser.displayName || 'Faculty Member'}
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">
                {currentUser.roleLabel || (isAdminActive ? 'Campus Administrator' : 'Department Faculty')}
              </span>
            </div>
            <button
              type="button"
              onClick={onLogout}
              title="Sign Out to Login Portal"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-zinc-600 hover:text-rose-600 hover:bg-rose-50 border border-zinc-200 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
