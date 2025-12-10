import { Algorithm, AlgorithmType, LogEntry } from './types';

export const ALGORITHMS: Algorithm[] = [
  {
    id: AlgorithmType.PREDICTION,
    title: 'Time Series Oracle',
    description: 'Prophet-based forecasting engine. Detects seasonality and predicts future trends with 95% confidence intervals.',
    icon: 'Activity',
    complexity: 'High',
  },
  {
    id: AlgorithmType.CLUSTERING,
    title: 'K-Means Isolator',
    description: 'Unsupervised learning model to identify hidden patterns and segregate data points into distinct behavioral clusters.',
    icon: 'ScatterChart',
    complexity: 'Medium',
  },
  {
    id: AlgorithmType.NETWORK,
    title: 'Neural Nexus',
    description: 'Deep learning connectivity analysis. Visualizes strength of relationships between nodes in a force-directed layout.',
    icon: 'Share2',
    complexity: 'High',
  },
];

export const MOCK_LOGS: string[] = [
  "Initializing Python 3.11 runtime environment...",
  "Allocating memory for Pyodide instance...",
  "Loading library: pandas (14.2 MB)...",
  "Loading library: numpy (7.1 MB)...",
  "Loading library: scikit-learn...",
  "Mounting virtual file system...",
  "Ingesting 'sales_data.csv'...",
  "Detecting schema...",
  "Column 'timestamp' identified as DATETIME.",
  "Column 'revenue' identified as FLOAT64.",
  "Null values detected in row 412. Imputing with mean...",
  "Normalization complete. Scaling features...",
  "Initializing model weights...",
  "Training epoch 1/5 - Loss: 0.8234",
  "Training epoch 2/5 - Loss: 0.6412",
  "Training epoch 3/5 - Loss: 0.4129",
  "Training epoch 4/5 - Loss: 0.2201",
  "Training epoch 5/5 - Loss: 0.0982",
  "Model converged. Generating artifacts...",
  "Serializing JSON output...",
  "PROCESS COMPLETE.",
];

export const PREDICTION_DATA = [
  { name: 'Jan', value: 4000, value2: 2400 },
  { name: 'Feb', value: 3000, value2: 1398 },
  { name: 'Mar', value: 2000, value2: 9800 },
  { name: 'Apr', value: 2780, value2: 3908 },
  { name: 'May', value: 1890, value2: 4800 },
  { name: 'Jun', value: 2390, value2: 3800 },
  { name: 'Jul', value: 3490, value2: 4300 },
  { name: 'Aug', value: 5490, value2: 6300 }, // Future
  { name: 'Sep', value: 6490, value2: 7300 }, // Future
];

export const CLUSTERING_DATA = Array.from({ length: 50 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 100,
  cluster: i % 3,
}));
