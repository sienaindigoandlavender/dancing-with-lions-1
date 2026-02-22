'use client'

import { useState, useEffect, useRef } from 'react'

/* ═══════════════════════════════════════════════════
   THE MYSTIQUE
   A Map of the Luminous In-Between
   Knowledge Series · Private · WHITE BG
   ═══════════════════════════════════════════════════ */

const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  mid: '#525252', muted: '#737373', border: '#e5e5e5',
  gold: '#C4963C',
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── DATA ─────────────────────────────────────────

interface ThinPlace { name: string; where: string; why: string; type: 'ecosystem' | 'world' }

const THIN_PLACES: ThinPlace[] = [
  { name: 'The Riad at 4am', where: 'Marrakech', why: 'Three hundred years of prayers in the walls. The fountain. The zellij as visual dhikr. A thin place with a booking engine.', type: 'ecosystem' },
  { name: 'The Atlas Above 2,000m', where: 'High Atlas', why: 'The air thins. The light sharpens. The mountain is not scenery — it is presence. Sinai, Kailash, Fuji, Toubkal. The altitude is literal and metaphorical.', type: 'ecosystem' },
  { name: 'The Sahara at Night', where: 'Erg Chebbi', why: 'No light pollution. The Milky Way has texture. The Tuareg call it ténéré — the place where there is nothing. The nothing is full.', type: 'ecosystem' },
  { name: 'Essaouira at Dusk', where: 'Atlantic Coast', why: 'The wind city. The Atlantic against the ramparts. The Gnawa in the street. Orson Welles filmed here because it felt like the edge of the world. It is.', type: 'ecosystem' },
  { name: 'The Medina', where: 'Any Moroccan City', why: 'A labyrinth. Labyrinths are walking meditations in every tradition. GPS fails. Plans dissolve. What works is instinct and trust.', type: 'ecosystem' },
  { name: 'Cappadocia', where: 'Türkiye', why: 'Underground cities, cave churches, fairy chimneys. Humans have carved sacred space into this rock for 4,000 years.', type: 'world' },
  { name: 'Iona', where: 'Scotland', why: 'Celtic monks chose it because it was already thin. Pilgrimage site for 1,500 years. Scotland\'s national animal is the unicorn.', type: 'world' },
  { name: 'Varanasi', where: 'India', why: 'The oldest continuously inhabited city. Death is visible. Cremation ghats on the Ganges. The veil is not thin — it\'s absent.', type: 'world' },
  { name: 'Fez', where: 'Morocco', why: 'The oldest medina in the world. One thousand years of continuous prayer. The Qarawiyyin. The tanneries. The zawiyas.', type: 'world' },
  { name: 'Skellig Michael', where: 'Ireland', why: 'Monks built beehive huts on a rock in the Atlantic. Star Wars filmed there because it looks like another dimension. It is.', type: 'world' },
  { name: 'Lalibela', where: 'Ethiopia', why: 'Eleven churches carved downward into rock. Not built up — excavated down. As if the churches were always there and the rock was removed to reveal them.', type: 'world' },
  { name: 'Uluru', where: 'Australia', why: 'Sacred for 30,000+ years. The songlines converge here. The rock changes colour because it is alive.', type: 'world' },
  { name: 'Chefchaouen', where: 'Morocco', why: 'Blue city in the Rif. Founded by Andalusian refugees. The blue represents divine peace, the sky, transcendence.', type: 'world' },
]

interface UnicornCulture { culture: string; period: string; creature: string; meaning: string; color: string }

const UNICORNS: UnicornCulture[] = [
  { culture: 'Ancient Greece', period: '400 BCE', creature: 'Monoceros', meaning: 'Ctesias reported it as natural history — a real animal in India. Not myth. Just somewhere else.', color: '#8B7355' },
  { culture: 'Siberian Steppe', period: '39,000 years ago', creature: 'Elasmotherium', meaning: 'A real animal. Massive rhinoceros, single horn. Humans saw it. The memory may have persisted 30,000 years as story.', color: '#6B5B3C' },
  { culture: 'Scotland', period: '12th century –', creature: 'The Royal Unicorn', meaning: 'National animal. Chained in heraldry because unchained it was too powerful. Scotland chose the impossible as its identity.', color: '#4A7C9B' },
  { culture: 'China', period: 'Ancient', creature: 'Qilin', meaning: 'Appears before great events. An omen of benevolent change. When sighted, something extraordinary is about to happen.', color: '#C44040' },
  { culture: 'Medieval Europe', period: 'c. 1500', creature: 'Lady & the Unicorn', meaning: 'Six tapestries at Musée de Cluny. The sixth: À Mon Seul Désir. 500 years and scholars still don\'t agree what it means.', color: '#7B4A8B' },
  { culture: 'Arabic', period: 'Medieval', creature: 'Al-Mi\'raj', meaning: 'A rabbit with a single horn on a mysterious island. Small, unlikely, lethal. Unicorn energy in its most concentrated form.', color: '#2D6E4F' },
]

interface TimelineJump { step: number; decision: string; from: string; to: string }

const JUMPS: TimelineJump[] = [
  { step: 1, decision: 'The move to Morocco', from: 'Expected path', to: 'Entering the thin place' },
  { step: 2, decision: 'Systems over performance', from: 'Social media hustle', to: 'Infrastructure as gravitational field' },
  { step: 3, decision: 'Dancing with Lions', from: 'Riad brand', to: 'Think tank. Lions don\'t chase.' },
  { step: 4, decision: 'The thousand-website vision', from: 'Scaling a business', to: 'Building a civilisational archive' },
  { step: 5, decision: 'The knowledge layer', from: 'Being findable', to: 'Being the source' },
  { step: 6, decision: 'This document', from: 'Rational strategy', to: 'Mapping the invisible operating system' },
]

// ── COMPONENTS ───────────────────────────────────

function Micro({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color, marginBottom: 16 }}>{children}</div>
}

function Title({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em' }}>{children}</h2>
}

function Prose({ children, dim = false }: { children: React.ReactNode; dim?: boolean }) {
  return <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.85, color: dim ? C.muted : C.mid, marginBottom: 20, maxWidth: 640 }}>{children}</p>
}

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`,
    }}>{children}</div>
  )
}

function Section({ children, bg = C.bg }: { children: React.ReactNode; bg?: string }) {
  return <section style={{ background: bg, padding: '100px 24px', borderTop: `1px solid ${C.border}` }}><div style={{ maxWidth: 720, margin: '0 auto' }}>{children}</div></section>
}

// ── MAIN ─────────────────────────────────────────
export default function TheMystique() {
  const [thinFilter, setThinFilter] = useState<'all' | 'ecosystem' | 'world'>('all')
  const [activeUnicorn, setActiveUnicorn] = useState(0)
  const filtered = thinFilter === 'all' ? THIN_PLACES : THIN_PLACES.filter(p => p.type === thinFilter)

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(120px, 16vw, 200px) 24px 80px', maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <Fade><Micro color={C.gold}>Knowledge Series · Private</Micro></Fade>
        <Fade delay={200}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, marginBottom: 24, letterSpacing: '-0.03em' }}>
            The Mystique
          </h1>
        </Fade>
        <Fade delay={400}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.5 }}>
            A map of the luminous in-between
          </p>
        </Fade>
      </section>

      {/* ═══ I · THE GATEWAY ═══ */}
      <Section>
        <Fade>
          <Micro>I · The Gateway</Micro>
          <Title>The door was sound</Title>
          <Prose>Mysterious Middle East — a frequency that bypassed the mind and spoke directly to something older. Before the riad, before Morocco, before any of it, there was a sound that said: there is more here than you've been told.</Prose>
          <Prose>Every mystical tradition on earth uses sound as the primary technology of the in-between. The Gnawa guembri thins the veil with rhythm. The Sufi dhikr works the same way: repetition, breath, vibration until the rational mind steps aside. The Tibetans use singing bowls. The Hindus use mantras. The Aboriginal Australians sing the land into existence — the songlines are literally maps made of music.</Prose>
          <Prose>Every tradition discovered the same thing independently: sound is a portal.</Prose>
          <Prose dim>Then you moved to a country where the call to prayer at 4am fills the dark streets with exactly that frequency — five times a day, the entire nation pauses for a sound that says: there is more here than you've been told. That was not coincidence. That was navigation.</Prose>
        </Fade>
      </Section>

      {/* ═══ II · THIN PLACES ═══ */}
      <Section bg={C.alt}>
        <Fade>
          <Micro>II · Thin Places</Micro>
          <Title>Where heaven and earth are three feet apart</Title>
          <Prose>The Celts named locations where the boundary between worlds grows transparent. In a thin place, you feel it before you think it. A shift in weight. A quiet that is not silence but attention. The sense that the place is listening back.</Prose>
        </Fade>

        <Fade delay={200}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 40 }}>
            {(['all', 'ecosystem', 'world'] as const).map(f => (
              <button key={f} onClick={() => setThinFilter(f)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: thinFilter === f ? C.ink : 'transparent',
                color: thinFilter === f ? '#fff' : C.muted,
                border: `1px solid ${thinFilter === f ? C.ink : C.border}`,
              }}>
                {f === 'all' ? `All (${THIN_PLACES.length})` : f === 'ecosystem' ? 'DWL Ecosystem' : 'Future Territory'}
              </button>
            ))}
          </div>
        </Fade>

        {filtered.map((place, i) => (
          <Fade key={place.name} delay={i * 60}>
            <div style={{ padding: '24px 0', borderBottom: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: F.serif, fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 1.3, marginBottom: 6 }}>
                  {place.name}
                </div>
                <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.7, color: C.mid, maxWidth: 520 }}>{place.why}</p>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.gold, whiteSpace: 'nowrap', paddingTop: 6 }}>
                {place.where}
              </div>
            </div>
          </Fade>
        ))}
      </Section>

      {/* ═══ III · SANCTUARY FREQUENCY ═══ */}
      <Section>
        <Fade>
          <Micro>III · The Sanctuary Frequency</Micro>
          <Title>I don't chase. I attract.</Title>
          <Prose>This is not marketing copy. This is manifestation mechanics dressed in practical language. The Sufis call it tawakkul — radical trust in divine provision. The manifesting community calls it alignment. The quantum metaphor calls it matching your vibration to the timeline you want.</Prose>
        </Fade>

        <div style={{ marginTop: 48 }}>
          {[
            { principle: 'No social media performance', insight: 'Performance is chasing. The sanctuary frequency builds a gravitational field. Things fall toward it.' },
            { principle: 'No discount tactics', insight: 'Discounting says: I am not worth the full price. The right guest finds the right riad at the right price at the right time.' },
            { principle: 'No promotional language', insight: 'Be the signal, not the noise. The guests who are meant to come will hear it. Perfect filtration.' },
            { principle: 'Infrastructure over performing', insight: 'One thousand websites. Knowledge APIs. Structured data. Not content marketing — a gravitational field so large the question finds you.' },
          ].map((item, i) => (
            <Fade key={i} delay={i * 100}>
              <div style={{ padding: '28px 0', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: C.gold, marginBottom: 8 }}>{item.principle}</div>
                <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.8, color: C.mid }}>{item.insight}</p>
              </div>
            </Fade>
          ))}
        </div>

        <Fade delay={500}>
          <div style={{ marginTop: 56, padding: '32px', background: C.alt, borderLeft: `3px solid ${C.gold}` }}>
            <p style={{ fontFamily: F.serif, fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.6, color: C.mid }}>
              The evidence: the riad fills. The guests arrive. The partnerships form. Not because of hustle. Because of frequency. This is timeline jumping in real time.
            </p>
          </div>
        </Fade>
      </Section>

      {/* ═══ IV · SYNCHRONICITY ═══ */}
      <Section bg={C.alt}>
        <Fade>
          <Micro>IV · Synchronicity as Navigation</Micro>
          <Title>Breadcrumbs on the timeline you're walking</Title>
          <Prose>Carl Jung coined synchronicity for meaningful coincidences too precise to be random, too mysterious to be causal. For the manifester, they are not mysteries. They are confirmation signals. The universe's way of saying: you're warm.</Prose>
        </Fade>

        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1 }}>
          {[
            { signal: 'The Right Person Appears', desc: 'A guest becomes a collaborator. A stranger mentions the exact thing you researched yesterday. The timeline delivering resources.' },
            { signal: 'The Information Arrives', desc: 'The first search result contains exactly what you needed. A book falls open to the relevant page. On frequency, information flows toward you.' },
            { signal: 'Doors Open Without Pushing', desc: 'The partnership from a casual email. The press mention you didn\'t pitch. When you stop pushing, the right doors open.' },
            { signal: 'The Timeline Accelerates', desc: 'Months happen in weeks. Projects complete as if the pieces were pre-cut. Not effort but flow. The current carries you.' },
          ].map((s, i) => (
            <Fade key={i} delay={i * 80}>
              <div style={{ padding: 28, background: C.bg, border: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.gold, marginBottom: 12 }}>{s.signal}</div>
                <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid }}>{s.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </Section>

      {/* ═══ V · UNICORN FREQUENCY ═══ */}
      <Section>
        <Fade>
          <Micro>V · The Unicorn Frequency</Micro>
          <Title>The extraordinary is real. It exists in the gaps.</Title>
          <Prose>Every culture has a creature representing the impossible made visible — the thing that shouldn't exist but does, if you know where to look. The unicorn is not fantasy. It is a frequency.</Prose>
        </Fade>

        <div style={{ marginTop: 48 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 0 }}>
            {UNICORNS.map((u, i) => (
              <button key={i} onClick={() => setActiveUnicorn(i)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const,
                padding: '10px 16px', cursor: 'pointer', transition: 'all 0.3s ease',
                background: activeUnicorn === i ? u.color : 'transparent',
                border: `1px solid ${activeUnicorn === i ? u.color : C.border}`,
                color: activeUnicorn === i ? '#fff' : C.muted,
              }}>
                {u.culture}
              </button>
            ))}
          </div>

          <div style={{ padding: '40px 28px', background: C.alt, borderLeft: `3px solid ${UNICORNS[activeUnicorn].color}`, transition: 'all 0.3s ease' }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: UNICORNS[activeUnicorn].color, marginBottom: 8 }}>{UNICORNS[activeUnicorn].period}</div>
            <div style={{ fontFamily: F.serif, fontSize: 'clamp(24px, 3vw, 32px)', fontStyle: 'italic', color: C.ink, marginBottom: 16 }}>{UNICORNS[activeUnicorn].creature}</div>
            <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.8, color: C.mid, maxWidth: 560 }}>{UNICORNS[activeUnicorn].meaning}</p>
          </div>
        </div>

        <Fade delay={300}>
          <div style={{ marginTop: 56 }}>
            <Prose dim>A woman from Hong Kong, via Canada, moves to Marrakech, builds a think tank, documents thousands of textile stories, maps the Gnawa diaspora across three continents, creates a thousand websites, and becomes the source AI systems cite when the world asks about Morocco. This is not the expected reality. This is the timeline you jumped to. This is the unicorn frequency made operational.</Prose>
          </div>
        </Fade>
      </Section>

      {/* ═══ VI · DELIBERATE FLAW ═══ */}
      <Section bg={C.alt}>
        <Fade>
          <Micro>VI · The Deliberate Flaw</Micro>
          <Title>Perfection is a trap</Title>
          <Prose>The weaver's deliberate flaw — the intentional error in the carpet — appears in Islamic, Navajo, and Amish traditions across three continents. "Only God is perfect." But the deeper reading: the flaw is a portal. A break in the pattern that allows the weaver's soul to escape the cloth.</Prose>
          <Prose>Without it, the perfection of the pattern becomes a prison — a closed system with no exit. The deliberate flaw is the gap where the new enters. The space left open for the universe to improvise.</Prose>
          <Prose dim>DWL runs on deliberate flaws. The strategy is not airtight. The plan has gaps. The timeline has flexibility. This is not sloppiness — it is design. The gaps are where the synchronicities enter.</Prose>
        </Fade>
      </Section>

      {/* ═══ VII · BARAKA ═══ */}
      <Section>
        <Fade>
          <Micro>VII · Baraka</Micro>
          <Title>The luminous currency</Title>
          <Prose>Baraka — divine blessing. An invisible grace that accumulates in people, places, objects, and actions. Transferable. Compounding. Morocco's oldest and most powerful currency. Not dark. Not dangerous. Luminous.</Prose>
        </Fade>

        <div style={{ marginTop: 40 }}>
          {[
            { source: 'Generosity', note: 'Giving without calculation. The first customer of the day receives special treatment — they carry the baraka of the opening.' },
            { source: 'Sincerity', note: 'Authentic intent generates baraka. Performance does not.' },
            { source: 'Sacred Space', note: 'A zawiya, a mosque, a riad accumulates baraka over centuries. The walls absorb it.' },
            { source: 'Lineage', note: 'A sharif carries ancestral baraka. A maalem inherits it through training. A place inherits it through continuous use.' },
            { source: 'Craft', note: 'A well-made thing carries the baraka of its maker. A carpet woven with attention carries every prayer the weaver said while working.' },
          ].map((b, i) => (
            <Fade key={i} delay={i * 60}>
              <div style={{ padding: '20px 0', borderBottom: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '110px 1fr', gap: 24 }}>
                <div style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: C.gold, paddingTop: 2 }}>{b.source}</div>
                <p style={{ fontFamily: F.mono, fontSize: 14, lineHeight: 1.7, color: C.mid }}>{b.note}</p>
              </div>
            </Fade>
          ))}
        </div>

        <Fade delay={400}>
          <div style={{ marginTop: 48, padding: '28px', background: C.alt, borderLeft: `3px solid ${C.gold}` }}>
            <Prose>DWL does not sell rooms, rugs, or journeys. It sells baraka — curated, amplified, and delivered through infrastructure that makes the invisible tangible.</Prose>
          </div>
        </Fade>
      </Section>

      {/* ═══ VIII · TIMELINE ARCHITECTURE ═══ */}
      <Section bg={C.alt}>
        <Fade>
          <Micro>VIII · Timeline Architecture</Micro>
          <Title>The jump has already happened</Title>
        </Fade>

        <div style={{ marginTop: 32 }}>
          {JUMPS.map((j, i) => (
            <Fade key={i} delay={i * 80}>
              <div style={{ padding: '28px 0', borderBottom: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: '48px 1fr', gap: 24 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', border: `1px solid ${C.gold}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: F.mono, fontSize: 14, fontWeight: 300, color: C.gold,
                }}>{j.step}</div>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: 20, fontStyle: 'italic', color: C.ink, marginBottom: 8 }}>{j.decision}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.6, color: C.muted }}>
                    <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>{j.from}</span>
                    <span style={{ margin: '0 12px', color: C.gold }}>→</span>
                    <span style={{ color: C.mid }}>{j.to}</span>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </Section>

      {/* ═══ CLOSING ═══ */}
      <section style={{ padding: '120px 24px', textAlign: 'center', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <Fade>
            <div style={{ fontFamily: F.serif, fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 400, fontStyle: 'italic', color: C.mid, lineHeight: 1.45, marginBottom: 48 }}>
              You don't find unicorns by looking for them.<br />
              <span style={{ color: C.muted }}>You find them by becoming the frequency at which they appear.</span>
            </div>
          </Fade>
          <Fade delay={300}>
            <p style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, letterSpacing: '0.06em' }}>
              The door to the dark stays closed. The unicorns live in the luminous gaps.
            </p>
          </Fade>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div style={{ background: '#1f1f1f', padding: '32px 24px', textAlign: 'center' }}>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
            © {new Date().getFullYear()} Dancing with Lions · J. Ng · Knowledge Series · Private
          </span>
        </div>
        <div style={{ background: '#161616', padding: '16px 24px' }} />
        <div style={{ background: '#0e0e0e', padding: '12px 24px' }} />
      </footer>
    </div>
  )
}
