import React, { useState } from 'react';
import { Globe, TrendingUp, BarChart3, Database, FileText, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';
import {
  PresentationScreen,
  SOURCES_BREAKDOWN,
  TIMELINE_PUBLICATIONS,
  COUNTRY_DISTRIBUTION,
  TECHNICAL_AREAS,
} from '../../data/reportData';

interface Screen3Props {
  screen: PresentationScreen;
  onOpenNotes: () => void;
}

export const Screen3ScientificResults: React.FC<Screen3Props> = ({ screen, onOpenNotes }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'countries' | 'sources' | 'topics'>('timeline');

  const totalRecovered = 1529;
  const totalSelected = 50;

  // Max value for geographic distribution
  const maxCountry = 475; // China

  return (
    <div className="h-full flex flex-col justify-between max-w-[1780px] mx-auto p-4 lg:p-8 space-y-5">
      {/* Screen Title & Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
          <span>Pantalla 03</span>
          <span className="text-slate-600">·</span>
          <span>Resultados Cienciométricos Mundiales</span>
          <span className="text-slate-600">·</span>
          <span className="text-cyan-400">Duración: 2:30 min</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-5xl">
          {screen.title}
        </h1>
        <p className="text-sm text-slate-300 max-w-4xl font-light">
          {screen.subtitle}
        </p>
      </div>

      {/* Top 4 KPI Indicators (Obligation: 1.529, 1.142, 373, 14 + 50 seleccionados) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Universo Total</span>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">1.529</span>
            <span className="text-[11px] text-slate-400">doc.</span>
          </div>
          <span className="text-[10px] text-slate-400">Recuperación bruta</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Scopus</span>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono tabular-nums">1.142</span>
            <span className="text-[11px] text-slate-400">(74,7%)</span>
          </div>
          <span className="text-[10px] text-cyan-200/70">16 seleccionados</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Dimensions</span>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-300 font-mono tabular-nums">373</span>
            <span className="text-[11px] text-slate-400">(24,4%)</span>
          </div>
          <span className="text-[10px] text-indigo-200/70">20 seleccionados</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Google Scholar</span>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono tabular-nums">14</span>
            <span className="text-[11px] text-slate-400">(0,9%)</span>
          </div>
          <span className="text-[10px] text-emerald-200/70">14 seleccionados</span>
        </div>

        <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/40 flex flex-col justify-between shadow-lg shadow-amber-950/30">
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Corpus Focalizado</span>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">50</span>
            <span className="text-[11px] text-amber-300/80">(3,3%)</span>
          </div>
          <span className="text-[10px] text-amber-200">Alta pertinencia I+D+i</span>
        </div>
      </div>

      {/* Main Interactive Visualization Tabs (A: Fuentes, B: Tiempo, C: Países, D: Áreas) */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl flex-1 flex flex-col justify-between gap-4">
        {/* Visualization Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'timeline'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>B. Dinámica Temporal 2021-2026 (Fig. 8)</span>
            </button>

            <button
              onClick={() => setActiveTab('countries')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'countries'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>C. Distribución Geográfica (Fig. 10)</span>
            </button>

            <button
              onClick={() => setActiveTab('sources')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'sources'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>A. Embudo por Fuentes (Tabla 6)</span>
            </button>

            <button
              onClick={() => setActiveTab('topics')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'topics'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>D. Áreas Técnicas (Fig. 9)</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono hidden md:block">
            Fuente: GFPI-F-153 V03 · Matriz VT AFRONEXIA (Scopus & Dimensions 2026)
          </div>
        </div>

        {/* Tab 1: Timeline Evolution (Fig. 8) */}
        {activeTab === 'timeline' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  Figura 8. Dinámica de Publicación de Documentos Seleccionados en el Tiempo (2021 – 2026)
                </h3>
                <p className="text-xs text-slate-400">
                  El 92 % de los documentos se concentra entre 2024 y 2026, con un máximo de 22 documentos en 2025.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-3 h-1 bg-cyan-400 rounded-full" /> Total Seleccionado (50)
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Pico 2025: 22 doc.
                </span>
              </div>
            </div>

            {/* Custom SVG Line & Area Chart for Fig. 8 */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div className="grid grid-cols-6 gap-2 items-end h-52 sm:h-56 pt-6 px-4">
                {TIMELINE_PUBLICATIONS.map((pt, idx) => {
                  const maxVal = 25;
                  const heightPercent = (pt.total / maxVal) * 100;
                  const isPeak = pt.year === '2025';

                  return (
                    <div key={idx} className="flex flex-col items-center h-full justify-end group">
                      {/* Floating Data Badge */}
                      <div className="mb-2 text-center transition-all group-hover:-translate-y-1">
                        <span
                          className={`font-mono text-xs sm:text-sm font-extrabold px-2 py-0.5 rounded ${
                            isPeak
                              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/40 ring-2 ring-amber-300'
                              : 'bg-slate-800 text-cyan-300 border border-slate-700'
                          }`}
                        >
                          {pt.total}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1 hidden sm:block">
                          {isPeak ? '★ Pico' : pt.year === '2026' ? 'Corte Oct' : ''}
                        </div>
                      </div>

                      {/* Bar Fill */}
                      <div className="flex-1 w-full min-h-0 flex items-end justify-center">
                        <div className="w-full max-w-[50px] bg-slate-900 rounded-t-lg overflow-hidden border-t border-x border-slate-700 relative" style={{ height: `${heightPercent}%` }}>
                          <div
                          className={`w-full h-full transition-all duration-700 ${
                            isPeak
                              ? 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-300'
                              : 'bg-gradient-to-t from-cyan-900 via-cyan-600 to-cyan-400'
                          }`}
                        />
                        </div>
                      </div>

                      {/* X-axis Year Label */}
                      <div className="mt-2 text-center">
                        <span className={`font-mono text-xs font-bold ${isPeak ? 'text-amber-300' : 'text-slate-300'}`}>
                          {pt.year}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
                <span>Total seleccionados analizados: 50 publicaciones</span>
                <span className="text-cyan-300 font-semibold">
                  Aceleración contundente: 46 de 50 artículos se ubican entre 2024 y 2026
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Countries (Fig. 10) */}
        {activeTab === 'countries' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Figura 10. Distribución Geográfica de la Producción Científica Consolidada
                </h3>
                <p className="text-xs text-slate-400">
                  Liderazgo asiático contundente (China 475, India 147, Malasia 89). Oportunidad de especialización territorial para Colombia.
                </p>
              </div>
              <div className="text-xs text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/50">
                Brecha Científica: Escasas investigaciones en Colombia
              </div>
            </div>

            {/* Top 10 Countries Bar Visualization */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 max-h-64 overflow-y-auto space-y-2.5">
              {COUNTRY_DISTRIBUTION.slice(0, 10).map((c, idx) => {
                const widthPercent = (c.count / maxCountry) * 100;
                const isLeader = idx === 0;

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-500 w-5 text-right">{idx + 1}.</span>
                        <span className="font-semibold text-slate-200">{c.country}</span>
                        <span className="text-[10px] text-slate-400">({c.region})</span>
                      </div>
                      <span className="font-mono font-bold text-cyan-300 tabular-nums">{c.count} publicaciones</span>
                    </div>

                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isLeader
                            ? 'bg-gradient-to-r from-amber-500 to-amber-300'
                            : 'bg-gradient-to-r from-cyan-600 to-cyan-400'
                        }`}
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Sources Breakdown (Tabla 6) */}
        {activeTab === 'sources' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Tabla 6. Resultados de las Ecuaciones de Búsqueda Científica y Embudo de Selección
              </h3>
              <p className="text-xs text-slate-400">
                Criterios de calidad, pertinencia temática y actualidad redujeron el conjunto bruto al 3,3 % más riguroso.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px] bg-slate-950">
                    <th className="py-2.5 px-3">Base de Datos</th>
                    <th className="py-2.5 px-3 text-right">Recuperados</th>
                    <th className="py-2.5 px-3 text-right">% Universo</th>
                    <th className="py-2.5 px-3 text-right">Seleccionados</th>
                    <th className="py-2.5 px-3 text-right">% Tasa Selección</th>
                    <th className="py-2.5 px-3">Rol Metodológico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {SOURCES_BREAKDOWN.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-white">{row.source}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-200 tabular-nums">
                        {row.recuperados.toLocaleString('es-CO')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-400">{row.percentage}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400 tabular-nums">
                        {row.seleccionados}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-cyan-300">{row.selectedPct}</td>
                      <td className="py-2.5 px-3 text-slate-300 text-[11px]">
                        {row.source === 'Scopus'
                          ? 'Fuente principal indexada de alto impacto'
                          : row.source === 'Dimensions'
                          ? 'Amplitud multidisciplinaria y citas globales'
                          : 'Validación en literatura abierta y regional'}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-950/80 font-bold border-t-2 border-slate-700">
                    <td className="py-2.5 px-3 text-cyan-300">TOTAL CONSOLIDADO</td>
                    <td className="py-2.5 px-3 text-right font-mono text-white tabular-nums">1.529</td>
                    <td className="py-2.5 px-3 text-right font-mono text-white">100 %</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-400 tabular-nums">50</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-300">3,3 %</td>
                    <td className="py-2.5 px-3 text-amber-200 text-[11px]">Corpus de análisis focalizado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Technical Areas (Fig. 9) */}
        {activeTab === 'topics' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Figura 9. Dinámica de Publicaciones por Áreas Técnicas Relevantes
              </h3>
              <p className="text-xs text-slate-400">
                Convergencia de tecnologías en sistemas de recomendación, modelos de lenguaje, georreferenciación y patrimonio inmaterial.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto">
              {TECHNICAL_AREAS.map((t, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300 truncate mr-2" title={t.area}>{t.area}</span>
                  <span className="font-mono font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {t.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interpretative Message Banner (Obligation) */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/60 via-slate-950 to-cyan-950/70 border border-amber-600/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-xs sm:text-sm font-semibold text-amber-100">
              "{screen.centralMessage}"
            </p>
          </div>
          <button
            onClick={onOpenNotes}
            className="shrink-0 text-xs text-cyan-300 hover:text-cyan-200 underline font-medium"
          >
            Ver guion (2:30)
          </button>
        </div>
      </div>
    </div>
  );
};
