
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface DiagnosticModuleProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'idle' | 'running' | 'completed' | 'warning';
  lastRun?: string;
  onStart: () => void;
}

const DiagnosticModule = ({ title, description, icon, status, lastRun, onStart }: DiagnosticModuleProps) => {
  const statusConfig = {
    idle: { color: 'text-gray-400', bg: 'bg-gray-800/50' },
    running: { color: 'text-blue-400', bg: 'bg-blue-900/20' },
    completed: { color: 'text-green-400', bg: 'bg-green-900/20' },
    warning: { color: 'text-yellow-400', bg: 'bg-yellow-900/20' }
  };

  const StatusIcon = () => {
    switch (status) {
      case 'running': return <Clock size={16} className="animate-spin" />;
      case 'completed': return <CheckCircle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      default: return null;
    }
  };

  return (
    <div className={`${statusConfig[status].bg} border border-gray-700 rounded-lg p-6 transition-all hover:border-gray-600`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={statusConfig[status].color}>{icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-white font-mono">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusIcon />
          <span className={`text-xs ${statusConfig[status].color} font-mono`}>
            {status.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        {lastRun && (
          <span className="text-xs text-gray-500 font-mono">
            Last run: {lastRun}
          </span>
        )}
        <Button 
          onClick={onStart}
          disabled={status === 'running'}
          className="bg-cyan-600 hover:bg-cyan-700 text-white border-0 font-mono"
          size="sm"
        >
          <Play size={14} className="mr-2" />
          {status === 'running' ? 'Running...' : 'Start'}
        </Button>
      </div>
    </div>
  );
};

export default DiagnosticModule;
