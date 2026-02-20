'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const C = {
  strait: '#2A5F8F', north: '#8B3A3A', south: '#C17F28',
  ink: '#1a1a1a', text: '#3a3a3a', muted: '#8c8c8c', border: '#e0e0e0',
}

// ═══ FLOW DIRECTION ═══
type Direction = 'south-to-north' | 'north-to-south' | 'both'
const DIR_COLOR: Record<Direction, string> = {
  'south-to-north': C.south, 'north-to-south': C.north, both: C.strait,
}
const DIR_LABEL: Record<Direction, string> = {
  'south-to-north': 'Africa → Iberia', 'north-to-south': 'Iberia → Morocco', both: 'Both directions',
}

// ═══ TIMELINE EVENTS ═══
interface TimeEvent {
  year: number; endYear?: number; title: string; direction: Direction
  story: string; places: string[]; lat: number; lng: number; zoom?: number
}

const TIMELINE: TimeEvent[] = [
  {
    year: 711, title: 'Tariq Crosses the Strait',
    direction: 'south-to-north',
    story: 'A Berber commander named Tariq ibn Ziyad crosses from Ceuta with 7,000 men — mostly Berbers, some Arabs and Yemenis. They land at a rock that will bear his name forever: Jabal Tariq. Gibraltar. In July, he shatters the Visigothic army at Guadalete. King Roderic dies. Within seven years, Muslims control nearly the entire peninsula. The conquered territory becomes al-Andalus.',
    places: ['Ceuta', 'Gibraltar', 'Guadalete', 'Toledo', 'Córdoba'],
    lat: 36.0, lng: -5.5, zoom: 7,
  },
  {
    year: 756, title: 'Umayyad Emirate of Córdoba',
    direction: 'south-to-north',
    story: 'Abd al-Rahman I — sole survivor of the Abbasid massacre of the Umayyad dynasty in Damascus — flees across North Africa and crosses to al-Andalus. He establishes an independent emirate in Córdoba, breaking from Baghdad. For the next 275 years, Córdoba becomes the most sophisticated city in Europe. At its peak: 500,000 inhabitants, 700 mosques, 70 libraries, paved and lit streets.',
    places: ['Córdoba', 'Damascus'],
    lat: 37.88, lng: -4.78, zoom: 8,
  },
  {
    year: 929, title: 'Caliphate of Córdoba',
    direction: 'both',
    story: 'Abd al-Rahman III declares himself caliph, rivaling Baghdad. He builds Madinat al-Zahra — a palace-city of 4,000 columns — outside Córdoba. Al-Andalus reaches its cultural zenith. The Great Mosque of Córdoba, begun in 784, is expanded into one of the largest mosques in the world. Jewish scholars, Christian bishops, and Muslim philosophers circulate freely. Then in 1031, civil war shatters it into two dozen taifa kingdoms.',
    places: ['Córdoba', 'Madinat al-Zahra'],
    lat: 37.88, lng: -4.86, zoom: 9,
  },
  {
    year: 1086, title: 'Almoravids Cross North',
    direction: 'south-to-north',
    story: 'Toledo falls to Castile in 1085. The taifa kings panic and call for help across the Strait. Al-Mutamid of Seville says: "I would rather be a camel-driver in Africa than a swineherd in Castile." Yusuf ibn Tashfin crosses with 15,000 Almoravid troops including 6,000 Senegalese cavalry. At Sagrajas, he crushes Alfonso VI so completely that the Reconquista stalls for a generation. Then he stays. By 1094, the taifa kings are deposed. Morocco and al-Andalus become one empire.',
    places: ['Algeciras', 'Sagrajas/Zallaqa', 'Seville', 'Marrakech'],
    lat: 36.13, lng: -5.45, zoom: 7,
  },
  {
    year: 1147, title: 'Almohads Take Both Shores',
    direction: 'south-to-north',
    story: 'The Almohads conquer Marrakech and then cross to take al-Andalus from the weakened Almoravids. Seville becomes their Iberian capital. The same caliphs commission the Kutubiyya in Marrakech and the Giralda in Seville — sister minarets on two continents. The Strait is not a border but a highway. The architectural language is identical on both shores: horseshoe arches, sebka patterns, T-plan mosques.',
    places: ['Marrakech', 'Seville', 'Rabat', 'Tinmal'],
    lat: 35.5, lng: -5.5, zoom: 5.5,
  },
  {
    year: 1212, title: 'Las Navas de Tolosa',
    direction: 'north-to-south',
    story: 'A coalition of Christian kings destroys the Almohad army. The empire fractures. Córdoba falls 1236. Seville falls 1248. Valencia falls 1238. Thousands of Muslim scholars, artisans, and families begin the reverse crossing — south, back to Morocco, to Tlemcen, to Tunis. Only Granada survives, as a tributary state, for another 250 years. The flow reverses.',
    places: ['Las Navas de Tolosa', 'Córdoba', 'Seville', 'Granada'],
    lat: 38.29, lng: -3.58, zoom: 7,
  },
  {
    year: 1492, title: 'Fall of Granada',
    direction: 'north-to-south',
    story: 'Boabdil surrenders the last Muslim kingdom in Europe to Ferdinand and Isabella. The Alhambra becomes a Christian palace. The Edict of Expulsion forces Jews out — many cross to Morocco, settling in Fes (creating the mellah), Tetouan, Debdou. Muslim refugees follow, carrying Andalusi architecture, music, food, and textile traditions. Chefchaouen, founded in 1471 as a fortress against the Portuguese, becomes a primary refuge.',
    places: ['Granada', 'Fes', 'Tetouan', 'Chefchaouen'],
    lat: 37.18, lng: -3.59, zoom: 7,
  },
  {
    year: 1501, endYear: 1526, title: 'Forced Conversions',
    direction: 'north-to-south',
    story: 'Spain outlaws Islam. Muslims must convert or leave. Those who stay become Moriscos — officially Christian, secretly Muslim. Many flee across the Strait. The main contingent from Granada arrives in Tetouan in 1501. They build residential quarters identical to Granada\'s — wide streets for an Andalusi city, marble fountains, orange trees in courtyards, ceilings carved in Alhambra patterns. Tetouan becomes "the daughter of Granada."',
    places: ['Tetouan', 'Rabat', 'Salé', 'Fes'],
    lat: 35.57, lng: -5.37, zoom: 8,
  },
  {
    year: 1609, endYear: 1614, title: 'The Final Expulsion',
    direction: 'north-to-south',
    story: 'Philip III orders all Moriscos expelled. Between 275,000 and 300,000 people are forced out — the largest ethnic cleansing in early modern Europe. Approximately 70,000–100,000 settle in Morocco. They arrive dressed as Spaniards, speaking Castilian, using Christian names. Their Muslim faith is not trusted. Despite suspicion, they transform every city they enter. In Rabat-Salé, Morisco corsairs build a pirate republic. In Fes, Andalusi families establish themselves as an elite. In Chefchaouen, they paint the walls blue.',
    places: ['Rabat', 'Salé', 'Fes', 'Chefchaouen', 'Tetouan', 'Tangier'],
    lat: 34.02, lng: -6.83, zoom: 6,
  },
]

// ═══ SETTLEMENT SITES (where Andalusi culture survives in Morocco) ═══
interface Settlement {
  name: string; lat: number; lng: number
  story: string; heritage: string; side: 'morocco' | 'iberia'
}

const SETTLEMENTS: Settlement[] = [
  // Morocco — receiving cities
  {
    name: 'Fes', lat: 34.0331, lng: -4.9998, side: 'morocco',
    story: 'The Andalusi Quarter (Adouat al-Andalusiyyin) dates to the 9th century — refugees from a failed revolt in Córdoba in 818 founded it. Waves followed: after 1248 (fall of Seville), 1492 (fall of Granada), 1609 (Morisco expulsion). Andalusi families became Fes\'s cultural elite. The Qarawiyyin Mosque was expanded under Andalusi influence.',
    heritage: 'Andalusi music (al-ala), pastilla, zellige tilework refined by Andalusi artisans, mellah (Jewish quarter from 1438, expanded with Sephardic refugees)',
  },
  {
    name: 'Tetouan', lat: 35.5722, lng: -5.3683, side: 'morocco',
    story: '"The daughter of Granada." Repopulated from 1492 by refugees who built their new city as a copy of the one they lost. Wide streets, marble fountains, Alhambra-style carved ceilings. The medina — UNESCO World Heritage — is the most intact Andalusi urban plan outside Spain. Houses belonging to aristocratic families still have the same carved plaster and tilework patterns as the Alhambra.',
    heritage: 'UNESCO medina, Andalusi architecture, subterranean water system (Skoundo), zellige tradition, pastilla (savory, not sweet), Haketia (Judeo-Spanish language)',
  },
  {
    name: 'Chefchaouen', lat: 35.1714, lng: -5.2636, side: 'morocco',
    story: 'Founded 1471 as a fortress against Portuguese invasion. Became a primary refuge for Andalusi and Morisco families after 1492 and 1609. They built residential quarters in the Granadan style on the rugged mountain slopes. Andalusi-Granadan culture merged with local Ghomara Berber traditions. The blue walls — whether from Jewish tradition, insect repellent, or later tourist economics — define the city globally.',
    heritage: 'Blue medina, Andalusi music traditions, Granadan urban plan, Rif mountain culture fusion, Sayyida al-Hurra (only woman to hold sovereign power in Morocco)',
  },
  {
    name: 'Rabat–Salé', lat: 34.0209, lng: -6.8416, side: 'morocco',
    story: 'After 1609, expelled Moriscos established an autonomous pirate republic in Salé. The Corsair Republic of Salé (Bou Regreg Republic) operated from 1627 to 1668 — Morisco captains raided European shipping as retaliation for the Reconquista. They brought Andalusi architectural traditions to the Kasbah of the Udayas and the old medina of Rabat.',
    heritage: 'Corsair Republic, Kasbah of the Udayas Andalusian Garden, Andalusi pottery tradition, piracy-as-retribution history',
  },
  {
    name: 'Tangier', lat: 35.7595, lng: -5.8340, side: 'morocco',
    story: 'Gateway city between two worlds. Under Portuguese then English then Moroccan control. Andalusi refugees settled alongside existing communities. The medina retains Andalusi architectural elements. Tariq ibn Ziyad governed Tangier before crossing the Strait in 711 — the city where the story begins and the refugees return.',
    heritage: 'Starting point of 711 crossing, returning point of refugees, multilingual identity',
  },
  {
    name: 'Essaouira', lat: 31.5085, lng: -9.7595, side: 'morocco',
    story: 'Sephardic Jewish families expelled from Spain settled here and in Safi, becoming key players in trans-Saharan and Atlantic trade. The mellah of Essaouira — one of Morocco\'s largest — was primarily Sephardic. Their cuisine (sardine and garlic dishes), music, and commercial networks shaped the port city.',
    heritage: 'Sephardic mellah, Atlantic trade networks, Jewish-Muslim commercial symbiosis',
  },

  // Iberia — key source cities
  {
    name: 'Granada', lat: 37.1773, lng: -3.5986, side: 'iberia',
    story: 'Last Muslim kingdom in Europe. The Alhambra — built by the Nasrid dynasty (1238–1492) — represents the final flowering of Andalusi art. When it fell, its people did not vanish. They crossed the Strait and rebuilt their houses, their music, their food, and their garden traditions in Tetouan, Chefchaouen, and Fes. The Alhambra\'s patterns live on in Moroccan plaster work.',
    heritage: 'Alhambra, Nasrid art, origin of Tetouan/Chefchaouen settlers',
  },
  {
    name: 'Córdoba', lat: 37.8882, lng: -4.7794, side: 'iberia',
    story: 'Capital of the Umayyad Caliphate of al-Andalus (929–1031). The Great Mosque — now a cathedral — had 856 columns. In 818, a failed revolt sent refugees to Fes, where they founded the Andalusi Quarter. When Córdoba fell to Castile in 1236, scholars and artisans crossed south, carrying manuscripts and the memory of libraries that held 400,000 volumes.',
    heritage: 'Great Mosque, Madinat al-Zahra, origin of Fes Andalusi Quarter (818)',
  },
  {
    name: 'Seville', lat: 37.3886, lng: -5.9823, side: 'iberia',
    story: 'Almohad capital of al-Andalus. The Giralda — sister to the Kutubiyya — still stands. Fell to Castile in 1248 after a two-year siege. The Almohad Alcázar was rebuilt in Mudéjar style by Christian kings using Muslim craftsmen — the architectural tradition outlived the political one. Thousands fled to Morocco.',
    heritage: 'Giralda, Alcázar, Torre del Oro, Almohad architecture, 1248 exodus',
  },
  {
    name: 'Toledo', lat: 39.8628, lng: -4.0273, side: 'iberia',
    story: 'The "City of Three Cultures." Its fall in 1085 triggered the Almoravid crossing. Under Muslim rule, the Toledo School of Translators rendered Greek philosophy into Arabic, then into Latin — transmission that made the European Renaissance possible. Averroes (Ibn Rushd) and Maimonides were products of this knowledge ecosystem.',
    heritage: 'School of Translators, fall triggered Almoravid intervention 1085',
  },
  {
    name: 'Gibraltar / Algeciras', lat: 36.1408, lng: -5.3536, side: 'iberia',
    story: 'Jabal Tariq — "Mountain of Tariq." The 14km of water between here and Ceuta is the hinge of the entire story. Every army, every refugee, every piece of music and every recipe that crossed between Africa and Europe passed through this narrows. The Strait of Gibraltar is not a border. It is a bridge.',
    heritage: 'The crossing point. 711 invasion, Almoravid 1086, Almohad 1147, refugee return 1248–1614',
  },
]

// ═══ CROSSING LINES (routes across the Strait) ═══
const CROSSINGS: { coords: [number, number][]; label: string; year: string; dir: Direction }[] = [
  { coords: [[-5.32, 35.89], [-5.35, 36.14]], label: 'Ceuta → Gibraltar 711', year: '711', dir: 'south-to-north' },
  { coords: [[-5.80, 35.76], [-5.45, 36.13]], label: 'Tangier → Algeciras 1086', year: '1086', dir: 'south-to-north' },
  { coords: [[-3.60, 37.18], [-5.37, 35.57]], label: 'Granada → Tetouan 1492', year: '1492', dir: 'north-to-south' },
  { coords: [[-5.98, 37.39], [-6.84, 34.02]], label: 'Seville → Rabat 1248', year: '1248', dir: 'north-to-south' },
  { coords: [[-4.78, 37.88], [-5.00, 34.03]], label: 'Córdoba → Fes 818/1236', year: '818', dir: 'north-to-south' },
  { coords: [[-3.60, 37.18], [-5.26, 35.17]], label: 'Granada → Chefchaouen 1492+', year: '1492', dir: 'north-to-south' },
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
function StraitMap({ selectedEvent, selectedSite, onSelectSite, dirFilter }: {
  selectedEvent: number | null; selectedSite: number | null
  onSelectSite: (i: number) => void; dirFilter: Direction | null
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
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-4.5, 35.8],
      zoom: 4.8,
      accessToken: MAPBOX_TOKEN,
      attributionControl: false,
    })
    m.addControl(new mapboxgl.NavigationControl(), 'top-right')
    m.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    m.on('load', () => {
      // Crossing routes
      CROSSINGS.forEach((c, i) => {
        m.addSource(`crossing-${i}`, {
          type: 'geojson',
          data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: c.coords } }
        })
        m.addLayer({
          id: `crossing-line-${i}`, type: 'line', source: `crossing-${i}`,
          paint: {
            'line-color': DIR_COLOR[c.dir],
            'line-width': 1.5,
            'line-opacity': 0.35,
            'line-dasharray': [6, 4],
          }
        })
      })

      // Settlement markers
      SETTLEMENTS.forEach((s, i) => {
        const el = document.createElement('div')
        const color = s.side === 'morocco' ? C.south : C.north
        const size = (s.name === 'Gibraltar / Algeciras') ? 14 : (s.name === 'Fes' || s.name === 'Granada' || s.name === 'Córdoba' || s.name === 'Tetouan') ? 13 : 10
        el.style.cssText = `
          width:${size}px;height:${size}px;
          background:${color};border:2px solid ${color};
          border-radius:${s.side === 'iberia' ? '2px' : '50%'};
          cursor:pointer;transition:all 0.3s;
          box-shadow:0 1px 4px rgba(0,0,0,0.25);
        `
        el.title = s.name
        el.addEventListener('click', () => onSelectSite(i))
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)'; el.style.boxShadow = `0 0 12px ${color}50` })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.25)' })
        const marker = new mapboxgl.Marker({ element: el }).setLngLat([s.lng, s.lat]).addTo(m)
        markersRef.current.push(marker)
      })
    })

    map.current = m
    return () => m.remove()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fly on timeline event
  useEffect(() => {
    if (selectedEvent !== null && map.current) {
      const ev = TIMELINE[selectedEvent]
      map.current.flyTo({ center: [ev.lng, ev.lat], zoom: ev.zoom || 6, duration: 1200 })
    }
  }, [selectedEvent])

  // Fly on site
  useEffect(() => {
    if (selectedSite !== null && map.current) {
      const s = SETTLEMENTS[selectedSite]
      map.current.flyTo({ center: [s.lng, s.lat], zoom: 9, duration: 1000 })
      markersRef.current.forEach((marker, i) => {
        marker.getElement().style.transform = i === selectedSite ? 'scale(2)' : 'scale(1)'
      })
    }
  }, [selectedSite])

  // Filter crossing lines
  useEffect(() => {
    if (!map.current) return
    const m = map.current
    CROSSINGS.forEach((c, i) => {
      const layerId = `crossing-line-${i}`
      if (m.getLayer(layerId)) {
        const visible = !dirFilter || c.dir === dirFilter
        m.setPaintProperty(layerId, 'line-opacity', visible ? 0.5 : 0.08)
      }
    })
  }, [dirFilter])

  return <div ref={mapContainer} className="w-full rounded-sm" style={{ height: '540px' }} />
}

// ═══ PAGE ═══
export default function TheStraitPage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [selectedSite, setSelectedSite] = useState<number | null>(null)
  const [dirFilter, setDirFilter] = useState<Direction | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const heroR = useReveal()
  const timelineR = useReveal()
  const sitesR = useReveal()

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('mapbox-gl-strait')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
      document.head.appendChild(link)
      const script = document.createElement('script')
      script.id = 'mapbox-gl-strait'
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.js'
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else {
      setMapLoaded(true)
    }
  }, [])

  const selEvent = selectedEvent !== null ? TIMELINE[selectedEvent] : null
  const selSite = selectedSite !== null ? SETTLEMENTS[selectedSite] : null

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 pt-36 pb-16">
        <Link href="/data" className="font-mono text-[10px] uppercase tracking-[0.12em] hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>← All Data Modules</Link>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Module 063 · Cross-Strait History</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Strait</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            800 years across 14 kilometres of water
          </p>
        </div>
        <p className="text-[13px] max-w-[580px] leading-[1.7] mt-6" style={{ color: C.text }}>
          In 711, armies crossed north from Morocco to conquer Iberia. In 1492,
          refugees crossed south from Iberia to rebuild their lives in Morocco. The
          Strait of Gibraltar is 14 kilometres wide. It took 800 years for the
          current to reverse — and when it did, the people who returned carried
          architecture, music, food, and language that still define Moroccan cities
          today. This is not the story of one crossing. It is the story of a
          circulatory system.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '14km', l: 'width of the Strait', c: C.strait },
            { v: '711', l: 'first crossing north', c: C.south },
            { v: '1614', l: 'last expulsion south', c: C.north },
            { v: '~300K', l: 'Moriscos expelled', c: C.muted },
          ].map((n, i) => (
            <div key={i} className="transition-all duration-700" style={{ opacity: heroR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}><span className="text-[28px] font-bold">{n.v}</span></p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: C.strait }}>The Crossings</p>
            <p className="text-[12px]" style={{ color: C.muted }}>
              Circles = Moroccan cities. Squares = Iberian cities. Dashed lines = crossing routes. Click timeline or sites.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            <button onClick={() => setDirFilter(null)}
              className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono transition-all"
              style={{ background: !dirFilter ? C.ink : 'transparent', color: !dirFilter ? 'white' : C.muted, border: `1px solid ${!dirFilter ? C.ink : C.border}` }}>
              All crossings
            </button>
            {(['south-to-north', 'north-to-south'] as Direction[]).map(d => (
              <button key={d} onClick={() => setDirFilter(dirFilter === d ? null : d)}
                className="px-2.5 py-1 text-[9px] tracking-wider font-mono transition-all"
                style={{
                  background: dirFilter === d ? DIR_COLOR[d] : 'transparent',
                  color: dirFilter === d ? 'white' : DIR_COLOR[d],
                  border: `1px solid ${dirFilter === d ? DIR_COLOR[d] : `${DIR_COLOR[d]}40`}`,
                }}>
                {DIR_LABEL[d]}
              </button>
            ))}
          </div>

          <div className="relative">
            {mapLoaded && <StraitMap selectedEvent={selectedEvent} selectedSite={selectedSite} onSelectSite={setSelectedSite} dirFilter={dirFilter} />}

            {selSite && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[380px] p-5 bg-white/95 backdrop-blur-sm rounded-sm shadow-lg max-h-[300px] overflow-y-auto"
                style={{ borderLeft: `3px solid ${selSite.side === 'morocco' ? C.south : C.north}` }}>
                <button onClick={() => setSelectedSite(null)} className="absolute top-3 right-3 text-[11px] hover:opacity-60" style={{ color: C.muted }}>✕</button>
                <span className="inline-block px-2 py-0.5 text-[8px] uppercase tracking-wider font-mono mb-2"
                  style={{ background: selSite.side === 'morocco' ? `${C.south}12` : `${C.north}12`, color: selSite.side === 'morocco' ? C.south : C.north }}>
                  {selSite.side === 'morocco' ? 'Receiving City' : 'Source City'}
                </span>
                <h3 className="font-serif text-[20px] leading-tight">{selSite.name}</h3>
                <p className="text-[12px] mt-2 leading-[1.6]" style={{ color: C.text }}>{selSite.story}</p>
                <div className="mt-3 pt-2 border-t" style={{ borderColor: C.border }}>
                  <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: C.muted }}>Living Heritage</p>
                  <p className="text-[11px] leading-[1.5]" style={{ color: C.muted }}>{selSite.heritage}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-8">
        <div ref={timelineR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: C.strait }}>Timeline · 711–1614</p>

          <div className="space-y-0">
            {TIMELINE.map((ev, i) => {
              const isSelected = selectedEvent === i
              const color = DIR_COLOR[ev.direction]
              return (
                <button key={i} onClick={() => { setSelectedEvent(isSelected ? null : i); setSelectedSite(null) }}
                  className="w-full text-left transition-all duration-300"
                  style={{ opacity: timelineR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                  <div className="flex gap-4 py-3 border-b" style={{ borderColor: C.border, borderLeftWidth: isSelected ? '3px' : '0', borderLeftColor: color, paddingLeft: isSelected ? '12px' : '0' }}>
                    <div className="shrink-0 w-[60px]">
                      <p className="font-mono text-[14px] font-bold" style={{ color }}>{ev.year}</p>
                      <p className="font-mono text-[8px] uppercase" style={{ color: C.muted }}>{DIR_LABEL[ev.direction]}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-[15px]">{ev.title}</p>
                      {isSelected && (
                        <div className="mt-2">
                          <p className="text-[12px] leading-[1.65]" style={{ color: C.text }}>{ev.story}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {ev.places.map((p, j) => (
                              <span key={j} className="inline-block px-2 py-0.5 text-[9px] font-mono" style={{ background: `${color}10`, color }}>{p}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ WHAT CROSSED THE WATER ═══ */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-8">
        <div ref={sitesR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.north }}>What Crossed the Water</p>
          <p className="text-[12px] leading-[1.7] max-w-[560px] mb-6" style={{ color: C.text }}>
            When the refugees arrived in Morocco, they did not arrive empty-handed.
            The cultural DNA of al-Andalus embedded itself in Moroccan cities so
            deeply that today it is indistinguishable from "Moroccan" culture itself.
          </p>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {[
              { thing: 'Andalusi Music (al-Ala)', detail: 'Eleven nubat (suites) preserved in Fes, Tetouan, Chefchaouen. Instruments: rabab, oud, qanun, kamenja. Morocco claims the most faithful preservation of the original Andalusi forms.' },
              { thing: 'Architecture', detail: 'Carved plaster (gebs), zellige tilework, painted wooden ceilings, riad garden plans, subterranean water systems. Tetouan\'s medina is the most intact Andalusi urban plan outside Spain.' },
              { thing: 'Food', detail: 'Pastilla (from bastilla/pastela — Andalusi pie). The recipe crossed the Strait and split: savory in Tetouan, sweet in Fes. Also: almond pastries, preserved lemons, the entire slow-cooking tagine tradition enriched by Andalusi spice knowledge.' },
              { thing: 'Language', detail: 'Haketia — Judeo-Spanish dialect spoken by Sephardic Jews in Tetouan and Tangier until the 20th century. Andalusi Arabic phrases survive in Moroccan darija. Spanish loanwords throughout northern Morocco.' },
              { thing: 'Textiles', detail: 'Embroidery traditions. Fes and Tetouan embroidery styles trace directly to Andalusi needlework. The colorful kaftans with gold embroidery worn by Moroccan brides originate from Andalusi dress customs.' },
              { thing: 'Urban Planning', detail: 'Wide streets (by medina standards), fountains, orange trees, garden courtyards. The Andalusi refugees built cities that looked like the ones they left. Chefchaouen\'s layout echoes Granada.' },
            ].map((item, i) => (
              <div key={i} className="py-2 transition-all duration-500" style={{ opacity: sitesR.vis ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
                <p className="font-mono text-[11px] font-bold" style={{ color: C.ink }}>{item.thing}</p>
                <p className="text-[11px] leading-[1.5] mt-1" style={{ color: C.muted }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ READING NOTES ═══ */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.strait }}>Reading Notes</p>
          <div className="space-y-6 text-[12px] leading-[1.7] max-w-[600px]" style={{ color: C.text }}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The bridge, not the border</p>
              <p>The Strait of Gibraltar is the narrowest point between Africa and Europe — 14 kilometres at the Tarifa–Cires Point crossing. For 800 years, armies, scholars, refugees, spices, instruments, and architectural plans moved across it in both directions. Morocco and Iberia were not separate civilizations facing each other. They were one circulatory system, with the Strait as its heart valve.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The Morisco paradox</p>
              <p>When the final Moriscos arrived in Morocco after 1609, they were not trusted. They spoke Castilian. They wore Spanish clothes. They used Christian names. Some did not speak Arabic. They had been forcibly converted and then expelled for not converting convincingly enough. In Morocco, their Muslim faith was doubted. They were refugees rejected by both sides of the Strait — yet they carried the most refined urban culture in the western Mediterranean.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The corsair republic</p>
              <p>In Salé, expelled Moriscos did not just settle — they built an autonomous pirate republic (1627–1668). Morisco captains raided European shipping explicitly as retaliation for the Reconquista and the expulsion. England, France, and the Netherlands all sent ambassadors to negotiate with corsairs who considered themselves the unfinished business of 1492.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The word "Moorish"</p>
              <p>We do not use "Moorish" in this module. The term was a European catch-all applied loosely to Muslims, North Africans, and dark-skinned people without distinction. It grouped Arabs, Berbers, and sub-Saharan Africans into a single, undifferentiated Other. Precise terms exist: Andalusi (culture of al-Andalus), Almoravid, Almohad, Nasrid (dynasties), Morisco (forcibly converted Muslims), Sephardic (Iberian Jews). The architecture is Andalusi. The people were specific.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="max-w-[1000px] mx-auto px-6 md:px-10 py-8 pb-24">
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Sources: Kennedy, Hugh. <em>Muslim Spain and Portugal: A Political History of al-Andalus</em>. Routledge, 1996.
            Bennison, Amira K. <em>The Almoravid and Almohad Empires</em>. Edinburgh University Press, 2016.
            Harvey, L.P. <em>Muslims in Spain, 1500–1614</em>. University of Chicago Press, 2005.
            De Epalza, Míkel. <em>Los moriscos antes y después de la expulsión</em>. Mapfre, 1992.
            Wikipedia: &quot;Muslim conquest of the Iberian Peninsula,&quot; &quot;Tariq ibn Ziyad,&quot; &quot;Reconquista,&quot; &quot;Moriscos,&quot; &quot;Chefchaouen,&quot; &quot;Tétouan,&quot; &quot;Expulsion of the Moriscos.&quot;
            Qantara.de: &quot;Andalusia Begins in Northern Morocco.&quot;
            Springer: Aomar Boum, &quot;Distorted Narratives: Morocco, Spain, and the Colonial Stratigraphy of Cultural Heritage.&quot;
            Metropolitan Museum of Art: &quot;The Art of the Almoravid and Almohad Periods.&quot;
            Coordinates via Google Earth and OpenStreetMap.
          </p>
          <p className="font-mono text-[9px] mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © Dancing with Lions. All rights reserved. This visualization may not be reproduced without visible attribution.
          </p>
        </div>
      </section>
    </div>
  )
}
