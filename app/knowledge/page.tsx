'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════
   KNOWLEDGE — Password-Protected Private Vault
   Dancing with Lions · Not indexed · WHITE BG
   ═══════════════════════════════════════════════════════ */

const PASS_KEY = 'dwl-knowledge-access'
const CORRECT = 'c0usc0us*2344'

interface Story {
  slug: string
  title: string
  subtitle: string
  tag: string
  tagColor: string
}

const STORIES: Story[] = [
  {
    slug: 'the-son-who-took-the-fire',
    title: 'The Son Who Took the Fire',
    subtitle: 'Menelik I travels to Jerusalem. Returns with the Ark of the Covenant. A 14th-century myth becomes the constitutional basis for 704 years of Ethiopian monarchy.',
    tag: 'Political Theology',
    tagColor: '#5C4033',
  },
  {
    slug: 'the-queen-who-did-not-kneel',
    title: 'The Queen Who Did Not Kneel',
    subtitle: 'Bilqis ruled the wealthiest trade monopoly on earth. She did not go to Jerusalem because she was smitten. She went because Solomon was building a fleet that would destroy her economy.',
    tag: 'Geopolitics',
    tagColor: '#8B4557',
  },
  {
    slug: 'what-solomon-knew',
    title: 'What Solomon Knew',
    subtitle: 'Nine domains of knowledge. One unified system. Root to star. The last map before the disciplines fractured.',
    tag: 'Knowledge Systems',
    tagColor: '#B8860B',
  },
  {
    slug: 'the-ring-and-the-smoke',
    title: 'The Ring and the Smoke',
    subtitle: 'Solomon across three religions. What each tradition kept, what each erased, and what the pattern reveals.',
    tag: 'Comparative Religion',
    tagColor: '#6B5B73',
  },
  {
    slug: 'the-stone-language',
    title: 'The Stone Language',
    subtitle: 'When the landscape has no trees, humans stack rocks. Nine cultures. Five continents. One instinct.',
    tag: 'Convergence',
    tagColor: '#8B7355',
  },
  {
    slug: 'the-mystique',
    title: 'The Mystique',
    subtitle: 'A map of the luminous in-between. Thin places, synchronicity, baraka, the unicorn frequency.',
    tag: 'Luminous',
    tagColor: '#C4963C',
  },
  {
    slug: 'the-lions-road',
    title: 'The Lion\'s Road',
    subtitle: 'How an animal that never lived in China became the guardian of its civilisation. Silk Road, Buddhism, and 2,000 years of reimagining.',
    tag: 'Cultural Intelligence',
    tagColor: '#E63946',
  },
]

const F = {
  mono: "var(--font-plex-mono), 'IBM Plex Mono', 'Courier New', monospace",
  serif: "'Instrument Serif', Georgia, serif",
}

const C = {
  bg: '#ffffff', ink: '#0a0a0a', body: '#262626', mid: '#525252',
  muted: '#737373', border: '#e5e5e5',
}

export default function KnowledgePage() {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(PASS_KEY) : null
    if (stored === 'true') setUnlocked(true)
    setChecking(false)
  }, [])

  const handleSubmit = () => {
    if (input.trim() === CORRECT) {
      localStorage.setItem(PASS_KEY, 'true')
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setInput('')
    }
  }

  if (checking) return <div style={{ minHeight: '100vh', background: C.bg }} />

  // —— LOCKED STATE ——
  if (!unlocked) {
    return (
      <div style={{
        minHeight: '100vh', background: C.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}>
        <div style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <div style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: C.muted,
            marginBottom: 40, fontFamily: F.mono,
          }}>
            Private
          </div>

          <h1 style={{
            fontFamily: F.serif, fontSize: 'clamp(36px, 5vw, 52px)',
            fontWeight: 400, fontStyle: 'italic', color: C.ink,
            lineHeight: 1.1, marginBottom: 16,
          }}>
            Knowledge
          </h1>

          <p style={{
            fontFamily: F.mono, fontSize: 14, lineHeight: 1.7,
            color: C.muted, marginBottom: 48,
          }}>
            This section is private.
          </p>

          <div style={{ position: 'relative', marginBottom: 16 }}>
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false) }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter passphrase"
              style={{
                width: '100%', background: 'transparent', border: 'none',
                borderBottom: `1px solid ${error ? 'rgba(200,80,80,0.6)' : C.border}`,
                color: C.ink, fontFamily: F.mono, fontSize: 16,
                padding: '16px 0', outline: 'none', textAlign: 'center',
                letterSpacing: '0.1em',
              }}
            />
          </div>

          {error && (
            <p style={{ fontFamily: F.mono, fontSize: 12, color: 'rgba(200,80,80,0.7)', marginTop: 8 }}>
              Not quite.
            </p>
          )}

          <button
            onClick={handleSubmit}
            style={{
              marginTop: 32, background: 'transparent',
              border: `1px solid ${C.border}`, color: C.mid,
              fontFamily: F.mono, fontSize: 11, fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '14px 40px', cursor: 'pointer', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = C.ink;
              (e.target as HTMLElement).style.color = '#fff';
              (e.target as HTMLElement).style.borderColor = C.ink
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = 'transparent';
              (e.target as HTMLElement).style.color = C.mid;
              (e.target as HTMLElement).style.borderColor = C.border
            }}
          >
            Enter
          </button>
        </div>
      </div>
    )
  }

  // —— UNLOCKED STATE — STORY INDEX ——
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>

      {/* Header */}
      <section style={{ padding: '140px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: C.muted,
          marginBottom: 32, fontFamily: F.mono,
        }}>
          Private · {STORIES.length} Stories
        </div>

        <h1 style={{
          fontFamily: F.serif, fontSize: 'clamp(40px, 6vw, 64px)',
          fontWeight: 400, fontStyle: 'italic', color: C.ink,
          lineHeight: 1.05, marginBottom: 24,
        }}>
          Knowledge
        </h1>

        <p style={{
          fontFamily: F.mono, fontSize: 15, lineHeight: 1.8,
          color: C.mid, maxWidth: 520,
        }}>
          For understanding. No agenda. The stories that live in the in-between — too luminous for the public index, too important to leave unwritten.
        </p>
      </section>

      {/* Story List */}
      <section style={{ padding: '0 24px 120px', maxWidth: 800, margin: '0 auto' }}>
        {STORIES.map((story, i) => (
          <Link
            key={story.slug}
            href={`/knowledge/${story.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <div
              style={{
                padding: '40px 0',
                borderTop: `1px solid ${C.border}`,
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '16px' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <span style={{
                  fontFamily: F.mono, fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: story.tagColor,
                }}>
                  {story.tag}
                </span>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h2 style={{
                fontFamily: F.serif, fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 400, fontStyle: 'italic', color: C.ink,
                lineHeight: 1.2, marginBottom: 8,
              }}>
                {story.title}
              </h2>

              <p style={{
                fontFamily: F.mono, fontSize: 14, lineHeight: 1.7,
                color: C.mid, maxWidth: 560,
              }}>
                {story.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* Lock button */}
      <section style={{ padding: '0 24px 80px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <button
          onClick={() => {
            localStorage.removeItem(PASS_KEY)
            setUnlocked(false)
            setInput('')
          }}
          style={{
            background: 'transparent', border: 'none',
            color: C.muted, fontFamily: F.mono,
            fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer',
            opacity: 0.4,
          }}
        >
          Lock
        </button>
      </section>
    </div>
  )
}
