import React, { useState, useEffect } from 'react';
import { EditorTab, ProjectFile } from '../types';
import { Save, Code, Sparkles, FileCode, Check, RefreshCw } from 'lucide-react';

interface MonacoEditorProps {
  files: ProjectFile[];
  tabs: EditorTab[];
  activeTabId: string | null;
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onUpdateFileContent: (fileId: string, content: string) => void;
  onAIQuickRefactor: (fileId: string) => void;
}

export default function MonacoEditor({
  files,
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onUpdateFileContent,
  onAIQuickRefactor
}: MonacoEditorProps) {
  const [editorContent, setEditorContent] = useState('');
  const [fontSize, setFontSize] = useState(13);
  const [isSaved, setIsSaved] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [isRefactoring, setIsRefactoring] = useState(false);

  // Load the active file
  const activeTab = tabs.find(t => t.id === activeTabId);
  const activeFile = activeTab ? files.find(f => f.path === activeTab.filePath) : null;

  useEffect(() => {
    if (activeFile) {
      setEditorContent(activeFile.content);
      setIsSaved(true);
    } else {
      setEditorContent('');
    }
  }, [activeFile]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setEditorContent(val);
    setIsSaved(false);

    if (autoSave && activeFile) {
      onUpdateFileContent(activeFile.id, val);
      setIsSaved(true);
    }
  };

  const handleManualSave = () => {
    if (activeFile) {
      onUpdateFileContent(activeFile.id, editorContent);
      setIsSaved(true);
    }
  };

  const triggerRefactor = async () => {
    if (!activeFile) return;
    setIsRefactoring(true);
    await onAIQuickRefactor(activeFile.id);
    setIsRefactoring(false);
  };

  // Helper to count lines of code
  const getLineNumbers = () => {
    const lines = editorContent.split('\n');
    return Array.from({ length: Math.max(1, lines.length) }, (_, i) => i + 1);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] text-gray-350">
      {/* Tab bar header list */}
      <div className="flex items-center justify-between bg-[#0a0a0a] border-b border-[#262626] select-none">
        <div className="flex-1 flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => {
            const isActive = tab.id === activeTabId;
            const tabFile = files.find(f => f.path === tab.filePath);
            if (!tabFile) return null;

            return (
              <div
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono border-r border-[#262626] cursor-pointer transition-all ${
                  isActive ? 'bg-[#050505] text-white border-t-2 border-[#6366f1] font-medium' : 'text-gray-400 hover:bg-[#171717]'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-[#6366f1]" />
                <span className="truncate max-w-[100px]">{tabFile.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                  className="hover:bg-[#262626] p-0.5 rounded text-[9px] hover:text-white"
                >
                  ✕
                </button>
              </div>
            );
          })}

          {tabs.length === 0 && (
            <div className="p-2 text-xs text-gray-500 font-mono italic">
              No files open. Click any file in the Explorer tree layout.
            </div>
          )}
        </div>

        {/* Editor controls right side */}
        <div className="flex items-center gap-3.5 px-3">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
            <span className="text-gray-500 font-bold uppercase tracking-widest">Font</span>
            <button
              onClick={() => setFontSize(prev => Math.max(10, prev - 1))}
              className="px-1.5 py-0.5 bg-[#171717] border border-[#262626] rounded font-bold hover:text-white"
            >
              A-
            </button>
            <span className="text-gray-200">{fontSize}px</span>
            <button
              onClick={() => setFontSize(prev => Math.min(20, prev + 1))}
              className="px-1.5 py-0.5 bg-[#171717] border border-[#262626] rounded font-bold hover:text-white"
            >
              A+
            </button>
          </div>

          <label className="flex items-center gap-1 cursor-pointer text-[10px] font-mono select-none">
            <input
              type="checkbox"
              checked={autoSave}
              onChange={(e) => setAutoSave(e.target.checked)}
              className="rounded accent-[#6366f1] border-[#262626] w-3 h-3 cursor-pointer"
            />
            <span className="text-gray-400">AutoSave</span>
          </label>

          <button
            onClick={handleManualSave}
            disabled={isSaved}
            className={`px-3 py-1 bg-[#171717] hover:bg-indigo-950/20 border rounded-lg flex items-center gap-1 text-[11px] font-mono transition-colors border-[#262626] ${
              isSaved ? 'text-gray-500' : 'text-[#6366f1]'
            }`}
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Editor Body text-area container with line counts */}
      {activeFile ? (
        <div className="flex-1 flex max-h-full overflow-hidden bg-[#050505]">
          {/* Simulated Line counters */}
          <div className="w-10 bg-[#0a0a0a] text-gray-500 border-r border-[#262626] font-mono text-[11px] pt-3 text-right pr-2 select-none flex flex-col overflow-hidden">
            {getLineNumbers().map(num => (
              <span key={num} className="block leading-5 h-[20px]">{num}</span>
            ))}
          </div>

          <div className="flex-1 flex flex-col relative h-full">
            {/* AI Assist floating button */}
            <div className="absolute right-4 top-4 z-40 select-none">
              <button
                onClick={triggerRefactor}
                disabled={isRefactoring}
                className="px-3.5 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl hover:opacity-95 text-white flex items-center gap-1.5 text-xs font-mono font-medium shadow-lg shadow-indigo-500/10 hover:-translate-y-0.5 transition-all"
              >
                {isRefactoring ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                {isRefactoring ? 'Refactoring Component...' : 'Auto-Refactor via AI'}
              </button>
            </div>

            <textarea
              value={editorContent}
              onChange={handleTextChange}
              style={{ fontSize: `${fontSize}px` }}
              className="flex-1 w-full h-full bg-transparent p-3 text-gray-150 font-mono leading-normal outline-none resize-none overflow-auto"
              spellCheck={false}
              placeholder="// Type your code here..."
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-8 bg-[#050505] select-none">
          <div className="p-4 bg-[#171717] text-gray-400 border border-[#262626] rounded-2xl mb-4">
            <Code className="w-8 h-8 text-[#6366f1] opacity-60 animate-pulse" />
          </div>
          <h3 className="text-sm font-bold text-gray-300 font-mono">Voltoro Compiler Ready</h3>
          <p className="text-xs text-gray-500 max-w-xs mt-1 leading-relaxed">
            Double click files in the Sidebar or choose standard boilerplate templates to open full-fidelity JSX editor tabs.
          </p>
        </div>
      )}

      {/* Editor Status bar */}
      <div className="bg-[#0a0a0a] border-t border-[#262626] px-4 py-1.5 text-[10px] font-mono text-gray-400 flex justify-between items-center select-none">
        <div className="flex items-center gap-3">
          <span className="text-[#6366f1] font-bold uppercase tracking-widest text-[9px]">SYSTEM COMPILER</span>
          <span>LF</span>
          <span>UTF-8</span>
          <span className="text-[#a855f7]">TypeScript React Compiler</span>
        </div>
        <div>
          <span>Tab Size: 2</span>
          <span className="ml-3">Col 1, Ln {editorContent.split('\n').length}</span>
        </div>
      </div>
    </div>
  );
}
