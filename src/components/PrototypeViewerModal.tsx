import React, { useEffect, useRef, useState } from 'react';
import { X, Send, Bot, MapPin, Compass, BookOpen, Loader2, Database, Globe, ChevronDown } from 'lucide-react';
import { Markdown } from '../nexia/Markdown';
import { preguntarNexia } from '../nexia/cliente';
import type { Fuente } from '../nexia/engine';
import { PROTOTYPE_MODULES_TABLE9 } from '../data/reportData';
import { AfronexiaLogo } from './logos/AfronexiaLogo';
import { SenaLogo } from './logos/SenaLogo';

interface PrototypeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  sender: 'user' | 'nexia';
  text: string;
  source?: string;
  fuentes?: Fuente[];
  motor?: 'gemini' | 'local';
  herramientas?: string[];
  timestamp: string;
}

const hora = () => new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

export const PrototypeViewerModal: React.FC<PrototypeViewerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'nexia' | 'explorador' | 'memoria' | 'rutas'>('nexia');
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'nexia',
      text:
        '¡Hola! Soy **NEXIA**, el agente virtual de AFRONEXIA para Barrancabermeja. Consulto la base de conocimiento del proyecto y, cuando hace falta, información actual de la web.\n\nPuedo armarte **rutas por días**, decirte **dónde bañarse con niños de forma segura**, **dónde tomar un buen tinto**, qué comer y qué expresiones de la **cultura afro** del territorio visitar.',
      source: 'Base_Conocimiento_AFRONEXIA_v1 · ofertas_culturales',
      timestamp: hora(),
    },
  ]);
  const [cargando, setCargando] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, cargando]);

  if (!isOpen) return null;

  const suggestedQuestions = [
    'Tengo tres días de vacaciones y vamos dos adultos y dos niños. Dame una ruta por día, dónde bañarnos con los niños y dónde tomar un buen tinto.',
    '¿Dónde puedo bañarme con niños en Barrancabermeja?',
    '¿Dónde tomo un buen tinto?',
    '¿Qué plato típico ribereño debo probar y dónde?',
    '¿Qué expresiones de la cultura afro puedo conocer en Barrancabermeja?',
  ];

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend ?? inputQuery).trim();
    if (!q || cargando) return;

    const historial = messages.slice(1).map(m => ({ rol: m.sender === 'user' ? ('usuario' as const) : ('nexia' as const), texto: m.text }));
    setMessages(prev => [...prev, { sender: 'user', text: q, timestamp: hora() }]);
    setInputQuery('');
    setCargando(true);
    try {
      const r = await preguntarNexia(q, historial);
      setMessages(prev => [
        ...prev,
        {
          sender: 'nexia',
          text: r.texto,
          fuentes: r.fuentes,
          motor: r.motor,
          herramientas: r.herramientas,
          source: r.origen,
          timestamp: hora(),
        },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { sender: 'nexia', text: 'No pude procesar la consulta en este momento. Intenta de nuevo.', timestamp: hora() },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#0B132B] border border-cyan-700/60 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Bar of the Mockup */}
        <div className="p-3.5 px-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-xs font-mono text-slate-400 pl-2 border-l border-slate-800">
              http://localhost:3000/ · Prototipo Validado en Laboratorio (TRL 4)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              AFRONEXIA v1.0-LAB
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prototype Simulated App Navigation */}
        <div className="px-5 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AfronexiaLogo size="sm" showSubtitle={true} />
            <div className="h-6 w-px bg-slate-800" />
            <SenaLogo size={24} showText={true} />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('nexia')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'nexia'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>NEXIA Asistente IA</span>
            </button>

            <button
              onClick={() => setActiveTab('explorador')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'explorador'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explorador Cultural</span>
            </button>

            <button
              onClick={() => setActiveTab('memoria')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'memoria'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Memoria & Saberes</span>
            </button>

            <button
              onClick={() => setActiveTab('rutas')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'rutas'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Rutas Comunitarias</span>
            </button>
          </div>
        </div>

        {/* Prototype Main Interactive Canvas */}
        <div className="flex-1 overflow-hidden p-5 flex flex-col justify-between">
          {activeTab === 'nexia' && (
            <div className="flex-1 flex flex-col justify-between h-full space-y-3">
              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto space-y-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    <div
                      className={`max-w-3xl min-w-0 p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none'
                          : 'bg-slate-900 text-slate-200 border border-slate-750 rounded-tl-none'
                      }`}
                    >
                      {m.sender === 'nexia' && (
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 mb-1">
                          <Bot className="w-3.5 h-3.5" />
                          <span>NEXIA · Asistente Cultural</span>
                        </div>
                      )}
                      {m.sender === 'user' ? <p>{m.text}</p> : <Markdown texto={m.text} />}
                      {m.sender === 'nexia' && (m.source || m.motor) && (
                        <div className="mt-2 pt-1.5 border-t border-slate-800 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-cyan-300/80 font-mono">
                          {m.motor && (
                            <span className="flex items-center gap-1">
                              {m.motor === 'gemini' ? <Globe className="w-3 h-3" /> : <Database className="w-3 h-3" />}
                              {m.motor === 'gemini' ? 'Agente Gemini + herramientas' : 'Motor local AFRONEXIA'}
                            </span>
                          )}
                          {m.source && <span>Base: {m.source}</span>}
                          {m.herramientas && m.herramientas.length > 0 && <span>Herramientas: {m.herramientas.join(', ')}</span>}
                        </div>
                      )}
                      {m.fuentes && m.fuentes.length > 0 && (
                        <details className="mt-1.5 group">
                          <summary className="cursor-pointer list-none flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200">
                            <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                            Fuentes ({m.fuentes.length})
                          </summary>
                          <ol className="mt-1 pl-5 list-decimal space-y-0.5 text-[11px] text-slate-400">
                            {m.fuentes.map((f, i) => (
                              <li key={i}>
                                <a href={f.url} target="_blank" rel="noreferrer noopener" className="text-cyan-300 hover:underline">
                                  {f.titulo}
                                </a>{' '}
                                · {f.entidad}
                                {f.fecha ? ` · ${f.fecha}` : ''}
                              </li>
                            ))}
                          </ol>
                        </details>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono px-1">{m.timestamp}</span>
                  </div>
                ))}
                {cargando && (
                  <div className="flex items-center gap-2 text-xs text-cyan-300 p-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    NEXIA está consultando la base de conocimiento…
                  </div>
                )}
                <div ref={finRef} />
              </div>

              {/* Suggested Quick Prompts */}
              <div className="space-y-1">
                <span className="hidden sm:inline text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Preguntas frecuentes del catálogo territorial:
                </span>
                <div className="flex gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      disabled={cargando}
                      className="disabled:opacity-60 shrink-0 max-w-[80vw] truncate sm:max-w-none sm:whitespace-normal sm:shrink px-2.5 py-1 text-[11px] rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-left transition-colors"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Box */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Pregúntale a NEXIA sobre patrimonio afro, rutas o saberes de Barrancabermeja..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => {
                    // Evita que las flechas/espacio cambien de pantalla de la presentación
                    e.stopPropagation();
                    if (e.key === 'Enter') handleSend();
                  }}
                  className="flex-1 px-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-750 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={cargando}
                  className="px-4 py-2 rounded-xl disabled:opacity-60 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Preguntar</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'explorador' && (
            <div className="flex-1 overflow-y-auto space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Catálogo de Atractivos Culturales Afrodescendientes</h3>
                <span className="text-xs text-slate-400">Filtros: Espacio Cultural · Sitio Natural · Gastronomía</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="h-28 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-cyan-400 font-mono">
                    [Fotografía Muelle Fluvial]
                  </div>
                  <div className="font-bold text-xs text-white">Paseo de la Cultura y Muelle</div>
                  <p className="text-[11px] text-slate-400">Punto de encuentro histórico de canoeros y pescadores artesanales.</p>
                  <div className="text-[10px] text-cyan-300 font-mono">Barrancabermeja · Acceso libre</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="h-28 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-amber-400 font-mono">
                    [Taller de Tambores Afro]
                  </div>
                  <div className="font-bold text-xs text-white">Casa Cultural Raíces del Río</div>
                  <p className="text-[11px] text-slate-400">Espacio de formación en percusión tradicional y danza de bullerengue.</p>
                  <div className="text-[10px] text-cyan-300 font-mono">Barrio El Arenal · Contacto directo</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="h-28 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-emerald-400 font-mono">
                    [Cocina Ribereña Tradicional]
                  </div>
                  <div className="font-bold text-xs text-white">Rincón Gastronómico Afro</div>
                  <p className="text-[11px] text-slate-400">Sancocho de bocachico y dulces tradicionales de las matronas ribereñas.</p>
                  <div className="text-[10px] text-cyan-300 font-mono">Sector Malecón · Horario 10:00 - 18:00</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'memoria' && (
            <div className="flex-1 overflow-y-auto space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Archivo Digital Comunitario de Saberes</h3>
                  <p className="text-xs text-slate-400">Preservación de memoria oral y saberes ancestrales con sus portadores</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">
                  + Registrar mis saberes
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Tradición Oral & Río</span>
                    <div className="font-bold text-white">Canto de Bogas y Leyendas del Río Magdalena</div>
                    <p className="text-slate-300 text-[11px]">Portador: Maestro Efraín Rivas (Pescador y sabedor cultural, 68 años).</p>
                  </div>
                  <span className="font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Validado
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Medicina Ancestral</span>
                    <div className="font-bold text-white">Botica Ribereña: Plantas medicinales para alivio de dolores</div>
                    <p className="text-slate-300 text-[11px]">Portadora: Sabedora Rosalba Mosquera (Matrona comunitaria, 74 años).</p>
                  </div>
                  <span className="font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Validado
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rutas' && (
            <div className="flex-1 overflow-y-auto space-y-4 animate-in fade-in">
              <h3 className="text-sm font-bold text-white">Circuitos y Rutas Turísticas Inteligentes</h3>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-cyan-300 text-sm">Circuito 01: La Memoria del Tambor y el Río</div>
                  <span className="text-xs font-mono text-amber-400">Duración: 3h 30m · 4 Paradas</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">1. Paseo Cultura</div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">2. Muelle Fluvial</div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">3. Taller Tambor</div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">4. Malecón Gastronómico</div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ruta asistida por GPS y recomendaciones contextuales basadas en la patente CN117076759 y la arquitectura validada en el boletín.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 px-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Prototipo desarrollado en el marco del programa ADSO · SENA Centro de Comercio</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
          >
            Regresar a la Presentación
          </button>
        </div>
      </div>
    </div>
  );
};
