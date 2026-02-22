'use client'

import { useState, useEffect, useRef } from 'react'
import { NAMES, SCRIPTURES, PEOPLE, EGYPTIAN_NAMES, TIMELINE, BIBLIOGRAPHY } from './data'

const C = {
  bg: '#ffffff', alt: '#fafafa', ink: '#0a0a0a', body: '#262626',
  mid: '#525252', muted: '#737373', border: '#e5e5e5',
}
const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
const GOLD = '#C4963C', PURPLE = '#5E60CE', RED = '#E63946', GREEN = '#2D6E4F', BROWN = '#8B7355'

function useInView(t = 0.12) {
  const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect() } }, { threshold: t }); o.observe(el); return () => o.disconnect() }, [t])
  return { ref, v }
}
function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, v } = useInView(); return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms` }}>{children}</div>
}
function Micro({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color, marginBottom: 16 }}>{children}</div>
}
function Title({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(28px, 4.5vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>{children}</h2>
}
function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: F.mono, fontSize: 15, lineHeight: 1.85, color: C.mid, marginBottom: 20, maxWidth: 640 }}>{children}</p>
}
function Sec({ children, bg = C.bg }: { children: React.ReactNode; bg?: string }) {
  return <section style={{ background: bg, padding: '80px 24px', borderTop: `1px solid ${C.border}` }}><div style={{ maxWidth: 800, margin: '0 auto' }}>{children}</div></section>
}

export default function LandOfTheSettingSun() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [mapFilter, setMapFilter] = useState<'all' | 'biblical' | 'pope' | 'theologian'>('all')
  const [scriptureFilter, setScriptureFilter] = useState('all')
  const [timeFilter, setTimeFilter] = useState('all')
  const [expandedScripture, setExpandedScripture] = useState<number | null>(null)
  const [expandedPerson, setExpandedPerson] = useState<number | null>(null)
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  const filteredPeople = mapFilter === 'all' ? PEOPLE : PEOPLE.filter(p => p.type === mapFilter)
  const filteredScriptures = scriptureFilter === 'all' ? SCRIPTURES : SCRIPTURES.filter(s => s.type === scriptureFilter)
  const filteredTime = timeFilter === 'all' ? TIMELINE : TIMELINE.filter(e => e.type === timeFilter)

  // ── MAPBOX ──
  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const l = document.createElement('link'); l.rel = 'stylesheet'
        l.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'; document.head.appendChild(l)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [15, 32], zoom: 3.2, minZoom: 2, maxZoom: 10, attributionControl: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        const colors: Record<string, string> = { biblical: GOLD, pope: PURPLE, theologian: GREEN }
        PEOPLE.forEach((p, i) => {
          map.addSource(`person-${i}`, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: p.coords } } })
          map.addLayer({ id: `person-${i}`, type: 'circle', source: `person-${i}`,
            paint: { 'circle-radius': 8, 'circle-color': colors[p.type] || BROWN, 'circle-opacity': 0.8, 'circle-stroke-width': 2, 'circle-stroke-color': '#fff' } })
        })
        mapRef.current = map
      })
    })
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [])

  useEffect(() => {
    const map = mapRef.current; if (!map || !map.isStyleLoaded()) return
    PEOPLE.forEach((p, i) => {
      try {
        if (map.getLayer(`person-${i}`)) {
          const show = mapFilter === 'all' || p.type === mapFilter
          map.setPaintProperty(`person-${i}`, 'circle-opacity', show ? 0.8 : 0.08)
          map.setPaintProperty(`person-${i}`, 'circle-stroke-color', show ? '#fff' : 'transparent')
        }
      } catch {}
    })
  }, [mapFilter])

  return (
    <div style={{ background: C.bg, color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section style={{ padding: 'clamp(100px, 15vw, 180px) 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        <Fade><Micro>Module · History & Identity</Micro></Fade>
        <Fade delay={150}>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 400, fontStyle: 'italic', color: C.ink, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 32 }}>
            From the Land<br />of the Setting Sun
          </h1>
        </Fade>
        <Fade delay={300}>
          <p style={{ fontFamily: F.serif, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, fontStyle: 'italic', color: C.muted, lineHeight: 1.4, maxWidth: 520 }}>
            The Amazigh in the Bible.
          </p>
        </Fade>
        <Fade delay={450}>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { n: '14', label: 'Scripture references' },
              { n: '3', label: 'Popes from the Maghreb' },
              { n: '3', label: 'Biblical Hebrew names' },
              { n: '~925 BCE', label: 'Lubim sack Jerusalem' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: F.serif, fontSize: 32, fontStyle: 'italic', color: C.ink, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Fade>
      </section>

      {/* ═══ INTRO ═══ */}
      <Sec>
        <Fade>
          <Body>Before there is Africa, before there is Morocco or Algeria or Tunisia, there is the Maghreb. The land where the sun sets. The people who live there have no single name that outsiders agree on. The Egyptians call them Tehenu, Temehu, Rebu, Meshwesh. The Hebrews call them Lehabim, Lubim, Phut. The Greeks will call them Libyans. They call themselves Imazighen — the free people.</Body>
          <Body>They appear in the oldest book in the Western world. Not as footnotes. Not as background. As warriors, as allies, as the military power behind empires. They sack Solomon's temple. They carry Christ's cross. They invent the language of Christian theology. Three of them become Pope.</Body>
          <Body>This is what the Bible says about the Imazighen. Every word of it has a receipt.</Body>
        </Fade>
      </Sec>

      {/* ═══ THE NAMES ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={GOLD}>The Names</Micro>
          <Title>What the Bible calls them</Title>
        </Fade>
        {NAMES.map((n, i) => (
          <Fade key={i} delay={i * 80}>
            <div style={{ padding: '24px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: F.serif, fontSize: 28, fontStyle: 'italic', color: C.ink }}>{n.transliteration}</span>
                <span style={{ fontFamily: F.mono, fontSize: 18, color: GOLD, direction: 'rtl' as const }}>{n.hebrew}</span>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 4 }}>
                Meaning: "{n.meaning}" · Modern equivalent: {n.modernEquivalent}
              </div>
              <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid, marginTop: 12 }}>{n.detail}</p>
            </div>
          </Fade>
        ))}
        <Fade delay={300}>
          <div style={{ marginTop: 40 }}>
            <Micro color={BROWN}>What the Egyptians called them</Micro>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 1 }}>
              {EGYPTIAN_NAMES.map((en, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: F.serif, fontSize: 18, fontStyle: 'italic', color: C.ink }}>{en.name}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: BROWN, marginTop: 2 }}>{en.period}</div>
                  <p style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.7, color: C.mid, marginTop: 6 }}>{en.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </Sec>

      {/* ═══ SCRIPTURES ═══ */}
      <Sec>
        <Fade>
          <Micro color={RED}>The Verses</Micro>
          <Title>What the text says</Title>
        </Fade>
        <Fade delay={100}>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { key: 'all', label: 'All', color: C.ink },
              { key: 'genealogy', label: 'Genealogy', color: BROWN },
              { key: 'warriors', label: 'Warriors', color: RED },
              { key: 'prophecy', label: 'Prophecy', color: GOLD },
              { key: 'gospel', label: 'Gospel', color: PURPLE },
              { key: 'early_church', label: 'Early Church', color: GREEN },
            ].map(f => (
              <button key={f.key} onClick={() => setScriptureFilter(f.key)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 14px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: scriptureFilter === f.key ? f.color : 'transparent',
                color: scriptureFilter === f.key ? '#fff' : C.muted,
                border: `1px solid ${scriptureFilter === f.key ? f.color : C.border}`,
              }}>{f.label}</button>
            ))}
          </div>
        </Fade>
        {filteredScriptures.map((s, i) => {
          const typeColors: Record<string, string> = { genealogy: BROWN, warriors: RED, prophecy: GOLD, gospel: PURPLE, early_church: GREEN }
          return (
            <Fade key={`${s.book}-${s.chapter}-${i}`} delay={i * 30}>
              <div onClick={() => setExpandedScripture(expandedScripture === i ? null : i)} style={{
                padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: F.mono, fontSize: 11, fontWeight: 700, color: typeColors[s.type] || C.muted }}>{s.book} {s.chapter}:{s.verse}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: C.muted }}>{s.era}</span>
                </div>
                <p style={{ fontFamily: F.serif, fontSize: 17, fontStyle: 'italic', color: C.ink, lineHeight: 1.5, marginTop: 8 }}>"{s.text}"</p>
                <div style={{ maxHeight: expandedScripture === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid, paddingTop: 8 }}>{s.context}</p>
                </div>
              </div>
            </Fade>
          )
        })}
      </Sec>

      {/* ═══ MAP — THE PEOPLE ═══ */}
      <section style={{ borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: '48px 24px 24px', maxWidth: 800, margin: '0 auto' }}>
          <Fade>
            <Micro color={PURPLE}>The People</Micro>
            <Title>Warriors, theologians, popes</Title>
          </Fade>
          <Fade delay={100}>
            <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 16 }}>
              {[
                { key: 'all' as const, label: 'All', color: C.ink },
                { key: 'biblical' as const, label: 'Biblical Figures', color: GOLD },
                { key: 'theologian' as const, label: 'Theologians', color: GREEN },
                { key: 'pope' as const, label: 'Popes', color: PURPLE },
              ].map(f => (
                <button key={f.key} onClick={() => setMapFilter(f.key)} style={{
                  fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                  padding: '8px 16px', cursor: 'pointer', transition: 'all 0.2s ease',
                  background: mapFilter === f.key ? f.color : 'transparent',
                  color: mapFilter === f.key ? '#fff' : C.muted,
                  border: `1px solid ${mapFilter === f.key ? f.color : C.border}`,
                }}>{f.label}</button>
              ))}
            </div>
          </Fade>
        </div>
        <div ref={mapContainer} style={{ width: '100%', height: 'clamp(400px, 55vw, 600px)', background: '#f5f5f5' }} />
        <div style={{ padding: '32px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
          {filteredPeople.map((p, i) => {
            const typeColors: Record<string, string> = { biblical: GOLD, pope: PURPLE, theologian: GREEN }
            return (
              <div key={p.name} onClick={() => setExpandedPerson(expandedPerson === i ? null : i)} style={{ padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: F.serif, fontSize: 20, fontStyle: 'italic', color: C.ink }}>{p.name}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: typeColors[p.type] || C.muted, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{p.type}</span>
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginTop: 2 }}>
                  {p.dates} · {p.origin}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: C.mid, marginTop: 4 }}>{p.role}</div>
                <div style={{ maxHeight: expandedPerson === i ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid, paddingTop: 8 }}>{p.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <Sec bg={C.alt}>
        <Fade>
          <Micro color={GOLD}>Timeline</Micro>
          <Title>3,500 years in the text</Title>
        </Fade>
        <Fade delay={100}>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: 40 }}>
            {[
              { key: 'all', label: 'All', color: C.ink },
              { key: 'ancient', label: 'Ancient', color: BROWN },
              { key: 'biblical', label: 'Biblical', color: GOLD },
              { key: 'church', label: 'Church', color: PURPLE },
              { key: 'theological', label: 'Theological', color: GREEN },
            ].map(f => (
              <button key={f.key} onClick={() => setTimeFilter(f.key)} style={{
                fontFamily: F.mono, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                padding: '8px 14px', cursor: 'pointer', transition: 'all 0.2s ease',
                background: timeFilter === f.key ? f.color : 'transparent',
                color: timeFilter === f.key ? '#fff' : C.muted,
                border: `1px solid ${timeFilter === f.key ? f.color : C.border}`,
              }}>{f.label}</button>
            ))}
          </div>
        </Fade>
        {filteredTime.map((e, i) => {
          const typeColors: Record<string, string> = { ancient: BROWN, biblical: GOLD, church: PURPLE, theological: GREEN }
          return (
            <Fade key={`${e.sortYear}-${i}`} delay={i * 30}>
              <div onClick={() => setExpandedEvent(expandedEvent === i ? null : i)} style={{
                padding: '20px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
                display: 'grid', gridTemplateColumns: 'clamp(90px, 13vw, 130px) 1fr', gap: 16,
              }}>
                <div>
                  <div style={{ fontFamily: F.serif, fontSize: 15, fontStyle: 'italic', color: C.ink, lineHeight: 1.2 }}>{e.year}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 4, color: typeColors[e.type] }}>{e.type}</div>
                </div>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: C.ink }}>{e.title}</div>
                  <div style={{ maxHeight: expandedEvent === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                    <p style={{ fontFamily: F.mono, fontSize: 13, lineHeight: 1.8, color: C.mid, paddingTop: 8 }}>{e.detail}</p>
                  </div>
                </div>
              </div>
            </Fade>
          )
        })}
      </Sec>

      {/* ═══ THE CONNECTION ═══ */}
      <Sec>
        <Fade>
          <Micro color={GOLD}>The Connection</Micro>
          <Title>The land of the setting sun</Title>
          <Body>The Imazighen are in the Bible from beginning to end. Genesis to Revelation. In the Table of Nations, they are born. In the prophets, they are warriors. In the Gospels, one of them carries the cross. In Acts, they are at Pentecost, they preach in Antioch, they lead the early church. In the centuries that follow, they invent the vocabulary of Christian theology, they lead it as popes, and one of them — a Berber from a town called "Market of Lions" in Algeria — writes the books that shape Western thought for a millennium and a half.</Body>
          <Body>The Hebrew word for them means "people of the dry land." The Arabic word for where they live means "the place of the setting sun." Al-Maghreb. They were there before both languages existed. They are still there. And the text remembers them — if you know what names to look for.</Body>
        </Fade>
      </Sec>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section style={{ padding: '64px 24px', background: C.alt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Micro>Sources</Micro>
          {BIBLIOGRAPHY.map((b, i) => (
            <p key={i} style={{ fontFamily: F.mono, fontSize: 11, lineHeight: 1.8, color: C.muted, marginBottom: 8, paddingLeft: 24, textIndent: -24 }}>{b}</p>
          ))}
        </div>
      </section>

      <section style={{ padding: '24px', background: C.alt, textAlign: 'center' as const }}>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted }}>
          Scripture quotations adapted from ESV. Historical sources cited above.
        </p>
        <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.08em', color: C.muted, marginTop: 4 }}>© Dancing with Lions</p>
      </section>

      <footer>
        <div style={{ background: '#1f1f1f', padding: '40px 24px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>From the Land of the Setting Sun</span>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Dancing with Lions · History & Identity</span>
          </div>
        </div>
        <div style={{ background: '#161616', padding: '20px 24px', textAlign: 'center' as const }}>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>© {new Date().getFullYear()} Dancing with Lions · J. Ng</span>
        </div>
        <div style={{ background: '#0e0e0e', padding: '12px 24px' }} />
      </footer>
    </div>
  )
}
