
import React from 'react';
import { Cpu, HardDrive, Wifi, Activity, Gauge, Radar } from 'lucide-react';

interface MetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'optimal' | 'caution' | 'critical';
  percentage?: number;
}

const Metric = ({ icon, label, value, status, percentage }: MetricProps) => {
  const statusConfig = {
    optimal: { 
      color: 'text-green-400 border-green-400/30 bg-green-900/20',
      barColor: 'bg-green-400'
    },
    caution: { 
      color: 'text-yellow-400 border-yellow-400/30 bg-yellow-900/20',
      barColor: 'bg-yellow-400'
    },
    critical: { 
      color: 'text-red-400 border-red-400/30 bg-red-900/20',
      barColor: 'bg-red-400'
    }
  };

  return (
    <div className={`border ${statusConfig[status].color} rounded-lg p-4 backdrop-blur-sm relative overflow-hidden`}>
      {/* Efeito de linha de varredura */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent animate-pulse"></div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={statusConfig[status].color}>{icon}</div>
          <div>
            <span className="text-green-300/80 text-xs font-bold tracking-wider uppercase">
              {label}
            </span>
          </div>
        </div>
        <div className={`w-2 h-2 ${statusConfig[status].barColor} rounded-full animate-ping`}></div>
      </div>
      
      <div className="mb-2">
        <div className={`text-lg font-bold ${statusConfig[status].color} font-mono tracking-wider`}>
          {value}
        </div>
      </div>

      {/* Barra de progresso se a porcentagem for fornecida */}
      {percentage && (
        <div className="w-full bg-gray-800/50 rounded-full h-1">
          <div 
            className={`h-1 rounded-full ${statusConfig[status].barColor} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

const SystemMetrics = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Metric
        icon={<Cpu size={20} />}
        label="Núcleo CPU"
        value="23%"
        status="optimal"
        percentage={23}
      />
      <Metric
        icon={<Activity size={20} />}
        label="Banco Memória"
        value="4.2/16 GB"
        status="optimal"
        percentage={26}
      />
      <Metric
        icon={<HardDrive size={20} />}
        label="Array Armazen."
        value="342/500 GB"
        status="caution"
        percentage={68}
      />
      <Metric
        icon={<Wifi size={20} />}
        label="Link Rede"
        value="SEGURO"
        status="optimal"
      />
    </div>
  );
};

export default SystemMetrics;
