import React from 'react';
import { ChevronLeft, ChevronRight, Clock, HelpCircle } from 'lucide-react';
import { PresentationScreen } from '../data/reportData';

interface NavigationControlsProps {
  currentScreen: PresentationScreen;
  currentScreenIndex: number;
  totalScreens: number;
  screenTimeSeconds: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenNotes: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentScreen,
  currentScreenIndex,
  totalScreens,
  screenTimeSeconds,
  onPrev,
  onNext,
  onOpenNotes,
}) => {
  const isFirst = currentScreenIndex === 0;
  const isLast = currentScreenIndex === totalScreens - 1;

  const formatMinSec = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isOverScreenTime = screenTimeSeconds > currentScreen.durationSeconds;

  return (
    <footer className="relative z-20 bg-[#0B132B]/90 backdrop-blur-md border-t border-slate-800 px-4 lg:px-8 py-2.5 flex items-center justify-between text-slate-300">
      {/* Left: Screen Duration and Local Screen Timer */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/90 rounded-lg border border-slate-800 text-xs font-mono">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">Esta pantalla:</span>
          <span
            className={`font-bold tabular-nums ${
              isOverScreenTime ? 'text-amber-400 animate-pulse' : 'text-slate-200'
            }`}
          >
            {formatMinSec(screenTimeSeconds)}
          </span>
          <span className="text-slate-500">/ {currentScreen.durationFormatted}</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">
            {currentScreen.number} / {totalScreens.toString().padStart(2, '0')}
          </span>
          <span className="text-slate-600">·</span>
          <span className="truncate max-w-[280px] text-slate-300">{currentScreen.title}</span>
        </div>
      </div>

      {/* Center: Slide indicator dots */}
      <div className="hidden md:flex items-center gap-1.5">
        {Array.from({ length: totalScreens }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentScreenIndex
                ? 'w-7 bg-[#00A859] shadow-sm shadow-[#00A859]/50'
                : i < currentScreenIndex
                ? 'w-2 bg-[#FF7A00]/70'
                : 'w-2 bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* Right: Previous & Next Controls */}
      <div className="flex items-center gap-2">
        <span className="hidden xl:inline-flex items-center gap-1.5 text-[11px] text-slate-500 mr-2">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono text-[10px]">
            ←
          </kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono text-[10px]">
            →
          </kbd>
          <span>Navegar</span>
          <span className="text-slate-600">·</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono text-[10px]">
            N
          </kbd>
          <span>Guion</span>
        </span>

        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
            isFirst
              ? 'bg-slate-900/40 text-slate-600 border-slate-850 cursor-not-allowed'
              : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700 hover:border-slate-600'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        <button
          onClick={onNext}
          disabled={isLast}
          className={`flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
            isLast
              ? 'bg-slate-900/40 text-slate-600 border-slate-850 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#00A859] via-[#10B981] to-[#FF6600] hover:brightness-110 text-slate-950 font-extrabold border-[#00A859] shadow-md shadow-[#00A859]/30'
          }`}
        >
          <span>{isLast ? 'Fin' : 'Siguiente'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
