import { useState } from 'react';
import { Utensils } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackLabel?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackLabel,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1C1C21] via-[#27272C] to-[#141416] text-zinc-400 p-4 text-center ${className}`}
      >
        <Utensils className="w-7 h-7 text-[#EA580C]" aria-hidden="true" />
        <span className="text-xs font-medium text-zinc-300 max-w-[18ch] truncate">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
