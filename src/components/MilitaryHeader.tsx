
import React from 'react';
import { Terminal, Settings, History, Radio, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MilitaryHeaderProps {
  currentTime: Date;
}

const MilitaryHeader = ({ currentTime }: MilitaryHeaderProps) => {
  const formatMilitaryTime = (date: Date) => {
    return date.toISOString().replace('T', ' ').substring(0, 19) + ' ZULU';
  };

  const formatLocalTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <header className="border-b border-green-500/30 bg-black/80 backdrop-blur-sm relative overflow-hidden">
      {/* Banner de Classificação */}
      <div className="bg-red-600 text-white text-center py-1 text-xs font-bold tracking-wider">
        CLASSIFICADO // APENAS PARA USO OFICIAL
      </div>
      
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Identidade do Comando */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Terminal className="text-green-400" size={32} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-400 tracking-wider">
                DEADSEC TÁTICO
              </h1>
              <div className="flex items-center gap-4 text-sm text-green-300/80">
                <span>SUÍTE DIAGNÓSTICA B2C</span>
                <span>•</span>
                <span>NÍVEL DE ACESSO: ALPHA</span>
              </div>
            </div>
          </div>

          {/* Relógio da Missão e Controles */}
          <div className="flex items-center gap-6">
            {/* Display de Tempo */}
            <div className="text-right">
              <div className="flex items-center gap-2 text-green-400 font-bold">
                <Clock size={16} />
                <span>{formatLocalTime(currentTime)}</span>
              </div>
              <div className="text-xs text-green-300/60">
                {formatMilitaryTime(currentTime)}
              </div>
            </div>

            {/* Controles da Missão */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-green-500/50 text-green-400 hover:bg-green-500/20 hover:text-green-300 bg-transparent"
              >
                <Radio size={16} className="mr-2" />
                COMMS
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-green-500/50 text-green-400 hover:bg-green-500/20 hover:text-green-300 bg-transparent"
              >
                <History size={16} className="mr-2" />
                LOG
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-green-500/50 text-green-400 hover:bg-green-500/20 hover:text-green-300 bg-transparent"
              >
                <Settings size={16} className="mr-2" />
                CONFIG
              </Button>
            </div>
          </div>
        </div>

        {/* Barra de Status da Missão */}
        <div className="mt-4 pt-4 border-t border-green-500/20">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6 text-green-300/80">
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>SETOR: ALPHA-7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>CANAL SEGURO ATIVO</span>
              </div>
            </div>
            <div className="text-green-400/60">
              ID DA MISSÃO: DS-{currentTime.getTime().toString().slice(-6)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MilitaryHeader;
