'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════
   KNOWLEDGE — Password-Protected Private Vault
   Dancing with Lions · Not indexed
   ═══════════════════════════════════════════════════ */

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
    slug: 'the-mystique',
    title: 'The Mystique',
    subtitle: 'A map of the luminous in-between. Thin places, synchronicity, baraka, the unicorn frequency.',
    tag: 'Luminous',
    tagColor: '#C4963C',
  },
]

const F = {
  sans: "'Inter', 'Helvetica Neue', Helvetica, sans-serif",
  display: "'Georgia', 'Times New Roman', serif",
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
    if (input.toLowerCase().trim() === CORRECT) {
      localStorage.setItem(PASS_KEY, 'true')
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setInput('')
    }
  }

  if (checking) return <div style={{ minHeight: '100vh', background: '#0A0A0A' }} />

  // ── LOCKED STATE ──
  if (!unlocked) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}>
        <div style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            marginBottom: 40, fontFamily: F.sans,
          }}>
            Private
          </div>

          <h1 style={{
            fontFamily: F.display, fontSize: 'clamp(36px, 5vw, 52px)',
            fontWeight: 400, fontStyle: 'italic', color: '#fff',
            lineHeight: 1.1, marginBottom: 16,
          }}>
            Knowledge
          </h1>

          <p style={{
            fontFamily: F.sans, fontSize: 14, lineHeight: 1.7,
            color: 'rgba(255,255,255,0.4)', marginBottom: 48,
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
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: `1px solid ${error ? 'rgba(200,80,80,0.6)' : 'rgba(255,255,255,0.15)'}`,
                color: '#fff',
                fontFamily: F.sans,
                fontSize: 16,
                padding: '16px 0',
                outline: 'none',
                textAlign: 'center',
                letterSpacing: '0.1em',
              }}
            />
          </div>

          {error && (
            <p style={{
              fontFamily: F.sans, fontSize: 12, color: 'rgba(200,80,80,0.7)',
              marginTop: 8,
            }}>
              Not quite.
            </p>
          )}

          <button
            onClick={handleSubmit}
            style={{
              marginTop: 32,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: F.sans,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '14px 40px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = '#fff';
              (e.target as HTMLElement).style.color = '#0A0A0A'
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = 'transparent';
              (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)'
            }}
          >
            Enter
          </button>
        </div>
      </div>
    )
  }

  // ── UNLOCKED STATE — STORY INDEX ──
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>

      {/* Header */}
      <section style={{ padding: '140px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
          marginBottom: 32, fontFamily: F.sans,
        }}>
          Private · {STORIES.length} Stories
        </div>

        <h1 style={{
          fontFamily: F.display, fontSize: 'clamp(40px, 6vw, 64px)',
          fontWeight: 400, fontStyle: 'italic', color: '#fff',
          lineHeight: 1.05, marginBottom: 24,
        }}>
          Knowledge
        </h1>

        <p style={{
          fontFamily: F.sans, fontSize: 16, lineHeight: 1.8,
          color: 'rgba(255,255,255,0.4)', maxWidth: 520,
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
                borderTop: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.paddingLeft = '16px'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.paddingLeft = '0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <span style={{
                  fontFamily: F.sans, fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: story.tagColor, opacity: 0.8,
                }}>
                  {story.tag}
                </span>
                <span style={{
                  fontFamily: F.sans, fontSize: 10,
                  color: 'rgba(255,255,255,0.2)',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h2 style={{
                fontFamily: F.display, fontSize: 'clamp(24px, 3.5vw, 36px)',
                fontWeight: 400, fontStyle: 'italic', color: '#fff',
                lineHeight: 1.2, marginBottom: 8,
              }}>
                {story.title}
              </h2>

              <p style={{
                fontFamily: F.sans, fontSize: 14, lineHeight: 1.7,
                color: 'rgba(255,255,255,0.35)', maxWidth: 560,
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
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.15)',
            fontFamily: F.sans,
            fontSize: 11,
            letterSpacing: '0.1em',
            cursor: 'pointer',
          }}
        >
          Lock
        </button>
      </section>
    </div>
  )
}
