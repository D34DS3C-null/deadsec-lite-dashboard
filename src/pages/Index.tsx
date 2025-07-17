
import React, { useState, useEffect } from 'react';
import { Shield, Radar, Satellite, Target, AlertTriangle, Activity, Eye, Lock } from 'lucide-react';
import SystemMetrics from '@/components/SystemMetrics';
import DiagnosticModule from '@/components/DiagnosticModule';
import ReportViewer from '@/components/ReportViewer';
import AlertSystem from '@/components/AlertSystem';
import MilitaryHeader from '@/components/MilitaryHeader';
import OperationalStatus from '@/components/OperationalStatus';
import ThreatLevel from '@/components/ThreatLevel';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index = () => {
  const [moduleStatuses, setModuleStatuses] = useState({
    performance: 'idle' as const,
    security: 'completed' as const,
    network: 'warning' as const
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const startDiagnostic = (module: keyof typeof moduleStatuses) => {
    setModuleStatuses(prev => ({ ...prev, [module]: 'running' }));
    toast.info(`INITIATING ${module.toUpperCase()} SWEEP...`, {
      description: "Tactical analysis in progress. Stand by for mission results."
    });
    
    setTimeout(() => {
      setModuleStatuses(prev => ({ ...prev, [module]: 'completed' }));
      toast.success(`${module.toUpperCase()} MISSION COMPLETE`, {
        description: "Intelligence gathered. Check tactical reports for detailed intel."
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-green-400 font-mono overflow-hidden">
      {/* Military Grid Overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse" />
      </div>

      <MilitaryHeader currentTime={currentTime} />

      <main className="container mx-auto px-6 py-4 relative z-10">
        {/* Operational Status Bar */}
        <div className="mb-6">
          <OperationalStatus />
        </div>

        {/* Main Command Grid */}
        <div className="grid gap-6">
          {/* Situational Awareness */}
          <section className="border border-green-500/30 bg-black/40 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Radar className="text-green-400 animate-spin" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-green-400 tracking-wider">
                    [ SITUATIONAL AWARENESS ]
                  </h2>
                  <p className="text-green-300/70 text-sm">Real-time battlefield intelligence</p>
                </div>
              </div>
              <ThreatLevel />
            </div>
            <SystemMetrics />
          </section>

          {/* Mission Modules */}
          <section className="border border-amber-500/30 bg-amber-950/20 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-amber-400" size={24} />
              <div>
                <h2 className="text-xl font-bold text-amber-400 tracking-wider">
                  [ TACTICAL OPERATIONS ]
                </h2>
                <p className="text-amber-300/70 text-sm">Execute diagnostic missions</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <DiagnosticModule
                title="RECON SWEEP"
                description="Deep system reconnaissance and performance analysis"
                icon={<Eye size={24} />}
                status={moduleStatuses.performance}
                lastRun="15-JAN-24 14:30:00 ZULU"
                onStart={() => startDiagnostic('performance')}
                militaryType="recon"
              />
              <DiagnosticModule
                title="THREAT ASSESSMENT"
                description="Security vulnerability scan and threat detection"
                icon={<Shield size={24} />}
                status={moduleStatuses.security}
                lastRun="15-JAN-24 13:15:00 ZULU"
                onStart={() => startDiagnostic('security')}
                militaryType="security"
              />
              <DiagnosticModule
                title="COMMS CHECK"
                description="Network connectivity and communication systems test"
                icon={<Satellite size={24} />}
                status={moduleStatuses.network}
                lastRun="15-JAN-24 12:45:00 ZULU"
                onStart={() => startDiagnostic('network')}
                militaryType="comms"
              />
            </div>
          </section>

          {/* Intelligence Center */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border border-blue-500/30 bg-blue-950/20 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-blue-400" size={20} />
                <h3 className="text-lg font-bold text-blue-400 tracking-wider">
                  [ INTELLIGENCE CENTER ]
                </h3>
              </div>
              <ReportViewer />
            </div>
            <div className="border border-red-500/30 bg-red-950/20 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-400" size={20} />
                <h3 className="text-lg font-bold text-red-400 tracking-wider">
                  [ THREAT BOARD ]
                </h3>
              </div>
              <AlertSystem />
            </div>
          </div>
        </div>
      </main>

      {/* Command Footer */}
      <footer className="border-t border-green-500/30 bg-black/60 backdrop-blur-sm mt-8">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-green-400/80">
            <div className="flex items-center gap-4">
              <Lock size={16} />
              <span>CLASSIFIED // DEADSEC TACTICAL SUITE v2.0</span>
            </div>
            <div className="flex items-center gap-4">
              <span>STATUS: OPERATIONAL</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
