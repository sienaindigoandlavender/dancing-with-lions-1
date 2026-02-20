'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { KASBAHS, ARCHITECTURE, HISTORY, FILMS, ROUTE_STOPS, HERO_STATS, KEY_NUMBERS, BIBLIOGRAPHY } from './data'

const ACCENT = '#C2703E' // burnt sienna — the colour of rammed earth
const THREAD_COLORS: Record<string, string> = {
  ancient: '#A3A3A3',
  construction: '#C2703E',
  power: '#A855F7',
  decline: '#EF4444',
  cinema: '#3B82F6',
  conservation: '#22C55E',
}

export default function RouteThousandKasbahsPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [activeKasbah, setActiveKasbah] = useState(0)
  const [activeStop, setActiveStop] = useState<number | null>(null)
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [expandedArch, setExpandedArch] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const id = e.target.getAttribute('data-sid'); if (id) setVisibleSections(prev => new Set(prev).add(id)) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('[data-sid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const filteredHistory = activeThread ? HISTORY.filter(h => h.thread === activeThread) : HISTORY
  const vis = (id: string) => visibleSections.has(id)

  return (
    <main className="min-h-screen bg-white text-[#1C1917]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%"><defs><pattern id="earth-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="60" height="60" fill="none" stroke="#C2703E" strokeWidth="0.3" /><rect x="15" y="15" width="30" height="30" fill="none" stroke="#C2703E" strokeWidth="0.15" /><circle cx="30" cy="30" r="2" fill="none" stroke="#C2703E" strokeWidth="0.2" /></pattern></defs><rect width="100%" height="100%" fill="url(#earth-grid)" /></svg>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6">
            <Link href="/data" className="text-xs tracking-[0.3em] text-neutral-500 uppercase hover:text-neutral-600 transition-colors">← Data Index</Link>
          </div>
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Module 079 · Architectural &amp; Geographic Intelligence</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            The Route of a<br />Thousand Kasbahs
          </h1>
          <p className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Aït Benhaddou to Skoura. Fortified mud-brick architecture of the Drâa-Tafilalet.
            Four thousand earthen settlements rising from the valleys where the Atlas meets the Sahara.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {HERO_STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-light mb-1" style={{ color: ACCENT, fontFamily: "'Instrument Serif', Georgia, serif" }}>{s.value}</div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-neutral-600" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-600">Scroll</span>
        </div>
      </section>

      {/* ── KASBAHS ── */}
      <section data-sid="kasbahs" className="py-24 px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('kasbahs') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Fortresses</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Six Kasbahs That Define the Route</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">Each one a family&apos;s claim staked in earth. Built where trade routes crossed rivers, where passes funnelled caravans, where power needed a stage.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {KASBAHS.map((k, i) => (
              <button key={i} onClick={() => setActiveKasbah(i)}
                className={`text-left p-4 border transition-all duration-300 ${activeKasbah === i ? 'border-[#C2703E]/60 bg-[#C2703E]/5' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-1">{k.location.split(',')[0]}</div>
                <div className="text-sm font-medium">{k.name}</div>
                <div className="text-xs text-neutral-600 mt-1 font-arabic" dir="rtl">{k.arabic}</div>
              </button>
            ))}
          </div>

          {/* Active kasbah detail */}
          <div className="border border-neutral-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <h3 className="text-xl md:text-2xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{KASBAHS[activeKasbah].name}</h3>
                  <span className="text-sm text-neutral-600 font-arabic" dir="rtl">{KASBAHS[activeKasbah].arabic}</span>
                </div>
                <div className="text-xs tracking-[0.15em] uppercase text-neutral-500 mb-4">{KASBAHS[activeKasbah].location}</div>
                <div className="space-y-3 text-sm text-neutral-500 leading-relaxed">
                  <p><span className="text-neutral-500 text-xs uppercase tracking-wider">Built</span><br />{KASBAHS[activeKasbah].built}</p>
                  <p><span className="text-neutral-500 text-xs uppercase tracking-wider">Status</span><br />{KASBAHS[activeKasbah].status}</p>
                  <p className="text-neutral-600">{KASBAHS[activeKasbah].detail}</p>
                </div>
              </div>
              <div className="md:w-64 flex-shrink-0">
                <div className="border border-neutral-200 p-4 bg-[#C2703E]/[0.03]">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-2">Key Fact</div>
                  <p className="text-sm leading-relaxed" style={{ color: ACCENT }}>{KASBAHS[activeKasbah].keyFact}</p>
                </div>
                <div className="mt-3 text-[10px] text-neutral-600">
                  {KASBAHS[activeKasbah].coords.lat.toFixed(4)}°N, {Math.abs(KASBAHS[activeKasbah].coords.lng).toFixed(4)}°W
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section data-sid="arch" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('arch') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Vocabulary</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Anatomy of Earthen Architecture</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">Every element is a dialogue with the environment. Local materials, flat roofs for drying crops, thick walls for insulation, minimal openings for protection. Sustainable long before green design became a trend.</p>

          <div className="space-y-2">
            {ARCHITECTURE.map((a, i) => (
              <div key={i} className="border border-neutral-200 overflow-hidden">
                <button onClick={() => setExpandedArch(expandedArch === i ? null : i)}
                  className="w-full text-left p-4 md:p-5 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-base md:text-lg font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{a.name}</span>
                    {a.amazigh !== '—' && <span className="text-xs text-neutral-600">{a.amazigh}</span>}
                    <span className="text-xs text-neutral-600 font-arabic" dir="rtl">{a.arabic}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-500 hidden md:block">{a.function}</span>
                    <svg className={`w-4 h-4 text-neutral-600 transition-transform ${expandedArch === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                {expandedArch === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5">
                    <div className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: ACCENT }}>{a.function}</div>
                    <p className="text-sm text-neutral-500 leading-relaxed max-w-3xl">{a.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE ROUTE ── */}
      <section data-sid="route" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('route') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Road</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>370 Kilometres, Atlas to Sahara</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">From the highest paved pass in North Africa down to the first dunes. The route descends through valleys, gorges, and oases — each stop a world.</p>

          <div className="relative">
            {/* Route line */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#C2703E]/40 via-[#C2703E]/20 to-[#C2703E]/5" />

            <div className="space-y-1">
              {ROUTE_STOPS.map((stop, i) => (
                <div key={i}
                  className={`relative pl-10 md:pl-14 py-3 md:py-4 cursor-pointer transition-all duration-300 ${activeStop === i ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
                  onClick={() => setActiveStop(activeStop === i ? null : i)}>
                  {/* Dot */}
                  <div className={`absolute left-[11px] md:left-[19px] top-[18px] md:top-[22px] w-2.5 h-2.5 rounded-full border-2 transition-colors ${activeStop === i ? 'border-[#C2703E] bg-[#C2703E]' : 'border-neutral-600 bg-white'}`} />

                  <div className="flex items-baseline gap-3">
                    <span className="text-sm md:text-base font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>{stop.name}</span>
                    <span className="text-[10px] text-neutral-600">{stop.km}km</span>
                    <span className="text-[10px] text-neutral-600">{stop.elevation}</span>
                  </div>

                  {activeStop === i && (
                    <p className="text-sm text-neutral-500 mt-2 leading-relaxed max-w-xl">{stop.highlight}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Elevation indicator */}
            <div className="mt-8 flex justify-between text-[10px] text-neutral-600">
              <span>2,260m — Tizi n&apos;Tichka</span>
              <span className="text-right">700m — Merzouga</span>
            </div>
            <div className="mt-1 h-px bg-gradient-to-r from-[#C2703E]/30 via-[#C2703E]/15 to-[#C2703E]/5" />
          </div>
        </div>
      </section>

      {/* ── HOLLYWOOD ── */}
      <section data-sid="films" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('films') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Ouarzawood</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Hollywood&apos;s Desert</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-12 leading-relaxed">Atlas Studios in Ouarzazate is the largest film studio in the world. More than 20 international productions have used Aït Benhaddou as a backdrop. The ksar has played ancient Egypt, biblical Jerusalem, Kafiristan, Yunkai, and Rome&apos;s provinces.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {FILMS.map((f, i) => (
              <div key={i} className="border border-neutral-200 p-4 hover:border-neutral-300 transition-colors group">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm font-medium group-hover:text-[#C2703E] transition-colors">{f.title}</span>
                  <span className="text-xs text-neutral-600">{f.year}</span>
                </div>
                <div className="text-[10px] text-neutral-500">{f.location}</div>
                <div className="text-xs text-neutral-500 mt-1">{f.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLAOUI ── */}
      <section data-sid="glaoui" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('glaoui') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>The Dynasty</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>The Lord of the Atlas</h2>
          <p className="text-sm text-neutral-500 max-w-3xl mb-12 leading-relaxed">
            No story of the kasbahs can avoid the Glaoui. Thami El Glaoui (1879–1956) — Pasha of Marrakech, ally of France, host to Churchill and Chaplin, one of the richest men in the world, and ultimately a traitor who died broken. His kasbahs are the finest and the most haunted on the route.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Rise', detail: '1893: Glaoui brothers rescue Sultan Moulay Hassan from an Atlas blizzard. Rewarded with a Krupp cannon and feudal titles. They use the cannon to crush rival warlords. By 1912, Thami is Pasha of Marrakech — the most powerful man in the south.' },
              { label: 'Power', detail: 'Controlled the salt, olive, and saffron trades. Kasbah Telouet sat on caravan routes — every merchant paid tribute. Hosted Winston Churchill (who painted at his palace), Charlie Chaplin, Colette, Maurice Ravel. Attended Elizabeth II\'s coronation as Churchill\'s personal guest. Built Dar El Bacha in Marrakech.' },
              { label: 'Betrayal', detail: '1953: Conspired with France to exile Sultan Mohammed V to Madagascar. Declared a puppet imam. Miscalculated — insurrection followed. "He simply failed to realise that feudal government was no longer acceptable," his son Abdessadeq later wrote.' },
              { label: 'Fall', detail: '1955: Mohammed V returns in triumph. El Glaoui prostrates himself, kissing the ground at the Sultan\'s feet. French press photographs the humiliation. All Glaoui properties seized. January 23, 1956 — Thami dies during evening prayers. His kasbahs have been crumbling since.' },
            ].map((item, i) => (
              <div key={i} className="border border-neutral-200 p-5 md:p-6">
                <div className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>{item.label}</div>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section data-sid="timeline" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Chronology</p>
          <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>From Carthage to Conservation</h2>
          <p className="text-sm text-neutral-500 max-w-2xl mb-8 leading-relaxed">Twenty-six centuries of earth, power, and cinema.</p>

          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setActiveThread(null)}
              className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${!activeThread ? 'border-neutral-500 text-neutral-700' : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'}`}>
              All
            </button>
            {Object.entries(THREAD_COLORS).map(([thread, colour]) => (
              <button key={thread} onClick={() => setActiveThread(activeThread === thread ? null : thread)}
                className={`px-3 py-1 text-[10px] tracking-[0.15em] uppercase border transition-colors ${activeThread === thread ? 'text-neutral-700' : 'text-neutral-500 hover:border-neutral-300'}`}
                style={{ borderColor: activeThread === thread ? colour : undefined }}>
                {thread}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredHistory.map((h, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="text-xs text-neutral-500 font-mono">{h.year}</span>
                </div>
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: THREAD_COLORS[h.thread] || ACCENT }} />
                <p className="text-sm text-neutral-500 leading-relaxed">{h.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY NUMBERS ── */}
      <section data-sid="numbers" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${vis('numbers') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>By the Numbers</p>
          <h2 className="text-3xl md:text-4xl font-light mb-12" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Key Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KEY_NUMBERS.map((n, i) => (
              <div key={i} className="border border-neutral-200 p-5 hover:border-neutral-300 transition-colors">
                <div className="text-2xl md:text-3xl font-light mb-2" style={{ color: ACCENT, fontFamily: "'Instrument Serif', Georgia, serif" }}>{n.number}</div>
                <p className="text-xs text-neutral-500 leading-relaxed">{n.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIBLIOGRAPHY ── */}
      <section data-sid="bib" className="py-24 px-6 border-t border-neutral-200">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${vis('bib') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>Sources</p>
          <h2 className="text-2xl md:text-3xl font-light mb-8" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Bibliography</h2>
          <div className="space-y-4">
            {BIBLIOGRAPHY.map((b, i) => (
              <div key={i} className="border-l border-neutral-200 pl-4">
                <div className="text-sm text-neutral-600 mb-1">{b.source}</div>
                <div className="text-xs text-neutral-500 leading-relaxed">{b.detail}</div>
                {'url' in b && b.url && <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-[10px] hover:underline mt-1 inline-block" style={{ color: ACCENT }}>{b.url}</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#1f1f1f' }} className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[11px] text-white/50 tracking-[0.15em] uppercase">
            Module 079 · The Route of a Thousand Kasbahs · © Dancing with Lions
          </p>
          <p className="text-[11px] text-white/35 mt-2">
            Data: UNESCO, Getty Conservation Institute, CERKAS, Drâa-Tafilalet Census 2014
          </p>
        </div>
      
        <div style={{ backgroundColor: '#161616' }} className="mt-12 -mx-6 -mb-16 py-3">
          <p className="text-center text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>dancingwithlions.com</p>
        </div>
      </footer>
    </main>
  )
}
