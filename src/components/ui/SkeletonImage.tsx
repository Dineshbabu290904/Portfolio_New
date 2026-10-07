import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { Skeleton } from './Skeleton';

interface SkeletonImageProps {
  src: string;
  alt: string;
  className?: string;
}

// Shows a shimmering placeholder until the image loads, and a tidy fallback if it fails.
export default function SkeletonImage({ src, alt, className = '' }: SkeletonImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {status === 'loading' && <Skeleton className="absolute inset-0 rounded-none" />}
      {status === 'error' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/20 to-secondary/20 text-primary dark:text-primary-light">
          <ImageOff size={28} aria-hidden="true" />
          <span className="text-xs font-medium px-4 text-center">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`w-full h-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-105 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}
