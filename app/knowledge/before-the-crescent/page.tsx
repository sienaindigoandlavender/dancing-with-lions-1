'use client'

import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════
   BEFORE THE CRESCENT
   Morocco before Islam — 315,000 years of layers
   Knowledge Series · Private
   ═══════════════════════════════════════════════════ */

// ── TYPES & DATA ──────────────────────────────────

interface Era {
  id: string
  label: string
  color: string
  period: string
  span: string
  summary: string
  facts: string[]
  sites: string[]
}

const ERAS: Era[] = [
  {
    id: 'homo-sapiens',
    label: 'The First Humans',
    color: '#8B5E3C',
    period: 'c. 315,000 BCE',
    span: '~313,000 years',
    summary: 'Morocco is one of the places where our species began. Not East Africa alone — the whole continent.',
    facts: [
      'Jebel Irhoud, 100 km west of Marrakech. In 1961, barite miners hit a pocket of sediment and a human skull rolled out.',
      'In 2017, Jean-Jacques Hublin (Max Planck Institute) redated the fossils: 315,000 years old. The oldest known Homo sapiens on Earth.',
      'This pushed back the origin of our species by 100,000 years and expanded the "cradle of mankind" from East Africa to the entire continent.',
      'Five individuals found: three adults, an adolescent, a child of about eight. Stone tools. Animal bones. Evidence of fire.',
      'Their faces looked like ours. Their braincase was elongated — still archaic. The face evolved modern features first; the brain followed.',
      'Oukaimeden in the High Atlas has rock engravings from the Bronze Age (c. 1600 BCE) — weapons, animals, geometric symbols. Still visible.',
    ],
    sites: ['Jebel Irhoud', 'Oukaimeden', 'Taforalt (Grotte des Pigeons)', 'Dar es-Soltan'],
  },
  {
    id: 'amazigh',
    label: 'The Amazigh',
    color: '#C4963C',
    period: 'c. 5000 – 800 BCE',
    span: '~4,200 years',
    summary: 'The indigenous people. They were here before anyone sailed the Mediterranean. They are still here.',
    facts: [
      'Amazigh means "free people." The Greek word "barbaroi" (foreign) became "Berber" — a name many reject.',
      'Descended from Saharan pastoral cultures, Mediterranean fishing communities, and possibly ancient Egyptian populations. They settled between 12,000 and 5,000 years ago.',
      'Three great tribal confederations emerged: the Masmuda (south, High Atlas, Sous), the Sanhaja (centre, Middle Atlas, Sahara), and the Zenata (east, plains and pre-Sahara).',
      'Their script — Tifinagh — dates to at least the 3rd century BCE. Not used for commerce or record-keeping. Epigraphic. Carved into stone. Modern Amazigh nationalists adopted it as the basis for a new alphabet.',
      'They had their own religious traditions before any monotheism arrived. Ancestor veneration. Sacred groves. Springs with spiritual power.',
      'Ibn Khaldun (14th century) traced their genealogy to Mazigh, son of Canaan. The Kabyles of Algeria remained independent through Carthaginians, Romans, Byzantines, Vandals, and Ottomans.',
    ],
    sites: ['High Atlas', 'Middle Atlas', 'Rif Mountains', 'Sous Valley', 'Anti-Atlas'],
  },
  {
    id: 'phoenician',
    label: 'The Phoenicians',
    color: '#7B3FA0',
    period: 'c. 1100 – 500 BCE',
    span: '~600 years',
    summary: 'Sailors from Lebanon who came for silver, tin, and purple dye. They built trading posts, not empires.',
    facts: [
      'Phoenicians sailed from Tyre (modern Lebanon) westward, seeking silver and tin. They reached Morocco\'s coast by the 12th century BCE.',
      'Trading posts, not colonies. Tingis (Tangier), Rusaddir (Melilla), Tamuda (near Tétouan), Lixus (near Larache), and Mogador (Essaouira) — the westernmost outpost.',
      'At Mogador (Essaouira), they ran a purple dye factory on the Îles Purpuraires. Murex sea snails crushed for Tyrian purple — worth more than gold per gram.',
      'They didn\'t try to control the interior. Coastal and strategic. Trade with inland Amazigh tribes was transactional — livestock, hides, dairy for manufactured goods.',
      'They introduced their script to North Africa. The Amazigh adapted Punic letterforms alongside their existing Tifinagh.',
      'When Carthage (founded 814 BCE in Tunisia) grew dominant, the Moroccan posts came under Carthaginian influence. Ports grew into proper cities. Some minted their own coins.',
    ],
    sites: ['Lixus (Larache)', 'Mogador (Essaouira)', 'Tingis (Tangier)', 'Rusaddir (Melilla)', 'Tamuda (Tétouan)'],
  },
  {
    id: 'carthage',
    label: 'Carthage & Mauretania',
    color: '#A0522D',
    period: 'c. 500 – 40 BCE',
    span: '~460 years',
    summary: 'A Tunisian empire and a Berber kingdom. Carthage fell. The Berber kings survived — until Caligula got jealous.',
    facts: [
      'By the 5th century BCE, Carthage controlled the coastal trade. They expanded the Phoenician posts and extracted grain, grapes, fish, and tribute from Amazigh tribes.',
      'The Punic Wars (264–146 BCE) ended Carthage. Rome destroyed the city in 146 BCE. But the far western outposts initially prospered — Carthaginian refugees flooded in.',
      'The Kingdom of Mauretania emerged: a loose Amazigh confederation centred on Volubilis and Tangier. Not a kingdom in the European sense — more a network of tribal alliances.',
      'King Baga (c. 225 BCE) is the earliest known ruler. But the dynasty that matters is Juba II (25 BCE – 23 CE): a Roman-educated Berber who married Cleopatra Selene — daughter of Cleopatra VII and Mark Antony.',
      'Juba II made Volubilis a centre of Hellenistic culture. Greek-inspired mosaics. A library. Trade with Rome. His court spoke Greek, Latin, and Punic.',
      'His son Ptolemy ruled until 40 CE, when Emperor Caligula had him assassinated — allegedly for wearing a purple cloak that outshone the emperor\'s. By 44 CE, Claudius imposed direct Roman rule.',
    ],
    sites: ['Volubilis', 'Tangier', 'Sala (Rabat)', 'Lixus', 'Chellah'],
  },
  {
    id: 'roman',
    label: 'Rome',
    color: '#C93C20',
    period: '40 CE – 285 CE',
    span: '~245 years',
    summary: 'The empire\'s most remote province. Olive oil, garum, gladiator lions, and three public bathhouses for 20,000 people.',
    facts: [
      'Mauretania Tingitana: the province of Morocco. Capital at Tingis (Tangier). Rome controlled the northern coastal plain and valleys — never the mountains or deep south.',
      'Volubilis was the showpiece. 20,000 inhabitants. Two Roman baths. Triumphal arches. A forum. A basilica. Mosaics depicting Orpheus, Bacchus, and Neptune. 58 olive oil pressing workshops.',
      'Lixus exported over a million litres of garum — fermented fish sauce — making it the largest garum producer in the western Mediterranean.',
      'Timgad in Algeria (same period) had 8 bathhouses for 15,000 people. Half the population of Pompeii, twice the baths.',
      'Banasa, a veterans\' colony founded by Augustus, had thermal baths with triton mosaics. Abandoned in 285 CE when Rome retreated.',
      'Christianity arrived in the 2nd century CE. By the 3rd century, North Africa was substantially Christianised. Lixus became nearly fully Christian.',
      'The rule was plagued by constant Amazigh raids from beyond the Roman frontier. Rome governed through alliances with tribes, not military occupation. When the alliances broke down, so did the province.',
      'By 250 CE, retreat had begun. By 285 CE, the province was reduced to territories north of Lixus. Volubilis continued with a reduced population. The baths remained.',
    ],
    sites: ['Volubilis', 'Lixus', 'Banasa', 'Thamusida (Kenitra)', 'Sala Colonia (Chellah, Rabat)', 'Tamuda (Tétouan)'],
  },
  {
    id: 'interregnum',
    label: 'Vandals, Byzantines & Tribal Kingdoms',
    color: '#4A6B8A',
    period: '429 – 680 CE',
    span: '~250 years',
    summary: 'Rome fell. Three powers tried to fill the gap. None succeeded. The Amazigh ruled themselves.',
    facts: [
      'In 429 CE, the Vandals — a Germanic people with an Arian Christian theology that Rome considered heretical — crossed the Strait from Spain. They conquered North Africa in 13 years.',
      'The Vandals largely ignored Morocco. Too remote, not rich enough. They left almost no trace. Their presence in Tangier and Ceuta was administrative, not cultural.',
      'In 534 CE, Byzantine Emperor Justinian reconquered North Africa from the Vandals. But Byzantine control in Morocco was limited to Ceuta and Tangier. A military foothold, not a province.',
      'Byzantine remains have been found at Salé, and Volubilis was still populated — but the interior was governed by tribal chiefs who used the Byzantine presence to strengthen their own rule.',
      'Several independent Amazigh kingdoms emerged in this period. We know almost nothing about them — the historical record is sparse. Tribal law governed most of Morocco.',
      'Christianity, Judaism, and indigenous Amazigh religions coexisted. Jewish communities had been present since at least the 2nd century CE, probably arriving from the east via Carthage.',
      'This was the Morocco that confronted the Arab armies in 680 CE: fragmented, tribal, multi-religious, ungoverned by any central power, and fiercely independent.',
      'The Arab conquest took 70 years of fighting. Longer than it took to conquer the entire Middle East. The Amazigh warrior-queen Kahina led the resistance in Algeria until her death around 703 CE.',
    ],
    sites: ['Ceuta', 'Tangier', 'Volubilis', 'Salé', 'Moulay Idriss (founded after, on the ruins)'],
  },
]

const KEY_NUMBERS = [
  { value: '315,000', unit: 'years', note: 'Age of Jebel Irhoud fossils. The oldest Homo sapiens ever found.' },
  { value: '6', unit: 'civilizations', note: 'Amazigh → Phoenician → Carthaginian → Roman → Vandal → Byzantine. Then Islam.' },
  { value: '58', unit: 'olive presses', note: 'At Volubilis alone. Olive oil was Morocco\'s export economy under Rome.' },
  { value: '1,000,000', unit: 'litres', note: 'Garum capacity at Lixus. Fermented fish sauce. The ketchup of the Roman Empire.' },
  { value: '70', unit: 'years', note: 'How long it took Arab armies to conquer Morocco. The Middle East fell in a decade.' },
  { value: '0', unit: 'central authority', note: 'In 680 CE. Fragmented tribal kingdoms. No single ruler. That\'s what met the Arabs.' },
]

const BIBLIOGRAPHY = [
  'Hublin, Jean-Jacques et al. "New fossils from Jebel Irhoud, Morocco and the pan-African origin of Homo sapiens." Nature 546 (2017): 289–292.',
  'Pennell, C.R. Morocco Since 1830: A History. New York University Press, 2000.',
  'Raddato, Carole. "Exploring Roman Morocco." World History Encyclopedia, 2022.',
  'Ibn Khaldun. The Muqaddimah: An Introduction to History. Trans. Franz Rosenthal. Princeton, 1967.',
  'Brett, Michael, and Elizabeth Fentress. The Berbers. Blackwell, 1996.',
  'Bosworth, C.E. "The Concept of Dhimma in Early Islam." Christians and Jews in the Ottoman Empire, ed. Braude and Lewis, 1982.',
  'Fanack.com. "Morocco: Antiquity." Chronicle, 2023.',
  'World History Encyclopedia. "Exploring Roman Morocco." 2022.',
]

// ── HOOKS ─────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── STYLES ────────────────────────────────────────

const F = {
  display: '"Cormorant Garamond", "Garamond", Georgia, serif',
  body: '"Inter", -apple-system, sans-serif',
}

const C = {
  bg: '#FAFAF8',
  white: '#ffffff',
  black: '#0A0A0A',
  text: '#1A1A1A',
  mid: '#555555',
  light: '#999999',
  border: '#E8E5E0',
  dark: '#0E0E0E',
}

// ── COMPONENTS ────────────────────────────────────

function EraCard({ era, index, isActive, onClick }: { era: Era; index: number; isActive: boolean; onClick: () => void }) {
  const { ref, inView } = useInView()

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 100}ms`,
    }}>
      {/* Era header — clickable */}
      <div onClick={onClick} style={{
        cursor: 'pointer',
        padding: '32px 0',
        borderBottom: `1px solid ${C.border}`,
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto',
        gap: 24,
        alignItems: 'start',
      }}>
        {/* Number circle */}
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: isActive ? era.color : 'transparent',
          border: `2px solid ${era.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}>
          <span style={{
            fontFamily: F.display, fontSize: 20, fontWeight: 300,
            color: isActive ? '#fff' : era.color,
            transition: 'color 0.3s ease',
          }}>{String(index + 1).padStart(2, '0')}</span>
        </div>

        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: era.color, marginBottom: 6 }}>
            {era.period} · {era.span}
          </div>
          <div style={{ fontFamily: F.display, fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 400, fontStyle: 'italic', color: C.black, lineHeight: 1.2 }}>
            {era.label}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: C.mid, marginTop: 8, maxWidth: 600 }}>
            {era.summary}
          </p>
        </div>

        <div style={{
          fontSize: 24, color: C.light, transition: 'transform 0.3s ease',
          transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>+</div>
      </div>

      {/* Expanded content */}
      <div style={{
        maxHeight: isActive ? '2000px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}>
        <div style={{ padding: '32px 0 48px', paddingLeft: 104 }}>
          {/* Facts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {era.facts.map((fact, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: era.color, marginTop: 8, flexShrink: 0,
                  opacity: 0.5,
                }} />
                <p style={{ fontSize: 15, lineHeight: 1.85, color: C.text }}>{fact}</p>
              </div>
            ))}
          </div>

          {/* Sites */}
          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.light, marginBottom: 12 }}>Key Sites</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {era.sites.map((site, i) => (
                <span key={i} style={{
                  padding: '5px 14px', borderRadius: 20,
                  border: `1px solid ${era.color}30`,
                  background: `${era.color}08`,
                  fontSize: 12, fontWeight: 500, color: era.color,
                }}>{site}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── TIMELINE BAR ──────────────────────────────────

function TimelineBar() {
  const { ref, inView } = useInView()
  const total = 315000
  const segments = [
    { label: 'First Humans', span: 310000, color: '#8B5E3C' },
    { label: 'Amazigh', span: 4200, color: '#C4963C' },
    { label: 'Phoen.', span: 600, color: '#7B3FA0' },
    { label: 'Carthage', span: 460, color: '#A0522D' },
    { label: 'Rome', span: 245, color: '#C93C20' },
    { label: 'V/B', span: 250, color: '#4A6B8A' },
  ]

  return (
    <div ref={ref} style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', height: 48, borderRadius: 6, overflow: 'hidden', background: C.border }}>
        {segments.map((s, i) => {
          // Use log scale so small eras are visible
          const pct = Math.max((Math.log10(s.span + 1) / Math.log10(total + 1)) * 100, 4)
          return (
            <div key={i} style={{
              width: `${pct}%`,
              background: s.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: inView ? 1 : 0,
              transition: `opacity 0.6s ease ${i * 120}ms`,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap', padding: '0 4px' }}>{s.label}</span>
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ fontSize: 10, color: C.light }}>315,000 BCE</span>
        <span style={{ fontSize: 10, color: C.light }}>680 CE → Islam arrives</span>
      </div>
    </div>
  )
}

// ── PAGE ──────────────────────────────────────────

export default function BeforeTheCrescent() {
  const [activeEra, setActiveEra] = useState<number | null>(0)

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: F.body }}>

      {/* ═══ HERO ═══ */}
      <section style={{ background: C.white, padding: '160px 24px 100px', textAlign: 'center', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.light, marginBottom: 40 }}>Knowledge · Private</p>

          <h1 style={{ fontFamily: F.display, fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.05, color: C.black, marginBottom: 32, letterSpacing: '-0.02em' }}>
            Before the Crescent
          </h1>

          <p style={{ fontFamily: F.display, fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.6, color: C.mid, maxWidth: 620, margin: '0 auto 48px' }}>
            315,000 years of Morocco before Islam.<br />
            Six civilizations. Each one left a layer.<br />
            The Amazigh outlasted them all.
          </p>
        </div>
      </section>

      {/* ═══ SCALE BAR ═══ */}
      <section style={{ padding: '60px 24px', background: C.white }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.light, marginBottom: 20, textAlign: 'center' }}>Scale of Time (logarithmic)</p>
          <TimelineBar />
          <p style={{ fontSize: 12, color: C.light, textAlign: 'center', marginTop: 12, fontStyle: 'italic' }}>
            Homo sapiens occupied this land for 313,000 years before the first Phoenician ship appeared on the horizon.
          </p>
        </div>
      </section>

      {/* ═══ THE THESIS ═══ */}
      <section style={{ padding: '80px 24px', maxWidth: 680, margin: '0 auto' }}>
        <p style={{ fontFamily: F.body, fontSize: 17, lineHeight: 2, color: C.text }}>
          Most histories of Morocco begin with Islam. They shouldn't. By the time the first Arab armies reached the Atlantic coast around 680 CE, Morocco had already been home to the oldest known Homo sapiens, hosted Phoenician trading posts for a thousand years, served as the breadbasket of a Berber kingdom that married into the family of Cleopatra, operated as Rome's most remote province for two and a half centuries, been invaded by Germanic Vandals, and been partially reclaimed by the Byzantine Empire. Judaism and Christianity had both arrived. Amazigh religious traditions predated both. The land the Arabs found was not empty. It was layered.
        </p>
      </section>

      {/* ═══ NUMBERS ═══ */}
      <section style={{ background: C.dark, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 40 }}>
            {KEY_NUMBERS.map((n, i) => {
              const { ref, inView } = useInView()
              return (
                <div key={i} ref={ref} style={{ textAlign: 'center', opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.8s ease ${i * 100}ms` }}>
                  <div style={{ fontFamily: F.display, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, color: '#ffffff', lineHeight: 1 }}>{n.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{n.unit}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 4, lineHeight: 1.5 }}>{n.note}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ ERA CARDS ═══ */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.light, marginBottom: 8 }}>The Layers</p>
          <h2 style={{ fontFamily: F.display, fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 300, fontStyle: 'italic', color: C.black, marginBottom: 48 }}>
            Six civilizations, one land
          </h2>

          {ERAS.map((era, i) => (
            <EraCard
              key={era.id}
              era={era}
              index={i}
              isActive={activeEra === i}
              onClick={() => setActiveEra(activeEra === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ═══ THE CLOSING ═══ */}
      <section style={{ background: C.dark, padding: '100px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: F.display, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5, color: '#ffffff' }}>
            When the Arab armies arrived in 680,<br />
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>they didn't find an empty land.</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.5)', marginTop: 32, maxWidth: 520, margin: '32px auto 0' }}>
            They found a place where Homo sapiens had lived for 315,000 years. Where Phoenician, Carthaginian, Roman, Vandal, and Byzantine layers sat on top of each other like geological strata. Where Judaism and Christianity were already established. Where Amazigh tribes governed themselves and had outlasted every empire that tried to absorb them. The conquest took 70 years. The Middle East had fallen in a decade.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.35)', marginTop: 24, maxWidth: 520, margin: '24px auto 0' }}>
            Islam arrived. But Morocco was already Morocco.
          </p>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ padding: '80px 24px', background: C.bg }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.light, marginBottom: 24 }}>Sources</p>
          {BIBLIOGRAPHY.map((b, i) => (
            <p key={i} style={{ fontSize: 13, lineHeight: 1.8, color: C.mid, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: '40px 24px', background: C.dark, textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}>
          © {new Date().getFullYear()} Dancing with Lions · J. Ng · Knowledge Series
        </div>
      </footer>
    </div>
  )
}
