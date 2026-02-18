/**
 * Nexus — Shared configuration hub
 * 
 * All legal pages, footer links, site config, and copyright
 * come from the Nexus Supabase instance (primary) or
 * Nexus Google Sheet (fallback).
 * 
 * This is the single source of truth for all ecosystem sites.
 */

const NEXUS_SUPABASE_URL = process.env.NEXUS_SUPABASE_URL || ''
const NEXUS_SUPABASE_ANON_KEY = process.env.NEXUS_SUPABASE_ANON_KEY || ''
const SITE_ID = 'dancingwithlions'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

export interface LegalPage {
  page_id: string
  section_order: number
  section_title: string
  section_content: string
}

export interface SiteConfig {
  site_id: string
  site_name: string
  site_type: string
  site_url: string
  legal_entity: string
  contact_email: string
}

export interface FooterLink {
  column_number: number
  column_title: string
  link_order: number
  link_label: string
  link_href: string
  link_type: string
}

export interface PoweredBy {
  text: string
  url: string
}

// ─────────────────────────────────────────────────
// Supabase fetch helper
// ─────────────────────────────────────────────────

async function nexusFetch<T>(table: string, query: string = ''): Promise<T[]> {
  if (!NEXUS_SUPABASE_URL || !NEXUS_SUPABASE_ANON_KEY) {
    console.warn(`[Nexus] Missing Supabase credentials — returning empty for ${table}`)
    return []
  }

  try {
    const url = `${NEXUS_SUPABASE_URL}/rest/v1/${table}?${query}`
    const res = await fetch(url, {
      headers: {
        'apikey': NEXUS_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${NEXUS_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) {
      console.error(`[Nexus] Failed to fetch ${table}: ${res.status}`)
      return []
    }

    return await res.json()
  } catch (error) {
    console.error(`[Nexus] Error fetching ${table}:`, error)
    return []
  }
}

// ─────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────

/**
 * Get legal page content (Privacy, Terms, Disclaimer, IP)
 * From: nexus_legal_pages table
 */
export async function getLegalPage(pageId: string): Promise<LegalPage[]> {
  return nexusFetch<LegalPage>(
    'nexus_legal_pages',
    `page_id=eq.${pageId}&order=section_order.asc`
  )
}

/**
 * Get site configuration for this brand
 * From: nexus_sites table
 */
export async function getSiteConfig(): Promise<SiteConfig | null> {
  const results = await nexusFetch<SiteConfig>(
    'nexus_sites',
    `site_id=eq.${SITE_ID}`
  )
  return results[0] || null
}

/**
 * Get all sites in the network (for footer)
 * From: nexus_sites table
 */
export async function getNetworkSites(): Promise<SiteConfig[]> {
  return nexusFetch<SiteConfig>(
    'nexus_sites',
    'order=site_name.asc'
  )
}

/**
 * Get footer links for this brand
 * From: nexus_footer_links table
 */
export async function getFooterLinks(): Promise<FooterLink[]> {
  return nexusFetch<FooterLink>(
    'nexus_footer_links',
    `site_id=eq.${SITE_ID}&order=column_number.asc,link_order.asc`
  )
}

/**
 * Get legal page slugs available from Nexus
 */
export async function getLegalPageSlugs(): Promise<string[]> {
  const results = await nexusFetch<{ page_id: string }>(
    'nexus_legal_pages',
    'select=page_id'
  )
  const uniqueSlugs = Array.from(new Set(results.map(r => r.page_id)))
  return uniqueSlugs
}

/**
 * Resolve {{variables}} in legal page content
 * Replaces placeholders like {{site_name}}, {{contact_email}}, etc.
 */
export function resolveLegalVariables(
  content: string,
  siteConfig: SiteConfig | null
): string {
  if (!siteConfig) return content

  return content
    .replace(/\{\{site_name\}\}/g, siteConfig.site_name || 'Dancing with Lions')
    .replace(/\{\{site_url\}\}/g, siteConfig.site_url || 'https://dancingwithlions.com')
    .replace(/\{\{legal_entity\}\}/g, siteConfig.legal_entity || 'Dancing with Lions')
    .replace(/\{\{contact_email\}\}/g, siteConfig.contact_email || 'legal@dancingwithlions.com')
}
