import type { TemperatureDataPoint } from '../types';

export const getTemperatureDomain = (
  data: TemperatureDataPoint[],
  minThreshold: number,
  maxThreshold: number
): [number, number] => {
  const minTemp = Math.min(...data.map(d => d.temperature), minThreshold);
  const maxTemp = Math.max(...data.map(d => d.temperature), maxThreshold);
  
  return [
    Math.floor(minTemp - 1),
    Math.ceil(maxTemp + 1)
  ];
};