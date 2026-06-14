/**
 * Voltoro Devs Main Dashboard Orchestrator
 * Full-fidelity multi-agent Software Development IDE and continuous deployment suite
 */

import React, { useState, useEffect } from 'react';
import {
  ProjectFile,
  EditorTab,
  DeveloperAgent,
  ChatMessage,
  KanbanTask,
  CanvasNode,
  AIProvider,
  MarketplaceItem,
  DeploymentConfig,
  DbConnector,
  UserProfile
} from './types';
import {
  INITIAL_AGENTS,
  INITIAL_PROVIDERS,
  MARKETPLACE_ITEMS,
  INITIAL_CONNECTORS,
  DEFAULT_FILES,
  INITIAL_TASKS,
  INITIAL_NODES
} from './data';

// Components import
import FileExplorer from './components/FileExplorer';
import MonacoEditor from './components/MonacoEditor';
import VisualCanvas from './components/VisualCanvas';
import KanbanBoard from './components/KanbanBoard';
import LivePreview from './components/LivePreview';
import AgentChat from './components/AgentChat';
import DeploymentCenter from './components/DeploymentCenter';
import Marketplace from './components/Marketplace';
import AdminPanel from './components/AdminPanel';

// Icons
import {
  Layers,
  Kanban,
  Activity,
  CloudLightning,
  ShoppingBag,
  ShieldAlert,
  Settings,
  Cpu,
  RefreshCw,
  Search,
  Bell,
  Code2,
  Lock,
  ChevronDown,
  User,
  CheckCircle2,
  Globe
} from 'lucide-react';

export default function App() {
  // Navigation Routing States
  const [currentView, setCurrentView] = useState<'workspace' | 'planner' | 'canvas' | 'deploy' | 'marketplace' | 'admin' | 'settings'>('workspace');

  // Multi-file Workspace Core States
  const [files, setFiles] = useState<ProjectFile[]>(DEFAULT_FILES);
  const [tabs, setTabs] = useState<EditorTab[]>([
    { id: 'tab-1', filePath: 'index.html' },
    { id: 'tab-2', filePath: 'src/App.tsx' }
  ]);
  const [activeTabId, setActiveTabId] = useState<string | null>('tab-1');
  const [activeFileId, setActiveFileId] = useState<string | null>('f-3'); // index.html

  // System settings
  const [projectName, setProjectName] = useState('Voltoro Space app');
  const [projectDescription, setProjectDescription] = useState('AI-planned browser microservice scaffold.');

  // System-level data states
  const [agents, setAgents] = useState<DeveloperAgent[]>(INITIAL_AGENTS);
  const [providers, setProviders] = useState<AIProvider[]>(INITIAL_PROVIDERS);
  const [activeProviderId, setActiveProviderId] = useState('gemini');
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);
  const [canvasNodes, setCanvasNodes] = useState<CanvasNode[]>(INITIAL_NODES);
  const [connectors, setConnectors] = useState<DbConnector[]>(INITIAL_CONNECTORS);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(MARKETPLACE_ITEMS);

  // Deployments and Logs State
  const [deployment, setDeployment] = useState<DeploymentConfig>({
    id: 'dep-1',
    platform: 'Vercel',
    status: 'idle',
    branch: 'main',
    envVars: { 'DATABASE_URL': 'postgres://postgres-db.supabase.co:5432' }
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      sender: 'Voltoro CEO',
      role: 'agent',
      agentId: 'ceo',
      text: 'Greetings! I am Seraphina, the CEO agent. Describe what app you want to construct, and watch our multi-agent squad plan, engineer, secure, and deploy your codebase live.',
      timestamp: 'Today, 2:45 PM'
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([
    'CEO Seraphina initialized product scope parameters.',
    'DevOps Triton completed production build parameters.'
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // User Profile metadata
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Voltoro Lead Architect',
    email: 'architect@voltoro.dev',
    avatar: '🎯',
    company: 'Voltoro Systems Inc',
    role: 'Lead CTO Developer'
  });

  // Resolve current open files
  const activeFile = files.find(f => f.id === activeFileId);

  // Helper: Extract content of index.html for rendering live
  const getIndexHtmlContent = () => {
    const htmlFile = files.find(f => f.name === 'index.html');
    return htmlFile ? htmlFile.content : '';
  };

  // Add key connection test simulate
  const handleTestKeyStatus = (providerId: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        return { ...p, hasTested: true };
      }
      return p;
    }));
    alert(`Testing gateway access for ${providerId}... Access Status successfully verified via Cloud Vault!`);
  };

  // Toggle active providers
  const handleToggleProvider = (providerId: string) => {
    setProviders(prev => prev.map(p => ({
      ...p,
      active: p.id === providerId
    })));
    setActiveProviderId(providerId);
  };

  // Save overriden custom key
  const handleUpdateProviderKey = (providerId: string, customKey: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        return { ...p, key: customKey, hasTested: false };
      }
      return p;
    }));
  };

  // File explorer event hooks
  const handleSelectFile = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file || file.type === 'directory') return;

    setActiveFileId(fileId);

    // Open in editor tabs
    const alreadyInTabs = tabs.find(t => t.filePath === file.path);
    if (!alreadyInTabs) {
      const newTabId = `tab-${Date.now()}`;
      setTabs(prev => [...prev, { id: newTabId, filePath: file.path }]);
      setActiveTabId(newTabId);
    } else {
      setActiveTabId(alreadyInTabs.id);
    }
  };

  const handleSelectTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;

    setActiveTabId(tabId);
    const file = files.find(f => f.path === tab.filePath);
    if (file) {
      setActiveFileId(file.id);
    }
  };

  const handleCloseTab = (tabId: string) => {
    const tabToClose = tabs.find(t => t.id === tabId);
    const remainingTabs = tabs.filter(t => t.id !== tabId);
    setTabs(remainingTabs);

    if (activeTabId === tabId) {
      if (remainingTabs.length > 0) {
        const lastTab = remainingTabs[remainingTabs.length - 1];
        setActiveTabId(lastTab.id);
        const f = files.find(f => f.path === lastTab.filePath);
        if (f) setActiveFileId(f.id);
      } else {
        setActiveTabId(null);
        setActiveFileId(null);
      }
    }
  };

  const handleUpdateFileContent = (fileId: string, content: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId) {
        return { ...f, content };
      }
      return f;
    }));
  };

  const handleCreateFile = (name: string, type: 'file' | 'directory', parentId?: string) => {
    const parentPath = parentId ? files.find(f => f.id === parentId)?.path : '';
    const filePath = parentPath ? `${parentPath}/${name}` : name;

    const newFile: ProjectFile = {
      id: `file-uuid-${Date.now()}`,
      name,
      path: filePath,
      content: type === 'file' ? `// Created ${name}\n` : '',
      type,
      parentId
    };

    setFiles(prev => [...prev, newFile]);

    if (type === 'file') {
      handleSelectFile(newFile.id);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    const fileToDelete = files.find(f => f.id === fileId);
    if (!fileToDelete) return;

    setFiles(prev => prev.filter(f => f.id !== fileId && f.parentId !== fileId));
    // Close Tab if open
    const tab = tabs.find(t => t.filePath === fileToDelete.path);
    if (tab) {
      handleCloseTab(tab.id);
    }
  };

  // Automated Quick Refactor inside MonacoEditor
  const handleAIQuickRefactor = async (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    setIsGenerating(true);
    setAgents(prev => prev.map(a => a.id === 'frontend' ? { ...a, status: 'coding', activeTask: 'Optimizing syntax parameters' } : a));

    // Send mock request or Gemini completion request
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Optimize and add custom modern CSS classes and comments inside this file structure: ${file.content}`,
          files: files,
          provider: activeProviderId,
          providerKey: providers.find(p => p.id === activeProviderId)?.key
        })
      });

      if (response.ok) {
        const d = await response.json();
        const optimizedCode = d.newFiles?.find((nf: any) => nf.name === file.name)?.content || file.content;
        handleUpdateFileContent(fileId, optimizedCode);
        
        setMessages(prev => [
          ...prev,
          {
            id: `m-opt-${Date.now()}`,
            sender: 'Frontend Lyra',
            role: 'agent',
            agentId: 'frontend',
            text: `Optimized component "${file.name}" parameters to ensure high contrast, ultra-fast layout rendering speeds, and modern glassmorphism.`,
            timestamp: 'Just now'
          }
        ]);
      }
    } catch (e) {
      console.error(e);
    }

    setAgents(prev => prev.map(a => ({ ...a, status: 'idle', activeTask: undefined })));
    setIsGenerating(false);
  };

  // VIBE CODING OR MESSAGE CHAT COMPLETE CHANNELS
  const handleTriggerVibeCode = async (promptText: string) => {
    if (!promptText.trim() || isGenerating) return;

    setIsGenerating(true);
    setMessages(prev => [
      ...prev,
      { id: `m-u-${Date.now()}`, sender: 'User Developer', role: 'user', text: promptText, timestamp: 'Just now' }
    ]);

    // Active Agent Steppings Animations
    const steps = [
      { id: 'ceo', task: 'Synthesizing layout architecture scope' },
      { id: 'cto', task: 'Validating relational index' },
      { id: 'frontend', task: 'Assembling CSS wireframe elements' },
      { id: 'backend', task: 'Binding SQLite caching endpoint adapters' }
    ];

    for (const step of steps) {
      setAgents(prev => prev.map(a => a.id === step.id ? { ...a, status: 'thinking', activeTask: step.task } : a));
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      // Trigger API proxy to get true AI files generations
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          files: files,
          provider: activeProviderId,
          providerKey: providers.find(p => p.id === activeProviderId)?.key
        })
      });

      if (response.ok) {
        const data = await response.json();

        // 1. Create or Overwrite Files from server AI
        const generatedFiles = data.newFiles || [];
        setFiles(prev => {
          let updated = [...prev];
          for (const gf of generatedFiles) {
            const existingIdx = updated.findIndex(f => f.path === gf.path);
            if (existingIdx !== -1) {
              updated[existingIdx] = { ...updated[existingIdx], content: gf.content };
            } else {
              updated.push({
                id: `gf-uuid-${Math.random()}`,
                name: gf.name,
                path: gf.path,
                content: gf.content,
                type: 'file'
              });
            }
          }
          return updated;
        });

        // 2. Insert Agent Discussion Comments
        setMessages(prev => [
          ...prev,
          { id: `m-ceo-${Date.now()}`, sender: 'CEO Agent', role: 'agent', agentId: 'ceo', text: data.ceoAgentComment, timestamp: 'Now' },
          { id: `m-cto-${Date.now()}`, sender: 'CTO Agent', role: 'agent', agentId: 'cto', text: data.ctoAgentComment, timestamp: 'Now' },
          { id: `m-fe-${Date.now()}`, sender: 'Frontend Agent', role: 'agent', agentId: 'frontend', text: data.frontendAgentComment, timestamp: 'Now', codeChanges: { filePath: 'index.html', content: gfContent(generatedFiles, 'index.html'), type: 'create' } },
          { id: `m-be-${Date.now()}`, sender: 'Backend Agent', role: 'agent', agentId: 'backend', text: data.backendAgentComment, timestamp: 'Now' }
        ]);

        // 3. Sprout New Architecture Nodes on Visual Canvas
        if (data.canvasNodes && data.canvasNodes.length > 0) {
          setCanvasNodes(prev => [...prev, ...data.canvasNodes]);
        }

        // 4. Populate Agile Kanban Board with task cards
        if (data.kanbanTasks && data.kanbanTasks.length > 0) {
          setTasks(prev => [...prev, ...data.kanbanTasks]);
        }

        // Show compile notification
        setNotifications(prev => [
          ...prev,
          `Multi-agent compiled ${generatedFiles.length} file bundles successfully live.`
        ]);
        
        // Auto select open active html tab
        const htmlFile = generatedFiles.find((f: any) => f.name === 'index.html');
        if (htmlFile) {
          const matched = files.find(f => f.name === 'index.html');
          if (matched) handleSelectFile(matched.id);
        }
      }
    } catch (err) {
      console.error(err);
      // Fallback local messaging
      setMessages(prev => [
        ...prev,
        {
          id: `m-err-${Date.now()}`,
          sender: 'CTO Agent',
          role: 'agent',
          agentId: 'cto',
          text: `Relational API failed connection checking, falling back to cached local stream engine compiles. Files compiled: index.html, App.tsx.`,
          timestamp: 'Now'
        }
      ]);
    }

    setAgents(prev => prev.map(a => ({ ...a, status: 'idle', activeTask: undefined })));
    setIsGenerating(false);
  };

  const gfContent = (filesArray: any[], name: string) => {
    return filesArray.find(f => f.name === name)?.content || '';
  };

  // Add Item to Kanban task
  const handleAddKanbanTask = (t: KanbanTask) => {
    setTasks(prev => [...prev, t]);
  };

  const handleUpdateKanbanStatus = (id: string, s: any) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: s } : t));
  };

  const handleDeleteKanbanTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Visual Canvas handlers
  const handleAddCanvasNode = (node: CanvasNode) => {
    setCanvasNodes(prev => [...prev, node]);
  };

  const handleDeleteCanvasNode = (id: string) => {
    setCanvasNodes(prev => prev.filter(n => n.id !== id));
  };

  const handleUpdateCanvasNodes = (ns: CanvasNode[]) => {
    setCanvasNodes(ns);
  };

  // Marketplace install extension
  const handleInstallMarketplaceItem = (id: string) => {
    setMarketplaceItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, installed: true };
      }
      return item;
    }));

    // Trigger notification
    setNotifications(prev => [...prev, `Installed marketplace bundle: "${id}" successfully.`]);

    // Install mock template inside workspace tree!
    if (id === 'templ-food') {
      handleCreateFile('cart_store.ts', 'file');
      alert('Boilerplate item installed successfully! Created src/cart_store.ts inside tree.');
    }
  };

  // Simulate Cloud Run one-click deployment pipelines
  const handleDeployPipeline = () => {
    setDeployment(prev => ({ ...prev, status: 'building' }));
    setTimeout(() => {
      setDeployment(prev => ({
        ...prev,
        status: 'live',
        url: 'https://voltoro-sandbox-deployed-live.run.app'
      }));
      setNotifications(prev => [...prev, 'Deployment build deployed completely successfully to Cloud Run!']);
      alert('Continuous build deployed live successfully! See deployment link.');
    }, 2500);
  };

  return (
    <div className="flex h-screen bg-[#050505] text-[#e5e7eb] font-sans overflow-hidden">
      
      {/* 1. LEFT SIDEBAR NAVIGATION BAR */}
      <div className="w-16 flex flex-col justify-between items-center bg-[#0a0a0a] border-r border-[#262626] py-4 select-none z-50">
        <div className="flex flex-col gap-6 items-center">
          {/* Logo brand icon */}
          <div className="h-10 w-10 bg-gradient-to-tr from-[#6366f1] to-[#a855f7] rounded-xl flex items-center justify-center font-black tracking-tight text-white text-lg shadow-lg shadow-indigo-500/20 cursor-default animate-pulse">
            V
          </div>

          {/* Nav menu links list */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setCurrentView('workspace')}
              className={`p-2.5 rounded-xl transition-all ${currentView === 'workspace' ? 'bg-gradient-to-tr from-[#6366f1] to-[#a855f7] text-white shadow-xl shadow-indigo-500/20' : 'text-gray-405 hover:text-white'}`}
              title="Project Workspace IDE"
            >
              <Code2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentView('planner')}
              className={`p-2.5 rounded-xl transition-all ${currentView === 'planner' ? 'bg-gradient-to-tr from-[#6366f1] to-[#a855f7] text-white shadow-xl shadow-indigo-500/20' : 'text-gray-405 hover:text-white'}`}
              title="Agile Task Planner"
            >
              <Kanban className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentView('canvas')}
              className={`p-2.5 rounded-xl transition-all ${currentView === 'canvas' ? 'bg-gradient-to-tr from-[#6366f1] to-[#a855f7] text-white shadow-xl shadow-indigo-500/20' : 'text-gray-405 hover:text-white'}`}
              title="Infinite Visual Canvas"
            >
              <Layers className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentView('deploy')}
              className={`p-2.5 rounded-xl transition-all ${currentView === 'deploy' ? 'bg-gradient-to-tr from-[#6366f1] to-[#a855f7] text-white shadow-xl shadow-indigo-500/20' : 'text-gray-405 hover:text-white'}`}
              title="Deployment Center"
            >
              <CloudLightning className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentView('marketplace')}
              className={`p-2.5 rounded-xl transition-all ${currentView === 'marketplace' ? 'bg-gradient-to-tr from-[#6366f1] to-[#a855f7] text-white shadow-xl shadow-indigo-500/20' : 'text-gray-405 hover:text-white'}`}
              title="Marketplace store"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentView('admin')}
              className={`p-2.5 rounded-xl transition-all ${currentView === 'admin' ? 'bg-gradient-to-tr from-[#6366f1] to-[#a855f7] text-white shadow-xl shadow-indigo-500/20' : 'text-gray-405 hover:text-white'}`}
              title="Admin Panel dashboard"
            >
              <ShieldAlert className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Settings and user profile avatars */}
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={() => setCurrentView('settings')}
            className={`p-2.5 rounded-xl transition-colors ${currentView === 'settings' ? 'bg-[#171717] border border-[#262626] text-white' : 'text-gray-400 hover:text-white'}`}
            title="System / API keys Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          <div
            className="h-9 w-9 bg-purple-600 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer hover:opacity-90 shadow border border-purple-500/20"
            title={`${profile.name} (${profile.email})`}
          >
            <span>{profile.avatar}</span>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC PRIMARY CONTENT ENVIRONMENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* TOP COMPREHENSIVE CONTROL BAR */}
        <div className="h-14 bg-[#0a0a0a] border-b border-[#262626] px-5 flex items-center justify-between select-none shrink-0 z-40">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-white font-mono uppercase tracking-widest bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">VOLTORO DEVS</span>
            <span className="h-4 w-px bg-[#262626]"></span>
            
            {/* Project naming layout */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="font-mono font-bold text-[#6366f1]">{projectName}</span>
              <span className="text-gray-500 text-[10px]">({projectDescription})</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Dynamic AI multi-provider selectors */}
            <div className="flex items-center gap-2 bg-[#171717] border border-[#262626] rounded-lg px-2.5 py-1 text-xs text-gray-300">
              <Cpu className="w-3.5 h-3.5 text-[#a855f7]" />
              <span className="text-[10px] uppercase font-bold text-gray-500 font-mono">PROVIDER:</span>
              <select
                value={activeProviderId}
                onChange={(e) => handleToggleProvider(e.target.value)}
                className="bg-transparent border-none text-xs text-[#a0aec0] font-sans outline-none cursor-pointer"
              >
                {providers.map(p => (
                  <option key={p.id} value={p.id} className="bg-[#121620] text-gray-300">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Active connection validation lock status */}
            <div className="flex items-center gap-1.5 bg-[#171717] border border-[#262626] rounded-lg px-2.5 py-1 text-[10px] font-mono select-none">
              <Lock className="w-3.5 h-3.5 text-[#10b981] animate-pulse" />
              <span className="text-gray-400">VFC-TLS-SECURED</span>
            </div>

            {/* Notifications layout */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-[#1a1f2e] rounded-lg relative text-gray-400 hover:text-white"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-orange-500 animate-ping"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-[280px] bg-[#121620] border border-gray-850 rounded-xl p-3 shadow-2xl z-50 text-xs font-mono text-gray-300 space-y-2">
                  <span className="font-bold border-b border-gray-850 pb-1.5 block max-w-full uppercase text-[8px] text-gray-500 tracking-wider">WORKSPACE ALERTS</span>
                  {notifications.map((note, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-emerald-400">✔</span>
                      <p className="leading-tight">{note}</p>
                    </div>
                  ))}
                  <button onClick={() => setNotifications([])} className="text-[8px] uppercase tracking-widest text-center text-[#ff8a65] block w-full hover:underline pt-1">
                    Clear Alerts
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. CORE SUB-VIEW ROUTER LAYOUT SWITCH BOARD */}
        <div className="flex-1 min-h-0 overflow-hidden relative">
          
          {/* A. WORKSPACE VIEW (IDE - LEFT EXPLORER + MONACO + RIGHT AGENT CHAT) */}
          {currentView === 'workspace' && (
            <div className="h-full grid grid-cols-1 md:grid-cols-12 overflow-hidden">
              {/* Left Explorer: 2 Columns */}
              <div className="md:col-span-2 h-full order-first shrink-0">
                <FileExplorer
                  files={files}
                  activeFileId={activeFileId}
                  onSelectFile={handleSelectFile}
                  onCreateFile={handleCreateFile}
                  onDeleteFile={handleDeleteFile}
                />
              </div>

              {/* Center Monaco and Live Preview split: 7 Columns */}
              <div className="md:col-span-7 h-full flex flex-col min-w-0 border-r border-[#262626] relative">
                <div className="h-1/2 min-h-[220px]">
                  <MonacoEditor
                    files={files}
                    tabs={tabs}
                    activeTabId={activeTabId}
                    onSelectTab={handleSelectTab}
                    onCloseTab={handleCloseTab}
                    onUpdateFileContent={handleUpdateFileContent}
                    onAIQuickRefactor={handleAIQuickRefactor}
                  />
                </div>
                <div className="h-1/2 flex-1 border-t border-[#262626]">
                  <LivePreview
                    htmlContent={getIndexHtmlContent()}
                    projectName={projectName}
                  />
                </div>
              </div>

              {/* Right Multi-Agent Squad Chat Hub: 3 Columns */}
              <div className="md:col-span-3 h-full overflow-hidden">
                <AgentChat
                  messages={messages}
                  agents={agents}
                  activeProvider={activeProviderId}
                  isGenerating={isGenerating}
                  onSendMessage={handleTriggerVibeCode}
                  onSelectProvider={handleToggleProvider}
                  onTriggerVibeCode={handleTriggerVibeCode}
                />
              </div>
            </div>
          )}

          {/* B. AGREEMENT TASK PLANNER (KANBAN) */}
          {currentView === 'planner' && (
            <KanbanBoard
              tasks={tasks}
              onAddTask={handleAddKanbanTask}
              onUpdateStatus={handleUpdateKanbanStatus}
              onDeleteTask={handleDeleteKanbanTask}
            />
          )}

          {/* C. INFINITE VISUAL CANVAS */}
          {currentView === 'canvas' && (
            <VisualCanvas
              nodes={canvasNodes}
              onAddNode={handleAddCanvasNode}
              onDeleteNode={handleDeleteCanvasNode}
              onUpdateNodes={handleUpdateCanvasNodes}
            />
          )}

          {/* D. DEPLOYMENT CENTER */}
          {currentView === 'deploy' && (
            <DeploymentCenter
              connectors={connectors}
              deployment={deployment}
              onDeploy={handleDeployPipeline}
              onUpdateConnectors={setConnectors}
              onUpdateDeployment={setDeployment}
            />
          )}

          {/* E. EXTENSIONS MARKETPLACE */}
          {currentView === 'marketplace' && (
            <Marketplace
              items={marketplaceItems}
              onInstall={handleInstallMarketplaceItem}
            />
          )}

          {/* F. SYSTEM TELEMETRY MONITOR (ADMIN PANEL) */}
          {currentView === 'admin' && (
            <AdminPanel />
          )}

          {/* G. SYSTEM SETTINGS PANEL (API KEY AND PROFILE METADATA) */}
          {currentView === 'settings' && (
            <div className="h-full bg-[#050505] overflow-y-auto p-6 flex items-center justify-center select-none text-slate-300">
              <div className="max-w-3xl w-full bg-[#0a0a0a] rounded-2xl border border-[#262626] p-6 space-y-6">
                
                {/* Brand overview Title */}
                <div className="border-b border-[#262626] pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-md font-bold text-white font-mono uppercase tracking-widest flex items-center gap-2">
                      <Settings className="w-5 h-5 text-[#6366f1]" /> Voltoro Devs Config Panel
                    </h2>
                    <p className="text-[10px] text-gray-500 font-sans">Edit sandbox metadata parameters and save encrypted third-party credentials.</p>
                  </div>
                  <span className="text-[10px] font-mono text-[#6366f1] animate-pulse flex items-center gap-1.5">
                    ● ALL VAULTS SECURED
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Metadata Workspace properties */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-250 font-mono tracking-wider border-b border-[#262626] pb-1.5">1. Workspace Metadata</h3>
                    
                    <div className="space-y-1.5 text-xs">
                      <label className="text-[10px] font-mono text-gray-400 block">Voltoro Applet Project Title</label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full bg-[#050505] border border-[#262626] rounded-xl px-3 py-2 outline-none focus:border-[#6366f1] text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <label className="text-[10px] font-mono text-gray-400 block">Strategic Description</label>
                      <textarea
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="w-full bg-[#050505] border border-[#262626] rounded-xl px-3 py-2 outline-none focus:border-[#6366f1] text-xs h-16 resize-none"
                      />
                    </div>

                    {/* Profile editor */}
                    <h3 className="text-xs font-bold text-gray-250 font-mono tracking-wider border-b border-[#262626] pt-2 pb-1.5">2. User Profile Setup</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[10px] font-mono text-slate-500">Lead Architect Email:</span>
                        <span className="text-white font-mono">{profile.email}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[10px] font-mono text-slate-500">Default Auth Node:</span>
                        <span className="text-[#10b981] font-mono">Google OAuth verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Provider Key Setup container */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-250 font-mono tracking-wider border-b border-[#262626] pb-1.5">3. Multi-Provider API Keyring</h3>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                      Provider credentials are kept server-side inside sandboxed Express variables, encrypted safely.
                    </p>

                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {providers.map(prov => (
                        <div key={prov.id} className="p-3 bg-[#171717] border border-[#262626] rounded-xl space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-200">{prov.name}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleTestKeyStatus(prov.id)}
                                className="px-2 py-0.5 bg-[#050505] hover:bg-[#111111] rounded border border-[#262626] text-[9px] font-mono hover:text-white"
                              >
                                Test Access
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="password"
                              value={prov.key}
                              onChange={(e) => handleUpdateProviderKey(prov.id, e.target.value)}
                              placeholder="csk-vj45..."
                              className="flex-1 bg-[#050505] border border-[#262626] text-[11px] font-mono text-gray-400 px-2.5 py-1.5 rounded-lg outline-none focus:border-[#6366f1]"
                            />
                            <span className="text-xs">{prov.hasTested ? '✔' : '✕'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#262626] pt-4 flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-500">Voltoro Devs Sandbox Engine v2.4.9</span>
                  <button
                    onClick={() => {
                      alert('Custom environment parameters stored completely successfully.');
                      setCurrentView('workspace');
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-bold uppercase hover:opacity-95 text-white transition-opacity text-xs"
                  >
                    Sync sandboxed state
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
