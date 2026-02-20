// ─────────────────────────────────────────────────
// Morocco's Musical Traditions
// Module 066 — Cultural Intelligence
// Sources: Wikipedia (Music of Morocco, Gnawa,
// Berber music, Andalusi nubah), UNESCO ICH,
// Afropop, World Music Network, Melodigging
// ─────────────────────────────────────────────────

export interface MusicTradition {
  id: string
  name: string
  arabicName: string
  origin: string
  region: string
  era: string
  instruments: string[]
  keyFigures: string[]
  ritualOrContext: string
  detail: string
  unesco?: string
  modernFusion: string
  lat: number
  lng: number
  color: string
}

export const TRADITIONS: MusicTradition[] = [
  {
    id: 'gnawa', name: 'Gnawa', arabicName: 'كناوة',
    origin: 'Sub-Saharan Africa (Hausa, Fulani, Bambara peoples) via trans-Saharan slave trade',
    region: 'Essaouira, Marrakech, Casablanca, Rabat, Tangier',
    era: '16th–17th century onwards (Saadian dynasty)',
    instruments: ['Guembri / sintir (3-string bass lute)', 'Qraqeb / krakeb (metal castanets)', 'Tbel / ganga (large double-headed drum)', 'Hand-clapping', 'Call-and-response vocals'],
    keyFigures: ['Maalem Mahmoud Guinia (Essaouira)', 'Maalem Mokhtar Gania', 'Hamid El Kasri (Rabat)', 'Maalem Mustapha Baqbou (Marrakech)', 'Maalem H\'mida Boussou (Casablanca)', 'Hassan Hakmoun'],
    ritualOrContext: 'Lila (Derdeba) — all-night healing ceremony. Led by a moqaddema (priestess) and maalem (master musician). Three stages: Al-\'Ada (consecration), Ouled Bambara, The Kings. Animal sacrifice opens. Spirits (Mluk) are summoned through music to possess and heal followers. Incense burning, ecstatic trance dancing (jedba).',
    detail: 'Descendants of enslaved West Africans brought to Morocco by Sultan Ahmad al-Mansur after campaigns in Timbuktu (1591). Spiritual practices fused Islam, Sufi mysticism, and ancestral African ritual. Claims spiritual descent from Sidi Bilal, the first muezzin in Islam. Zawayas (spiritual lodges) established in Marrakech and Essaouira around tombs of saints. Pentatonic scale with modal shifts echoing Andalusian tradition. Shares affinities with Algeria\'s Diwan, Tunisia\'s Stambeli, Haitian Vodou, Cuban Santería, and Brazilian Candomblé. The Ganga sub-group (Haha region, Souss) plays only drums and qraqeb — no guembri.',
    unesco: 'Inscribed on UNESCO Intangible Cultural Heritage list, 2019',
    modernFusion: 'Nass El Ghiwane (1970s) drew from Gnawa to create Moroccan pop. Collaborations with Randy Weston, Bill Laswell, Robert Plant, Jacob Collier, Snarky Puppy. Bab L\'Bluz (blues-Gnawa fusion) embody the "Nayda" youth movement. Essaouira Gnawa Festival (est. 1997) draws international audiences.',
    lat: 31.5085, lng: -9.7595, color: '#8B5CF6',
  },
  {
    id: 'andalusi', name: 'Andalusi (Al-Ala)', arabicName: 'الآلة الأندلسية',
    origin: 'Al-Andalus (Islamic Spain) — 9th century Cordoba, codified by Ziryab',
    region: 'Fez, Tetouan, Chefchaouen, Tangier, Meknes, Rabat, Casablanca',
    era: '9th century origins; brought to Morocco after fall of Granada (1492) and Morisco expulsion (1609)',
    instruments: ['Oud (lute)', 'Rabab / rebec (bowed string)', 'Violin / kamanja', 'Qanun (zither)', 'Nay (flute)', 'Darbuka (goblet drum)', 'Tambourine / tar', 'Voice (soloist + chorus)'],
    keyFigures: ['Ziryab (Abu Hassan Ali Ben Nafi, 9th C — founded the nuba)', 'Al-Haik of Tetouan (18th C — codified the Moroccan repertoire)', 'Haj Abdelkrim al-Raïs (Fez)', 'Ahmed Zaitouni (Orchestra of Tangier)', 'Mohammed Larbi Temsamani (Tetouan Conservatoire)'],
    ritualOrContext: 'Court and salon music. Performed at state occasions, private gatherings, riad concerts, and sacred music festivals. Also preserved in Jewish communities (Haim Zafrani documents shared Muslim-Jewish musical tradition in the Maghreb).',
    detail: 'Morocco\'s classical art music. Ziryab fled Baghdad, established a music school in Cordoba, and invented the nuba suite — the foundation of all Arab-Andalusian classical music. Originally 24 nubat (one per hour of the day); 11 survive in Morocco (with 24 modes total). Each nuba has 5 mizan (rhythmic sections): basit, qayim wa-nisf, btayhi, darj, quddam — progressing from slow to fast. Begins with arrhythmic boughia, then instrumental touchiya. Lyrics in mouwachah (classical Arabic) or zajal (colloquial). Modes include Gregorian (pre-Islamic Spanish), pentatonic (Amazigh), and artificial (combined tetrachords). Al-Haik\'s Kunnash (late 18th C) from Tetouan codified the repertoire — over 900 pieces, now performed in his order.',
    modernFusion: 'Orchestra of Tangier collaborated with flamenco singer El Lebrijano (1980s). Performed on national TV regularly. Fez Festival of Sacred Music features Andalusi ensembles. Gharnati sub-style (from Granada) heard in Rabat and Oujda.',
    lat: 34.0331, lng: -5.0003, color: '#D4A373',
  },
  {
    id: 'amazigh', name: 'Amazigh (Berber)', arabicName: 'أمازيغ',
    origin: 'Indigenous — predates Islam in North Africa. Oral transmission across millennia.',
    region: 'Middle Atlas (ahidus), High Atlas / Souss (ahwash), Rif, Sahara (guedra), all rural Morocco',
    era: 'Ancient — thousands of years of continuous tradition',
    instruments: ['Bendir (frame drum — core instrument)', 'Tbel (large drum)', 'Ribab / rebab (one-string bowed)', 'Lotar (plucked lute)', 'Nay / nair (flute)', 'Ghaita (oboe — outdoor festivals)', 'Handclaps', 'Qraqeb (metal idiophones)'],
    keyFigures: ['Ammouri Mbarek ("the John Lennon of the Berbers")', 'Najat Aatabou (debut cassette sold 500,000 copies)', 'Rways / Raiss tradition (Souss poet-musicians)', 'Imdyazen (travelling poet-musician troupes, Atlas)'],
    ritualOrContext: 'Ahwash — communal dance of High Atlas / Souss-Massa. Men and women in facing rows or circle. Bendir + handclaps. Lyrics in Tachelhit on nature, love, history. Ahidus — collective dance/song of Middle/Eastern High Atlas tribes. Guedra — Saharan/Tuareg trance dance with earthenware drum. Moussems (saint-day fairs), harvests, weddings.',
    detail: 'The oldest continuous musical tradition in Morocco. Three categories: village (communal, open-air ring around drums + flute), ritual (agricultural calendar, marriage, evil spirit protection), and professional (imdyazen touring troupes — leader improvises poems on current affairs, accompanied by drum, rabab, clarinet; clarinettist doubles as clown). Rrways tradition of Souss: performance begins with astara (instrumental), then amarg (sung poetry), ammussu (choreographed overture), tamssust (lively song), aberdag (dance), tabbayt (accelerating finale then abrupt stop). 2021: Rrways anthology won Prix Coups de Cœur at Académie Charles Cros.',
    modernFusion: 'Timitar Festival (Agadir) showcases Amazigh music. Tamazight TV broadcasts traditional and modern forms. Young artists blend Amazigh rhythms with pop-rock, reggae, electronic. Nayda movement. Royal Institute for Amazigh Culture (IRCAM) preservation efforts.',
    lat: 32.50, lng: -5.50, color: '#22C55E',
  },
  {
    id: 'chaabi', name: 'Chaabi', arabicName: 'الشعبي',
    origin: 'Moroccan urban folk — fusion of Andalusi melody, Malhun poetry, Aita rural tradition, Amazigh rhythm, and Gnawa grooves',
    region: 'All cities — especially Casablanca, Marrakech, Rabat. Aita sub-style from Atlantic coastal plains (Doukkala-Abda, Chaouia).',
    era: '20th century crystallisation (1970s "new chaabi" as reaction to Egyptian/Lebanese pop dominance)',
    instruments: ['Violin / kamanja (lead melody)', 'Oud', 'Bendir (frame drum)', 'Taarija (small goblet drum)', 'Darbuka', 'Hadjuj (bass lute)', 'Banjo, bouzouki, electric guitar (modern additions)'],
    keyFigures: ['Nass El Ghiwane (led by Larbi Batma — "the Moroccan Rolling Stones")', 'Jil Jilala', 'Nass Marrakech (1990s fusion)', 'Hoba Hoba Spirit (rock-Gnawa)', 'Mimoun El Oujdi', 'Hanino'],
    ritualOrContext: 'Weddings, celebrations, markets, street festivals. Originally performed in souks. Now the soundtrack to all Moroccan celebrations. Aita sub-genre ("call, cry, lament") is the oldest form — slow violin prelude (lafrash) followed by sung verses.',
    detail: '"Chaabi" means "of the people" in Arabic. Morocco\'s true popular music — the sonic equivalent of street food. Blends every Moroccan tradition into danceable, community-centred performance. Buoyant 6/8 and 2/4 rhythms. Lyrics move between romance, satire, and social commentary. Call-and-response with spontaneous audience interaction. The 1970s "new chaabi" led by Nass El Ghiwane combined Amazigh music + Malhun poetry + Sufi ritual + Gnawa rhythm + Western rock/reggae + political lyrics. One band member, Abd er-Rahman Paco, was himself a Gnawa master from Essaouira.',
    modernFusion: 'Nass El Ghiwane were the most listened-to band in Morocco through the 1970s–80s. Modern chaabi infused with rap, electronic production, and global pop. Hoba Hoba Spirit bridges rock + Gnawa + reggae. Bab L\'Bluz represent the youth "Nayda" movement.',
    lat: 33.5731, lng: -7.5898, color: '#F59E0B',
  },
  {
    id: 'rai', name: 'Raï', arabicName: 'الراي',
    origin: 'Algeria (Oran) — Bedouin/rural roots, electrified 1970s–80s',
    region: 'Oujda, Al Hoceima, northeastern Morocco (strong Algerian cultural connection)',
    era: '1920s–30s rural origins; 1970s–80s electric pop raï explosion',
    instruments: ['Gasba (end-blown flute — traditional)', 'Guellal (goblet drum — traditional)', 'Synthesizer / keyboard', 'Electric guitar', 'Drum machine', 'Darbuka', 'Accordion (Oran tradition)'],
    keyFigures: ['Khaled ("King of Raï" — Algeria)', 'Cheb Mami (Algeria)', 'Cheikha Rimitti (Algeria — grandmother of raï)', 'Cheb Hasni', 'Mimoun El Oujdi (Morocco)', 'Moroccan raï scene centred in Oujda'],
    ritualOrContext: 'Dance music, nightclubs, weddings, festivals. Originally a counter-cultural voice — hedonistic celebration + aching nostalgia. The word "raï" means "opinion" or "point of view" — lyrics were often socially provocative.',
    detail: 'Algerian in origin but deeply embedded in northeastern Morocco. Oujda, on the Algerian border, is the Moroccan capital of raï. The genre evolved from rural Bedouin songs through cheikha (female singer) tradition to electric pop raï — merging acoustic melodies with synthesizers, drum machines, funk, disco, and reggae. Lyrics alternate between hedonistic celebration and aching nostalgia for home and lost love. The "cheb" (young man) / "cheba" (young woman) title replaced the older "cheikh" / "cheikha" as the genre modernised.',
    modernFusion: 'Raï-rap fusion emerging. Cross-pollination with Moroccan chaabi. Khaled\'s "Didi" (1992) became a global hit. The genre remains vibrant in Moroccan nightlife, especially the Oriental region.',
    lat: 34.6814, lng: -1.9086, color: '#EF4444',
  },
]

export interface Instrument {
  name: string
  type: 'String' | 'Percussion' | 'Wind' | 'Vocal'
  traditions: string[]
  detail: string
}

export const KEY_INSTRUMENTS: Instrument[] = [
  { name: 'Guembri / Sintir', type: 'String', traditions: ['Gnawa'], detail: 'Three-string bass lute. Skin-covered resonator. Gut strings. Played by the maalem (master). Produces deep, earthy, hypnotic tones that anchor the Gnawa sound. Similar to Hausa garaya.' },
  { name: 'Oud', type: 'String', traditions: ['Andalusi', 'Chaabi'], detail: 'Short-necked fretless lute. The "king of instruments" in Arab classical music. 11 or 13 strings. Warm, rounded tone. Essential to Andalusi nuba suites.' },
  { name: 'Rabab / Rebab', type: 'String', traditions: ['Andalusi', 'Amazigh'], detail: 'One-string (Amazigh) or two-string (Andalusi) bowed instrument. Ancestor of the European rebec. Soft, emotional sound. Souss raiss tradition.' },
  { name: 'Bendir', type: 'Percussion', traditions: ['Amazigh', 'Chaabi', 'Sufi'], detail: 'Frame drum with snare strings. Core percussion of Amazigh music. Played with fingers/palm. Made from almond/walnut wood frame + goat/rabbit skin. Drives ahwash and ahidus.' },
  { name: 'Qraqeb / Krakeb', type: 'Percussion', traditions: ['Gnawa'], detail: 'Large metal castanets (double). Iron. Played one in each hand. Sound evokes the clashing of chains — memory of slavery. Regulates tempo and induces trance.' },
  { name: 'Darbuka', type: 'Percussion', traditions: ['Andalusi', 'Chaabi', 'Raï'], detail: 'Goblet drum. Clay or metal body. Struck with both hands. Provides rhythmic foundation across urban Moroccan music.' },
  { name: 'Nay / Nair', type: 'Wind', traditions: ['Amazigh', 'Andalusi'], detail: 'End-blown reed flute. Ancient. Controls tempo in ahwash performances. Traditionally a shepherd\'s instrument.' },
  { name: 'Ghaita', type: 'Wind', traditions: ['Amazigh'], detail: 'Double-reed oboe. Loud, high-pitched. Outdoor festivals and processions only. Carries sound across mountain valleys.' },
]

export interface Festival {
  name: string
  city: string
  tradition: string
  note: string
}

export const FESTIVALS: Festival[] = [
  { name: 'Gnawa & World Music Festival', city: 'Essaouira', tradition: 'Gnawa + fusion', note: 'Est. 1997. Free. Tours to Marrakech, Casablanca, Rabat. International collaborations.' },
  { name: 'Fez Festival of Sacred Music', city: 'Fez', tradition: 'Andalusi + Sufi + world sacred', note: 'Andalusi nuba performances in historic riads and Bab al-Makina.' },
  { name: 'Timitar Festival', city: 'Agadir', tradition: 'Amazigh + world', note: 'Largest Amazigh music festival. Showcases Souss traditions alongside international acts.' },
  { name: 'Mawazine', city: 'Rabat', tradition: 'All genres', note: 'One of Africa\'s largest music festivals. Millions attend. Mix of Moroccan and global artists.' },
  { name: 'Festival of Andalusian Music', city: 'Fez / Tetouan', tradition: 'Andalusi', note: 'Dedicated to classical nuba preservation. Conservatoire ensembles.' },
  { name: 'Allegria Festival', city: 'Oujda', tradition: 'Raï + chaabi', note: 'Northeastern Morocco\'s celebration of raï music and border culture.' },
]

export const HERO_STATS = [
  { value: '5', label: 'Major traditions' },
  { value: '11', label: 'Surviving Andalusi nubat' },
  { value: '2019', label: 'Gnawa inscribed — UNESCO' },
  { value: '1,000+', label: 'Years of Malhun' },
]

export const KEY_NUMBERS = [
  { value: '24', label: 'Original nubat (Andalusi)', note: 'One for each hour of the day. 11 survive in Morocco. 16 in Algeria. 12 in Tunisia.' },
  { value: '5', label: 'Mizan per nuba', note: 'Basit → qayim wa-nisf → btayhi → darj → quddam. Slow to fast. A complete nuba lasts 6–7 hours.' },
  { value: '1591', label: 'Timbuktu campaign', note: 'Sultan Ahmad al-Mansur. Brought thousands of West Africans to Morocco. Gnawa origins.' },
  { value: '1997', label: 'Essaouira Gnawa Festival founded', note: 'Government-established. Transformed Gnawa from ceremonial to international.' },
  { value: '500,000', label: 'Najat Aatabou debut sales', note: '"J\'en ai Marre" — unprecedented for a Moroccan cassette. Amazigh music goes mainstream.' },
  { value: '1970s', label: 'Nass El Ghiwane era', note: 'Combined Gnawa + Amazigh + Malhun + rock. Most listened-to band in Morocco for two decades.' },
]
