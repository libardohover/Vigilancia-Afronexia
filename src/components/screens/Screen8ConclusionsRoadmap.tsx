import React from 'react';
import { Flag, Sparkles, Milestone, ArrowRight, Play, Heart, Award, ShieldCheck, MapPin } from 'lucide-react';
import { PresentationScreen, INSTITUTIONAL_DATA } from '../../data/reportData';
import { AfronexiaLogo } from '../logos/AfronexiaLogo';
import { SenaLogo } from '../logos/SenaLogo';
import { GidtLogo } from '../logos/GidtLogo';

interface Screen8Props {
  screen: PresentationScreen;
  onOpenNotes: () => void;
  onOpenPrototypeModal: () => void;
}

export const Screen8ConclusionsRoadmap: React.FC<Screen8Props> = ({
  screen,
  onOpenNotes,
  onOpenPrototypeModal,
}) => {
  const roadmapStages = [
    {
      horizon: 'Corto Plazo',
      timeframe: '2026-Q4',
      trl: 'TRL 4 Consolidado',
      title: 'Fortalecimiento de Laboratorio & Datos',
      tasks: [
        'Optimización del asistente NEXIA y refinamiento del motor RAG.',
        'Carga estructurada de saberes ancestrales y base vectorial pgvector.',
        'Pruebas controladas de usabilidad y rendimiento con gestores locales.',
      ],
      color: 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300',
    },
    {
      horizon: 'Mediano Plazo',
      timeframe: '2027-S1',
      trl: 'Rumbo a TRL 5',
      title: 'Validación en Entorno Real en Barrancabermeja',
      tasks: [
        'Despliegue del piloto territorial con usuarios reales y turistas.',
        'Articulación formal con emprendedores, artesanos y cocineros afro.',
        'Medición de métricas de aceptación comunitaria y gobernanza de datos.',
      ],
      color: 'border-amber-500/50 bg-amber-950/40 text-amber-300',
    },
    {
      horizon: 'Largo Plazo',
      timeframe: '2027–2028',
      trl: 'Escala Regional',
      title: 'Expansión Territorial & Ecosistema Abierto',
      tasks: [
        'Transferencia del modelo hacia otros municipios del Magdalena Medio.',
        'Exploración de experiencias inmersivas (XR) y aprendizaje federado.',
        'Apropiación comunitaria sostenible y articulación con política pública.',
      ],
      color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between max-w-[1780px] mx-auto p-4 lg:p-8 space-y-5">
      {/* Screen Title & Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
          <span>Pantalla 08</span>
          <span className="text-slate-600">·</span>
          <span>Conclusiones y Hoja de Ruta Territorial</span>
          <span className="text-slate-600">·</span>
          <span className="text-cyan-400">Duración: 1:30 min</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            {screen.title}
          </h1>

          <button
            onClick={onOpenPrototypeModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-400 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Explorar Prototipo AFRONEXIA</span>
          </button>
        </div>
        <p className="text-sm text-slate-300 max-w-4xl font-light">
          {screen.subtitle}
        </p>
      </div>

      {/* Main Grid: 3 Core Conclusions & 3-Horizon Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
        {/* Left: 3 Synthesized Conclusions (Capítulo 10) (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Flag className="w-4 h-4 text-amber-400" />
              Tres Conclusiones Fundamentales del Boletín
            </span>
            <span className="text-xs font-mono text-slate-400">Capítulo 10 · pág. 57</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <span className="w-5 h-5 rounded-full bg-cyan-950 flex items-center justify-center font-mono text-[11px] text-cyan-400 border border-cyan-800">
                  1
                </span>
                Pertinencia Tecnológica y Cultural
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                La vigilancia identificó que la convergencia de IA generativa, RAG, georreferenciación y recomendación es viable para potenciar el turismo cultural sin incurrir en descontextualización de los saberes afrodescendientes.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <span className="w-5 h-5 rounded-full bg-amber-950 flex items-center justify-center font-mono text-[11px] text-amber-400 border border-amber-800">
                  2
                </span>
                Maduración Efectiva a TRL 4
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                El prototipo superó la fase conceptual: hoy cuenta con 9 módulos integrados en laboratorio, base vectorial pgvector para el asistente NEXIA y respaldo documental que reduce alucinaciones.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <span className="w-5 h-5 rounded-full bg-emerald-950 flex items-center justify-center font-mono text-[11px] text-emerald-400 border border-emerald-800">
                  3
                </span>
                Prioridad de Apropiación Comunitaria
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                El factor decisivo no reside en el código, sino en cerrar la brecha de relacionamiento externo (89/100) involucrando a portadores de tradición y emprendedores de Barrancabermeja.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Propiedad Intelectual Patrimonial:</span>
            <span className="font-semibold text-slate-200">SENA · Regional Antioquia</span>
          </div>
        </div>

        {/* Right: Visual Strategic Roadmap (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Milestone className="w-4 h-4 text-cyan-400" />
              Hoja de Ruta Estratégica de Predesarrollo y Escalamiento
            </span>
            <span className="text-xs font-mono text-slate-400">2026 – 2028</span>
          </div>

          {/* 3 Horizon Visual Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
            {roadmapStages.map((st, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all hover:scale-[1.01] ${st.color}`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-80">
                      {st.horizon}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900/80 border border-white/20">
                      {st.timeframe}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">{st.title}</div>
                  <span className="text-[10px] font-bold text-amber-300 block">{st.trl}</span>

                  <ul className="space-y-1.5 pt-2 text-[11px] text-slate-200 list-disc list-inside">
                    {st.tasks.map((task, tidx) => (
                      <li key={tidx} className="leading-tight">
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Final Inspiring Presentation Statement & Official Institutional Logos */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 via-slate-950 to-orange-950/70 border border-[#00A859]/50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF9E00] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Mensaje Final de Sustentación
            </div>
            <p className="text-sm sm:text-base font-bold text-white leading-snug font-sans">
              "{screen.centralMessage}"
            </p>

            {/* Official Logos Showcase */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <AfronexiaLogo size="md" showSlogan={true} />
              
              <div className="flex items-center gap-3">
                <SenaLogo size={34} showText={true} />
                <div className="h-7 w-px bg-slate-800" />
                <GidtLogo size={34} variant="compact" />
              </div>

              <button
                onClick={onOpenNotes}
                className="text-[#FF9E00] hover:text-[#FFA000] underline font-semibold text-xs ml-auto"
              >
                Guion de Cierre (1:30)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
