import React, { useState } from 'react';
import { Network, Sparkles, BookOpen, Layers, CheckCircle2, ChevronRight, Compass, ArrowUpRight } from 'lucide-react';
import { PresentationScreen, TREE_OF_SCIENCE_DATA } from '../../data/reportData';

interface Screen4Props {
  screen: PresentationScreen;
  onOpenNotes: () => void;
}

export const Screen4TreeOfScience: React.FC<Screen4Props> = ({ screen, onOpenNotes }) => {
  const [selectedTier, setSelectedTier] = useState<'roots' | 'trunk' | 'leaves'>('leaves');
  const [selectedPaper, setSelectedPaper] = useState<any>(TREE_OF_SCIENCE_DATA.leaves[1]); // Default Wang et al. 2026

  const technologies = [
    { name: 'IA Generativa & LLM', tier: 'Tronco & Hojas', icon: '🧠', desc: 'Narrativas y asistentes adaptativos' },
    { name: 'RAG & Búsqueda Semántica', tier: 'Hojas (Frontera)', icon: '🔍', desc: 'Respuestas contextualizadas sin alucinaciones' },
    { name: 'Sistemas de Recomendación', tier: 'Raíces & Tronco', icon: '🎯', desc: 'Afinidad cultural por preferencias' },
    { name: 'Grafos de Conocimiento', tier: 'Hojas (Wang 2026)', icon: '🕸️', desc: 'Relación de portadores y saberes ancestrales' },
    { name: 'Analítica Turística & GIS', tier: 'Raíces (Luca 2023)', icon: '📍', desc: 'Modelado geoespacial y trayectorias' },
    { name: 'Realidad Extendida (XR)', tier: 'Hojas (Koukopoulos 2026)', icon: '🥽', desc: 'Experiencias inmersivas patrimoniales' },
  ];

  return (
    <div className="h-full flex flex-col justify-between max-w-[1780px] mx-auto p-4 lg:p-8 space-y-5">
      {/* Screen Title & Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
          <span>Pantalla 04</span>
          <span className="text-slate-600">·</span>
          <span>Árbol de la Ciencia (Tree of Science - ToS)</span>
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

      {/* Main Grid: Tree of Science Visual Architecture & Paper Detail (7 cols / 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
        {/* Left: Interactive Tree of Science Levels (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl">
          {/* Section Heading & Tier Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Network className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Figura 4 del Informe: Genealogía del Conocimiento
              </span>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setSelectedTier('leaves');
                  setSelectedPaper(TREE_OF_SCIENCE_DATA.leaves[0]);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                  selectedTier === 'leaves'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🍃 Hojas (Frontera 2025-26)</span>
              </button>
              <button
                onClick={() => {
                  setSelectedTier('trunk');
                  setSelectedPaper(TREE_OF_SCIENCE_DATA.trunk[0]);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                  selectedTier === 'trunk'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🪵 Tronco (Consolidación)</span>
              </button>
              <button
                onClick={() => {
                  setSelectedTier('roots');
                  setSelectedPaper(TREE_OF_SCIENCE_DATA.roots[0]);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                  selectedTier === 'roots'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🌱 Raíces (Fundamentos)</span>
              </button>
            </div>
          </div>

          {/* Biological metaphor visual tree diagram */}
          <div className="relative p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                Selecciona un artículo para ver su aporte tecnológico a AFRONEXIA:
              </span>
              <span className="text-slate-500 font-mono text-[11px]">Tablas 3 y 4 del Informe</span>
            </div>

            <div className="space-y-2">
              {TREE_OF_SCIENCE_DATA[selectedTier].map((paper, idx) => {
                const isSelected = selectedPaper?.title === paper.title;
                const tierColor =
                  selectedTier === 'leaves'
                    ? isSelected
                      ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                      : 'hover:border-emerald-800/60'
                    : selectedTier === 'trunk'
                    ? isSelected
                      ? 'bg-amber-950/80 border-amber-400 text-amber-200'
                      : 'hover:border-amber-800/60'
                    : isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
                    : 'hover:border-cyan-800/60';

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedPaper(paper)}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex items-start justify-between gap-3 bg-slate-900/70 border-slate-800 ${tierColor}`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{paper.authors}</span>
                        <span className="text-[11px] font-mono text-slate-400">({paper.year})</span>
                        {paper.citations !== 'N/D' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-amber-300">
                            {paper.citations} citas
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 font-medium line-clamp-1">{paper.title}</p>
                      <p className="text-[11px] text-slate-400 font-light">{paper.topic}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Six Core Technologies Badge Grid */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Tecnologías Clave Identificadas en el Tree of Science:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {technologies.map((t, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-200 text-[11px]">
                    <span>{t.icon}</span>
                    <span className="truncate">{t.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Selected Paper Spotlight & Transferability Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Ficha Técnica del Documento ToS
            </span>
            <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
              Tabla 4 del Boletín
            </span>
          </div>

          {/* Paper Detail Card */}
          {selectedPaper ? (
            <div className="space-y-4 p-4 rounded-xl bg-slate-950/90 border border-slate-750 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-300">{selectedPaper.authors}</span>
                  <span className="font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Año {selectedPaper.year}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                  "{selectedPaper.title}"
                </h3>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Tópicos:</span>
                  <p className="font-medium text-slate-200">{selectedPaper.topic}</p>
                </div>
              </div>

              {/* Transfer to AFRONEXIA Box */}
              <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Transferibilidad y Relevancia para AFRONEXIA:
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {selectedPaper.role}
                </p>
              </div>

              {/* Citations / Metric Note */}
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Impacto en la literatura:</span>
                <span className="font-mono text-amber-400 font-bold">
                  {selectedPaper.citations === 'N/D' ? 'Documento fundacional pionero' : `${selectedPaper.citations} citaciones globales`}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 italic text-center p-8">
              Selecciona un documento de la lista.
            </div>
          )}

          {/* Central Message Box (Obligation) */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-800/50 flex items-center justify-between gap-3 text-xs">
            <p className="text-emerald-200 font-medium italic">
              "{screen.centralMessage}"
            </p>
            <button
              onClick={onOpenNotes}
              className="text-amber-300 hover:text-amber-200 underline font-semibold ml-2 shrink-0"
            >
              Guion (2:00)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
