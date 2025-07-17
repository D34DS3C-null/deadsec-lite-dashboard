
import React from 'react';
import { Cpu, HardDrive, Wifi, Activity } from 'lucide-react';

interface MetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
}

const Metric = ({ icon, label, value, status }: MetricProps) => {
  const statusColors = {
    good: 'text-green-400 border-green-400/30',
    warning: 'text-yellow-400 border-yellow-400/30',
    critical: 'text-red-400 border-red-400/30'
  };

  return (
    <div className={`bg-gray-900/50 border ${statusColors[status]} rounded-lg p-4 backdrop-blur-sm`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={statusColors[status]}>{icon}</div>
        <span className="text-gray-300 text-sm font-mono uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-mono font-bold text-white">{value}</div>
    </div>
  );
};

const SystemMetrics = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Metric
        icon={<Cpu size={20} />}
        label="CPU Usage"
        value="23%"
        status="good"
      />
      <Metric
        icon={<Activity size={20} />}
        label="Memory"
        value="4.2/16 GB"
        status="good"
      />
      <Metric
        icon={<HardDrive size={20} />}
        label="Disk Space"
        value="342/500 GB"
        status="warning"
      />
      <Metric
        icon={<Wifi size={20} />}
        label="Network"
        value="Connected"
        status="good"
      />
    </div>
  );
};

export default SystemMetrics;
