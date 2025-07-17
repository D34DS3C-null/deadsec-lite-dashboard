
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
    toast.info(`INICIANDO VARREDURA ${module.toUpperCase()}...`, {
      description: "Análise tática em progresso. Aguarde os resultados da missão."
    });
    
    setTimeout(() => {
      setModuleStatuses(prev => ({ ...prev, [module]: 'completed' }));
      toast.success(`MISSÃO ${module.toUpperCase()} CONCLUÍDA`, {
        description: "Inteligência coletada. Verifique os relatórios táticos para intel detalhado."
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-green-400 font-mono overflow-hidden">
      {/* Grade Militar de Fundo */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Efeito de Linhas de Varredura */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse" />
      </div>

      <MilitaryHeader currentTime={currentTime} />

      <main className="container mx-auto px-6 py-4 relative z-10">
        {/* Barra de Status Operacional */}
        <div className="mb-6">
          <OperationalStatus />
        </div>

        {/* Grade Principal de Comando */}
        <div className="grid gap-6">
          {/* Consciência Situacional */}
          <section className="border border-green-500/30 bg-black/40 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Radar className="text-green-400 animate-spin" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-green-400 tracking-wider">
                    [ CONSCIÊNCIA SITUACIONAL ]
                  </h2>
                  <p className="text-green-300/70 text-sm">Inteligência do campo de batalha em tempo real</p>
                </div>
              </div>
              <ThreatLevel />
            </div>
            <SystemMetrics />
          </section>

          {/* Módulos de Missão */}
          <section className="border border-amber-500/30 bg-amber-950/20 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-amber-400" size={24} />
              <div>
                <h2 className="text-xl font-bold text-amber-400 tracking-wider">
                  [ OPERAÇÕES TÁTICAS ]
                </h2>
                <p className="text-amber-300/70 text-sm">Executar missões de diagnóstico</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <DiagnosticModule
                title="VARREDURA RECON"
                description="Reconhecimento profundo do sistema e análise de performance"
                icon={<Eye size={24} />}
                status={moduleStatuses.performance}
                lastRun="15-JAN-24 14:30:00 ZULU"
                onStart={() => startDiagnostic('performance')}
                militaryType="recon"
              />
              <DiagnosticModule
                title="AVALIAÇÃO DE AMEAÇAS"
                description="Varredura de vulnerabilidades e detecção de ameaças de segurança"
                icon={<Shield size={24} />}
                status={moduleStatuses.security}
                lastRun="15-JAN-24 13:15:00 ZULU"
                onStart={() => startDiagnostic('security')}
                militaryType="security"
              />
              <DiagnosticModule
                title="VERIFICAÇÃO COMMS"
                description="Teste de conectividade de rede e sistemas de comunicação"
                icon={<Satellite size={24} />}
                status={moduleStatuses.network}
                lastRun="15-JAN-24 12:45:00 ZULU"
                onStart={() => startDiagnostic('network')}
                militaryType="comms"
              />
            </div>
          </section>

          {/* Centro de Inteligência */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border border-blue-500/30 bg-blue-950/20 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-blue-400" size={20} />
                <h3 className="text-lg font-bold text-blue-400 tracking-wider">
                  [ CENTRO DE INTELIGÊNCIA ]
                </h3>
              </div>
              <ReportViewer />
            </div>
            <div className="border border-red-500/30 bg-red-950/20 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-400" size={20} />
                <h3 className="text-lg font-bold text-red-400 tracking-wider">
                  [ PAINEL DE AMEAÇAS ]
                </h3>
              </div>
              <AlertSystem />
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé de Comando */}
      <footer className="border-t border-green-500/30 bg-black/60 backdrop-blur-sm mt-8">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-green-400/80">
            <div className="flex items-center gap-4">
              <Lock size={16} />
              <span>CLASSIFICADO // SUÍTE TÁTICA DEADSEC v2.0</span>
            </div>
            <div className="flex items-center gap-4">
              <span>STATUS: OPERACIONAL</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
