// ─────────────────────────────────────────────────
// The French Protectorate — 1912–1956
// Module 073 — Political & Historical Intelligence
// ─────────────────────────────────────────────────

export interface TimelineEvent {
  year: string
  event: string
  detail: string
  category: 'conquest' | 'administration' | 'resistance' | 'independence'
}

export const TIMELINE: TimelineEvent[] = [
  { year: '1907', event: 'Oujda occupied, Casablanca bombarded', detail: 'France invades eastern Morocco and shells Casablanca after the assassination of French physician Émile Mauchamp in Marrakech. Military occupation predates the treaty by five years.', category: 'conquest' },
  { year: '1912', event: 'Treaty of Fez — Protectorate established', detail: 'Sultan Abd al-Hafid signs under military pressure on 30 March. France gains legislative power, military defence, foreign policy, and jurisdiction. The Sultan reigns but does not rule. The Makhzen believed the arrangement would resemble British Egypt. It did not. It was modelled on Tunisia.', category: 'conquest' },
  { year: '1912', event: 'Fez mutiny and riots', detail: '17 April: Moroccan infantrymen mutiny in the French garrison when news of the treaty spreads. The Mellah (Jewish quarter) is bombarded by French artillery and sacked. Lyautey moves the capital from Fez to Rabat — permanently.', category: 'resistance' },
  { year: '1912', event: 'Lyautey appointed Resident-General', detail: 'Hubert Lyautey (1854–1934) replaces Regnault. Military officer, colonial administrator, architect of the "dual city" policy. Recruits Henri Prost as chief urban planner. Establishes the Native Policy Council.', category: 'administration' },
  { year: '1913', event: 'Henri Prost begins urban planning', detail: 'Prost (1874–1959) designs the villes nouvelles — European districts built alongside but separate from existing medinas. Casablanca, Rabat, Fez, Marrakech, Meknès. Wide boulevards, plazas, administrative buildings. Medinas preserved but frozen.', category: 'administration' },
  { year: '1917–26', event: 'Habous Quarter, Casablanca', detail: 'Architects Laprade, Cadet, and Brion build the Habous district — a "new medina" for Moroccans displaced by urban migration. Designed to look traditional but serves colonial settlement policy. Casablanca\'s population surges from 12,000 (1912) to 110,934 (1921).', category: 'administration' },
  { year: '1921–26', event: 'Rif War — Abd el-Krim\'s republic', detail: 'Berber leader Abd el-Krim defeats Spain at Annual (1921 — 8,000 Spanish soldiers killed), establishes the Republic of the Rif. France intervenes when the rebellion crosses into the French zone. Joint Franco-Spanish force of 250,000 troops crushes the republic by 1926. Abd el-Krim exiled to Réunion.', category: 'resistance' },
  { year: '1930', event: 'Berber Dahir — the catalyst', detail: '16 May: Sultan Mohammed V promulgates a decree organizing Berber tribal justice under customary law separate from Sharia courts. Nationalists see a French strategy to divide Arab and Berber Moroccans. Mass protests erupt. Allal al-Fassi leads the opposition. The decree unifies the nationalist movement.', category: 'resistance' },
  { year: '1934', event: 'Moroccan Action Committee founded', detail: 'Mohamed Hassan al-Ouazzani, Allal al-Fassi, and Ahmed Balafrej form the Comité d\'Action Marocaine (CAM). They publish the Plan des Réformes — demanding a return to indirect rule, Moroccan access to government positions, and representative councils. France ignores it.', category: 'resistance' },
  { year: '1937', event: 'Boufakrane incidents and exile', detail: 'French settlers attempt to divert river water from Moroccan residents. Revolts erupt. France arrests and exiles Allal al-Fassi (to Gabon, then Congo — nine years). Al-Ouazzani placed under forced residence. The nationalist movement is decapitated.', category: 'resistance' },
  { year: '1943', event: 'Anfa Conference — Roosevelt meets Mohammed V', detail: 'January: Allied leaders meet in Casablanca. Mohammed V reminds Roosevelt that Morocco fought alongside the Allies. Roosevelt calls Moroccan independence aspirations "reasonable and legitimate." The Sultan\'s international visibility rises.', category: 'independence' },
  { year: '1943', event: 'Istiqlal Party founded', detail: '18 December: Secret conference in Rabat. With al-Fassi and al-Ouazzani in exile, the remaining nationalists found the Istiqlal (Independence) Party.', category: 'independence' },
  { year: '1944', event: 'Independence Manifesto', detail: '11 January: 66 Moroccans sign the Proclamation of Independence demanding full sovereignty under Mohammed V and a democratic constitution. Drafted by Ahmed el Hamiani Khatat and Ahmed Bahnini. Malika al-Fassi is the only woman to sign. France arrests 20 nationalists. Ahmed Balafrej deported to Corsica.', category: 'independence' },
  { year: '1947', event: 'Tangier Speech', detail: '9 April: Mohammed V visits Tangier and affirms Morocco\'s commitment to territorial unity and Arab identity — omitting any mention of France. The colonial authorities are alarmed. Pressure on the Sultan intensifies.', category: 'independence' },
  { year: '1953', event: 'Mohammed V exiled to Madagascar', detail: '20 August: French soldiers invade the Royal Palace in Rabat. The royal family is forced onto a bus to an unknown destination. Exiled first to Corsica, then Madagascar. Mohammed Ben Arafa installed as replacement. Moroccans reject him. Protests, strikes, and armed resistance erupt nationwide. The exile unifies the country.', category: 'independence' },
  { year: '1955', event: 'Aix-les-Bains — negotiations begin', detail: 'August–September: French PM Edgar Faure opens talks with Istiqlal leaders. Ben Arafa abdicates and flees to Tangier. Mohammed V returns to Morocco. France, weakened by the Algerian War, concedes.', category: 'independence' },
  { year: '1956', event: 'Independence — 2 March', detail: 'Franco-Moroccan Joint Declaration dissolves the French protectorate. Spain cedes the northern zone one month later. Tangier\'s international status ends in October. 44 years of colonial rule end. Mohammed V assumes the title of King in 1957.', category: 'independence' },
]

export interface KeyFigure {
  name: string
  role: string
  years: string
  detail: string
  side: 'french' | 'moroccan'
}

export const KEY_FIGURES: KeyFigure[] = [
  { name: 'Hubert Lyautey', role: 'Resident-General (1912–1925)', years: '1854–1934', detail: 'Marshal of France. Architect of the "dual city" policy — European villes nouvelles built alongside preserved medinas. Moved the capital from Fez to Rabat. Established the Native Policy Council. Policy of "association" over "assimilation": protect the Sultan\'s symbolic authority while France held all real power. Recruited Henri Prost. The paternalist who claimed to protect what he controlled.', side: 'french' },
  { name: 'Henri Prost', role: 'Chief Urban Planner (1913–1923)', years: '1874–1959', detail: 'Designed the villes nouvelles of Casablanca, Rabat, Fez, Marrakech, Meknès. Wide European boulevards built outside the medina walls. Medinas preserved but economically frozen — traditional crafts redirected toward European markets. The urban planning that physically separated coloniser and colonised.', side: 'french' },
  { name: 'Michel Écochard', role: 'Director, Service de l\'urbanisme (1947–1953)', years: '1905–1985', detail: 'Took over from Prost\'s legacy. Confronted the bidonvilles (shanty towns) that Prost\'s dual-city model had created. Designed mass housing for Moroccans as the rural-to-urban exodus accelerated. Casablanca medina density: 1,290 per hectare. European quarters: 50 per hectare.', side: 'french' },
  { name: 'Mohammed V', role: 'Sultan / King', years: '1909–1961', detail: 'Ascended the throne 18 November 1927. Endorsed the 1944 Independence Manifesto. Met Roosevelt at Anfa Conference (1943). Delivered the Tangier Speech (1947). Exiled to Madagascar (1953). His exile unified the country. Returned 1955. Morocco\'s independence: 2 March 1956. Assumed the title of King, 1957.', side: 'moroccan' },
  { name: 'Allal al-Fassi', role: 'Nationalist leader, Istiqlal founder', years: '1910–1974', detail: 'Scholar from Fez. Led the 1930 protests against the Berber Dahir. Exiled to Gabon and Congo (1937–1946). Co-founded Istiqlal. Championed "Greater Morocco" — territorial integrity including Sahara, Ceuta, Melilla. Negotiated guerrilla disarmament after independence. Monarchist who believed a king could be loyal to and still opposed.', side: 'moroccan' },
  { name: 'Abd el-Krim', role: 'Leader, Republic of the Rif', years: '1882–1963', detail: 'Defeated Spain at Annual (1921). Established the Republic of the Rif — Africa\'s first anti-colonial republic. Resisted 250,000 Franco-Spanish troops. Surrendered 1926. Exiled to Réunion, then Egypt. Never returned to Morocco. His tactics studied by Mao, Ho Chi Minh, and Che Guevara.', side: 'moroccan' },
  { name: 'Malika al-Fassi', role: 'Only woman to sign the 1944 Manifesto', years: '1919–2007', detail: 'Activist, writer. Signed the Independence Manifesto alongside 65 men. Active in nationalist and intellectual circles in Fez. Her presence confirmed that women played active roles — organising, educating, building communication networks — though colonial and post-colonial records rarely said so.', side: 'moroccan' },
]

export interface VilleNouvelle {
  city: string
  lat: number
  lng: number
  detail: string
  color: string
}

export const VILLES_NOUVELLES: VilleNouvelle[] = [
  { city: 'Rabat', lat: 33.9716, lng: -6.8498, detail: 'New capital from 1912. Lyautey chose it over Fez: coastal, accessible to France, easier to control. Hassan Tower area. Administrative centre of the protectorate.', color: '#2D5F8A' },
  { city: 'Casablanca', lat: 33.5731, lng: -7.5898, detail: 'Economic engine. Population 12,000 (1912) → 110,934 (1921). Prost\'s European quartier. Habous "new medina." Medina density 1,290/hectare vs 50/hectare European. Bidonvilles emerged.', color: '#A0452E' },
  { city: 'Fez', lat: 34.0331, lng: -5.0003, detail: 'Ancient capital, preserved as cultural showcase. Medina frozen while ville nouvelle grew outside the walls. Nationalists organised here. Istiqlal founded here.', color: '#F59E0B' },
  { city: 'Marrakech', lat: 31.6295, lng: -7.9811, detail: 'Guéliz district — the French ville nouvelle. Laid out by Prost. Wide avenues, cafés, administrative buildings. The medina remained separate.', color: '#7B506F' },
  { city: 'Meknès', lat: 33.8731, lng: -5.5407, detail: 'Imperial city with new European district. French garrison town. Agricultural hinterland controlled for settler farming.', color: '#5C7C3E' },
]

export const HERO_STATS = [
  { value: '1912', label: 'Treaty of Fez' },
  { value: '44', label: 'Years of colonial rule' },
  { value: '1944', label: 'Independence Manifesto' },
  { value: '1956', label: 'Sovereignty restored' },
]

export const KEY_NUMBERS = [
  { value: '44', label: 'Years', note: 'From the Treaty of Fez (30 March 1912) to the Franco-Moroccan Joint Declaration (2 March 1956).' },
  { value: '250,000', label: 'Troops against the Rif', note: 'Franco-Spanish coalition required to defeat Abd el-Krim\'s republic. The largest colonial military operation in Africa at the time.' },
  { value: '1,290', label: 'Per hectare (medina)', note: 'Population density in Casablanca\'s medina. The European quarters across the wall: 50 per hectare. Twenty-six times the difference.' },
  { value: '66', label: 'Signatories', note: 'Of the 1944 Independence Manifesto. One woman: Malika al-Fassi. 20 arrested by France. Ahmed Balafrej deported to Corsica.' },
  { value: '35%', label: 'Speak French (2019)', note: 'More than Algeria (33%). The linguistic legacy persists. French still runs the boardrooms, the courts, and the universities.' },
  { value: '1.5M', label: 'Moroccans in France', note: 'The largest Moroccan community outside Morocco. The colonial connection inverted: the colonised moved to the coloniser.' },
]

export interface BibliographyEntry {
  author: string
  title: string
  year: string
  detail: string
}

export const BIBLIOGRAPHY: BibliographyEntry[] = [
  { author: 'Abu-Lughod, Janet', title: 'Rabat: Urban Apartheid in Morocco', year: '1980', detail: 'Princeton. The foundational study of French colonial urban planning as spatial segregation. Traces how Lyautey and Prost\'s dual-city model created the physical infrastructure of inequality that persists today.' },
  { author: 'Pennell, C. R.', title: 'Morocco Since 1830: A History', year: '2000', detail: 'Hurst & Co. Comprehensive English-language history of modern Morocco. From the pre-colonial period through independence to Hassan II.' },
  { author: 'Gershovich, Moshe', title: 'French Military Rule in Morocco: Colonialism and Its Consequences', year: '2000', detail: 'Routledge. Military dimensions of the protectorate — how armed force underpinned the administrative veneer.' },
  { author: 'Segalla, Spencer', title: 'The Moroccan Soul: French Education, Colonial Ethnology, and Muslim Resistance, 1912–1956', year: '2009', detail: 'Nebraska. How France used education and ethnography as instruments of colonial control — and how Moroccans resisted.' },
  { author: 'Laroui, Abdallah', title: 'The History of the Maghrib: An Interpretive Essay', year: '1977', detail: 'Princeton. The Moroccan historian\'s defining work. "The more those at the top borrowed, the more those at the bottom were impoverished."' },
  { author: 'Wright, Gwendolyn', title: 'The Politics of Design in French Colonial Urbanism', year: '1991', detail: 'Chicago. Architecture and urban planning as colonial instruments across the French empire. Morocco features centrally.' },
  { author: 'Bidwell, Robin', title: 'Morocco Under Colonial Rule: French Administration of Tribal Areas 1912–1956', year: '1973', detail: 'Cass. How France administered the Bled es-Siba — the rural tribal territories beyond the Makhzen\'s traditional reach.' },
  { author: 'Miller, Susan Gilson', title: 'A History of Modern Morocco', year: '2013', detail: 'Cambridge. Clear, contemporary, thorough. From the pre-colonial crisis through the Arab Spring.' },
]
