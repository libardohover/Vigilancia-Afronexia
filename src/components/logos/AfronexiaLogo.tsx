import React from 'react';

interface AfronexiaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  showSubtitle?: boolean;
}

export const AfronexiaLogo: React.FC<AfronexiaLogoProps> = ({
  className = '',
  size = 'md',
  showSlogan = false,
  showSubtitle = false,
}) => {
  const iconSizes = {
    sm: 32,
    md: 42,
    lg: 64,
    xl: 96,
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const iconPx = iconSizes[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Emblem SVG: Afro Woman, Turban, Circuitry & Bridge in "A" */}
      <svg
        width={iconPx}
        height={iconPx}
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md"
      >
        <defs>
          <linearGradient id="afronexiaGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A859" />
            <stop offset="100%" stopColor="#005728" />
          </linearGradient>
          <linearGradient id="afronexiaOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA000" />
            <stop offset="50%" stopColor="#FF6600" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>
          <linearGradient id="riverBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0071BC" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* Circular tech circuit nodes in the background */}
        <circle cx="108" cy="24" r="5" fill="#FF6600" />
        <circle cx="122" cy="38" r="4" fill="#00A859" />
        <circle cx="114" cy="56" r="4" fill="#FF6600" />
        <circle cx="126" cy="68" r="3.5" fill="#00A859" />
        <path d="M96 32H108M108 24V32M114 42H122M106 50H114M114 56V64H126" stroke="#00A859" strokeWidth="2.2" strokeLinecap="round" />

        {/* Dynamic Stylized Capital "A" arch in green */}
        <path
          d="M74 18L106 112H88L81 90H56L49 112H30L62 18H74Z"
          fill="url(#afronexiaGreen)"
        />

        {/* Bridge & River Silhouette inside the "A" */}
        <path d="M54 74C65 74 74 72 82 74V84H54V74Z" fill="url(#riverBlue)" />
        {/* Bridge pillars */}
        <line x1="60" y1="67" x2="60" y2="76" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="70" y1="65" x2="70" y2="76" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="80" y1="67" x2="80" y2="76" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M56 68Q70 63 84 68" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />

        {/* Sunset Sun */}
        <circle cx="78" cy="54" r="10" fill="#FFB800" />

        {/* Afro-descendant woman silhouette with traditional turban */}
        {/* Face Profile */}
        <path
          d="M26 62C26 50 34 40 45 40C45 48 41 56 42 63C43 70 47 74 46 80C45 86 38 90 32 88C27 86 26 78 26 62Z"
          fill="#452718"
        />
        {/* Earring with gold hoop */}
        <circle cx="43" cy="74" r="7" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />

        {/* Patterned Turban (Emerald Green, Vibrant Orange, Yellow) */}
        <path
          d="M32 40C32 25 45 16 60 16C68 16 75 22 76 30C66 28 54 32 46 38C38 42 34 38 32 40Z"
          fill="url(#afronexiaOrange)"
        />
        <path
          d="M38 28C44 20 54 18 64 22C56 26 48 30 40 38C36 34 37 30 38 28Z"
          fill="url(#afronexiaGreen)"
        />
        <path
          d="M48 20L52 26M54 18L58 24M60 19L64 25"
          stroke="#FDE047"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Location Pin Marker on Riverbank */}
        <path
          d="M102 78C102 73 106 69 111 69C116 69 120 73 120 78C120 84 111 94 111 94C111 94 102 84 102 78Z"
          fill="#FF5500"
        />
        <circle cx="111" cy="78" r="3.5" fill="#FFFFFF" />
      </svg>

      {/* Brand Typography Lockup */}
      <div className="flex flex-col text-left leading-none">
        <div className="flex items-baseline font-black tracking-tight select-none">
          {/* AFRO in emerald green */}
          <span className={`text-[#00A859] ${textSizes[size]}`}>
            AFR
          </span>
          {/* Drum inside O */}
          <span className={`relative inline-flex items-center justify-center text-[#00A859] ${textSizes[size]}`}>
            O
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-2.5 h-3 bg-[#FF6600] rounded-sm ring-1 ring-[#005728]" />
            </span>
          </span>
          {/* NEXIA in vibrant orange */}
          <span className={`bg-gradient-to-r from-[#FF6600] via-[#FF7A00] to-[#FFA000] bg-clip-text text-transparent ${textSizes[size]}`}>
            NEXIA
          </span>
        </div>

        {/* Slogan */}
        {showSlogan && (
          <span className="text-[10px] sm:text-[11px] text-[#FFA000] font-medium italic tracking-wide mt-0.5">
            Conectando raíces, creando experiencias
          </span>
        )}

        {/* Subtitle */}
        {showSubtitle && (
          <div className="flex items-center gap-1.5 text-[8.5px] font-bold text-slate-300 tracking-wider uppercase mt-1">
            <span className="text-[#00A859]">Cultura</span>
            <span className="text-amber-400">·</span>
            <span className="text-[#FF7A00]">Turismo</span>
            <span className="text-amber-400">·</span>
            <span className="text-[#0284C7]">Innovación</span>
          </div>
        )}
      </div>
    </div>
  );
};
