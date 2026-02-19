import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Grows When — Embed — Dancing with Lions',
  robots: { index: false, follow: false },
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface Item { name: string; darija: string; start: number; end: number; peak: number[]; color: string }

const P: Item[] = [
  { name: 'Oranges', darija: 'Limoun', start: 10, end: 4, peak: [11,0,1,2], color: '#F77F00' },
  { name: 'Clementines', darija: 'Mandarīn', start: 10, end: 2, peak: [11,0,1], color: '#FCBF49' },
  { name: 'Lemons', darija: 'Hamd', start: 0, end: 11, peak: [11,0,1,2,3], color: '#F4D35E' },
  { name: 'Strawberries', darija: 'Frāz', start: 1, end: 5, peak: [2,3,4], color: '#E63946' },
  { name: 'Cherries', darija: 'Habb el Mlouk', start: 4, end: 6, peak: [4,5], color: '#C1121F' },
  { name: 'Blueberries', darija: 'Myrtilles', start: 3, end: 6, peak: [4,5], color: '#7B2D8E' },
  { name: 'Peaches', darija: 'Khōkh', start: 5, end: 8, peak: [6,7], color: '#FFBE0B' },
  { name: 'Apricots', darija: 'Meshmash', start: 4, end: 7, peak: [5,6], color: '#F48C06' },
  { name: 'Watermelon', darija: 'Dellāh', start: 5, end: 9, peak: [6,7,8], color: '#2DC653' },
  { name: 'Melon', darija: 'Bttīkh', start: 5, end: 9, peak: [6,7,8], color: '#80B918' },
  { name: 'Grapes', darija: "L'ʿnab", start: 6, end: 10, peak: [7,8,9], color: '#6A4C93' },
  { name: 'Figs', darija: 'Karmous', start: 6, end: 9, peak: [7,8], color: '#723C70' },
  { name: 'Prickly Pear', darija: 'Hendiya', start: 6, end: 9, peak: [7,8], color: '#F77F00' },
  { name: 'Pomegranates', darija: 'Rommān', start: 8, end: 11, peak: [9,10], color: '#E63946' },
  { name: 'Dates', darija: 'Tmar', start: 8, end: 11, peak: [9,10], color: '#6B4226' },
  { name: 'Olives', darija: 'Zītoun', start: 10, end: 1, peak: [11,0], color: '#606C38' },
  { name: 'Tomatoes', darija: 'Matīsha', start: 3, end: 10, peak: [5,6,7,8], color: '#E63946' },
  { name: 'Peppers', darija: 'Felfel', start: 4, end: 9, peak: [6,7,8], color: '#2DC653' },
  { name: 'Courgettes', darija: 'Garʿa', start: 3, end: 9, peak: [5,6,7], color: '#55A630' },
  { name: 'Aubergine', darija: 'Bādenjāl', start: 4, end: 9, peak: [6,7,8], color: '#5E548E' },
  { name: 'Green Beans', darija: 'Loubia Khadra', start: 9, end: 5, peak: [10,11,0,1,2,3], color: '#386641' },
  { name: 'Broad Beans', darija: 'Foul', start: 1, end: 5, peak: [2,3,4], color: '#A7C957' },
  { name: 'Pumpkin', darija: 'Garʿa Hamra', start: 8, end: 1, peak: [9,10,11], color: '#F77F00' },
  { name: 'Khobiza', darija: 'Khobiza', start: 11, end: 4, peak: [0,1,2,3], color: '#344E41' },
]

function inSeason(item: Item, m: number) {
  if (item.end >= item.start) return m >= item.start && m <= item.end
  return m >= item.start || m <= item.end
}

export default function EmbedPage() {
  const monthItems = MONTHS.map((_, mi) => P.filter(item => inSeason(item, mi)))

  return (
    <div style={{
      background: '#0a0a0a', color: '#fff', fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      padding: '16px', minHeight: '100%',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
        <div>
          <p style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', margin: 0 }}>
            Dancing with Lions · Cuisines of Morocco
          </p>
          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '22px', fontStyle: 'italic', margin: '4px 0 0', color: '#fff' }}>
            What Grows When
          </p>
        </div>
        <a href="https://dancingwithlions.com/data/seasonal-produce" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '9px', color: '#666', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          Full interactive →
        </a>
      </div>

      {/* Month grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.04)' }}>
        {MONTHS.map((month, mi) => {
          const items = monthItems[mi]
          const peakItems = items.filter(it => it.peak.includes(mi))

          return (
            <div key={month} style={{ background: '#0a0a0a', padding: '10px' }}>
              <p style={{ fontFamily: "Georgia, serif", fontStyle: 'italic', fontSize: '13px', margin: '0 0 6px', color: 'rgba(255,255,255,0.7)' }}>
                {month}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                {peakItems.slice(0, 6).map(item => (
                  <span key={item.name} style={{
                    fontSize: '8px', padding: '2px 5px',
                    background: `${item.color}20`, color: item.color,
                    fontWeight: 600, lineHeight: 1.4,
                  }}>
                    {item.name}
                  </span>
                ))}
                {peakItems.length > 6 && (
                  <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', padding: '2px 3px' }}>
                    +{peakItems.length - 6}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.15)', margin: 0 }}>
          © {new Date().getFullYear()} Dancing with Lions. All rights reserved.
        </p>
        <p style={{ fontFamily: "Georgia, serif", fontStyle: 'italic', fontSize: '9px', color: '#2DC653', margin: 0 }}>
          Source: Dancing with Lions
        </p>
      </div>
    </div>
  )
}
