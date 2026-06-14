import React, { useState } from 'react';
import { ChatMessage, DeveloperAgent } from '../types';
import { Send, Sparkles, RefreshCw, Cpu, Star, StarOff, HelpCircle, CheckCircle2 } from 'lucide-react';

interface AgentChatProps {
  messages: ChatMessage[];
  agents: DeveloperAgent[];
  activeProvider: string;
  isGenerating: boolean;
  onSendMessage: (text: string) => void;
  onSelectProvider: (providerId: string) => void;
  onTriggerVibeCode: (promptText: string) => void;
}

export default function AgentChat({
  messages,
  agents,
  activeProvider,
  isGenerating,
  onSendMessage,
  onSelectProvider,
  onTriggerVibeCode
}: AgentChatProps) {
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;

    onSendMessage(inputText);
    setInputText('');
  };

  const activeAgent = agents.find(a => a.status !== 'idle');

  const vibePrompts = [
    { label: '📝 Task Planner App', prompt: 'Build a elegant dark task planner list app with state' },
    { label: '🍔 Food Delivery Order App', prompt: 'Build a premium food delivery landing with order menus and cart total' },
    { label: '📉 Stock/Gold Pulse tracker', prompt: 'Build a dark stock gold tracker with mock graph grids and rates' }
  ];

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border-l border-[#262626] select-none">
      {/* Agent status header dashboard */}
      <div className="p-3.5 border-b border-[#262626] bg-[#0a0a0a]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#6366f1] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6366f1] font-mono">Multi-Agent Company Hub</span>
          </div>
          <span className="text-[9px] bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/25 px-2 py-0.5 rounded font-mono font-bold uppercase">
            9 nodes connected
          </span>
        </div>

        {/* Dynamic active status agent indicator */}
        <div className="p-2.5 bg-[#050505] border border-[#262626] rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-7 w-7 rounded-lg bg-gradient-to-tr ${activeAgent ? activeAgent.color : 'from-gray-650 to-slate-800'} text-xs flex items-center justify-center font-bold relative`}>
              <span>{activeAgent ? activeAgent.avatar : '🤖'}</span>
              <span className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-black ${activeAgent ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold text-white tracking-tight leading-none truncate max-w-[150px]">
                {activeAgent ? activeAgent.name : 'Swarm Agents Status: Idle'}
              </h4>
              <p className="text-[9px] text-gray-500 mt-0.5 font-mono">
                {activeAgent ? `Active Task: ${activeAgent.activeTask}` : 'Awaiting prompt specification...'}
              </p>
            </div>
          </div>

          {isGenerating && (
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-400">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>COMPILING_STAGES</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages layout */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505] flex flex-col">
        {messages.map(msg => {
          const isAgent = msg.role === 'agent';
          const msgAgent = isAgent ? agents.find(a => a.id === msg.agentId) : null;
          
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] rounded-2xl p-3.5 leading-relaxed text-xs border ${
                msg.role === 'user'
                  ? 'self-end bg-[#171717] border-[#262626] text-white rounded-br-none'
                  : isAgent && msgAgent
                  ? 'self-start bg-[#0a0a0a] border-[#262626] text-gray-350 rounded-bl-none'
                  : 'self-start bg-[#0a0a0a] border-[#262626] text-gray-300 rounded-bl-none'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-1.5 border-b border-[#262626] pb-1 select-none text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1">
                  <span>{isAgent && msgAgent ? msgAgent.avatar : '👤'}</span>
                  <span className="font-bold">{isAgent && msgAgent ? `${msgAgent.name} (${msgAgent.role.split(' ')[0]})` : msg.sender}</span>
                </div>
                <span>{msg.timestamp}</span>
              </div>
              <p className="whitespace-pre-wrap leading-relaxed text-gray-350 font-sans">{msg.text}</p>

              {/* Code generation attachments */}
              {msg.codeChanges && (
                <div className="mt-2.5 pt-2 border-t border-[#262626] flex items-center justify-between text-[10px] font-mono select-none">
                  <span className="text-[#6366f1] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Generated: {msg.codeChanges.filePath}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="my-auto flex flex-col items-center text-center p-6 text-gray-500 max-w-sm mx-auto">
            <div className="p-3 bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/25 rounded-2xl mb-4 text-xs font-bold font-mono uppercase tracking-widest"> Swarm active </div>
            <h4 className="text-xs font-bold text-gray-300 font-mono tracking-wide uppercase mb-1">Voltoro multi-agent squad active</h4>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              We translate natural English descriptions into clean architectures, deployable database connections, components, files, and tests inside this sandbox.
            </p>

            {/* Quick Prompts cards */}
            <div className="mt-6 w-full space-y-2 select-none text-left">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#6366f1] block mb-1">Interactive Templates:</span>
              {vibePrompts.map((vp, i) => (
                <div
                  key={i}
                  onClick={() => onTriggerVibeCode(vp.prompt)}
                  className="p-2.5 bg-[#0a0a0a] hover:bg-[#171717] border border-[#262626] hover:border-[#6366f1]/40 rounded-xl cursor-pointer text-[11px] text-gray-300 font-medium transition-all flex items-center justify-between"
                >
                  <span className="truncate">{vp.label}</span>
                  <span className="text-[9px] font-mono text-[#a855f7] uppercase tracking-widest bg-[#a855f7]/10 px-1.5 py-0.5 rounded border border-[#a855f7]/25">COMPILES</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inputs form action */}
      <div className="p-3 bg-[#0a0a0a] border-t border-[#262626]">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isGenerating}
            placeholder={isGenerating ? "Wait, compile timeline active..." : "Describe an app or ask agent to refactor..."}
            className="flex-1 bg-[#050505] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-gray-150 outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/20 transition-all font-sans"
          />
          <button
            type="submit"
            disabled={isGenerating || !inputText.trim()}
            className="p-2.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl hover:opacity-95 text-white shadow-lg transition-all flex items-center justify-center"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
