import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Where 17.4 Million Tourists Go — Embed — Dancing with Lions',
  robots: { index: false, follow: false },
}

const SOURCES = [
  { label: 'France', value: 2.4, color: '#48BFE3' },
  { label: 'Spain', value: 1.5, color: '#F77F00' },
  { label: 'UK', value: 1.0, color: '#E63946' },
  { label: 'Germany', value: 0.8, color: '#FCBF49' },
  { label: 'Italy', value: 0.6, color: '#72EFDD' },
  { label: 'USA', value: 0.4, color: '#5E60CE' },
  { label: 'Belgium', value: 0.35, color: '#F4845F' },
  { label: 'Netherlands', value: 0.3, color: '#64DFDF' },
  { label: 'Gulf States', value: 0.25, color: '#7B2D8E' },
  { label: 'Other', value: 1.2, color: '#525252' },
]

const DESTINATIONS = [
  { label: 'Marrakech', pct: 40, color: '#E63946' },
  { label: 'Agadir', pct: 20, color: '#F77F00' },
  { label: 'Casablanca', pct: 11, color: '#FCBF49' },
  { label: 'Tangier', pct: 6, color: '#48BFE3' },
  { label: 'Fes', pct: 5, color: '#72EFDD' },
  { label: 'Rabat', pct: 4, color: '#64DFDF' },
  { label: 'Essaouira', pct: 3, color: '#F4845F' },
  { label: 'Other', pct: 11, color: '#525252' },
]

const maxSource = Math.max(...SOURCES.map(s => s.value))

export default function TourismEmbedPage() {
  return (
    <div style={{
      background: '#ffffff', color: '#0a0a0a', fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      padding: '16px', minHeight: '100%',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
        <div>
          <p style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#737373', margin: 0 }}>
            Dancing with Lions · Tourism Intelligence
          </p>
          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '22px', fontStyle: 'italic', margin: '4px 0 0' }}>
            Where 17.4M Tourists Go
          </p>
        </div>
        <a href="https://dancingwithlions.com/data/tourism-flow" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: '9px', color: '#737373', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          Full interactive →
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Source countries */}
        <div>
          <p style={{ fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#737373', margin: '0 0 8px' }}>
            Where they come from
          </p>
          {SOURCES.map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '8px', color: '#737373', width: '60px', textAlign: 'right' }}>{s.label}</span>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ width: `${(s.value / maxSource) * 100}%`, height: '100%', background: s.color, opacity: 0.7 }} />
              </div>
              <span style={{ fontSize: '8px', color: s.color, width: '30px' }}>{s.value}M</span>
            </div>
          ))}
        </div>

        {/* Destinations */}
        <div>
          <p style={{ fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#737373', margin: '0 0 8px' }}>
            Where they go
          </p>
          {DESTINATIONS.map(d => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '8px', color: '#737373', width: '60px', textAlign: 'right' }}>{d.label}</span>
              <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ width: `${(d.pct / 40) * 100}%`, height: '100%', background: d.color, opacity: 0.7 }} />
              </div>
              <span style={{ fontSize: '8px', color: d.color, width: '25px' }}>{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* The split bar */}
      <div style={{ display: 'flex', height: '6px', marginTop: '12px', overflow: 'hidden' }}>
        <div style={{ width: '51%', background: '#48BFE3', opacity: 0.6 }} />
        <div style={{ width: '49%', background: '#3A0CA3', opacity: 0.6 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
        <span style={{ fontSize: '7px', color: '#a3a3a3' }}>8.8M Foreign (51%)</span>
        <span style={{ fontSize: '7px', color: '#a3a3a3' }}>8.6M Diaspora (49%)</span>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <p style={{ fontSize: '8px', color: '#a3a3a3', margin: 0 }}>
          © {new Date().getFullYear()} Dancing with Lions. All rights reserved.
        </p>
        <p style={{ fontFamily: "Georgia, serif", fontStyle: 'italic', fontSize: '9px', color: '#E63946', margin: 0 }}>
          Source: Dancing with Lions
        </p>
      </div>
    </div>
  )
}
