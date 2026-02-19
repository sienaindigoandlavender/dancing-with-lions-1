'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ═══════════════════════════════════════════════════
// BEFORE THE SAHARA — North African Rock Art
// Module 053 · Dancing with Lions
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  ochre: '#8B4513', sand: '#C2956B', rock: '#5D4E37',
  wild: '#6D3A1F',     // Wild Fauna / Bubaline
  round: '#8E3B6E',    // Round Head
  pastoral: '#2E6B3E', // Bovidian / Pastoral
  horse: '#1a3a5c',    // Horse Period
  camel: '#A0522D',    // Camel Period
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

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

// Five chronological periods of Saharan rock art
const PERIODS = [
  { id: 'wild', name: 'Wild Fauna (Bubaline)', dates: '10,000 – 6,000 BCE', color: C.wild, description: 'The oldest engravings. Large naturalistic animals — elephant, rhinoceros, hippopotamus, giant buffalo (Bubalus antiquus), giraffe, crocodile. Polished "Tazina" style with exquisite detail. Animals depicted at life size or larger. Evidence of a green Sahara with rivers, lakes, and abundant wildlife.', animals: 'Elephant, rhinoceros, hippo, giant buffalo, giraffe, crocodile, lion', technique: 'Deep polished engraving (Tazina style), pecked outlines' },
  { id: 'round', name: 'Round Head', dates: '8,000 – 6,000 BCE', color: C.round, description: 'Mysterious painted figures with featureless circular heads, often depicted floating or in trance-like postures. Some figures are several metres tall. Possibly ritual or shamanic scenes. The most enigmatic period — Henri Lhote controversially called them "Martians." Found primarily at Tassili n\'Ajjer. Painted in ochre, often monochrome.', animals: 'Few animals; focus on human/mythical figures', technique: 'Painted (ochre), sometimes with white or yellow' },
  { id: 'pastoral', name: 'Bovidian / Pastoral', dates: '5,500 – 2,000 BCE', color: C.pastoral, description: 'The most abundant period. Depicts the transition to pastoralism — domesticated cattle herds, herders with bows, camp life with women and children, ceremonies and dances. Piebald (spotted) cattle painted in carmine derived from crushed stone mixed with cattle blood. The Sahara is still green but gradually drying.', animals: 'Domesticated cattle (dominant), sheep, goats, dogs', technique: 'Painted (polychrome), some engraving' },
  { id: 'horse', name: 'Horse', dates: '1,000 BCE – 1 CE', color: C.horse, description: 'The introduction of horses and horse-drawn chariots marks increasing mobility as the Sahara dries. Armed riders, battle scenes, and geometric designs become common. In Morocco, the High Atlas sites (Oukaïmeden, Yagour) feature detailed weapons — halberds, daggers, shields — connecting North Africa to Iberian Bronze Age metallurgy.', animals: 'Horses, riders with chariots', technique: 'Pecked and polished engraving, schematic painting' },
  { id: 'camel', name: 'Camel', dates: '200 BCE – present', color: C.camel, description: 'The camel replaces the horse as the primary means of traversing the now-arid Sahara. Tifinagh (Berber) inscriptions appear alongside camel caravans and armed figures. The last phase of rock art — still being made by Tuareg communities into the 20th century. The Sahara is fully desert.', animals: 'Camels, some horses and domestic animals', technique: 'Shallow pecking, Tifinagh script, recent paint' },
]

// Major sites across North Africa
type Site = {
  name: string; country: string; lat: number; lng: number; period: string[];
  engravings: string; description: string; unesco?: boolean; altitude?: string
}

const SITES: Site[] = [
  // MOROCCO — High Atlas Zone
  { name: 'Oukaïmeden', country: 'Morocco', lat: 31.20, lng: -7.86, period: ['horse', 'pastoral'], engravings: '~1,068 depictions across 250 panels', description: 'Alpine valley at 2,630m — the highest rock art site in North Africa. "Meeting Place of the Four Winds." Bronze Age weapons (halberds, daggers) with parallels to Iberian El Argar culture. Elephant friezes at this altitude suggest dramatically different climate. Still used as summer pasture.', altitude: '2,630m' },
  { name: 'Yagour Plateau', country: 'Morocco', lat: 31.13, lng: -7.68, period: ['horse', 'pastoral'], engravings: '~2,000+ engravings', description: 'Vast high-altitude plateau south of Oukaïmeden. Dense concentrations of weapons, cattle, and anthropomorphic figures. Connected to seasonal transhumance routes still used by Amazigh herders.', altitude: '2,600m' },
  { name: 'Jbel Rat', country: 'Morocco', lat: 31.05, lng: -7.55, period: ['horse', 'pastoral'], engravings: 'Hundreds of engravings', description: 'Third major High Atlas site. Together with Oukaïmeden and Yagour, forms the core of Moroccan mountain rock art — over 7,000 engravings total in the High Atlas zone.' },
  // MOROCCO — Draa Valley / Southern
  { name: 'Foum Chenna', country: 'Morocco', lat: 30.30, lng: -5.73, period: ['horse', 'camel'], engravings: '800+ engravings', description: 'The most significant southern Moroccan site. 11 km west of Tinzouline, Zagora province. Libyco-Berber period: domestic animals (goats, dogs, camels), wild animals (ostriches, mouflons, felines), armed horsemen with shields, combat scenes, ostrich hunting.' },
  { name: 'Aït Ouazik', country: 'Morocco', lat: 30.70, lng: -5.60, period: ['wild', 'pastoral'], engravings: 'Major concentration', description: 'Near Tazzarine/Zagora. One of the most renowned and well-preserved sites in Morocco. Life-size rhinoceros and oval engravings in the Tazina style — some of the oldest rock art in the country. Remote location requires off-road access.' },
  { name: 'Tata', country: 'Morocco', lat: 29.75, lng: -7.97, period: ['wild', 'pastoral', 'horse'], engravings: 'Numerous sites', description: 'Cluster of sites along the Jbel Bani foothills and Draa Valley. Full chronological span from earliest Bubaline engravings to Libyco-Berber period. Thousands of rock engravings documenting the evolution from hunters to shepherds to metalworkers.' },
  { name: 'Es Smara / Saguia El Hamra', country: 'Western Sahara', lat: 26.74, lng: -11.67, period: ['wild', 'horse', 'camel'], engravings: 'Multiple sites', description: 'Desert sites in the disputed Western Sahara. Tazina-style engravings connecting to the broader Saharan tradition. Wild fauna and later camel-period inscriptions. Among the most southwesterly rock art in North Africa.' },
  // ALGERIA
  { name: 'Tassili n\'Ajjer', country: 'Algeria', lat: 25.67, lng: 8.00, period: ['wild', 'round', 'pastoral', 'horse', 'camel'], engravings: '15,000+ paintings and engravings', description: 'The greatest open-air museum of prehistoric art on Earth. UNESCO World Heritage Site (1982). 72,000 km² plateau. All five periods represented. Famous Round Head paintings — figures up to 3.5m tall. The "Great God of Sefar." "Crying Cows" of the Bovidian period. Oued Djerat gorge: 30km of engravings.', unesco: true },
  { name: 'Hoggar / Ahaggar', country: 'Algeria', lat: 23.30, lng: 5.53, period: ['wild', 'pastoral', 'camel'], engravings: 'Thousands of engravings', description: 'Volcanic mountain range in central Sahara. Tuareg homeland. Rock art spans from Wild Fauna period through Camel period. Less well-studied than Tassili but archaeologically significant. Mount Tahat (2,908m) is Algeria\'s highest point.' },
  { name: 'South Oran', country: 'Algeria', lat: 32.50, lng: -0.30, period: ['wild', 'pastoral'], engravings: 'Numerous engravings', description: 'Northern Algeria rock art, studied since 1863 — the earliest systematic European documentation of North African rock art. Bubaline-style wild fauna engravings.' },
  // LIBYA
  { name: 'Tadrart Acacus', country: 'Libya', lat: 24.87, lng: 10.35, period: ['wild', 'round', 'pastoral', 'horse', 'camel'], engravings: 'Thousands of paintings and engravings', description: 'UNESCO World Heritage Site (1985). Borders Tassili n\'Ajjer. 12,000 years of continuous art. Now on UNESCO\'s Danger List (2016) due to conflict. Vandalism and oil exploration threaten the site. The "Fighting Cats" of Messak is one of the most iconic Saharan engravings.', unesco: true },
  { name: 'Messak Settafet', country: 'Libya', lat: 25.50, lng: 11.50, period: ['wild', 'pastoral'], engravings: 'Tens of thousands of engravings', description: 'Dark sandstone plateau adjacent to Tadrart Acacus. Home to some of the largest and finest engravings in the Sahara — life-size or larger elephants, rhinos, and the extinct giant buffalo. Bubaline/Tazina masterworks. Few paintings; primarily engravings.' },
  { name: 'Wadi Mathendous', country: 'Libya', lat: 25.90, lng: 11.30, period: ['wild'], engravings: 'Major engravings', description: 'One of the most celebrated engraving sites in North Africa. Life-size crocodile engravings — proof that permanent water once flowed here. Known to Europeans since Heinrich Barth\'s expedition in 1850.' },
  // EGYPT (fringe)
  { name: 'Jebel Uweinat', country: 'Egypt/Libya/Sudan', lat: 21.97, lng: 25.28, period: ['wild', 'pastoral'], engravings: 'Paintings and engravings', description: 'Tri-border mountain (Egypt-Libya-Sudan). Rock art includes the famous "Cave of Swimmers" (Wadi Sura) — human figures in swimming postures, evidence of ancient lakes in what is now hyper-arid desert. Inspired the film "The English Patient."' },
  // TUNISIA
  { name: 'Saharan Atlas', country: 'Tunisia/Algeria', lat: 34.30, lng: 7.80, period: ['pastoral', 'horse'], engravings: 'Scattered sites', description: 'Northern fringe of rock art distribution. Less dense than Saharan sites but connecting the tradition to Mediterranean North Africa. Evidence of pastoral and horse-period communities.' },
]

// Key numbers
const KEY_NUMBERS = [
  { stat: '300+', label: 'Sites in Morocco alone' },
  { stat: '15,000+', label: 'Paintings at Tassili n\'Ajjer' },
  { stat: '12,000', label: 'Years — oldest engravings' },
  { stat: '5', label: 'Distinct artistic periods' },
  { stat: '3', label: 'UNESCO World Heritage Sites' },
  { stat: '2,630m', label: 'Oukaïmeden — highest site in North Africa' },
]

// ═══════════════════════════════════════════════════
// MAP COMPONENT
// ═══════════════════════════════════════════════════

function RockArtMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [filter, setFilter] = useState<string | null>(null)

  const filtered = filter ? SITES.filter(s => s.period.includes(filter)) : SITES

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [2, 28], zoom: 3.5, minZoom: 2.5, maxZoom: 10,
      })
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        SITES.forEach(s => {
          const mainPeriod = s.period[0]
          const periodData = PERIODS.find(p => p.id === mainPeriod)
          const color = periodData?.color || C.rock
          const el = document.createElement('div')
          el.style.cssText = `width:${s.unesco ? 16 : 12}px;height:${s.unesco ? 16 : 12}px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3);cursor:pointer;`
          const popup = new mapboxgl.default.Popup({ offset: 12, closeButton: false, maxWidth: '260px' })
            .setHTML(`<div style="font-family:system-ui;"><strong style="font-size:13px;">${s.name}</strong><br/><span style="font-size:10px;color:#737373;">${s.country}${s.unesco ? ' · UNESCO' : ''}${s.altitude ? ' · ' + s.altitude : ''}</span><br/><span style="font-size:11px;margin-top:4px;display:block;">${s.engravings}</span></div>`)
          new mapboxgl.default.Marker({ element: el, anchor: 'center' }).setLngLat([s.lng, s.lat]).setPopup(popup).addTo(map)
        })
      })
      mapRef.current = map
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: 420, borderRadius: 0, border: `1px solid ${C.border}` }} />
      {!MAPBOX_TOKEN && (
        <p className="text-[11px] p-3" style={{ color: C.muted }}>Map requires NEXT_PUBLIC_MAPBOX_TOKEN environment variable.</p>
      )}
      {/* Period filter legend */}
      <div className="flex flex-wrap gap-2 mt-3">
        <button onClick={() => setFilter(null)}
          className="text-[9px] font-mono px-2 py-1 border transition-all"
          style={{ borderColor: !filter ? C.ink : C.border, color: !filter ? C.ink : C.muted }}>
          ALL SITES
        </button>
        {PERIODS.map(p => (
          <button key={p.id} onClick={() => setFilter(filter === p.id ? null : p.id)}
            className="text-[9px] font-mono px-2 py-1 border transition-all flex items-center gap-1"
            style={{ borderColor: filter === p.id ? p.color : C.border, color: filter === p.id ? p.color : C.muted }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
            {p.name.split('(')[0].trim()}
          </button>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

export default function BeforeTheSaharaPage() {
  const heroR = useReveal()
  const keyR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-36 pb-10">
        <Link href="/data" className="micro-label hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>
          ← All Data Modules
        </Link>
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 053 · Archaeological Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Before the<br />Sahara</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] mb-6" style={{ color: C.muted }}>
            12,000 years of rock art across North Africa. When the desert was green.
          </p>
          <p className="text-[15px] leading-[1.8] max-w-[620px]" style={{ color: C.text }}>
            The Sahara was not always a desert. Ten thousand years ago, it was a savanna crossed
            by rivers and dotted with lakes, where elephants, hippos, and crocodiles lived alongside
            human communities who hunted, herded, and prayed. They left their record on stone — more
            than 15,000 paintings and engravings at Tassili n'Ajjer alone, thousands more scattered
            across Morocco, Libya, and the edges of Egypt and Tunisia. These are not cave paintings
            hidden underground. They are open-air galleries, etched into sandstone under the sun,
            documenting the single most dramatic climate shift in recorded human experience: the
            transformation of a grassland the size of the United States into the largest hot desert
            on Earth. The art tracks the change — from elephants to cattle to horses to camels —
            over five distinct periods spanning 12,000 years.
          </p>
        </div>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-10">
        <div ref={keyR.ref} className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {KEY_NUMBERS.map((k, i) => (
            <div key={k.label} className="border-t pt-2 transition-all duration-700"
              style={{ borderColor: C.ochre, opacity: keyR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
              <p className="font-serif text-[clamp(1rem,2.5vw,1.4rem)] leading-none" style={{ color: C.ochre }}>{k.stat}</p>
              <p className="text-[9px] font-mono mt-1" style={{ color: C.muted }}>{k.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ I. THE FIVE PERIODS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section I</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Five Periods</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          Saharan rock art is classified into five chronological periods based on style, subject
          matter, and climate. The sequence tracks a world drying out.
        </p>
        <div className="space-y-4">
          {PERIODS.map((p, i) => {
            const rv = useReveal()
            return (
              <div key={p.id} ref={rv.ref} className="border-l-4 pl-5 py-3 transition-all duration-500"
                style={{ borderColor: p.color, opacity: rv.vis ? 1 : 0, transform: rv.vis ? 'translateX(0)' : 'translateX(-10px)', transitionDelay: `${i * 80}ms` }}>
                <div className="flex items-baseline gap-3 mb-1">
                  <p className="font-serif text-[17px]">{p.name}</p>
                  <span className="text-[10px] font-mono" style={{ color: p.color }}>{p.dates}</span>
                </div>
                <p className="text-[12px] leading-relaxed mb-2" style={{ color: C.text }}>{p.description}</p>
                <div className="flex gap-6 text-[10px] font-mono" style={{ color: C.muted }}>
                  <span><strong>Animals:</strong> {p.animals}</span>
                </div>
                <p className="text-[10px] font-mono mt-1" style={{ color: C.muted }}><strong>Technique:</strong> {p.technique}</p>
              </div>
            )
          })}
        </div>
        {/* Visual timeline bar */}
        <div className="mt-8 flex h-6 w-full overflow-hidden border" style={{ borderColor: C.border }}>
          {PERIODS.map(p => (
            <div key={p.id} className="h-full flex items-center justify-center" style={{ flex: 1, background: p.color }}>
              <span className="text-white text-[7px] font-mono hidden md:block">{p.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[8px] font-mono mt-1" style={{ color: C.muted }}>
          <span>10,000 BCE</span><span>6,000 BCE</span><span>2,000 BCE</span><span>0 CE</span><span>Present</span>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ II. THE MAP ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Sites</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          Major rock art sites across North Africa. Colour indicates the earliest period present
          at each site. Click any marker for detail. UNESCO World Heritage Sites are shown larger.
        </p>
        <RockArtMap />
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ III. SITE CARDS ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section III</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Archive</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          {SITES.length} documented sites across four countries. Each card shows the periods
          present, number of engravings, and what makes the site significant.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SITES.map((s, i) => {
            const rv = useReveal()
            const mainColor = PERIODS.find(p => p.id === s.period[0])?.color || C.rock
            return (
              <div key={s.name} ref={rv.ref} className="border p-4 transition-all duration-500"
                style={{ borderColor: C.border, opacity: rv.vis ? 1 : 0, transform: rv.vis ? 'translateY(0)' : 'translateY(8px)', transitionDelay: `${(i % 6) * 40}ms` }}>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-serif text-[15px] leading-tight">{s.name}</p>
                    <p className="text-[9px] font-mono" style={{ color: C.muted }}>
                      {s.country}{s.unesco ? ' · UNESCO' : ''}{s.altitude ? ' · ' + s.altitude : ''}
                    </p>
                  </div>
                  <div className="flex gap-0.5 shrink-0 ml-2">
                    {s.period.map(pid => {
                      const pc = PERIODS.find(p => p.id === pid)?.color || C.rock
                      return <div key={pid} className="w-2 h-2 rounded-full" style={{ background: pc }} />
                    })}
                  </div>
                </div>
                <p className="text-[10px] font-mono mb-1.5" style={{ color: mainColor }}>{s.engravings}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: C.text }}>{s.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ IV. THE CLIMATE STORY ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section IV</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Climate Story</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.text }}>
          Rock art is a climate record. The animals depicted tell you what lived there, and
          therefore what the landscape looked like. Read the art, and you read the weather.
        </p>
        <div className="space-y-3">
          {[
            { period: '10,000 BCE', climate: 'African Humid Period begins. Sahara receives monsoon rains. Rivers flow, lakes form (Lake Mega-Chad, Lake Mega-Fezzan). Elephant, hippo, crocodile inhabit what is now desert.', art: 'Bubaline engravings: life-size wild fauna. Proof of a green Sahara.', color: C.wild },
            { period: '7,000 BCE', climate: 'Peak humidity. The "Green Sahara" — vegetation extends across the entire Saharan region. Human communities thrive as hunter-gatherers.', art: 'Round Head paintings: large ritual/shamanic figures. Dense habitation at Tassili shelters.', color: C.round },
            { period: '5,500 BCE', climate: 'Gradual aridification begins. Pastoralism emerges as grasslands shrink. Communities transition from hunting to herding.', art: 'Bovidian period: domesticated cattle, herding scenes, camp life. The most abundant rock art period.', color: C.pastoral },
            { period: '3,500 BCE', climate: 'Rapid desertification. Rivers dry up. Lakes shrink. Human populations migrate to Nile Valley, Atlas Mountains, and Mediterranean coast.', art: 'Fewer paintings. Cattle disappear from the record. Evidence of competition for remaining resources.', color: C.pastoral },
            { period: '1,000 BCE', climate: 'Sahara essentially desert. Mobility becomes survival. Horses and chariots enable long-distance travel across arid terrain.', art: 'Horse Period: riders, chariots, weapons. In Morocco, Bronze Age metalwork depicted at high-altitude sites.', color: C.horse },
            { period: '200 BCE – present', climate: 'Full desert. Only the camel allows habitation. Tuareg, Sahrawi, and other nomadic peoples traverse the sand sea.', art: 'Camel Period: caravans, Tifinagh script, armed riders. Still being made into the 20th century.', color: C.camel },
          ].map((t, i) => {
            const rv = useReveal()
            return (
              <div key={i} ref={rv.ref} className="flex gap-4 items-start transition-all duration-500"
                style={{ opacity: rv.vis ? 1 : 0, transform: rv.vis ? 'translateX(0)' : 'translateX(-8px)' }}>
                <div className="shrink-0 w-[80px] text-right">
                  <span className="text-[10px] font-mono font-bold" style={{ color: t.color }}>{t.period}</span>
                </div>
                <div className="w-3 h-3 rounded-full mt-0.5 shrink-0" style={{ background: t.color }} />
                <div className="flex-1 border-l pl-4" style={{ borderColor: C.border }}>
                  <p className="text-[11px] leading-relaxed mb-1" style={{ color: C.text }}><strong>Climate:</strong> {t.climate}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: C.muted }}><strong>Art:</strong> {t.art}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ READING NOTES ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-4" style={{ color: C.muted }}>Reading Notes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-[18px] mb-2">Elephants at 2,630 Metres</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Oukaïmeden, today a ski resort south of Marrakech, contains engravings of elephants
              at 2,630m altitude. This is the only evidence of elephants at such elevation in North
              Africa. It means the climate was warm enough for megafauna to graze at altitudes that
              now receive heavy snow. The site also features Bronze Age weapons — halberds and daggers
              with direct parallels to the El Argar culture of southern Spain, evidence of trans-Mediterranean
              contact 4,000 years ago. The name means "Meeting Place of the Four Winds."
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Cave of Swimmers</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              At Jebel Uweinat, where Egypt, Libya, and Sudan meet, painted figures appear to
              be swimming. Today, the area receives virtually zero rainfall. The paintings are
              evidence of a landscape so different from the present that it contained permanent
              lakes deep enough to swim in. The site was discovered by László Almásy in 1933
              and later inspired the Michael Ondaatje novel and the film "The English Patient."
              It is one of the most poignant images in all rock art — humans in water, in a
              place where no water has fallen in thousands of years.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">Heritage Under Threat</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              In 2014, Libya's Tadrart Acacus was reported being destroyed with sledgehammers.
              Oil exploration sends seismic shockwaves through the rock. Tourists and locals
              carve names next to 10,000-year-old engravings. The site has been on UNESCO's
              Danger List since 2016. In Morocco, many southern sites remain unprotected, with
              no fencing or surveillance. The Trust for African Rock Art (TARA) in Nairobi is
              one of the few organisations systematically documenting what remains before it
              is lost.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <p className="micro-label mb-4" style={{ color: C.muted }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: C.muted }}>
          <p><strong>Morocco:</strong> British Museum African Rock Art Archive (africanrockart.britishmuseum.org), "Morocco" country page: 300+ documented sites, two main zones. Oukaïmeden: 250 rock art sites, ~1,068 depictions (Collado Giraldo 2014, Rodrigue 1999, Malhomme 1959/1961). Foum Chenna: 800+ schematic engravings (Abioui et al. 2019). Draa Valley described as the most significant concentration in Morocco (southeast-morocco.com). Four-period classification: Searight 2013, "Morocco's Rock Art: Age and Meaning," <em>Arts</em> 2(1), MDPI. Tazina style engravings at Aït Ouazik (wildmorocco.com). High Atlas Bronze Age weapon parallels to El Argar: Chenorkian, Lull et al. 2005.</p>
          <p><strong>Algeria:</strong> Tassili n'Ajjer: UNESCO World Heritage listing (1982). 15,000+ paintings and engravings. Five-period chronology per UNESCO and David Coulson (TARA). Round Head period, "Great God of Sefar," and "Crying Cows" per National Geographic (2024) and Bradshaw Foundation. Lhote, H. (1958), <em>À la découverte des fresques du Tassili</em>. 72,000 km² area.</p>
          <p><strong>Libya:</strong> Tadrart Acacus: UNESCO World Heritage listing (1985), Danger List (2016). Messak Settafet: tens of thousands of engravings (British Museum archive). Wadi Mathendous: Heinrich Barth expedition (1850). Vandalism reports: Bourget/Al-Hachi (2014); di Lernia et al. (2010). "Fighting Cats" engraving at Messak. Archaeological sequence: di Lernia & Gallinaro (2010), <em>Antiquity</em>.</p>
          <p><strong>Climate:</strong> African Humid Period / Green Sahara: widely documented. Aridification timeline synthesised from UNESCO chronologies and Tassili n'Ajjer research. Cave of Swimmers: Almásy discovery (1933), Jebel Uweinat.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: C.muted }}>
          © Dancing with Lions · dancingwithlions.com · Rock art chronologies are approximate and subject to ongoing revision. Direct dating of most engravings remains impossible. This visualisation may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
