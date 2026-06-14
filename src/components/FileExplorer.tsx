import React, { useState } from 'react';
import { ProjectFile } from '../types';
import { FileCode, Folder, FolderOpen, Plus, Trash, ChevronDown, ChevronRight, File } from 'lucide-react';

interface FileExplorerProps {
  files: ProjectFile[];
  activeFileId: string | null;
  onSelectFile: (fileId: string) => void;
  onCreateFile: (name: string, type: 'file' | 'directory', parentId?: string) => void;
  onDeleteFile: (fileId: string) => void;
}

export default function FileExplorer({
  files,
  activeFileId,
  onSelectFile,
  onCreateFile,
  onDeleteFile
}: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'src': true, // Expand 'src' by default
  });
  const [showCreateInput, setShowCreateInput] = useState<{ parentId?: string; type: 'file' | 'directory' } | null>(null);
  const [newItemName, setNewItemName] = useState('');

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const handleCreateSubmit = (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    onCreateFile(newItemName, showCreateInput?.type || 'file', parentId);
    setNewItemName('');
    setShowCreateInput(null);
  };

  const getFileIcon = (name: string) => {
    if (name.endsWith('.json')) return <FileCode className="w-4 h-4 text-amber-500" />;
    if (name.endsWith('.html')) return <FileCode className="w-4 h-4 text-orange-500" />;
    if (name.endsWith('.tsx') || name.endsWith('.ts')) return <FileCode className="w-4 h-4 text-cyan-400" />;
    if (name.endsWith('.md')) return <File className="w-4 h-4 text-emerald-400" />;
    return <FileCode className="w-4 h-4 text-gray-400" />;
  };

  // Build tree hierarchy representation
  const rootFiles = files.filter(f => !f.parentId);

  const renderFileRow = (file: ProjectFile, depth = 0) => {
    const isSelected = activeFileId === file.id;
    const isFolder = file.type === 'directory';
    const isFolderExpanded = expandedFolders[file.name] || false;

    if (isFolder) {
      const folderChildren = files.filter(f => f.parentId === file.id);

      return (
        <div key={file.id} className="select-none">
          {/* Folder header row */}
          <div
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            className={`group flex items-center justify-between py-1.5 px-3 hover:bg-[#171717]/60 transition-all cursor-pointer text-xs`}
            onClick={() => toggleFolder(file.name)}
          >
            <div className="flex items-center gap-1.5 text-gray-300">
              {isFolderExpanded ? <ChevronDown className="w-3.5 h-3.5 text-gray-500" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-500" />}
              {isFolderExpanded ? <FolderOpen className="w-4 h-4 text-amber-300/80" /> : <Folder className="w-4 h-4 text-amber-400/80" />}
              <span className="font-mono">{file.name}</span>
            </div>

            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCreateInput({ parentId: file.id, type: 'file' });
                }}
                className="p-0.5 hover:bg-[#262626] rounded text-gray-400 hover:text-white"
                title="Create File inside folder"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFile(file.id);
                }}
                className="p-0.5 hover:bg-[#262626] rounded text-rose-500"
                title="Delete directory"
              >
                <Trash className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Expanded folder contents */}
          {isFolderExpanded && (
            <div className="flex flex-col">
              {folderChildren.map(child => renderFileRow(child, depth + 1))}

              {/* Show inline create input if click trigger inside this folder */}
              {showCreateInput?.parentId === file.id && (
                <form
                  onSubmit={(e) => handleCreateSubmit(e, file.id)}
                  className="flex items-center gap-1.5 py-1"
                  style={{ paddingLeft: `${(depth + 1) * 12 + 24}px` }}
                >
                  <input
                    autoFocus
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onBlur={() => setShowCreateInput(null)}
                    placeholder={showCreateInput.type === 'file' ? 'some_file.tsx' : 'dir_name'}
                    className="bg-[#050505] border border-[#262626] rounded px-1.5 py-0.5 text-[10px] font-mono text-gray-250 outline-none w-[110px]"
                  />
                </form>
              )}
            </div>
          )}
        </div>
      );
    } else {
      // Normal File Row
      return (
        <div
          key={file.id}
          style={{ paddingLeft: `${depth * 12 + 16}px` }}
          className={`group flex items-center justify-between py-1.5 px-3 hover:bg-[#171717]/60 transition-all cursor-pointer text-xs ${
            isSelected ? 'bg-[#171717]/90 border-l-2 border-[#6366f1] text-white font-medium' : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => onSelectFile(file.id)}
        >
          <div className="flex items-center gap-2">
            {getFileIcon(file.name)}
            <span className="font-mono truncate max-w-[130px]">{file.name}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteFile(file.id);
            }}
            className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-[#262626] rounded text-rose-500 transition-opacity"
            title="Delete file"
          >
            <Trash className="w-3 h-3" />
          </button>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border-r border-[#262626] w-full select-none">
      <div className="flex items-center justify-between p-3 border-b border-[#262626] bg-[#0a0a0a]">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#6366f1] font-mono">Workspace Explorer</span>
        <div className="flex gap-1.5">
          <button
            onClick={() => setShowCreateInput({ parentId: undefined, type: 'file' })}
            className="p-1 hover:bg-[#171717] rounded text-gray-400 hover:text-white"
            title="Create root file"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {/* Inline root file creation form */}
        {showCreateInput && !showCreateInput.parentId && (
          <form
            onSubmit={(e) => handleCreateSubmit(e)}
            className="flex items-center gap-2 px-3 py-1.5"
          >
            <input
              autoFocus
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onBlur={() => setShowCreateInput(null)}
              placeholder="index.html..."
              className="bg-[#050505] border border-[#262626] rounded px-2 py-0.5 text-xs font-mono text-gray-200 outline-none w-full"
            />
          </form>
        )}

        {/* Node Trees */}
        {rootFiles.map(file => renderFileRow(file))}

        {rootFiles.length === 0 && (
          <div className="p-4 text-center text-xs text-gray-500 font-mono">
            Empty Workspace. Tap (+) to establish scaffold.
          </div>
        )}
      </div>
    </div>
  );
}
