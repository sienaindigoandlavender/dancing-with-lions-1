// ══════════════════════════════════════════════════
// FROM THE LAND OF THE SETTING SUN — DATA
// The Amazigh in the Bible
// Module 125
// ══════════════════════════════════════════════════

// ── THE NAMES ──
// What the Bible calls the Imazighen

export interface BiblicalName {
  hebrew: string
  transliteration: string
  meaning: string
  modernEquivalent: string
  detail: string
}

export const NAMES: BiblicalName[] = [
  { hebrew: 'להָבַים', transliteration: 'Lehabim', meaning: 'Flames / Dry land', modernEquivalent: 'Libyans / Berbers', detail: 'Genesis 10:13. In the Table of Nations, Mizraim (Egypt) fathers the Lehabim. This places them in the genealogy of the world — a people born alongside Egypt, occupying the land to its west. Scholars identify the Lehabim as the ancestors of the Lubim and the modern Amazigh.' },
  { hebrew: 'לוּבִים', transliteration: 'Lubim', meaning: 'Inhabitants of a dry region', modernEquivalent: 'Libyans / Berbers / Tuareg', detail: 'The plural form. They appear as warriors in multiple passages — in Sheshonq\'s army sacking Jerusalem (2 Chronicles 12:3), as allies of Cush (2 Chronicles 16:8), as helpers of Thebes (Nahum 3:9). The Hebrew root derives from a word meaning "to thirst" — desert dwellers. The Egyptian inscriptions call them Rebu or Lebu. The same people.' },
  { hebrew: 'פוּט', transliteration: 'Phut / Put', meaning: 'A bow (weaponry)', modernEquivalent: 'Western North Africa / Berber lands', detail: 'Genesis 10:6. Phut is listed as a son of Ham, brother of Mizraim (Egypt), Cush (Ethiopia), and Canaan. Jeremiah 46:9 and Ezekiel 38:5 reference Put as warriors and shield-bearers. A people defined by their skill in war.' },
]

// ── SCRIPTURE REFERENCES ──

export interface ScriptureRef {
  book: string
  chapter: string
  verse: string
  text: string
  context: string
  era: string
  type: 'warriors' | 'genealogy' | 'prophecy' | 'gospel' | 'early_church'
}

export const SCRIPTURES: ScriptureRef[] = [
  // Genealogy
  { book: 'Genesis', chapter: '10', verse: '6', text: 'The sons of Ham: Cush, Mizraim, Put, and Canaan.', context: 'The Table of Nations. Put — the land west of Egypt — is placed among the founding peoples of the earth. Brother of Egypt and Ethiopia.', era: 'Creation narrative', type: 'genealogy' },
  { book: 'Genesis', chapter: '10', verse: '13', text: 'Mizraim fathered Ludim, Anamim, Lehabim, Naphtuhim...', context: 'The Lehabim — the Lubim — appear in the genealogy of humanity. A people named before Rome, before Greece, before Carthage.', era: 'Creation narrative', type: 'genealogy' },
  // Warriors — Sheshonq
  { book: '1 Kings', chapter: '14', verse: '25–26', text: 'In the fifth year of King Rehoboam, Shishak king of Egypt came up against Jerusalem. He took away the treasures of the house of the LORD and the treasures of the king\'s house.', context: 'Shishak is Sheshonq I — a Meshwesh Libyan, an Amazigh. He plunders Solomon\'s temple and palace. The treasures of Israel carried to Egypt by a Berber pharaoh.', era: '~925 BCE', type: 'warriors' },
  { book: '2 Chronicles', chapter: '12', verse: '3', text: 'With 1,200 chariots and 60,000 horsemen. And the people were without number who came with him from Egypt — the Lubim, the Sukkiim, and the Cushites.', context: 'The Lubim are named explicitly. They are in the army. They are the warriors from the land west of Egypt — the Maghreb — marching on Jerusalem.', era: '~925 BCE', type: 'warriors' },
  // Warriors — Zerah
  { book: '2 Chronicles', chapter: '16', verse: '8', text: 'Were not the Cushites and the Lubim a huge army with very many chariots and horsemen?', context: 'A reminder of the Lubim\'s military power. A "huge army" — the Hebrew text emphasises size and force.', era: '~900 BCE', type: 'warriors' },
  // Nahum — Fall of Thebes
  { book: 'Nahum', chapter: '3', verse: '9', text: 'Cush was her strength, and Egypt, and it was boundless; Put and the Lubim were her helpers.', context: 'The fall of Thebes. Even in destruction, the Lubim are named as the power behind power — helpers, allies, the military backbone of North Africa.', era: '~663 BCE (fall of Thebes)', type: 'prophecy' },
  // Jeremiah — Put as warriors
  { book: 'Jeremiah', chapter: '46', verse: '9', text: 'Advance, O horses, and rage, O chariots! Let the warriors go out: men of Cush and Put who handle the shield...', context: 'Put — the warriors from the Maghreb — are shield-bearers. A martial people. This is how the Hebrew prophets see them: soldiers.', era: '~605 BCE', type: 'prophecy' },
  // Ezekiel
  { book: 'Ezekiel', chapter: '30', verse: '5', text: 'Cush, and Put, and Lud, and all the mingled people...', context: 'Ezekiel\'s prophecy against Egypt names Put alongside Cush. The "mingled people" may refer to the diverse nomadic tribes of the Sahara — the ancestors of the Tuareg.', era: '~587 BCE', type: 'prophecy' },
  { book: 'Ezekiel', chapter: '38', verse: '5', text: 'Persia, Cush, and Put are with them, all of them with shield and helmet.', context: 'In the prophecy of Gog and Magog, Put appears again as warriors — always warriors — carrying shields and helmets.', era: 'Prophetic', type: 'prophecy' },
  // Daniel
  { book: 'Daniel', chapter: '11', verse: '43', text: 'The Libyans and the Cushites shall follow in his train.', context: 'Daniel\'s prophecy. The Libyans — Lubim — appear in the end-times narrative. Present at the beginning of the Bible, present at its prophetic end.', era: 'Prophetic', type: 'prophecy' },
  // New Testament
  { book: 'Mark', chapter: '15', verse: '21', text: 'They compelled a passerby, Simon of Cyrene, who was coming in from the country, the father of Alexander and Rufus, to carry his cross.', context: 'The man who carried the cross of Jesus was from Cyrene — in modern Libya. A city in the Maghreb. The father of Alexander and Rufus — named because the early church knew them.', era: '~33 CE', type: 'gospel' },
  { book: 'Acts', chapter: '2', verse: '10', text: '...the parts of Libya near Cyrene...', context: 'At Pentecost — the birth of the church — people from Amazigh Libya are present. They hear the gospel in the first hour.', era: '~33 CE', type: 'early_church' },
  { book: 'Acts', chapter: '11', verse: '20', text: 'Some of them, men of Cyprus and Cyrene, who on coming to Antioch spoke to the Hellenists also, preaching the Lord Jesus.', context: 'Men from Cyrene bring the gospel to Antioch — where followers of Jesus are first called "Christians." The word "Christian" exists because North Africans carried the message.', era: '~40s CE', type: 'early_church' },
  { book: 'Acts', chapter: '13', verse: '1', text: 'Now there were in the church at Antioch prophets and teachers: Barnabas, Simeon who was called Niger, Lucius of Cyrene...', context: 'Lucius of Cyrene — from the Maghreb — is named as a prophet and teacher in the church at Antioch. From the land of the setting sun to the first centres of Christian thought.', era: '~40s CE', type: 'early_church' },
]

// ── THE PEOPLE ──

export interface Person {
  name: string
  dates: string
  origin: string
  coords: [number, number]
  role: string
  detail: string
  type: 'biblical' | 'pope' | 'theologian'
}

export const PEOPLE: Person[] = [
  // Biblical
  { name: 'Sheshonq I (Shishak)', dates: '~943–922 BCE', origin: 'Bubastis, Egypt (Meshwesh Libyan)', coords: [31.5, 30.7], role: 'Pharaoh of Egypt, founder of the 22nd Dynasty', detail: 'A Meshwesh Libyan — Amazigh — who became Pharaoh. His invasion of Jerusalem in ~925 BCE is recorded in both the Hebrew Bible (1 Kings 14:25) and the Bubastite Portal at Karnak. He brought the Lubim warriors with him. The treasures of Solomon\'s temple went to Egypt in the hands of a Berber king.', type: 'biblical' },
  { name: 'Simon of Cyrene', dates: '~1st century CE', origin: 'Cyrene, Libya', coords: [21.86, 32.82], role: 'Carried the cross of Jesus', detail: 'Mark names him specifically: "the father of Alexander and Rufus." The early church knew his family. He was coming "from the country" — from outside the city — when Roman soldiers compelled him. A man from the Maghreb, walking into Jerusalem, asked to carry the weight of the central event in Christian history.', type: 'biblical' },
  { name: 'Lucius of Cyrene', dates: '~1st century CE', origin: 'Cyrene, Libya', coords: [21.86, 32.82], role: 'Prophet and teacher, early church at Antioch', detail: 'Named in Acts 13:1 as one of the prophets and teachers at Antioch. Some early traditions identify him as the first bishop of Antioch. From the land of the setting sun to the leadership of the church where the word "Christian" was coined.', type: 'biblical' },
  // Theologians
  { name: 'Tertullian', dates: '~155–220 CE', origin: 'Carthage, Tunisia', coords: [10.17, 36.8], role: 'Father of Latin Christianity', detail: 'Born in Carthage to Berber parents. Created the Latin theological vocabulary still used today. Coined the word "Trinity" (trinitas). Before Tertullian, Christian theology was written in Greek. After him, it was Latin. He invented the language of Western Christianity.', type: 'theologian' },
  { name: 'Cyprian', dates: '~210–258 CE', origin: 'Carthage, Tunisia', coords: [10.17, 36.8], role: 'Bishop of Carthage, martyr', detail: 'Wealthy Berber convert. Became bishop of Carthage. Wrote foundational texts on church unity and the authority of bishops. Beheaded during the persecution of Valerian. His last words: "Thanks be to God."', type: 'theologian' },
  { name: 'Augustine of Hippo', dates: '354–430 CE', origin: 'Thagaste (Souk Ahras), Algeria', coords: [7.95, 36.28], role: 'Most influential theologian in Western Christianity', detail: 'Born in Thagaste — now Souk Ahras, Algeria. "Souk Ahras" means "market of lions" in Arabic-Berber. His mother Monica was Berber. He called himself "an African, writing of Africa." Wrote Confessions and City of God. Shaped Western philosophy for 1,500 years. Scholars generally agree he was of Berber descent.', type: 'theologian' },
  // Popes
  { name: 'Pope Victor I', dates: '189–199 CE', origin: 'Roman province of Africa (Libya/Tunisia)', coords: [10.0, 34.0], role: '14th Pope — first from the Maghreb', detail: 'Believed to be of Berber origin. Established Easter as a Sunday celebration. Introduced Latin as the church\'s liturgical language, replacing Greek. A Berber from the Maghreb changed the language of Christianity itself.', type: 'pope' },
  { name: 'Pope Miltiades', dates: '311–314 CE', origin: 'North Africa (Berber descent)', coords: [12.0, 33.5], role: '32nd Pope — "Melchiades the African"', detail: 'Called "Melchiades the African." Of Berber descent per the Liber Pontificalis. The first pope under Constantine. Received the gift of the Empress Fausta\'s palace — which became the Lateran Palace, the papal residence. Granted permission to build the Lateran Basilica, "the mother of all churches." A Berber built the pope\'s house.', type: 'pope' },
  { name: 'Pope Gelasius I', dates: '492–496 CE', origin: 'Rome (North African descent)', coords: [12.5, 41.9], role: '49th Pope — first called "Vicar of Christ"', detail: 'Of North African Berber descent, born in Rome. The first pope officially titled "Vicar of Christ." Wrote the Doctrine of the Two Swords — separating church and state — the framework that shaped Western political philosophy for a thousand years. Also established Valentine\'s Day on February 14. A Berber descendant defined how the West understands power.', type: 'pope' },
]

// ── EGYPTIAN NAMES FOR THE AMAZIGH ──

export interface EgyptianName { name: string; period: string; detail: string }

export const EGYPTIAN_NAMES: EgyptianName[] = [
  { name: 'Tehenu', period: 'Old Kingdom (~2686–2181 BCE)', detail: 'The earliest Egyptian name for their western neighbours. Depicted in temple reliefs at Abydos and Sahure.' },
  { name: 'Temehu', period: 'Old-Middle Kingdom', detail: 'A second term, possibly referring to a different tribal grouping or region.' },
  { name: 'Rebu / Lebu', period: 'New Kingdom (~1550–1070 BCE)', detail: 'The source of the word "Libya." First appears in the reign of Ramesses II. The Rebu attacked Egypt multiple times before being absorbed into its military.' },
  { name: 'Meshwesh', period: 'New Kingdom–Third Intermediate', detail: 'The tribe of Sheshonq I. The Meshwesh settled in the Nile Delta, rose through the military, and eventually took the throne. Scholars connect "Meshwesh" to "Mazyes" (Herodotus) and "Imazighen" — the name the Berbers use for themselves.' },
]

// ── TIMELINE ──

export interface TimelineEvent { year: string; sortYear: number; title: string; detail: string; type: 'ancient' | 'biblical' | 'church' | 'theological' }

export const TIMELINE: TimelineEvent[] = [
  { year: '~2600 BCE', sortYear: -2600, title: 'First Libyan revolt against Egypt', detail: 'Under Pharaoh Necherophes (3rd Dynasty), the Libyans revolt. The earliest recorded military action by the peoples west of the Nile.', type: 'ancient' },
  { year: '~1250 BCE', sortYear: -1250, title: 'Rebu attack Egypt', detail: 'The Rebu (Libyans) attack Egypt in the reign of Merneptah. They are defeated but not destroyed. They begin settling in the Nile Delta.', type: 'ancient' },
  { year: '~1000 BCE', sortYear: -1000, title: 'Meshwesh gain power', detail: 'Meshwesh chiefs become hereditary military commanders in the Delta. The title passes from father to son. They are Egyptianised but not Egyptian.', type: 'ancient' },
  { year: '943 BCE', sortYear: -943, title: 'Sheshonq takes the throne', detail: 'A Meshwesh Libyan becomes Pharaoh. Founds the 22nd Dynasty. The Bible will call him Shishak.', type: 'biblical' },
  { year: '~925 BCE', sortYear: -925, title: 'Sheshonq invades Jerusalem', detail: '1 Kings 14:25. "Shishak king of Egypt came up against Jerusalem." With him: the Lubim. The treasures of Solomon\'s temple and royal palace are carried to Egypt.', type: 'biblical' },
  { year: '~663 BCE', sortYear: -663, title: 'Fall of Thebes', detail: 'Nahum 3:9: "Put and the Lubim were her helpers." The Amazigh named in the prophets.', type: 'biblical' },
  { year: '~33 CE', sortYear: 33, title: 'Simon of Cyrene carries the cross', detail: 'Mark 15:21. A man from the Maghreb carries the cross of Jesus through Jerusalem. Named. His sons named. The church remembered him.', type: 'biblical' },
  { year: '~33 CE', sortYear: 34, title: 'Pentecost — Libyans present', detail: 'Acts 2:10. People from "the parts of Libya near Cyrene" are at the birth of the church.', type: 'church' },
  { year: '~40s CE', sortYear: 45, title: 'Men of Cyrene bring gospel to Antioch', detail: 'Acts 11:20. North Africans preach to Hellenists in Antioch — where followers of Jesus are first called "Christians."', type: 'church' },
  { year: '189 CE', sortYear: 189, title: 'Pope Victor I', detail: 'The first North African pope. Changes the church\'s language from Greek to Latin. Establishes Easter on Sunday.', type: 'church' },
  { year: '~200 CE', sortYear: 200, title: 'Tertullian coins "Trinity"', detail: 'A Berber from Carthage invents the Latin theological vocabulary. The word "Trinity" — trinitas — is his. Before him, theology was Greek. After him, it is Latin.', type: 'theological' },
  { year: '258 CE', sortYear: 258, title: 'Cyprian martyred', detail: 'The Bishop of Carthage, a Berber, is beheaded during Valerian\'s persecution. "Thanks be to God."', type: 'church' },
  { year: '311 CE', sortYear: 311, title: 'Pope Miltiades — "the African"', detail: 'A Berber pope presides over Christianity becoming legal. Constantine gives him the palace that becomes the Lateran — the papal residence for a thousand years.', type: 'church' },
  { year: '354 CE', sortYear: 354, title: 'Augustine born in Thagaste', detail: 'Born in what is now Souk Ahras, Algeria. "Market of lions." His mother Monica is Berber. He will become the most influential Christian thinker after Paul.', type: 'theological' },
  { year: '386 CE', sortYear: 386, title: 'Augustine converts', detail: 'In a garden in Milan, a Berber from Algeria experiences the conversion that will shape Western thought for 1,500 years. He returns to North Africa and never leaves again.', type: 'theological' },
  { year: '430 CE', sortYear: 430, title: 'Augustine dies', detail: 'Dies in Hippo Regius (Annaba, Algeria) as the Vandals besiege the city. The last of the great North African church fathers.', type: 'theological' },
  { year: '492 CE', sortYear: 492, title: 'Pope Gelasius I', detail: 'Of North African descent. The first "Vicar of Christ." His Doctrine of the Two Swords separates church and state — the framework of Western political philosophy.', type: 'church' },
]

export const BIBLIOGRAPHY = [
  'Genesis 10:6, 10:13. Table of Nations.',
  '1 Kings 14:25–26. Shishak\'s invasion of Jerusalem.',
  '2 Chronicles 12:3, 16:8. The Lubim as warriors.',
  'Nahum 3:9. Put and Lubim as helpers of Thebes.',
  'Jeremiah 46:9. Put as shield-bearers.',
  'Ezekiel 30:5, 38:5. Put in prophecy.',
  'Daniel 11:43. Libyans in end-times prophecy.',
  'Mark 15:21; Matthew 27:32; Luke 23:26. Simon of Cyrene.',
  'Acts 2:10, 11:20, 13:1. Libyans in the early church.',
  'Strong\'s Hebrew 3864: Lubim. Biblical concordance.',
  'Ziani, N. (2020). The Berbers in the Bible: Their Origins, their Life and their Future.',
  'Brown, P. (1967). Augustine of Hippo: A Biography. University of California Press.',
  'Aleteia (2024). The three African Popes: Heroes of the Catholic Church.',
  'Liber Pontificalis. Papal biographies, compiled from 5th century.',
  'Kitchen, K.A. (1996). The Third Intermediate Period in Egypt (1100–650 BC). Warminster.',
]
