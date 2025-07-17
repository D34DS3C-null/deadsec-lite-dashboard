
import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';

const ThreatLevel = () => {
  const threatLevel = 'DEFCON 3'; // Could be dynamic
  const threatColor = 'text-yellow-400'; // Green, Yellow, Orange, Red based on level
  const bgColor = 'bg-yellow-900/30';

  return (
    <div className={`border border-yellow-500/50 ${bgColor} backdrop-blur-sm rounded-lg p-4 min-w-[200px]`}>
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle className={threatColor} size={20} />
        <span className="text-xs text-yellow-300/80 font-bold tracking-wider">
          THREAT ASSESSMENT
        </span>
      </div>
      
      <div className={`text-lg font-bold ${threatColor} tracking-wider mb-1`}>
        {threatLevel}
      </div>
      
      <div className="text-xs text-yellow-300/60">
        ELEVATED AWARENESS
      </div>

      {/* Threat Level Bars */}
      <div className="flex gap-1 mt-3">
        {[1, 2, 3, 4, 5].map((level) => (
          <div 
            key={level}
            className={`h-1 w-6 rounded-full ${
              level <= 3 
                ? 'bg-yellow-400 animate-pulse' 
                : 'bg-yellow-900/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThreatLevel;
