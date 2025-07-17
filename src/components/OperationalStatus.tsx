
import React from 'react';
import { Shield, Wifi, Zap, HardDrive, AlertTriangle } from 'lucide-react';

const OperationalStatus = () => {
  const systems = [
    { name: 'DEFENSE GRID', status: 'ACTIVE', icon: Shield, color: 'text-green-400' },
    { name: 'COMMS ARRAY', status: 'NOMINAL', icon: Wifi, color: 'text-blue-400' },
    { name: 'POWER CORE', status: 'OPTIMAL', icon: Zap, color: 'text-green-400' },
    { name: 'DATA VAULT', status: 'SECURE', icon: HardDrive, color: 'text-cyan-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {systems.map((system, index) => {
        const Icon = system.icon;
        return (
          <div 
            key={system.name}
            className="border border-green-500/30 bg-black/40 backdrop-blur-sm rounded-lg p-4 relative overflow-hidden"
          >
            {/* System Status Indicator */}
            <div className="flex items-center justify-between mb-3">
              <Icon className={`${system.color} animate-pulse`} size={20} />
              <div className={`w-2 h-2 ${system.color.replace('text-', 'bg-')} rounded-full animate-ping`}></div>
            </div>
            
            <div>
              <div className="text-xs text-green-300/60 font-bold tracking-wider mb-1">
                {system.name}
              </div>
              <div className={`text-sm font-bold ${system.color} tracking-wider`}>
                {system.status}
              </div>
            </div>

            {/* Subtle scan line effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent animate-pulse"></div>
          </div>
        );
      })}
    </div>
  );
};

export default OperationalStatus;
