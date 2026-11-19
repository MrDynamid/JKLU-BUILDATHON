import React from 'react';
import { 
  Search, 
  UserX, 
  ShieldCheck,
  Calendar
} from 'lucide-react';

export function Sidebar({
  activeTab,
  setActiveTab,
  facultyOnLeaveCount,
  pendingBookingsCount,
  freeVenuesCount,
  totalVenuesCount,
  unlockedSlotsCount
}) {
  const navItems = [
    {
      id: 'venues',
      label: 'Find Venues',
      icon: Search,
      badge: null
    },
    {
      id: 'leave',
      label: 'Faculty on Leave',
      icon: UserX,
      badge: facultyOnLeaveCount > 0 ? `${facultyOnLeaveCount} on leave` : null,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    {
      id: 'timetable',
      label: 'Campus Timetable',
      icon: Calendar,
      badge: 'Interactive',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      id: 'admin',
      label: 'Admin Gate',
      icon: ShieldCheck,
      badge: pendingBookingsCount > 0 ? pendingBookingsCount : null,
      badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200'
    }
  ];

  return (
    <aside className="w-52 bg-white text-zinc-700 flex flex-col shrink-0 border-r border-zinc-200/80 h-full overflow-y-auto font-sans select-none">
      {/* Navigation */}
      <div className="p-2.5 border-b border-zinc-100">
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Status Footer */}
      <div className="mt-auto p-3 bg-zinc-50/70 border-t border-zinc-200/70 text-xs">
        <div className="flex items-center justify-between text-zinc-500 py-0.5">
          <span>Available Now</span>
          <span className="font-mono font-semibold text-zinc-900">{freeVenuesCount} / {totalVenuesCount}</span>
        </div>
        <div className="flex items-center justify-between text-zinc-500 py-0.5">
          <span>Faculty on Leave</span>
          <span className="font-mono font-semibold text-amber-700">{unlockedSlotsCount} slots</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
