import React, { useState } from 'react';
import { DbConnector, DeploymentConfig } from '../types';
import { Link, CloudLightning, Activity, Play, CheckCircle2, RefreshCw, Layers, Sliders, Database, ArrowRight } from 'lucide-react';

interface DeploymentCenterProps {
  connectors: DbConnector[];
  deployment: DeploymentConfig;
  onDeploy: () => void;
  onUpdateConnectors: (connectors: DbConnector[]) => void;
  onUpdateDeployment: (config: DeploymentConfig) => void;
}

export default function DeploymentCenter({
  connectors,
  deployment,
  onDeploy,
  onUpdateConnectors,
  onUpdateDeployment
}: DeploymentCenterProps) {
  const [draggedDbId, setDraggedDbId] = useState<string | null>(null);
  const [scaleMin, setScaleMin] = useState(1);
  const [scaleMax, setScaleMax] = useState(10);
  const [autoScaleEnabled, setAutoScaleEnabled] = useState(true);

  // Drag handles for Drag and Drop Database manager
  const handleDragStart = (id: string) => {
    setDraggedDbId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnDeployment = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedDbId) return;

    const db = connectors.find(c => c.id === draggedDbId);
    if (db) {
      // Connect database to deployment configurations!
      const updatedConnectors = connectors.map(c => {
        if (c.id === draggedDbId) {
          return { ...c, status: 'connected' as const };
        }
        return c;
      });

      onUpdateConnectors(updatedConnectors);
      onUpdateDeployment({
        ...deployment,
        databaseConnected: db.name
      });
    }

    setDraggedDbId(null);
  };

  const handleDisconnectDb = () => {
    onUpdateDeployment({
      ...deployment,
      databaseConnected: undefined
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] text-gray-300 select-none">
      {/* Top Header bar */}
      <div className="p-4 border-b border-[#262626] bg-[#0a0a0a]">
        <div className="flex items-center gap-2.5">
          <CloudLightning className="w-4 h-4 text-[#6366f1] animate-pulse" />
          <div>
            <h2 className="text-sm font-semibold text-white font-mono">Continuous Cloud Deployments</h2>
            <p className="text-[10px] text-gray-400">One-click compile pipelines to Vercel, Netlify, Docker, and private VPS targets.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* DRAG AND DROP DATABASE CONNECTIONS INTERFACE */}
          <div className="bg-[#0a0a0a] border border-[#262626] p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-3">
                <h3 className="text-xs font-bold text-gray-200 uppercase font-mono tracking-widest flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-[#6366f1]" /> DB Connection Organizer
                </h3>
                <span className="text-[9px] text-[#6366f1] bg-[#6366f1]/10 px-2 py-0.5 rounded font-mono font-bold uppercase border border-[#6366f1]/20">
                  Drag Database Card
                </span>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed mb-4">
                Drag any database service card on the left directly into the Vercel Dropzone on the right to bridge parameters automatically.
              </p>

              {/* Database list (draggable cards) */}
              <div className="space-y-3.5">
                {connectors.map(connector => (
                  <div
                    key={connector.id}
                    draggable
                    onDragStart={() => handleDragStart(connector.id)}
                    className={`p-3.5 bg-[#050505] border hover:border-[#6366f1]/45 rounded-xl cursor-grab active:cursor-grabbing transition-all flex items-center justify-between ${
                      connector.status === 'connected' ? 'border-[#262626]' : 'border-[#262626] opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-150 font-mono tracking-tight">{connector.name}</span>
                        <span className="text-[9px] font-mono uppercase bg-[#171717] text-gray-400 px-1.5 py-0.5 rounded border border-[#262626]">
                          {connector.type}
                        </span>
                      </div>
                      <p className="text-[9px] text-gray-500 font-mono mt-1">Host: {connector.host}:{connector.port}</p>
                    </div>

                    <div className="flex items-center gap-1.5 select-none">
                      <span className={`h-1.5 w-1.5 rounded-full ${connector.status === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`}></span>
                      <span className="text-[9px] font-mono text-gray-500 capitalize">{connector.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-[#262626] flex justify-between items-center text-[10px] font-mono">
              <span className="text-[#6366f1]">⚡ Credentials pre-bound in JWT environment</span>
              <button
                onClick={() => onUpdateConnectors(connectors.map(c => ({ ...c, status: 'disconnected' })))}
                className="text-slate-400 hover:text-rose-500 text-[9px]"
              >
                Disconnect All
              </button>
            </div>
          </div>

          {/* VERCEL DEPLOY TARGET DROPZONE */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDropOnDeployment}
            className={`bg-[#0a0a0a] rounded-2xl border p-4 transition-all flex flex-col justify-between ${
              draggedDbId ? 'border-dashed border-[#6366f1] bg-[#6366f1]/5 scale-[1.01]' : 'border-[#262626]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#262626] pb-2 mb-3">
                <h3 className="text-xs font-bold text-gray-200 uppercase font-mono tracking-widest flex items-center gap-2">
                  <span className="h-5 w-5 bg-white text-black rounded-full flex items-center justify-center font-black text-xs font-mono">▲</span>
                  Vercel Project Target
                </h3>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                  deployment.status === 'live' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-amber-400/20 text-amber-400'
                }`}>
                  {deployment.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3.5 text-xs text-slate-450 font-mono">
                  <div>
                    <span className="text-gray-500 text-[9px] block">PROD BRANCH</span>
                    <span className="text-gray-200">{deployment.branch}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[9px] block">PLATFORM CLOUD</span>
                    <span className="text-gray-200">{deployment.platform}</span>
                  </div>
                </div>

                {/* Database Bridge connector panel representation */}
                <div className="p-3.5 bg-[#050505] border border-[#262626] rounded-xl text-center">
                  {deployment.databaseConnected ? (
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-[#6366f1] font-mono font-bold text-[11px] truncate">
                        <CheckCircle2 className="w-4 h-4 text-emerald-405" />
                        <span>Connected: {deployment.databaseConnected}</span>
                      </div>
                      <button
                        onClick={handleDisconnectDb}
                        className="text-[10px] text-rose-500 hover:underline font-mono border-l border-[#262626] ml-2 pl-2"
                      >
                        Disconnect Link
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-[#262626] rounded-lg p-5 text-center flex flex-col justify-center items-center">
                      <Layers className="w-6 h-6 text-gray-600 mb-2" />
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Bridge DB Target Zone</span>
                      <p className="text-[9px] text-gray-600 max-w-sm">Drop active SQL PostgreSQL cluster here to bridge env properties.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262626] space-y-3 select-none">
              <button
                onClick={onDeploy}
                disabled={deployment.status === 'building'}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl hover:opacity-95 text-white py-3.5 px-4 font-mono font-bold uppercase tracking-wider text-xs transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                {deployment.status === 'building' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Deploy compile system building...
                  </>
                ) : (
                  <>
                    <CloudLightning className="w-4 h-4" />
                    Compile & Launch production Live app
                  </>
                )}
              </button>

              {deployment.url && (
                <div className="p-2 bg-emerald-950/10 border border-emerald-500/20 rounded-xl text-center flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-400">✔ LIVE ENDPOINT DEPLOYED</span>
                  <a
                    href={deployment.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#6366f1] hover:underline"
                  >
                    Open Live Deployment ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AUTOMATED AUTOSCALING VARIABLES CONTROLS */}
        <div className="bg-[#0a0a0a] rounded-2xl border border-[#262626] p-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2.5 mb-3.5 select-none">
            <h3 className="text-xs font-bold text-gray-200 uppercase font-mono tracking-widest flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#6366f1]" /> Provider Scaling & API throttler rules
            </h3>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
              <input
                type="checkbox"
                checked={autoScaleEnabled}
                onChange={(e) => setAutoScaleEnabled(e.target.checked)}
                className="accent-[#6366f1] rounded border-[#262626] w-3.5 h-3.5 cursor-pointer"
              />
              <span className="text-gray-400">Scale Automation Enabled</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-gray-405 mb-2">
                  <span>Minimum Container Nodes bounds</span>
                  <span className="text-[#6366f1] font-bold">{scaleMin} CPU Unit</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={scaleMin}
                  onChange={(e) => setScaleMin(Number(e.target.value))}
                  disabled={!autoScaleEnabled}
                  className="w-full h-1 bg-[#171717] rounded-lg appearance-none cursor-pointer accent-[#6366f1] disabled:opacity-30"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-gray-450 mb-2">
                  <span>Maximum container pod scaling limit</span>
                  <span className="text-[#6366f1] font-bold">{scaleMax} CPU Units</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="100"
                  value={scaleMax}
                  onChange={(e) => setScaleMax(Number(e.target.value))}
                  disabled={!autoScaleEnabled}
                  className="w-full h-1 bg-[#171717] rounded-lg appearance-none cursor-pointer accent-[#6366f1] disabled:opacity-30"
                />
              </div>
            </div>

            <div className="bg-[#050505] border border-[#262626] rounded-xl p-3.5 text-xs flex flex-col justify-between">
              <div className="space-y-1.5 font-mono text-[10px] text-gray-400 leading-normal">
                <div className="flex justify-between">
                  <span>Auto Load Balancer status:</span>
                  <span className="text-emerald-500 font-semibold">Active round-robin</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Request Rate:</span>
                  <span>14 Req / Sec bounds</span>
                </div>
                <div className="flex justify-between">
                  <span>Memory Alloc threshold:</span>
                  <span>512 MB per microcontainer</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-550 leading-relaxed mt-2.5">
                *Triton DevOps rules will trigger auto-scale replications dynamically once traffic reaches 85% of active worker thread capacities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
