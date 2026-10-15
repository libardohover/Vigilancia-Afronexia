import React, { useState } from 'react';
import { X, BookOpen, ExternalLink, Search, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { BIBLIOGRAPHY_ITEMS, INSTITUTIONAL_DATA } from '../data/reportData';

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('todos');

  if (!isOpen) return null;

  const filteredItems = BIBLIOGRAPHY_ITEMS.filter((item) => {
    const matchesSearch =
      item.citation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pages.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'todos' || item.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B132B] border border-cyan-800/60 rounded-2xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Trazabilidad Bibliográfica y Fuentes</h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Normas APA 7.ª Edición
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Documento base: {INSTITUTIONAL_DATA.reportCode} · Boletín de Vigilancia Tecnológica SENA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/40 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por autor, tema, patente o revista..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-slate-900 border border-slate-750 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 mr-1 text-[11px]">Tipo:</span>
            {['todos', 'revista', 'patente', 'fundacional'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-colors ${
                  filterType === t
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* References List */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <span>Mostrando {filteredItems.length} referencias auditadas en el boletín:</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Verificadas con el informe
            </span>
          </div>

          <div className="space-y-3">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-800/50 transition-colors space-y-2 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-cyan-300 text-[11px] bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    {item.type}
                  </span>
                  <span className="font-mono text-amber-400/90 text-[11px]">
                    En documento: {item.pages}
                  </span>
                </div>
                <p className="text-slate-200 font-sans leading-relaxed text-[13px]">
                  {item.citation}
                </p>
              </div>
            ))}
          </div>

          {/* Section 12 Anexos Note */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-750 flex items-start gap-3">
            <FileSpreadsheet className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <div className="font-bold text-white">Anexo: Bitácora de revisión cienciométrica (VT - AFRONEXIA.xlsx)</div>
              <p className="text-slate-400 leading-relaxed">
                Contiene las matrices bibliográficas de Scopus (1.142 registros), Dimensions (373 registros), Google Scholar (14 registros), el Tree of Science con la clasificación Raíces/Tronco/Hojas, y las matrices de priorización de patentes en WIPO y Lens.org.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <span>Trazabilidad metodológica · Sin invenciones ni datos artificiales</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Cerrar panel
          </button>
        </div>
      </div>
    </div>
  );
};
