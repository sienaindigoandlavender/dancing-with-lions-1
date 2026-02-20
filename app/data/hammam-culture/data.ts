// ─────────────────────────────────────────────────
// Hammam Culture — The Social Architecture of the Bathhouse
// Module 074 — Cultural Intelligence
// ─────────────────────────────────────────────────

export interface Room {
  name: string
  arabic: string
  temp: string
  detail: string
  phase: string
}

export const ROOMS: Room[] = [
  { name: 'Al-Barrani', arabic: 'البرّاني', temp: '~25°C', detail: 'The outer room. Changing, storage. You undress here — down to underwear. Attendant gives you a bucket, kessa glove, plastic sandals. Belongings stay with the reception attendant.', phase: 'Arrival' },
  { name: 'Al-Wustani', arabic: 'الوسطاني', temp: '~35°C', detail: 'The warm room. Your body adjusts to the heat. Pores begin to open. You sit on the tiled floor and pour warm water from your bucket. This is where the conversation starts.', phase: 'Warming' },
  { name: 'Al-Dakhli', arabic: 'الداخلي', temp: '~45°C', detail: 'The hot room. The centre of the hammam. Heated from below by the furnace (hypocaust system — Roman-origin underfloor heating). This is where the ritual happens: soap, scrub, clay. You stay 20–40 minutes.', phase: 'The ritual' },
  { name: 'Al-Jawwani', arabic: 'الجوّاني', temp: 'Fire', detail: 'The furnace room. Not accessible to the public. Wood-fired boiler heats water and sends hot air through channels beneath the floors. Tended by the farnatchi. Also where the tangia cooks.', phase: 'Hidden engine' },
]

export interface RitualStep {
  name: string
  duration: string
  detail: string
}

export const RITUAL: RitualStep[] = [
  { name: 'The Warm-Up', duration: '10–15 min', detail: 'Sit in the warm room. Pour water. Let heat loosen the muscles. The atmosphere is hot and humid — not steamy like a Turkish bath. Light filters through small glass oculi in the domed ceiling.' },
  { name: 'Savon Beldi', duration: '10–15 min', detail: 'Move to the hot room. Slather the body in black soap — a thick, dark paste made from olive oil and macerated black olives, sometimes infused with eucalyptus. Leave it on. It softens the skin and lifts impurities to the surface.' },
  { name: 'The Scrub (Gommage)', duration: '15–20 min', detail: 'The kessala (attendant) scrubs every inch of your body with the kessa glove — firm, rhythmic strokes in long sweeping arcs. Grey rolls of dead skin appear. This is the core of the hammam. Blood circulates. The skin breathes.' },
  { name: 'Ghassoul Clay', duration: '10–15 min', detail: 'Mineral-rich clay from the Middle Atlas, mined since the 8th century. Mixed with water, rose petals, or herbs. Applied as a body and hair mask. Absorbs impurities, delivers magnesium, calcium, silica. Rinse with warm water.' },
  { name: 'The Rinse', duration: '5 min', detail: 'Buckets of warm water poured over you — no showerheads in a traditional hammam. No pools either. Islam considers still water unclean. Running water only. Sometimes followed by orange-flower water or lemon juice as a skin tonic.' },
  { name: 'Argan Oil & Rest', duration: 'Open', detail: 'Move to the cool room. Argan oil massaged into the skin — rich in vitamin E, omega-6, omega-9. Rehydrate with mint tea. Sit. Talk. The hammam is not rushed. Two to three hours is normal. The exit is as important as the entrance.' },
]

export interface Product {
  name: string
  arabic: string
  origin: string
  detail: string
}

export const PRODUCTS: Product[] = [
  { name: 'Savon Beldi (Black Soap)', arabic: 'صابون بلدي', origin: 'Atlantic coast olive groves', detail: 'Thick paste of olive oil and macerated black olives. Sometimes infused with eucalyptus. Softens skin, lifts impurities, prepares for exfoliation. Rich in vitamin E. Used on the whole body including face. Functions as cleanser, moisturiser, and therapy.' },
  { name: 'Kessa Glove', arabic: 'كيس', origin: 'Woven crepe fabric', detail: 'Rough-textured exfoliating mitt worn on the hand. The tool of the kessala. Firm circular strokes remove dead skin cells, unclog pores, stimulate blood flow. The most physically transformative moment of the hammam.' },
  { name: 'Ghassoul Clay', arabic: 'غاسول', origin: 'Middle Atlas, Moulouya Valley', detail: 'Saponiferous clay mined since the 8th century. Rich in magnesium, iron, potassium, silica. Mixed with water, rose petals, cloves, chamomile. Applied to body and hair. Absorbs impurities, tightens pores, regulates sebum. The only commercially viable deposit in the world.' },
  { name: 'Argan Oil', arabic: 'زيت أركان', origin: 'Argan Triangle, Souss-Massa', detail: 'Cold-pressed from unroasted argan kernels. Rich in vitamin E, essential fatty acids. Applied after the scrub to lock in moisture. Soothing, anti-ageing, deeply hydrating. Often mixed with rose water and orange blossom.' },
  { name: 'Rose Water', arabic: 'ماء الورد', origin: 'Kelaat M\'Gouna, Dadès Valley', detail: 'Distilled from Damascena roses. Used as a skin tonic after rinsing. Calms the skin, closes pores, adds fragrance. The Dadès Valley Rose Festival (May) celebrates the harvest.' },
  { name: 'Henna', arabic: 'حنّة', origin: 'Grown across Morocco', detail: 'Applied to hair and hands in some hammam traditions, especially pre-wedding rituals. Conditions hair, stains skin with intricate patterns. The bridal hammam is incomplete without it.' },
]

export interface NeighborhoodElement {
  name: string
  role: string
}

export const FIVE_ELEMENTS: NeighborhoodElement[] = [
  { name: 'Mosque', role: 'Prayer and spiritual centre. The hammam exists in its orbit — built nearby to facilitate ablutions before Friday prayer.' },
  { name: 'Hammam', role: 'Communal bathing, social gathering, ritual purification. The only public space where women could historically gather freely.' },
  { name: 'Fountain (Saqaya)', role: 'Public water supply. Running water — essential for both wudu (minor ablution) and daily needs.' },
  { name: 'Madrasa', role: 'Religious school. Education and Quranic study. Part of the civic infrastructure of every neighbourhood.' },
  { name: 'Communal Bakery (Ferran)', role: 'Neighbourhood bread oven. Families bring dough to be baked. The farnatchi who tends the hammam furnace often tends this fire too.' },
]

export interface HistoryEvent {
  year: string
  event: string
  detail: string
}

export const HISTORY: HistoryEvent[] = [
  { year: 'c. 2nd C', event: 'Roman thermae in North Africa', detail: 'Roman bathhouses built across Mauretania Tingitana — Volubilis, Lixus, Banasa. Cold pools (frigidarium), warm rooms (tepidarium), hot rooms (caldarium). The three-room layout that persists in Moroccan hammams today.' },
  { year: 'c. 8th C', event: 'Earliest Islamic hammam in Morocco', detail: 'Ruins at Volubilis — a former Roman colony — contain the oldest known Islamic hammam in Morocco. Built during the Idrisid period (788–974). Roman structure adapted for Islamic needs: no pools, running water only.' },
  { year: '11th C', event: 'Al-Ghazali codifies hammam conduct', detail: 'Abu Hamid al-Ghazali writes "The Mysteries of Purity" in his Ihya Ulum al-Din. Details proper technique for ghusl (full-body ablution). Frames the hammam as primarily male; women enter only after childbirth or illness. Moroccan practice diverged from this restriction.' },
  { year: '12th–13th C', event: 'Almohad and Marinid expansion', detail: 'Hammams multiply across Fez, Marrakech, Meknès, Rabat. Magda Sibley (University of Leeds) finds that Islamic architecture specialists consider the hammam second in importance only to the mosque in the medina.' },
  { year: '1562', event: 'Mouassine Hammam, Marrakech', detail: 'Built by Sultan Abdellah al-Ghalib under the Saadian dynasty. Part of the Mouassine complex — mosque, fountain, madrasa, hammam. Still operational. The oldest continuously running hammam in Marrakech.' },
  { year: '19th C', event: 'Hammam as women\'s institution', detail: 'With the hammam as one of the only public spaces women could freely visit, it becomes a centre of female social life. Mothers scout future wives for their sons. Pre-wedding and post-birth rituals consolidate here.' },
  { year: '20th C', event: 'Neighbourhood hammams persist', detail: 'Even as indoor plumbing reaches wealthier homes, public hammams remain essential for medina residents. Thursday and Friday remain the busiest days. Entry costs 10–40 dirhams.' },
  { year: 'Present', event: 'Morocco leads the world', detail: 'Morocco has the highest number of public bathhouses of any country. Neighbourhood hammams coexist with luxury spa hammams in riads and hotels — Royal Mansour, La Mamounia, Les Bains de Marrakech. The ritual is the same. Only the price changes.' },
]

export const HERO_STATS = [
  { value: '3', label: 'Rooms of ascending heat' },
  { value: '6', label: 'Ritual steps' },
  { value: '5', label: 'Neighbourhood elements' },
  { value: '1562', label: 'Oldest Marrakech hammam' },
]

export const KEY_NUMBERS = [
  { value: '10', unit: 'dirhams', note: 'Entry to a neighbourhood hammam. About 90 cents. The hammam is not a luxury. It is infrastructure.' },
  { value: '2–3', unit: 'hours', note: 'Time Moroccans spend per visit. Families go together. The hammam is not rushed.' },
  { value: '45°C', unit: 'hot room', note: 'Temperature in al-Dakhli, the innermost room. Heated from below by hypocaust — Roman-origin underfloor system. Wood-fired.' },
  { value: '1,290', unit: 'per hectare', note: 'Medina population density (Casablanca, colonial era). When homes have no running water, the hammam is not optional.' },
  { value: 'Thu–Fri', unit: 'peak days', note: 'Busiest before Friday prayers. Purification of body and soul. Ghusl before Jumu\'ah.' },
  { value: '0', unit: 'pools', note: 'No still water in a Moroccan hammam. Islam considers it unclean. Running water drawn from taps into buckets. Rinsed, never submerged.' },
]

export interface BibliographyEntry {
  author: string
  title: string
  year: string
  detail: string
}

export const BIBLIOGRAPHY: BibliographyEntry[] = [
  { author: 'Sibley, Magda', title: 'The Historic Hammams of Damascus and Fez', year: '2008', detail: 'The definitive architectural study. Sibley (University of Leeds) documents spatial layouts, ventilation, heating, and the hammam\'s urban integration. Finds it second only to the mosque in medina significance.' },
  { author: 'Bouhdiba, Abdelwahab', title: 'Sexuality in Islam', year: '1975', detail: 'Routledge. Includes extensive analysis of the hammam as a social and sexual space. The women\'s hammam as a site of female autonomy within constrained public life.' },
  { author: 'Al-Ghazali, Abu Hamid', title: 'Ihya Ulum al-Din (Revival of the Religious Sciences)', year: 'c. 1100', detail: 'Volume on "The Mysteries of Purity." Codifies ablution practice. Details ghusl technique. The theological foundation of hammam as religious infrastructure.' },
  { author: 'Staats, Valerie', title: 'Ritual, Strategy, and Power in Moroccan Women\'s Hammam', year: '1994', detail: 'Ethnography of women\'s hammam culture. Finds that hammams serve as social spaces where traditional and modern women from urban and rural Morocco come together regardless of religiosity.' },
  { author: 'Williams, Elizabeth', title: 'Baths and Bathing Culture in the Middle East: The Hammam', year: '2012', detail: 'Metropolitan Museum of Art, Heilbrunn Timeline. Medieval hammam culture — Baghdad reportedly had 60,000 bathhouses at its height (per Hilal al-Sabi\', likely exaggerated but illustrative).' },
  { author: 'Benkheira, Mohammed Hocine', title: 'Hammam, nudité et ordre moral dans l\'islam médiéval', year: '2003', detail: 'Argues hammams were not strictly necessary for religious purposes in early Islam — their appeal derived from convenience, medical endorsement, and inherited pleasure from pre-Islamic bathing culture.' },
]
