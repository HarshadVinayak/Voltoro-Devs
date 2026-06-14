/**
 * Data and default templates for Voltoro Devs Web IDE
 */

import { DeveloperAgent, AIProvider, MarketplaceItem, CanvasNode, KanbanTask, ProjectFile, DbConnector } from './types';

export const INITIAL_AGENTS: DeveloperAgent[] = [
  {
    id: 'ceo',
    name: 'Seraphina',
    role: 'CEO Agent (Product & Strategy)',
    avatar: '👑',
    color: 'from-amber-500 to-orange-600',
    status: 'idle',
    description: 'Translates natural language prompts into technical requirements, roadmap blueprints, and task definitions.',
    skills: ['Product Scope', 'Kanban Generation', 'Requirements Gathering', 'Strategic Roadmaps']
  },
  {
    id: 'cto',
    name: 'Zephyr',
    role: 'CTO Agent (Architecture)',
    avatar: '🧠',
    color: 'from-purple-500 to-indigo-600',
    status: 'idle',
    description: 'Designs relational architectures, select technologies, and handles data modeling and API schema design.',
    skills: ['System Design', 'API Specifications', 'Database Schema', 'TypeScript Models']
  },
  {
    id: 'frontend',
    name: 'Lyra',
    role: 'Frontend Agent (UI/UX Engineering)',
    avatar: '🎨',
    color: 'from-pink-500 to-rose-600',
    status: 'idle',
    description: 'Crafts responsive interfaces with Tailwind CSS, animated layouts, rich component hierarchies, and interactive states.',
    skills: ['React & Next.js', 'Tailwind CSS', 'Framer Motion', 'Responsive Web Design']
  },
  {
    id: 'backend',
    name: 'Orion',
    role: 'Backend Agent (API & Services)',
    avatar: '🔌',
    color: 'from-blue-500 to-cyan-600',
    status: 'idle',
    description: 'Builds secure API integration routes, state machinery, data adapters, and manages server endpoints.',
    skills: ['FastAPI / Express', 'Database Connectors', 'Authentication', 'API Route Handlers']
  },
  {
    id: 'mobile',
    name: 'Aero',
    role: 'Mobile Agent (Native Overlays)',
    avatar: '📱',
    color: 'from-emerald-500 to-teal-600',
    status: 'idle',
    description: 'Generates cross-platform viewport adjustments, React Native bridges, and simulated viewport frameworks.',
    skills: ['React Native', 'Flutter SDK', 'Mobile UX Simulator', 'Platform Hooks']
  },
  {
    id: 'testing',
    name: 'Nova',
    role: 'Testing & QA Agent',
    avatar: '🧪',
    color: 'from-violet-500 to-indigo-700',
    status: 'idle',
    description: 'Scans files for compilation issues, writes automated component test descriptions, and validates functional routes.',
    skills: ['Vitest', 'React Testing Library', 'Boundary Checks', 'E2E Simulations']
  },
  {
    id: 'security',
    name: 'Valerius',
    role: 'SecOps Agent',
    avatar: '🛡️',
    color: 'from-red-500 to-crimson-600 border-red-500',
    status: 'idle',
    description: 'Audits files for dependency vulnerabilities, SQL injection flags, unescaped scripts, and secures API keys.',
    skills: ['Vuln Scanning', 'Key Encryption', 'Input Sanitation', 'CORS & CSP Rules']
  },
  {
    id: 'devops',
    name: 'Triton',
    role: 'DevOps & Architect deployment',
    avatar: '🚀',
    color: 'from-cyan-500 to-blue-700',
    status: 'idle',
    description: 'Configures Vercel deployment targets, writes bundle settings, Dockerfiles, and manages auto-scaling parameters.',
    skills: ['Vercel deployments', 'Docker builds', 'Scale Automation', 'Build Logs Parser']
  },
  {
    id: 'docs',
    name: 'Sophia',
    role: 'Documentation Agent',
    avatar: '📄',
    color: 'from-gray-500 to-slate-700',
    status: 'idle',
    description: 'Maintains API blueprints, writes README guidelines, and updates interactive step-by-step developer manuals.',
    skills: ['Markdown Specs', 'API Swagger Specs', 'User Manuals', 'Change Logs']
  }
];

export const INITIAL_PROVIDERS: AIProvider[] = [
  {
    id: 'gemini',
    name: 'Google Gemini Pro 3.5',
    key: 'AIzaSyCPuESyyWFNLqwvAR3XBmMRhFg0n4x4m7U',
    hasTested: true,
    isCustom: false,
    active: true
  },
  {
    id: 'groq',
    name: 'Groq LLaMA-3 (Superfast)',
    key: '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',
    hasTested: true,
    isCustom: false,
    active: false
  },
  {
    id: 'openrouter',
    name: 'OpenRouter AI (Multi-model)',
    key: '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',
    hasTested: true,
    isCustom: false,
    active: false
  },
  {
    id: 'mistral',
    name: 'Mistral Large Codegen',
    key: 'DBZDOdpEX4ksPTd2k9WYGufMRkk0Foie',
    hasTested: true,
    isCustom: false,
    active: false
  },
  {
    id: 'sambanova',
    name: 'SambaNova Systems (1000 t/s)',
    key: '70ef397a-6638-47ee-b9b0-2e7007a9a775',
    hasTested: true,
    isCustom: false,
    active: false
  },
  {
    id: 'cerebras',
    name: 'Cerebras wafer-scale (Realtime)',
    key: 'csk-vj45tjnm6e9vdn6xx48ypx8jry6yc9yxfmvcf886v23x22dc',
    hasTested: true,
    isCustom: false,
    active: false
  }
];

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'theme-cyber',
    name: 'Cyberpunk Neon Theme pack',
    description: 'Visual overlay pack with hot-pink accents, neon canvas outlines, and glitched loading grids.',
    category: 'components',
    author: 'VoltoroCore',
    rating: 4.9,
    installs: 1420,
    price: 'Free',
    installed: true,
    icon: '🔮'
  },
  {
    id: 'templ-food',
    name: 'Food Express Delivery Boilerplate',
    description: 'Full-stack responsive starter with active shopping cart simulation, orders database, and map UI routing.',
    category: 'templates',
    author: 'OrionDev',
    rating: 4.8,
    installs: 3220,
    price: 'Free',
    installed: false,
    icon: '🍔'
  },
  {
    id: 'agent-flutter-pro',
    name: 'Flutter Architect Companion Agent',
    description: 'Add a highly targeted agent that optimizes dart widgets, structures state providers and exports android APKs.',
    category: 'agents',
    author: 'GoogleDevs Community',
    rating: 5.0,
    installs: 940,
    price: '$12/mo',
    installed: false,
    icon: '💙'
  },
  {
    id: 'workflow-stripe',
    name: 'Stripe One-Click Subscription workflow',
    description: 'Self-configuring agent recipe that generates secure payment channels, webhooks, and billing portals.',
    category: 'workflows',
    author: 'FintechAgents',
    rating: 4.7,
    installs: 1850,
    price: 'Free',
    installed: true,
    icon: '💳'
  },
  {
    id: 'templ-saas',
    name: 'Bento Grid SaaS Landing Deck',
    description: 'Modern sales landing deck with animated charts, pricing grids, testimonial carousels, and dark mode.',
    category: 'templates',
    author: 'LyraUX',
    rating: 4.9,
    installs: 4500,
    price: 'Free',
    installed: true,
    icon: '⚡'
  }
];

export const INITIAL_CONNECTORS: DbConnector[] = [
  { id: 'db-1', name: 'Primary PostgreSQL Production', type: 'PostgreSQL', status: 'connected', host: 'postgres-db.supabase.co', port: '5432' },
  { id: 'db-2', name: 'Cache Redis Memorystore', type: 'Redis', status: 'connected', host: 'redis-cache.upstash.io', port: '6379' },
  { id: 'db-3', name: 'Stripe Metadata Sync MongoDB', type: 'MongoDB', status: 'disconnected', host: 'mongodb-cluster.atlas.com', port: '27017' }
];

export const DEFAULT_FILES: ProjectFile[] = [
  {
    id: 'f-1',
    name: 'package.json',
    path: 'package.json',
    content: `{
  "name": "voltoro-generated-app",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.400.0",
    "motion": "^12.0.0",
    "canvas-confetti": "^1.6.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}`,
    type: 'file'
  },
  {
    id: 'f-2',
    name: 'src',
    path: 'src',
    content: '',
    type: 'directory'
  },
  {
    id: 'f-3',
    name: 'index.html',
    path: 'index.html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Voltoro Devs Live Application</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #0d0f14;
      color: #f3f4f6;
    }
  </style>
</head>
<body class="p-4 md:p-8 flex items-center justify-center min-h-screen">
  <div id="root" class="max-w-md w-full bg-[#161922] p-8 rounded-2xl border border-gray-800 shadow-2xl text-center">
    <div class="h-16 w-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">⚡</div>
    <h1 class="text-3xl font-bold font-['Space_Grotesk'] text-white tracking-tight mb-2">Voltoro Workspace</h1>
    <p class="text-gray-400 text-sm mb-6 leading-relaxed">Provide an app specification in the Vibe Chat or double-click to start generating files. Multi-Agent company stands ready.</p>
    
    <div class="bg-[#11131a] p-4 rounded-xl border border-gray-850 text-left text-xs mb-6 font-mono text-cyan-400 flex items-center justify-between">
      <span>● AGENT_LISTENER_ACTIVE</span>
      <span class="animate-pulse h-2 w-2 rounded-full bg-emerald-400"></span>
    </div>
    
    <button onclick="triggerGreeting()" class="w-full bg-amber-500 hover:bg-amber-600 transition-all text-white font-medium py-3 px-6 rounded-xl text-sm shadow-lg shadow-amber-500/20">
      Say Hello to Team
    </button>
  </div>

  <script>
    function triggerGreeting() {
      alert("Greetings from Voltoro Devs multi-agent runtime! Type a new prompt like 'Build a custom calculator' to watch agents reconstruct this preview in real-time.");
    }
  </script>
</body>
</html>`,
    type: 'file'
  },
  {
    id: 'f-4',
    name: 'App.tsx',
    path: 'src/App.tsx',
    content: `// Main application file
import React, { useState } from 'react';
import { Sparkles, Calendar, Plus, Trash } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Brainstorm business scope', category: 'Strategic' },
    { id: 2, text: 'Deploy basic landing template', category: 'DevOps' }
  ]);
  const [inp, setInp] = useState('');

  return (
    <div className="p-6 bg-[#0f111a] min-h-screen text-slate-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-[#141724] border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-cyan-400 mb-6">
          <Sparkles className="w-6 h-6 animate-pulse" /> Task Board
        </h2>
        {/* Simple live interface state */}
      </div>
    </div>
  );
}`,
    type: 'file',
    parentId: 'f-2'
  },
  {
    id: 'f-5',
    name: 'README.md',
    path: 'README.md',
    content: `# Voltoro Generated Application

This repository was planned, designed, coded, and secured under Voltoro Devs Multi-Agent Engine.

## Project Structure
- \`index.html\`: Mount point & viewport adjustments
- \`src/App.tsx\`: Main entry code and runtime components
- \`package.json\`: Manifest of dependencies

## Contributors
- **CEO Agent (Seraphina)**: Roadmap planner
- **CTO Agent (Zephyr)**: Architectural schema
- **Frontend Agent (Lyra)**: UI framework & Styles
`,
    type: 'file'
  }
];

export const INITIAL_TASKS: KanbanTask[] = [
  { id: 't-1', title: 'Compile Product Requirement Document', description: 'Transform raw natural speech into formal PRD specs with milestone maps.', status: 'done', assignee: 'ceo', priority: 'high', milestone: 'Milestone 1: Logic Scoping' },
  { id: 't-2', title: 'Establish Live Frame routing and index', description: 'Mount baseline HTML structures and configure tailwind modules.', status: 'done', assignee: 'frontend', priority: 'high', milestone: 'Milestone 1: Logic Scoping' },
  { id: 't-3', title: 'Setup database PostgreSQL connectors', description: 'Define user model collections, table relational index, and seed scripts.', status: 'todo', assignee: 'backend', priority: 'medium', milestone: 'Milestone 2: Database Layer' },
  { id: 't-4', title: 'Vulnerability Analysis scanning', description: 'Review imported packages and ensure API parameters bypass sanitization locks.', status: 'todo', assignee: 'security', priority: 'high', milestone: 'Milestone 3: Security & Tests' },
  { id: 't-5', title: 'Configure Vercel Deployment parameters', description: 'Bridges continuous push integrations to cloud endpoints.', status: 'progress', assignee: 'devops', priority: 'low', milestone: 'Milestone 4: Cloud Engine' }
];

export const INITIAL_NODES: CanvasNode[] = [
  { id: 'n-1', type: 'client', label: 'Client (Web / Mobile)', x: 100, y: 150, description: 'Single Page App viewport client rendered inside browser', fields: ['Tailwind UI Theme', 'LocalStorage Persist', 'IFrame listener'], connections: ['n-2'] },
  { id: 'n-2', type: 'api', label: 'Voltoro API Gateway', x: 380, y: 150, description: 'Secured entry handler with multi-agent request proxy controllers', methods: ['POST /api/generate', 'GET /api/project/status', 'POST /api/deploy'], connections: ['n-3', 'n-4'] },
  { id: 'n-3', type: 'database', label: 'Production Relational DB', x: 680, y: 80, description: 'Durable cloud transactional PostgreSQL state storage pool', fields: ['id: SERIAL Primary Key', 'email: VARCHAR Unique', 'files: JSONB Tree'], connections: [] },
  { id: 'n-4', type: 'service', label: 'AI Agent Sync Queue', x: 680, y: 250, description: 'Multi-provider routing stream containing worker context locks', methods: ['CEO agent validation', 'CTO architecture parser', 'DevSecOps safety lock'], connections: [] }
];
