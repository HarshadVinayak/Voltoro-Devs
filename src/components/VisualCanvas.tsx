import React, { useState, useRef } from 'react';
import { CanvasNode, CanvasNodeType } from '../types';
import { Plus, Link, Trash, Activity, Server, Database, Smartphone, Globe } from 'lucide-react';

interface VisualCanvasProps {
  nodes: CanvasNode[];
  onAddNode: (node: CanvasNode) => void;
  onDeleteNode: (id: string) => void;
  onUpdateNodes: (nodes: CanvasNode[]) => void;
}

export default function VisualCanvas({ nodes, onAddNode, onDeleteNode, onUpdateNodes }: VisualCanvasProps) {
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [linkingStartId, setLinkingStartId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeType, setNewNodeType] = useState<CanvasNodeType>('component');

  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle node drag start
  const handleDragStart = (id: string) => {
    setDraggedNodeId(id);
  };

  // Drag over canvas container
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Drop node in canvas coordinate plane
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedNodeId || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - canvasRect.left - 100); // offset center width (W=240 / 2)
    const y = Math.round(e.clientY - canvasRect.top - 40);   // offset center height (H=80 / 2)

    const updatedNodes = nodes.map(node => {
      if (node.id === draggedNodeId) {
        return { ...node, x: Math.max(10, x), y: Math.max(10, y) };
      }
      return node;
    });

    onUpdateNodes(updatedNodes);
    setDraggedNodeId(null);
  };

  // Setup connection line linking
  const handleNodeClickConnect = (id: string) => {
    if (!linkingStartId) {
      setLinkingStartId(id);
    } else {
      if (linkingStartId !== id) {
        // Create connection
        const updated = nodes.map(node => {
          if (node.id === linkingStartId) {
            // Avoid duplicate links
            const currentConnections = node.connections || [];
            if (!currentConnections.includes(id)) {
              return { ...node, connections: [...currentConnections, id] };
            }
          }
          return node;
        });
        onUpdateNodes(updated);
      }
      setLinkingStartId(null);
    }
  };

  // Remove connections of a node
  const handleClearConnections = (id: string) => {
    const updated = nodes.map(node => {
      if (node.id === id) {
        return { ...node, connections: [] };
      }
      return node;
    });
    onUpdateNodes(updated);
  };

  // Fast auto-arrange layout nodes
  const handleAutoArrange = () => {
    const arranged = nodes.map((node, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      return {
        ...node,
        x: 80 + col * 280,
        y: 100 + row * 240
      };
    });
    onUpdateNodes(arranged);
  };

  // Quick seed custom schema
  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName.trim()) return;

    const node: CanvasNode = {
      id: `canvas-n-${Date.now()}`,
      type: newNodeType,
      label: newNodeName,
      x: 150 + Math.random() * 100,
      y: 150 + Math.random() * 100,
      description: `Generated ${newNodeType} interface schema node`,
      connections: [],
      fields: newNodeType === 'database' ? ['id: SERIAL', 'name: VARCHAR', 'created_at: TIMESTAMP'] : undefined,
      methods: newNodeType === 'api' ? ['GET /api', 'POST /api'] : undefined
    };

    onAddNode(node);
    setNewNodeName('');
  };

  const getNodeIcon = (type: CanvasNodeType) => {
    switch (type) {
      case 'client': return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'component': return <Globe className="w-4 h-4 text-pink-400" />;
      case 'api': return <Server className="w-4 h-4 text-purple-400" />;
      case 'database': return <Database className="w-4 h-4 text-amber-400" />;
      default: return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  const getNodeBorderColor = (type: CanvasNodeType) => {
    switch (type) {
      case 'client': return 'border-emerald-500/30 hover:border-emerald-400';
      case 'component': return 'border-pink-500/30 hover:border-pink-400';
      case 'api': return 'border-purple-500/30 hover:border-purple-400';
      case 'database': return 'border-amber-500/30 hover:border-amber-400';
      default: return 'border-blue-500/30 hover:border-blue-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] select-none text-gray-300">
      {/* Top action toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-[#262626] bg-[#0a0a0a]/85 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#6366f1]/10 rounded-lg">
            <Activity className="w-4 h-4 text-[#6366f1]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white font-mono">Infinite Architecture Canvas</h2>
            <p className="text-[10px] text-gray-400">Map databases, components, API ports, and user channels live.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAutoArrange}
            className="px-3 py-1.5 bg-[#171717] hover:bg-[#262626] border border-[#262626] rounded-lg text-xs font-mono text-gray-300 transition-all"
          >
            Auto Assemble Grid
          </button>

          <form onSubmit={handleQuickAdd} className="flex items-center gap-2">
            <select
              value={newNodeType}
              onChange={(e) => setNewNodeType(e.target.value as CanvasNodeType)}
              className="bg-[#050505] border border-[#262626] rounded-lg px-2 py-1.5 text-xs text-gray-200 outline-none focus:border-[#6366f1]"
            >
              <option value="client">Viewport Client</option>
              <option value="component">UI component</option>
              <option value="api">API Endpoint</option>
              <option value="database">Database</option>
              <option value="service">Cloud service</option>
            </select>
            <input
              type="text"
              placeholder="Node name..."
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
              className="bg-[#050505] border border-[#262626] rounded-lg px-3 py-1.5 text-xs text-[#6366f1] outline-none focus:border-[#6366f1] max-w-[130px]"
            />
            <button
              type="submit"
              className="p-1.5 bg-[#6366f1] hover:bg-[#6366f1]/90 rounded-lg text-white transition-all flex items-center justify-center"
              title="Add component to Canvas"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main interactive canvas area */}
      <div
        ref={canvasRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex-1 relative overflow-auto bg-[#050505] bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:24px_24px] min-h-[500px]"
      >
        <span className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-650 bg-[#0a0a0a]/80 px-2 py-1 rounded border border-[#262626]">
          Active Canvas Nodes count: {nodes.length}
        </span>

        {/* CONNECTION SVG LINES LAYER */}
        <svg className="absolute inset-0 pointer-events-none w-full h-full min-h-[1000px] min-w-[2000px]">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
            </marker>
          </defs>

          {nodes.map(node => {
            const currentCons = node.connections || [];
            return currentCons.map(targetId => {
              const targetNode = nodes.find(n => n.id === targetId);
              if (!targetNode) return null;

              // Line coordinates (approximated center-to-edge connections)
              const startX = node.x + 120;
              const startY = node.y + 40;
              const endX = targetNode.x + 120;
              const endY = targetNode.y + 40;

              // Quadratic bezier for elegant curved vectors
              const midX = (startX + endX) / 2;
              const pathString = `M ${startX} ${startY} Q ${midX} ${(startY + endY) / 2 - 30} ${endX} ${endY}`;

              return (
                <path
                  key={`${node.id}-${targetId}`}
                  d={pathString}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  markerEnd="url(#arrow)"
                  className="transition-all"
                />
              );
            });
          })}
        </svg>

        {/* INTERACTIVE COMPONENT NODES LAYER */}
        {nodes.map(node => {
          const isSelected = selectedNodeId === node.id;
          const isLinkingSrc = linkingStartId === node.id;

          return (
            <div
              key={node.id}
              draggable
              onDragStart={() => handleDragStart(node.id)}
              onClick={() => setSelectedNodeId(node.id)}
              style={{ left: node.x, top: node.y }}
              className={`absolute w-[240px] bg-[#0a0a0a] rounded-xl border border-[#262626] p-3.5 transition-all cursor-move shadow-lg text-xs hover:border-[#6366f1]/40 hover:shadow-indigo-500/5 ${getNodeBorderColor(node.type)} ${
                isSelected ? 'ring-1 ring-[#6366f1]/50 scale-[1.02]' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  {getNodeIcon(node.type)}
                  <span className="font-bold text-gray-200 capitalize tracking-tight select-none truncate">{node.label}</span>
                </div>
                <div className="flex gap-1 ml-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeClickConnect(node.id);
                    }}
                    className={`p-1 bg-[#171717] hover:bg-[#262626] rounded border border-[#262626] transition-colors ${
                      isLinkingSrc ? 'bg-[#6366f1] border-[#6366f1] text-white' : 'text-[#6366f1]'
                    }`}
                    title={isLinkingSrc ? 'Click target node to connect' : 'Draw Connection vector'}
                  >
                    <Link className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNode(node.id);
                    }}
                    className="p-1 bg-[#171717] hover:bg-[#262626] text-rose-500 rounded border border-[#262626] transition-all"
                  >
                    <Trash className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {node.description && (
                <p className="text-[10px] text-gray-400 mb-2 leading-relaxed">{node.description}</p>
              )}

              {/* Specific metadata rendering */}
              {node.fields && node.fields.length > 0 && (
                <div className="mt-2 pt-2 border-t border-[#262626] font-mono text-[9px] text-[#b3b9c7]">
                  <span className="text-[8px] text-amber-500 font-bold tracking-widest uppercase block mb-1">TABLE COLUMNS</span>
                  {node.fields.map((f, idx) => (
                    <div key={idx} className="flex justify-between hover:bg-black/20 px-1 py-0.5 rounded">
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {node.methods && node.methods.length > 0 && (
                <div className="mt-2 pt-2 border-t border-[#262626] font-mono text-[9px] text-[#6366f1]">
                  <span className="text-[8px] text-[#a855f7] font-bold tracking-widest uppercase block mb-1">ROUTING BLUEPRINTS</span>
                  {node.methods.map((m, idx) => (
                    <div key={idx} className="hover:bg-[#171717] px-1 py-0.5 rounded truncate">
                      {m}
                    </div>
                  ))}
                </div>
              )}

              {/* Connections cleaner indicator */}
              {(node.connections || []).length > 0 && (
                <div className="mt-2 pt-2 border-t border-[#262626] flex items-center justify-between text-[9px]">
                  <span className="text-gray-500">Links: {(node.connections || []).length} active</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearConnections(node.id);
                    }}
                    className="text-[9px] text-gray-400 hover:text-rose-500 hover:underline"
                  >
                    unlink all
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
