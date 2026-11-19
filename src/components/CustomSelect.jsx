import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  className = '',
  buttonClassName = '',
  menuClassName = '',
  icon: Icon = null,
  disabled = false,
  align = 'left' // 'left' | 'right'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Normalize options into { value, label, disabled, badge, desc }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt) };
    }
    return {
      value: opt.value ?? opt.id,
      label: opt.label ?? opt.name ?? String(opt.value),
      disabled: Boolean(opt.disabled),
      badge: opt.badge,
      desc: opt.desc
    };
  });

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value)
  );

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optVal) => {
    if (disabled) return;
    onChange(optVal);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block text-left font-sans ${className} ${isOpen ? 'z-50' : ''}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50/80 active:bg-zinc-100 text-zinc-900 font-semibold text-xs transition-all flex items-center justify-between gap-2 shadow-2xs cursor-pointer select-none focus:outline-hidden focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 ${
          disabled ? 'opacity-50 cursor-not-allowed bg-zinc-100' : ''
        } ${buttonClassName}`}
      >
        <div className="flex items-center gap-1.5 truncate">
          {Icon && <Icon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform duration-150 ${
            isOpen ? 'rotate-180 text-zinc-700' : ''
          }`}
        />
      </button>

      {/* Floating Menu Popover */}
      {isOpen && (
        <div
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } mt-1 w-full min-w-[200px] max-h-64 overflow-y-auto bg-white rounded-xl shadow-xl border border-zinc-200 py-1 z-50 font-sans text-xs animate-in fade-in zoom-in-95 focus:outline-hidden ${menuClassName}`}
        >
          {normalizedOptions.length === 0 ? (
            <div className="px-3 py-2 text-zinc-400 text-xs italic">
              No options available
            </div>
          ) : (
            normalizedOptions.map((opt) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => !opt.disabled && handleSelect(opt.value)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2 transition-colors cursor-pointer select-none my-0.5 mx-0 text-xs ${
                    opt.disabled
                      ? 'opacity-40 cursor-not-allowed bg-zinc-50 text-zinc-400'
                      : isSelected
                      ? 'bg-zinc-100 text-zinc-950 font-bold'
                      : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 font-medium'
                  }`}
                >
                  <div className="flex flex-col truncate">
                    <span className="truncate">{opt.label}</span>
                    {opt.desc && (
                      <span className="text-[10px] text-zinc-400 font-normal truncate">
                        {opt.desc}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {opt.badge && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
                        {opt.badge}
                      </span>
                    )}
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
