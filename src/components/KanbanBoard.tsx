import React, { useState } from 'react';
import { KanbanTask, KanbanStatus, TaskPriority } from '../types';
import { Plus, CheckCircle, Clock, AlertTriangle, Play, HelpCircle, Trash, Star } from 'lucide-react';

interface KanbanBoardProps {
  tasks: KanbanTask[];
  onAddTask: (task: KanbanTask) => void;
  onUpdateStatus: (taskId: string, status: KanbanStatus) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function KanbanBoard({ tasks, onAddTask, onUpdateStatus, onDeleteTask }: KanbanBoardProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assignee, setAssignee] = useState('ceo');
  const [milestone, setMilestone] = useState('Milestone 1: Scaffold');

  const columns: { status: KanbanStatus; label: string; bg: string; text: string; border: string }[] = [
    { status: 'todo', label: 'Todo Backlog', bg: 'bg-[#0a0a0a]', text: 'text-[#6366f1]', border: 'border-[#262626]' },
    { status: 'progress', label: 'In Progress', bg: 'bg-[#0a0a0a]', text: 'text-[#a855f7]', border: 'border-[#262626]' },
    { status: 'review', label: 'QA Review', bg: 'bg-[#0a0a0a]', text: 'text-amber-500', border: 'border-[#262626]' },
    { status: 'done', label: 'Completed', bg: 'bg-[#0a0a0a]', text: 'text-emerald-500', border: 'border-[#262626]' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      id: `task-${Date.now()}`,
      title,
      description,
      status: 'todo',
      assignee,
      priority,
      milestone
    });

    setTitle('');
    setDescription('');
    setShowAddForm(false);
  };

  const getPriorityTag = (p: TaskPriority) => {
    switch (p) {
      case 'high': return <span className="text-[9px] font-mono uppercase bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded border border-rose-500/20">High</span>;
      case 'medium': return <span className="text-[9px] font-mono uppercase bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">Med</span>;
      default: return <span className="text-[9px] font-mono uppercase bg-slate-500/10 text-slate-400 px-2 py-0.5 rounded border border-slate-500/20">Low</span>;
    }
  };

  const getAssigneeEmoji = (id: string) => {
    if (id === 'ceo') return '👑 Seraphina';
    if (id === 'cto') return '🧠 Zephyr';
    if (id === 'frontend') return '🎨 Lyra';
    if (id === 'backend') return '🔌 Orion';
    return '🚀 DevOps';
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] text-gray-300">
      {/* Header bar */}
      <div className="flex items-center justify-between p-4 border-b border-[#262626] bg-[#0a0a0a] select-none">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 rounded-full bg-[#6366f1] animate-pulse"></div>
          <div>
            <h2 className="text-sm font-semibold text-white font-mono">Agile Kanban Workspace</h2>
            <p className="text-[10px] text-gray-400">Collaborative live milestones and agent assignment boards.</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3.5 py-1.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:opacity-95 text-white text-xs font-mono rounded-lg transition-all flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Task Ticket
        </button>
      </div>

      {/* Task Creation Modal Form overlay */}
      {showAddForm && (
        <div className="bg-[#0a0a0a] border-b border-[#262626] p-4 select-none">
          <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xs font-bold text-gray-200 uppercase font-mono tracking-widest border-b border-[#262626] pb-2">New Milestone Ticket</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-mono">Ticket Name</label>
                <input
                  type="text"
                  placeholder="e.g. Integrate custom chart graphs..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#050505] border border-[#262626] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#6366f1]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-mono">Milestone Sprint Phase</label>
                <input
                  type="text"
                  placeholder="Phase 1: Initial Specs"
                  value={milestone}
                  onChange={(e) => setMilestone(e.target.value)}
                  className="w-full bg-[#050505] border border-[#262626] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#6366f1]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-400 font-mono">Description blueprint details</label>
              <textarea
                placeholder="Details of code structure or testing boundaries..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#050505] border border-[#262626] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#6366f1] h-16 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-mono">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className="w-full bg-[#050505] border border-[#262626] rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-mono">Squad Assignee</label>
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full bg-[#050505] border border-[#262626] rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option value="ceo">👑 Seraphina (CEO)</option>
                  <option value="cto">🧠 Zephyr (CTO)</option>
                  <option value="frontend">🎨 Lyra (Frontend)</option>
                  <option value="backend">🔌 Orion (Backend)</option>
                  <option value="devops">🚀 Triton (DevOps)</option>
                </select>
              </div>

              <div className="flex items-end gap-2 text-xs">
                <button
                  type="submit"
                  className="flex-1 bg-[#6366f1] hover:bg-[#6366f1]/90 transition-colors py-2 text-white font-semibold rounded-lg text-xs"
                >
                  Add Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-[#171717] border border-[#262626] text-gray-255 hover:bg-[#262626] py-2 px-3 rounded-lg text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Grid columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 overflow-y-auto bg-[#050505]">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.status);

          return (
            <div
              key={col.status}
              className={`flex flex-col h-full rounded-2xl border ${col.border} ${col.bg} p-3.5`}
            >
              {/* Column title */}
              <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#262626] select-none">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold tracking-tight ${col.text}`}>{col.label}</span>
                  <span className="text-[10px] font-mono bg-[#171717] text-gray-400 px-2 py-0.5 rounded-full font-bold border border-[#262626]">
                    {colTasks.length}
                  </span>
                </div>
              </div>

              {/* Tasks contents list */}
              <div className="flex-1 space-y-3.5 overflow-y-auto pr-1 min-h-[160px]">
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    className="group bg-[#0a0a0a] border border-[#262626] hover:border-[#6366f1]/40 rounded-xl p-3.5 shadow-md hover:shadow-indigo-500/5 hover:-translate-y-0.5 transition-all text-gray-300"
                  >
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <span className="text-[9px] font-mono text-[#6366f1] capitalize bg-[#6366f1]/10 px-2 py-0.5 rounded border border-[#6366f1]/25">
                        {task.milestone}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                        {/* Drag controls simulating state moves */}
                        {col.status !== 'todo' && (
                          <button
                            onClick={() => {
                              const prevs: Record<KanbanStatus, KanbanStatus> = {
                                todo: 'todo',
                                progress: 'todo',
                                review: 'progress',
                                done: 'review'
                              };
                              onUpdateStatus(task.id, prevs[col.status]);
                            }}
                            className="p-1 bg-[#171717] hover:bg-[#262626] text-gray-400 rounded text-[9px] border border-[#262626]"
                            title="Move back"
                          >
                            ◀
                          </button>
                        )}
                        {col.status !== 'done' && (
                          <button
                            onClick={() => {
                              const nexts: Record<KanbanStatus, KanbanStatus> = {
                                todo: 'progress',
                                progress: 'review',
                                review: 'done',
                                done: 'done'
                              };
                              onUpdateStatus(task.id, nexts[col.status]);
                            }}
                            className="p-1 bg-[#171717] hover:bg-[#262626] text-[#6366f1] rounded text-[9px] border border-[#262626]"
                            title="Move forward"
                          >
                            ▶
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteTask(task.id)}
                          className="p-1 bg-[#171717] hover:bg-rose-950/40 text-rose-500 rounded text-[9px] border border-[#262626]"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-white leading-tight mb-2 tracking-tight">{task.title}</h4>
                    {task.description && (
                      <p className="text-[10px] text-gray-400 line-clamp-2 mb-3.5 leading-relaxed">{task.description}</p>
                    )}

                    <div className="flex items-center justify-between border-t border-[#262626] pt-2.5 mt-2 text-[10px] select-none">
                      <span className="text-gray-400 font-medium font-mono">{getAssigneeEmoji(task.assignee)}</span>
                      {getPriorityTag(task.priority)}
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="h-full min-h-[120px] flex items-center justify-center border-2 border-dashed border-[#262626] rounded-xl bg-[#050505]/30">
                    <span className="text-[10px] text-gray-600 font-mono">No active ticket</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
