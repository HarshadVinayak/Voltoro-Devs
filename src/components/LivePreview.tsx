import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, RefreshCw, AlertTriangle, Play, Sparkles } from 'lucide-react';

interface LivePreviewProps {
  htmlContent: string;
  projectName: string;
}

export default function LivePreview({ htmlContent, projectName }: LivePreviewProps) {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [key, setKey] = useState(0);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Simulate console logging listener inside iframe
  useEffect(() => {
    setConsoleLogs([
      `[Sys] Mounting Voltoro sandbox: ${projectName}`,
      `[HMR] Fast compilation successfully completed. Built 2 modules.`,
      `[Runtime] Iframe frame-listener port 3000 online.`
    ]);
  }, [htmlContent, projectName, key]);

  const getFrameWidth = () => {
    switch (device) {
      case 'mobile': return 'max-w-[360px] h-[640px]';
      case 'tablet': return 'max-w-[760px] h-[580px] font-sans';
      default: return 'w-full h-full';
    }
  };

  const reloadIframe = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] text-gray-300">
      {/* Premium top browser bar */}
      <div className="flex items-center justify-between p-3.5 border-b border-[#262626] bg-[#0a0a0a] select-none">
        <div className="flex items-center gap-2">
          {/* Mock browser dots */}
          <div className="flex gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </div>

          <div className="bg-[#050505] border border-[#262626] rounded-lg px-3 py-1 text-xs font-mono text-[#6366f1] flex items-center gap-2 max-w-[280px] md:max-w-md truncate">
            <span className="text-gray-500 text-[10px] select-none">http://</span>
            <span className="text-[11px] truncate uppercase">{projectName.replace(/\s+/g, '-').toLowerCase() || 'sandbox'}.voltoro.dev</span>
          </div>
        </div>

        {/* Viewport selectors & Reload */}
        <div className="flex items-center gap-3.5">
          <div className="bg-[#050505] p-1 rounded-lg border border-[#262626] flex gap-0.5">
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-md transition-colors ${device === 'mobile' ? 'bg-[#171717] text-[#6366f1]' : 'text-gray-400 hover:text-white'}`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded-md transition-colors ${device === 'tablet' ? 'bg-[#171717] text-[#6366f1]' : 'text-gray-400 hover:text-white'}`}
              title="Tablet View"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-md transition-colors ${device === 'desktop' ? 'bg-[#171717] text-[#6366f1]' : 'text-gray-400 hover:text-white'}`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={reloadIframe}
            className="p-2 bg-[#171717] border border-[#262626] transition-colors hover:text-white hover:border-[#404040] rounded-lg"
          >
            <RefreshCw className="w-3.5 h-3.5 text-gray-400 hover:rotate-45 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main rendering environment */}
      <div className="flex-1 flex items-center justify-center bg-[#050505] p-4 relative overflow-auto">
        <div className={`shadow-2xl border border-[#262626] rounded-2xl bg-[#0a0a0a] overflow-hidden transition-all duration-300 ${getFrameWidth()}`}>
          {htmlContent ? (
            <iframe
              key={key}
              title="Voltoro Devs execution frame"
              srcDoc={htmlContent}
              sandbox="allow-scripts allow-modals"
              className="w-full h-full bg-[#050505]"
            />
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-8 bg-[#0a0a0a]">
              <div className="h-14 w-14 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center text-2xl font-bold animate-bounce mb-4">🔮</div>
              <h3 className="text-sm font-bold font-mono text-white mb-2">Awaiting Bundle Sandbox compiling...</h3>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                Provide specifications in the Vibe Chat window first. Our multi-agent team will build the layout modules live.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Embedded Terminal Logs console at bottom */}
      <div className="border-t border-[#262626] bg-[#0a0a0a] select-none text-[10px]">
        <div
          onClick={() => setShowConsole(!showConsole)}
          className="flex items-center justify-between px-4 py-2 hover:bg-[#171717] cursor-pointer"
        >
          <span className="font-mono font-bold text-gray-450 tracking-wider uppercase flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Node Container Console Log Output
          </span>
          <span className="text-[9px] hover:underline font-bold text-[#6366f1] font-mono">
            {showConsole ? '[- Close]' : '[+ Expand Live logs]'}
          </span>
        </div>

        {showConsole && (
          <div className="max-h-[140px] overflow-y-auto px-4 py-2 bg-[#050505] border-t border-[#262626] font-mono text-slate-400 space-y-1">
            {consoleLogs.map((log, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-[#6366f1] font-bold">voltoro-sandbox@run ~</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
