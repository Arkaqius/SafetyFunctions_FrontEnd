import React from 'react';

export default function RecoveryAction({ action }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-blue-400">{action.title}</h3>
      <p className="text-gray-300">{action.description}</p>
      <p className="text-gray-500 text-sm">Status: {action.status}</p>
    </div>
  );
}
