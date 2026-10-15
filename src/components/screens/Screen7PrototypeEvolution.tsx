import React, { useState } from 'react';
import { Layers, ArrowRight, Sparkles, Eye, CheckCircle2, Bot, MapPin, Calendar, BookOpen, ShoppingBag, ShieldCheck, Play } from 'lucide-react';
import { PresentationScreen, PROTOTYPE_MODULES_TABLE9 } from '../../data/reportData';
import imgPrototipoInicial from '../../assets/images/afronexia_prototype_initial_1791905814401.jpg';
import imgPrototipoFinal from '../../assets/images/afronexia_prototype_final_1791905814803.jpg';

interface Screen7Props {
  screen: PresentationScreen;
  onOpenNotes: () => void;
  onOpenPrototypeModal: () => void;
}

export const Screen7PrototypeEvolution: React.FC<Screen7Props> = ({
  screen,
  onOpenNotes,
  onOpenPrototypeModal,
}) => {
  const [viewMode, setViewMode] = useState<'compare' | 'modules'>('compare');
  const [selectedModule, setSelectedModule] = useState(PROTOTYPE_MODULES_TABLE9[7]); // Default NEXIA

  const pipeline = [
    { label: 'Evidencia Científica', desc: '50 artículos + 20 patentes' },
    { label: 'Selección Tecnológica', desc: 'RAG, pgvector & GIS' },
    { label: 'Diseño de Arquitectura', desc: 'Cliente-servidor REST' },
    { label: 'Integración en Laboratorio', desc: 'PostgreSQL 16 + Embeddings' },
    { label: 'Prototipo Funcional', desc: 'TRL 4 (9 Módulos)' },
  ];

  return (
    <div className="h-full flex flex-col justify-between max-w-[1780px] mx-auto p-4 lg:p-8 space-y-5">
      {/* Screen Title & Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
          <span>Pantalla 07</span>
          <span className="text-slate-600">·</span>
          <span>Evolución de Ingeniería de Software</span>
          <span className="text-slate-600">·</span>
          <span className="text-cyan-400">Duración: 2:30 min</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            {screen.title}
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'compare' ? 'modules' : 'compare')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              {viewMode === 'compare' ? 'Ver 9 Módulos (Tabla 9)' : 'Ver Comparativa Antes/Después'}
            </button>
            <button
              onClick={onOpenPrototypeModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Ver Prototipo Funcional</span>
            </button>
          </div>
        </div>
        <p className="text-sm text-slate-300 max-w-4xl font-light">
          {screen.subtitle}
        </p>
      </div>

      {/* Engineering Pipeline Flow Ribbon (Scientific Evidence -> Prototype) */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 overflow-x-auto text-xs">
        {pipeline.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center text-center px-2 min-w-[130px]">
              <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase">Paso {idx + 1}</span>
              <span className="font-bold text-white leading-tight">{step.label}</span>
              <span className="text-[10px] text-slate-400">{step.desc}</span>
            </div>
            {idx < pipeline.length - 1 && (
              <ArrowRight className="w-4 h-4 text-cyan-500/60 shrink-0 hidden sm:block" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main Content Area */}
      {viewMode === 'compare' ? (
        /* Visual Before / After Comparison */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch flex-1">
          {/* ANTES (Figura 12 del Informe) */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between gap-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Figura 12. Diseño Inicial del Prototipo
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Antes de la VT (TRL 3)
                </span>
              </div>
              <span className="text-[11px] text-slate-500">2024</span>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-700/80 group flex-1 max-h-[280px]">
              <img
                src={imgPrototipoInicial}
                alt="Diseño Inicial del Prototipo AFRONEXIA (Figura 12)"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-slate-950/90 text-slate-300 text-[10px] font-mono px-2 py-1 rounded border border-slate-800">
                Captura: "El río también guarda memoria afro"
              </div>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
              <div className="font-bold text-slate-300">Limitaciones previas al estudio de VT:</div>
              <ul className="text-slate-400 space-y-1 text-[11px] list-disc list-inside">
                <li>Galería plana de contenidos sin búsqueda semántica ni inteligencia artificial.</li>
                <li>Ausencia de asistente virtual y sin recuperación contextual de información.</li>
                <li>Sin georreferenciación de rutas ni perfiles comerciales de emprendimientos afro.</li>
              </ul>
            </div>
          </div>

          {/* DESPUÉS (Figura 13 del Informe) */}
          <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-800/60 flex flex-col justify-between gap-3 shadow-xl ring-1 ring-cyan-500/20">
            <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Figura 13. Diseño Final del Prototipo AFRONEXIA
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Después de la VT (TRL 4)
                </span>
              </div>
              <span className="text-[11px] text-cyan-300 font-mono">Oct 2026</span>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-cyan-700/80 group flex-1 max-h-[280px]">
              <img
                src={imgPrototipoFinal}
                alt="Diseño Final del Prototipo AFRONEXIA (Figura 13)"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-cyan-950/90 text-cyan-200 text-[10px] font-mono px-2 py-1 rounded border border-cyan-800">
                Ecosistema de 9 Módulos + Asistente NEXIA
              </div>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/90 border border-cyan-900/60 text-xs">
              <div className="font-bold text-cyan-300">Mejoras sustantivas sustentadas en la Tabla 9:</div>
              <ul className="text-slate-300 space-y-1 text-[11px] list-disc list-inside">
                <li>Integración del asistente inteligente NEXIA con arquitectura RAG y pgvector.</li>
                <li>Módulos completos de Rutas Culturales, Agenda y Talentos & Emprendimientos afro.</li>
                <li>Función comunitaria "Registrar mis saberes" y panel administrativo con control RBAC.</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* 9 Functional Modules Interactive Explorer (Tabla 9) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
          {/* Module List (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 max-h-[360px] overflow-y-auto space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Tabla 9. Características y Módulos del Nuevo Prototipo AFRONEXIA:
            </div>
            {PROTOTYPE_MODULES_TABLE9.map((m) => {
              const isSelected = selectedModule.moduleNumber === m.moduleNumber;
              return (
                <button
                  key={m.moduleNumber}
                  onClick={() => setSelectedModule(m)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md ring-1 ring-cyan-400/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      M{m.moduleNumber}
                    </span>
                    <span className="text-xs font-bold text-white">{m.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 truncate max-w-[200px]">{m.role}</span>
                </button>
              );
            })}
          </div>

          {/* Module Deep Dive (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-mono text-xs font-bold text-cyan-400">
                  MÓDULO {selectedModule.moduleNumber}
                </span>
                <span className="text-xs text-amber-300 font-semibold">{selectedModule.name}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Características Observables:</span>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                  {selectedModule.features}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Función dentro de AFRONEXIA:</span>
                <p className="text-xs text-cyan-200 leading-relaxed bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/40">
                  {selectedModule.role}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span>Stack tecnológico asociado:</span>
                <span className="font-mono text-amber-400 font-semibold">{selectedModule.tech}</span>
              </div>
            </div>

            <button
              onClick={onOpenPrototypeModal}
              className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Abrir Simulador del Prototipo</span>
            </button>
          </div>
        </div>
      )}

      {/* Central Message Box (Obligation) */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-800/50 flex items-center justify-between gap-3 text-xs">
        <p className="text-cyan-200 font-medium italic">
          "{screen.centralMessage}"
        </p>
        <button
          onClick={onOpenNotes}
          className="text-amber-300 hover:text-amber-200 underline font-semibold ml-2 shrink-0"
        >
          Guion (2:30)
        </button>
      </div>
    </div>
  );
};
