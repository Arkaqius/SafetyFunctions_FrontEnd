import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import type { TemperatureDataPoint } from '../types';
import { getTemperatureDomain } from '../utils/temperatureThresholds';

interface Props {
  data: TemperatureDataPoint[];
  minThreshold: number;
  maxThreshold: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 p-2 border border-gray-600 rounded shadow-sm">
        <p className="text-sm text-gray-300">{label}</p>
        <p className="text-sm font-semibold text-gray-100">
          {payload[0].value.toFixed(1)}°C
        </p>
      </div>
    );
  }
  return null;
};

export default function TemperatureChart({ data, minThreshold, maxThreshold }: Props) {
  const domain = useMemo(() => 
    getTemperatureDomain(data, minThreshold, maxThreshold),
    [data, minThreshold, maxThreshold]
  );

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <XAxis 
          dataKey="timestamp"
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          stroke="#4B5563"
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          stroke="#4B5563"
          domain={domain}
          width={35}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine 
          y={minThreshold} 
          stroke="#60A5FA" 
          strokeDasharray="3 3"
          label={{ value: 'Min', position: 'right', fontSize: 10, fill: '#9CA3AF' }}
        />
        <ReferenceLine 
          y={maxThreshold} 
          stroke="#F87171" 
          strokeDasharray="3 3"
          label={{ value: 'Max', position: 'right', fontSize: 10, fill: '#9CA3AF' }}
        />
        <Line 
          type="monotone" 
          dataKey="temperature" 
          stroke="#818CF8" 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}