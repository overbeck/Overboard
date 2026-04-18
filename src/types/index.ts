export type SystemStatus = 'active' | 'in-development' | 'archived' | 'maintained';

export interface System {
  id: string;
  name: string;
  status: SystemStatus;
  description: string;
  accent: 'pink' | 'purple' | 'silver';
  techStack: string[];
  specs: { label: string; value: string }[];
  bom: BOMItem[];
  schematics: string[];
}

export interface BOMItem {
  ref: string;
  component: string;
  value: string;
  manufacturer: string;
  qty: number;
}

export interface Part {
  id: string;
  name: string;
  manufacturer: string;
  value: string;
  category: string;
  supplier: string;
  partNumber: string;
  stock: 'in-stock' | 'low' | 'out-of-stock' | 'on-order';
  link?: string;
  notes?: string;
}

export interface Schematic {
  id: string;
  name: string;
  system: string;
  type: 'power' | 'signal' | 'cv' | 'digital' | 'analog' | 'ble' | 'full';
  fileType: 'PDF' | 'SVG' | 'KiCad' | 'Eagle';
  lastUpdated: string;
  version: string;
}

export interface Repo {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  status: SystemStatus;
  lastUpdated: string;
  stars: number;
  system?: string;
  isPrivate: boolean;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  category: string;
  tags: string[];
  lastUpdated: string;
  preview: string;
}

export interface StepFile {
  id: string;
  name: string;
  folder: string;
  system: string;
  date: string;
  size: string;
  format: 'STEP' | 'STL' | 'DXF' | 'SVG' | 'F3D';
}

export interface ActivityItem {
  id: string;
  type: 'commit' | 'upload' | 'note' | 'part' | 'build';
  message: string;
  system?: string;
  time: string;
  user: string;
}

export interface MediaItem {
  id: string;
  name: string;
  category: 'Systems' | 'Live' | 'Studio' | 'Components' | 'Renders';
  system?: string;
  date: string;
  type: 'image' | 'video';
  placeholder: string;
}

export interface StrategyGoal {
  id: string;
  text: string;
  done: boolean;
}

export interface StrategyPhase {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  timeframe: string;
  status: 'active' | 'upcoming' | 'complete';
  linkedSystems: string[];
  goals: StrategyGoal[];
}

export interface ImmediateAction {
  id: string;
  text: string;
  done: boolean;
}

export interface StrategyData {
  phases: StrategyPhase[];
  immediateActions: ImmediateAction[];
  lastUpdated: string;
  updatedBy: string;
}
