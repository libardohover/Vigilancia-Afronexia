import React from 'react';

interface GidtLogoProps {
  className?: string;
  size?: number;
  variant?: 'compact' | 'full';
  inverted?: boolean;
}

export const GidtLogo: React.FC<GidtLogoProps> = ({
  className = '',
  size = 40,
  variant = 'compact',
  inverted = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* 3D Isometric Innovative Cube Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Shadow base */}
        <ellipse cx="60" cy="108" rx="42" ry="7" fill="rgba(0,0,0,0.18)" />

        {/* Isometric Cube Faces (Left, Right, Top) with modular tiles */}
        {/* Top Face - Yellow / Orange / Gold */}
        <polygon points="60,20 90,36 60,52 30,36" fill="#FBBF24" />
        <polygon points="60,20 75,28 60,36 45,28" fill="#F59E0B" />
        <polygon points="75,28 90,36 75,44 60,36" fill="#D97706" />
        <polygon points="45,28 60,36 45,44 30,36" fill="#FCD34D" />

        {/* Left Face - Blue / Cyan tiles */}
        <polygon points="30,36 60,52 60,92 30,76" fill="#0284C7" />
        <polygon points="30,36 45,44 45,64 30,56" fill="#0369A1" />
        <polygon points="45,44 60,52 60,72 45,64" fill="#0EA5E9" />
        <polygon points="30,56 45,64 45,84 30,76" fill="#0284C7" />
        <polygon points="45,64 60,72 60,92 45,84" fill="#38BDF8" />

        {/* Right Face - Red / Orange / Green tiles */}
        <polygon points="60,52 90,36 90,76 60,92" fill="#E11D48" />
        <polygon points="60,52 75,44 75,64 60,72" fill="#BE123C" />
        <polygon points="75,44 90,36 90,56 75,64" fill="#16A34A" />
        <polygon points="60,72 75,64 75,84 60,92" fill="#F97316" />
        <polygon points="75,64 90,56 90,76 75,84" fill="#EA580C" />

        {/* Floating/Dispersing innovative digital tiles */}
        <rect x="94" y="24" width="10" height="12" rx="1.5" transform="rotate(20 94 24)" fill="#F59E0B" />
        <rect x="102" y="38" width="10" height="12" rx="1.5" transform="rotate(15 102 38)" fill="#10B981" />
        <rect x="96" y="52" width="10" height="12" rx="1.5" transform="rotate(-10 96 52)" fill="#EF4444" />
        <rect x="105" y="66" width="9" height="11" rx="1.5" transform="rotate(25 105 66)" fill="#0284C7" />
      </svg>

      {/* Typography & Hierarchy */}
      <div className="flex items-center gap-2">
        {/* Tricolor accent bar */}
        <div className="w-1 self-stretch rounded-full flex flex-col overflow-hidden shrink-0">
          <div className="h-2/5 bg-[#FBBF24]" />
          <div className="h-1.5/5 bg-[#0284C7]" />
          <div className="h-1.5/5 bg-[#EF4444]" />
        </div>

        <div className="flex flex-col text-left leading-tight">
          <span
            className={`font-black text-sm tracking-wider ${
              inverted ? 'text-white' : 'text-[#0F1E36]'
            }`}
          >
            GIDT
          </span>
          {variant === 'full' && (
            <div className="flex flex-col text-[8.5px] leading-tight text-slate-300 font-medium">
              <span className="font-bold text-amber-400">GRUPO DE INVESTIGACIÓN</span>
              <span>GESTIÓN DE LA INNOVACIÓN</span>
              <span>Y EL DESARROLLO TECNOLÓGICO</span>
            </div>
          )}
          {variant === 'compact' && (
            <span className="text-[9px] text-slate-400 font-medium">
              Grupo de Investigación SENNOVA
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
