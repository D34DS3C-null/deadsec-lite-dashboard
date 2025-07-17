
import React, { useState } from 'react';
import { Shield, Zap, Wifi, Terminal, Settings, History } from 'lucide-react';
import SystemMetrics from '@/components/SystemMetrics';
import DiagnosticModule from '@/components/DiagnosticModule';
import ReportViewer from '@/components/ReportViewer';
import AlertSystem from '@/components/AlertSystem';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index = () => {
  const [moduleStatuses, setModuleStatuses] = useState({
    performance: 'idle' as const,
    security: 'completed' as const,
    network: 'warning' as const
  });

  const startDiagnostic = (module: keyof typeof moduleStatuses) => {
    setModuleStatuses(prev => ({ ...prev, [module]: 'running' }));
    toast.info(`Starting ${module} diagnostic...`, {
      description: "This may take a few minutes to complete."
    });
    
    // Simulate diagnostic completion
    setTimeout(() => {
      setModuleStatuses(prev => ({ ...prev, [module]: 'completed' }));
      toast.success(`${module} diagnostic completed!`, {
        description: "Check the reports section for detailed results."
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal className="text-cyan-400" size={28} />
              <div>
                <h1 className="text-2xl font-bold font-mono text-white">DeadSec Diagnostics</h1>
                <p className="text-sm text-gray-400 font-mono">B2C System Analysis Suite</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white">
                <History size={16} className="mr-2" />
                History
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:text-white">
                <Settings size={16} className="mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-8">
          {/* System Overview */}
          <section>
            <h2 className="text-xl font-semibold text-white font-mono mb-6 flex items-center gap-2">
              <Zap className="text-cyan-400" size={20} />
              System Overview
            </h2>
            <SystemMetrics />
          </section>

          {/* Diagnostic Modules */}
          <section>
            <h2 className="text-xl font-semibold text-white font-mono mb-6 flex items-center gap-2">
              <Shield className="text-cyan-400" size={20} />
              Diagnostic Modules
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DiagnosticModule
                title="Performance Analysis"
                description="Analyze CPU, memory, and disk performance"
                icon={<Zap size={24} />}
                status={moduleStatuses.performance}
                lastRun="2024-01-15 14:30"
                onStart={() => startDiagnostic('performance')}
              />
              <DiagnosticModule
                title="Security Scan"
                description="Check for vulnerabilities and security issues"
                icon={<Shield size={24} />}
                status={moduleStatuses.security}
                lastRun="2024-01-15 13:15"
                onStart={() => startDiagnostic('security')}
              />
              <DiagnosticModule
                title="Network Diagnostics"
                description="Test connectivity and network performance"
                icon={<Wifi size={24} />}
                status={moduleStatuses.network}
                lastRun="2024-01-15 12:45"
                onStart={() => startDiagnostic('network')}
              />
            </div>
          </section>

          {/* Reports and Alerts */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ReportViewer />
            </div>
            <div>
              <AlertSystem />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900/50 mt-16">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-400 font-mono">
            <span>DeadSec Diagnostics Suite v1.0.0</span>
            <span>System Status: Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
