// ─────────────────────────────────────────────────
// The Geometry of Zellige
// Module 061 — Mathematical Intelligence
// Sources: Wikipedia, Art of Islamic Pattern,
// MIT, Wolfram MathWorld, ResearchGate
// ─────────────────────────────────────────────────

export interface StarPattern {
  id: string
  points: number
  name: string
  nameAr: string
  foldSymmetry: number
  construction: string
  detail: string
  whereFound: string
  color: string
}

export const STAR_PATTERNS: StarPattern[] = [
  {
    id: 'six', points: 6, name: 'Six-Pointed Star', nameAr: 'نجمة سداسية',
    foldSymmetry: 6, construction: 'Two overlapping equilateral triangles inscribed in a circle',
    detail: 'The simplest star in zellige. Formed by overlapping two equilateral triangles — the same geometry as the Star of David, but predating that association in Islamic art. Based on the hexagonal grid, which is one of three regular tessellations. Each star generates six surrounding hexagons. Common in early Moroccan tilework.',
    whereFound: 'Bou Inania Madrasa (Fes), Saadian Tombs (Marrakech)', color: '#22C55E',
  },
  {
    id: 'eight', points: 8, name: 'Eight-Pointed Star', nameAr: 'نجمة ثمانية',
    foldSymmetry: 4, construction: 'Two squares, one rotated 45° relative to the other, inscribed in a circle',
    detail: 'Two interlocking squares create the octagram — the khatam or "seal." Produces 4-fold rotational symmetry. The gaps between stars form crosses and smaller squares. The 8-pointed star is the single most common motif in Moroccan zellige, found on virtually every significant building.',
    whereFound: 'Everywhere. Hassan II Mosque, Alhambra, Ben Youssef Madrasa', color: '#3B82F6',
  },
  {
    id: 'ten', points: 10, name: 'Ten-Pointed Star', nameAr: 'نجمة عشرية',
    foldSymmetry: 5, construction: 'Two regular pentagons, one rotated 36° relative to the other, inscribed in a circle',
    detail: 'Introduces 5-fold symmetry — which cannot tile the plane periodically. This is the gateway to quasi-periodic patterns. In 2007, physicists discovered that 15th-century Iranian girih tiles formed Penrose-like non-repeating patterns with 5-fold rotational symmetry — 500 years before Roger Penrose described them in 1973. Ten-pointed stars are less common in Moroccan zellige than in Persian tilework.',
    whereFound: 'Darj wa ktaf motifs, advanced Marinid compositions', color: '#A855F7',
  },
  {
    id: 'twelve', points: 12, name: 'Twelve-Pointed Star', nameAr: 'نجمة اثنا عشرية',
    foldSymmetry: 6, construction: 'Three squares at 30° intervals, or four equilateral triangles at 30° intervals',
    detail: 'The most complex star in Moroccan zellige. Based on the 12-fold division of the circle — the same geometry governing clock faces and the zodiac. Produces intricate surrounding polygons: hexagons, squares, and triangles interlock in patterns of remarkable density. The key generative motif for some of the most elaborate Marinid-era compositions.',
    whereFound: 'Al-Attarine Madrasa (Fes), Bahia Palace (Marrakech)', color: '#F59E0B',
  },
  {
    id: 'sixteen', points: 16, name: 'Sixteen-Pointed Star', nameAr: 'نجمة ستة عشرية',
    foldSymmetry: 4, construction: 'Four squares at 22.5° intervals inscribed in a circle',
    detail: 'The apex of complexity in zellige. 16-point stars emerged in the 16th century, at the height of Saadian power. The surrounding fill shapes become so small and numerous that a single panel can contain hundreds of hand-cut pieces. These are the showpieces — commissioned by sultans, executed over months. Extremely rare.',
    whereFound: 'Saadian Tombs (Marrakech), select royal commissions', color: '#EF4444',
  },
]

export interface SymmetryType {
  name: string
  description: string
  example: string
}

export const SYMMETRY_TYPES: SymmetryType[] = [
  { name: 'Translation', description: 'Shifting the entire pattern in a direction without rotating or flipping it. The pattern repeats identically. Every zellige tessellation has translational symmetry — this is what makes it a tessellation.', example: 'Any repeating tile grid' },
  { name: 'Rotation', description: 'Turning the pattern around a fixed point by a specific angle. In zellige, only rotations of 60°, 90°, 120°, and 180° are possible — the crystallographic restriction. This is why you see 6-fold, 4-fold, 3-fold, and 2-fold symmetries, but never 5-fold or 7-fold in periodic tilings.', example: '8-pointed star: 90° rotation' },
  { name: 'Reflection', description: 'Flipping the pattern across a mirror line. Many zellige patterns have multiple reflection axes — an 8-pointed star has 8 mirror lines. The interplay of reflection and rotation creates the visual richness.', example: 'Any star pattern has mirror lines through each point' },
  { name: 'Glide Reflection', description: 'A reflection combined with a translation along the mirror line. Subtler than pure reflection. Creates patterns that seem to "flow" in a direction while maintaining bilateral symmetry.', example: 'Interlacing ribbon motifs in the Alhambra' },
]

export interface WallpaperGroup {
  notation: string
  orbifold: string
  rotationOrder: string
  description: string
  inZellige: boolean
}

export const WALLPAPER_GROUPS: WallpaperGroup[] = [
  { notation: 'p1', orbifold: 'o', rotationOrder: '1', description: 'Translation only. No rotation, reflection, or glide reflection. The simplest possible pattern.', inZellige: true },
  { notation: 'p2', orbifold: '2222', rotationOrder: '2', description: '180° rotations only. No reflections. Four distinct rotation centers per unit cell.', inZellige: true },
  { notation: 'pm', orbifold: '**', rotationOrder: '1', description: 'Parallel mirror lines only. No rotations.', inZellige: true },
  { notation: 'pg', orbifold: 'xx', rotationOrder: '1', description: 'Parallel glide reflections only. No rotations, no pure reflections.', inZellige: true },
  { notation: 'cm', orbifold: '*x', rotationOrder: '1', description: 'Mirror lines plus glide reflections between them. Centred cell.', inZellige: true },
  { notation: 'pmm', orbifold: '*2222', rotationOrder: '2', description: 'Two perpendicular mirror lines with 180° rotations at intersections.', inZellige: true },
  { notation: 'pmg', orbifold: '22*', rotationOrder: '2', description: 'Mirror lines in one direction, glide reflections in the perpendicular, plus 180° rotations.', inZellige: true },
  { notation: 'pgg', orbifold: '22x', rotationOrder: '2', description: 'Two perpendicular glide reflections plus 180° rotations. No pure reflections.', inZellige: true },
  { notation: 'cmm', orbifold: '2*22', rotationOrder: '2', description: 'Mirror lines in two directions with 180° rotation centers. Centred cell.', inZellige: true },
  { notation: 'p4', orbifold: '442', rotationOrder: '4', description: '90° rotations. Square lattice. No reflections. The geometry behind the 8-pointed star.', inZellige: true },
  { notation: 'p4m', orbifold: '*442', rotationOrder: '4', description: '90° rotations with mirror lines. Common in Moroccan zellige.', inZellige: true },
  { notation: 'p4g', orbifold: '4*2', rotationOrder: '4', description: '90° rotations with glide reflections but no mirrors through rotation centers.', inZellige: true },
  { notation: 'p3', orbifold: '333', rotationOrder: '3', description: '120° rotations only. Hexagonal lattice. No reflections. Relatively uncommon in zellige.', inZellige: false },
  { notation: 'p3m1', orbifold: '*333', rotationOrder: '3', description: '120° rotations with mirror lines through all rotation centers.', inZellige: true },
  { notation: 'p31m', orbifold: '3*3', rotationOrder: '3', description: '120° rotations with mirrors, but not all centers on mirror lines.', inZellige: true },
  { notation: 'p6', orbifold: '632', rotationOrder: '6', description: '60° rotations. Hexagonal lattice. No reflections. The geometry of the 6-pointed star.', inZellige: true },
  { notation: 'p6m', orbifold: '*632', rotationOrder: '6', description: '60° rotations with mirror lines. Maximum symmetry. The geometry behind 12-pointed stars.', inZellige: true },
]

export interface ConstructionStep {
  step: number
  title: string
  detail: string
}

export const CONSTRUCTION: ConstructionStep[] = [
  { step: 1, title: 'The Circle', detail: 'Everything begins with a circle drawn by compass. The circle represents unity — tawhid — the indivisibility of God. All subsequent geometry is derived from this single form.' },
  { step: 2, title: 'The Division', detail: 'The circle is divided into equal parts using compass and straightedge only. Division into 4 or 8 parts: place compass at cardinal points, draw arcs. Division into 6: compass radius equals the circle\'s radius — six arcs around the circumference. Division into 5 (pentagon) requires the golden ratio.' },
  { step: 3, title: 'The Grid', detail: 'Connecting the division points creates a polygon grid — the underlying skeleton. For 4-fold: square grid. For 6-fold: hexagonal/triangular grid. This grid is invisible in the final work but determines everything.' },
  { step: 4, title: 'The Star', detail: 'Stars are formed by extending lines from grid intersections at consistent angles. The angle of intersection determines the "tightness" of the star. Wider angles create fatter, more rounded stars. Narrow angles create sharper, more pointed ones.' },
  { step: 5, title: 'The Fill', detail: 'The spaces between stars become the secondary shapes: hexagons, pentagons, bowties, kite shapes, irregular polygons. In zellige, each of these shapes is a separate hand-cut tile. A master (maalem) must know every fill shape for a given star pattern.' },
  { step: 6, title: 'The Tessellation', detail: 'The completed unit is repeated across the surface using the translational symmetry of the underlying lattice. In zellige, tiles are assembled face-down on the floor, then mortar is poured over the back. The artisan works blind — feeling the geometry.' },
]

export const COLOR_SYMBOLISM = [
  { color: 'Blue', hex: '#2563EB', meaning: 'Sky and water.  Derived from cobalt oxide. Symbolizes infinity and the divine.' },
  { color: 'Green', hex: '#16A34A', meaning: 'Paradise. The color of Islam. Derived from copper oxide. Found in mosques, madrasas, zawiyas.' },
  { color: 'White', hex: '#f5f5f5', meaning: 'Purity. The ground color. Made from tin oxide glaze over terracotta. The negative space that defines the pattern.' },
  { color: 'Black', hex: '#1a1a1a', meaning: 'Outline and definition. Manganese oxide. Used for borders and to separate color fields. The calligraphy of the tile.' },
  { color: 'Yellow', hex: '#EAB308', meaning: 'Sun and gold. Iron oxide or antimony. Common in Moroccan zellige, less so in eastern Islamic tilework. Warmth.' },
  { color: 'Brown', hex: '#92400E', meaning: 'Earth. The natural terracotta showing through. Found in early Moroccan zellige (10th–12th century) before the full palette developed.' },
]

export const HERO_STATS = [
  { value: '17', label: 'Wallpaper groups' },
  { value: '5', label: 'Star families' },
  { value: '∞', label: 'Tessellations possible' },
  { value: '6', label: 'Steps, compass & straightedge' },
]

export const KEY_FACTS = [
  { value: '10th C', label: 'Zellige origins in Morocco', note: 'White and brown tones, imitating Roman mosaics' },
  { value: '1891', label: 'Fedorov proves 17 groups', note: 'Russian crystallographer classifies all possible planar symmetries' },
  { value: '2007', label: 'Penrose tiling discovered in 15th C Islamic art', note: 'Harvard & Princeton physicists find quasi-crystals in girih tiles' },
  { value: 'p4m', label: 'Most common zellige group', note: '90° rotations + mirror lines. The 8-pointed star symmetry.' },
  { value: '0', label: 'Living figures depicted', note: 'Islamic art avoids figural representation. Geometry fills the void.' },
  { value: '1', label: 'Tool: the compass', note: 'Every pattern can be constructed with compass and straightedge alone' },
]
