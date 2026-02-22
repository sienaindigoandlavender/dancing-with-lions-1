'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const C = {
  gnawa: '#1A3C5E', gold: '#C8A415', earth: '#8B6E4E', blood: '#722F37',
  sahel: '#C17F28', green: '#2D6E4F', sand: '#D4C5A0',
  ink: '#1a1a1a', text: '#3a3a3a', muted: '#8c8c8c', border: '#e0e0e0',
}

// ═══ SOURCE KINGDOMS & REGIONS ═══
interface SourceRegion {
  name: string; modernCountry: string; lat: number; lng: number
  peoples: string; era: string; note: string
}

const SOURCES: SourceRegion[] = [
  { name: 'Kingdom of Ghana (Wagadou)', modernCountry: 'Mauritania/Mali', lat: 15.7, lng: -7.5, peoples: 'Soninke', era: '11th–13th c.', note: 'Earliest source. "Gnawa" may derive from "Ghana" — the kingdom, not the modern country. The Almoravid conquest of 1076 intensified slave-taking from this region.' },
  { name: 'Djenné', modernCountry: 'Mali', lat: 13.91, lng: -4.55, peoples: 'Bambara, Fulani', era: '13th–17th c.', note: 'One of the great slave markets of West Africa. "Gnawi" may be a deformation of "Jennawi" (from Djenné). The city was a nexus of trans-Saharan trade.' },
  { name: 'Timbuktu', modernCountry: 'Mali', lat: 16.77, lng: -3.01, peoples: 'Songhai, Bambara, Tuareg-held captives', era: '14th–16th c.', note: 'Caravan terminus. After Sultan Ahmed al-Mansur conquered the Songhai Empire in 1591, the flow of enslaved peoples to Morocco intensified dramatically.' },
  { name: 'Songhai Empire', modernCountry: 'Mali/Niger', lat: 14.5, lng: 1.5, peoples: 'Songhai, Hausa', era: '15th–16th c.', note: 'Morocco\'s 1591 conquest of Songhai by Ahmad al-Mansur was a turning point. Thousands of captives were marched north. The Saadian dynasty depended on this labor and military power.' },
  { name: 'Hausaland', modernCountry: 'Nigeria/Niger', lat: 12.0, lng: 8.5, peoples: 'Hausa', era: '16th–19th c.', note: 'The Hausa Bori possession tradition shares striking parallels with Gnawa lila ceremonies. Both use music to invoke spirits. The connection may predate the slave trade.' },
  { name: 'Senegambia', modernCountry: 'Senegal/Gambia', lat: 14.5, lng: -15.5, peoples: 'Wolof, Mandinka', era: '11th–19th c.', note: 'Western terminus of the Sahel slave corridor. The griot tradition — hereditary musicians as keepers of history — parallels the Gnawa maalem lineage.' },
  { name: 'Mossi Kingdoms', modernCountry: 'Burkina Faso', lat: 12.3, lng: -1.5, peoples: 'Mossi', era: '15th–18th c.', note: 'Raided by neighboring kingdoms. Mossi captives entered the trans-Saharan routes via Djenné and Timbuktu.' },
  { name: 'Bornu Empire', modernCountry: 'Nigeria/Chad', lat: 12.1, lng: 14.0, peoples: 'Kanuri', era: '16th–19th c.', note: 'Eastern source. The Kanuri sold captives into Saharan trade networks that fed the Fezzan corridor to Tripoli and, further west, to Morocco.' },
]

// ═══ TRADE ROUTES ═══
interface Route {
  name: string; color: string; era: string; description: string
  coords: [number, number][]
}

const ROUTES: Route[] = [
  {
    name: 'Western Route (Ghana → Sijilmasa → Fes)',
    color: C.sahel, era: '11th–16th c.',
    description: 'The oldest corridor. From the Ghana/Mali heartland through Oualata and Sijilmasa to the imperial cities of Morocco. Caravans of 1,000+ camels. Journey: 40–60 days across the Sahara.',
    coords: [[-7.5, 15.7], [-7.1, 17.5], [-6.5, 20.0], [-4.3, 25.5], [-4.1, 31.2], [-4.9, 34.0]],
  },
  {
    name: 'Timbuktu–Marrakech Route',
    color: C.gold, era: '14th–17th c.',
    description: 'The golden route. Timbuktu to Marrakech via Taghaza (salt mines) and the Draa Valley. Essaouira was called "the Port of Timbuktu." The Gnawa concentrations in Marrakech and Essaouira trace directly to this corridor.',
    coords: [[-3.0, 16.77], [-4.0, 19.5], [-5.5, 23.0], [-6.0, 27.0], [-6.8, 30.3], [-8.0, 31.63]],
  },
  {
    name: 'Songhai Conquest Route (1591)',
    color: C.blood, era: '1591–1620s',
    description: 'After Ahmad al-Mansur\'s army conquered the Songhai Empire, thousands of captives were marched north. This single military campaign permanently changed Morocco\'s demographic and cultural landscape.',
    coords: [[1.5, 14.5], [-0.5, 16.0], [-3.0, 16.77], [-4.0, 19.5], [-5.0, 23.0], [-5.5, 27.5], [-6.5, 30.0], [-7.6, 31.6]],
  },
  {
    name: 'Central Saharan Route (Hausaland → Fezzan → Tripoli)',
    color: C.earth, era: '16th–19th c.',
    description: 'Eastern corridor feeding North Africa. Hausa captives passed through the Fezzan (Libya). Some were redirected westward to Morocco. The Hausa Bori tradition is the closest parallel to Gnawa possession ceremonies.',
    coords: [[8.5, 12.0], [10.0, 15.0], [13.0, 20.0], [14.0, 26.0], [13.1, 32.9]],
  },
]

// ═══ MOROCCAN GNAWA CENTRES ═══
interface GnawaCentre {
  name: string; lat: number; lng: number; type: 'major' | 'active' | 'historical'
  note: string; maalem?: string
}

const CENTRES: GnawaCentre[] = [
  { name: 'Essaouira', lat: 31.513, lng: -9.770, type: 'major', note: 'Spiritual capital. "The Port of Timbuktu." Annual Gnaoua World Music Festival (500K+ visitors). The Gania family dynasty of maalem. UNESCO 2019.', maalem: 'Mahmoud Guinia (d. 2015), Mokhtar Gania, Zaida Gania' },
  { name: 'Marrakech', lat: 31.628, lng: -7.990, type: 'major', note: 'The other great center. Jemaa el-Fna nightly performances. Sanctuary of Moulay Brahim (Atlas Mountains). Sanctuary of Moulay Abdullah ben Tsain (Tamesloht). The Belkani and Baqbou maalem families.', maalem: 'Brahim Belkani, Mustapha Baqbou, Ahmed Baqbou' },
  { name: 'Tangier', lat: 35.78, lng: -5.81, type: 'active', note: 'Northern center. Where Abdellah El Gourd learned Gnawa while working as a radio engineer. Collaborations with Randy Weston and Archie Shepp.', maalem: 'Abdellah El Gourd' },
  { name: 'Rabat-Salé', lat: 34.02, lng: -6.83, type: 'active', note: 'Capital city Gnawa community. Hamid El Kasri — one of the biggest stars — based here.', maalem: 'Hamid El Kasri' },
  { name: 'Casablanca', lat: 33.57, lng: -7.59, type: 'active', note: 'Largest urban Gnawa community. The late Ahmida Boussou and Saïd Oughassal.', maalem: 'Ahmida Boussou (d.), Saïd Oughassal' },
  { name: 'Fes', lat: 34.04, lng: -4.98, type: 'active', note: 'Gnawa community in the ancient medina. Less prominent than Marrakech/Essaouira but present.', },
  { name: 'Meknès', lat: 33.89, lng: -5.56, type: 'historical', note: 'Moulay Ismail\'s Black Guard (Abid al-Bukhari) — 150,000 enslaved soldiers from sub-Saharan Africa. The largest forced importation of Black Africans in Moroccan history. Gnawa traditions trace directly to this garrison.' },
  { name: 'Khamlia', lat: 31.12, lng: -3.96, type: 'active', note: 'Desert village near Merzouga. Entirely Gnawa community. Annual August festival. The Pigeons du Sable ensemble. Visitors can attend open lila ceremonies.' },
  { name: 'Tamesloht', lat: 31.48, lng: -8.12, type: 'historical', note: 'Village between Marrakech and Amizmiz. Sanctuary of Moulay Abdullah bin Tsain. Annual Gnawa pilgrimage connected to the Prophet\'s birthday.' },
  { name: 'Taroudant / Sous Valley', lat: 30.47, lng: -8.88, type: 'active', note: 'Home of the Ganga — a Gnawa sub-group who speak Tashelhait and play only krakeb and large drums (tebel/ganga), not guembri.' },
]

// ═══ THE SEVEN SPIRIT FAMILIES ═══
interface SpiritFamily {
  name: string; color: string; colorHex: string; element: string; incense: string; saint: string
}

const SPIRITS: SpiritFamily[] = [
  { name: 'Mluk al-Baydan', color: 'White', colorHex: '#F5F0E8', element: 'Air', incense: 'Jawi (benzoin)', saint: 'Moulay Abdelkader Jilali' },
  { name: 'Mluk al-Khodor', color: 'Green', colorHex: '#2D6E4F', element: 'Water/Sea', incense: 'Musk', saint: 'Moulay Ibrahim' },
  { name: 'Mluk al-Hmor', color: 'Red', colorHex: '#8B3A3A', element: 'Fire/Blood', incense: 'Sandarous', saint: 'Sidi Hammu' },
  { name: 'Mluk al-Khal', color: 'Black', colorHex: '#1a1a1a', element: 'Earth/Darkness', incense: 'Harmal (rue)', saint: 'Sidi Mimoun' },
  { name: 'Mluk al-Zraq', color: 'Blue/Indigo', colorHex: '#1A3C5E', element: 'Sky/Water', incense: 'Mixed', saint: 'Sidi Moussa' },
  { name: 'Mluk al-Msawiyin', color: 'Yellow', colorHex: '#C8A415', element: 'Gold/Sun', incense: 'Fassoukh', saint: 'Lalla Mira' },
  { name: 'Mluk al-Habiyin', color: 'Purple/Violet', colorHex: '#5D4E7A', element: 'Forest/Earth', incense: 'Oud', saint: 'Sidi Mokhtar' },
]

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

// ═══ MAP ═══
function GnawaMap({ selected, onSelectCentre, showRoutes }: {
  selected: number | null; onSelectCentre: (i: number) => void; showRoutes: boolean
}) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapboxgl = (window as any).mapboxgl
    if (!mapboxgl) return

    const m = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-4.0, 22.0],
      zoom: 3.5,
      accessToken: MAPBOX_TOKEN,
      attributionControl: false,
    })
    m.addControl(new mapboxgl.NavigationControl(), 'top-right')
    m.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    m.on('load', () => {
      // Trade routes
      ROUTES.forEach((r, i) => {
        m.addSource(`route-${i}`, {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: r.coords } }
        })
        m.addLayer({
          id: `route-line-${i}`, type: 'line', source: `route-${i}`,
          paint: { 'line-color': r.color, 'line-width': 2.5, 'line-opacity': 0.6, 'line-dasharray': [4, 3] }
        })
      })

      // Source region markers
      SOURCES.forEach(s => {
        const el = document.createElement('div')
        el.style.cssText = `width:12px;height:12px;border-radius:50%;background:${C.sahel};border:2px solid ${C.gold};opacity:0.8;cursor:pointer;`
        el.title = `${s.name} (${s.peoples})`
        new mapboxgl.Marker({ element: el }).setLngLat([s.lng, s.lat]).addTo(m)
      })

      // Moroccan Gnawa centres
      CENTRES.forEach((c, i) => {
        const el = document.createElement('div')
        const size = c.type === 'major' ? 18 : c.type === 'active' ? 12 : 9
        el.style.cssText = `
          width:${size}px;height:${size}px;border-radius:50%;
          background:${C.gnawa};border:2px solid ${c.type === 'major' ? C.gold : 'white'};
          cursor:pointer;transition:all 0.3s;
          box-shadow:${c.type === 'major' ? `0 0 10px ${C.gnawa}60` : '0 1px 4px rgba(0,0,0,0.3)'};
        `
        el.addEventListener('click', () => onSelectCentre(i))
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)' })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
        const marker = new mapboxgl.Marker({ element: el }).setLngLat([c.lng, c.lat]).addTo(m)
        markersRef.current.push(marker)
      })
    })

    map.current = m
    return () => m.remove()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Toggle route visibility
  useEffect(() => {
    if (!map.current) return
    ROUTES.forEach((_, i) => {
      if (map.current?.getLayer(`route-line-${i}`)) {
        map.current.setLayoutProperty(`route-line-${i}`, 'visibility', showRoutes ? 'visible' : 'none')
      }
    })
  }, [showRoutes])

  // Fly to selected
  useEffect(() => {
    if (selected !== null && map.current) {
      const c = CENTRES[selected]
      map.current.flyTo({ center: [c.lng, c.lat], zoom: c.type === 'major' ? 11 : 9, duration: 1200 })
    }
  }, [selected])

  return <div ref={mapContainer} className="w-full rounded-sm" style={{ height: '560px' }} />
}

// ═══ MAIN ═══
export default function GnawaRoadPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [showRoutes, setShowRoutes] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const heroR = useReveal()
  const mapR = useReveal()
  const spiritsR = useReveal()

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('mapbox-gl-gnawa')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
      document.head.appendChild(link)
      const script = document.createElement('script')
      script.id = 'mapbox-gl-gnawa'
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.js'
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else {
      setMapLoaded(true)
    }
  }, [])

  const selectedCentre = selected !== null ? CENTRES[selected] : null

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <Link href="/data" className="font-mono text-[10px] uppercase tracking-[0.12em] hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>← All Data Modules</Link>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Module 060 · Music & Memory</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Gnawa Road</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            From the Sahel to the medina. The sound of a memory that survived.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          The guembri was not invented in Morocco. It arrived in the hands of
          people who didn&apos;t choose to come. Between the 11th and 19th centuries,
          enslaved peoples from the kingdoms of Ghana, Songhai, Hausaland, and
          Senegambia were marched north across the Sahara to serve as soldiers,
          laborers, and household workers in Moroccan cities. They brought their
          music, their spirits, their healing traditions. What survived the
          crossing became Gnawa — the sound of sub-Saharan Africa refracted
          through Islamic Morocco.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '8', l: 'source kingdoms mapped', c: C.sahel },
            { v: '4', l: 'trans-Saharan routes', c: C.gold },
            { v: '10', l: 'Gnawa centres in Morocco', c: C.gnawa },
            { v: '7', l: 'spirit families in the lila', c: C.blood },
          ].map((n, i) => (
            <div key={i} className="transition-all duration-700" style={{ opacity: heroR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}>
                <span className="text-[28px] font-bold">{n.v}</span>
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-8">
        <div ref={mapR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: C.gnawa }}>The Trans-Saharan Corridor</p>
              <p className="text-[12px]" style={{ color: C.muted }}>
                Gold dots = source kingdoms. Blue dots = Moroccan Gnawa centres. Dashed lines = slave trade routes.
              </p>
            </div>
            <button onClick={() => setShowRoutes(!showRoutes)}
              className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-mono transition-all"
              style={{ background: showRoutes ? C.gnawa : 'transparent', color: showRoutes ? 'white' : C.gnawa, border: `1px solid ${C.gnawa}` }}>
              {showRoutes ? 'Hide' : 'Show'} Routes
            </button>
          </div>

          <div className="relative">
            {mapLoaded && <GnawaMap selected={selected} onSelectCentre={setSelected} showRoutes={showRoutes} />}

            {/* Detail overlay */}
            {selectedCentre && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[380px] p-5 bg-white/95 backdrop-blur-sm rounded-sm shadow-lg"
                style={{ borderLeft: `3px solid ${C.gnawa}` }}>
                <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-[11px] hover:opacity-60" style={{ color: C.muted }}>✕</button>
                <span className="inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono mb-2"
                  style={{ background: selectedCentre.type === 'major' ? `${C.gold}20` : `${C.gnawa}10`, color: selectedCentre.type === 'major' ? C.gold : C.gnawa }}>
                  {selectedCentre.type === 'major' ? 'Major Centre' : selectedCentre.type === 'active' ? 'Active' : 'Historical'}
                </span>
                <h3 className="font-serif text-[20px] leading-tight">{selectedCentre.name}</h3>
                <p className="text-[12px] mt-3 leading-[1.6]" style={{ color: C.text }}>{selectedCentre.note}</p>
                {selectedCentre.maalem && (
                  <p className="font-mono text-[10px] mt-3" style={{ color: C.muted }}>Maalem: {selectedCentre.maalem}</p>
                )}
              </div>
            )}

            {/* Route legend */}
            <div className="absolute top-4 left-4 p-3 bg-white/70 backdrop-blur-sm rounded-sm">
              {ROUTES.map((r, i) => (
                <div key={i} className="flex items-center gap-2 mb-1 last:mb-0">
                  <span className="w-4 h-0 border-t-2 border-dashed" style={{ borderColor: r.color }} />
                  <span className="text-[9px] font-mono text-white/80">{r.name.split('(')[0].trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCE KINGDOMS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.sahel }}>Where They Came From</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {SOURCES.map((s, i) => (
              <div key={i} className="p-4" style={{ background: `${C.sahel}06`, borderLeft: `2px solid ${C.sahel}30` }}>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-[15px] font-semibold">{s.name}</span>
                  <span className="font-mono text-[10px]" style={{ color: C.muted }}>{s.era}</span>
                </div>
                <p className="font-mono text-[10px] mt-0.5" style={{ color: C.sahel }}>{s.peoples} · {s.modernCountry}</p>
                <p className="text-[11px] leading-[1.6] mt-2" style={{ color: C.text }}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GNAWA CENTRES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.gnawa }}>Where They Arrived</p>
          <div className="flex flex-wrap gap-2">
            {CENTRES.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className="px-3 py-2 text-left transition-all hover:opacity-80"
                style={{
                  background: selected === i ? C.gnawa : `${C.gnawa}06`,
                  color: selected === i ? 'white' : C.ink,
                  borderBottom: c.type === 'major' ? `2px solid ${C.gold}` : '2px solid transparent',
                  minWidth: '120px',
                }}>
                <span className="text-[12px] font-semibold block">{c.name}</span>
                <span className="font-mono text-[9px] block mt-0.5" style={{ color: selected === i ? 'rgba(255,255,255,0.6)' : C.muted }}>
                  {c.type === 'major' ? '★ Major centre' : c.type === 'active' ? 'Active' : 'Historical'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE SEVEN SPIRITS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={spiritsR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.blood }}>The Seven Colours of the Lila</p>
          <p className="text-[12px] mb-4" style={{ color: C.muted }}>
            The all-night Gnawa ceremony invokes seven families of spirits (<em>mluk</em>), each identified by a colour.
            Each family has its own songs, incense, and patron saint. The maalem plays specific guembri phrases
            to call each spirit. When a spirit arrives, the dancer changes garments to match the colour.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {SPIRITS.map((s, i) => (
              <div key={i} className="text-center transition-all duration-500"
                style={{ opacity: spiritsR.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-full mx-auto mb-2"
                  style={{
                    background: s.colorHex,
                    border: s.color === 'White' ? '1px solid #ddd' : 'none',
                    boxShadow: `0 2px 8px ${s.colorHex}40`,
                  }} />
                <p className="font-mono text-[9px] font-semibold" style={{ color: C.ink }}>{s.color}</p>
                <p className="text-[8px] mt-0.5" style={{ color: C.muted }}>{s.element}</p>
                <p className="text-[8px]" style={{ color: C.muted }}>{s.incense}</p>
                <p className="text-[8px] italic" style={{ color: C.muted }}>{s.saint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="space-y-4 max-w-[600px]">
            <div>
              <p className="font-mono text-[11px] font-semibold">The word itself</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                &quot;Gnawa&quot; comes from the Amazigh word <em>agnaw</em> (plural <em>ignawen</em>) — &quot;dumb&quot;
                or &quot;unintelligible.&quot; The Amazigh and Arab populations couldn&apos;t understand
                the languages of the enslaved peoples and dismissed them as gibberish.
                Over centuries, the songs themselves became indecipherable even to Gnawa
                musicians — translations lost through oral transmission, the original
                languages preserved as sacred sound rather than meaning.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold">Moulay Ismail&apos;s Black Guard</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Sultan Moulay Ismail (r. 1672–1727) created the Abid al-Bukhari — a standing
                army of 150,000 enslaved Black soldiers, the largest such force in
                Moroccan history. Based in Meknès, they were Morocco&apos;s Praetorian Guard.
                This single act permanently concentrated sub-Saharan peoples in Moroccan
                cities. The Gnawa traditions in Meknès trace directly to this garrison.
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold">The Bori parallel</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The Hausa people of Nigeria and Niger practice Bori — a possession
                tradition using music, dance, and spirits that parallels Gnawa lila
                ceremonies with striking precision. Both use specific rhythms to invoke
                specific spirits. Both assign colours to spirit families. The question
                scholars debate: did Bori cross the Sahara with captives, or did both
                traditions evolve from a shared older source?
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold">The guembri argument</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The guembri (three-string bass lute covered in camel skin) is routinely
                described as a West African instrument that traveled the slave routes.
                Scholars counter it may descend from Pharaonic Egyptian plucked lutes.
                Austrian musicologist Gerhard Kubik argues that Arab arrival in North
                Africa set off &quot;transculturation processes&quot; that make pinpointing any
                single instrument&apos;s origin nearly impossible. The sound, at least,
                belongs to the Sahara itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-8 pb-24">
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sources: El Hamel, Chouki. <em>Black Morocco: A History of Slavery, Race, and Islam</em>. Cambridge University Press, 2013.
            Becker, Cynthia. <em>Blackness in Morocco: Gnawa Identity through Music and Visual Culture</em>. University of Minnesota Press, 2020.
            Kapchan, Deborah. <em>Traveling Spirit Masters: Moroccan Gnawa Trance and Music in the Global Marketplace</em>. Wesleyan, 2007.
            Pâques, Viviana. <em>La Religion des Esclaves</em>. Bergamo, 1991.
            Kubik, Gerhard. <em>Africa and the Blues</em>. University Press of Mississippi, 1999.
            IEMed: &quot;Gnawa: Music and Spirit.&quot;
            Afropop Worldwide: &quot;Gnawa Music of Morocco&quot; (interview with Chouki El Hamel).
            UNESCO Intangible Cultural Heritage: Gnawa (2019 inscription).
            Hisham Aidi, &quot;Gnawa Mirror: Race, Music, and the Imperialism of Categories,&quot; <em>IJMES</em>, 2023.
            Trade route coordinates based on historical caravan waypoints (Taghaza, Sijilmasa, Oualata, Araouane).
          </p>
          <p className="font-mono text-[9px] mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            © Dancing with Lions. All rights reserved. This visualization may not be reproduced without visible attribution.
          </p>
        </div>
      </section>
    </div>
  )
}
