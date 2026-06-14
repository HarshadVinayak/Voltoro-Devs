import React from 'react';
import { BarChart, Users, Cpu, ShieldAlert, Wifi, HardDrive, RefreshCw } from 'lucide-react';

export default function AdminPanel() {
  const currentReqs = [12, 18, 15, 30, 45, 52, 40, 28, 35, 60, 48, 55]; // Mock dataset represents live request load

  return (
    <div className="flex flex-col h-full bg-[#050505] text-gray-300 select-none">
      {/* Header bar */}
      <div className="p-4 border-b border-[#262626] bg-[#0a0a0a]">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#6366f1] animate-pulse" />
          <div>
            <h2 className="text-sm font-semibold text-white font-mono">System Telemetry & Administration</h2>
            <p className="text-[10px] text-gray-400">Voltoro orchestration monitors, container memory caps, and agent token usage schedules.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505]">
        
        {/* Core Quick stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0a0a0a] border border-[#262626] p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 mb-2">
              <span className="text-[10px] uppercase tracking-wider font-mono">Active Workspace Users</span>
              <Users className="w-4 h-4 text-[#6366f1]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">4,812</span>
              <span className="text-[10px] text-emerald-400 font-mono">▲ +12% today</span>
            </div>
            <p className="text-[9px] text-gray-500 mt-1 font-mono">Parallel browser channels</p>
          </div>

          <div className="bg-[#0a0a0a] border border-[#262626] p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 mb-2">
              <span className="text-[10px] uppercase tracking-wider font-mono">Total Cloud Containers</span>
              <HardDrive className="w-4 h-4 text-[#6366f1]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">160 active</span>
              <span className="text-[10px] text-emerald-400 font-mono">✔ 100% healthy</span>
            </div>
            <p className="text-[9px] text-gray-500 mt-1 font-mono">VPS scale replications</p>
          </div>

          <div className="bg-[#0a0a0a] border border-[#262626] p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 mb-2">
              <span className="text-[10px] uppercase tracking-wider font-mono">Gemini Token Consumption</span>
              <Cpu className="w-4 h-4 text-[#6366f1]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">1.82M</span>
              <span className="text-[10px] text-gray-500 font-mono">this billing cycle</span>
            </div>
            <p className="text-[9px] text-gray-500 mt-1 font-mono">Llama/Groq fallback route active</p>
          </div>

          <div className="bg-[#0a0a0a] border border-[#262626] p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center text-slate-400 mb-2">
              <span className="text-[10px] uppercase tracking-wider font-mono">API Router Latency</span>
              <Wifi className="w-4 h-4 text-[#6366f1]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">45 ms</span>
              <span className="text-[10px] text-emerald-400 font-mono">★ Ultra-low edge</span>
            </div>
            <p className="text-[9px] text-gray-500 mt-1 font-mono">SambaNova throughput scale</p>
          </div>
        </div>

        {/* Visual Line Graph (Vector SVG-based representation of load activity) */}
        <div className="bg-[#0a0a0a] border border-[#262626] p-4 rounded-2xl">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-4 select-none">
            <h3 className="text-xs font-bold text-gray-200 uppercase font-mono tracking-widest flex items-center gap-1.5">
              <BarChart className="w-4 h-4 text-[#6366f1]" /> Live API Ingress Bandwidth
            </h3>
            <span className="text-[9px] text-slate-400 bg-[#171717] border border-[#262626] px-2 py-0.5 rounded font-mono">Scale: requests / min</span>
          </div>

          <div className="h-44 w-full relative pt-4 pb-2.5 flex items-end">
            {/* Visual Bar graph mimicking a live charting dashboard */}
            <div className="flex items-end justify-between w-full h-full px-2 gap-2">
              {currentReqs.map((req, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div
                    style={{ height: `${req * 2}px` }}
                    className="w-full bg-gradient-to-t from-[#6366f1]/60 to-[#a855f7] rounded-t-md hover:from-[#6366f1] hover:to-[#a855f7]/85 transition-all cursor-pointer relative group"
                  >
                    {/* Tooltip on hover state */}
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black text-[9px] text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono whitespace-nowrap z-50">
                      {req} req
                    </span>
                  </div>
                  <span className="text-[9px] text-gray-500 font-mono mt-1 w-full text-center truncate select-none">
                    T-{12 - idx}m
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Container Audit Logs console */}
        <div className="bg-[#0a0a0a] rounded-2xl border border-[#262626] p-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-3">
            <span className="text-xs font-bold text-gray-200 uppercase font-mono tracking-widest">Global Cluster Event Log Stream</span>
            <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-mono animate-pulse">
              <CheckCircle2Icon className="w-3.5 h-3.5" />
              <span>DOCKER_SWARM_HEALTHY</span>
            </div>
          </div>

          <div className="bg-black/60 rounded-xl p-3 max-h-[140px] overflow-y-auto font-mono text-[10px] text-gray-400 space-y-1.5">
            <div><span className="text-slate-600">[2026-06-13 14:12]</span> <span className="text-cyan-400 font-semibold">INFO</span> Allocated sandbox virtual file container vfc-3000-active-912.</div>
            <div><span className="text-slate-600">[2026-06-13 14:15]</span> <span className="text-purple-400">EXEC</span> CEO Seraphina constructed roadmap parameters for project.</div>
            <div><span className="text-slate-600">[2026-06-13 14:15]</span> <span className="text-purple-405">EXEC</span> CTO Zephyr completed relational model scaffolding.</div>
            <div><span className="text-slate-600">[2026-06-13 14:16]</span> <span className="text-[#6366f1]">DEPL</span> DevOps Triton compiled 13 files and synced onchain API keys proxy.</div>
            <div><span className="text-slate-600">[2026-06-13 14:18]</span> <span className="text-cyan-400 font-semibold">INFO</span> Continuous deployment autodetected push to production Vercel servers.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple internal icon adapter for Admin dashboard
function CheckCircle2Icon(props: { className?: string }) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={props.className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
