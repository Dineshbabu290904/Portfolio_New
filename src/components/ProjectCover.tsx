import { useRef, type CSSProperties } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// Illustrated, animated cover for each project: a small motion graphic of what the project does,
// drawn in SVG so it is crisp, tiny and never breaks like a hotlinked image.
// Animations are CSS keyframes on transform/opacity only, and run only while the cover is on screen.

type CoverProps = { id: string; className?: string; label: string };

const P = 'rgb(var(--c-primary))';
const S = 'rgb(var(--c-secondary))';
const A = 'rgb(var(--c-accent))';
const INK = 'rgb(226 232 240)';

function Backdrop({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b1220" />
          <stop offset="1" stopColor="#111c33" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="0.75" cy="0.2" r="0.7">
          <stop offset="0" stopColor={S} stopOpacity="0.35" />
          <stop offset="1" stopColor={S} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`glow2-${id}`} cx="0.15" cy="0.9" r="0.6">
          <stop offset="0" stopColor={P} stopOpacity="0.55" />
          <stop offset="1" stopColor={P} stopOpacity="0" />
        </radialGradient>
        <pattern id={`grid-${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="white" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="480" height="270" fill={`url(#bg-${id})`} />
      <rect width="480" height="270" fill={`url(#grid-${id})`} />
      <rect width="480" height="270" fill={`url(#glow2-${id})`} />
      <rect width="480" height="270" fill={`url(#glow-${id})`} />
    </>
  );
}

// Three role portals (student, faculty, admin) floating in a stack, with a token lock pulsing.
function CmsArt() {
  const windows = [
    { x: 70, y: 60, title: 'Student', accent: S, delay: '0s' },
    { x: 170, y: 92, title: 'Faculty', accent: A, delay: '-1.6s' },
    { x: 270, y: 124, title: 'Admin', accent: P, delay: '-3.2s' },
  ];
  return (
    <>
      {windows.map((w) => (
        <g key={w.title} className="pc-float" style={{ animationDelay: w.delay }}>
          <rect x={w.x} y={w.y} width="150" height="104" rx="10" fill="#0f172a" stroke="white" strokeOpacity="0.14" />
          <rect x={w.x} y={w.y} width="150" height="22" rx="10" fill="white" fillOpacity="0.06" />
          <circle cx={w.x + 12} cy={w.y + 11} r="3" fill="#f87171" />
          <circle cx={w.x + 22} cy={w.y + 11} r="3" fill="#fbbf24" />
          <circle cx={w.x + 32} cy={w.y + 11} r="3" fill="#34d399" />
          <text x={w.x + 46} y={w.y + 15} fill={INK} fillOpacity="0.8" fontSize="9" fontFamily="JetBrains Mono Variable, monospace">{w.title}</text>
          <rect x={w.x + 12} y={w.y + 34} width="36" height="36" rx="18" fill={w.accent} fillOpacity="0.85" />
          <rect x={w.x + 58} y={w.y + 38} width="78" height="7" rx="3.5" fill="white" fillOpacity="0.5" />
          <rect x={w.x + 58} y={w.y + 52} width="56" height="6" rx="3" fill="white" fillOpacity="0.22" />
          <rect x={w.x + 12} y={w.y + 80} width="126" height="6" rx="3" fill="white" fillOpacity="0.14" />
          <rect x={w.x + 12} y={w.y + 90} width="96" height="6" rx="3" fill="white" fillOpacity="0.1" />
        </g>
      ))}
      <g transform="translate(410 60)">
        <circle r="22" fill={S} fillOpacity="0.15" className="pc-pulse" />
        <circle r="15" fill="#0f172a" stroke={S} strokeWidth="1.5" />
        <path d="M-5 -1v-3a5 5 0 0 1 10 0v3" fill="none" stroke={S} strokeWidth="1.8" />
        <rect x="-7" y="-1" width="14" height="10" rx="2" fill={S} />
      </g>
      <text x="380" y="98" fill={S} fontSize="8" fontFamily="JetBrains Mono Variable, monospace">JWT · RBAC</text>
    </>
  );
}

// An X-ray of a long bone; a scan line sweeps down and a detection box locks onto the fracture.
function BoneArt() {
  return (
    <>
      <g transform="translate(240 135) rotate(-28) scale(0.82)">
        <g fill="white" fillOpacity="0.1" stroke={INK} strokeOpacity="0.75" strokeWidth="2">
          <path d="M-150 -16 a20 20 0 1 1 18 -18 L132 -18 a20 20 0 1 1 18 18 a20 20 0 1 1 -18 18 L-132 18 a20 20 0 1 1 -18 -18 a20 20 0 0 1 0 -16 z" />
        </g>
        <path d="M18 -18 L10 -6 L22 2 L12 18" fill="none" stroke={A} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="pc-lock">
        <rect x="216" y="96" width="72" height="66" rx="6" fill="none" stroke={S} strokeWidth="2" strokeDasharray="12 8" />
        <rect x="216" y="78" width="66" height="16" rx="4" fill={S} />
        <text x="222" y="89" fill="#0b1220" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono Variable, monospace">FRACTURE</text>
      </g>
      <g className="pc-scan">
        <rect x="0" y="0" width="480" height="2" fill={S} fillOpacity="0.9" />
        <rect x="0" y="-36" width="480" height="36" fill={S} fillOpacity="0.08" />
      </g>
      <text x="28" y="244" fill={INK} fillOpacity="0.6" fontSize="9" fontFamily="JetBrains Mono Variable, monospace">CNN · X-RAY · 92% TEST ACCURACY</text>
    </>
  );
}

// Farm to buyer: produce travels along a direct route while a live price line ticks along below.
function MarketArt({ animate }: { animate: boolean }) {
  const route = 'M96 112 C 180 40, 300 40, 384 112';
  return (
    <>
      <path d={route} fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="4 6" />
      {animate &&
        [0, 1, 2].map((i) => (
          <circle key={i} r="5" fill={i === 1 ? A : S}>
            <animateMotion dur="3.6s" begin={`${i * -1.2}s`} repeatCount="indefinite" path={route} />
          </circle>
        ))}
      {[
        { x: 96, label: 'FARMER', color: S, icon: 'M-6 4c0-7 5-11 12-11-1 7-5 11-12 11zM-6 4l7-7' },
        { x: 384, label: 'BUYER', color: A, icon: 'M-7 -3h14l-2 10h-10zM-3 -3v-2a3 3 0 0 1 6 0v2' },
      ].map((n) => (
        <g key={n.label} transform={`translate(${n.x} 112)`}>
          <circle r="30" fill={n.color} fillOpacity="0.14" className="pc-pulse" />
          <circle r="22" fill="#0f172a" stroke={n.color} strokeWidth="2" />
          <path d={n.icon} fill="none" stroke={n.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text y="46" textAnchor="middle" fill={INK} fillOpacity="0.8" fontSize="9" fontFamily="JetBrains Mono Variable, monospace">{n.label}</text>
        </g>
      ))}
      <g transform="translate(60 196)">
        <rect width="360" height="50" rx="8" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.1" />
        <polyline points="12,38 52,30 92,34 132,22 172,26 212,14 252,20 292,10 332,16" fill="none" stroke={S} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="332" cy="16" r="4" fill={S} className="pc-pulse" />
        <text x="12" y="14" fill={INK} fillOpacity="0.6" fontSize="8" fontFamily="JetBrains Mono Variable, monospace">LIVE PRICE</text>
      </g>
    </>
  );
}

// A dashboard whose bars rise and fall like live data, next to a trend line and a KPI tile.
function DashboardArt() {
  const bars = [52, 86, 64, 110, 78, 124, 96];
  return (
    <>
      <rect x="40" y="40" width="250" height="190" rx="10" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.1" />
      <text x="56" y="62" fill={INK} fillOpacity="0.7" fontSize="9" fontFamily="JetBrains Mono Variable, monospace">BY CATEGORY</text>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={58 + i * 32}
          y={210 - h}
          width="20"
          height={h}
          rx="4"
          fill={i % 2 ? S : P}
          fillOpacity={i % 2 ? 0.9 : 1}
          className="pc-bar"
          style={{ animationDelay: `${i * -0.45}s` }}
        />
      ))}
      <rect x="306" y="40" width="134" height="84" rx="10" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.1" />
      <text x="320" y="62" fill={INK} fillOpacity="0.7" fontSize="9" fontFamily="JetBrains Mono Variable, monospace">ACTIVE FILTERS</text>
      <text x="320" y="104" fill="white" fontSize="30" fontWeight="800" fontFamily="Bricolage Grotesque Variable, sans-serif">12</text>
      <circle cx="420" cy="92" r="6" fill={S} className="pc-pulse" />
      <rect x="306" y="136" width="134" height="94" rx="10" fill="white" fillOpacity="0.04" stroke="white" strokeOpacity="0.1" />
      <polyline points="318,212 340,196 362,204 384,176 406,184 428,156" fill="none" stroke={A} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="428" cy="156" r="4" fill={A} />
    </>
  );
}

export default function ProjectCover({ id, className = '', label }: CoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: '120px' });
  const animate = inView && !reduced;
  // Same name on the card and the project page, so the browser morphs one into the other on navigation.
  const style = { viewTransitionName: `cover-${id}` } as CSSProperties;

  return (
    <div ref={ref} style={style} data-live={animate || undefined} className={`project-cover relative overflow-hidden bg-[#0b1220] ${className}`}>
      <svg viewBox="0 0 480 270" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} className="absolute inset-0 w-full h-full">
        <Backdrop id={id} />
        {id === 'cms' && <CmsArt />}
        {id === 'bone-fracture-detection' && <BoneArt />}
        {id === 'digimart' && <MarketArt animate={animate} />}
        {id === 'data-analytics-dashboard' && <DashboardArt />}
      </svg>
    </div>
  );
}
