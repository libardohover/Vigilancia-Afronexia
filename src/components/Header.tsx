import React from 'react';
import { Play, Pause, RotateCcw, Maximize2, Minimize2, FileText, BookOpen, AlertCircle } from 'lucide-react';
import { INSTITUTIONAL_DATA, PresentationScreen } from '../data/reportData';
import { AfronexiaLogo } from './logos/AfronexiaLogo';
import { SenaLogo } from './logos/SenaLogo';
import { GidtLogo } from './logos/GidtLogo';

interface HeaderProps {
  currentScreen: PresentationScreen;
  currentScreenIndex: number;
  totalScreens: number;
  globalTimeSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenNotes: () => void;
  onOpenReferences: () => void;
  onSelectScreen: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  currentScreenIndex,
  totalScreens,
  globalTimeSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  isFullscreen,
  onToggleFullscreen,
  onOpenNotes,
  onOpenReferences,
  onSelectScreen,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const isLowTime = globalTimeSeconds <= 60 && globalTimeSeconds > 0;
  const isTimeUp = globalTimeSeconds === 0;

  // Percentage of total 15 min presentation
  const progressPercent = Math.min(100, Math.max(0, ((900 - globalTimeSeconds) / 900) * 100));

  return (
    <header className="relative z-30 bg-[#041610]/95 backdrop-blur-md border-b border-[#00A859]/30 text-slate-100 select-none shadow-lg shadow-emerald-950/40">
      {/* Visual global progress bar using AFRONEXIA brand gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900">
        <div
          className="h-full bg-gradient-to-r from-[#00A859] via-[#FFB800] to-[#FF6600] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Zone 1: Authentic Brand Logos Lockup (AFRONEXIA + SENA + GIDT) */}
        <div className="flex items-center gap-3 shrink-0">
          <AfronexiaLogo size="md" showSubtitle={true} />

          <div className="hidden xl:flex items-center gap-3 pl-3 border-l border-emerald-900/60">
            <SenaLogo size={30} showText={true} />
            <div className="h-6 w-px bg-slate-800" />
            <GidtLogo size={32} variant="compact" />
          </div>
        </div>

        {/* Zone 2: Screen selector navigation buttons */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-950/90 rounded-xl border border-emerald-950/80">
          {Array.from({ length: totalScreens }).map((_, idx) => {
            const isActive = idx === currentScreenIndex;
            return (
              <button
                key={idx}
                onClick={() => onSelectScreen(idx)}
                title={`Pantalla ${idx + 1}`}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#00A859] text-slate-950 shadow-md shadow-emerald-500/30 font-extrabold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                P{idx + 1}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Countdown Timer & Presentation Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* 15:00 Timer Block */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              isTimeUp
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : isLowTime
                ? 'bg-amber-950/80 border-amber-500 text-amber-300 animate-pulse'
                : 'bg-slate-950/90 border-[#00A859]/40 text-[#00E676]'
            }`}
          >
            {isLowTime && <AlertCircle className="w-4 h-4 text-amber-400" />}
            <div className="flex flex-col text-right">
              <span className="font-mono text-sm sm:text-base font-bold tabular-nums tracking-wider leading-none">
                {formatTime(globalTimeSeconds)}
              </span>
              <span className="text-[9px] text-slate-400 font-medium">
                {isTimeUp ? '¡TIEMPO!' : 'RESTANTE'}
              </span>
            </div>

            <div className="flex items-center gap-1 pl-1 border-l border-slate-700">
              <button
                onClick={onToggleTimer}
                title={isTimerRunning ? 'Pausar cronómetro (P)' : 'Iniciar cronómetro (P)'}
                className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                aria-label={isTimerRunning ? 'Pausar' : 'Iniciar'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#00E676]" />}
              </button>
              <button
                onClick={onResetTimer}
                title="Reiniciar a 15:00"
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="Reiniciar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <button
            onClick={onOpenNotes}
            title="Notas del Expositor y Guion Oral (N)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-[#FF6600]/15 hover:bg-[#FF6600]/25 text-[#FF7A00] border border-[#FF6600]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guion Oral</span>
          </button>

          <button
            onClick={onOpenReferences}
            title="Referencias y Trazabilidad APA 7ª"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fuentes</span>
          </button>

          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Salir de pantalla completa (F)' : 'Pantalla completa (F)'}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            aria-label="Pantalla completa"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
