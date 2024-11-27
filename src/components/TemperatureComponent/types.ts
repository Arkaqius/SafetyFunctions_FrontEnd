export type TemperatureTrend = 'up' | 'down' | 'stable';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface TemperatureDataPoint {
  timestamp: string;
  temperature: number;
}

export interface RoomData {
  roomName: string;
  currentTemp: number;
  tempTrend: TemperatureTrend;
  rateOfChange: number;
  forecastTemp: number;
  priority: PriorityLevel;
  historyData: TemperatureDataPoint[];
  minThreshold: number;
  maxThreshold: number;
}