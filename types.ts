export enum AppPhase {
  INTRO = 'INTRO',
  UPLOAD = 'UPLOAD',
  SELECT_ALGO = 'SELECT_ALGO',
  EXECUTING = 'EXECUTING',
  RESULTS = 'RESULTS',
}

export enum AlgorithmType {
  PREDICTION = 'PREDICTION',
  CLUSTERING = 'CLUSTERING',
  NETWORK = 'NETWORK',
}

export interface Algorithm {
  id: AlgorithmType;
  title: string;
  description: string;
  icon: string;
  complexity: 'Low' | 'Medium' | 'High';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
  category?: string;
}

export interface LogEntry {
  id: number;
  message: string;
  type: 'info' | 'process' | 'success' | 'warning';
  timestamp: string;
}
