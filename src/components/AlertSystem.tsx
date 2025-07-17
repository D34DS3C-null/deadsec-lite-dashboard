
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  timestamp: string;
  dismissible?: boolean;
}

const mockAlerts: SystemAlert[] = [
  {
    id: '1',
    type: 'warning',
    message: 'Disk space running low on C: drive (68% used)',
    timestamp: '14:32',
    dismissible: true
  },
  {
    id: '2',
    type: 'info',
    message: 'System diagnostic completed successfully',
    timestamp: '14:30',
    dismissible: true
  },
  {
    id: '3',
    type: 'error',
    message: 'Failed to connect to security update server',
    timestamp: '14:25',
    dismissible: true
  }
];

const AlertSystem = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle size={16} />;
      case 'info': return <Info size={16} />;
      case 'success': return <CheckCircle size={16} />;
      case 'error': return <AlertTriangle size={16} />;
      default: return <Info size={16} />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-yellow-400/30 bg-yellow-900/10 text-yellow-400';
      case 'info': return 'border-blue-400/30 bg-blue-900/10 text-blue-400';
      case 'success': return 'border-green-400/30 bg-green-900/10 text-green-400';
      case 'error': return 'border-red-400/30 bg-red-900/10 text-red-400';
      default: return 'border-gray-400/30 bg-gray-900/10 text-gray-400';
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white font-mono flex items-center gap-2 mb-4">
        <AlertTriangle size={20} />
        System Alerts
      </h3>
      {mockAlerts.map((alert) => (
        <Alert key={alert.id} className={`${getAlertColor(alert.type)} border`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {getAlertIcon(alert.type)}
              <div>
                <AlertDescription className="text-white font-mono text-sm">
                  {alert.message}
                </AlertDescription>
                <span className="text-xs text-gray-500 font-mono">{alert.timestamp}</span>
              </div>
            </div>
            {alert.dismissible && (
              <button className="text-gray-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            )}
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default AlertSystem;
