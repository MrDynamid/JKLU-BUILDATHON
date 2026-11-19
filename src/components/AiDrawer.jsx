import React, { useState } from 'react';
import { 
  Terminal, 
  X, 
  Send, 
  Trash2, 
  Compass,
  ArrowUpRight,
  Layers
} from 'lucide-react';

export function AiDrawer({
  isOpen,
  onClose,
  traces,
  onClearTraces,
  onAskAgent,
  isProcessing
}) {
  const [chatInput, setChatInput] = useState('');

  const sampleScenarios = [
    {
      category: 'Smart Classroom',
      label: '60 seats · Smart Board',
      query: 'Find room for 60 students from 11 AM with a Smart Board'
    },
    {
      category: 'High-Tech Lab',
      label: '70 PCs & high power sockets',
      query: 'Coding lab with PCs & high power sockets for 70 students at 3 PM'
    },
    {
      category: 'Campus Keynote',
      label: '200 seating amphitheatre',
      query: '200 seating amphitheatre for keynote workshop from 11 AM'
    },
    {
      category: 'Zero Walking Delay',
      label: 'Sec J near prior classroom',
      query: 'Extra lecture for Batch Sec J right after 10 AM class'
    }
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isProcessing) return;
    onAskAgent(chatInput);
    setChatInput('');
  };

  const handleSelectScenario = (query) => {
    setChatInput(query);
    onAskAgent(query);
  };

  if (!isOpen) return null;

  return (
    <aside 
      className="w-84 sm:w-96 bg-white text-zinc-800 border-l border-zinc-200 flex flex-col h-full shrink-0 z-30 font-sans shadow-xl"
      aria-label="AI Agent Reasoning & Audit Drawer"
    >
      {/* Drawer Header */}
      <div className="p-3.5 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-zinc-900 text-emerald-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-zinc-900 tracking-tight flex items-center gap-1.5 font-sans">
              <span>Agent Reasoning & Audit Trace</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
            <p className="text-[10px] text-zinc-500">
              Live heuristic evaluation for Buildathon PS-02
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onClearTraces}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/60 transition-colors cursor-pointer"
            title="Clear Logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/60 transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trace Log Feed */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 font-mono text-[11px] leading-relaxed">
        {traces.length === 0 ? (
          <div className="py-12 text-center text-zinc-400 font-sans">
            <Compass className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
            <p className="text-xs font-semibold text-zinc-700">No active reasoning traces</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Adjust filters or select a prompt scenario to view live step-by-step agent decisions.
            </p>
          </div>
        ) : (
          traces.map((trace, idx) => {
            const isResult = trace.isResult;
            const tag = trace.tag || `[STEP ${trace.step}]`;

            let tagBadge = 'bg-zinc-100 text-zinc-800 border-zinc-200';
            if (isResult) {
              tagBadge = 'bg-emerald-600 text-white font-bold border-transparent';
            } else if (tag.includes('STEP 1') || tag.includes('FILTER') || tag.includes('PARSE')) {
              tagBadge = 'bg-blue-50 text-blue-900 border-blue-200';
            } else if (tag.includes('STEP 2') || tag.includes('LEAVE')) {
              tagBadge = 'bg-amber-50 text-amber-900 border-amber-200';
            } else if (tag.includes('STEP 3') || tag.includes('FREE')) {
              tagBadge = 'bg-emerald-50 text-emerald-900 border-emerald-200';
            } else if (tag.includes('STEP 4') || tag.includes('WALK') || tag.includes('0-WALK')) {
              tagBadge = 'bg-purple-50 text-purple-900 border-purple-200';
            }

            return (
              <div 
                key={trace.id || idx}
                className={`p-3 rounded-xl border transition-all ${
                  isResult 
                    ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950 shadow-xs ring-1 ring-emerald-200' 
                    : 'border-zinc-200/90 bg-white text-zinc-800 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1.5 font-sans">
                  <span className={`px-2 py-0.5 rounded font-bold border text-[10px] ${tagBadge}`}>
                    {tag}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">{trace.time}</span>
                </div>

                <div className="text-zinc-900 font-semibold font-sans text-xs">
                  {trace.message}
                </div>

                {trace.details && (
                  <div className="mt-1.5 text-[11px] text-zinc-600 whitespace-pre-wrap font-sans bg-zinc-50/80 p-2 rounded-lg border border-zinc-100 leading-normal">
                    {trace.details}
                  </div>
                )}
              </div>
            );
          })
        )}

        {isProcessing && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-100 text-[11px] text-zinc-700 font-sans border border-zinc-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-medium">Evaluating multi-parameter campus heuristics...</span>
          </div>
        )}
      </div>

      {/* Professional Prompt Scenarios (Optimized from Image 1) */}
      <div className="p-3 bg-zinc-50 border-t border-zinc-200 font-sans">
        <div className="text-[11px] font-semibold text-zinc-600 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-zinc-500" />
            <span>Suggested Scenarios</span>
          </span>
          <span className="text-[10px] text-zinc-400">Click to run</span>
        </div>

        <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-0.5">
          {sampleScenarios.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectScenario(item.query)}
              className="group text-left p-2 rounded-xl bg-white hover:bg-zinc-100/90 border border-zinc-200 hover:border-zinc-300 transition-all flex items-center justify-between cursor-pointer shadow-2xs"
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-700 border border-zinc-200/60">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-zinc-800 group-hover:text-zinc-950 truncate">
                    {item.label}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 truncate mt-0.5">
                  {item.query}
                </p>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Natural Language Prompt Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-zinc-200 flex items-center gap-2 font-sans">
        <div className="relative flex-1">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask agent about room availability, capacity, equipment..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:border-zinc-900 bg-zinc-50/50 hover:bg-white focus:bg-white transition-all font-sans"
          />
        </div>
        <button
          type="submit"
          disabled={!chatInput.trim() || isProcessing}
          className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-40 text-white transition-colors cursor-pointer shadow-2xs shrink-0"
          aria-label="Send Query"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </aside>
  );
}
