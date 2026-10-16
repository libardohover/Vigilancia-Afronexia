/**
 * Renderizador Markdown mínimo y seguro (sin HTML crudo) para las respuestas de NEXIA.
 * Soporta: ### títulos, viñetas "- ", listas "1. ", líneas de continuación con sangría,
 * **negrita**, _cursiva_, `código` y [enlaces](https://…).
 */
import React from 'react';

function inline(texto: string, clave: string): React.ReactNode[] {
  const nodos: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;
  let ultimo = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(texto))) {
    if (m.index > ultimo) nodos.push(texto.slice(ultimo, m.index));
    const t = m[0];
    const k = `${clave}-${i++}`;
    if (t.startsWith('**')) nodos.push(<strong key={k} className="text-white font-semibold">{t.slice(2, -2)}</strong>);
    else if (t.startsWith('`')) nodos.push(<code key={k} className="px-1 rounded bg-slate-800 text-amber-300 text-[0.9em]">{t.slice(1, -1)}</code>);
    else if (t.startsWith('[')) {
      const mm = t.match(/^\[([^\]]+)\]\((.+)\)$/)!;
      nodos.push(
        <a key={k} href={mm[2]} target="_blank" rel="noreferrer noopener" className="text-cyan-300 underline underline-offset-2">
          {mm[1]}
        </a>,
      );
    } else nodos.push(<em key={k} className="text-slate-400">{t.slice(1, -1)}</em>);
    ultimo = m.index + t.length;
  }
  if (ultimo < texto.length) nodos.push(texto.slice(ultimo));
  return nodos;
}

export const Markdown: React.FC<{ texto: string }> = ({ texto }) => {
  const bloques: React.ReactNode[] = [];
  const lineas = texto.split('\n');
  let lista: { tipo: 'ul' | 'ol'; items: React.ReactNode[][] } | null = null;

  const cerrarLista = () => {
    if (!lista) return;
    const k = `l${bloques.length}`;
    const items = lista.items.map((partes, i) => (
      <li key={i} className="pl-1">
        {partes}
      </li>
    ));
    bloques.push(
      lista.tipo === 'ul' ? (
        <ul key={k} className="list-disc pl-5 space-y-1.5 marker:text-cyan-500">{items}</ul>
      ) : (
        <ol key={k} className="list-decimal pl-5 space-y-1.5 marker:text-cyan-500">{items}</ol>
      ),
    );
    lista = null;
  };

  lineas.forEach((cruda, idx) => {
    const linea = cruda.trimEnd();
    const k = `b${idx}`;
    const vineta = linea.match(/^\s*-\s+(.*)$/);
    const numero = linea.match(/^\s*\d+\.\s+(.*)$/);
    const continuacion = /^\s{2,}\S/.test(cruda) && lista && !vineta && !numero;

    if (continuacion && lista) {
      lista.items[lista.items.length - 1].push(
        <span key={k} className="block mt-0.5 text-amber-200/90 text-[0.95em]">{inline(linea.trim(), k)}</span>,
      );
      return;
    }
    if (vineta || numero) {
      const tipo = vineta ? 'ul' : 'ol';
      if (!lista || lista.tipo !== tipo) {
        cerrarLista();
        lista = { tipo, items: [] };
      }
      lista.items.push(inline((vineta ?? numero)![1], k));
      return;
    }
    cerrarLista();
    if (!linea.trim()) return;
    if (linea.startsWith('### ') || linea.startsWith('#### ')) {
      bloques.push(
        <h4 key={k} className="mt-3 mb-1 text-[0.95rem] font-bold text-amber-300">
          {inline(linea.replace(/^#+\s/, ''), k)}
        </h4>,
      );
    } else if (linea.startsWith('## ') || linea.startsWith('# ')) {
      bloques.push(<h3 key={k} className="mt-3 mb-1 text-base font-bold text-white">{inline(linea.replace(/^#+\s/, ''), k)}</h3>);
    } else {
      bloques.push(<p key={k} className="my-1">{inline(linea, k)}</p>);
    }
  });
  cerrarLista();
  return <div className="space-y-1 leading-relaxed">{bloques}</div>;
};
