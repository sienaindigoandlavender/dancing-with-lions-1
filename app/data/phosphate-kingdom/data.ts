// ─────────────────────────────────────────────────
// The Phosphate Kingdom — Morocco's Geological Empire
// Module 052 — Industrial Intelligence
// Sources: USGS, OCP Group, Deloitte, AfDB, BC Insight
// ─────────────────────────────────────────────────

export interface MineOperations {
  id: string
  name: string
  basin: string
  coords: [number, number]
  opened: number
  reserveShare: string
  outputShare: string
  capacity: string
  note: string
  color: string
}

export const MINES: MineOperations[] = [
  {
    id: 'khouribga',
    name: 'Khouribga',
    basin: 'Ouled Abdoun Basin',
    coords: [-6.9064, 32.8861],
    opened: 1921,
    reserveShare: '43%',
    outputShare: '70%',
    capacity: '~38 Mt/yr capacity',
    note: 'OCP\'s first mine and the richest phosphate deposit on Earth. 26+ billion tonnes of reserves. Connected to Jorf Lasfar processing plant by a 235 km gravity-powered slurry pipeline — one of the world\'s longest. Produces 70% of all OCP output.',
    color: '#F59E0B',
  },
  {
    id: 'benguerir',
    name: 'Benguerir',
    basin: 'Gantour Basin',
    coords: [-7.9500, 32.1000],
    opened: 1980,
    reserveShare: '37% (shared with Youssoufia)',
    outputShare: '~15%',
    capacity: 'Open-pit mine',
    note: '70 km north of Marrakech. Also hosts Mohammed VI Polytechnic University (UM6P) Living Lab — an open research site for mining innovation. Phosphate transported by rail to Safi for processing.',
    color: '#2D5F8A',
  },
  {
    id: 'youssoufia',
    name: 'Youssoufia',
    basin: 'Gantour Basin',
    coords: [-8.5300, 32.2461],
    opened: 1931,
    reserveShare: '37% (shared with Benguerir)',
    outputShare: '~8%',
    capacity: 'Underground + open-pit',
    note: 'Morocco\'s second mine, third largest phosphate producer worldwide. Also operates the Bouchane mine 40 km away since 1998. Phosphate processed at Safi.',
    color: '#2D5F8A',
  },
  {
    id: 'boucraa',
    name: 'Boucraa',
    basin: 'Southern Provinces',
    coords: [-13.0500, 26.4000],
    opened: 1976,
    reserveShare: '2%',
    outputShare: '~2%',
    capacity: '2.6 Mt/yr',
    note: 'Operated by Phosboucraa (100% OCP subsidiary). Located in Western Sahara. Connected to Laayoune port by the world\'s longest conveyor belt — 102 km. 100% of profits reinvested in the Southern Provinces. Politically sensitive due to sovereignty dispute.',
    color: '#78716C',
  },
  {
    id: 'mzinda',
    name: 'Mzinda (Under Construction)',
    basin: 'Meskala Basin',
    coords: [-9.2000, 31.7000],
    opened: 2025,
    reserveShare: '18% (Meskala basin)',
    outputShare: 'Ramping up',
    capacity: '2.1 Mt/yr TSP (Phase 1), +2.0 Mt/yr (Phase 2, 2026)',
    note: 'OCP\'s newest integrated mining and processing site. Represents the next generation of phosphate infrastructure — built from scratch with green technology. Will exclusively produce Triple Super Phosphate (TSP).',
    color: '#5C7C3E',
  },
]

export interface ProcessingPlant {
  id: string
  name: string
  coords: [number, number]
  opened: number
  role: string
  capacity: string
  note: string
  color: string
}

export const PROCESSING: ProcessingPlant[] = [
  {
    id: 'jorf-lasfar',
    name: 'Jorf Lasfar',
    coords: [-8.6333, 33.1167],
    opened: 1986,
    role: 'Phosphoric acid, fertilizers, TSP',
    capacity: '15 Mt/yr plant nutrition + 6 Mt/yr phosphoric acid',
    note: 'The world\'s largest integrated phosphate fertilizer complex. 2,000 hectares. Over 100 fertilizer grades tailored to different soil types. Self-sufficient in energy via thermoelectric plant. Includes seawater desalination station. Connected to Khouribga by slurry pipeline.',
    color: '#F59E0B',
  },
  {
    id: 'safi',
    name: 'Safi',
    coords: [-9.2372, 32.2994],
    opened: 1965,
    role: 'Phosphoric acid, fertilizers, animal feed',
    capacity: 'Phosphoric acid + fertilizer lines',
    note: 'OCP\'s first processing complex. Receives phosphate by rail from Gantour mines (Benguerir and Youssoufia). Produces phosphoric acid, fertilizers, and animal feed additives. The original downstream operation.',
    color: '#2D5F8A',
  },
]

export interface TimelineEvent {
  year: number
  event: string
  significance: string
}

export const TIMELINE: TimelineEvent[] = [
  { year: 1920, event: 'Office Chérifien des Phosphates founded', significance: 'Created by Royal Decree under the French Protectorate. State monopoly on phosphate extraction established.' },
  { year: 1921, event: 'First mine opens at Khouribga', significance: 'Mining and export begin simultaneously. Phosphate shipped to Casablanca port by rail.' },
  { year: 1931, event: 'Youssoufia mine opens', significance: 'Second mining center established. Morocco begins scaling production.' },
  { year: 1965, event: 'Safi processing plant opens', significance: 'First downstream chemical processing. Morocco moves beyond raw rock export into phosphoric acid.' },
  { year: 1975, event: 'Phosphate sector nationalized', significance: 'Morocco takes full sovereign control. OCP becomes sole operator with exclusive extraction, processing, and export rights.' },
  { year: 1976, event: 'Boucraa mine opens', significance: 'Southern Provinces mining begins. World\'s longest conveyor belt (102 km) built to Laayoune port.' },
  { year: 1980, event: 'Benguerir mine opens', significance: 'Third major mining site. Gantour basin brought online.' },
  { year: 1986, event: 'Jorf Lasfar complex opens', significance: 'World\'s largest phosphate fertilizer processing hub begins operations. The game-changer for value-added exports.' },
  { year: 2008, event: 'OCP becomes a corporate entity', significance: 'Transitions from state agency to OCP Group S.A. Launches major modernization investments. 95% state-owned, 5% Banque Centrale Populaire.' },
  { year: 2014, event: 'Khouribga slurry pipeline launches', significance: '235 km gravity-powered pipeline to Jorf Lasfar. Saves 3 million m³ of water per year. Engineering landmark.' },
  { year: 2016, event: 'African Fertilizer Complex opens', significance: 'Dedicated production plant for African markets at Jorf Lasfar. OCP positions itself as Africa\'s fertilizer supplier.' },
  { year: 2024, event: 'Revenue reaches $9.76 billion', significance: 'Fertilizers now 69% of revenue (up from 54% in 2019). Strategic shift from raw rock to high-value products.' },
  { year: 2025, event: 'Mzinda hub construction + green hydrogen JV', significance: 'New integrated mine-to-fertilizer site. Fortescue Energy partnership for green hydrogen and ammonia. Target: 100% renewable energy by 2027.' },
]

export interface ExportDestination {
  region: string
  share: string
  keyMarkets: string
  note: string
  color: string
}

export const EXPORT_FLOWS: ExportDestination[] = [
  { region: 'Africa', share: '~35%', keyMarkets: 'Nigeria, Ethiopia, Kenya, Tanzania, Côte d\'Ivoire', note: 'OCP\'s fastest-growing market. Dedicated African Fertilizer Complex at Jorf Lasfar. 17 subsidiaries across Africa. Customized blends for African soil types.', color: '#5C7C3E' },
  { region: 'South Asia', share: '~25%', keyMarkets: 'India, Bangladesh, Pakistan', note: 'India is one of OCP\'s largest single-country markets. Phosphate rock + phosphoric acid exports. Critical for food security in the world\'s most populous region.', color: '#F59E0B' },
  { region: 'Europe', share: '~15%', keyMarkets: 'Spain, France, Turkey, Poland', note: 'Traditional market. Proximity advantage. Increasingly high-value specialty fertilizers rather than bulk rock.', color: '#2D5F8A' },
  { region: 'Latin America', share: '~15%', keyMarkets: 'Brazil, Argentina, Colombia', note: 'Brazil is one of the world\'s largest fertilizer importers. OCP expanding aggressively. Customized products for tropical soils.', color: '#7B506F' },
  { region: 'Rest of World', share: '~10%', keyMarkets: 'USA, Australia, New Zealand, Southeast Asia', note: 'Diversified export base. Boucraa exports historically served Oceania markets.', color: '#78716C' },
]

export interface GlobalRanking {
  metric: string
  value: string
  context: string
}

export const GLOBAL_POSITION: GlobalRanking[] = [
  { metric: 'Share of global reserves', value: '70%', context: '50 billion tonnes. Enough for several centuries at current extraction rates. No other country comes close.' },
  { metric: 'Production rank', value: '#2', context: '30 Mt in 2024. Behind China (110 Mt) but China\'s reserves are ~3.7 Bt — Morocco\'s are 50 Bt. The long game favors Morocco.' },
  { metric: 'Phosphoric acid market share', value: '49%', context: 'Nearly half the world\'s phosphoric acid. The most profitable segment of the value chain.' },
  { metric: 'Phosphate rock trade share', value: '~34%', context: 'Largest exporter. Competes with Jordan, which briefly passed Morocco in 2022 when OCP shifted to domestic processing.' },
  { metric: 'Fertilizer market share', value: '23%', context: 'Over 100 grades of fertilizer. Customized blends for different soil types and climates worldwide.' },
  { metric: 'Revenue (2024)', value: '$9.76B', context: 'EBITDA margin of 40%. ~20% of Morocco\'s total export revenues. 21,000 employees worldwide.' },
]

export interface ValueChainStep {
  step: string
  location: string
  detail: string
}

export const VALUE_CHAIN: ValueChainStep[] = [
  { step: 'Extraction', location: 'Khouribga, Benguerir, Youssoufia, Boucraa', detail: 'Open-pit and underground mining. Raw phosphate rock extracted from sedimentary deposits. 30 Mt produced in 2024.' },
  { step: 'Beneficiation', location: 'Mine sites', detail: 'Washing, screening, flotation. Raw rock is cleaned and concentrated to increase P₂O₅ content for processing or direct export.' },
  { step: 'Transport', location: 'Slurry pipeline (235 km) + rail + conveyor (102 km)', detail: 'Khouribga to Jorf Lasfar by gravity pipeline. Gantour to Safi by rail. Boucraa to Laayoune by the world\'s longest conveyor belt.' },
  { step: 'Chemical processing', location: 'Jorf Lasfar, Safi', detail: 'Phosphate rock + sulfuric acid → phosphoric acid. Then: phosphoric acid + ammonia → DAP/MAP/TSP fertilizers. Also: purified phosphoric acid for food, cosmetics, electronics.' },
  { step: 'Customization', location: 'Jorf Lasfar', detail: 'Over 100 fertilizer grades. Blends tailored to specific soil types, climates, and crop requirements. This is where the margin lives.' },
  { step: 'Export', location: 'Casablanca, Jorf Lasfar, Safi, Laayoune ports', detail: 'Shipped to 160+ countries. Africa, India, Brazil, Europe are primary destinations. Both bulk and bagged products.' },
]

export const HERO_STATS = [
  { value: '70%', label: 'Of world reserves' },
  { value: '$9.76B', label: 'Revenue (2024)' },
  { value: '1921', label: 'Mining since' },
  { value: '50Bt', label: 'Tonnes in the ground' },
]

export const KEY_NUMBERS = [
  { value: '50 billion', label: 'Tonnes of phosphate reserves', note: 'Enough for several centuries. No imminent shortage.' },
  { value: '30 Mt', label: 'Production (2024)', note: 'World\'s 2nd largest producer after China' },
  { value: '21,000', label: 'OCP employees worldwide', note: '17,000 in Morocco + international subsidiaries' },
  { value: '235 km', label: 'Slurry pipeline', note: 'Khouribga to Jorf Lasfar. Gravity-powered. Saves 3M m³ water/year' },
  { value: '102 km', label: 'Conveyor belt', note: 'Boucraa to Laayoune. World\'s longest.' },
  { value: '2,000 ha', label: 'Jorf Lasfar complex', note: 'World\'s largest integrated fertilizer production hub' },
  { value: '100+', label: 'Fertilizer grades', note: 'Customized for soil types across 160+ countries' },
  { value: '40%', label: 'EBITDA margin', note: '$3.93B EBITDA on $9.76B revenue (2024)' },
]
