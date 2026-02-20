// ─────────────────────────────────────────────────
// The Gardens of Morocco
// Module 084 — Landscape & Water Intelligence
// ─────────────────────────────────────────────────

export interface Garden {
  id: string
  name: string
  arabic: string
  city: string
  founded: string
  founder: string
  area: string
  type: string
  unescoYear: string | null
  description: string
  water: string
  plants: string
  architecture: string
  history: string[]
  keyFact: string
  visitors: string
}

export const GARDENS: Garden[] = [
  {
    id: 'agdal',
    name: 'Agdal Gardens',
    arabic: 'حدائق الأكدال',
    city: 'Marrakech',
    founded: 'c. 1157 (Almohad, expanded under Abu Ya\'qub Yusuf from 1163)',
    founder: 'Almohad Caliph Abd al-Mu\'min, expanded by Abu Ya\'qub Yusuf. Engineer: Ahmad ibn Muhammad ibn Milhan (Andalusi-Berber origin)',
    area: '500 hectares — almost the size of the city itself when built',
    type: 'Royal productive orchard & pleasure garden',
    unescoYear: '1985',
    description: 'Royal agricultural estate. 500 hectares — almost the size of the city itself when built. The Almohad vision: a city should equal its gardens in size. The combined surface of the Agdal and Menara equalled the Almohad capital.',
    water: 'Khettara system: 45km underground channel network drawing from the High Atlas water table (Ourika River basin). Two massive reservoirs: Dar al-Hana (208 × 181m, capacity 83,000 m³, rammed earth with lime and gravel) and al-Gharsiyya (with a 16m square island and pavilion at centre). Water redistributed via gravity-fed ditches. A modern khettara was dug in 1932–33 but still insufficient for the growing city.',
    plants: '3,000+ ancient olive trees in a perfect geometric checkerboard (10m grid). Orchards of orange, lemon, pomegranate, fig, apricot, peach, almond, walnut, date palm, elderberry, myrtle, cypress. Each sub-garden cultivates a single species — strict Hispano-Mauresque rationalism. Paths lined with single rows of olive trees at 10m intervals. Vine cultivation (wine historically consumed at some royal festivities despite taboo).',
    architecture: 'Dar al-Hana — palatial pavilion on the south side of the largest reservoir. North gate integrated into an observation pavilion (menzeh) rising above. Dar el-Beida — modest palace still used by the Alaouite royal family when in residence. The entire estate is enclosed by high walls. "Agdal" is Berber for "meadow enclosed by a stone wall."',
    history: [
      'c. 1157: Founded by Almohad Caliph Abd al-Mu\'min alongside the Menara',
      '1163–1184: Expanded by Abu Ya\'qub Yusuf, who built the largest reservoir (model for basins in Rabat and Seville)',
      'Late 12th C: Ya\'qub al-Mansur builds the Kasbah and connects it to the gardens',
      '13th C: Decline after Almohad fall; Marinids move capital to Fez',
      '16th C: Saadian restoration when Marrakech becomes capital again',
      '19th C: Major restoration under Alaouite sultans Moulay Abd ar-Rahman and Muhammad IV',
      '1932–33: Modern khettara dug to supplement ancient system',
      '1985: UNESCO World Heritage Site (with Medina and Menara)',
    ],
    keyFact: 'Legend says Almohad soldiers practised swimming in the great reservoir before crossing the Mediterranean to conquer Andalusia.',
    visitors: 'Royal property. Open to public on Fridays and Sundays (when king is not in residence). Far fewer tourists than Majorelle or Menara.',
  },
  {
    id: 'menara',
    name: 'Menara Gardens',
    arabic: 'حدائق المنارة',
    city: 'Marrakech',
    founded: 'c. 1157 (Almohad)',
    founder: 'Almohad Caliph Abd al-Mu\'min. Execution by Haji Ibn Yaish, scientist and legislator of the empire',
    area: '~100 hectares of olive groves',
    type: 'Royal orchard, pleasure garden & hydraulic infrastructure',
    unescoYear: '1985',
    description: 'The iconic image of Marrakech: a green-roofed Saadian pavilion reflected in a vast water basin, framed by the snow-capped Atlas Mountains behind. Military, utilitarian, and ornamental: orchard, reservoir, and retreat.',
    water: 'Central reservoir: 195m × 160m, built entirely above ground to allow gravity-fed irrigation without pumping. Supplied by long-distance khettara channels from an Atlas aquifer. Complex underground network distributes water evenly through the orchards. The reservoir also accumulated water for year-round supply, including winter when rivers ran dry.',
    plants: 'Predominantly olive trees, with some fruit trees and cypress. Planted in a regular 10m grid. During periods of neglect, the orchards were prone to desertification — the gardens required constant water system maintenance to survive.',
    architecture: 'The iconic pavilion (menzeh): originally built by the Saadian dynasty (16th C), current structure completed in 1870 under Sultan Muhammad IV. Green pyramidal roof, horseshoe arches, zellige decoration. Hispano-Moorish jewel. The pavilion rises above the reservoir\'s edge; from its balcony terrace, panoramic views across the garden and city. The name "Menara" (first documented 1579) may refer to this pavilion/lantern.',
    history: [
      'c. 1157: Created by Abd al-Mu\'min west of the city, aligned with Bab al-Makhzen gate',
      'Originally part of a vast estate enclosed by a 6-mile wall (now gone)',
      '13th C: Decline after Almohad fall',
      '16th C: Saadian dynasty builds the first pleasure pavilion overlooking the reservoir',
      '1822–1873: Major restoration under Alaouite sultans Moulay Abd ar-Rahman and Muhammad IV',
      '1870: Current pavilion completed on ruins of the Saadian original',
      '1985: UNESCO World Heritage Site (with Medina and Agdal)',
    ],
    keyFact: '17th C legend: Sultan Moulay Ismail, "the executioner of hearts," drowned his romantic conquests by throwing them from the pavilion balcony into the lake.',
    visitors: 'Open daily, free garden entry (20 MAD for pavilion). Popular with locals for picnics, joggers, and lovers. Sunset and early morning are best. Snow-capped Atlas backdrop best from November to April.',
  },
  {
    id: 'majorelle',
    name: 'Jardin Majorelle',
    arabic: 'حديقة ماجوريل',
    city: 'Marrakech',
    founded: '1923 (planted over 40 years)',
    founder: 'Jacques Majorelle (1886–1962), French Orientalist painter. Son of Louis Majorelle, Art Nouveau cabinet-maker of Nancy',
    area: '1 hectare (2.5 acres) — intimate by Moroccan garden standards',
    type: 'Botanical garden, artist\'s landscape, museum complex',
    unescoYear: null,
    description: '300 plant species from five continents. A Cubist villa in trademarked cobalt blue. ~900,000 visitors/year — Morocco\'s most visited attraction. Created by a French painter, saved by a French couturier.',
    water: 'Marble pools and channels in the Hispano-Moorish tradition. Central long pool structured around the main axis. Fountains, cascading water features, lily ponds. Refined irrigation systems installed during the YSL/Bergé restoration. Madison Cox (landscape designer) later replaced ground cover with rose-coloured gravel echoing Marrakech\'s dominant colour.',
    plants: '300+ species from five continents. Cacti and succulents (major collection), bamboo, bougainvillea, banana trees, coconut palms, jasmine, water lilies, yuccas. Jacques Majorelle collected specimens over decades of globetrotting. Recent additions include succulents native to Morocco, introduced by designer Madison Cox for environmental sustainability.',
    architecture: 'Cubist villa designed by architect Paul Sinoir (1931). Majorelle\'s studio on ground floor, living quarters above. "Majorelle Blue" (bleu Majorelle, #6050DC) — cobalt inspired by Moroccan tiles and Tuareg blue veils. First applied 1937, trademarked. Villa now houses the Berber Museum (600+ artefacts, inaugurated by King Mohammed VI). Musée Yves Saint Laurent (2017) next door.',
    history: [
      '1917: Jacques Majorelle arrives in Morocco, settles in Marrakech',
      '1923: Purchases palm grove plot, begins planting',
      '1931: Paul Sinoir designs the Art Deco studio',
      '1937: Creates and applies Majorelle Blue to buildings',
      '1947: Garden opened to public',
      '1950s: Divorce from Andrée Longueville forces sale',
      '1962: Majorelle dies in Paris. Garden falls into neglect',
      '1966: YSL and Bergé first visit Marrakech, discover the garden',
      '1980: YSL and Bergé purchase the garden, save it from hotel developers',
      '2008: Yves Saint Laurent dies. Ashes scattered in the garden. Memorial column placed',
      '2010: Property donated to Fondation Pierre Bergé – Yves Saint Laurent',
      '2011: Berber Museum opens in the villa',
      '2017: Musée Yves Saint Laurent opens next door. Pierre Bergé dies in September',
      '2018: Garden expanded with new section for visitor capacity',
    ],
    keyFact: 'The hex code for Majorelle Blue is #6050DC. Saint Laurent said of Marrakech: "This city deeply influenced my discovery of colour."',
    visitors: '~900,000/year. Morocco\'s most visited attraction. Book tickets online (no onsite sales). Best: before 10am or late afternoon for light. Closed sections for Villa Oasis open Fri–Mon.',
  },
  {
    id: 'jnan-sbil',
    name: 'Jnan Sbil Gardens',
    arabic: 'جنان السبيل',
    city: 'Fez',
    founded: '18th century (Sultan Moulay Abdallah)',
    founder: 'Sultan Moulay Abdallah (Alaouite dynasty). Opened to public under Sultan Moulay Hassan I (late 19th C). Underground passage to Royal Palace.',
    area: '7.5 hectares',
    type: 'Royal garden turned public park. Arab-Andalusian tradition',
    unescoYear: null,
    description: '"Jnan" from "jannah" — Arabic for both "garden" and "paradise." Located between Fes el-Jdid and Fes el-Bali. Originally royal-only, connected to the palace by underground tunnel. Opened to public 1917.',
    water: 'Fed by the Oued Fes (Oued el-Jawahir) river and historic water channels that supplied the old city. Ancient seguias (irrigation ditches), canals, distributors, mills, and two historic norias (water wheels) — one in the east garden, one larger on the western edge. The river also powered nearby craft workshops. Colourful zellige-tiled fountains (blue, green, yellow) along main axes and in alcoves. Large pool in southern section with a palm-tree island.',
    plants: '3,000+ species. Themed sub-gardens: Andalusian, Mexican, Bamboo, Fragrance (southeast, created during 2010 restoration). Giant bamboos, Washingtonia palms, pine, eucalyptus, weeping willows, orange groves, date palms. Trees over 100 years old. Central tree-lined mall.',
    architecture: 'Arab-Andalusian design: symmetrical pathways, enclosed green spaces, geometric zellige fountains, rammed earth walls. Bordered by the ramparts of Fes el-Jdid and the 16th-century Saadian bastion Borj Sheikh Ahmed. Moorish courtyard-like divisions. The geometric Rub-el-Hizb-shaped fountains are particularly distinctive.',
    history: [
      '18th C: Commissioned by Sultan Moulay Abdallah as royal domain',
      '19th C: Moulay Hassan I builds walls connecting Fes el-Jdid to Fes el-Bali; gardens placed inside corridor; summer palaces built (Dar el-Beida)',
      '1917: Opened to public (previously royal-only, accessed via underground passage from palace)',
      'Mid-20th C: Falls into neglect and decline',
      '2006: Rehabilitation launched by Princess Lalla Hasnaa / Mohammed VI Foundation for Environmental Protection',
      '2010: Four-year restoration completed. Heirloom plants, hydraulic systems, fountains, norias, bamboo garden, Washington palms alley all restored. Fragrance garden created',
      '2011: Officially reopened',
    ],
    keyFact: '"Jnan" from "jannah" — the Arabic word for both "garden" and "paradise." The Qur\'anic image of paradise: flowing water, shaded groves, green oases. Every Moroccan garden is an earthly foretaste of Jannat al-Firdaws.',
    visitors: 'Open daily except Mondays, 8:30am–7:30pm. Free admission. Venue for the annual World Sacred Music Festival. Locals picnic under the trees. Far less touristy than Marrakech\'s gardens.',
  },
]

export interface DesignPrinciple {
  name: string
  arabic: string
  description: string
  examples: string
}

export const ISLAMIC_GARDEN_PRINCIPLES: DesignPrinciple[] = [
  { name: 'Chahar Bagh (Four-Fold Garden)', arabic: 'چهارباغ', description: 'Garden divided into four quadrants by water channels intersecting at a central fountain or pavilion. From Qur\'anic descriptions of paradise with four rivers (water, milk, wine, honey). Persian origin, transmitted through the caliphates to the Maghreb via Al-Andalus.', examples: 'Le Jardin Secret (Marrakech). The Alhambra\'s Generalife and Court of the Lions. The Taj Mahal gardens.' },
  { name: 'Water as Sacred Element', arabic: 'الماء', description: '"We made from water every living thing" (Qur\'an 21:30). In Marrakech — gateway to the Sahara — water is sacred luxury. Every village centres on a fountain for ablutions. In the garden, water is channelled, displayed, heard. Pools reflect sky and architecture.', examples: 'Menara\'s reflecting pool. Agdal\'s 83,000 m³ reservoir. Majorelle\'s marble channels. Jnan Sbil\'s zellige fountains.' },
  { name: 'Enclosure (Hortus Conclusus)', arabic: 'الجنان المسوّر', description: 'Walled garden. "Agdal" means "meadow enclosed by a stone wall" in Berber. Chaos outside, order within. The wall also provides shade, thermal regulation, and wind protection in arid climates.', examples: 'Agdal\'s massive enclosing walls. Jnan Sbil between the ramparts. Riad courtyard gardens throughout the medinas.' },
  { name: 'Geometry & Order', arabic: 'الهندسة', description: 'Strict geometric organisation. Trees planted in grids (typically 10m). Paths intersect at right angles. Sub-gardens rectangular. Each plot cultivates one species. The Hispano-Mauresque "productive garden" tradition: rationalism serving both beauty and agriculture.', examples: 'Agdal\'s 3,000 olive trees in geometric checkerboard. Menara\'s 10m grid orchards. Jnan Sbil\'s symmetrical pathways.' },
  { name: 'Shade & Sensory Experience', arabic: 'الظل والحواس', description: 'Gardens engage all senses: sight (geometry, colour, reflected light), sound (flowing water, birdsong), smell (jasmine, orange blossom), touch (cool air, stone, water), taste (orchard fruit). Shade is as designed as sunlight. Canopy layers: tall palms above, fruit trees in middle, ground cover below.', examples: 'Majorelle\'s chromatic intensity. Jnan Sbil\'s fragrance garden. Agdal\'s layered orchards producing fruit for the royal table.' },
  { name: 'Productive Beauty', arabic: 'الجمال المنتج', description: 'No contradiction between beauty and productivity. Orchards are gardens. Agriculture is art. The Almohad vision was strategic: food self-sufficiency through engineering. The reservoir irrigates the orchard which feeds the city.', examples: 'Agdal\'s 500-hectare working orchard. Menara\'s olive groves still producing. The Palmeraie\'s three-tier oasis agriculture (palm canopy, citrus middle layer, ground crops).' },
]

export interface WaterSystem {
  name: string
  arabic: string
  description: string
  engineering: string
}

export const WATER_SYSTEMS: WaterSystem[] = [
  { name: 'Khettara', arabic: 'خطارة', description: 'Underground gravity-flow channels that bring water from the High Atlas aquifers to the city. Morocco\'s version of the Persian qanat. Tunnels dug at a steady gradient — no pumping required. The Agdal\'s khettara network stretches 45 kilometres from the Atlas water table.', engineering: 'Vertical shafts dug at intervals for access and ventilation. Water flows by gravity along a gentle slope. The system is entirely passive — no external energy source. Some khettaras in Morocco are over 1,000 years old. The Almoravids built the first in Marrakech (early 12th C). The Almohads expanded and systematised them.' },
  { name: 'Seguia', arabic: 'ساقية', description: 'Surface irrigation channels distributing water from reservoirs to orchards. In Fez, seguias from the Oued Fes powered craft workshops and irrigated gardens simultaneously.', engineering: 'Open or partially covered channels, lined with stone or rammed earth. Flow regulated by gates and sluices. Distribution follows communal calendars — traditional water-sharing systems respected by all communities.' },
  { name: 'Noria', arabic: 'ناعورة', description: 'Water wheels that lift water from rivers to higher channels. Jnan Sbil has two historic norias. The wheels are powered by the river current — no external energy. Ancient technology imported from the Levant and adapted across North Africa.', engineering: 'Wooden or metal wheel with buckets/scoops. The river turns the wheel; buckets fill at the bottom, empty at the top into an aqueduct. The restored noria at Jnan Sbil is a major heritage feature of the garden.' },
  { name: 'Sahrij (Reservoir)', arabic: 'صهريج', description: 'Massive above-ground water basins that store water for year-round irrigation. Built above ground level so gravity distributes water without pumping. The Menara\'s basin: 195 × 160m. Agdal\'s Dar al-Hana basin: 208 × 181m, capacity 83,000 m³.', engineering: 'Constructed from rammed earth mixed with lime and gravel. Watertight through the tamped earth technique. The above-ground elevation is deliberate: gravity-fed distribution eliminates the need for mechanical lifting. The reservoirs also serve aesthetic, recreational, and military purposes.' },
]

export interface HistoryEvent {
  year: string
  event: string
  thread: string
}

export const HISTORY: HistoryEvent[] = [
  { year: 'Early 12th C', event: 'Almoravids build first khettara systems in Marrakech under Ali bin Yusuf (1105–1143), establishing the underground water infrastructure that would support all future gardens', thread: 'water' },
  { year: '1147', event: 'Marrakech becomes capital of the Almohad Empire (encompassing the entire Maghreb and Al-Andalus)', thread: 'dynasty' },
  { year: 'c. 1157', event: 'Almohad Caliph Abd al-Mu\'min creates both the Menara Gardens (west of city) and initiates the Agdal Gardens (south). A revolutionary urban vision: the total garden surface equals the built city surface', thread: 'founding' },
  { year: '1163–1184', event: 'Abu Ya\'qub Yusuf expands the Agdal. Builds the great reservoir (Dar al-Hana basin, 208 × 181m). Uses it as model for basins in Rabat and Seville\'s Alcázar', thread: 'founding' },
  { year: '16th C', event: 'Saadian dynasty restores Marrakech as capital. Builds pleasure pavilion at Menara. The golden age of Hispano-Moorish garden architecture in Morocco', thread: 'dynasty' },
  { year: '18th C', event: 'Sultan Moulay Abdallah creates Jnan Sbil Gardens in Fez — a royal domain with underground passage to the palace. Arab-Andalusian tradition transplanted to the spiritual capital', thread: 'founding' },
  { year: '1822–1873', event: 'Alaouite sultans Moulay Abd ar-Rahman and Muhammad IV restore both Menara and Agdal. Replant orchards, restore water systems, rebuild the Menara pavilion (completed 1870)', thread: 'restoration' },
  { year: '1917', event: 'Jnan Sbil opened to the public — no longer royal-only. Morocco\'s first major public garden', thread: 'public' },
  { year: '1923', event: 'Jacques Majorelle purchases a palm grove in Marrakech and begins planting', thread: 'modern' },
  { year: '1937', event: 'Majorelle creates his trademark cobalt blue (bleu Majorelle, #6050DC) and transforms the garden buildings. Opens to public in 1947', thread: 'modern' },
  { year: '1980', event: 'Yves Saint Laurent and Pierre Bergé buy Jardin Majorelle, saving it from hotel developers. "We were seduced by this oasis where colours used by Matisse were mixed with those of nature"', thread: 'modern' },
  { year: '1985', event: 'UNESCO inscribes the Medina of Marrakech — including Agdal and Menara Gardens — as World Heritage Site', thread: 'recognition' },
  { year: '2006–2011', event: 'Princess Lalla Hasnaa launches rehabilitation of Jnan Sbil: four-year restoration of 3,000 plant species, ancient hydraulic systems, norias, seguias, fountains. Reopened 2011', thread: 'restoration' },
  { year: '2017', event: 'Musée Yves Saint Laurent opens next to Jardin Majorelle. Villa houses Berber Museum with 600+ artefacts', thread: 'modern' },
]

export const HERO_STATS = [
  { value: '1157', label: 'Almohad founding of Agdal & Menara' },
  { value: '45 km', label: 'khettara channel length from Atlas to Agdal' },
  { value: '900K', label: 'annual visitors to Jardin Majorelle' },
  { value: '3,000+', label: 'plant species in Jnan Sbil, Fez' },
]

export const KEY_NUMBERS = [
  { number: '500', unit: 'hectares', context: 'Agdal Gardens — almost the size of Almohad-era Marrakech itself. The largest historic garden in the city. 3,000 olive trees in a geometric grid' },
  { number: '83,000', unit: 'm³', context: 'Capacity of the Dar al-Hana reservoir at the Agdal. Rammed earth mixed with lime. 208 × 181 metres. Built in the 12th century. Still standing' },
  { number: '#6050DC', unit: '', context: 'Majorelle Blue — the trademarked cobalt that defines Jardin Majorelle. Inspired by Moroccan tiles and Tuareg blue veils' },
  { number: '1870', unit: '', context: 'Year the current Menara pavilion was completed — on ruins of a 16th-century Saadian original. Green pyramidal roof, horseshoe arches, zellige' },
  { number: '7.5', unit: 'hectares', context: 'Jnan Sbil — Fez. "Jnan" from "jannah" (paradise). 3,000 species. Underground passage to the Royal Palace. Free admission' },
  { number: '900,000', unit: 'visitors/year', context: 'Jardin Majorelle. One hectare. Created by a painter, saved by a couturier' },
]

export const THREAD_COLORS: Record<string, string> = {
  founding: '#2E7D32',
  dynasty: '#8B7355',
  water: '#1E88E5',
  restoration: '#E8A94E',
  modern: '#8B2FC9',
  public: '#5C7C3E',
  recognition: '#A0452E',
}

export const BIBLIOGRAPHY = [
  { source: 'Wikipedia', detail: 'Agdal Gardens, Menara Gardens, Majorelle Garden, Jnan Sbil Gardens, Sintir. Comprehensive historical chronologies, reservoir dimensions, water system descriptions' },
  { source: 'ArchNet (Aga Khan Documentation Center)', detail: 'Agdal Gardens Marrakech. Hispano-Mauresque productive garden typology. Khettara network engineering. Basin al-Manzeh dimensions and construction' },
  { source: 'UNESCO', detail: 'World Heritage Site inscription 1985: Medina of Marrakesh including Agdal and Menara Gardens. Criteria and significance' },
  { source: 'Med-O-Med (ISESCO)', detail: 'Agdal and Menara Gardens. Reservoir engineering. Qanat/khettara systems. Garden grid dimensions' },
  { source: 'Fondation Pierre Bergé – Yves Saint Laurent / Musée YSL Marrakech', detail: 'Official Jardin Majorelle history. Jacques Majorelle biography. YSL and Bergé acquisition. Berber Museum. Madison Cox garden redesign' },
  { source: 'Lonely Planet / National Geographic', detail: 'Majorelle Blue origins. Visitor statistics (900,000/year). 300 plant species from five continents. Berber Museum details' },
  { source: 'Mohammed VI Foundation for Environmental Protection', detail: 'Jnan Sbil rehabilitation project (2006–2010). 3,000 plant species conserved. Hydraulic system restoration. Princess Lalla Hasnaa patronage' },
  { source: 'Visit Marrakech / El Faïz, Mohammed', detail: '"The Garden Strategy of the Almohad Sultans." 45km khettara network. Three-tier oasis agriculture. Almohad urban planning philosophy' },
]

export const MAP_POINTS = [
  { name: 'Agdal Gardens', lat: 31.6135, lng: -7.9879, detail: 'Almohad, 1157. 405 hectares. Royal irrigation.', color: '#2D6E4F' },
  { name: 'Menara Gardens', lat: 31.6227, lng: -8.0225, detail: 'Almohad, 12th C. Iconic pavilion. Olive groves.', color: '#2D6E4F' },
  { name: 'Jardin Majorelle', lat: 31.6419, lng: -8.0032, detail: 'Majorelle 1923, YSL 1980. Cobalt blue.', color: '#1A5276' },
  { name: 'Jnan Sbil', lat: 34.0597, lng: -4.9878, detail: 'Fez, 18th C. Royal park. Open since 2011.', color: '#2D6E4F' },
]
