/**
 * Voltoro Devs Schema and State Types
 * Consistent, production-ready types for multi-agent browser development
 */

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  content: string;
  type: 'file' | 'directory';
  parentId?: string;
}

export interface EditorTab {
  id: string;
  filePath: string;
}

export type AgentStatus = 'idle' | 'thinking' | 'coding' | 'testing' | 'deploying';

export interface DeveloperAgent {
  id: string;
  name: string;
  role: string;
  avatar: string; // Icon identifier or Emoji
  color: string; // Tailwind bg/text color helper
  status: AgentStatus;
  activeTask?: string;
  description: string;
  skills: string[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  role: 'user' | 'assistant' | 'agent';
  agentId?: string;
  text: string;
  timestamp: string;
  codeChanges?: {
    filePath: string;
    content: string;
    type: 'create' | 'edit';
  };
}

export type KanbanStatus = 'todo' | 'progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: KanbanStatus;
  assignee: string; // AgentId or 'User'
  priority: TaskPriority;
  milestone: string;
}

export type CanvasNodeType = 'client' | 'component' | 'api' | 'database' | 'service';

export interface CanvasNode {
  id: string;
  type: CanvasNodeType;
  label: string;
  x: number;
  y: number;
  fields?: string[]; // e.g., tables columns like ["id: SERIAL", "email: VARCHAR"]
  methods?: string[]; // e.g., API endpoints like ["GET /api/users", "POST /api/register"]
  description?: string;
  connections: string[]; // List of other Node IDs this node connects to (outputs)
}

export interface AIProvider {
  id: string;
  name: string;
  key: string;
  hasTested: boolean;
  isCustom: boolean;
  active: boolean;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: 'templates' | 'agents' | 'components' | 'workflows';
  author: string;
  rating: number;
  installs: number;
  price: string;
  installed: boolean;
  icon: string;
}

export interface DeploymentConfig {
  id: string;
  platform: 'Vercel' | 'Netlify' | 'Cloudflare' | 'Docker' | 'VPS';
  status: 'idle' | 'building' | 'live' | 'failed';
  url?: string;
  timestamp?: string;
  branch: string;
  envVars: Record<string, string>;
  databaseConnected?: string;
}

export interface DbConnector {
  id: string;
  name: string;
  type: 'PostgreSQL' | 'Redis' | 'MongoDB' | 'MySQL' | 'SQLite';
  status: 'connected' | 'disconnected';
  host?: string;
  port?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  company: string;
  role: string;
}
