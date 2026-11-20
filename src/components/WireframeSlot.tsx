import { Camera, Cpu, LayoutGrid } from 'lucide-react';

interface WireframeSlotProps {
  label: string;
  sublabel?: string;
  variant?: 'portrait' | 'inventory' | 'hardware';
  aspectClass?: string;
  className?: string;
}

export function WireframeSlot({
  label,
  sublabel,
  variant = 'inventory',
  aspectClass = 'aspect-[16/10]',
  className = '',
}: WireframeSlotProps) {
  const Icon =
    variant === 'portrait' ? Camera : variant === 'hardware' ? Cpu : LayoutGrid;

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-[#E4E4E7] bg-[#F4F4F5]/60 p-6 text-center transition-colors duration-200 group-hover:border-[#D4D4D8] group-hover:bg-[#F4F4F5]/90 ${aspectClass} ${className}`}
    >
      {/* Subtle inner wireframe guide */}
      <div className="pointer-events-none absolute inset-3 rounded-lg border border-dashed border-[#D4D4D8] transition-colors duration-200 group-hover:border-[#2563EB]/35" />

      {/* Subtle corner registration ticks that highlight in accent on group hover */}
      <span className="pointer-events-none absolute top-2 left-2 h-2 w-2 border-t border-l border-[#A1A1AA] transition-colors duration-200 group-hover:border-[#2563EB]" />
      <span className="pointer-events-none absolute top-2 right-2 h-2 w-2 border-t border-r border-[#A1A1AA] transition-colors duration-200 group-hover:border-[#2563EB]" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-2 w-2 border-b border-l border-[#A1A1AA] transition-colors duration-200 group-hover:border-[#2563EB]" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-2 w-2 border-b border-r border-[#A1A1AA] transition-colors duration-200 group-hover:border-[#2563EB]" />

      <div className="relative z-10 flex max-w-xs flex-col items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E4E4E7] bg-white text-[#52525B] transition-all duration-200 group-hover:scale-105 group-hover:border-[#2563EB]/30 group-hover:text-[#2563EB]">
          <Icon className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
        </div>
        <p className="font-mono text-xs font-medium tracking-tight text-[#111827]">
          {label}
        </p>
        {sublabel ? (
          <p className="text-xs leading-relaxed text-[#52525B]">{sublabel}</p>
        ) : null}
      </div>
    </div>
  );
}
