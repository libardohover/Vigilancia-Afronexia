import React, { useState } from 'react';
import { Target, CheckCircle2, AlertOctagon, TrendingUp, Layers, ChevronRight, Sparkles, Shield, Cpu } from 'lucide-react';
import { PresentationScreen, TRL_DATA, ORGANIZATIONAL_GAPS } from '../../data/reportData';

interface Screen6Props {
  screen: PresentationScreen;
  onOpenNotes: () => void;
}

export const Screen6TechMatrixTRL: React.FC<Screen6Props> = ({ screen, onOpenNotes }) => {
  const [selectedTRL, setSelectedTRL] = useState<number>(4);

  const immediateTechs = [
    { name: 'NEXIA + Arquitectura RAG', desc: 'Recuperación sobre pgvector y PostgreSQL 16 para evitar alucinaciones', impact: 'Inmediata' },
    { name: 'Recomendación Contextual', desc: 'Afinidad cultural según tiempo, perfiles de visitantes y ubicación', impact: 'Inmediata' },
    { name: 'GIS & Rutas Inteligentes', desc: 'Georreferenciación de sitios ancestrales y circuitos por el río', impact: 'Inmediata' },
    { name: 'Analítica de Uso y Demanda', desc: 'Métricas de consulta para la toma de decisiones comunitarias', impact: 'Inmediata' },
  ];

  const futureTechs = [
    { name: 'Realidad Extendida (XR)', desc: 'Recreaciones inmersivas de espacios sagrados y tambores', horizon: 'Horizonte 2 (Mediano plazo)' },
    { name: 'Internet de las Cosas (IoT)', desc: 'Sensores de afluencia en eventos y festividades culturales', horizon: 'Horizonte 2 (Mediano plazo)' },
    { name: 'Blockchain / Tokenización', desc: 'Trazabilidad y derechos digitales de saberes ancestrales', horizon: 'Horizonte 3 (Largo plazo)' },
    { name: 'Aprendizaje Federado', desc: 'Modelos colaborativos descentralizados entre territorios', horizon: 'Horizonte 3 (Largo plazo)' },
  ];

  return (
    <div className="h-full flex flex-col justify-between max-w-[1780px] mx-auto p-4 lg:p-8 space-y-5">
      {/* Screen Title & Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
          <span>Pantalla 06</span>
          <span className="text-slate-600">·</span>
          <span>Priorización Tecnológica y Madurez TRL</span>
          <span className="text-slate-600">·</span>
          <span className="text-cyan-400">Duración: 2:00 min</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-5xl">
          {screen.title}
        </h1>
        <p className="text-sm text-slate-300 max-w-4xl font-light">
          {screen.subtitle}
        </p>
      </div>

      {/* Main Grid: Tech Prioritization Matrix (Left) & TRL + Org Gaps (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
        {/* Left Column: Tech Prioritization Matrix (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Matriz de Priorización Tecnológica para AFRONEXIA
            </span>
            <span className="text-xs text-slate-400 font-mono">Conclusiones del Boletín</span>
          </div>

          {/* Group 1: Immediate / Strengthening Technologies */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Aplicación Inmediata y Fortalecimiento Núcleo
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                Fase Actual
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {immediateTechs.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-emerald-900/40 space-y-1">
                  <div className="font-bold text-xs text-white leading-tight">{item.name}</div>
                  <p className="text-[11px] text-slate-300 leading-tight font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Subsequent Horizons */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Horizontes Posteriores (Dependencia de Adopción e Infraestructura)
              </span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                Fases Futuras
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {futureTechs.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="font-semibold text-xs text-slate-300 leading-tight">{item.name}</div>
                  <p className="text-[10px] text-slate-400 leading-tight font-light">{item.desc}</p>
                  <span className="text-[9px] font-mono text-indigo-400">{item.horizon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: TRL Scale (1 to 9) & Organizational Prioritization (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800 shadow-xl">
          {/* TRL Horizontal Stepper Scale 1-9 (Tabla 1 del informe) */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Tabla 1. Madurez Tecnológica TRL del Prototipo AFRONEXIA
                </span>
              </div>
              <span className="text-xs font-mono text-cyan-300 font-bold">Salto: TRL 3 → TRL 4</span>
            </div>

            {/* Stepper TRL 1 to 9 */}
            <div className="grid grid-cols-9 gap-1 text-center">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => {
                const isBefore = lvl === 3;
                const isCurrent = lvl === 4;
                const isTarget = lvl === 5;
                const isSelected = selectedTRL === lvl;

                let bgClass = 'bg-slate-900 border-slate-800 text-slate-500';
                if (isBefore) bgClass = 'bg-slate-800 border-slate-600 text-slate-200';
                if (isCurrent) bgClass = 'bg-cyan-500 border-cyan-400 text-slate-950 font-extrabold shadow-md shadow-cyan-500/30';
                if (isTarget) bgClass = 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-bold';

                return (
                  <button
                    key={lvl}
                    onClick={() => setSelectedTRL(lvl)}
                    className={`py-2 rounded-lg border text-xs font-mono transition-all ${bgClass} ${
                      isSelected ? 'ring-2 ring-white/60 scale-105' : ''
                    }`}
                  >
                    <span>T{lvl}</span>
                  </button>
                );
              })}
            </div>

            {/* TRL Detail Callout */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-300 font-mono">
                  {selectedTRL === 3
                    ? TRL_DATA.beforeVT.title
                    : selectedTRL === 4
                    ? TRL_DATA.afterVT.title
                    : selectedTRL === 5
                    ? TRL_DATA.nextMilestone.title
                    : `Nivel TRL ${selectedTRL}`}
                </span>
                <span className="text-[10px] text-slate-400">
                  {selectedTRL === 3
                    ? 'Estado Inicial (Antes VT)'
                    : selectedTRL === 4
                    ? 'Estado Actual (Consolidado)'
                    : selectedTRL === 5
                    ? 'Siguiente Meta de Campo'
                    : 'Escala NASA/SENA'}
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {selectedTRL === 3
                  ? TRL_DATA.beforeVT.evidence
                  : selectedTRL === 4
                  ? TRL_DATA.afterVT.evidence
                  : selectedTRL === 5
                  ? TRL_DATA.nextMilestone.evidence
                  : 'Fase de la escala de madurez tecnológica estándar para sistemas de software.'}
              </p>
            </div>
          </div>

          {/* Organizational Gaps (págs 6-7 del informe: 89/100, 70.5, 66.8) */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertOctagon className="w-4 h-4 text-amber-400" />
                Prioridades Organizacionales (Madurez vs. Aporte Estratégico)
              </span>
              <span className="text-[10px] text-slate-400">Págs. 6–7</span>
            </div>

            <div className="space-y-2 text-xs">
              {ORGANIZATIONAL_GAPS.slice(0, 3).map((gap, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200 font-medium">{gap.area}</span>
                    <span className="font-mono font-bold text-amber-400">
                      Prioridad {gap.priorityScore}/100 (Nivel {gap.currentLevel})
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                      style={{ width: `${gap.priorityScore}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-900/60 text-[11px] text-emerald-200 flex items-center justify-between">
                <span>Desarrollo de Software y Arquitectura:</span>
                <span className="font-bold font-mono">Nivel 4 (Fortaleza del proyecto)</span>
              </div>
            </div>
          </div>

          {/* Central Message Box (Obligation) */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-800/50 flex items-center justify-between gap-3 text-xs">
            <p className="text-amber-200 font-medium italic">
              "{screen.centralMessage}"
            </p>
            <button
              onClick={onOpenNotes}
              className="text-cyan-300 hover:text-cyan-200 underline font-semibold ml-2 shrink-0"
            >
              Guion (2:00)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
