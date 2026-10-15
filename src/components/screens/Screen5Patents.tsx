import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Users, AlertTriangle, Layers, ExternalLink, Sparkles, ChevronRight, FileCheck } from 'lucide-react';
import { PresentationScreen, PATENTS_DATA, PATENT_METRICS } from '../../data/reportData';

interface Screen5Props {
  screen: PresentationScreen;
  onOpenNotes: () => void;
}

export const Screen5Patents: React.FC<Screen5Props> = ({ screen, onOpenNotes }) => {
  const [selectedPatent, setSelectedPatent] = useState(PATENTS_DATA[0]);
  const [patentView, setPatentView] = useState<'patents' | 'analytics'>('patents');

  const fields = [
    { title: 'Chatbots & NLP Turístico', desc: 'Reconocimiento de intención, entidades y diálogo asistido', patent: 'KR1020250061233' },
    { title: 'Recomendación Turística', desc: 'Clustering, árboles de decisión y perfiles contextuales', patent: 'CN113052505 A' },
    { title: 'Patrimonio Cultural Inteligente', desc: 'Mapas de patrimonio inmaterial y priorización por IA', patent: 'CN118708822 A' },
    { title: 'Rutas Turísticas Personalizadas', desc: 'Índices multidimensionales de confort y afinidad', patent: 'CN117076759 A' },
  ];

  return (
    <div className="h-full flex flex-col justify-between max-w-[1780px] mx-auto p-4 lg:p-8 space-y-5">
      {/* Screen Title & Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
          <span>Pantalla 05</span>
          <span className="text-slate-600">·</span>
          <span>Vigilancia de Patentes y Propiedad Industrial</span>
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

      {/* Top 4 Functional Fields Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {fields.map((f, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Campo {idx + 1}</span>
            <div className="text-xs font-bold text-white leading-tight">{f.title}</div>
            <p className="text-[10px] text-slate-400 leading-tight">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Grid: Patent Cards & Evolution Charts (7 cols / 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
        {/* Left: 4 Core Patents of High Pertinence (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Tabla 5 del Informe: Soluciones de Pertinencia Muy Alta
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">20 Soluciones en Lens / WIPO</span>
          </div>

          {/* Patent Selector Cards */}
          <div className="space-y-2.5">
            {PATENTS_DATA.map((pat, idx) => {
              const isSelected = selectedPatent.patentNumber === pat.patentNumber;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedPatent(pat)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-950/70 border-amber-400/80 shadow-md shadow-amber-500/10 ring-1 ring-amber-400/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-amber-300">{pat.patentNumber}</span>
                      <span className="text-[10px] text-slate-400">·</span>
                      <span className="text-xs text-slate-300 font-semibold">{pat.country}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({pat.pubDate})</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800">
                        {pat.status}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white">{pat.title}</div>
                    <div className="text-[11px] text-slate-300 font-light">{pat.keyTech}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Methodological Caution Box (Banned False FTO Claims) */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5 leading-relaxed text-[11px]">
              <span className="font-bold text-slate-200">Precisión metodológica y jurídica (UNE 166006): </span>
              KR 20250061233 A y WO 2025/089510 A1 se analizan como una misma familia tecnológica de Jwa Jeong Woo. Este estudio identifica soluciones de ingeniería sin prejuzgar libertad de operación comercial (FTO) ni vigencia jurídica en Colombia.
            </div>
          </div>
        </div>

        {/* Right: Selected Patent Transfer to AFRONEXIA & Timeline Chart (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800 shadow-xl">
          {/* Patent Details & Transfer Impact */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-400 font-mono">{selectedPatent.patentNumber}</span>
              <span className="text-[11px] text-slate-400">Inventores: {selectedPatent.inventors}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Aporte y Transferibilidad hacia AFRONEXIA:</span>
              <p className="text-xs sm:text-sm text-cyan-200 font-sans leading-relaxed bg-cyan-950/40 p-3 rounded-lg border border-cyan-800/40">
                {selectedPatent.transferToAfronexia}
              </p>
            </div>
          </div>

          {/* Temporal Evolution of Patents Chart (Figura 7) */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Figura 7. Evolución Temporal de Patentes (Lens 2018–2026)
              </span>
              <span className="font-mono text-cyan-300 font-bold">Pico 2025: 7 patentes</span>
            </div>

            <div className="grid grid-cols-9 gap-1.5 items-end h-28 pt-2">
              {PATENT_METRICS.timeline.map((pt, idx) => {
                const maxVal = 7;
                const heightPercent = (pt.count / maxVal) * 100;
                const isPeak = pt.year === '2025';

                return (
                  <div key={idx} className="flex flex-col items-center h-full justify-end">
                    <span className={`text-[10px] font-mono font-bold mb-1 ${isPeak ? 'text-amber-400' : 'text-slate-400'}`}>
                      {pt.count}
                    </span>
                    <div className="flex-1 w-full min-h-0 flex items-end justify-center">
                        <div className="w-full bg-slate-900 rounded-t overflow-hidden border-t border-x border-slate-800" style={{ height: `${heightPercent}%` }}>
                          <div
                        className={`w-full h-full ${isPeak ? 'bg-amber-400' : 'bg-cyan-500'}`}
                       
                      />
                        </div>
                      </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1">{pt.year.slice(2)}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Aceleración notable desde 2023 con predominio de solicitudes de patente frente a patentes concedidas.
            </p>
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
