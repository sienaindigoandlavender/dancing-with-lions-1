'use client'

import { useState, useEffect, useRef } from 'react'

// ═══ DATA ═══
// Sources: FAO, Statista, Office des Changes, USDA FAS, EastFruit
// Most recent available data (2022-2024)

const CROPS = [
  {
    name: 'Tomatoes',
    value: 1050,
    unit: '$1.05B',
    share: '60% of veg exports',
    note: '#1 non-EU supplier to Europe',
    region: 'Souss-Massa',
    color: '#E63946',
    emoji: '🍅',
    // SVG illustration inline
    illustration: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="40" cy="44" r="28" fill="#E63946" />
        <circle cx="40" cy="44" r="28" fill="url(#tomato-shine)" />
        <ellipse cx="40" cy="20" rx="12" ry="5" fill="#4a7c2e" />
        <path d="M40 15 L38 8 M40 15 L42 7 M40 15 L36 9" stroke="#4a7c2e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="33" cy="38" rx="4" ry="6" fill="rgba(255,255,255,0.15)" transform="rotate(-15 33 38)" />
        <defs>
          <radialGradient id="tomato-shine" cx="35%" cy="35%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Berries',
    value: 750,
    unit: '$750M',
    share: 'Blueberries, raspberries, strawberries',
    note: '60% of fruit export growth since 2016',
    region: 'Gharb, Loukkos, Dakhla',
    color: '#5E60CE',
    emoji: '🫐',
    illustration: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="30" cy="45" r="14" fill="#5E60CE" />
        <circle cx="50" cy="42" r="12" fill="#7B2D8E" />
        <circle cx="40" cy="55" r="13" fill="#3A0CA3" />
        <circle cx="30" cy="45" r="14" fill="url(#berry-shine)" />
        <circle cx="50" cy="42" r="12" fill="url(#berry-shine2)" />
        <circle cx="40" cy="55" r="13" fill="url(#berry-shine3)" />
        {/* Crown details on blueberries */}
        <circle cx="28" cy="33" r="1.5" fill="#4a4a8a" />
        <circle cx="32" cy="32" r="1.5" fill="#4a4a8a" />
        <circle cx="30" cy="34" r="1" fill="#4a4a8a" />
        <path d="M22 28 C25 26, 28 25, 30 27" stroke="#4a7c2e" strokeWidth="1.5" fill="none" />
        <path d="M48 30 C50 28, 53 29, 52 31" stroke="#4a7c2e" strokeWidth="1.5" fill="none" />
        <defs>
          <radialGradient id="berry-shine" cx="30%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
          </radialGradient>
          <radialGradient id="berry-shine2" cx="35%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
          </radialGradient>
          <radialGradient id="berry-shine3" cx="30%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Citrus',
    value: 451,
    unit: '$451M',
    share: 'Clementines, oranges, mandarins',
    note: '597K tons exported 2024/25 season',
    region: 'Souss-Massa, Gharb, Oriental',
    color: '#F77F00',
    emoji: '🍊',
    illustration: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <circle cx="40" cy="42" r="26" fill="#F77F00" />
        <circle cx="40" cy="42" r="26" fill="url(#orange-shine)" />
        {/* Texture dots */}
        {[...Array(12)].map((_, i) => (
          <circle key={i} cx={30 + Math.cos(i * 0.52) * 15} cy={34 + Math.sin(i * 0.52) * 15} r="0.8" fill="rgba(255,255,255,0.15)" />
        ))}
        <ellipse cx="40" cy="18" rx="6" ry="3" fill="#4a7c2e" />
        <path d="M40 15 L40 10" stroke="#5a3a1e" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 12 C46 8, 50 10, 48 14" stroke="#4a7c2e" strokeWidth="1.5" fill="#5a9e3e" opacity="0.8" />
        <defs>
          <radialGradient id="orange-shine" cx="35%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Olives & Olive Oil',
    value: 380,
    unit: '$380M',
    share: '1M+ hectares · ancient groves',
    note: '6th largest producer globally',
    region: 'Fes-Meknes, Marrakech-Safi',
    color: '#6b8e23',
    emoji: '🫒',
    illustration: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <ellipse cx="32" cy="42" rx="12" ry="16" fill="#6b8e23" transform="rotate(-10 32 42)" />
        <ellipse cx="50" cy="46" rx="11" ry="14" fill="#556b2f" transform="rotate(8 50 46)" />
        <ellipse cx="32" cy="42" rx="12" ry="16" fill="url(#olive-shine)" transform="rotate(-10 32 42)" />
        <ellipse cx="50" cy="46" rx="11" ry="14" fill="url(#olive-shine2)" transform="rotate(8 50 46)" />
        {/* Stems */}
        <path d="M32 26 C30 20, 35 16, 40 14" stroke="#5a3a1e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M50 32 C52 26, 48 20, 42 16" stroke="#5a3a1e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Leaves */}
        <ellipse cx="44" cy="12" rx="8" ry="3" fill="#7cad3a" transform="rotate(-20 44 12)" />
        <ellipse cx="36" cy="14" rx="6" ry="2.5" fill="#6b9e30" transform="rotate(15 36 14)" />
        <defs>
          <radialGradient id="olive-shine" cx="30%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </radialGradient>
          <radialGradient id="olive-shine2" cx="35%" cy="25%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Green Beans',
    value: 220,
    unit: '$220M',
    share: '#2 vegetable export',
    note: 'Mainly to EU fresh market',
    region: 'Souss-Massa',
    color: '#22c55e',
    emoji: '🫛',
    illustration: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <path d="M18 60 C20 45, 30 30, 45 25 C50 24, 55 26, 58 30" stroke="#22c55e" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M18 60 C20 45, 30 30, 45 25 C50 24, 55 26, 58 30" stroke="url(#bean-shine)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M22 55 C26 42, 34 32, 48 28 C52 27, 56 30, 62 35" stroke="#1ea34e" strokeWidth="7" fill="none" strokeLinecap="round" />
        {/* Bean bumps */}
        <circle cx="30" cy="43" r="3" fill="rgba(255,255,255,0.1)" />
        <circle cx="38" cy="35" r="2.5" fill="rgba(255,255,255,0.1)" />
        <circle cx="46" cy="29" r="2.5" fill="rgba(255,255,255,0.1)" />
        <defs>
          <linearGradient id="bean-shine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Argan Oil',
    value: 120,
    unit: '$120M',
    share: 'Endemic to Morocco only',
    note: 'UNESCO-protected argan forest',
    region: 'Souss-Massa, Essaouira',
    color: '#d4a017',
    emoji: '🌰',
    illustration: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        {/* Argan nut */}
        <ellipse cx="40" cy="44" rx="18" ry="22" fill="#c4912e" />
        <ellipse cx="40" cy="44" rx="18" ry="22" fill="url(#argan-shine)" />
        {/* Shell texture lines */}
        <path d="M30 35 C35 30, 45 30, 50 35" stroke="rgba(139,90,40,0.4)" strokeWidth="1" fill="none" />
        <path d="M28 42 C35 38, 45 38, 52 42" stroke="rgba(139,90,40,0.3)" strokeWidth="1" fill="none" />
        <path d="M30 50 C35 46, 45 46, 50 50" stroke="rgba(139,90,40,0.3)" strokeWidth="1" fill="none" />
        {/* Stem */}
        <path d="M40 22 L40 14" stroke="#5a3a1e" strokeWidth="2" strokeLinecap="round" />
        {/* Small leaf */}
        <ellipse cx="45" cy="13" rx="6" ry="2.5" fill="#7cad3a" transform="rotate(-10 45 13)" />
        <defs>
          <radialGradient id="argan-shine" cx="35%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Avocados',
    value: 95,
    unit: '$95M',
    share: 'Fastest-growing export crop',
    note: 'Water-intensive — debated',
    region: 'Gharb, Kenitra',
    color: '#2d5a27',
    emoji: '🥑',
    illustration: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <ellipse cx="40" cy="42" rx="20" ry="26" fill="#2d5a27" />
        <ellipse cx="40" cy="42" rx="20" ry="26" fill="url(#avo-shine)" />
        {/* Inner flesh */}
        <ellipse cx="40" cy="44" rx="14" ry="18" fill="#a8c256" />
        {/* Pit */}
        <circle cx="40" cy="48" r="10" fill="#8b6914" />
        <circle cx="40" cy="48" r="10" fill="url(#pit-shine)" />
        <defs>
          <radialGradient id="avo-shine" cx="35%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </radialGradient>
          <radialGradient id="pit-shine" cx="40%" cy="35%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Seafood',
    value: 3000,
    unit: '$3B',
    share: 'Sardines, octopus, shrimp',
    note: 'World\'s largest sardine exporter',
    region: 'Agadir, Dakhla, Essaouira',
    color: '#48BFE3',
    emoji: '🐟',
    illustration: (
      <svg viewBox="0 0 80 80" className="w-full h-full">
        {/* Fish body */}
        <ellipse cx="38" cy="40" rx="24" ry="14" fill="#48BFE3" />
        {/* Tail */}
        <path d="M60 40 L72 28 L72 52 Z" fill="#3a9fc4" />
        {/* Eye */}
        <circle cx="22" cy="37" r="4" fill="white" />
        <circle cx="21" cy="37" r="2" fill="#0a0a0a" />
        {/* Fin */}
        <path d="M35 28 C38 18, 44 20, 42 28" fill="#3a9fc4" />
        {/* Scales suggestion */}
        <path d="M30 36 C33 34, 36 36, 33 38" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
        <path d="M38 36 C41 34, 44 36, 41 38" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
        <path d="M34 42 C37 40, 40 42, 37 44" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
        <path d="M42 42 C45 40, 48 42, 45 44" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" fill="none" />
        <ellipse cx="38" cy="40" rx="24" ry="14" fill="url(#fish-shine)" />
        <defs>
          <radialGradient id="fish-shine" cx="30%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
          </radialGradient>
        </defs>
      </svg>
    ),
  },
]

// Sort by value descending
const SORTED = [...CROPS].sort((a, b) => b.value - a.value)
const MAX_VAL = SORTED[0].value

export default function AgricultureExportsChart() {
  const [visible, setVisible] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        background: '#FAF8F4',
        fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
        minHeight: '100vh',
        padding: '0',
      }}
    >
      {/* Header */}
      <div style={{ padding: '48px 32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#999',
          marginBottom: '8px',
        }}>
          Dancing with Lions · Data
        </p>
        <h1 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.05,
          color: '#0a0a0a',
          margin: '0 0 8px 0',
        }}>
          What Morocco Grows<br />& Sends to the World
        </h1>
        <p style={{ fontSize: '13px', color: '#737373', maxWidth: '520px', lineHeight: 1.6 }}>
          Agricultural and seafood exports by value. Morocco is the #1 non-EU
          supplier of fresh fruits and vegetables to Europe. Data: FAO, Office des Changes, 2022–2024.
        </p>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ height: '2px', background: '#0a0a0a' }} />
      </div>

      {/* Chart */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 32px 48px' }}>
        {SORTED.map((crop, i) => {
          const barWidth = (crop.value / MAX_VAL) * 100
          const isHovered = hoveredIdx === i
          return (
            <div
              key={crop.name}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 100px',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 0',
                borderBottom: '1px solid #e5e5e5',
                cursor: 'default',
                transition: 'background 0.2s ease',
                background: isHovered ? 'rgba(0,0,0,0.02)' : 'transparent',
              }}
            >
              {/* Illustration */}
              <div style={{
                width: '64px',
                height: '64px',
                transition: 'transform 0.3s ease',
                transform: isHovered ? 'scale(1.15)' : 'scale(1)',
              }}>
                {crop.illustration}
              </div>

              {/* Bar + labels */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '8px',
                  marginBottom: '6px',
                }}>
                  <span style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0a0a0a',
                  }}>
                    {crop.name}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    color: '#999',
                  }}>
                    {crop.share}
                  </span>
                </div>

                {/* Bar */}
                <div style={{
                  width: '100%',
                  height: '28px',
                  background: '#eeebe6',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: visible ? `${barWidth}%` : '0%',
                    background: crop.color,
                    transition: `width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                    transitionDelay: `${i * 100}ms`,
                    position: 'relative',
                  }}>
                    {barWidth > 25 && (
                      <span style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)',
                      }}>
                        {crop.unit}
                      </span>
                    )}
                  </div>
                  {barWidth <= 25 && (
                    <span style={{
                      position: 'absolute',
                      left: `calc(${barWidth}% + 8px)`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#0a0a0a',
                    }}>
                      {crop.unit}
                    </span>
                  )}
                </div>

                {/* Detail row */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginTop: '4px',
                  overflow: 'hidden',
                  maxHeight: isHovered ? '24px' : '0px',
                  opacity: isHovered ? 1 : 0,
                  transition: 'max-height 0.3s ease, opacity 0.3s ease',
                }}>
                  <span style={{ fontSize: '10px', color: crop.color, fontWeight: 500 }}>
                    {crop.note}
                  </span>
                  <span style={{ fontSize: '10px', color: '#aaa' }}>
                    Region: {crop.region}
                  </span>
                </div>
              </div>

              {/* Value on right */}
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: '22px',
                  fontStyle: 'italic',
                  color: '#0a0a0a',
                }}>
                  {crop.unit}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Total bar */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 32px 16px',
      }}>
        <div style={{ height: '2px', background: '#0a0a0a', marginBottom: '12px' }} />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0a0a0a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Total Agri-food & Seafood Exports
          </span>
          <span style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: '32px',
            fontStyle: 'italic',
            color: '#0a0a0a',
          }}>
            ~$6.5B
          </span>
        </div>
        <p style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
          19.4% of total goods exports · #2 sector after automotive
        </p>
      </div>

      {/* Big fact */}
      <div style={{
        background: '#E63946',
        padding: '48px 32px',
        margin: '24px 0 0',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: 'clamp(1.3rem, 4vw, 2.2rem)',
            fontStyle: 'italic',
            color: '#ffffff',
            lineHeight: 1.3,
            margin: 0,
          }}>
            Morocco is the world&apos;s third-fastest-growing fruit and vegetable
            exporter. It feeds Europe from 14 km away.
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
            Source: EastFruit / FAO
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: '#0a0a0a',
        padding: '24px 32px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Dancing with Lions · dancingwithlions.com · This visualization may not be reproduced without attribution.
          </p>
          <p style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#E63946',
          }}>
            Source: Dancing with Lions
          </p>
        </div>
      </div>
    </div>
  )
}
