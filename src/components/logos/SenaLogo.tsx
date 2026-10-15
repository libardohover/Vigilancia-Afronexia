import React from 'react';

interface SenaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const SenaLogo: React.FC<SenaLogoProps> = ({ className = '', size = 36, showText = false }) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        {/* Head circle */}
        <circle cx="50" cy="14" r="9" fill="#39A900" />
        
        {/* SENA Text */}
        <text
          x="50"
          y="35"
          fill="#39A900"
          fontSize="14.5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="0.05em"
        >
          SENA
        </text>

        {/* Arms horizontal bar */}
        <path
          d="M10 40H90V46C80 46 72 46 64 46C60 46 56 48 53 52L25 90H15L43 49C44.5 47 43 46 41 46H10V40Z"
          fill="#39A900"
        />

        {/* Inverted V Legs structure */}
        <path
          d="M50 49L75 90H65L47 57L29 90H19L47 50C48.5 48 51.5 48 53 50L81 90H71L50 56V49Z"
          fill="#39A900"
        />
        <path
          d="M90 40H10V46H38C40 46 41.5 47.5 40 49.5L15 88H25L49 53C50.5 51 53.5 51 55 53L79 88H89L64 49.5C62.5 47.5 64 46 66 46H90V40Z"
          fill="#39A900"
        />
      </svg>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className="font-extrabold text-xs text-[#39A900] tracking-wider">SENA</span>
          <span className="text-[10px] text-slate-300 font-medium">Centro de Comercio</span>
        </div>
      )}
    </div>
  );
};
