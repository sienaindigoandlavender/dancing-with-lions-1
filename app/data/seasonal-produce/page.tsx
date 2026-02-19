'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

// ═══ DATA ═══

interface ProduceItem {
  name: string
  darija: string
  cat: string
  start: number
  end: number
  peak: number[]
  region: string
  color: string
  emoji: string
}

const PRODUCE: ProduceItem[] = [
  // CITRUS
  { name: 'Oranges', darija: 'Limoun', cat: 'citrus', start: 10, end: 4, peak: [11, 0, 1, 2], region: 'Souss, Berkane', color: '#F77F00', emoji: '🍊' },
  { name: 'Clementines', darija: 'Mandarīn', cat: 'citrus', start: 10, end: 2, peak: [11, 0, 1], region: 'Berkane, Souss', color: '#FCBF49', emoji: '🍊' },
  { name: 'Lemons', darija: 'Hamd', cat: 'citrus', start: 0, end: 11, peak: [11, 0, 1, 2, 3], region: 'Nationwide', color: '#F4D35E', emoji: '🍋' },
  { name: 'Grapefruit', darija: 'Pomplemousse', cat: 'citrus', start: 11, end: 3, peak: [0, 1, 2], region: 'Gharb, Souss', color: '#FFB627', emoji: '🍊' },

  // BERRIES & STONE FRUIT
  { name: 'Strawberries', darija: 'Frāz', cat: 'berry', start: 1, end: 5, peak: [2, 3, 4], region: 'Larache, Kenitra', color: '#E63946', emoji: '🍓' },
  { name: 'Cherries', darija: 'Habb el Mlouk', cat: 'berry', start: 4, end: 6, peak: [4, 5], region: 'Sefrou, Middle Atlas', color: '#C1121F', emoji: '🍒' },
  { name: 'Blueberries', darija: 'Myrtilles', cat: 'berry', start: 3, end: 6, peak: [4, 5], region: 'Souss, Kenitra', color: '#7B2D8E', emoji: '🫐' },
  { name: 'Raspberries', darija: 'Frambwāz', cat: 'berry', start: 4, end: 7, peak: [5, 6], region: 'Kenitra, Larache', color: '#D62828', emoji: '🫐' },
  { name: 'Peaches', darija: 'Khōkh', cat: 'stone', start: 5, end: 8, peak: [6, 7], region: 'Meknes, Fes', color: '#FFBE0B', emoji: '🍑' },
  { name: 'Apricots', darija: 'Meshmash', cat: 'stone', start: 4, end: 7, peak: [5, 6], region: 'Ouarzazate, Atlas', color: '#F48C06', emoji: '🍑' },
  { name: 'Plums', darija: 'Berquouq', cat: 'stone', start: 5, end: 8, peak: [6, 7], region: 'Meknes, Atlas', color: '#9D4EDD', emoji: '🫐' },

  // SUMMER
  { name: 'Watermelon', darija: 'Dellāh', cat: 'melon', start: 5, end: 9, peak: [6, 7, 8], region: 'Doukkala, Tensift', color: '#2DC653', emoji: '🍉' },
  { name: 'Melon', darija: 'Bttīkh', cat: 'melon', start: 5, end: 9, peak: [6, 7, 8], region: 'Tadla, Haouz', color: '#80B918', emoji: '🍈' },
  { name: 'Grapes', darija: "L'ʿnab", cat: 'fruit', start: 6, end: 10, peak: [7, 8, 9], region: 'Meknes, Doukkala', color: '#6A4C93', emoji: '🍇' },
  { name: 'Figs', darija: 'Karmous', cat: 'fruit', start: 6, end: 9, peak: [7, 8], region: 'Taounate, Chefchaouen', color: '#723C70', emoji: '🫐' },
  { name: 'Prickly Pear', darija: 'Hendiya', cat: 'fruit', start: 6, end: 9, peak: [7, 8], region: 'Nationwide', color: '#F77F00', emoji: '🌵' },

  // AUTUMN
  { name: 'Pomegranates', darija: 'Rommān', cat: 'fruit', start: 8, end: 11, peak: [9, 10], region: 'Ouazzane, Fes', color: '#E63946', emoji: '🍎' },
  { name: 'Dates', darija: 'Tmar', cat: 'fruit', start: 8, end: 11, peak: [9, 10], region: 'Erfoud, Draa Valley', color: '#6B4226', emoji: '🌴' },
  { name: 'Quinces', darija: 'Sferjel', cat: 'fruit', start: 9, end: 11, peak: [9, 10], region: 'Meknes, Atlas', color: '#C9A227', emoji: '🍐' },
  { name: 'Almonds', darija: 'Louz', cat: 'nut', start: 7, end: 9, peak: [8], region: 'Tafraout, Anti-Atlas', color: '#D4A373', emoji: '🌰' },
  { name: 'Walnuts', darija: 'Guerguāa', cat: 'nut', start: 8, end: 10, peak: [9], region: 'Azrou, Middle Atlas', color: '#8B6F47', emoji: '🌰' },
  { name: 'Olives', darija: 'Zītoun', cat: 'fruit', start: 10, end: 1, peak: [11, 0], region: 'Meknes, Fes, Marrakech', color: '#606C38', emoji: '🫒' },

  // VEGETABLES
  { name: 'Tomatoes', darija: 'Matīsha', cat: 'veg', start: 3, end: 10, peak: [5, 6, 7, 8], region: 'Souss, Doukkala', color: '#E63946', emoji: '🍅' },
  { name: 'Peppers', darija: 'Felfel', cat: 'veg', start: 4, end: 9, peak: [6, 7, 8], region: 'Souss, Gharb', color: '#2DC653', emoji: '🫑' },
  { name: 'Courgettes', darija: 'Garʿa', cat: 'veg', start: 3, end: 9, peak: [5, 6, 7], region: 'Haouz, Tadla', color: '#55A630', emoji: '🥒' },
  { name: 'Aubergine', darija: 'Bādenjāl', cat: 'veg', start: 4, end: 9, peak: [6, 7, 8], region: 'Souss, Haouz', color: '#5E548E', emoji: '🍆' },
  { name: 'Green Beans', darija: 'Loubia Khadra', cat: 'veg', start: 9, end: 5, peak: [10, 11, 0, 1, 2, 3], region: 'Souss, exports', color: '#386641', emoji: '🫘' },
  { name: 'Artichokes', darija: 'Qouq', cat: 'veg', start: 1, end: 4, peak: [2, 3], region: 'Gharb, Casablanca', color: '#588157', emoji: '🌿' },
  { name: 'Broad Beans', darija: 'Foul', cat: 'veg', start: 1, end: 5, peak: [2, 3, 4], region: 'Nationwide', color: '#A7C957', emoji: '🫘' },
  { name: 'Peas', darija: 'Jelbāna', cat: 'veg', start: 1, end: 5, peak: [2, 3, 4], region: 'Haouz, Saiss', color: '#6A994E', emoji: '🫛' },
  { name: 'Pumpkin', darija: 'Garʿa Hamra', cat: 'veg', start: 8, end: 1, peak: [9, 10, 11], region: 'Doukkala, Haouz', color: '#F77F00', emoji: '🎃' },
  { name: 'Khobiza', darija: 'Khobiza', cat: 'veg', start: 11, end: 4, peak: [0, 1, 2, 3], region: 'Nationwide', color: '#344E41', emoji: '🌿' },
]

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const SEASON_NAMES: Record<number, string> = { 0: 'Winter', 1: 'Winter', 2: 'Spring', 3: 'Spring', 4: 'Spring', 5: 'Summer', 6: 'Summer', 7: 'Summer', 8: 'Autumn', 9: 'Autumn', 10: 'Autumn', 11: 'Winter' }
const SEASON_COLORS: Record<string, string> = { Winter: '#48BFE3', Spring: '#72EFDD', Summer: '#F77F00', Autumn: '#E63946' }

// ═══ HOOKS ═══

function useInView(threshold = 0.15): [React.RefCallback<HTMLElement>, boolean] {
  const [inView, setInView] = useState(false)
  const [el, setEl] = useState<HTMLElement | null>(null)
  const ref = (node: HTMLElement | null) => setEl(node)

  useEffect(() => {
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [el, threshold])

  return [ref, inView]
}

// ═══ HELPERS ═══

function isInSeason(item: ProduceItem, month: number): boolean {
  if (item.end >= item.start) return month >= item.start && month <= item.end
  return month >= item.start || month <= item.end
}

function arcPath(cx: number, cy: number, r: number, startMonth: number, endMonth: number): string {
  let end = endMonth
  if (end < startMonth) end += 12
  const spanMonths = end - startMonth + 1
  const padA = 0.015
  const startA = (startMonth / 12) * Math.PI * 2 - Math.PI / 2 + padA
  const endA = ((startMonth + spanMonths) / 12) * Math.PI * 2 - Math.PI / 2 - padA
  const largeArc = (endA - startA) > Math.PI ? 1 : 0
  const x1 = cx + r * Math.cos(startA)
  const y1 = cy + r * Math.sin(startA)
  const x2 = cx + r * Math.cos(endA)
  const y2 = cy + r * Math.sin(endA)
  return `M${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2}`
}

// ═══ SVG FRUIT/VEG ILLUSTRATIONS ═══

function ProduceIcon({ name, size = 28 }: { name: string; size?: number }) {
  const s = size
  const hs = s / 2

  const icons: Record<string, JSX.Element> = {
    Oranges: (
      <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="14" cy="15" r="10" fill="#F77F00" /><ellipse cx="14" cy="6" rx="2" ry="3" fill="#386641" /><circle cx="11" cy="14" r="1" fill="#E36B00" opacity="0.4" /></svg>
    ),
    Clementines: (
      <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="14" cy="15" r="9" fill="#FCBF49" /><path d="M14 6 Q16 3 18 5" stroke="#386641" strokeWidth="1.5" fill="none" /><ellipse cx="14" cy="5.5" rx="3" ry="2" fill="#55A630" /></svg>
    ),
    Lemons: (
      <svg width={s} height={s} viewBox="0 0 28 28"><ellipse cx="14" cy="14" rx="10" ry="8" fill="#F4D35E" transform="rotate(-20 14 14)" /><ellipse cx="7" cy="11" rx="2" ry="1.5" fill="#E8C84A" /><ellipse cx="20" cy="16" rx="2" ry="1.5" fill="#E8C84A" /></svg>
    ),
    Strawberries: (
      <svg width={s} height={s} viewBox="0 0 28 28"><path d="M14 4 L6 16 Q6 24 14 26 Q22 24 22 16 Z" fill="#E63946" /><ellipse cx="14" cy="3" rx="5" ry="2" fill="#55A630" /><circle cx="11" cy="14" r="0.7" fill="#fff" opacity="0.5" /><circle cx="16" cy="17" r="0.7" fill="#fff" opacity="0.5" /><circle cx="13" cy="20" r="0.7" fill="#fff" opacity="0.5" /></svg>
    ),
    Cherries: (
      <svg width={s} height={s} viewBox="0 0 28 28"><path d="M14 3 Q10 8 9 14" stroke="#386641" strokeWidth="1.5" fill="none" /><path d="M14 3 Q18 8 19 14" stroke="#386641" strokeWidth="1.5" fill="none" /><circle cx="9" cy="17" r="5" fill="#C1121F" /><circle cx="19" cy="17" r="5" fill="#C1121F" /><circle cx="7.5" cy="15.5" r="1.5" fill="#fff" opacity="0.2" /></svg>
    ),
    Tomatoes: (
      <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="14" cy="16" r="10" fill="#E63946" /><path d="M8 8 Q11 5 14 7 Q17 5 20 8" fill="#55A630" /><circle cx="11" cy="13" r="1.5" fill="#fff" opacity="0.15" /></svg>
    ),
    Figs: (
      <svg width={s} height={s} viewBox="0 0 28 28"><path d="M14 4 Q8 8 8 16 Q8 24 14 26 Q20 24 20 16 Q20 8 14 4" fill="#723C70" /><path d="M14 4 L14 8" stroke="#386641" strokeWidth="1.5" /><circle cx="14" cy="24" r="1.5" fill="#D4A373" /></svg>
    ),
    Watermelon: (
      <svg width={s} height={s} viewBox="0 0 28 28"><path d="M4 18 A12 12 0 0 1 24 18 Z" fill="#2DC653" /><path d="M6 18 A10 10 0 0 1 22 18 Z" fill="#E63946" /><circle cx="11" cy="16" r="0.8" fill="#333" /><circle cx="15" cy="15" r="0.8" fill="#333" /><circle cx="13" cy="13" r="0.8" fill="#333" /></svg>
    ),
    Pomegranates: (
      <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="14" cy="15" r="10" fill="#E63946" /><path d="M10 5 L14 3 L18 5" fill="#C1121F" stroke="#C1121F" strokeWidth="1" /><circle cx="11" cy="14" r="1.5" fill="#fff" opacity="0.15" /><circle cx="16" cy="16" r="1" fill="#fff" opacity="0.1" /></svg>
    ),
    Dates: (
      <svg width={s} height={s} viewBox="0 0 28 28"><ellipse cx="14" cy="16" rx="5" ry="8" fill="#6B4226" /><ellipse cx="14" cy="14" rx="3" ry="6" fill="#8B5E3C" opacity="0.5" /><path d="M14 4 L12 8 M14 4 L16 8" stroke="#55A630" strokeWidth="1" /></svg>
    ),
    Olives: (
      <svg width={s} height={s} viewBox="0 0 28 28"><ellipse cx="14" cy="15" rx="6" ry="8" fill="#606C38" /><ellipse cx="12" cy="13" rx="2" ry="3" fill="#6D7A3E" opacity="0.4" /><path d="M14 4 L18 2" stroke="#55A630" strokeWidth="1.5" /><ellipse cx="18" cy="3" rx="3" ry="1.5" fill="#55A630" /></svg>
    ),
    Peppers: (
      <svg width={s} height={s} viewBox="0 0 28 28"><path d="M14 6 Q8 10 8 18 Q8 24 12 26 Q16 24 14 18 Q20 24 20 18 Q20 10 14 6" fill="#2DC653" /><path d="M14 2 L14 7" stroke="#386641" strokeWidth="2" /></svg>
    ),
    Aubergine: (
      <svg width={s} height={s} viewBox="0 0 28 28"><path d="M14 8 Q8 14 8 20 Q8 26 14 26 Q20 26 20 20 Q20 14 14 8" fill="#5E548E" /><path d="M12 4 Q14 2 16 4 L16 8 Q14 10 12 8 Z" fill="#55A630" /></svg>
    ),
    Pumpkin: (
      <svg width={s} height={s} viewBox="0 0 28 28"><ellipse cx="10" cy="17" rx="6" ry="8" fill="#F77F00" /><ellipse cx="18" cy="17" rx="6" ry="8" fill="#E36B00" /><ellipse cx="14" cy="17" rx="5" ry="9" fill="#F77F00" /><path d="M14 6 Q12 3 14 2" stroke="#386641" strokeWidth="1.5" fill="none" /></svg>
    ),
    Grapes: (
      <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="11" cy="12" r="3" fill="#6A4C93" /><circle cx="17" cy="12" r="3" fill="#6A4C93" /><circle cx="14" cy="16" r="3" fill="#6A4C93" /><circle cx="11" cy="20" r="3" fill="#6A4C93" /><circle cx="17" cy="20" r="3" fill="#6A4C93" /><circle cx="14" cy="24" r="3" fill="#6A4C93" /><path d="M14 4 L14 10" stroke="#386641" strokeWidth="1.5" /><ellipse cx="16" cy="5" rx="3" ry="2" fill="#55A630" /></svg>
    ),
    Almonds: (
      <svg width={s} height={s} viewBox="0 0 28 28"><ellipse cx="14" cy="14" rx="6" ry="10" fill="#D4A373" /><ellipse cx="14" cy="14" rx="4" ry="7" fill="#C19A6B" opacity="0.5" /><line x1="14" y1="5" x2="14" y2="23" stroke="#B8860B" strokeWidth="0.5" opacity="0.3" /></svg>
    ),
  }

  return icons[name] || (
    <svg width={s} height={s} viewBox="0 0 28 28"><circle cx="14" cy="14" r="10" fill="currentColor" opacity="0.3" /></svg>
  )
}

// ═══ PAGE ═══

export default function SeasonalProducePage() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null)
  const [wheelRef, wheelVisible] = useInView(0.1)
  const [calRef, calVisible] = useInView(0.1)

  const catOrder = ['citrus', 'berry', 'stone', 'melon', 'fruit', 'nut', 'veg']
  const sorted = useMemo(() =>
    [...PRODUCE].sort((a, b) => {
      const ci = catOrder.indexOf(a.cat) - catOrder.indexOf(b.cat)
      if (ci !== 0) return ci
      return a.start - b.start
    }),
  [])

  // Wheel dimensions
  const CX = 500, CY = 500, INNER_R = 130, RING_W = 10.5, GAP = 2

  const inSeasonItems = hoveredMonth !== null
    ? sorted.filter(item => isInSeason(item, hoveredMonth))
    : []

  // Get items for each month (for illustrated calendar)
  const monthItems = useMemo(() =>
    MONTHS.map((_, mi) => sorted.filter(item => isInSeason(item, mi))),
  [sorted])

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen pt-16">

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pt-20 pb-12">
        <Link href="/data" className="micro-label text-[#555] hover:text-white/60 transition-colors inline-block mb-6">
          ← All Data Modules
        </Link>
        <p className="micro-label text-[#555] mb-2">Module 008 · Food Intelligence</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-[-0.02em] mb-4">
          <em>What Grows When</em>
        </h1>
        <p className="text-[13px] text-[#666] max-w-[560px] leading-[1.7] mb-8">
          A seasonal calendar of Moroccan fruits and vegetables. Thirty-two crops
          mapped across twelve months — with the Darija name you&apos;ll hear in the souk,
          the region where it grows, and when it tastes best.
        </p>

        <div className="flex flex-wrap gap-8">
          {[
            { n: '32', l: 'Crops mapped', c: '#2DC653' },
            { n: '12', l: 'Months', c: '#F77F00' },
            { n: '15+', l: 'Growing regions', c: '#72EFDD' },
            { n: '7', l: 'Categories', c: '#E63946' },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-serif italic text-[28px]" style={{ color: s.c }}>{s.n}</p>
              <p className="micro-label text-[#555]">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ RADIAL WHEEL ═══ */}
      <section ref={wheelRef} className="max-w-[900px] mx-auto px-4">
        <div className="border-t border-white/[0.06] pt-8 mb-4 px-2">
          <p className="micro-label text-[#444] mb-1">The Wheel</p>
          <p className="font-serif italic text-[20px] text-white/50 mb-1">
            Each ring is one crop. The arc is its season.
          </p>
          <p className="text-[11px] text-white/20">
            Hover a month to see what&apos;s available. Hover any arc for details.
          </p>
        </div>

        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-auto"
          style={{ opacity: wheelVisible ? 1 : 0, transition: 'opacity 0.8s ease' }}
        >
          <defs>
            <filter id="glow-sp"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          {/* Month grid */}
          {MONTHS.map((m, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
            const innerX = CX + (INNER_R - 15) * Math.cos(angle)
            const innerY = CY + (INNER_R - 15) * Math.sin(angle)
            const outerR = INNER_R + sorted.length * (RING_W + GAP) + 15
            const outerX = CX + outerR * Math.cos(angle)
            const outerY = CY + outerR * Math.sin(angle)
            const labelR = outerR + 18
            const lx = CX + labelR * Math.cos(angle)
            const ly = CY + labelR * Math.sin(angle)
            const isHM = hoveredMonth === i

            return (
              <g key={m}>
                <line x1={innerX} y1={innerY} x2={outerX} y2={outerY}
                  stroke={isHM ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.035)'}
                  strokeWidth={isHM ? 1 : 0.5} style={{ transition: 'all 0.2s' }} />
                <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                  fill={isHM ? '#fff' : 'rgba(255,255,255,0.3)'} fontSize="9.5"
                  fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.08em"
                  fontWeight={isHM ? 600 : 400} style={{ transition: 'fill 0.2s', cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredMonth(i)} onMouseLeave={() => setHoveredMonth(null)} >
                  {m}
                </text>
              </g>
            )
          })}

          {/* Invisible month sectors for hover */}
          {MONTHS.map((_, i) => {
            const a1 = ((i - 0.5) / 12) * Math.PI * 2 - Math.PI / 2
            const a2 = ((i + 0.5) / 12) * Math.PI * 2 - Math.PI / 2
            const outerR = INNER_R + sorted.length * (RING_W + GAP) + 15
            return (
              <path key={`sec-${i}`}
                d={`M${CX},${CY} L${CX + outerR * Math.cos(a1)},${CY + outerR * Math.sin(a1)} A${outerR},${outerR} 0 0 1 ${CX + outerR * Math.cos(a2)},${CY + outerR * Math.sin(a2)} Z`}
                fill="transparent" style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredMonth(i)} onMouseLeave={() => setHoveredMonth(null)} />
            )
          })}

          {/* Produce arcs */}
          {sorted.map((item, i) => {
            const r = INNER_R + i * (RING_W + GAP) + RING_W / 2
            const isItemHovered = hovered === item.name
            const isInSeasonNow = hoveredMonth !== null && isInSeason(item, hoveredMonth)
            const isPeak = hoveredMonth !== null && item.peak.includes(hoveredMonth)
            const dimmed = (hovered !== null && !isItemHovered) || (hoveredMonth !== null && !isInSeasonNow)

            return (
              <g key={item.name}>
                <circle cx={CX} cy={CY} r={r} fill="none" stroke="rgba(255,255,255,0.012)" strokeWidth={RING_W} />
                <path d={arcPath(CX, CY, r, item.start, item.end)} fill="none" stroke={item.color}
                  strokeWidth={RING_W - 1} strokeLinecap="round"
                  opacity={dimmed ? 0.06 : isPeak ? 1 : isItemHovered ? 1 : 0.65}
                  filter={isItemHovered || isPeak ? 'url(#glow-sp)' : 'none'}
                  style={{ transition: 'opacity 0.3s', cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(item.name)} onMouseLeave={() => setHovered(null)} />
              </g>
            )
          })}

          {/* Center info */}
          {hovered ? (() => {
            const item = sorted.find(s => s.name === hovered)
            if (!item) return null
            return (
              <g>
                <text x={CX} y={CY - 22} textAnchor="middle" fill="#fff" fontSize="16" fontFamily="'Instrument Serif', Georgia, serif" fontStyle="italic">{item.name}</text>
                <text x={CX} y={CY - 2} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="var(--font-plex-mono), monospace">{item.darija}</text>
                <text x={CX} y={CY + 16} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="var(--font-plex-mono), monospace">{item.region}</text>
                <text x={CX} y={CY + 32} textAnchor="middle" fill={item.color} fontSize="10" fontFamily="var(--font-plex-mono), monospace">{MONTHS[item.start]} – {MONTHS[item.end]}</text>
              </g>
            )
          })() : hoveredMonth !== null ? (
            <g>
              <text x={CX} y={CY - 14} textAnchor="middle" fill="#fff" fontSize="20" fontFamily="'Instrument Serif', Georgia, serif" fontStyle="italic">{MONTHS_FULL[hoveredMonth]}</text>
              <text x={CX} y={CY + 8} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="11" fontFamily="var(--font-plex-mono), monospace">{inSeasonItems.length} crops in season</text>
            </g>
          ) : (
            <g>
              <text x={CX} y={CY - 8} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="var(--font-plex-mono), monospace" letterSpacing="0.1em">MOROCCO</text>
              <text x={CX} y={CY + 10} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="9" fontFamily="var(--font-plex-mono), monospace">32 crops · 12 months</text>
            </g>
          )}
        </svg>
      </section>

      {/* ═══ ILLUSTRATED MONTH-BY-MONTH CALENDAR ═══ */}
      <section ref={calRef} className="max-w-[1100px] mx-auto px-6 md:px-10 mt-8">
        <div className="border-t border-white/[0.06] pt-8 mb-6">
          <p className="micro-label text-[#444] mb-1">The Calendar</p>
          <p className="font-serif italic text-[20px] text-white/50 mb-1">
            Month by month, what&apos;s at the souk
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/[0.04]"
          style={{ opacity: calVisible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          {MONTHS_FULL.map((month, mi) => {
            const items = monthItems[mi]
            const season = SEASON_NAMES[mi]
            const sColor = SEASON_COLORS[season]
            const peakItems = items.filter(it => it.peak.includes(mi))
            const nonPeakItems = items.filter(it => !it.peak.includes(mi))

            return (
              <div key={month} className="bg-[#0a0a0a] p-5">
                <div className="flex items-baseline justify-between mb-3">
                  <p className="font-serif italic text-[18px] text-white/80">{month}</p>
                  <p className="text-[9px] uppercase tracking-wider" style={{ color: sColor }}>{season}</p>
                </div>

                {/* Peak items with illustrations */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {peakItems.map(item => (
                    <div key={item.name} className="flex items-center gap-1.5 py-1 px-2"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                      <span style={{ color: item.color }}>
                        <ProduceIcon name={item.name} size={20} />
                      </span>
                      <span className="text-[10px] font-medium" style={{ color: item.color }}>{item.name}</span>
                    </div>
                  ))}
                </div>

                {/* Non-peak (just available) */}
                {nonPeakItems.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {nonPeakItems.map(item => (
                      <span key={item.name} className="text-[9px] text-white/25 px-1.5 py-0.5"
                        style={{ background: 'rgba(255,255,255,0.03)' }}>
                        {item.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-[9px] text-white/15 mt-2">{items.length} items</p>
              </div>
            )
          })}
        </div>
        <p className="text-[10px] text-white/15 mt-2">
          Highlighted items with icons are at peak season. Dimmed items are available but not at their best.
        </p>
      </section>

      {/* ═══ CULTURAL NOTES ═══ */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 mt-12">
        <div className="border-t border-white/[0.06] pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label text-[#444] mb-2">The Souk Calendar</p>
              <p className="text-[12px] text-white/40 leading-[1.6]">
                Morocco&apos;s growing season is long and diverse. Citrus dominates winter.
                Berries arrive with spring. Summer brings melons, stone fruit, and the
                beloved karmous (figs). Autumn is the season of rommān (pomegranates)
                and tmar (dates) in the south.
              </p>
            </div>
            <div>
              <p className="micro-label text-[#444] mb-2">Greenhouse vs. Natural</p>
              <p className="text-[12px] text-white/40 leading-[1.6]">
                The Souss Valley exports tomatoes and peppers year-round from industrial
                greenhouses — most of it bound for European supermarkets. This chart
                shows natural outdoor seasons, when crops taste best and cost least
                at the local souk.
              </p>
            </div>
            <div>
              <p className="micro-label text-[#444] mb-2">Khobiza — The Winter Staple</p>
              <p className="text-[12px] text-white/40 leading-[1.6]">
                Wild mallow (khobiza) is the crop no tourist guide mentions but every
                Moroccan knows. Foraged from November to April, it appears in a thick,
                silky dish that feeds families through the cold months. Not sold in
                restaurants. Found in every home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t border-white/[0.06] pt-4">
          <p className="micro-label text-[#333] mb-2">Sources</p>
          <p className="text-[11px] text-white/20 leading-[1.6] max-w-[700px]">
            Seasonal availability data compiled from Ministère de l&apos;Agriculture, de la Pêche Maritime,
            du Développement Rural et des Eaux et Forêts; ORMVA regional agricultural development offices;
            FAO country profiles; and direct market observation in Marrakech, Fes, and Agadir souks (2020–2026).
            Darija names verified through field usage and cross-referenced with published glossaries.
            Growing regions based on MAPMDREF agricultural zone classifications.
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px] text-white/15">
              © {new Date().getFullYear()} Dancing with Lions · Cuisines of Morocco. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px] text-[#2DC653]">
              Source: Dancing with Lions
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
