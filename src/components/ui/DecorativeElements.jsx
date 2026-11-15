import React from 'react';

// ─── KalaSetu Lotus Logo Mark ──────────────────────────────────────────────────
// Minimal, distinctive lotus emblem with subtle Indian heritage influences & bridge cradle
export function LotusLogo({ size = 36, className = '' }) {
  return (
    <svg
      viewBox="0 0 36 36"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Setu / Foundation Bridge Base Arc */}
      <path
        d="M6 26.5 Q18 31 30 26.5"
        stroke="#D5B77A"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Outer Flanking Petals (Left & Right) */}
      <path
        d="M18 25 C13 24 7 19 8 13 C12 12 15 16 18 25 Z"
        fill="#9D4935"
        opacity="0.8"
      />
      <path
        d="M18 25 C23 24 29 19 28 13 C24 12 21 16 18 25 Z"
        fill="#9D4935"
        opacity="0.8"
      />

      {/* Mid Accent Petals */}
      <path
        d="M18 25 C14 21 11 16 12 10.5 C15 11 17 15 18 25 Z"
        fill="#D5B77A"
        opacity="0.55"
      />
      <path
        d="M18 25 C22 21 25 16 24 10.5 C21 11 19 15 18 25 Z"
        fill="#D5B77A"
        opacity="0.55"
      />

      {/* Central Flame / Lotus Bud Petal */}
      <path
        d="M18 6 C16 11 15 18 18 25 C21 18 20 11 18 6 Z"
        fill="#9D4935"
      />

      {/* Center Sacred Bindu Dot */}
      <circle cx="18" cy="18" r="1.8" fill="#F7F3EA" />
      <circle cx="18" cy="18" r="1.1" fill="#D5B77A" />

      {/* Delicate Apex Accent */}
      <circle cx="18" cy="4.5" r="1" fill="#D5B77A" opacity="0.9" />
    </svg>
  );
}

// ─── Traditional Madhubani Peacock (Welcome Banner) ───────────────────────────
// Intricate linework, double contours, kachni hatching, earthy tones (terracotta, olive, ochre, brown)
export function PeacockIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 190 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* ── Soft Ochre Background Radiance ── */}
      <ellipse cx="102" cy="120" rx="68" ry="60" fill="#D5B77A" opacity="0.07" />

      {/* ── Sweeping Tail Feather Plumes (Fine Traditional Arcs) ── */}
      {[
        { x: 42, y: 75, r: -58 },
        { x: 55, y: 64, r: -40 },
        { x: 72, y: 58, r: -22 },
        { x: 92, y: 56, r: -5 },
        { x: 112, y: 59, r: 12 },
        { x: 130, y: 68, r: 28 },
        { x: 145, y: 82, r: 45 },
      ].map((pos, i) => (
        <g key={`shaft-${i}`}>
          {/* Feather quill shaft */}
          <line
            x1="102" y1="135"
            x2={pos.x} y2={pos.y}
            stroke="#9D4935"
            strokeWidth="0.8"
            opacity="0.4"
          />
          {/* Feather eye medallion (Chandrika) */}
          <g transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}>
            {/* Outer petal ring */}
            <ellipse cx="0" cy="0" rx="9" ry="11" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.45" />
            <ellipse cx="0" cy="0" rx="6" ry="8" fill="#354B3D" opacity="0.3" />
            <ellipse cx="0" cy="0" rx="3.5" ry="5" fill="#9D4935" opacity="0.6" />
            <circle cx="0" cy="0" r="1.5" fill="#D5B77A" opacity="0.85" />
            {/* Fine fringe rays */}
            {[-30, 0, 30].map((deg, di) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={di}
                  x1={Math.sin(rad) * 9} y1={-Math.cos(rad) * 11}
                  x2={Math.sin(rad) * 13} y2={-Math.cos(rad) * 15}
                  stroke="#9D4935"
                  strokeWidth="0.6"
                  opacity="0.4"
                />
              );
            })}
          </g>
        </g>
      ))}

      {/* ── Inner Feather Hatching Lines (Kachni Style) ── */}
      <path
        d="M70 120 Q90 100 115 108 M65 130 Q92 110 122 120 M75 142 Q100 125 128 132"
        stroke="#D5B77A"
        strokeWidth="0.7"
        strokeDasharray="2.5 1.5"
        fill="none"
        opacity="0.35"
      />

      {/* ── Peacock Body ── */}
      {/* Outer contour double-line */}
      <ellipse cx="104" cy="138" rx="19" ry="24" stroke="#9D4935" strokeWidth="0.8" fill="none" opacity="0.4" />
      {/* Solid filled body */}
      <ellipse cx="104" cy="138" rx="17" ry="22" fill="#354B3D" opacity="0.85" />

      {/* Traditional belly scales (Kachni pattern) */}
      {[127, 133, 139, 145].map((y, i) => (
        <path
          key={i}
          d={`M${93 + i} ${y} Q104 ${y - 4} ${115 - i} ${y}`}
          stroke="#D5B77A"
          strokeWidth="0.8"
          fill="none"
          opacity="0.45"
        />
      ))}
      <ellipse cx="104" cy="140" rx="8" ry="11" fill="#4A6655" opacity="0.5" />

      {/* ── Arching S-Neck ── */}
      <path
        d="M98 120 Q94 102 98 88 Q101 78 107 72"
        stroke="#354B3D"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner fine decorative neck line */}
      <path
        d="M98 120 Q94 102 98 88 Q101 78 107 72"
        stroke="#D5B77A"
        strokeWidth="0.8"
        strokeDasharray="2 1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />

      {/* ── Head ── */}
      <ellipse cx="110" cy="68" rx="10" ry="8.5" fill="#354B3D" opacity="0.95" />
      {/* Head double outline */}
      <ellipse cx="110" cy="68" rx="11" ry="9.5" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.5" />

      {/* ── Royal Crest (Kalgi) – 3 Sprigs ── */}
      {[
        { cx: 104, cy: 50, qx: 106, qy: 58 },
        { cx: 110, cy: 46, qx: 110, qy: 56 },
        { cx: 116, cy: 49, qx: 114, qy: 58 },
      ].map((crest, i) => (
        <g key={i}>
          <path
            d={`M110 62 Q${crest.qx} ${crest.qy} ${crest.cx} ${crest.cy}`}
            stroke="#9D4935"
            strokeWidth="0.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <circle cx={crest.cx} cy={crest.cy} r="2" fill="#9D4935" opacity="0.8" />
          <circle cx={crest.cx} cy={crest.cy} r="0.9" fill="#D5B77A" />
        </g>
      ))}

      {/* ── Eye (Traditional Mithila Almond Kohl Eye) ── */}
      <ellipse cx="113" cy="67.5" rx="4" ry="3.2" fill="#F7F3EA" />
      <ellipse cx="113.5" cy="67.5" rx="2.2" ry="2.2" fill="#49372B" />
      <circle cx="114.2" cy="67" r="0.7" fill="#FFFFFF" />
      {/* Extended kohl eyeliner flick */}
      <path d="M109 68 Q113 65 117 67" stroke="#49372B" strokeWidth="0.6" fill="none" />

      {/* ── Beak ── */}
      <path d="M118 69.5 L126 69 L118 72 Z" fill="#D5B77A" opacity="0.95" />
      <line x1="118" y1="70.5" x2="125" y2="70" stroke="#B89A5A" strokeWidth="0.4" />

      {/* ── Legs & Talons ── */}
      <line x1="97" y1="158" x2="94" y2="178" stroke="#9D4935" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <line x1="110" y1="158" x2="114" y2="178" stroke="#9D4935" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      {/* Gripping feet */}
      <path d="M90 178 L94 178 L97 182" stroke="#9D4935" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M111 178 L114 178 L117 182" stroke="#9D4935" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

      {/* ── Slender Botanical Perch Branch ── */}
      <path
        d="M48 186 Q95 180 148 187"
        stroke="#9D4935"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      {/* Fine branch leaf pairs */}
      {[
        { x: 65, y: 182, rot: -25 },
        { x: 78, y: 179, rot: -15 },
        { x: 128, y: 181, rot: 15 },
        { x: 140, y: 184, rot: 30 },
      ].map((leaf, i) => (
        <ellipse
          key={i}
          cx={leaf.x} cy={leaf.y}
          rx="6" ry="2.8"
          fill="#354B3D"
          opacity="0.35"
          transform={`rotate(${leaf.rot} ${leaf.x} ${leaf.y})`}
        />
      ))}

      {/* Small terminal blossom buds */}
      <circle cx="50" cy="188" r="2.5" fill="#9D4935" opacity="0.3" />
      <circle cx="50" cy="188" r="1.2" fill="#D5B77A" opacity="0.6" />
      <circle cx="147" cy="189" r="2.5" fill="#9D4935" opacity="0.3" />
      <circle cx="147" cy="189" r="1.2" fill="#D5B77A" opacity="0.6" />
    </svg>
  );
}

// ─── Refined Warli Heritage Border (Dashboard Footer) ─────────────────────────
// Low profile (16px), slender lines, muted terracotta, varied non-monotonous tribal motifs
export function WarliDivider({ className = '' }) {
  return (
    <svg
      viewBox="0 0 600 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Slender ground line across whole width */}
      <line x1="0" y1="12" x2="600" y2="12" stroke="#9D4935" strokeWidth="0.5" opacity="0.22" />

      {/* Motif 1 (x=30): Diamond accent bead */}
      <polygon points="30,12 33,9 36,12 33,15" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.3" />
      <circle cx="33" cy="12" r="0.9" fill="#D5B77A" opacity="0.45" />

      {/* Motif 2 (x=100): Two Warli dancers holding hands */}
      <g transform="translate(100, 3)">
        {/* Dancer 1 */}
        <circle cx="0" cy="0" r="1.8" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
        <polygon points="0,2 -2.5,7 2.5,7" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
        <line x1="-3" y1="4" x2="3" y2="3" stroke="#9D4935" strokeWidth="0.6" strokeLinecap="round" opacity="0.35" />
        <line x1="-2" y1="7" x2="-2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
        <line x1="2" y1="7" x2="2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />

        {/* Hand link */}
        <line x1="3" y1="3" x2="7" y2="3" stroke="#9D4935" strokeWidth="0.6" opacity="0.3" />

        {/* Dancer 2 */}
        <g transform="translate(10, 0)">
          <circle cx="0" cy="0" r="1.8" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
          <polygon points="0,2 -2.5,7 2.5,7" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
          <line x1="-3" y1="3" x2="3" y2="4" stroke="#9D4935" strokeWidth="0.6" strokeLinecap="round" opacity="0.35" />
          <line x1="-2" y1="7" x2="-2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
          <line x1="2" y1="7" x2="2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
        </g>
      </g>

      {/* Motif 3 (x=210): Miniature branching sacred tree */}
      <g transform="translate(210, 2)">
        <line x1="0" y1="4" x2="0" y2="10" stroke="#354B3D" strokeWidth="0.8" opacity="0.25" />
        <line x1="0" y1="5" x2="-4" y2="2" stroke="#354B3D" strokeWidth="0.5" opacity="0.22" />
        <line x1="0" y1="5" x2="4" y2="2" stroke="#354B3D" strokeWidth="0.5" opacity="0.22" />
        <line x1="0" y1="7" x2="-3" y2="5" stroke="#354B3D" strokeWidth="0.5" opacity="0.22" />
        <line x1="0" y1="7" x2="3" y2="5" stroke="#354B3D" strokeWidth="0.5" opacity="0.22" />
        <circle cx="0" cy="2" r="1.2" fill="#D5B77A" opacity="0.35" />
      </g>

      {/* Motif 4 (x=300): Center Flute Player under miniature Sun */}
      <g transform="translate(300, 3)">
        <circle cx="0" cy="0" r="1.8" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
        <polygon points="0,2 -2.5,7 2.5,7" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
        {/* Flute */}
        <line x1="0" y1="3" x2="6" y2="1" stroke="#D5B77A" strokeWidth="0.7" opacity="0.5" />
        <line x1="-2" y1="7" x2="-2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
        <line x1="2" y1="7" x2="2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
        {/* Miniature solar rays */}
        <circle cx="12" cy="0" r="1.5" stroke="#D5B77A" strokeWidth="0.5" fill="none" opacity="0.35" />
      </g>

      {/* Motif 5 (x=390): Slender figure with grain basket */}
      <g transform="translate(390, 3)">
        <circle cx="0" cy="0" r="1.8" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
        <polygon points="0,2 -2.5,7 2.5,7" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
        <line x1="-2" y1="7" x2="-2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
        <line x1="2" y1="7" x2="2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
        {/* Basket */}
        <path d="M-4 -1 Q0 -2 4 -1" stroke="#9D4935" strokeWidth="0.7" fill="none" opacity="0.35" />
      </g>

      {/* Motif 6 (x=490): Two dancers celebrating */}
      <g transform="translate(490, 3)">
        <circle cx="0" cy="0" r="1.8" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
        <polygon points="0,2 -2.5,7 2.5,7" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
        <line x1="-3" y1="4" x2="3" y2="3" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
        <line x1="-2" y1="7" x2="-2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
        <line x1="2" y1="7" x2="2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />

        <line x1="3" y1="3" x2="7" y2="3" stroke="#9D4935" strokeWidth="0.6" opacity="0.3" />

        <g transform="translate(10, 0)">
          <circle cx="0" cy="0" r="1.8" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
          <polygon points="0,2 -2.5,7 2.5,7" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.35" />
          <line x1="-3" y1="3" x2="3" y2="4" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
          <line x1="-2" y1="7" x2="-2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
          <line x1="2" y1="7" x2="2.5" y2="9" stroke="#9D4935" strokeWidth="0.6" opacity="0.35" />
        </g>
      </g>

      {/* Motif 7 (x=570): Ending Diamond Accent */}
      <polygon points="570,12 573,9 576,12 573,15" stroke="#9D4935" strokeWidth="0.6" fill="none" opacity="0.3" />
      <circle cx="573" cy="12" r="0.9" fill="#D5B77A" opacity="0.45" />
    </svg>
  );
}

// ─── Botanical Leaf Sprig (My Artwork Title Accent) ──────────────────────────
export function BotanicalSprig({ className = '' }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 24 Q12 18 24 4"
        stroke="#D5B77A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M12 18 C8 15 8 11 14 14 C15 17 14 18 12 18 Z"
        fill="#D5B77A"
        opacity="0.85"
      />
      <path
        d="M18 12 C18 7 22 7 20 12 C19 14 18 13 18 12 Z"
        fill="#D5B77A"
        opacity="0.85"
      />
      <path
        d="M22 6 C20 2 25 1 25 5 C24 7 23 7 22 6 Z"
        fill="#D5B77A"
        opacity="0.9"
      />
    </svg>
  );
}

// ─── Header Background Peacock (My Artwork Header Background) ─────────────────
// Soft, golden-ochre traditional peacock with branch as in reference image
export function HeaderPeacock({ className = '' }) {
  return (
    <svg
      viewBox="0 0 240 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Branch running from left to center */}
      <path
        d="M10 95 Q60 85 110 90 Q150 92 185 85"
        stroke="#D5B77A"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Leaves along branch */}
      {[
        { x: 30, y: 92, rot: -30 },
        { x: 50, y: 88, rot: 25 },
        { x: 75, y: 88, rot: -20 },
        { x: 95, y: 90, rot: 30 },
        { x: 125, y: 90, rot: -15 },
        { x: 145, y: 88, rot: 25 },
      ].map((leaf, i) => (
        <path
          key={i}
          d={`M${leaf.x} ${leaf.y} C${leaf.x - 6} ${leaf.y - 10} ${leaf.x + 8} ${leaf.y - 12} ${leaf.x + 12} ${leaf.y} C${leaf.x + 6} ${leaf.y + 4} ${leaf.x} ${leaf.y + 2} ${leaf.x} ${leaf.y} Z`}
          fill="#D5B77A"
          opacity="0.45"
          transform={`rotate(${leaf.rot} ${leaf.x} ${leaf.y})`}
        />
      ))}

      {/* Peacock Perched on Right */}
      <g transform="translate(185, 45)">
        {/* Tail Feathers - Sweeping leftward along branch */}
        <path
          d="M-5 40 Q-35 38 -65 42 Q-30 46 -5 45"
          fill="#D5B77A"
          opacity="0.3"
        />
        {/* Tail Feather details */}
        {[-15, -35, -55].map((tx, idx) => (
          <ellipse
            key={idx}
            cx={tx} cy={40 + (idx % 2 ? -2 : 2)}
            rx="5" ry="3.5"
            fill="#D5B77A"
            stroke="#9D4935"
            strokeWidth="0.6"
            opacity="0.5"
          />
        ))}

        {/* Peacock Body */}
        <ellipse cx="6" cy="35" rx="14" ry="16" fill="#D5B77A" opacity="0.6" />
        <ellipse cx="6" cy="35" rx="14" ry="16" stroke="#9D4935" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* Body feather scales */}
        <path d="M-2 30 Q6 26 14 30 M-4 35 Q6 31 16 35" stroke="#9D4935" strokeWidth="0.7" fill="none" opacity="0.5" />

        {/* Neck */}
        <path
          d="M12 28 Q18 16 16 6"
          stroke="#D5B77A"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M12 28 Q18 16 16 6"
          stroke="#9D4935"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />

        {/* Head */}
        <circle cx="16" cy="4" r="6" fill="#D5B77A" opacity="0.75" />
        <circle cx="16" cy="4" r="6" stroke="#9D4935" strokeWidth="0.7" fill="none" opacity="0.6" />
        {/* Eye */}
        <circle cx="17.5" cy="3.5" r="1.2" fill="#49372B" />
        {/* Beak */}
        <path d="M21 4 L26 3 L21 6 Z" fill="#D5B77A" stroke="#9D4935" strokeWidth="0.5" opacity="0.8" />

        {/* Crest Feathers */}
        <line x1="15" y1="-2" x2="13" y2="-8" stroke="#9D4935" strokeWidth="0.8" opacity="0.7" />
        <circle cx="13" cy="-9" r="1.3" fill="#D5B77A" stroke="#9D4935" strokeWidth="0.5" />
        <line x1="17" y1="-2" x2="18" y2="-9" stroke="#9D4935" strokeWidth="0.8" opacity="0.7" />
        <circle cx="18" cy="-10" r="1.3" fill="#D5B77A" stroke="#9D4935" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

// ─── Sidebar Bottom Floral Motif ──────────────────────────────────────────────
export function SidebarFloral({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main Curved Stem */}
      <path
        d="M10 115 Q30 90 25 60 Q20 35 45 15"
        stroke="#9D4935"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Side Branch */}
      <path
        d="M25 65 Q45 55 55 40"
        stroke="#9D4935"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M18 90 Q35 85 45 75"
        stroke="#9D4935"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Leaves in forest green & ochre */}
      <ellipse cx="28" cy="52" rx="7" ry="3.5" fill="#354B3D" opacity="0.35" transform="rotate(-30 28 52)" />
      <ellipse cx="40" cy="46" rx="6" ry="3" fill="#354B3D" opacity="0.3" transform="rotate(25 40 46)" />
      <ellipse cx="32" cy="78" rx="7" ry="3.5" fill="#354B3D" opacity="0.32" transform="rotate(-40 32 78)" />
      <ellipse cx="20" cy="38" rx="5" ry="2.5" fill="#D5B77A" opacity="0.5" transform="rotate(-20 20 38)" />

      {/* Top Blossom */}
      <circle cx="45" cy="15" r="4.5" fill="#9D4935" opacity="0.4" />
      <circle cx="45" cy="15" r="2.2" fill="#D5B77A" opacity="0.7" />
      {/* Side Blossoms */}
      <circle cx="55" cy="40" r="3.5" fill="#9D4935" opacity="0.35" />
      <circle cx="55" cy="40" r="1.8" fill="#D5B77A" opacity="0.6" />
      <circle cx="45" cy="75" r="3" fill="#9D4935" opacity="0.35" />
      <circle cx="45" cy="75" r="1.5" fill="#D5B77A" opacity="0.6" />
    </svg>
  );
}
