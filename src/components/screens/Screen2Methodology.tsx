import React, { useState } from 'react';
import { Filter, Database, Cpu, CheckCircle2, Search, ArrowRight, Layers, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { PresentationScreen } from '../../data/reportData';

interface Screen2Props {
  screen: PresentationScreen;
  onOpenNotes: () => void;
}

export const Screen2Methodology: React.FC<Screen2Props> = ({ screen, onOpenNotes }) => {
  const [activePhase, setActivePhase] = useState<number>(1);

  const phases = [
    {
      id: 1,
      num: 'Fase I',
      title: 'Definición y Ecuaciones',
      summary: 'Pregunta de investigación, tesauros UNESCO y ecuaciones booleanas',
      tools: ['Tesauro UNESCO / IEEE', 'Operadores AND / OR', 'Prompting estructurado IA'],
      details:
        'Delimitación del tema en IA aplicada a turismo cultural y comunitario. Búsqueda con descriptores en inglés y español: "smart tourism", "generative AI", "intangible cultural heritage", "recommender systems".',
      badge: 'Conceptos y Sintaxis',
    },
    {
      id: 2,
      num: 'Fase II',
      title: 'Búsqueda Multifuente',
      summary: 'Recuperación en 3 bases científicas y 2 de patentes',
      tools: ['Scopus (1.142)', 'Dimensions (373)', 'Google Scholar (14)', 'Lens (136 fam.)', 'PATENTSCOPE (WIPO)'],
      details:
        'Ejecución estandarizada de ecuaciones. Se diferenciaron fuentes de recuperación efectiva (Scopus, Dimensions, Scholar) de complementarias de contraste (Crossref, Semantic Scholar, OpenAlex, SIC Colombia).',
      badge: '1.529 Registros',
    },
    {
      id: 3,
      num: 'Fase III',
      title: 'Depuración y Cienciometría',
      summary: 'Selección estricta, Tree of Science y VOSviewer',
      tools: ['VOSviewer (Coocurrencia)', 'Tree of Science (ToS)', 'Matriz Excel VT', 'Lens Analytics'],
      details:
        'Cribado exhaustivo: del universo de 1.529 documentos se seleccionaron 50 artículos de pertinencia directa y 20 soluciones patentadas en Lens/PATENTSCOPE, clasificando en raíces, tronco y hojas.',
      badge: 'Filtro a 50 Artículos + 20 Patentes',
    },
    {
      id: 4,
      num: 'Fase IV',
      title: 'Integración y Transferencia',
      summary: 'Traducción cienciométrica a arquitectura y TRL',
      tools: ['Evaluación TRL 1-9', 'Matriz de Inversión', 'Ruta Tecnológica', 'Informe GFPI-F-153 V03'],
      details:
        'Articulación de los hallazgos hacia el software AFRONEXIA: adopción de arquitectura RAG, pgvector y diseño de los 9 módulos de interacción comunitaria en Barrancabermeja.',
      badge: 'Transferencia a Prototipo',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between max-w-[1780px] mx-auto p-4 lg:p-8 space-y-6">
      {/* Screen Title & Header */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
          <span>Pantalla 02</span>
          <span className="text-slate-600">·</span>
          <span>Metodología de Vigilancia Tecnológica</span>
          <span className="text-slate-600">·</span>
          <span className="text-cyan-400">Duración: 1:30 min</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-5xl">
          {screen.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-4xl font-light">
          {screen.subtitle}
        </p>
      </div>

      {/* Main Grid: 4-Phase Interactive Flow & Methodology Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
        {/* Left: 4-Phase Horizontal Stepper with Interactive Detail (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4 bg-slate-900/60 p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Diagrama Metodológico en Cuatro Fases (UNE 166006)
            </span>
            <span className="text-xs text-slate-400 font-mono">Haz clic en cada fase para explorar</span>
          </div>

          {/* 4 Phases Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {phases.map((p) => {
              const isSelected = activePhase === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePhase(p.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400/40'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`}>
                      {p.num}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-cyan-500/20 text-cyan-200' : 'bg-slate-800 text-slate-400'}`}>
                      {p.id}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight mb-1">{p.title}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{p.summary}</div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Deep Dive Card */}
          {(() => {
            const current = phases.find((p) => p.id === activePhase)!;
            return (
              <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-cyan-900/50 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {current.num}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">{current.title}</h3>
                  </div>
                  <span className="text-xs font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                    {current.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {current.details}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block mb-1.5">
                    Herramientas y fuentes documentadas en esta fase:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {current.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 text-cyan-300 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Complementary Message 1 & 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="font-bold text-amber-300 block mb-0.5">Diferenciación de fuentes:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Fuentes primarias de recuperación efectiva: Scopus, Dimensions, Google Scholar, Lens y PATENTSCOPE. Fuentes secundarias de contraste: Crossref, OpenAlex y SIC.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-0.5">Trazabilidad cienciométrica:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Cada registro cuenta con bitácora en Excel, metadatos normalizados, ecuación empleada y concordancia temática verificada con el boletín.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Funnel of Technology Vigilance (Figura 2) & Inclusion/Exclusion Criteria (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-slate-900/40 p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Filter className="w-4 h-4" />
              Embudo Metodológico (Figura 2 del Informe)
            </span>
            <span className="text-[11px] font-mono text-slate-400">De lo General a lo Particular</span>
          </div>

          {/* Visual Step-Down Funnel */}
          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-center">
              <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">Nivel Macro</span>
              <p className="text-xs font-semibold text-white">IA · Turismo Cultural · Turismo Comunitario · Patrimonio Afro</p>
            </div>

            <div className="mx-4 p-2.5 rounded-lg bg-blue-950/60 border border-blue-800/60 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Nivel Micro</span>
              <p className="text-xs font-semibold text-white">Sistemas de Recomendación · Chatbots · RAG · GIS · Patrimonio Inmaterial</p>
            </div>

            <div className="mx-8 p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-800/60 text-center">
              <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Ecuaciones y Fuentes</span>
              <p className="text-xs font-semibold text-white">Scopus (1.142) + Dimensions (373) + Scholar (14) + Lens (136 fam.)</p>
            </div>

            <div className="mx-12 p-2.5 rounded-lg bg-amber-950/70 border border-amber-800/70 text-center shadow-lg shadow-amber-950/50">
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Depuración Focalizada</span>
              <p className="text-xs font-bold text-white">50 Publicaciones Científicas Seleccionadas (3,3%) + 20 Patentes</p>
            </div>

            <div className="mx-16 p-2 rounded-lg bg-emerald-950/80 border border-emerald-600/70 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Transferencia a Barrancabermeja</span>
              <p className="text-[11px] font-bold text-emerald-100">Prototipo AFRONEXIA (TRL 4 Validado)</p>
            </div>
          </div>

          {/* Criteria Badges */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Criterios de Inclusión y Pertinencia:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Periodo 2021 – 2026</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Enfoque en turismo comunitario</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Patrimonio cultural inmaterial</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Transferibilidad hacia software</span>
              </div>
            </div>
          </div>

          {/* Central Message Box */}
          <div className="p-3 rounded-xl bg-slate-950 border border-cyan-800/50 flex items-center justify-between text-xs">
            <p className="text-cyan-200 font-medium italic">
              "{screen.centralMessage}"
            </p>
            <button
              onClick={onOpenNotes}
              className="text-amber-300 hover:text-amber-200 underline font-semibold ml-2 shrink-0"
            >
              Guion (1:30)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
