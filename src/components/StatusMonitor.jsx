import React from 'react';
import { useHAData } from '../state/HADataContext';
import FaultSection from './FaultSectionReact';
import RecoveryAction from './RecoveryActionReact';

export default function StatusMonitor() {
  const { data, config, loading } = useHAData();

  // Prepare faults dynamically
  const faults = Object.entries(config?.symptoms || {}).map(([key, value]) => ({
    type: value.name,
    location: value.parameters?.location,
    severity: 'warning',
    priority: value.sm_name,
    timestamp: value.timestamp || new Date().toISOString(),
  }));

  // Prepare recovery actions dynamically
  const recoveryActions = Object.entries(config?.recovery_actions || {}).map(([key, value]) => ({
    id: key,
    title: value.name,
    description: `Actuator: ${value.params?.actuator || 'N/A'}`,
    status: value.status,
    relatedFault: value.params?.location,
  }));

  if (loading) {
    return <div className="text-gray-300 text-lg">Loading system data...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Faults Section */}
      <div className="lg:col-span-2">
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">System Faults</h2>
          <FaultSection faults={faults} />
        </section>
      </div>

      {/* Recovery Actions Section */}
      <div className="lg:col-span-1">
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Recovery Actions</h2>
          <div className="space-y-4">
            {recoveryActions.map((action) => (
              <RecoveryAction key={action.id} action={action} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
