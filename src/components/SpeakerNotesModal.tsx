import React, { useState } from 'react';
import { X, Copy, Check, Clock, MessageSquare, Compass, Award, Sparkles } from 'lucide-react';
import { PresentationScreen, INSTITUTIONAL_DATA } from '../data/reportData';

interface SpeakerNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: PresentationScreen;
  currentScreenIndex: number;
  totalScreens: number;
}

export const SpeakerNotesModal: React.FC<SpeakerNotesModalProps> = ({
  isOpen,
  onClose,
  currentScreen,
  currentScreenIndex,
  totalScreens,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullSpeechText = currentScreen.speakerScript.speech.join('\n\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `[PANTALLA ${currentScreen.number} - ${currentScreen.title}]\nTiempo: ${currentScreen.durationFormatted}\n\n${fullSpeechText}\n\nTRANSICIÓN:\n${currentScreen.speakerScript.transitionSentence}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B132B] border border-cyan-800/60 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl shadow-cyan-950/60 text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Guion Oral del Expositor · Pantalla {currentScreen.number} de {totalScreens}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  <Clock className="w-3 h-3" />
                  {currentScreen.durationFormatted}
                </span>
              </div>
              <h3 className="text-base font-bold text-white truncate max-w-xl">
                {currentScreen.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
              title="Copiar guion al portapapeles"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300">
          {/* Orator Advice Box */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-600/30 flex items-start gap-3 text-xs text-amber-200">
            <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Recomendación de oratoria profesional: </span>
              {currentScreen.speakerScript.deliveryAdvice}
            </div>
          </div>

          {/* Colombian Spanish Speech Text */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Texto sugerido para decir en voz alta (Ritmo 130 ppm)
            </h4>

            <div className="space-y-3 bg-slate-900/50 p-5 rounded-xl border border-slate-800 text-sm leading-relaxed text-slate-200 font-sans">
              {currentScreen.speakerScript.speech.map((paragraph, idx) => (
                <p key={idx} className="relative pl-3 border-l-2 border-cyan-500/50">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Transition to next screen */}
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-700/40 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Frase de transición hacia la siguiente pantalla:
            </div>
            <p className="text-sm font-medium text-slate-200 italic">
              "{currentScreen.speakerScript.transitionSentence}"
            </p>
          </div>

          {/* Document Traceability Reference */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Sustento en documento fuente:</span>
            <span className="font-mono text-cyan-300">{currentScreen.docSource}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>Expositor: {INSTITUTIONAL_DATA.researcher} (SENA)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
          >
            Cerrar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
