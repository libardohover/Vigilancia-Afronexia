import React from 'react';
import { Sparkles, ArrowRight, MapPin, Users, Compass, Cpu, Landmark, Layers } from 'lucide-react';
import { PresentationScreen, INSTITUTIONAL_DATA } from '../../data/reportData';
import { AfronexiaLogo } from '../logos/AfronexiaLogo';
import { SenaLogo } from '../logos/SenaLogo';
import { GidtLogo } from '../logos/GidtLogo';
import imgHeroCultural from '../../assets/images/afronexia_hero_cultural_1791905813310.jpg';

interface Screen1Props {
  screen: PresentationScreen;
  onOpenNotes: () => void;
}

export const Screen1Context: React.FC<Screen1Props> = ({ screen, onOpenNotes }) => {
  const connectionSteps = [
    {
      step: '01',
      title: 'Patrimonio Cultural Afro',
      subtitle: 'Memoria, oralidad, saberes y gastronomía',
      icon: Landmark,
      color: 'border-[#FF6600]/50 text-[#FFA000] bg-[#FF6600]/10',
    },
    {
      step: '02',
      title: 'Vigilancia Tecnológica',
      subtitle: 'Observación cienciométrica UNE 166006',
      icon: Compass,
      color: 'border-[#00A859]/50 text-[#00E676] bg-[#00A859]/10',
    },
    {
      step: '03',
      title: 'Inteligencia Artificial',
      subtitle: 'Modelos de lenguaje, RAG y pgvector',
      icon: Cpu,
      color: 'border-cyan-500/50 text-cyan-400 bg-cyan-500/10',
    },
    {
      step: '04',
      title: 'AFRONEXIA',
      subtitle: 'Ecosistema de información territorial',
      icon: Layers,
      color: 'border-[#FF6600] text-white bg-gradient-to-br from-[#00A859]/30 via-[#005728]/50 to-[#FF6600]/30 ring-2 ring-[#FF6600]/40',
    },
    {
      step: '05',
      title: 'Visibilización y Gestión',
      subtitle: 'Apropiación social y desarrollo local',
      icon: Users,
      color: 'border-emerald-400/50 text-emerald-300 bg-emerald-500/10',
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between max-w-[1780px] mx-auto p-4 lg:p-8 space-y-6">
      {/* Screen Title & Editorial Kicker */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#FF9E00] uppercase tracking-widest">
          <span>Pantalla 01</span>
          <span className="text-slate-600">·</span>
          <span>Contexto Territorial e I+D+i</span>
          <span className="text-slate-600">·</span>
          <span className="text-[#00E676]">Duración: 1 minuto</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-5xl">
          {screen.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-4xl font-light">
          {screen.subtitle}
        </p>
      </div>

      {/* Main Grid: Left Context & Pillars / Right Authentic Photo & Connection Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
        {/* Left Column: Problem, Population, and Objective (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-slate-900/60 p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl">
          {/* Institutional Banner with Official Logos */}
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-emerald-950 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <SenaLogo size={32} showText={true} />
              <div className="h-6 w-px bg-slate-800" />
              <GidtLogo size={32} variant="compact" />
            </div>
            <span className="font-mono text-[#00E676] text-[11px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              {INSTITUTIONAL_DATA.date}
            </span>
          </div>

          {/* Three Complementary Messages (Prompt Rule: Max 3 messages) */}
          <div className="space-y-3.5">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Problema Central de I+D+i
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Limitada incorporación y transferencia de tecnologías de IA para la promoción, visibilización y gestión de la oferta cultural y turística de la población afrodescendiente de Barrancabermeja.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Territorio y Comunidad Beneficiaria
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Barrancabermeja (Santander) y el corredor del Magdalena Medio: comunidades negras, portadores de tradición, sabedores de medicina y gastronomía ancestral, y gestores culturales locales.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                Objetivo de la Vigilancia Tecnológica
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Analizar la influencia y oportunidades de transferencia de tecnologías de IA para fundamentar científica y técnicamente el desarrollo del prototipo AFRONEXIA.
              </p>
            </div>
          </div>

          {/* Research credits */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <div>
              <span className="text-slate-500">Investigador: </span>
              <span className="text-slate-200 font-semibold">{INSTITUTIONAL_DATA.researcher}</span>
            </div>
            <div>
              <span className="text-slate-500">Instructores: </span>
              <span className="text-slate-200">Hugo Semanate · Alejandro Zabala</span>
            </div>
          </div>
        </div>

        {/* Right Column: Connection Diagram & Authentic Image (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5 bg-slate-900/40 p-5 lg:p-6 rounded-2xl border border-slate-800 shadow-xl">
          {/* Dominant Visualization: 5-Stage Connection Diagram */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Visual Dominante · Cadena de Valor del Conocimiento
              </span>
              <span className="text-[11px] text-slate-400 font-mono">UNE 166006 / SENNOVA</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 items-stretch">
              {connectionSteps.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className={`relative p-3.5 rounded-xl border flex flex-col justify-between text-left transition-all hover:scale-[1.02] ${item.color}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] font-bold opacity-80">{item.step}</span>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-tight text-white mb-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-300 leading-tight font-light">{item.subtitle}</p>
                    </div>

                    {idx < connectionSteps.length - 1 && (
                      <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-400/70" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Authentic Brand Lockup Card */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-900/60 flex flex-wrap items-center justify-between gap-4">
            <AfronexiaLogo size="lg" showSlogan={true} showSubtitle={true} />
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Identidad Oficial del Proyecto</span>
              <span className="text-xs text-[#00E676] font-semibold">SENA Regional Antioquia · ADSO 2026</span>
            </div>
          </div>

          {/* Authentic Territorial Image Asset */}
          <div className="relative rounded-xl overflow-hidden border border-slate-700/80 group">
            <img
              src={imgHeroCultural}
              alt="Río Magdalena y memoria cultural afrodescendiente en Barrancabermeja"
              className="w-full h-44 sm:h-52 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Measured Scrim for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
                    Territorio Barrancabermeja
                  </span>
                  <span className="text-xs text-slate-300 font-medium">Corredor del Río Magdalena</span>
                </div>
                <p className="text-xs text-slate-300 italic">
                  "El río también guarda memoria afro": integración de tradición oral, tambores y turismo comunitario.
                </p>
              </div>
            </div>
          </div>

          {/* Central Message Box (Prompt Obligation) */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-amber-950/40 border border-cyan-700/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-cyan-100">
                "{screen.centralMessage}"
              </p>
            </div>
            <button
              onClick={onOpenNotes}
              className="shrink-0 text-xs text-amber-300 hover:text-amber-200 underline font-medium"
            >
              Ver guion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
