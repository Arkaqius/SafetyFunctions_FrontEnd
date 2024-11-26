interface Fault {
  type: string;
  location: string;
  severity: string;
  priority: number;
  timestamp: string;
}

export function getHighestPriorityFault(faults: Fault[]): Fault | null {
  if (!faults.length) return null;
  return faults.reduce((prev, current) => 
    prev.priority < current.priority ? prev : current
  );
}

export function groupFaultsBySeverity(faults: Fault[]): Record<string, Fault[]> {
  return faults.reduce((groups, fault) => {
    const severity = fault.severity;
    if (!groups[severity]) {
      groups[severity] = [];
    }
    groups[severity].push(fault);
    return groups;
  }, {} as Record<string, Fault[]>);
}