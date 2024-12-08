import React from 'react';

export default function FaultSection({ faults }) {
  return (
    <ul className="space-y-4">
      {faults.map((fault, index) => (
        <li key={index} className="bg-gray-700 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-red-400">{fault.type}</h3>
          <p className="text-gray-300">Location: {fault.location}</p>
          <p className="text-gray-500 text-sm">Detected: {fault.timestamp}</p>
        </li>
      ))}
    </ul>
  );
}
