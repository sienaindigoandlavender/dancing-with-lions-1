'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ═══════════════════════════════════════════════════
// THE MOROCCAN GENOME — What DNA Says
// Module 052 · Dancing with Lions
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  na: '#1565C0',       // North African / Maghrebi
  eu: '#5C6BC0',       // European
  me: '#AB47BC',       // Middle Eastern
  wa: '#EF6C00',       // West African
  ssa: '#D84315',      // Sub-Saharan other
  other: '#78909C',    // Other/unassigned
  em81: '#1B5E20',     // E-M81 Berber marker
  j1: '#6A1B9A',       // J1 Arab marker
  r1b: '#0D47A1',      // R1b European
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

// Autosomal ancestry — Moroccan Genome Project Phase 1 (2025), 109 genomes
const ADMIXTURE = [
  { label: 'North African (Maghrebi)', pct: 51.2, color: C.na, note: 'Autochthonous component. Peaks in Amazigh groups. Related to Taforalt ancestry (15,000 ya). Not found outside North Africa at high frequency.' },
  { label: 'European', pct: 10.9, color: C.eu, note: 'Primarily Iberian/Mediterranean. Introduced via Neolithic expansion from Iberia through Gibraltar, Roman colonisation, and later interactions.' },
  { label: 'Middle Eastern', pct: 10.7, color: C.me, note: 'Arabian Peninsula + Levantine. Introduced primarily through Arab conquests (7th–11th c.) and Neolithic pastoralist expansions (~5,600 ya).' },
  { label: 'West African', pct: 6.8, color: C.wa, note: 'Sub-Saharan component. Introduced via trans-Saharan trade routes and historical slave trade. Higher in southern and urban Arab-speaking populations.' },
  { label: 'Other / Unresolved', pct: 20.4, color: C.other, note: 'Remaining ancestry from additional ancestral populations including East African, Basal Eurasian "ghost" populations, and components not resolved at K=19.' },
]

// Y-chromosome (paternal) haplogroups — MGP 2025 + Wikipedia synthesis
const Y_HAPLO = [
  { hg: 'E1b1b1 (E-M81)', pct: 36.6, color: C.em81, label: 'The Berber Marker', note: 'Autochthonous North African. 79–98% in Amazigh speakers. Originated ~2,000–3,000 years ago (extremely recent). Decreasing gradient south to north.' },
  { hg: 'F', pct: 19.5, color: '#607D8B', label: 'Broad Eurasian', note: 'Macro-haplogroup. Includes subclades not further resolved in this study.' },
  { hg: 'G2', pct: 17.1, color: '#795548', label: 'Neolithic Farmer', note: 'Associated with Neolithic expansion from Near East. Also common in Caucasus and Mediterranean Europe.' },
  { hg: 'E1b1 (other)', pct: 8.5, color: '#4CAF50', label: 'Other E1b1', note: 'Includes E-M78 (declines toward NW Africa) and other E1b1 subclades.' },
  { hg: 'J (J1 + J2)', pct: 7.0, color: C.j1, label: 'Arabian / Levantine', note: 'J1 dominates. 2nd most common haplogroup in North Africa overall (~20% in broader studies). Linked to Arab expansions.' },
  { hg: 'R1 / R1b', pct: 5.5, color: C.r1b, label: 'European / Atlantic', note: 'R1b typical of Western Europeans. 0.8–6.8% in Morocco. Introduced via Iberian gene flow.' },
  { hg: 'Other (K, etc.)', pct: 5.8, color: C.other, label: 'Diverse', note: 'Minor haplogroups including K, T, I, and others at low frequency.' },
]

// Maternal (mtDNA) lineages — synthesis from multiple studies
const MT_HAPLO = [
  { hg: 'West Eurasian (H, HV, U, etc.)', pct: 55, color: C.eu, note: 'Dominant maternal pool. Includes H (post-glacial Iberian expansion), U6 (autochthonous North African "back-to-Africa" marker), and HV.' },
  { hg: 'U6 (North African specific)', pct: 12, color: C.na, note: 'The signature North African maternal lineage. Evidence of back-to-Africa dispersal pre-Holocene (>12,000 ya). Peaks in Berber groups.' },
  { hg: 'M1 (North African)', pct: 5, color: '#00897B', note: 'Second autochthonous North African lineage. Like U6, evidence of early Eurasian back-migration into Africa.' },
  { hg: 'L (Sub-Saharan)', pct: 22, color: C.wa, note: 'Northern Berbers: 1–3%. Arab-speakers: up to 36% (El Jadida). Gradient north→south. Mix of ancient (L3*, ~20,000 ya) and recent (L2a, L3b, slave trade era).' },
  { hg: 'Other', pct: 6, color: C.other, note: 'Minor lineages including Near Eastern J, T, and others.' },
]

// E-M81 frequency by population
const EM81_FREQ = [
  { pop: 'Southern Moroccan Berber', pct: 98.5 },
  { pop: 'Central Moroccan Berber', pct: 89.8 },
  { pop: 'Sahrawi', pct: 76.0 },
  { pop: 'Northern Moroccan Berber', pct: 79.1 },
  { pop: 'Moroccan Arab-speakers', pct: 45.0 },
  { pop: 'Algerian Mozabite Berber', pct: 80.0 },
  { pop: 'Tunisian Berber (Chenini)', pct: 100.0 },
  { pop: 'Iberian Peninsula', pct: 5.0 },
  { pop: 'Sicily', pct: 6.0 },
  { pop: 'Sub-Saharan Africa', pct: 0.5 },
]

// Ancient DNA + migration timeline
const TIMELINE = [
  { year: '~300,000 ya', event: 'Homo sapiens remains at Jebel Irhoud, Morocco. Oldest known anatomically modern human fossils.', type: 'ancient' },
  { year: '~15,000 ya', event: 'Taforalt cave (Iberomaurusian). Ancient DNA shows: haplogroup E-M78*, U6, M1 mtDNA. High affinity with Near Eastern Natufians. Evidence of a "back-to-Africa" migration from Western Eurasia.', type: 'ancient' },
  { year: '~7,000 ya', event: 'Ifri N\'Ammar (Cardial Neolithic). New arrivals carry Levantine marker E-L19. Break in genetic continuity with Iberomaurusians — Neolithic farmers partially replace earlier populations.', type: 'ancient' },
  { year: '~5,600 ya', event: 'Neolithic demic diffusion from Middle East. Pastoralists introduce J1, G2 haplogroups and Middle Eastern ancestry. Agriculture spreads with genes.', type: 'migration' },
  { year: '~3,000 ya', event: 'Phoenician colonisation. Carthage founded (814 BCE). Levantine and Mediterranean gene flow into coastal Morocco.', type: 'migration' },
  { year: '~2,000–3,000 ya', event: 'E-M183/M81 undergoes rapid expansion across North Africa. Extremely recent TMRCA. Becomes the dominant paternal lineage in Amazigh populations.', type: 'ancient' },
  { year: '~1,400 ya', event: '7th–8th century Arab conquest. J1-P58 haplogroup introduced. Arabisation is both cultural AND demographic — recent studies confirm significant gene flow, not just language shift.', type: 'migration' },
  { year: '8th–17th c.', event: 'Trans-Saharan trade and slave trade introduce West African (L2a, L3b mtDNA) and Sub-Saharan Y lineages (E-V38). Higher frequencies in southern Morocco and urban centres.', type: 'migration' },
  { year: '711–1492 CE', event: 'Al-Andalus period. Berber and Arab soldiers cross to Iberia. E-M81 found at 5–11% in Spain today. Genetic evidence of Moroccan ancestry in Iberian peninsula.', type: 'migration' },
  { year: '2025', event: 'Moroccan Genome Project Phase 1: 109 whole genomes sequenced. 27 million variants identified, 1.4 million novel. First Moroccan Major Allele Reference Genome (MMARG) proposed.', type: 'modern' },
]

// Key findings summary
const KEY_FINDINGS = [
  { stat: '51.2%', label: 'North African ancestry', detail: 'The majority component. Autochthonous. Not found at high frequency anywhere else on Earth.' },
  { stat: 'E-M81', label: 'Dominant paternal lineage', detail: '79–98% in Amazigh men. Only 2,000–3,000 years old. One of the most rapid Y-chromosome expansions ever documented.' },
  { stat: '~0', label: 'Genetic difference between Arab and Berber Moroccans', detail: 'Studies consistently show no strong genetic differentiation. Arabisation was primarily cultural. Berber and Arab Moroccans cluster together genetically.' },
  { stat: '15,000', label: 'Years of the oldest Moroccan ancient DNA', detail: 'Taforalt cave. Already showed mixed Eurasian and African ancestry. Back-to-Africa migration pre-dates all known civilisations.' },
]

// ═══════════════════════════════════════════════════
// STACKED BAR
// ═══════════════════════════════════════════════════

function AdmixtureBar({ data, title }: { data: typeof ADMIXTURE; title: string }) {
  const r = useReveal()
  const [hover, setHover] = useState<number | null>(null)
  return (
    <div ref={r.ref}>
      <p className="font-mono text-[10px] mb-3 tracking-wider" style={{ color: C.muted }}>{title}</p>
      <div className="flex h-12 w-full overflow-hidden border" style={{ borderColor: C.border }}>
        {data.map((d, i) => (
          <div key={d.label} className="h-full flex items-center justify-center cursor-pointer transition-all duration-500 relative"
            style={{ width: r.vis ? `${d.pct}%` : '0%', background: d.color, transitionDelay: `${i * 80}ms` }}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            {d.pct > 8 && <span className="text-white text-[10px] font-mono">{d.pct}%</span>}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: d.color }} />
            <span className="text-[10px] font-mono" style={{ color: hover === i ? C.ink : C.muted }}>{d.label} ({d.pct}%)</span>
          </div>
        ))}
      </div>
      {hover !== null && (
        <div className="mt-3 p-3 border text-[12px] leading-relaxed transition-all" style={{ borderColor: data[hover].color, color: C.text }}>
          <strong style={{ color: data[hover].color }}>{data[hover].label}</strong>: {data[hover].note}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// HORIZONTAL BARS
// ═══════════════════════════════════════════════════

function HaploBar({ data, title }: { data: typeof Y_HAPLO; title: string }) {
  const r = useReveal()
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...data.map(d => d.pct))
  return (
    <div ref={r.ref}>
      <p className="font-mono text-[10px] mb-3 tracking-wider" style={{ color: C.muted }}>{title}</p>
      <div className="space-y-1.5">
        {data.map((d, i) => (
          <div key={d.hg} className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <span className="text-[9px] font-mono w-[140px] text-right shrink-0 truncate" style={{ color: hover === i ? d.color : C.muted }}>{d.hg}</span>
            <div className="flex-1 h-5 relative" style={{ background: '#f5f5f5' }}>
              <div className="h-full flex items-center px-2 transition-all duration-700"
                style={{ width: r.vis ? `${(d.pct / max) * 100}%` : '0%', background: d.color, transitionDelay: `${i * 60}ms` }}>
                <span className="text-white font-mono text-[9px] whitespace-nowrap">{d.pct}%</span>
              </div>
            </div>
            <span className="text-[9px] font-mono w-[90px] shrink-0 truncate" style={{ color: C.muted }}>{d.label}</span>
          </div>
        ))}
      </div>
      {hover !== null && (
        <div className="mt-3 p-3 border text-[12px] leading-relaxed" style={{ borderColor: data[hover].color, color: C.text }}>
          <strong style={{ color: data[hover].color }}>{data[hover].hg}</strong> — {data[hover].note}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// E-M81 FREQUENCY CHART
// ═══════════════════════════════════════════════════

function EM81Chart() {
  const r = useReveal()
  return (
    <div ref={r.ref}>
      <p className="font-mono text-[10px] mb-3 tracking-wider" style={{ color: C.em81 }}>E-M81 FREQUENCY BY POPULATION (%)</p>
      <div className="space-y-1.5">
        {EM81_FREQ.map((d, i) => (
          <div key={d.pop} className="flex items-center gap-2">
            <span className="text-[10px] font-mono w-[180px] text-right shrink-0" style={{ color: C.muted }}>{d.pop}</span>
            <div className="flex-1 h-5 relative" style={{ background: '#f5f5f5' }}>
              <div className="h-full flex items-center px-2 transition-all duration-700"
                style={{ width: r.vis ? `${d.pct}%` : '0%', background: C.em81, opacity: d.pct > 50 ? 1 : 0.5, transitionDelay: `${i * 50}ms` }}>
                {d.pct > 10 && <span className="text-white font-mono text-[9px]">{d.pct}%</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

export default function MoroccanGenomePage() {
  const heroR = useReveal()
  const keyR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-36 pb-10">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 052 · Genetic Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Moroccan<br />Genome</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] mb-6" style={{ color: C.muted }}>
            300,000 years of migration written in nucleotides. What DNA says about who Moroccans are.
          </p>
          <p className="text-[15px] leading-[1.8] max-w-[620px]" style={{ color: C.text }}>
            Morocco sits at the crossroads of three continents. The Sahara to the south, the Mediterranean
            to the north, the Atlantic to the west, and a land bridge to the Middle East through Sinai.
            Every empire that crossed this intersection left its DNA. In 2025, the Moroccan Genome
            Project sequenced 109 whole genomes and found the answer: the average Moroccan is 51%
            autochthonous North African — an ancestry found nowhere else on Earth at high frequency —
            plus 11% European, 11% Middle Eastern, and 7% West African. The most common paternal
            lineage, E-M81, is only 2,000–3,000 years old — one of the most rapid genetic expansions
            ever documented. And the single most important finding: there is almost no genetic difference
            between Berber-speaking and Arab-speaking Moroccans. Arabisation was a language shift,
            not a population replacement.
          </p>
        </div>
      </section>

      {/* ═══ KEY FINDINGS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-10">
        <div ref={keyR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {KEY_FINDINGS.map((k, i) => (
            <div key={k.label} className="border-t pt-3 transition-all duration-700"
              style={{ borderColor: C.na, opacity: keyR.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
              <p className="font-serif text-[clamp(1.2rem,3vw,1.6rem)] leading-none" style={{ color: C.na }}>{k.stat}</p>
              <p className="text-[10px] font-mono mt-1 mb-1" style={{ color: C.muted }}>{k.label}</p>
              <p className="text-[11px] leading-relaxed" style={{ color: C.text }}>{k.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ I. AUTOSOMAL ADMIXTURE ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section I</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Admixture</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          Autosomal DNA — the full genome, inherited from both parents — reveals four major
          ancestry components in the average Moroccan. Based on 109 whole genomes at K=19
          resolution. Hover each segment for detail.
        </p>
        <AdmixtureBar data={ADMIXTURE} title="MOROCCAN AUTOSOMAL ANCESTRY (MOROCCAN GENOME PROJECT, 2025)" />
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ II. Y-CHROMOSOME ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Father Line</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          Y-chromosome haplogroups trace the paternal lineage — father to son, unchanged, for thousands
          of generations. E-M81 is the autochthonous North African marker. J1 arrived with the Arab conquests.
          R1b crossed from Europe. Hover any bar for the story.
        </p>
        <HaploBar data={Y_HAPLO} title="Y-CHROMOSOME HAPLOGROUPS (MGP 2025, 109 MALES)" />
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ III. E-M81 THE BERBER MARKER ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section III</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Berber Marker</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          E-M81 (E-M183) is the most common paternal lineage in North Africa. It reaches
          near-fixation in southern Amazigh communities (98.5%) and declines as you move north,
          east, and across the Mediterranean. Its TMRCA of just 2,000–3,000 years makes it one of the
          youngest widespread Y-chromosome lineages ever studied — evidence of an extraordinary
          recent demographic expansion.
        </p>
        <EM81Chart />
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ IV. MATERNAL LINE ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section IV</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Mother Line</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          Mitochondrial DNA traces the maternal lineage — mother to child, for hundreds of
          thousands of years. The Moroccan maternal pool tells a different story than the paternal:
          more Eurasian, with the North African–specific U6 lineage as the indigenous signature.
        </p>
        <AdmixtureBar data={MT_HAPLO.map(d => ({ label: d.hg, pct: d.pct, color: d.color, note: d.note }))} title="MITOCHONDRIAL DNA HAPLOGROUPS (SYNTHESIS OF MULTIPLE STUDIES)" />
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ V. TIMELINE ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section V</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">300,000 Years</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          From the oldest Homo sapiens fossils on Earth to the first national genome reference.
          Every migration left its mark in the nucleotides.
        </p>
        <div className="space-y-3">
          {TIMELINE.map((t, i) => {
            const rv = useReveal()
            const typeColor = t.type === 'ancient' ? C.na : t.type === 'migration' ? C.me : C.em81
            return (
              <div key={i} ref={rv.ref} className="flex gap-4 items-start transition-all duration-500"
                style={{ opacity: rv.vis ? 1 : 0, transform: rv.vis ? 'translateX(0)' : 'translateX(-10px)' }}>
                <div className="flex flex-col items-end shrink-0" style={{ width: 110 }}>
                  <span className="font-mono text-[11px] font-bold text-right" style={{ color: typeColor }}>{t.year}</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ background: typeColor }} />
                <div className="border-l pl-4 pb-1" style={{ borderColor: C.border }}>
                  <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>{t.event}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex gap-6 mt-6 text-[9px] font-mono" style={{ color: C.muted }}>
          <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: C.na }} />Ancient DNA</span>
          <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: C.me }} />Migration event</span>
          <span><span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: C.em81 }} />Modern science</span>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ READING NOTES ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-[18px] mb-2">Arab ≠ Arabian</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              The biggest surprise in Moroccan genetics: Berber-speaking and Arab-speaking
              Moroccans are genetically nearly indistinguishable. In PCA plots, both groups
              cluster together. Earlier studies suggested Arabisation was purely cultural —
              a language shift without population replacement. More recent work (2017, 2024)
              shows it was both: real gene flow occurred, but the indigenous Berber substrate
              remained dominant. Being "Arab" in Morocco is primarily a linguistic identity,
              not a distinct genetic ancestry.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Back-to-Africa Migration</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Taforalt cave in eastern Morocco (15,000 ya) contained the oldest DNA in North
              Africa — and it showed high affinity with Near Eastern Natufian populations.
              This means the indigenous "North African" ancestry itself came from Eurasia,
              in a back-migration predating the Holocene. The U6 and M1 mitochondrial lineages
              are the molecular evidence. North Africa was populated from both directions:
              out of Africa, and then back into it.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The 2,000-Year-Old Marker</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              E-M81 is found at 80–98% in Amazigh men across Morocco, Algeria, Tunisia, and
              Libya. Yet its most recent common ancestor lived only 2,000–3,000 years ago. This
              is extraordinarily young for a lineage at such high frequency. It implies a
              massive, rapid demographic expansion — possibly linked to the development of
              oasis agriculture, Berber confederations, or trans-Saharan trade networks that
              gave certain lineages an outsized reproductive advantage.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-4" style={{ color: C.muted }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: C.muted }}>
          <p>Primary source: Moroccan Genome Project Phase 1 (2025), <em>Communications Biology</em>. 109 whole genomes. Ancestry percentages (51.2% North African, 10.9% European, 10.7% Middle Eastern, 6.8% West African) and Y-chromosome haplogroup frequencies (E1b1b1 36.6%, F 19.5%, G2 17.1%) from this study. E-M81 frequency data: Reguig et al. (2014), "Phylogeography of E1b1b1b-M81 Haplogroup and Analysis of its Subclades in Morocco," <em>Human Biology</em>. 295 Berber-speaking men. E-M81 TMRCA (2,000–3,000 ya): Solé-Morata et al. (2017), <em>Scientific Reports</em>. 32 North African Y-chromosome sequences. Demographic model and differential Arab/Amazigh origins: Serradell et al. (2024), <em>Genome Biology</em>. Taforalt ancient DNA: Loosdrecht et al. (2018), <em>Science</em>. mtDNA synthesis: Frigi et al. (2010); Coudray et al. (2009); Esteban et al. (multiple studies on L-haplogroup gradients). General context: Wikipedia, "Genetic studies on Moroccans" and "Genetic history of North Africa" (accessed Feb 2026, cross-referenced against cited primary literature). Arab vs Berber genetic similarity: Henn et al. (2012), Arauna et al. (2017), <em>Molecular Biology and Evolution</em>.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: C.muted }}>
          © Dancing with Lions · dancingwithlions.com · Population genetics data represents group-level statistical patterns and does not determine individual identity or ancestry. This visualisation may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
