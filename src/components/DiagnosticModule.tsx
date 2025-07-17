
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Clock, CheckCircle, AlertTriangle, Target } from 'lucide-react';

interface DiagnosticModuleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'idle' | 'running' | 'completed' | 'warning';
  lastRun?: string;
  onStart: () => void;
  militaryType: 'recon' | 'security' | 'comms';
}

const DiagnosticModule = ({ title, description, icon, status, lastRun, onStart, militaryType }: DiagnosticModuleProps) => {
  const typeConfig = {
    recon: { 
      primary: 'border-blue-400/30 bg-blue-950/20',
      accent: 'text-blue-400',
      button: 'bg-blue-600 hover:bg-blue-700 border-blue-500'
    },
    security: { 
      primary: 'border-red-400/30 bg-red-950/20',
      accent: 'text-red-400',
      button: 'bg-red-600 hover:bg-red-700 border-red-500'
    },
    comms: { 
      primary: 'border-green-400/30 bg-green-950/20',
      accent: 'text-green-400',
      button: 'bg-green-600 hover:bg-green-700 border-green-500'
    }
  };

  const statusConfig = {
    idle: { color: 'text-gray-400', status: 'STANDBY' },
    running: { color: 'text-yellow-400', status: 'ACTIVE' },
    completed: { color: 'text-green-400', status: 'COMPLETE' },
    warning: { color: 'text-orange-400', status: 'ALERT' }
  };

  const StatusIcon = () => {
    switch (status) {
      case 'running': return <Clock size={16} className="animate-spin" />;
      case 'completed': return <CheckCircle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      default: return <Target size={16} />;
    }
  };

  return (
    <div className={`${typeConfig[militaryType].primary} border rounded-lg p-6 transition-all hover:border-opacity-60 relative overflow-hidden backdrop-blur-sm`}>
      {/* Mission Classification Strip */}
      <div className={`absolute top-0 left-0 w-full h-1 ${typeConfig[militaryType].accent.replace('text-', 'bg-')} opacity-50`}></div>
      
      {/* Scan line effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent animate-pulse opacity-30"></div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`${typeConfig[militaryType].accent} animate-pulse`}>{icon}</div>
          <div>
            <h3 className={`text-lg font-bold ${typeConfig[militaryType].accent} font-mono tracking-wider`}>
              {title}
            </h3>
            <p className="text-gray-300/80 text-sm">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusIcon />
          <span className={`text-xs ${statusConfig[status].color} font-mono font-bold tracking-wider`}>
            {statusConfig[status].status}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        {lastRun && (
          <div className="text-xs text-gray-400 font-mono">
            <span className="text-gray-500">LAST EXEC:</span>
            <br />
            <span>{lastRun}</span>
          </div>
        )}
        <Button 
          onClick={onStart}
          disabled={status === 'running'}
          className={`${typeConfig[militaryType].button} text-white font-mono font-bold tracking-wider border transition-all`}
          size="sm"
        >
          <Play size={14} className="mr-2" />
          {status === 'running' ? 'EXECUTING...' : 'LAUNCH'}
        </Button>
      </div>

      {/* Mission Progress Indicator */}
      {status === 'running' && (
        <div className="mt-4 w-full bg-gray-800/50 rounded-full h-1">
          <div className={`h-1 rounded-full ${typeConfig[militaryType].accent.replace('text-', 'bg-')} animate-pulse`} style={{ width: '60%' }}></div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticModule;
