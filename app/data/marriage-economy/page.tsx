'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ═══════════════════════════════════════════════════
// THE MARRIAGE ECONOMY — What a Moroccan Wedding Costs
// Module 048 · Dancing with Lions
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  gold: '#B8860B', henna: '#8B4513', caftan: '#7B2D8D', venue: '#1565C0',
  food: '#C62828', music: '#E65100', negafa: '#AD1457', photo: '#00695C',
  jewel: '#5D4037', decor: '#37474F', adoul: '#455A64', misc: '#78909C',
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.12 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

// Average LOCAL Moroccan wedding (not destination) — in MAD
const BUDGET_BREAKDOWN = [
  { cat: 'Venue & Hall', pct: 22, mad: 33000, color: C.venue, note: 'Wedding halls (salles des fêtes) charge 300–500 MAD/guest. Urban halls in Casablanca: 50K–150K MAD.' },
  { cat: 'Food & Catering', pct: 28, mad: 42000, color: C.food, note: '300–500 MAD/person for 300+ guests. Mechoui (whole lamb), pastilla, couscous, tagine, sweets. The biggest single expense.' },
  { cat: 'Bride\'s Attire', pct: 14, mad: 21000, color: C.caftan, note: '3–7 outfit changes. Caftans bought (15K–100K MAD each) or rented (500–1,500 MAD each). The Fassia, Soussia, Sahrawia, white gown.' },
  { cat: 'Negafa', pct: 8, mad: 12000, color: C.negafa, note: 'The bridal stylist-director. Manages outfits, jewellery, makeup, amariya entrance. 5K–100K MAD depending on reputation.' },
  { cat: 'Music & Orchestra', pct: 10, mad: 15000, color: C.music, note: 'Traditional orchestra (10K–70K MAD). Andalusi, Chaabi, Gnawa, or modern DJ. The soul of the night.' },
  { cat: 'Jewellery & Gold', pct: 7, mad: 10500, color: C.jewel, note: 'Gold for the bride from the groom\'s family. Rings, necklaces, bracelets. Separate from the mahr (cash dowry).' },
  { cat: 'Photography/Video', pct: 4, mad: 6000, color: C.photo, note: '2K–25K MAD. Often two videographers + photographer for 8+ hours through dawn.' },
  { cat: 'Décor & Flowers', pct: 3, mad: 4500, color: C.decor, note: 'Lanterns, rugs, floral arrangements, table settings. 3K–30K MAD.' },
  { cat: 'Groom\'s Attire', pct: 2, mad: 3000, color: C.adoul, note: 'Traditional jabador or djellaba + 1–2 suits. 2K–10K MAD.' },
  { cat: 'Other', pct: 2, mad: 3000, color: C.misc, note: 'Adoul (notary, ~500 MAD), henna artist (nekkasha), transport, wedding cake (5K–45K MAD), invitations.' },
]

// Regional cost comparison
const REGIONAL_COSTS = [
  { region: 'Casablanca', avgMad: 200000, guests: 400, perGuest: 500, note: 'Urban, modern, highest costs. Hotel ballrooms and international caterers.', tier: 'high' },
  { region: 'Marrakech', avgMad: 180000, guests: 350, perGuest: 515, note: 'Palatial venues, premium negafas. Strong tourism markup on services.', tier: 'high' },
  { region: 'Rabat', avgMad: 160000, guests: 300, perGuest: 535, note: 'Government city. Formal, understated wealth. Bride wears blue (R\'batia tradition).', tier: 'high' },
  { region: 'Fes', avgMad: 130000, guests: 350, perGuest: 370, note: 'Traditional Fassi weddings. The most elaborate caftan tradition. Silk and pearl labssa fassia.', tier: 'mid' },
  { region: 'Tangier', avgMad: 120000, guests: 300, perGuest: 400, note: 'European influence. Blends Moroccan and Mediterranean. North wind in everything.', tier: 'mid' },
  { region: 'Meknès', avgMad: 100000, guests: 300, perGuest: 335, note: 'Historic, affordable. Olive groves and orchards as wedding backdrops.', tier: 'mid' },
  { region: 'Agadir', avgMad: 90000, guests: 250, perGuest: 360, note: 'Souss Amazigh traditions. Silver jewellery, tawnza crown, Soussia dress.', tier: 'mid' },
  { region: 'Oujda', avgMad: 80000, guests: 300, perGuest: 265, note: 'Eastern Morocco. Algerian influence. More modest budgets, equally large guest lists.', tier: 'low' },
  { region: 'Rural Atlas', avgMad: 40000, guests: 200, perGuest: 200, note: 'Amazigh village weddings. 3–7 day festivals. Community cooks the food. Family provides venue.', tier: 'low' },
  { region: 'Saharan South', avgMad: 35000, guests: 150, perGuest: 235, note: 'Sahrawi traditions. Camel processions. Melhfa dress. Desert music. Large family tents.', tier: 'low' },
]

// Gift economy / dowry traditions by ethnic group
const GIFT_TRADITIONS = [
  {
    group: 'Urban Arab', region: 'Casablanca, Rabat, Tangier',
    mahr: '10,000–100,000 MAD cash', gifts: 'Gold jewellery (necklace, rings, bracelets), caftans, perfume, household furniture',
    who: 'Groom\'s family pays for wedding + mahr. Bride\'s family provides trousseau (shwari).',
    note: 'Cash mahr is formalized in the adoul contract. Gold is given at the khotba (engagement).',
  },
  {
    group: 'Fassi', region: 'Fes',
    mahr: '20,000–200,000 MAD', gifts: 'Labssa Fassia (silk + pearl outfit), extensive gold, taifours (decorative trays of sweets, cloth, perfume)',
    who: 'Groom pays mahr + provides bride\'s 7 outfits. Bride\'s family hosts the henna. Costs often shared.',
    note: 'Fassi weddings are the most expensive per capita. The taifour tradition is a public display of generosity.',
  },
  {
    group: 'Amazigh (Souss)', region: 'Agadir, Tiznit, Anti-Atlas',
    mahr: '5,000–30,000 MAD', gifts: 'Silver jewellery: tawnza (crown), tanbalat (bracelets), takhersin (earrings), silver belt, edokan (shoes)',
    who: 'Groom provides jewellery set. Community contributes food and labour. Celebrations last 3–7 days.',
    note: 'Silver, not gold — rooted in Amazigh tradition and Islamic reference. Jewellery is bride\'s property even in divorce.',
  },
  {
    group: 'Amazigh (Rif)', region: 'Nador, Al Hoceima, Tetouan',
    mahr: '5,000–20,000 MAD', gifts: 'Gold headpiece, bracelets, handira (wedding blanket woven with sequins)',
    who: 'Groom\'s family covers wedding. The handira is a family heirloom, passed generation to generation.',
    note: 'Riffian weddings feature the handira draped over the bride\'s shoulders — symbol of fertility and fortune.',
  },
  {
    group: 'Sahrawi', region: 'Laayoune, Dakhla, Tan-Tan',
    mahr: '3,000–15,000 MAD', gifts: 'Melhfa (draped dress), silver tribal jewellery, camel (traditionally)',
    who: 'Extended family pools resources. Celebrations in large tents. Community affair.',
    note: 'Saharan weddings are the most communal. Tea ceremony served three times, each with a different meaning.',
  },
]

// Supply chain — where the money physically goes (which city/region)
const SUPPLY_CHAIN = [
  { item: 'Caftans & Takchitas', source: 'Fes', detail: 'Silk weaving, hand-embroidery with gold thread (sfifa and aqad). Fes is the historic capital of bridal fashion.', pctOfTotal: 14 },
  { item: 'Silver Jewellery', source: 'Tiznit', detail: 'Amazigh bridal sets: tizerzaï (fibulae), tawnza, bracelets. Jewish silversmiths for centuries, now Amazigh cooperatives.', pctOfTotal: 3 },
  { item: 'Gold Jewellery', source: 'Casablanca, Rabat', detail: 'Urban goldsmiths. 18K gold necklaces, rings, bracelets. The khotba gift.', pctOfTotal: 4 },
  { item: 'Henna', source: 'Azilal, Beni Mellal', detail: 'Lawsonia inermis leaves, dried and ground. Best quality from central Morocco. Applied by the nekkasha.', pctOfTotal: 0.5 },
  { item: 'Food (Mechoui)', source: 'Local butchers', detail: 'Whole lamb slow-roasted on spit. 800–2,000 MAD per lamb. A 400-person wedding may need 8–15 lambs.', pctOfTotal: 12 },
  { item: 'Food (Pastilla, Couscous)', source: 'Local caterers or family', detail: 'Pastilla: chicken or pigeon in pastry with almonds + cinnamon. Couscous: 7-vegetable tfaya. Often prepared by family in rural areas.', pctOfTotal: 16 },
  { item: 'Sweets (Chebakia, Gazelle Horns)', source: 'Local patisseries', detail: 'Sesame cookies in honey (chebakia), almond crescent pastries (kaab el ghzal). Served on taifour trays.', pctOfTotal: 2 },
  { item: 'Music (Orchestra)', source: 'Fes, Casablanca, Marrakech', detail: 'Andalusi orchestra, Chaabi bands, Aissawa troupes, or modern DJs. Top performers booked months ahead.', pctOfTotal: 10 },
  { item: 'Venue', source: 'Local halls', detail: 'Salles des fêtes in every city. Purpose-built wedding halls with stage, lighting, kitchen. The infrastructure of celebration.', pctOfTotal: 22 },
  { item: 'Negafa Services', source: 'City-based', detail: 'Full service: amariya (bridal throne), outfit coordination, jewellery rental, hair/makeup, ceremony direction.', pctOfTotal: 8 },
  { item: 'Amariya (Bridal Throne)', source: 'Specialist workshops', detail: 'Ornate gilded sedan chair. Rented or owned by negafa. 5K–50K MAD. The bride is carried into the hall.', pctOfTotal: 2 },
  { item: 'Photography & Video', source: 'Local studios', detail: '2 videographers + photographer. 8PM to 5AM. Drone footage now standard for wealthy weddings.', pctOfTotal: 4 },
  { item: 'Wedding Cake', source: 'Patisseries', detail: '3–8 tiers. 5K–45K MAD. French-style or Moroccan decorated. Cut at midnight.', pctOfTotal: 1.5 },
  { item: 'Décor & Lighting', source: 'Event companies', detail: 'Lanterns, zellige-patterned table settings, floral arrangements, sound systems. Growing industry.', pctOfTotal: 3 },
]

// The 7 outfits
const SEVEN_OUTFITS = [
  { name: 'White Takchita', origin: 'National', desc: 'The opening entrance. Two-layered silk gown with wide embroidered belt. Symbolizes purity.', color: '#FAFAFA', textColor: C.ink },
  { name: 'Labssa Fassia', origin: 'Fes', desc: 'Silk garment with jewel-encrusted headpiece, rows of pearls and gold cascading to the torso. Heavy, regal.', color: '#4A148C', textColor: '#fff' },
  { name: 'R\'batia', origin: 'Rabat', desc: 'Vibrant blue caftan with silver embroidered designs and layers of crystal jewellery.', color: '#1565C0', textColor: '#fff' },
  { name: 'Soussia', origin: 'Souss / Amazigh', desc: 'Regional Amazigh dress with tawnza (silver crown), tanbalat bracelets, takhersin earrings, silver belt.', color: '#795548', textColor: '#fff' },
  { name: 'Sahrawia', origin: 'Saharan South', desc: 'Melhfa — fabric wrapped around the body. Bright colors. Tribal silver. Desert origins.', color: '#E65100', textColor: '#fff' },
  { name: 'Amazigh Handira', origin: 'Rif / Atlas', desc: 'Sequined Berber blanket draped over shoulders. Symbol of fertility, fortune. Family heirloom.', color: '#8D6E63', textColor: '#fff' },
  { name: 'Mejdoub', origin: 'National (finale)', desc: 'Gold embroidered caftan. The grand finale. The most ornate outfit of the night.', color: C.gold, textColor: '#fff' },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Wedding season (relative intensity 0–10)
const WEDDING_SEASON = [2, 2, 3, 4, 5, 8, 10, 10, 6, 4, 3, 2]

// ═══════════════════════════════════════════════════
// TREEMAP
// ═══════════════════════════════════════════════════

function Treemap() {
  const r = useReveal()
  const [hover, setHover] = useState<number | null>(null)
  const total = BUDGET_BREAKDOWN.reduce((a, b) => a + b.pct, 0)

  // Simple horizontal treemap rows
  const rows: { items: typeof BUDGET_BREAKDOWN; y: number; h: number }[] = []
  let remaining = [...BUDGET_BREAKDOWN].sort((a, b) => b.pct - a.pct)

  // Row 1: top 3 (food, venue, attire)
  rows.push({ items: remaining.slice(0, 3), y: 0, h: 55 })
  // Row 2: next 3
  rows.push({ items: remaining.slice(3, 6), y: 55, h: 30 })
  // Row 3: rest
  rows.push({ items: remaining.slice(6), y: 85, h: 15 })

  return (
    <div ref={r.ref}>
      <div className="relative w-full" style={{ height: 380 }}>
        {rows.map((row, ri) => {
          const rowTotal = row.items.reduce((a, b) => a + b.pct, 0)
          let xOffset = 0
          return row.items.map((item, ii) => {
            const w = (item.pct / rowTotal) * 100
            const x = xOffset
            xOffset += w
            const globalIdx = BUDGET_BREAKDOWN.indexOf(item)
            const isHovered = hover === globalIdx
            return (
              <div key={item.cat}
                className="absolute flex flex-col justify-between p-2 md:p-3 cursor-pointer transition-all duration-300 border border-white/30"
                style={{
                  left: `${x}%`, top: `${(row.y / 100) * 380}px`,
                  width: `${w}%`, height: `${(row.h / 100) * 380}px`,
                  background: item.color,
                  opacity: r.vis ? (hover !== null && !isHovered ? 0.4 : 1) : 0,
                  transitionDelay: r.vis ? `${ri * 100 + ii * 50}ms` : '0ms',
                }}
                onMouseEnter={() => setHover(globalIdx)}
                onMouseLeave={() => setHover(null)}>
                <div>
                  <p className="text-white font-mono text-[10px] md:text-[11px] leading-tight opacity-90">{item.cat}</p>
                  <p className="text-white font-serif text-[clamp(1rem,3vw,1.6rem)] leading-none mt-0.5">{item.pct}%</p>
                </div>
                {row.h > 20 && (
                  <p className="text-white/70 font-mono text-[9px]">{(item.mad).toLocaleString()} MAD</p>
                )}
              </div>
            )
          })
        })}
      </div>
      {/* Hover detail */}
      <div className="mt-3 h-12">
        {hover !== null && (
          <p className="text-[12px] leading-relaxed" style={{ color: C.text }}>
            <span className="font-mono" style={{ color: BUDGET_BREAKDOWN[hover].color }}>{BUDGET_BREAKDOWN[hover].cat}:</span> {BUDGET_BREAKDOWN[hover].note}
          </p>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// REGIONAL COST BARS
// ═══════════════════════════════════════════════════

function RegionalBars() {
  const r = useReveal()
  const max = Math.max(...REGIONAL_COSTS.map(r => r.avgMad))
  return (
    <div ref={r.ref} className="space-y-2">
      {REGIONAL_COSTS.map((rc, i) => (
        <div key={rc.region} className="flex items-center gap-3 transition-all duration-500" style={{ opacity: r.vis ? 1 : 0, transitionDelay: `${i * 40}ms` }}>
          <span className="text-[12px] w-[90px] shrink-0 text-right truncate" style={{ color: C.text }}>{rc.region}</span>
          <div className="flex-1 h-7 relative" style={{ background: '#f5f5f5' }}>
            <div className="h-full transition-all duration-700 flex items-center px-2"
              style={{
                width: r.vis ? `${(rc.avgMad / max) * 100}%` : '0%',
                background: rc.tier === 'high' ? C.gold : rc.tier === 'mid' ? '#8D6E63' : '#A1887F',
                transitionDelay: `${i * 40}ms`,
              }}>
              <span className="text-white font-mono text-[10px] whitespace-nowrap">{(rc.avgMad / 1000).toFixed(0)}K MAD</span>
            </div>
          </div>
          <span className="text-[10px] font-mono w-[50px] shrink-0" style={{ color: C.muted }}>{rc.guests} guests</span>
        </div>
      ))}
      <p className="text-[10px] font-mono mt-3 pl-[96px]" style={{ color: C.muted }}>
        Average cost for local Moroccan families. Destination/luxury weddings excluded.
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// SEVEN OUTFITS
// ═══════════════════════════════════════════════════

function OutfitStrip() {
  const r = useReveal()
  return (
    <div ref={r.ref} className="grid grid-cols-7 gap-1">
      {SEVEN_OUTFITS.map((o, i) => (
        <div key={o.name} className="flex flex-col transition-all duration-500"
          style={{ opacity: r.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
          <div className="aspect-[3/4] flex items-end p-2 border" style={{ background: o.color, borderColor: o.color === '#FAFAFA' ? C.border : 'transparent' }}>
            <p className="text-[9px] md:text-[10px] font-mono leading-tight" style={{ color: o.textColor }}>{o.name}</p>
          </div>
          <p className="text-[8px] mt-1 font-mono" style={{ color: C.muted }}>{o.origin}</p>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// WEDDING SEASON
// ═══════════════════════════════════════════════════

function SeasonChart() {
  const r = useReveal()
  return (
    <div ref={r.ref} className="flex items-end gap-1" style={{ height: 80 }}>
      {WEDDING_SEASON.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center transition-all duration-500"
          style={{ opacity: r.vis ? 1 : 0, transitionDelay: `${i * 30}ms` }}>
          <div className="w-full transition-all duration-700"
            style={{ height: r.vis ? `${(v / 10) * 60}px` : '0px', background: v >= 8 ? C.gold : '#d4c5a0', transitionDelay: `${i * 30}ms` }} />
          <span className="text-[8px] font-mono mt-1" style={{ color: C.muted }}>{MONTHS[i]}</span>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// SUPPLY CHAIN TABLE
// ═══════════════════════════════════════════════════

function SupplyChain() {
  const r = useReveal()
  return (
    <div ref={r.ref} className="overflow-x-auto">
      <table className="w-full text-[12px]" style={{ color: C.text }}>
        <thead>
          <tr className="border-b" style={{ borderColor: C.border }}>
            <th className="text-left font-mono text-[10px] py-2 pr-4" style={{ color: C.muted }}>Item</th>
            <th className="text-left font-mono text-[10px] py-2 pr-4" style={{ color: C.muted }}>Source</th>
            <th className="text-right font-mono text-[10px] py-2 pr-4" style={{ color: C.muted }}>Share</th>
            <th className="text-left font-mono text-[10px] py-2" style={{ color: C.muted }}>Detail</th>
          </tr>
        </thead>
        <tbody>
          {SUPPLY_CHAIN.map((s, i) => (
            <tr key={s.item} className="border-b transition-all duration-300"
              style={{ borderColor: '#f5f5f5', opacity: r.vis ? 1 : 0, transitionDelay: `${i * 30}ms` }}>
              <td className="py-2 pr-4 font-medium">{s.item}</td>
              <td className="py-2 pr-4 font-mono text-[11px]" style={{ color: C.gold }}>{s.source}</td>
              <td className="py-2 pr-4 text-right font-mono">{s.pctOfTotal}%</td>
              <td className="py-2 text-[11px]" style={{ color: C.muted }}>{s.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

export default function MarriageEconomyPage() {
  const heroR = useReveal()
  const numsR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-36 pb-10">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 048 · Social Economy</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Marriage<br />Economy</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] mb-6" style={{ color: C.muted }}>
            What a Moroccan wedding costs — and where every dirham goes
          </p>
          <p className="text-[15px] leading-[1.8] max-w-[600px]" style={{ color: C.text }}>
            A Moroccan wedding is a three-to-seven-day economic event. The average family spends
            80,000–150,000 MAD ($8,000–$15,000). In Casablanca, that can hit 200,000 MAD. In a
            rural Atlas village, the community shares the cost and the food, and the celebration
            lasts a week for 40,000 MAD. The bride changes outfits up to seven times — each one
            representing a different region of Morocco. The groom pays the mahr (dowry). The negafa
            directs the whole production. The orchestra plays until dawn.
            This module follows the money.
          </p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-10">
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: '150K', l: 'MAD average wedding cost', c: C.gold },
            { n: '300+', l: 'Guests (typical)', c: '#8D6E63' },
            { n: '3–7', l: 'Outfit changes for the bride', c: C.caftan },
            { n: '3–7', l: 'Days of celebration', c: C.henna },
            { n: '28%', l: 'Of budget goes to food', c: C.food },
            { n: '8 PM', l: 'Start time → 5 AM end', c: C.music },
            { n: '5', l: 'Regional bridal traditions', c: '#795548' },
            { n: 'Jul–Aug', l: 'Peak wedding season', c: C.gold },
          ].map((k, i) => (
            <div key={k.l} className="border-t pt-3 transition-all duration-700"
              style={{ borderColor: k.c, opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
              <p className="font-serif text-[clamp(1.3rem,3vw,1.8rem)] leading-none" style={{ color: k.c }}>{k.n}</p>
              <p className="text-[10px] mt-1 font-mono" style={{ color: C.muted }}>{k.l}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ I. THE TREEMAP ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section I</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">Where the Money Goes</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          Budget breakdown for a 150,000 MAD ($15,000) wedding. Food and venue take half.
          Hover to see the detail behind each block.
        </p>
        <Treemap />
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ II. REGIONAL COSTS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">What It Costs, Where</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          Average local Moroccan wedding cost by region. Casablanca is 5× the cost of a rural Atlas wedding — with twice the guests.
        </p>
        <RegionalBars />
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ III. SEVEN OUTFITS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section III</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">Seven Outfits, One Night</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          The bride changes up to seven times. Each outfit represents a region of Morocco.
          The negafa choreographs every transition. Each re-entrance is a ceremony.
        </p>
        <OutfitStrip />
        <div className="mt-6 space-y-2">
          {SEVEN_OUTFITS.map(o => (
            <div key={o.name} className="flex gap-3 items-start">
              <span className="inline-block w-3 h-3 mt-1 shrink-0 rounded-sm" style={{ background: o.color, border: o.color === '#FAFAFA' ? `1px solid ${C.border}` : 'none' }} />
              <div>
                <span className="text-[13px] font-medium">{o.name}</span>
                <span className="text-[12px] font-mono ml-2" style={{ color: C.muted }}>({o.origin})</span>
                <p className="text-[12px]" style={{ color: C.text }}>{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ IV. GIFT ECONOMY ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section IV</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Gift Economy</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          Mahr (dowry), jewellery, and gifts by ethnic tradition. The groom pays the mahr — formalized in
          the adoul contract. Jewellery belongs to the bride, even in divorce.
        </p>
        <div className="space-y-6">
          {GIFT_TRADITIONS.map((g, i) => (
            <div key={g.group} className="border-t pt-4" style={{ borderColor: C.border }}>
              <div className="flex flex-wrap gap-2 items-baseline mb-2">
                <span className="font-serif text-[18px]">{g.group}</span>
                <span className="font-mono text-[11px]" style={{ color: C.muted }}>{g.region}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px]">
                <div>
                  <p className="font-mono text-[10px] mb-0.5" style={{ color: C.gold }}>Mahr (Dowry)</p>
                  <p>{g.mahr}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] mb-0.5" style={{ color: C.gold }}>Gifts</p>
                  <p>{g.gifts}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] mb-0.5" style={{ color: C.gold }}>Who Pays</p>
                  <p>{g.who}</p>
                </div>
              </div>
              <p className="text-[11px] italic mt-2" style={{ color: C.muted }}>{g.note}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ V. SUPPLY CHAIN ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section V</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Supply Chain</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          Where the money physically goes. Caftans from Fes. Silver from Tiznit. Lamb from the local butcher.
          A wedding is a supply chain that touches every corner of the country.
        </p>
        <SupplyChain />
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ VI. WEDDING SEASON ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section VI</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">When Morocco Marries</h2>
        <p className="text-[13px] mb-6 max-w-[500px]" style={{ color: C.muted }}>
          July and August are peak season — Moroccans living abroad return home for summer.
          COVID-19 didn't shrink weddings; families postponed rather than scaled down.
        </p>
        <SeasonChart />
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ READING NOTES ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-[18px] mb-2">The Negafa Problem</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              The negafa is the most powerful person at a Moroccan wedding. She directs costume changes,
              manages the amariya entrance, coordinates jewellery, hair, makeup, and timing.
              A top negafa in Casablanca charges 100,000 MAD — more than many families spend on the entire wedding.
              The role has no formal training. Reputation is everything.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">Silver vs Gold</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Amazigh brides wear silver. Urban Arab brides wear gold. The divide is religious (some
              interpret the Quran as forbidding gold for adornment), economic (silver was mined locally in
              Tiznit since the 1st century AD), and cultural. For centuries, Jewish silversmiths in Tiznit
              made Amazigh bridal jewellery. After the 1950s emigration, Amazigh artisans inherited the craft.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Debt Wedding</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Many Moroccan families go into debt for weddings. With 300+ guests expected and social
              pressure to demonstrate generosity, costs escalate beyond means.
              The average Moroccan monthly salary is ~5,000 MAD. A 150,000 MAD wedding represents
              30 months of income — before the couple has a home.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-4" style={{ color: C.muted }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: C.muted }}>
          <p>Cost data: MAwebzine (2025), PlanetJawal (2023), Bewildered in Morocco (2025), Movocco (2024), Friendly Morocco (2025). Regional variations: editorial estimates based on aggregated vendor pricing and local reporting. Bridal traditions: Middle East Eye, The Knot, Unique Travel Morocco. Amazigh jewellery: Wikipedia (Jewellery of the Berber cultures), The Metropolitan Museum of Art (Berber Jewelry), Little Moroccan Things, Morocco Travel Blog. Tiznit silver: Morocco World News, iwziwn.com (2025). Wedding season: HCP (Haut-Commissariat au Plan) marriage registration data. Supply chain sourcing: editorial mapping based on vendor origin data and cultural documentation.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: C.muted }}>
          © Dancing with Lions · dancingwithlions.com · Cost figures are editorial estimates based on published sources and local reporting. This visualization may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
