'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  almoravid: '#8B6E4E', almohad: '#C8A415', nasrid: '#2D6E4F', christian: '#4A6B8A',
  marinid: '#6B4E37', taifa: '#A0846B', blood: '#722F37',
  sea: '#89A8B8', land: '#D4C5A9', muslim: '#2D6E4F', cross: '#7A3B2E',
}

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

interface Snapshot { year: number; muslimPct: number; dynasty: string; label: string; color: string }
const TERRITORY: Snapshot[] = [
  { year: 1080, muslimPct: 40, dynasty: 'Taifas', label: 'Fragmented taifa kingdoms', color: C.taifa },
  { year: 1095, muslimPct: 42, dynasty: 'Almoravid', label: 'Almoravid unification — briefly recovers ground', color: C.almoravid },
  { year: 1120, muslimPct: 38, dynasty: 'Almoravid', label: 'Almoravid decline — Zaragoza lost 1118', color: C.almoravid },
  { year: 1150, muslimPct: 33, dynasty: '2nd Taifas', label: 'Second taifa fragmentation', color: C.taifa },
  { year: 1172, muslimPct: 35, dynasty: 'Almohad', label: 'Almohad consolidation of Al-Andalus', color: C.almohad },
  { year: 1195, muslimPct: 34, dynasty: 'Almohad', label: 'After victory at Alarcos', color: C.almohad },
  { year: 1212, muslimPct: 30, dynasty: 'Almohad', label: 'Las Navas de Tolosa — turning point', color: C.almohad },
  { year: 1250, muslimPct: 10, dynasty: '3rd Taifas', label: 'Córdoba, Seville, Valencia fallen', color: C.taifa },
  { year: 1300, muslimPct: 5, dynasty: 'Nasrid', label: 'Only Granada remains', color: C.nasrid },
  { year: 1400, muslimPct: 4, dynasty: 'Nasrid', label: 'Granada — tributary of Castile', color: C.nasrid },
  { year: 1492, muslimPct: 0, dynasty: 'End', label: 'Fall of Granada. End of Al-Andalus.', color: C.blood },
]

interface Event { year: string; label: string; era: string; color: string; detail: string; place?: string }
const EVENTS: Event[] = [
  { year: '1085', label: 'Fall of Toledo to Castile', era: 'Prelude', color: C.christian,
    detail: 'Alfonso VI of León-Castile captures Toledo — the old Visigothic capital and heart of central Iberia. The taifa kings, terrified, send an urgent plea across the Strait to Yusuf ibn Tashfin, ruler of the Almoravid Empire. "We would rather be camel-drivers in Africa than swineherd in Castile."',
    place: 'Toledo' },
  { year: '1086', label: 'Battle of Sagrajas (al-Zallāqa)', era: 'Almoravid (1086–1147)', color: C.almoravid,
    detail: 'Yusuf ibn Tashfin crosses the Strait of Gibraltar with a Berber army. On October 23, he crushes Alfonso VI north of Badajoz. It is the first time Morocco and Iberia fight as one force. But Yusuf returns to Africa rather than pressing the advantage. Toledo remains Christian.',
    place: 'Sagrajas, near Badajoz' },
  { year: '1090–91', label: 'Almoravids annex the taifas', era: 'Almoravid (1086–1147)', color: C.almoravid,
    detail: 'Disgusted by the taifa kings\' weakness and luxury, Yusuf deposes them one by one: Granada, Málaga, Almería, Seville, Badajoz. By 1094, the Almoravids control all of Muslim Iberia. Morocco and Al-Andalus are unified under a single Berber empire stretching from Senegal to Zaragoza.',
    place: 'Seville, Córdoba, Granada' },
  { year: '1094', label: 'El Cid takes Valencia', era: 'Almoravid (1086–1147)', color: C.christian,
    detail: 'Rodrigo Díaz de Vivar — El Cid — captures Valencia and holds it against Almoravid sieges. He is the one Christian warlord the Almoravids cannot dislodge. After his death in 1099, his wife Jimena holds the city until 1102, when it falls to the Almoravids.',
    place: 'Valencia' },
  { year: '1118', label: 'Zaragoza falls to Aragon', era: 'Almoravid (1086–1147)', color: C.christian,
    detail: 'Alfonso I "the Battler" of Aragon captures Zaragoza — the great Muslim city of the Ebro valley. The Almoravid northern frontier begins to crumble. This is the first major territorial loss under Almoravid rule.',
    place: 'Zaragoza' },
  { year: '1139', label: 'Portugal declares independence', era: 'Almoravid (1086–1147)', color: C.christian,
    detail: 'Afonso Henriques defeats the Moors at the Battle of Ourique and declares himself King of Portugal — independent from León. A new Christian kingdom is born on Iberia\'s Atlantic flank, carved from what was Almoravid territory.',
    place: 'Ourique, Alentejo' },
  { year: '1147', label: 'Almohads take Marrakech & cross to Iberia', era: 'Almohad (1147–1228)', color: C.almohad,
    detail: 'The Almohads — Masmuda Berbers from the Atlas — overthrow the Almoravids in Marrakech. They then cross to Iberia and absorb the second taifas. By 1172, all Muslim Iberia is Almohad. Seville replaces Córdoba as capital. The Giralda tower rises.',
    place: 'Marrakech → Seville' },
  { year: '1147', label: 'Lisbon falls to Portugal', era: 'Almohad (1147–1228)', color: C.christian,
    detail: 'In the same year the Almohads take Marrakech, Afonso Henriques captures Lisbon with the help of English, Flemish, and German Crusaders en route to the Holy Land. The Atlantic coast of Iberia shifts Christian.',
    place: 'Lisbon' },
  { year: '1163–1199', label: 'Almohad golden age', era: 'Almohad (1147–1228)', color: C.almohad,
    detail: 'Under Abu Yaqub Yusuf and Abu Yusuf Yaqub al-Mansur, the Almohad empire reaches its zenith. They build the Koutoubia Mosque (Marrakech), Hassan Tower (Rabat), and the Giralda (Seville). Averroes writes philosophy in Córdoba. This is the peak of trans-Strait civilisation.',
    place: 'Marrakech, Rabat, Seville, Córdoba' },
  { year: '1195', label: 'Battle of Alarcos', era: 'Almohad (1147–1228)', color: C.almohad,
    detail: 'Al-Mansur defeats Alfonso VIII of Castile at Alarcos — a devastating Christian loss. The Almohad frontier pushes north briefly. It is the last great Muslim military victory on Iberian soil.',
    place: 'Alarcos, south of Toledo' },
  { year: '1212', label: 'Battle of Las Navas de Tolosa', era: 'Almohad (1147–1228)', color: C.christian,
    detail: 'A coalition of Castile, Aragon, Navarre, and Portugal — with Papal blessing — crushes the Almohad army in the Sierra Morena. This is the turning point. The Almohad empire never recovers. Within 40 years, nearly all of Al-Andalus will fall.',
    place: 'Las Navas de Tolosa, Jaén' },
  { year: '1228', label: 'Almohads withdraw from Iberia', era: 'Collapse (1228–1262)', color: C.almohad,
    detail: 'Caliph al-Ma\'mun abandons Al-Andalus entirely, retreating to Africa. A third wave of taifa kingdoms emerges — weak, divided, doomed. The Christian kingdoms advance rapidly.',
    place: 'Seville → Marrakech' },
  { year: '1236', label: 'Fall of Córdoba', era: 'Collapse (1228–1262)', color: C.christian,
    detail: 'Ferdinand III of Castile captures Córdoba — the former seat of the Umayyad Caliphate, once the largest city in Europe. The Great Mosque is consecrated as a cathedral. Eight centuries of Muslim Córdoba end.',
    place: 'Córdoba' },
  { year: '1238', label: 'Fall of Valencia + Founding of Granada', era: 'Collapse (1228–1262)', color: C.christian,
    detail: 'James I of Aragon takes Valencia. In the same year, Muhammad ibn al-Ahmar founds the Nasrid dynasty in Granada — the last Muslim kingdom on the peninsula. He submits to Castile as a tributary vassal to survive.',
    place: 'Valencia / Granada' },
  { year: '1248', label: 'Fall of Seville', era: 'Collapse (1228–1262)', color: C.christian,
    detail: 'Ferdinand III enters Seville on December 22 after a 16-month siege. The Almohad capital in Europe is Christian. 300,000 Muslims flee to Granada or North Africa. The Giralda becomes a bell tower.',
    place: 'Seville' },
  { year: '1269', label: 'Marinids take Marrakech', era: 'Collapse (1228–1262)', color: C.marinid,
    detail: 'In Morocco, the Marinid dynasty overthrow the last Almohad ruler. They attempt brief interventions in Iberia but are defeated at the Battle of Tarifa (1340). The Strait of Gibraltar becomes a one-way border.',
    place: 'Marrakech / Gibraltar' },
  { year: '1238–1492', label: 'Emirate of Granada endures', era: 'Nasrid Granada (1238–1492)', color: C.nasrid,
    detail: 'For 254 years, Granada survives as the last Muslim state in Western Europe — paying tribute to Castile, importing Marinid mercenaries from Morocco. A population of ~300,000 in roughly 30,000 km². It produces the Alhambra.',
    place: 'Granada' },
  { year: '~1340s–1390s', label: 'The Alhambra takes shape', era: 'Nasrid Granada (1238–1492)', color: C.nasrid,
    detail: 'Under Yusuf I and Muhammad V, the Alhambra reaches its glory: the Court of the Lions, the Hall of the Ambassadors, the Generalife gardens. Geometric perfection in stucco, tile, and water. Built by a kingdom that knew it was dying.',
    place: 'Alhambra, Granada' },
  { year: '1340', label: 'Battle of Río Salado', era: 'Nasrid Granada (1238–1492)', color: C.christian,
    detail: 'A combined Castilian-Portuguese army defeats a Marinid-Granadan force at Tarifa. The last major North African intervention in Iberia. The Marinids lose Algeciras (1344). The Strait is sealed.',
    place: 'Tarifa' },
  { year: '1469', label: 'Ferdinand & Isabella marry', era: 'Nasrid Granada (1238–1492)', color: C.christian,
    detail: 'The marriage of Ferdinand of Aragon and Isabella of Castile unites the two largest Christian kingdoms. For the first time, Granada faces a single, united enemy. The endgame begins.',
    place: 'Valladolid' },
  { year: '1482', label: 'War of Granada begins', era: 'Fall of Granada (1482–1492)', color: C.blood,
    detail: 'Ferdinand and Isabella launch a systematic 10-year campaign. Siege by siege: Alhama (1482), Ronda (1485), Málaga (1487), Baza (1489), Almería (1489). Internal Nasrid civil war accelerates the collapse.',
    place: 'Granada frontier' },
  { year: '1487', label: 'Fall of Málaga', era: 'Fall of Granada (1482–1492)', color: C.blood,
    detail: 'After a brutal siege, Málaga falls. Its entire Muslim population — 15,000 people — is enslaved. The harshest treatment of any captured city, meant as a warning to Granada.',
    place: 'Málaga' },
  { year: '2 Jan 1492', label: 'Fall of Granada', era: 'Fall of Granada (1482–1492)', color: C.blood,
    detail: 'Muhammad XII (Boabdil) surrenders the keys of the Alhambra to Ferdinand and Isabella. As he rides away, he turns to look at Granada one last time. His mother says: "Weep like a woman for what you could not defend as a man." 781 years of Muslim Iberia end.',
    place: 'Alhambra, Granada' },
  { year: '1492', label: 'Expulsion of the Jews', era: 'Aftermath', color: C.blood,
    detail: 'Three months after Granada falls, the Alhambra Decree expels all Jews from Spain. ~200,000 Sephardic Jews flee — many to Morocco, settling in Fes, Meknès, Tétouan, and Essaouira. Their descendants live there still.',
    place: 'Spain → Morocco' },
  { year: '1609–14', label: 'Expulsion of the Moriscos', era: 'Aftermath', color: C.blood,
    detail: 'Spain expels the Moriscos — Muslims who had converted to Christianity. 300,000 people cross to Morocco. The Andalusi refugees transform Rabat, Salé, Tétouan, and Chefchaouen — bringing architecture, cuisine, and music that persists to this day.',
    place: 'Spain → Morocco' },
]

const ERA_COLORS: Record<string, string> = {
  'Prelude': C.christian, 'Almoravid (1086–1147)': C.almoravid,
  'Almohad (1147–1228)': C.almohad, 'Collapse (1228–1262)': C.christian,
  'Nasrid Granada (1238–1492)': C.nasrid, 'Fall of Granada (1482–1492)': C.blood, 'Aftermath': C.blood,
}

function IberiaMap({ selectedYear }: { selectedYear: number }) {
  const snapshot = TERRITORY.reduce((best, s) =>
    Math.abs(s.year - selectedYear) < Math.abs(best.year - selectedYear) ? s : best, TERRITORY[0])
  const frontierY = 60 + (1 - snapshot.muslimPct / 50) * 200

  const cities: { x: number; y: number; name: string; fallYear: number }[] = [
    { x: 120, y: 100, name: 'Toledo', fallYear: 1085 },
    { x: 275, y: 110, name: 'Zaragoza', fallYear: 1118 },
    { x: 195, y: 210, name: 'Córdoba', fallYear: 1236 },
    { x: 165, y: 245, name: 'Seville', fallYear: 1248 },
    { x: 235, y: 265, name: 'Granada', fallYear: 1492 },
    { x: 280, y: 190, name: 'Valencia', fallYear: 1238 },
    { x: 55, y: 170, name: 'Lisbon', fallYear: 1147 },
    { x: 300, y: 240, name: 'Málaga', fallYear: 1487 },
    { x: 130, y: 50, name: 'Santiago', fallYear: 0 },
    { x: 155, y: 140, name: 'Badajoz', fallYear: 1230 },
  ]

  return (
    <div>
      <svg viewBox="0 0 400 340" className="w-full" style={{ maxHeight: 380 }}>
        <rect width="400" height="340" fill={C.sea} opacity="0.08" />
        <path d="M45,75 L85,42 L140,35 L200,28 L260,35 L310,55 L355,70 L365,100 L358,140 L345,170 L325,195 L330,230 L310,265 L275,285 L245,295 L215,290 L180,295 L145,285 L120,270 L100,275 L75,265 L55,245 L35,210 L25,170 L30,130 L38,100 Z"
          fill={C.land} opacity="0.3" stroke={C.ink} strokeWidth="0.8" />
        <defs>
          <clipPath id="ib">
            <path d="M45,75 L85,42 L140,35 L200,28 L260,35 L310,55 L355,70 L365,100 L358,140 L345,170 L325,195 L330,230 L310,265 L275,285 L245,295 L215,290 L180,295 L145,285 L120,270 L100,275 L75,265 L55,245 L35,210 L25,170 L30,130 L38,100 Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#ib)">
          <rect x="0" y={frontierY} width="400" height={340 - frontierY}
            fill={C.muslim} opacity="0.15" style={{ transition: 'y 0.8s, height 0.8s' }} />
          <line x1="25" y1={frontierY} x2="370" y2={frontierY}
            stroke={C.blood} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6"
            style={{ transition: 'y1 0.8s, y2 0.8s' }} />
        </g>
        <rect x="30" y="300" width="160" height="35" fill={C.muslim} opacity="0.08" rx="2" />
        <text x="110" y="322" textAnchor="middle" className="font-mono" style={{ fontSize: 8, fill: C.muslim }}>Morocco (Marrakech)</text>
        <line x1="70" y1="282" x2="120" y2="300" stroke={C.sea} strokeWidth="3" opacity="0.3" />
        <text x="95" y="296" textAnchor="middle" className="font-mono" style={{ fontSize: 6, fill: C.sea }}>Strait</text>

        {cities.map(c => {
          const isMuslim = c.fallYear === 0 ? false : selectedYear < c.fallYear
          return (
            <g key={c.name}>
              <circle cx={c.x} cy={c.y} r="3" fill={isMuslim ? C.muslim : C.cross} opacity="0.7" />
              <text x={c.x} y={c.y - 6} textAnchor="middle" className="font-mono"
                style={{ fontSize: 7, fill: isMuslim ? C.muslim : C.cross }}>{c.name}</text>
            </g>
          )
        })}

        <text x="180" y={Math.min(frontierY - 10, 250)} textAnchor="middle" className="font-mono"
          style={{ fontSize: 9, fill: C.cross, fontWeight: 700, transition: 'y 0.8s' }}>Christian Kingdoms</text>
        {snapshot.muslimPct > 2 && (
          <text x="200" y={Math.max(frontierY + 18, 80)} textAnchor="middle" className="font-mono"
            style={{ fontSize: 9, fill: C.muslim, fontWeight: 700, transition: 'y 0.8s' }}>
            Al-Andalus ({snapshot.muslimPct}%)</text>
        )}
        <text x="370" y="30" textAnchor="end" className="font-mono" style={{ fontSize: 16, fill: C.ink, fontWeight: 700 }}>{selectedYear}</text>
        <text x="370" y="44" textAnchor="end" className="font-mono" style={{ fontSize: 8, fill: C.muted }}>{snapshot.dynasty}</text>
      </svg>
      <p className="font-mono text-[10px] text-center italic mt-1" style={{ color: C.muted }}>{snapshot.label}</p>
    </div>
  )
}

function TimelineCard({ event, index }: { event: Event; index: number }) {
  const [exp, setExp] = useState(false)
  const r = useReveal(0.1)
  const isL = index % 2 === 0
  return (
    <div ref={r.ref} className="relative grid gap-4 mb-1 transition-all duration-700"
      style={{ gridTemplateColumns: 'minmax(0,1fr) 40px minmax(0,1fr)', opacity: r.vis ? 1 : 0, transform: r.vis ? 'translateY(0)' : 'translateY(16px)' }}>
      <div className={`flex ${isL ? 'justify-end' : ''}`}>
        {isL ? <CB e={event} exp={exp} tog={() => setExp(!exp)} a="right" /> :
          <div className="flex items-start justify-end pt-1"><span className="font-mono text-[11px] font-bold text-right" style={{ color: event.color }}>{event.year}</span></div>}
      </div>
      <div className="flex flex-col items-center">
        <div className="w-px flex-1" style={{ background: `${event.color}30` }} />
        <div className="w-3 h-3 rounded-full border-2 shrink-0 my-0.5" style={{ borderColor: event.color, background: exp ? event.color : 'white' }} />
        <div className="w-px flex-1" style={{ background: `${event.color}30` }} />
      </div>
      <div className={`flex ${!isL ? 'justify-start' : ''}`}>
        {!isL ? <CB e={event} exp={exp} tog={() => setExp(!exp)} a="left" /> :
          <div className="flex items-start pt-1"><span className="font-mono text-[11px] font-bold" style={{ color: event.color }}>{event.year}</span></div>}
      </div>
    </div>
  )
}

function CB({ e, exp, tog, a }: { e: Event; exp: boolean; tog: () => void; a: 'left'|'right' }) {
  return (
    <div className={`max-w-[380px] cursor-pointer group ${a === 'right' ? 'text-right' : 'text-left'}`} onClick={tog}>
      <p className="font-mono text-[11px] font-bold mb-0.5" style={{ color: e.color }}>{e.year}</p>
      <p className="font-mono text-[12px] font-bold leading-[1.3] group-hover:underline mb-1" style={{ color: C.ink }}>{e.label}</p>
      <p className="font-mono text-[9px] uppercase tracking-[0.1em] mb-1" style={{ color: C.muted }}>{e.era}</p>
      {exp && (<div className="mt-2">
        <p className="text-[11px] leading-[1.65]" style={{ color: C.text, textAlign: 'left' }}>{e.detail}</p>
        {e.place && <p className="font-mono text-[9px] mt-2 italic" style={{ color: e.color }}>📍 {e.place}</p>}
      </div>)}
    </div>
  )
}

export default function AlAndalusPage() {
  const heroR = useReveal(); const numsR = useReveal(); const mapR = useReveal(); const barR = useReveal()
  const [mapYear, setMapYear] = useState(1095)
  const eras: { name: string; color: string }[] = []
  let lastEra = ''
  EVENTS.forEach(e => { if (e.era !== lastEra) { eras.push({ name: e.era, color: ERA_COLORS[e.era] || C.muted }); lastEra = e.era } })

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 pt-36 pb-16">
        <Link href="/data" className="font-mono text-[10px] uppercase tracking-[0.12em] hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: C.muted }}>← All Data Modules</Link>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>History · When Three Nations Were One</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.88] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Al-Andalus</em></h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] leading-[1.3]" style={{ color: C.muted }}>
            From the Almoravid crossing of 1086 to the fall of Granada in 1492. Four centuries when Morocco, Portugal, and Spain shared a single civilisation.</p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          In 1085, Christian Castile captured Toledo. The panicked Muslim taifa kings sent a
          desperate plea across the Strait of Gibraltar to the Almoravids — Saharan Berbers
          who had just conquered Morocco. Yusuf ibn Tashfin crossed with an army and crushed
          Castile at Sagrajas in 1086. For the next four centuries, Morocco and Iberia were bound
          together — first under the Almoravids, then the Almohads, then in the long twilight
          of Nasrid Granada. The Koutoubia in Marrakech and the Giralda in Seville were built by
          the same dynasty. When Granada fell on January 2, 1492, the refugees crossed back to
          Morocco — bringing Andalusi architecture, music, and cuisine that defines Moroccan
          cities to this day.
        </p>
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '406', u: 'years', l: '1086–1492', c: C.almoravid },
            { v: '3', u: 'dynasties', l: 'Almoravid → Almohad → Nasrid', c: C.almohad },
            { v: '14 km', u: '', l: 'Strait of Gibraltar', c: C.sea },
            { v: '0%', u: '', l: 'Muslim Iberia after 1492', c: C.blood },
          ].map((n, i) => (
            <div key={n.l} className="transition-all duration-700" style={{ opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}>
                <span className="text-[28px] font-bold">{n.v}</span>
                {n.u && <span className="text-[13px] ml-1">{n.u}</span>}
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-8">
        <div ref={mapR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.muslim }}>The Shrinking Frontier</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>Drag the slider to watch Al-Andalus contract over four centuries. City dots change colour as they fall.</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3"><IberiaMap selectedYear={mapYear} /></div>
            <div className="md:col-span-2">
              <div className="mb-4">
                <input type="range" min={1080} max={1500} value={mapYear} onChange={e => setMapYear(Number(e.target.value))}
                  className="w-full h-1 rounded-full cursor-pointer" style={{ accentColor: C.blood }} />
                <div className="flex justify-between mt-1">
                  <span className="font-mono text-[9px]" style={{ color: C.muted }}>1080</span>
                  <span className="font-mono text-[9px]" style={{ color: C.muted }}>1500</span>
                </div>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: C.muted }}>Muslim Territory (% of Iberia)</p>
              <div ref={barR.ref} className="space-y-1">
                {TERRITORY.map((t, i) => (
                  <div key={t.year} className="flex items-center gap-2 transition-all duration-500"
                    style={{ opacity: barR.vis ? 1 : 0, transitionDelay: `${i * 40}ms` }}>
                    <span className="font-mono text-[9px] w-10 shrink-0 text-right font-bold"
                      style={{ color: Math.abs(t.year - mapYear) < 30 ? C.ink : C.muted }}>{t.year}</span>
                    <div className="flex-1 h-3 rounded-sm" style={{ background: `${C.border}15` }}>
                      <div className="h-full rounded-sm transition-all duration-700"
                        style={{ width: barR.vis ? `${t.muslimPct * 2}%` : '0%', background: `${t.color}30`,
                          borderRight: t.muslimPct > 0 ? `2px solid ${t.color}` : 'none', transitionDelay: `${i * 40}ms` }} />
                    </div>
                    <span className="font-mono text-[9px] w-8 shrink-0" style={{ color: t.color }}>{t.muslimPct}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-sm" style={{ background: `${C.almohad}06`, border: `1px solid ${C.border}` }}>
                <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.almohad }}>Shared Heritage</p>
                {[
                  { n: 'Koutoubia Mosque', l: 'Marrakech', y: '1147–1162' },
                  { n: 'Giralda Tower', l: 'Seville', y: '1184–1198' },
                  { n: 'Hassan Tower', l: 'Rabat', y: '1195–1199' },
                  { n: 'Alcázar of Seville', l: 'Seville', y: 'Almohad+' },
                  { n: 'Alhambra', l: 'Granada', y: '1238–1390s' },
                ].map(b => (
                  <div key={b.n} className="flex items-center justify-between">
                    <span className="font-mono text-[9px]" style={{ color: C.ink }}>{b.n}</span>
                    <span className="font-mono text-[8px]" style={{ color: C.muted }}>{b.l} · {b.y}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-[900px] mx-auto px-4 md:px-10 py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Timeline · Click to expand</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {eras.map(e => (
              <span key={e.name} className="flex items-center gap-1 font-mono text-[9px]" style={{ color: e.color }}>
                <span className="w-2 h-2 rounded-full" style={{ background: e.color }} /> {e.name}
              </span>
            ))}
          </div>
          {EVENTS.map((event, i) => {
            const isNew = i === 0 || event.era !== EVENTS[i - 1].era
            return (
              <div key={`${event.year}-${i}`}>
                {isNew && (
                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px" style={{ background: `${ERA_COLORS[event.era] || C.muted}40` }} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-2" style={{ color: ERA_COLORS[event.era] || C.muted }}>{event.era}</span>
                    <div className="flex-1 h-px" style={{ background: `${ERA_COLORS[event.era] || C.muted}40` }} />
                  </div>
                )}
                <TimelineCard event={event} index={i} />
              </div>
            )
          })}
          <div className="flex justify-center mt-4"><div className="w-4 h-4 rounded-full" style={{ background: C.blood }} /></div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.almohad }}>One Dynasty, Two Continents</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The Koutoubia in Marrakech and the Giralda in Seville were built by the same Almohad
                caliphs within 30 years of each other. The Hassan Tower in Rabat was designed by the
                same architect. This was not cultural exchange — it was a single state, governed from
                Marrakech, that happened to span two continents. When we call Moroccan architecture
                &ldquo;Moorish,&rdquo; we erase the fact that Marrakech was the capital and Seville the province.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.nasrid }}>The Alhambra&apos;s Secret</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                The Alhambra was built by a dying civilisation. The Nasrids knew their kingdom was
                a vassal state on borrowed time. Yet they created the most perfect work of Islamic art
                in Europe — geometry as prayer, water as meditation. Art does not require power. Sometimes
                it requires the knowledge that power is ending.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.blood }}>The Return</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                When Granada fell, the refugees crossed to Morocco. They settled in Tétouan, Chefchaouen,
                Rabat, Fes, Essaouira. They brought Andalusi tile patterns, courtyard architecture,
                musical modes (al-Ala), and recipes. The blue paint of Chefchaouen is Andalusi. The
                pastilla of Fes is Andalusi. Morocco did not influence Spain. Morocco and Spain were
                the same place, and then they were not.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: C.border }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            The Strait of Gibraltar is 14 kilometres wide. For four centuries it was
            not a border but a corridor — armies, architects, philosophers, and refugees
            moved across it in both directions. The Almoravids crossed north with swords.
            The Moriscos crossed south with recipes. The geometry of the Alhambra and
            the geometry of the zellige in Fes are the same geometry, drawn by the
            same hands, separated only by the fiction that a strip of water can divide
            a civilisation.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.muted }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: C.muted }}>
            Almoravid dynasty: Wikipedia; Encyclopaedia Britannica; EBSCO Research Starters. Battle
            of Sagrajas (1086): Britannica. Almohad Caliphate: Wikipedia; Britannica. Las Navas de
            Tolosa (1212): Wikipedia &ldquo;Reconquista.&rdquo; Al-Andalus territorial estimates: editorial
            approximation from historical maps (The Map as History, Phersu Atlas, Wikipedia). Nasrid
            Granada and the Alhambra: Britannica; UNESCO. Fall of Granada (1492): Britannica; Wikipedia.
            Morisco expulsion (1609–14): Wikipedia. Andalusi influence on Morocco: editorial synthesis.
            Boabdil&apos;s apocryphal quote (&ldquo;Weep like a woman...&rdquo;) is traditional — not historically
            verified. Territory percentages are editorial estimates, not precise cadastral data.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.muslim }}>© Dancing with Lions</p>
        </div>
      </section>
    </div>
  )
}
