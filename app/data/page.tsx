'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'

const MODULES = [
  { id: 'maghreb-compared', category: 'Comparative Analysis', title: 'The Maghreb Compared', entries: '3 countries', status: 'Live', description: 'Morocco, Tunisia, and Algeria side by side. Population, GDP, tourism, investment, demographics, and development indicators in one structured overview.', fields: ['Population', 'GDP', 'Tourism', 'FDI', 'Unemployment', 'HDI', 'Internet', 'Languages'], href: '/data/maghreb-compared' },
  { id: 'morocco-population', category: 'Interactive Map', title: 'Morocco Population Density', entries: '12 regions', status: 'Live', description: 'Interactive Mapbox heatmap of Morocco\'s 12 administrative regions. Population, density, urbanization rate, and area — hover for detail.', fields: ['Population', 'Density', 'Area', 'Urban %', 'Capital', 'Arabic Name'], href: '/data/morocco-population' },
  { id: 'morocco-agriculture', category: 'Illustrated Data', title: 'What Morocco Grows & Sends to the World', entries: '8 exports', status: 'Live', description: 'Illustrated agricultural and seafood export chart. Tomatoes, berries, citrus, olives, argan oil, avocados, green beans, sardines — ranked by value with hand-drawn SVG illustrations.', fields: ['Tomatoes', 'Berries', 'Citrus', 'Olives', 'Argan', 'Seafood', 'Avocados', 'Green Beans'], href: '/data/morocco-agriculture' },
  { id: 'morocco-economy', category: 'Economic Intelligence', title: 'Morocco Economy in One Page', entries: '8 indicators', status: 'Live', description: 'GDP, exports, FDI, tourism, remittances, key sectors. The essential economic snapshot every journalist grabs.', fields: ['GDP', 'Exports', 'FDI Sources', 'Tourism Revenue', 'Remittances', 'Sector Breakdown'], href: '/data/morocco-economy' },
  { id: 'al-andalus', category: 'History', title: 'Al-Andalus: When Three Nations Were One', entries: '25 milestones × 7 eras × 11 territory snapshots × 10 cities × 5 monuments', status: 'Live', description: 'From the Almoravid crossing of 1086 to the fall of Granada in 1492. Interactive SVG map of Iberia with slider showing the frontier contracting over four centuries.', fields: ['Year', 'Event', 'Dynasty', 'Territory %', 'City', 'Fall Date', 'Monument'], href: '/data/al-andalus' },
  { id: 'ramadan-moon', category: 'Cultural Intelligence', title: 'Ramadan & the Moon', entries: '30 nights + 33-year cycle', status: 'Live', description: 'How the lunar calendar shapes Ramadan. 30 moon phases from crescent to crescent, the 33-year seasonal rotation, and fasting hours across decades — visualized for Marrakech.', fields: ['Moon Phases', 'Seasonal Drift', 'Fasting Hours', 'Laylat al-Qadr', 'Temperature'], href: '/data/ramadan-moon' },
  { id: 'tourism-flow', category: 'Tourism Intelligence', title: 'Where 17.4 Million Tourists Go', entries: '10 source markets', status: 'Live', description: 'Follow the flow. Source countries → gateway airports → destination cities → spending categories. Morocco became Africa\'s most-visited nation in 2024.', fields: ['Source Countries', 'Gateways', 'Destinations', 'Revenue', 'Overnight Stays', 'Growth'], href: '/data/tourism-flow' },
  { id: 'seasonal-produce', category: 'Food Intelligence', title: 'What Grows When', entries: '32 crops', status: 'Live', description: 'Seasonal calendar of Moroccan fruits and vegetables. Radial wheel + illustrated month-by-month guide with Darija names, growing regions, and peak seasons.', fields: ['Fruits', 'Vegetables', 'Darija Names', 'Growing Regions', 'Peak Seasons', 'Categories'], href: '/data/seasonal-produce' },
  { id: 'morocco-3d-population', category: 'Demographics', title: '37.8 Million People', entries: '240+ grid cells', status: 'Live', description: 'Morocco population density as a 3D isometric bar map. Each grid cell extruded by people per square kilometre. Drag to rotate.', fields: ['Population Density', 'Grid Cells', 'City Labels', 'Density Scale', '2024 Census'], href: '/data/morocco-3d-population' },
  { id: 'world-cup-2030', category: 'Infrastructure Intelligence', title: '2030 World Cup Infrastructure Map', entries: '20 stadiums + 12 infrastructure projects', status: 'Live', description: 'Every stadium, highway, rail line, airport, and hotel project across Morocco, Spain, and Portugal. Construction status, budgets, timelines.', fields: ['Stadiums', 'Capacity', 'Construction Status', 'Budgets', 'Rail', 'Highways', 'Airports', 'Hotels'], href: '/data/world-cup-2030' },
  { id: '14km-gap', category: 'Comparative Intelligence', title: 'The 14km Gap', entries: '18 metrics compared', status: 'Live', description: 'Morocco and Spain separated by 14 kilometres of water. GDP, life expectancy, tourism, infrastructure, education — the gap between the two World Cup co-hosts.', fields: ['GDP', 'Demographics', 'Healthcare', 'Education', 'Tourism', 'Infrastructure', 'Employment'], href: '/data/14km-gap' },
  { id: 'wind-and-sun', category: 'Energy Intelligence', title: 'Wind & Sun', entries: '14 installations mapped', status: 'Live', description: 'Morocco\'s renewable energy installations mapped as radial blooms. Solar, wind, and hydro — each shape tells you when and where the energy flows. 52% renewable target by 2030.', fields: ['Solar MW', 'Wind MW', 'Hydro MW', 'Monthly Output', 'Capacity Factor', 'Seasonal Complementarity'], href: '/data/wind-and-sun' },
  { id: 'the-build', category: 'Infrastructure + Economic Timeline', title: 'The Build', entries: '27 years × 9 metrics', status: 'Live', description: 'Morocco\'s transformation from 2004 to 2030 — infrastructure AND economy. GDP tripling, FDI surging, 10,000 MW renewable energy, urbanisation in real time.', fields: ['Highway km', 'Railway km', 'Airport Capacity', 'Hotel Rooms', 'Tourist Arrivals', 'GDP $B', 'FDI $B', 'Renewable MW', 'Urbanization %'], href: '/data/the-build' },
  { id: 'medina-atlas', category: 'Cartographic Atlas', title: 'The Medina Atlas', entries: '100+ mapped features', status: 'Live', description: 'A dense SVG poster-map of Marrakech\'s medina. Every souk, mosque, fountain, hammam, gate, and craft zone plotted on a single plate. 19 gates, 18 souks, 8 mosques, 7 fountains, 16 quarters.', fields: ['Gates', 'Souks', 'Mosques', 'Fountains', 'Hammams', 'Palaces', 'Quarters', 'Craft Zones'], href: '/data/medina-atlas' },
  { id: 'calendar-of-light', category: 'Astronomical Chart', title: 'The Calendar of Light', entries: '6 cities × 12 months', status: 'Live', description: 'A radial astronomical illustration — sunrise, sunset, and daylight hours across twelve months for Morocco\'s six World Cup host cities.', fields: ['Daylight Hours', 'Sunrise', 'Sunset', 'Latitude', 'Seasonal Swing'], href: '/data/calendar-of-light' },
  { id: 'alphabet-of-craft', category: 'Illustrated Taxonomy', title: 'The Moroccan Alphabet of Craft', entries: '60 crafts × 10 categories', status: 'Live', description: 'Every major craft tradition in Morocco — zellige to rammed earth — arranged as specimens on a single illustrated plate.', fields: ['Name', 'Category', 'Region', 'Technique', 'Materials', 'Period'], href: '/data/alphabet-of-craft' },
  { id: 'dynasty-timeline', category: 'Historical Timeline', title: 'The Dynasty Timeline', entries: '7 dynasties × 1,237 years', status: 'Live', description: 'Every ruling dynasty from the Idrisids (789 AD) to the Alaouites (present) on a single horizontal timeline.', fields: ['Dynasty', 'Dates', 'Capital', 'Origin', 'Key Ruler', 'Monument', 'Legacy'], href: '/data/dynasty-timeline' },
  { id: 'languages-of-morocco', category: 'Linguistic Cartography', title: 'Languages of Morocco', entries: '12 regions × 9 languages × 5 census years', status: 'Live', description: 'Who speaks what where — choropleth map of Amazigh mother-tongue by region, three Amazigh language zones mapped, plus French, Spanish, Hassaniya overlays.', fields: ['Region', 'Amazigh %', 'Primary Variety', 'Darija %', 'Population', 'Urbanization'], href: '/data/languages-of-morocco' },
  { id: 'moroccan-calendar', category: 'Temporal Cartography', title: 'The Moroccan Calendar', entries: '4 calendars × 12 months × 30+ events', status: 'Live', description: 'Four overlapping time systems on a single radial year-wheel. Gregorian for business, Islamic lunar for religion, Amazigh agricultural for seasons, French school calendar for family life.', fields: ['Calendar System', 'Month', 'Event', 'Fixed/Shifting', 'What It Governs'], href: '/data/moroccan-calendar' },
  { id: 'spice-routes', category: 'Supply Chain Cartography', title: 'The Spice Routes', entries: '14 spices × 5 supply chain stages × 3 price points', status: 'Live', description: 'Origin → Hub → Souk → Dish → Export. Fourteen spices flowing through Morocco as coloured rivers. Price escalation from field to Paris jar.', fields: ['Spice', 'Origin', 'Volume', 'Price (Origin/Souk/Paris)', 'Season', 'Dishes'], href: '/data/spice-routes' },
  { id: 'medina-data', category: 'Urban Anatomy', title: 'The Medina as Data', entries: '18 feature types × 6 concentric zones × 20 souks × 17 gates', status: 'Live', description: 'Marrakech\'s medina as a data organism. Concentric rings from Friday mosque outward showing how Islamic urbanism organizes a city.', fields: ['Feature', 'Category', 'Count', 'Ring', 'Function', 'Note'], href: '/data/medina-data' },
  { id: 'pulse-medina', category: 'Generative Sensory Map', title: 'The Pulse of the Medina', entries: '11 craft quarters × 24 hours × 123 street threads × 5 prayer pauses', status: 'Live', description: 'Marrakech\'s medina as a living organism. Canvas-rendered pulsating street threads coloured by craft quarter and thickened by crowd density.', fields: ['Quarter', 'Craft', 'Sound', 'Peak Hour', 'Colour', 'Activity'], href: '/data/pulse-medina' },
  { id: 'world-cup-blueprint', category: 'Infrastructure Economics', title: 'Road to 2030: The World Cup Blueprint', entries: '6 sectors × 8 routes × 6 host cities × 8 projections', status: 'Live', description: 'How $41 billion reshapes Morocco\'s skeleton. Investment rivers by sector, travel time compression, GDP spillover zones.', fields: ['Sector', 'Budget', 'Route', 'Before', 'After', 'GDP Impact', 'Jobs', 'Spillover Zone'], href: '/data/world-cup-blueprint' },
  { id: 'geometry-of-culture', category: 'Mathematical Cartography', title: 'The Geometry of Culture', entries: '6 star families × 17 wallpaper groups × 5 dynasties × 12 regions × 5 Hasba steps', status: 'Live', description: 'The mathematics of Moroccan zellige. Compass-and-straightedge construction of 6- to 24-fold stars. All 17 wallpaper groups classified.', fields: ['Star Family', 'n-Fold', 'Wallpaper Group', 'Construction', 'Dynasty', 'Region', 'Innovation Index'], href: '/data/geometry-of-culture' },
  { id: 'chameleon-country', category: 'Cultural Cartography', title: 'The Chameleon Country', entries: '35 films × 6 hubs × 7 revenue years × 4 returning directors × 50+ identities', status: 'Live', description: 'Every landscape Morocco has pretended to be. 200+ productions mapped with colour palettes, GPS coordinates, budgets, and a "Look-alike Index".', fields: ['Film', 'Year', 'Director', 'Location', 'Played As', 'Budget', 'Local Revenue', 'Palette'], href: '/data/chameleon-country' },
  { id: 'argan-constellation', category: 'Sustainability & Labour', title: 'The Argan Constellation', entries: '7 extraction steps × 6 price stages × 10 forest data points × 655 cooperatives', status: 'Live', description: '20 hours of manual labour per litre. 40 kg of fruit. The circular dendrogram of argan oil extraction and the 1,225× price markup.', fields: ['Step', 'Hours', 'Price Stage', 'Value', 'Forest Coverage', 'Year', 'Cooperatives'], href: '/data/argan-constellation' },
  { id: 'demographic-atlas', category: 'Demographics', title: 'The Demographic Atlas', entries: '12 regions × 17 age bands × 10 fertility points × 7 marriage/divorce years', status: 'Live', description: '36.8 million people counted in the 2024 census. Fertility collapsed to 1.97 — below replacement. Two countries living in one census.', fields: ['Region', 'Population', 'Growth Rate', 'Urban %', 'Illiteracy', 'Fertility', 'Age Band', 'Marriage', 'Divorce'], href: '/data/demographic-atlas' },
  { id: 'solar-compass', category: 'Energy', title: 'The Solar Compass', entries: '4 phases × 24 hourly output points × 7 energy mix sources × 7 milestones', status: 'Live', description: '580 MW. 3,000 hectares. The world\'s largest concentrated solar plant, built in the Saharan foothills of Ouarzazate.', fields: ['Phase', 'Technology', 'Capacity MW', 'Storage Hours', 'GWh/yr', 'CO₂ Avoided', 'Hour', 'Direct MW', 'Stored MW'], href: '/data/solar-compass' },
  { id: 'tea-ceremony', category: 'Culinary Data Art', title: 'The Tea Ceremony Topology', entries: '6 steps × 3 glasses × 4 flavour compounds × 11 regional ratios', status: 'Live', description: 'Three glasses. One pot. Same leaves. The architecture of Moroccan hospitality dissected with live foam physics.', fields: ['Step', 'Temperature', 'Duration', 'Glass', 'Mint %', 'Sugar %', 'Tannin %', 'Caffeine %', 'City'], href: '/data/tea-ceremony' },
  { id: 'high-speed-horizon', category: 'Infrastructure', title: 'The High-Speed Horizon', entries: '14 routes × 4 eras × 9 cities × 10 milestones', status: 'Live', description: 'Morocco is shrinking. An isochrone "melting map" where cities pull together as travel time collapses across four eras.', fields: ['City From', 'City To', 'Era', 'Minutes', 'Distance km', 'HSR', 'Time Saved', '% Compression'], href: '/data/high-speed-horizon' },
  { id: 'storks-eye-view', category: 'Biodiversity & Heritage', title: 'The Stork\'s Eye View', entries: '11 nesting sites × 10 Chellah nests × 8 flyway points × 5 census years', status: 'Live', description: 'Ciconia ciconia. Where ruins rise, nests follow. White storks on Moroccan monuments mapped as a vintage field journal.', fields: ['Site', 'City', 'Nests', 'Elevation', 'Type', 'Season', 'Nest ID', 'Flyway Point'], href: '/data/storks-eye-view' },
  { id: 'shadow-moucharabieh', category: 'Climate Art', title: 'The Shadow of the Moucharabieh', entries: '3 cities × 12 months × 24 hours × 5 stress levels × 4 decades', status: 'Live', description: 'Heat made visible. A 24-hour radial chart pulsing with thermal stress across Marrakech, Fes, and Ouarzazate. Plus a 40-year warming trend.', fields: ['City', 'Month', 'Hour', 'Temperature °C', 'Stress Level', 'Cooling Method', 'Decade', 'Anomaly °C'], href: '/data/shadow-moucharabieh' },
  { id: 'timeline-of-morocco', category: 'History', title: 'Timeline of Morocco', entries: '45 milestones × 14 eras × 315,000 years', status: 'Live', description: 'From the oldest Homo sapiens fossils (Jebel Irhoud, 315,000 BCE) to the 2030 World Cup. A vertical interactive timeline.', fields: ['Year', 'Event', 'Era', 'Dynasty', 'Detail', 'Landmark'], href: '/data/timeline-of-morocco' },
  { id: 'digital-zellige', category: 'The New Craft Economy', title: 'Digital Zellige', entries: '120 mosaic tiles × 7 product categories × 8 destinations × 7 years', status: 'Live', description: 'MAD 1.23 billion in handicraft exports, visualised as a generative zellige mosaic. 120 tiles coloured by destination country.', fields: ['Product', 'Share %', 'Growth %', 'Destination', 'Country Share', 'Year', 'MAD Value'], href: '/data/digital-zellige' },
  { id: 'roma-africana', category: 'History', title: 'Roma Africana: The Romans in Africa', entries: '25 milestones × 9 eras × 6 provinces × 12 major sites', status: 'Live', description: '844 years of Roman rule across North Africa. Interactive SVG map of six provinces from Morocco to Libya with 12 ruins and 25 timeline events.', fields: ['Province', 'Capital', 'Modern Country', 'Area', 'Established', 'Site', 'UNESCO', 'Year', 'Era'], href: '/data/roma-africana' },
  { id: 'the-long-rise', category: 'Tourism', title: 'The Long Rise', entries: '26 years × arrivals × revenue × events', status: 'Live', description: 'Morocco\'s tourism arrivals from 2000 to 2025. An animated line that draws itself year by year — 4.28M to 20M. The COVID cliff. The World Cup bounce.', fields: ['Year', 'Arrivals (M)', 'Revenue ($B)', 'YoY Change', 'Event'], href: '/data/the-long-rise' },
  { id: 'the-nomad-pulse', category: 'Remote Work', title: 'The Nomad Pulse', entries: '6 time zones × 5 nomad hubs × 8 towers × 6 co-living spaces', status: 'Live', description: 'Morocco\'s remote work geography. Clock-face time zone dashboard, Voronoi 5G tower map, five nomad hubs with Wi-Fi speeds and cost breakdowns.', fields: ['City', 'Time Zone', 'Working Hours', 'Wi-Fi Speed', 'Cost/Month', 'Co-living', '5G Coverage'], href: '/data/the-nomad-pulse' },
  { id: 'four-peaks', category: 'Geography', title: 'Four Peaks', entries: '4 mountains × 12 metrics × ecosystems × geology', status: 'Live', description: 'Jbel Toubkal, Jbel Saghro, Kilimanjaro, and Everest drawn to the same vertical scale. SVG elevation profile with snow lines, basecamps, and death zone.', fields: ['Mountain', 'Elevation', 'Prominence', 'Range', 'Trek Days', 'Difficulty', 'Success Rate', 'Ecosystem'], href: '/data/four-peaks' },
  { id: 'the-empty-quarter', category: 'Geography', title: 'The Empty Quarter', entries: '11 countries × 5 terrain types × 5 peoples × 10 species', status: 'Live', description: 'The Sahara as ecosystem. 9.2 million km² mapped across 11 countries. Five terrain types, five peoples, 10 key species, the Green Sahara cycle.', fields: ['Country', 'Desert %', 'Desert Area', 'Terrain Type', 'People', 'Species', 'Climate', 'Geology'], href: '/data/the-empty-quarter' },
  { id: 'the-free-people', category: 'Cultural Intelligence', title: 'The Free People — Imazighen', entries: '8 Moroccan confederations × 10 African countries × 10 languages × 21 timeline moments', status: 'Live', description: 'Part 1: Morocco\'s tribal confederations — Aït Atta, Aït Yafelman, Masmuda, Sanhaja, Zenata, Riffians, Ishilhayen, Central Atlas Imazighen. Five fifths, annual rotation democracy, Battle of Bougafer. 2024 census: 24.8% vs 85% (contested). Part 2: Across Africa — ten countries from Morocco to Egypt, Kabyles to Tuareg. 30–40 million people, 40 languages, 12,000 years. Tifinagh to Tamasheq. The maps forgot.', fields: ['Confederation', 'Tribe', 'Language', 'Region', 'Population', 'Sub-groups', 'Timeline', 'Official Status'], href: '/data/the-free-people' },
  { id: 'wildlife-atlas', category: 'Natural History', title: 'The Wildlife Atlas', entries: '18 featured species × 8 endangered × 5 extinct × 8 national parks', status: 'Live', description: 'Morocco\'s 40 ecosystems and 118 mammal species — from the ghost of the Barbary lion to the last northern bald ibis colony. Endangered species tracker, national parks mapped, and the stories of what was lost: Atlas bear, Bubal hartebeest, North African elephant. What still holds on: Barbary macaque, Mediterranean monk seal, Barbary leopard.', fields: ['Species', 'IUCN Status', 'Population', 'Habitat', 'Threats', 'National Park', 'Last Sighting'], href: '/data/wildlife-atlas' },
  { id: 'colour-index', category: 'Cultural Intelligence', title: 'The Colour Index', entries: '24 colours × 6 categories × mineral sources × chemistry', status: 'Live', description: 'Morocco\'s chromatic DNA — a Pantone book for a country. Each colour mapped to its mineral pigment source, where it appears, what it means, and the chemistry that makes it. From the iron oxide of Marrakech\'s ramparts to the indigo of Tuareg turbans, from the cobalt of Fes zellige to the saffron of Taliouine. Geology, exile, and craft — the three forces that painted a nation.', fields: ['Hex', 'Pantone', 'Pigment Source', 'Chemistry', 'Where', 'Meaning', 'Category'], href: '/data/colour-index' },
  { id: 'water-equation', category: 'Resource Intelligence', title: 'The Water Equation', entries: '153 dams × 9 basins × 5 aquifers × 17 desalination plants', status: 'Live', description: 'Morocco\'s water crisis in one page. 153 large dams holding 20 billion m³ of capacity — but only 28% full at the 2024 low. Seven consecutive drought years. Aquifers dropping 2 metres per year. The $45 billion National Water Plan. 17 desalination plants operational, Casablanca mega-plant under construction. The race between depletion and infrastructure.', fields: ['Dam Capacity', 'Fill Rate', 'Basin', 'Aquifer Depletion', 'Desalination Capacity', 'Year', 'Status'], href: '/data/water-equation' },
  { id: 'who-is-the-goat', category: 'Comparative Intelligence', title: 'Who Is the GOAT?', entries: '2 travellers × 47 route points × 10 scoring categories × 23 timeline events', status: 'Live', description: 'Marco Polo vs Ibn Battuta — settled by data. 24,000 km vs 117,000 km. 16 countries vs 44. One book inspired Columbus. The other was nearly lost. Dual Mapbox routes, side-by-side biography, comparative bars, dual timeline, and a 10-category scorecard that renders the verdict history wouldn\'t.', fields: ['Distance', 'Duration', 'Countries', 'Route', 'Year', 'Score', 'Category'], href: '/data/who-is-the-goat' },
  { id: 'scent-atlas', category: 'Sensory Intelligence', title: 'The Scent Atlas', entries: '16 scents × 7 categories × 12-month intensity × chemistry × source', status: 'Live', description: 'Morocco\'s olfactory geography — the invisible layer of the country. 16 scents mapped to source, region, season, and chemistry. Damask rose in the Dades Valley (April–May). Atlas cedar in Ifrane. Tannery leather in Fes. Saffron in Taliouine. Each rendered as a radial bloom — a polar chart showing intensity across 12 months.', fields: ['Name', 'Region', 'Category', 'Season', 'Peak', 'Chemistry', 'Source'], href: '/data/scent-atlas' },
  { id: 'marriage-economy', category: 'Social Economy', title: 'The Marriage Economy', entries: '10 budget categories × 10 regions × 5 ethnic traditions × 14 supply chain items × 7 bridal outfits', status: 'Live', description: 'What a Moroccan wedding costs by region. The treemap of where 150,000 MAD goes. The gift economy — mahr, gold, silver by ethnic tradition. The supply chain: caftans from Fes, silver from Tiznit, lamb from the butcher. Seven outfit changes in one night.', fields: ['Category', 'Region', 'Cost', 'Tradition', 'Source', 'Share'], href: '/data/marriage-economy' },
  { id: 'weather-portraits', category: 'Climate Intelligence', title: 'Weather Portraits', entries: '8 cities × 12 months × 6 climate zones × 8 national extremes', status: 'Live', description: 'Eight cities, twelve months, one country that holds both Africa\'s coldest recorded temperature (−23.9°C, Ifrane) and some of its hottest (49.6°C, Marrakech). Radial temperature halos, rainfall bars, sunshine sparklines, record extremes. Six climate zones in 1,000km. A 73.5°C swing contained in a single nation.', fields: ['City', 'Temperature', 'Rainfall', 'Sunshine Hours', 'Record High', 'Record Low', 'Climate Zone', 'Köppen'], href: '/data/weather-portraits' },
  { id: 'darija', category: 'Language', title: 'Darija Structured Lexicon', entries: '8,640+', status: 'Live', description: 'The most comprehensive structured Moroccan Arabic dataset. Each entry: Arabic root, Amazigh substrate, French overlay, regional variations, cultural context.', fields: ['Word', 'Translation', 'Arabic Root', 'Category', 'Cultural Context', 'Regional Variant', 'Example Sentence'] },
  { id: 'textiles', category: 'Ethnographic Archive', title: 'North & West African Textiles', entries: '88+', status: 'Live', description: 'Source-documented textile traditions. Each story includes technique, region, motif lineage, spiritual significance, and practitioner documentation.', fields: ['Tradition', 'Region', 'Technique', 'Materials', 'Motif Lineage', 'Source Type', 'Practitioner'] },
  { id: 'cultural', category: 'Cultural Documentation', title: 'Morocco Cultural Index', entries: '97+', status: 'Live', description: 'Deep cultural documentation — architecture, music, food systems, craft traditions, seasonal practices. Each entry with academic citations.', fields: ['Topic', 'Region', 'Category', 'Sources', 'Date Verified', 'Related Entries'] },
  { id: 'real-estate', category: 'Market Intelligence', title: 'Moroccan Property Investment Tracker', entries: '—', status: 'Coming Q2 2026', description: 'Foreign direct investment flows, pricing trends by city, regulatory framework mapping, developer activity, and market condition indicators.', fields: ['City', 'Property Type', 'Price/m²', 'YoY Change', 'Foreign Investment %', 'Regulatory Status'] },
  { id: 'demographics-future', category: 'Population Data', title: 'Maghreb Demographics', entries: '—', status: 'Coming Q2 2026', description: 'Population distribution, urbanization rates, youth demographics, migration patterns, and diaspora mapping across Morocco, Tunisia, and Algeria.', fields: ['Region', 'Population', 'Urban %', 'Median Age', 'Growth Rate', 'Diaspora Size'] },
  { id: 'tourism-future', category: 'Tourism Intelligence', title: 'Visitor Flow Analysis', entries: '—', status: 'Coming Q3 2026', description: 'Arrival data, seasonal patterns, spending analysis by source market, accommodation trends, and destination-level intelligence.', fields: ['Source Market', 'Arrivals', 'Avg Stay', 'Spend/Day', 'Destination', 'Season'] },
]

const PER_PAGE = 12

export default function DataPage() {
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState<'all' | 'live' | 'coming'>('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let items = MODULES
    if (filter === 'live') items = items.filter(m => m.status === 'Live')
    if (filter === 'coming') items = items.filter(m => m.status !== 'Live')
    if (search.trim()) {
      const q = search.toLowerCase()
      const qAlt = q.replace('color', 'colour').replace('colour', 'color') // handle both spellings
      items = items.filter(m => {
        const blob = `${m.id} ${m.title} ${m.category} ${m.description} ${m.fields.join(' ')}`.toLowerCase()
        return blob.includes(q) || blob.includes(qAlt)
      })
    }
    return items
  }, [filter, search])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const safePage = Math.min(page, Math.max(0, totalPages - 1))
  const visible = filtered.slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE)

  const liveCount = MODULES.filter(m => m.status === 'Live').length
  const comingCount = MODULES.filter(m => m.status !== 'Live').length

  return (
    <div className="pt-16">
      <section className="max-w-wide mx-auto px-6 md:px-10 pt-section pb-10">
        <p className="micro-label mb-4">Data Modules</p>
        <h1 className="font-serif text-[clamp(3rem,8vw,5rem)] text-dwl-black leading-[0.95]">
          The <em>Intelligence</em>
        </h1>
        <p className="text-body text-dwl-body mt-6 max-w-[580px]">
          Structured, current, machine-readable data about Morocco and the Maghreb.
          Each module is built for analysts, researchers, AI systems, and decision-makers
          who need depth, not summaries.
        </p>
      </section>

      {/* ─── FILTER + SEARCH BAR ─── */}
      <div className="max-w-wide mx-auto px-6 md:px-10">
        <div className="border-t border-dwl-border pt-5 pb-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            {([
              { key: 'all' as const, label: `All (${MODULES.length})` },
              { key: 'live' as const, label: `Live (${liveCount})` },
              { key: 'coming' as const, label: `Coming (${comingCount})` },
            ]).map(f => (
              <button key={f.key}
                onClick={() => { setFilter(f.key); setPage(0); setSearch('') }}
                className="text-[11px] uppercase tracking-[0.08em] font-medium px-3 py-1.5 transition-colors"
                style={{
                  background: filter === f.key ? '#0a0a0a' : 'transparent',
                  color: filter === f.key ? '#fff' : '#737373',
                }}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-[200px] max-w-[360px] ml-auto relative">
            <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5" fill="none" stroke="#737373" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(0) }}
              placeholder="Search modules..."
              className="w-full text-[13px] pl-6 pr-3 py-1.5 bg-transparent outline-none border-b border-dwl-border focus:border-dwl-black transition-colors"
              style={{ color: '#0a0a0a' }}
            />
          </div>
        </div>
      </div>

      {/* ─── TOP PAGINATION ─── */}
      {totalPages > 1 && (
        <div className="max-w-wide mx-auto px-6 md:px-10 pt-8">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-dwl-muted">
              Showing {safePage * PER_PAGE + 1}–{Math.min((safePage + 1) * PER_PAGE, filtered.length)} of {filtered.length} modules
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i}
                  onClick={() => setPage(i)}
                  className="w-7 h-7 text-[11px] font-medium transition-colors"
                  style={{
                    background: i === safePage ? '#0a0a0a' : 'transparent',
                    color: i === safePage ? '#fff' : '#737373',
                  }}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── MODULE LIST ─── */}
      <section className="max-w-wide mx-auto px-6 md:px-10 py-section">
        {visible.length === 0 && (
          <p className="text-[15px] text-dwl-muted py-16 text-center">No modules match your search.</p>
        )}
        {visible.map((mod) => {
          const globalIdx = MODULES.indexOf(mod)
          return (
            <div key={mod.id} className="border-b border-dwl-border py-10 md:py-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-3">
                  <span className="text-[11px] text-dwl-muted font-medium tabular-nums">
                    {String(globalIdx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-meta uppercase tracking-[0.08em] text-dwl-gray mt-2">{mod.category}</p>
                  <div className="mt-3">
                    <span className={`text-[11px] uppercase tracking-[0.08em] font-medium px-3 py-1 inline-block ${
                      mod.status === 'Live' ? 'bg-dwl-black text-white' : 'bg-dwl-light text-dwl-gray'
                    }`}>
                      {mod.status}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-9">
                  <div className="flex items-baseline gap-4 mb-4">
                    {'href' in mod && mod.href ? (
                      <Link href={mod.href} className="font-serif text-[30px] md:text-[36px] text-dwl-black leading-[1.1] hover:opacity-60 transition-opacity">
                        {mod.title}
                      </Link>
                    ) : (
                      <h2 className="font-serif text-[30px] md:text-[36px] text-dwl-black leading-[1.1]">
                        {mod.title}
                      </h2>
                    )}
                    {mod.entries !== '—' && (
                      <span className="font-serif text-[30px] md:text-[36px] text-dwl-muted italic hidden md:inline">
                        {mod.entries}
                      </span>
                    )}
                  </div>
                  <p className="text-[16px] text-dwl-gray leading-relaxed max-w-[580px] mb-6">
                    {mod.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mod.fields.map((field) => (
                      <span key={field}
                        className="text-[11px] uppercase tracking-[0.06em] text-dwl-muted border border-dwl-border px-3 py-1">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* ─── PAGINATION ─── */}
      {totalPages > 1 && (
        <div className="max-w-wide mx-auto px-6 md:px-10 pb-12">
          <div className="border-t border-dwl-border pt-6 flex items-center justify-between">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={safePage === 0}
              className="text-[12px] uppercase tracking-[0.08em] font-medium px-4 py-2 border border-dwl-border hover:bg-dwl-black hover:text-white transition-colors disabled:opacity-20 disabled:pointer-events-none">
              ← Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i}
                  onClick={() => setPage(i)}
                  className="w-8 h-8 text-[12px] font-medium transition-colors"
                  style={{
                    background: i === safePage ? '#0a0a0a' : 'transparent',
                    color: i === safePage ? '#fff' : '#737373',
                  }}>
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={safePage >= totalPages - 1}
              className="text-[12px] uppercase tracking-[0.08em] font-medium px-4 py-2 border border-dwl-border hover:bg-dwl-black hover:text-white transition-colors disabled:opacity-20 disabled:pointer-events-none">
              Next →
            </button>
          </div>
          <p className="text-[11px] text-dwl-muted mt-3 text-center">
            Showing {safePage * PER_PAGE + 1}–{Math.min((safePage + 1) * PER_PAGE, filtered.length)} of {filtered.length} modules
          </p>
        </div>
      )}

    </div>
  )
}
