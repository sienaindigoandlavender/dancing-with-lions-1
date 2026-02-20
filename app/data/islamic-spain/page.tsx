'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ═══ DATA ═══

interface City { name: string; arabic: string; coords: [number, number]; color: string; desc: string; type: 'capital' | 'taifa' | 'frontier' | 'africa' }
interface TEvent { year: string; title: string; detail: string; type: 'conquest' | 'golden' | 'decline' | 'fall' | 'culture'; major?: boolean; dataLabel?: string; dataValue?: string }
interface TEra { label: string; events: TEvent[] }

const CITIES: City[] = [
  { name: 'Córdoba', arabic: 'قرطبة (Qurṭuba)', coords: [-4.779, 37.879], color: '#E63946', desc: 'Capital 716–1031. Largest city in Europe, 10th c.', type: 'capital' },
  { name: 'Granada', arabic: 'غرناطة (Gharnāṭa)', coords: [-3.598, 37.176], color: '#E63946', desc: 'Last Muslim city. Nasrid Emirate 1238–1492.', type: 'capital' },
  { name: 'Seville', arabic: 'إشبيلية (Ishbīliyya)', coords: [-5.994, 37.389], color: '#E63946', desc: 'Almohad Iberian capital. Fell 1248.', type: 'capital' },
  { name: 'Toledo', arabic: 'طليطلة (Ṭulayṭula)', coords: [-4.022, 39.857], color: '#FCBF49', desc: 'Fell 1085. Centre of translation movement.', type: 'taifa' },
  { name: 'Zaragoza', arabic: 'سرقسطة (Saraqusṭa)', coords: [-0.876, 41.648], color: '#FCBF49', desc: 'Northeast taifa. Philosophy centre.', type: 'taifa' },
  { name: 'Valencia', arabic: 'بلنسية (Balansiyya)', coords: [-0.375, 39.469], color: '#FCBF49', desc: 'Briefly ruled by El Cid (1094–1099).', type: 'taifa' },
  { name: 'Badajoz', arabic: 'بطليوس (Baṭalyaws)', coords: [-6.970, 38.878], color: '#FCBF49', desc: 'Western taifa. Key border with Portugal.', type: 'taifa' },
  { name: 'Málaga', arabic: 'مالقة (Mālaqa)', coords: [-4.420, 36.720], color: '#FCBF49', desc: 'Strategic Mediterranean port.', type: 'taifa' },
  { name: 'Almería', arabic: 'المرية (al-Mariyya)', coords: [-2.465, 36.838], color: '#FCBF49', desc: 'Silk centre. Mediterranean trade hub.', type: 'taifa' },
  { name: 'Gibraltar', arabic: 'جبل طارق (Jabal Ṭāriq)', coords: [-5.345, 36.140], color: '#72EFDD', desc: '"Mountain of Tariq." 711 landing site.', type: 'frontier' },
  { name: 'Lisbon', arabic: 'أشبونة (Ushbūna)', coords: [-9.139, 38.722], color: '#72EFDD', desc: 'Under Muslim rule 711–1147.', type: 'frontier' },
  { name: 'Barcelona', arabic: 'برشلونة (Barshilūna)', coords: [2.173, 41.386], color: '#72EFDD', desc: 'Captured 717. Part of Spanish March.', type: 'frontier' },
  { name: 'Narbonne', arabic: 'أربونة (Arbūna)', coords: [3.003, 43.184], color: '#72EFDD', desc: 'Furthest territory in Gaul. Held until 759.', type: 'frontier' },
  { name: 'Jaén', arabic: 'جيان (Jayyān)', coords: [-3.790, 37.766], color: '#72EFDD', desc: 'Near Las Navas de Tolosa. Fell 1246.', type: 'frontier' },
  { name: 'Marrakech', arabic: 'مراكش (Marrākush)', coords: [-7.982, 31.631], color: '#48BFE3', desc: 'Almoravid capital. Almohad capital. Power behind Al-Andalus.', type: 'africa' },
  { name: 'Fez', arabic: 'فاس (Fās)', coords: [-5.000, 34.034], color: '#48BFE3', desc: 'Andalusi quarter. World\'s oldest university.', type: 'africa' },
  { name: 'Tangier', arabic: 'طنجة (Ṭanja)', coords: [-5.813, 35.767], color: '#48BFE3', desc: 'Gateway between Africa and Iberia.', type: 'africa' },
  { name: 'Ceuta', arabic: 'سبتة (Sabta)', coords: [-5.313, 35.889], color: '#48BFE3', desc: 'Launching point for 711 invasion.', type: 'africa' },
  { name: 'Tinmel', arabic: 'تينمل (Tīnmal)', coords: [-7.954, 31.000], color: '#48BFE3', desc: 'Atlas Mountains. Almohad birthplace (~1121).', type: 'africa' },
  { name: 'Kairouan', arabic: 'القيروان (al-Qayrawān)', coords: [10.095, 35.672], color: '#48BFE3', desc: 'Military HQ 670. Initial governor seat.', type: 'africa' },
]

const TIMELINE: TEra[] = [
  { label: 'The Conquest', events: [
    { year: '711', title: 'Tariq ibn Ziyad Crosses the Strait', detail: 'A Berber commander lands at Gibraltar (Jebel al-Tariq — "Mountain of Tariq") with ~7,000 troops. Visigothic King Roderic is killed at the Battle of Guadalete.', type: 'conquest', major: true, dataLabel: 'troops in the initial force', dataValue: '7,000' },
    { year: '711–718', title: 'Seven-Year Conquest of Iberia', detail: 'Musa ibn Nusayr reinforces from North Africa. Toledo, Seville, Zaragoza fall in rapid succession. By 718, nearly the entire peninsula is under Muslim control.', type: 'conquest' },
    { year: '722', title: 'Battle of Covadonga', detail: 'Pelagius of Asturias defeats a Muslim force in the mountains. A small Christian stronghold survives. Later mythology frames this as the birth of the Reconquista.', type: 'fall' },
    { year: '732', title: 'Battle of Tours (Poitiers)', detail: 'Charles Martel halts Muslim northward expansion. The high-water mark of Islamic advance into Western Europe.', type: 'conquest' },
    { year: '740', title: 'The Great Berber Revolt', detail: 'Berber populations rise against Arab Umayyad authority. Morocco would never again be ruled by an eastern caliphate.', type: 'decline' },
  ]},
  { label: 'Umayyad Emirate', events: [
    { year: '756', title: 'Abd al-Rahman I Founds the Emirate of Córdoba', detail: 'The last surviving Umayyad prince flees the Abbasid massacre in Damascus. After six years on the run through North Africa, he establishes an independent emirate.', type: 'conquest', major: true },
    { year: '785', title: 'Great Mosque of Córdoba Begins', detail: 'Abd al-Rahman I personally lays stones one hour each day. Modelled on the Great Mosque of Damascus, expanded four times over 200 years.', type: 'culture' },
    { year: '818', title: 'Revolt of the Southern Suburb', detail: 'A major uprising is ruthlessly suppressed. Thousands exiled — many settle in Fez, founding the Andalusi quarter.', type: 'decline' },
  ]},
  { label: 'The Caliphate — Golden Age', events: [
    { year: '929', title: 'Abd al-Rahman III Declares the Caliphate', detail: 'After 17 years of campaigns, he claims the title of caliph — challenging the Abbasids in Baghdad and the Fatimids in North Africa.', type: 'golden', major: true, dataLabel: 'estimated population of Al-Andalus', dataValue: '3–10M' },
    { year: '936', title: 'Medina Azahara Built', detail: 'A palatine city outside Córdoba. Columns from North Africa and Byzantium. Marble fountains from Syria.', type: 'culture' },
    { year: 'c. 950', title: 'Córdoba Becomes Europe\'s Largest City', detail: 'Population 100,000–500,000. Paved and lit streets. Running water. 80+ libraries. Royal library: 400,000+ volumes. The Abbey of Saint Gall holds just over 100.', type: 'golden', dataLabel: 'library ratio, Córdoba vs. Christian Europe', dataValue: '4,000:1' },
    { year: '961', title: 'Al-Hakam II Expands the Great Mosque', detail: 'Byzantine artisans install golden mosaics of lapis lazuli and jasper in the mihrab.', type: 'golden' },
    { year: '976–1002', title: 'Almanzor — The Shadow Ruler', detail: 'The vizier reduces child-caliph Hisham II to a puppet. 57 campaigns — including sacking Santiago de Compostela, forcing prisoners to carry the cathedral bells to Córdoba.', type: 'decline' },
  ]},
  { label: 'Collapse & Taifas', events: [
    { year: '1009–13', title: 'Fitna — Civil War', detail: 'Medina Azahara sacked and destroyed. Not rediscovered until 1911.', type: 'decline', major: true },
    { year: '1031', title: 'Caliphate Abolished — The Taifa Kingdoms', detail: 'Al-Andalus shatters into 20+ city-states. Culturally brilliant. Militarily vulnerable.', type: 'decline', major: true, dataLabel: 'independent taifa kingdoms', dataValue: '20+' },
    { year: '1085', title: 'Fall of Toledo', detail: 'Alfonso VI of Castile captures Toledo. The remaining taifas invite the Almoravids from Morocco.', type: 'fall', major: true },
  ]},
  { label: 'The Moroccan Dynasties', events: [
    { year: '1086', title: 'The Almoravids Cross the Strait', detail: 'Yusuf ibn Tashfin defeats Alfonso VI at Sagrajas. By 1090 the rescuers have absorbed the taifas themselves.', type: 'conquest' },
    { year: '1094', title: 'El Cid Takes Valencia', detail: 'Rodrigo Díaz de Vivar captures Valencia — proving the Berber dynasty is not invincible.', type: 'fall' },
    { year: '1147', title: 'The Almohads Replace the Almoravids', detail: 'A new Berber dynasty from the Atlas Mountains. Seville becomes the Iberian capital; Marrakech the seat of power in Africa.', type: 'conquest' },
    { year: '1212', title: 'Battle of Las Navas de Tolosa', detail: 'The turning point. A coalition guided through mountain passes by a local shepherd shatters the Almohad army.', type: 'fall', major: true, dataLabel: 'Christian troops in coalition', dataValue: '~130,000' },
  ]},
  { label: 'The Long Decline', events: [
    { year: '1236', title: 'Fall of Córdoba', detail: 'The Great Mosque becomes a cathedral. The bells Almanzor took from Santiago — carried by prisoners 240 years earlier — are returned north.', type: 'fall' },
    { year: '1238', title: 'Nasrid Dynasty Founds the Emirate of Granada', detail: 'The last Muslim state. Granada survives as a tributary of Castile. The Alhambra rises.', type: 'golden' },
    { year: '1248', title: 'Fall of Seville', detail: 'Ferdinand III captures the Almohad Iberian capital. Only Granada remains.', type: 'fall' },
    { year: '1340', title: 'Battle of Río Salado', detail: 'The Marinids — last North African dynasty to intervene — are defeated. No more help from across the Strait.', type: 'fall' },
    { year: '1354–91', title: 'The Alhambra Completed', detail: 'Court of the Lions. Arabesque, calligraphy, muqarnas. The last great act of Al-Andalus is architecture.', type: 'culture' },
    { year: '1492', title: 'Fall of Granada', detail: 'January 2. Muhammad XII surrenders the keys of the Alhambra. Seven months later, Columbus sails. The medieval world ends.', type: 'fall', major: true, dataLabel: 'years of Muslim Iberia end', dataValue: '781' },
    { year: '1609–14', title: 'Expulsion of the Moriscos', detail: '~300,000 forced across the Mediterranean — to Morocco, Tunisia, Algeria, the Ottoman Empire.', type: 'decline', dataLabel: 'expelled', dataValue: '~300,000' },
  ]},
]

const TERRITORY = [
  { year: '718', pct: 90 }, { year: '800', pct: 75 }, { year: '950', pct: 70 }, { year: '1031', pct: 60 },
  { year: '1100', pct: 50 }, { year: '1212', pct: 40 }, { year: '1250', pct: 12 }, { year: '1300', pct: 8 },
  { year: '1400', pct: 6 }, { year: '1492', pct: 0 },
]

const FIGURES = [
  { dates: 'c. 670–720', name: 'Tariq ibn Ziyad', role: 'Commander · Berber', desc: 'Led the 711 invasion. Gibraltar bears his name.' },
  { dates: '731–788', name: 'Abd al-Rahman I', role: 'Emir · Umayyad exile', desc: 'Last Umayyad prince. Founded the independent emirate. Began the Great Mosque.' },
  { dates: '891–961', name: 'Abd al-Rahman III', role: 'Caliph · Golden Age', desc: 'Declared the Caliphate (929). Built Medina Azahara. 49-year reign.' },
  { dates: '915–976', name: 'Al-Hakam II', role: 'Caliph · Scholar-patron', desc: 'Royal library: 400,000+ volumes. Expanded the Great Mosque with Byzantine mosaics.' },
  { dates: '938–1002', name: 'Almanzor', role: 'Vizier · Shadow ruler', desc: '57 campaigns. Sacked Santiago de Compostela. Extended the empire, hollowed its core.' },
  { dates: '1009–1095', name: 'Yusuf ibn Tashfin', role: 'Almoravid Sultan', desc: 'Founded Marrakech. Crossed the Strait to rescue the taifas, then conquered them.' },
  { dates: 'c. 1040–1099', name: 'El Cid', role: 'Castilian warlord', desc: 'Fought for both sides. Captured Valencia (1094). A man between worlds.' },
  { dates: '1460–1533', name: 'Muhammad XII', role: 'Last Emir of Granada', desc: 'Surrendered the Alhambra, Jan 2 1492. Died in exile in Fez.' },
]

const VIEWS: Record<string, { center: [number, number]; zoom: number; pitch?: number }> = {
  full: { center: [-3.5, 38], zoom: 4.8 }, cordoba: { center: [-4.779, 37.879], zoom: 10, pitch: 30 },
  granada: { center: [-3.598, 37.176], zoom: 10, pitch: 30 }, strait: { center: [-5.3, 35.9], zoom: 8 },
  'north-africa': { center: [-5, 33], zoom: 5.5 },
}

const DOT_COLORS: Record<string, string> = { conquest: '#E63946', golden: '#FCBF49', decline: '#F77F00', fall: '#48BFE3', culture: '#72EFDD' }
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// ═══ COMPONENT ═══

export default function IslamicSpainPage() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [activeView, setActiveView] = useState('full')
  const [vis, setVis] = useState<Set<string>>(new Set())
  const [barW, setBarW] = useState<Record<string, number>>({})

  // Map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'; document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-3.5, 38], zoom: 4.8, attributionControl: false })
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'bottom-right')
      mapRef.current = map

      map.on('load', () => {
        map.addSource('corridor', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[-5.313, 35.889], [-5.345, 36.140], [-4.779, 37.879]] } } })
        map.addLayer({ id: 'corridor-line', type: 'line', source: 'corridor', paint: { 'line-color': '#E63946', 'line-width': 1.5, 'line-dasharray': [4, 4], 'line-opacity': 0.4 } })

        CITIES.forEach(city => {
          const el = document.createElement('div'); const s = city.type === 'capital' ? 14 : 10
          Object.assign(el.style, { width: s + 'px', height: s + 'px', borderRadius: '50%', backgroundColor: city.color, boxShadow: `0 0 ${s}px ${city.color}66`, cursor: 'pointer', transition: 'transform 0.2s' })
          el.onmouseenter = () => { el.style.transform = 'scale(1.5)' }; el.onmouseleave = () => { el.style.transform = 'scale(1)' }
          const popup = new mapboxgl.default.Popup({ offset: 15, maxWidth: '260px' }).setHTML(
            `<div style="font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:18px;color:#f5f5f5;margin-bottom:2px">${city.name}</div><div style="font-size:13px;color:#555;margin-bottom:8px">${city.arabic}</div><div style="font-size:12px;color:#bbb;line-height:1.6">${city.desc}</div>`)
          markersRef.current.push(new mapboxgl.default.Marker(el).setLngLat(city.coords).setPopup(popup).addTo(map))
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  const flyTo = (v: string) => { setActiveView(v); const view = VIEWS[v]; if (mapRef.current && view) mapRef.current.flyTo({ ...view, duration: 1200, essential: true }) }

  // Scroll observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-oid')
          if (id) setVis(p => new Set(p).add(id))
          const bw = e.target.getAttribute('data-bw'), bid = e.target.getAttribute('data-bid')
          if (bw && bid) setTimeout(() => setBarW(p => ({ ...p, [bid]: Number(bw) })), 200)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('[data-oid]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="pt-16">

      {/* HERO */}
      <section className="min-h-[85vh] flex flex-col justify-end px-6 md:px-10 pb-16 max-w-wide mx-auto border-b border-dwl-border">
        <p className="micro-label mb-6 animate-fade-up">Dancing with Lions · Data Story 006 · Al-Andalus</p>
        <h1 className="font-serif text-[clamp(3.5rem,8vw,7rem)] text-dwl-black leading-[0.92] tracking-[-0.03em] italic animate-fade-up">Islamic Spain</h1>
        <p className="text-body text-dwl-body mt-8 max-w-[600px] leading-relaxed animate-fade-up">From the Umayyad crossing at Gibraltar to the fall of Granada — 781 years of Muslim rule on the Iberian Peninsula, mapped and measured.</p>
        <div className="flex flex-wrap gap-12 md:gap-16 mt-12 animate-fade-up">
          {[{ v: '781', l: 'Years of Muslim Rule' }, { v: '711–1492', l: 'Duration' }, { v: '~500k', l: 'Córdoba population, 10th c.' }, { v: '400k+', l: 'Volumes in Royal Library' }].map(s => (
            <div key={s.l}><span className="font-serif italic text-[clamp(2rem,4vw,3.5rem)] text-[#E63946] leading-none">{s.v}</span><span className="block micro-label mt-2">{s.l}</span></div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section>
        <div className="max-w-wide mx-auto px-6 md:px-10 pt-24 pb-10">
          <p className="micro-label mb-4">001 — Geography</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] italic text-dwl-black leading-none tracking-[-0.02em]">The Cities of Al-Andalus</h2>
          <p className="text-[15px] text-dwl-body mt-5 max-w-[640px] leading-relaxed">Muslim rule transformed the Iberian Peninsula into one of medieval Europe's most advanced civilizations. The axis of power ran between North Africa and Iberia — twin halves separated by 14 kilometres of water.</p>
        </div>
        <div className="bg-[#0a0a0a] relative">
          <div ref={mapContainer} className="w-full h-[80vh]" />
          <div className="absolute top-6 right-6 flex flex-col gap-1 z-10">
            {(['full', 'cordoba', 'granada', 'strait', 'north-africa'] as const).map(v => (
              <button key={v} onClick={() => flyTo(v)} className={`text-left px-3 py-2 text-[11px] font-mono backdrop-blur-xl border transition-all ${activeView === v ? 'bg-[#E6394618] border-[#E63946] text-white' : 'bg-[#0a0a0aDD] border-[#333] text-[#888] hover:text-white hover:border-[#E63946]'}`}>
                {{ full: 'Full Extent', cordoba: 'Córdoba', granada: 'Granada', strait: 'The Strait', 'north-africa': 'North Africa' }[v]}
              </button>
            ))}
          </div>
          <div className="absolute bottom-6 left-6 bg-[#0a0a0ae8] backdrop-blur-xl border border-[#262626] p-5 z-10">
            <p className="text-[10px] tracking-[0.12em] uppercase text-[#555] mb-3">Key Cities</p>
            {[{ c: '#E63946', l: 'Capital cities' }, { c: '#FCBF49', l: 'Major taifa kingdoms' }, { c: '#72EFDD', l: 'Frontier / conquered' }, { c: '#48BFE3', l: 'North African power centres' }].map(i => (
              <div key={i.l} className="flex items-center gap-2.5 mb-1 text-[12px] text-[#999]"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: i.c }} />{i.l}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* TIMELINE */}
      <section>
        <div className="max-w-wide mx-auto px-6 md:px-10 pt-24 pb-10">
          <p className="micro-label mb-4">002 — Timeline</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] italic text-dwl-black leading-none tracking-[-0.02em]">781 Years in Sequence</h2>
          <p className="text-[15px] text-dwl-body mt-5 max-w-[640px] leading-relaxed">Every dynasty, every turning point, every loss.</p>
        </div>
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 pb-24 relative">
          <div className="absolute left-[200px] top-0 bottom-0 w-px bg-dwl-border hidden md:block" />
          {TIMELINE.map((era, ei) => (
            <div key={ei} className="relative">
              <div className="sticky top-5 z-10 micro-label py-4 w-[180px] hidden md:block">{era.label}</div>
              <p className="micro-label py-3 md:hidden">{era.label}</p>
              {era.events.map((ev, evi) => {
                const oid = `t${ei}${evi}`
                return (
                  <div key={evi} data-oid={oid} className={`grid grid-cols-1 md:grid-cols-[180px_40px_1fr] items-start py-6 transition-all duration-500 ${vis.has(oid) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${evi * 60}ms` }}>
                    <div className="font-serif italic text-[28px] md:text-right md:pr-6 leading-none pt-0.5 hidden md:block">{ev.year}</div>
                    <div className="justify-center pt-2 hidden md:flex"><span className={`rounded-full z-[2] border-2 border-white ${ev.major ? 'w-4 h-4' : 'w-3 h-3'}`} style={{ background: DOT_COLORS[ev.type] }} /></div>
                    <div className="md:pl-6">
                      <span className="font-serif italic text-[22px] md:hidden">{ev.year} </span>
                      <p className="font-semibold text-[14px] mb-1">{ev.title}</p>
                      <p className="text-[13px] text-dwl-body leading-relaxed max-w-[500px]">{ev.detail}</p>
                      {ev.dataValue && <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-dwl-offwhite border border-dwl-border text-[11px] text-dwl-gray"><span className="font-serif italic text-base text-[#E63946]">{ev.dataValue}</span> {ev.dataLabel}</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* TERRITORY */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-24">
        <p className="micro-label mb-4">003 — Territory</p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] italic text-dwl-black leading-none tracking-[-0.02em]">Muslim-Held Iberia Over Time</h2>
        <p className="text-[15px] text-dwl-body mt-5 max-w-[640px] leading-relaxed mb-10">Peak to zero in 781 years.</p>
        <div className="flex flex-col gap-1">
          {TERRITORY.map((t, i) => {
            const bid = `b${i}`
            return (
              <div key={i} data-oid={`tr${i}`} data-bid={bid} data-bw={t.pct} className="grid grid-cols-[60px_1fr_80px] items-center gap-3 h-9">
                <span className="font-serif italic text-base text-right text-dwl-body">{t.year}</span>
                <div className="h-7 bg-dwl-offwhite relative overflow-hidden">
                  <div className="h-full transition-all duration-[1500ms] ease-out" style={{ width: `${barW[bid] ?? 0}%`, background: 'linear-gradient(90deg, #E63946, #F77F00)' }} />
                </div>
                <span className="font-serif italic text-[13px] text-dwl-gray">{t.pct}%</span>
              </div>
            )
          })}
        </div>
      </section>

      <div className="max-w-wide mx-auto px-6 md:px-10"><div className="border-t border-dwl-border" /></div>

      {/* FIGURES */}
      <section>
        <div className="max-w-wide mx-auto px-6 md:px-10 pt-24 pb-10">
          <p className="micro-label mb-4">004 — Figures</p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] italic text-dwl-black leading-none tracking-[-0.02em]">The People Who Built and Broke Al-Andalus</h2>
        </div>
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-dwl-border">
          {FIGURES.map((f, i) => {
            const oid = `f${i}`
            return (
              <div key={i} data-oid={oid} className={`p-8 bg-white hover:bg-dwl-offwhite transition-all duration-400 ${vis.has(oid) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="micro-label mb-2">{f.dates}</p>
                <p className="font-serif italic text-[22px] mb-1">{f.name}</p>
                <p className="text-[12px] text-[#E63946] mb-3">{f.role}</p>
                <p className="text-[12px] text-dwl-body leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* FOOTER */}
      <section className="border-t border-dwl-border max-w-wide mx-auto px-6 md:px-10 py-16">
        <p className="text-[11px] text-dwl-gray leading-loose max-w-[700px]">
          <span className="font-semibold text-dwl-body">Sources:</span> Britannica · Wikipedia · Metropolitan Museum of Art · World History Encyclopedia · Richard Bulliet conversion model · Colmeiro, Lèvi-Provençal. Territory percentages approximate.
        </p>
        <p className="micro-label mt-10">© 2026 <span className="text-[#E63946]">Dancing with Lions</span>. All rights reserved.<br />Source: Dancing with Lions</p>
      </section>

      <style jsx global>{`
        .mapboxgl-popup-content{background:rgba(10,10,10,.95)!important;backdrop-filter:blur(16px);border:1px solid #333!important;border-radius:0!important;padding:16px 20px!important;box-shadow:0 16px 48px rgba(0,0,0,.5)!important;font-family:var(--font-plex-mono,'IBM Plex Mono',monospace);font-size:12px;line-height:1.6;color:#bbb;max-width:260px}
        .mapboxgl-popup-tip{border-top-color:rgba(10,10,10,.95)!important}
        .mapboxgl-popup-close-button{color:#666!important;font-size:18px!important}
      `}</style>
    </div>
  )
}
