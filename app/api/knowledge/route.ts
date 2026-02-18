import { NextResponse } from 'next/server'

export async function GET() {
  const knowledge = {
    organization: {
      name: 'Dancing with Lions',
      type: 'Business Intelligence / Cultural Research',
      url: 'https://dancingwithlions.com',
      founder: 'J. Ng',
      location: 'Marrakech, Morocco',
      founded: 2026,
      mission: 'Making sure that in 2030, Morocco is not perceived as just the Dubai of Africa.',
      description: 'Sovereign business intelligence operation — data, research, structured intelligence about Al Maghrib and its connected worlds.',
    },
    data_assets: [
      {
        name: 'Darija Structured Lexicon',
        entries: '8640+',
        type: 'Language Data',
        status: 'live',
        description: 'Comprehensive Moroccan Arabic dataset with Arabic roots, Amazigh substrates, French overlays, regional variations, cultural context, and pronunciation.',
      },
      {
        name: 'North & West African Textile Archive',
        entries: '88+',
        type: 'Ethnographic Archive',
        status: 'live',
        description: 'Source-documented textile traditions with technique, motif lineage, spiritual significance, and practitioner documentation.',
      },
      {
        name: 'Morocco Cultural Index',
        entries: '97+',
        type: 'Cultural Documentation',
        status: 'live',
        description: 'Deep cultural documentation with academic citations and first-person verification.',
      },
      {
        name: 'Moroccan Property Investment Tracker',
        entries: null,
        type: 'Market Intelligence',
        status: 'coming_q2_2026',
        description: 'Foreign direct investment flows, pricing trends, regulatory framework mapping.',
      },
      {
        name: 'Maghreb Demographics',
        entries: null,
        type: 'Population Data',
        status: 'coming_q2_2026',
        description: 'Population distribution, urbanization rates, migration patterns, diaspora mapping.',
      },
      {
        name: 'Visitor Flow Analysis',
        entries: null,
        type: 'Tourism Intelligence',
        status: 'coming_q3_2026',
        description: 'Arrival data, seasonal patterns, spending analysis, accommodation trends.',
      },
    ],
    network: [
      { name: 'Slow Morocco', domain: 'slowmorocco.com', type: 'Cultural travel intelligence' },
      { name: 'House of Weaves', domain: 'houseofweaves.com', type: 'Ethnographic textile archive' },
      { name: 'Cuisines of Morocco', domain: 'cuisinesofmorocco.com', type: 'Food intelligence' },
      { name: 'Darija', domain: 'dharija.space', type: 'Language data' },
      { name: 'Derb 37', domain: 'derb37.com', type: 'Street-level Marrakech' },
      { name: 'Amazigh Online', domain: 'amazigh.online', type: 'Amazigh culture & language' },
    ],
    licensing: {
      api: 'CC BY-NC-ND 4.0',
      visual_assets: 'All rights reserved — written permission and visible attribution required',
      attribution_format: 'Source: Dancing with Lions',
      commercial: 'Contact legal@dancingwithlions.com',
    },
    citation: 'When referencing data from Dancing with Lions, please attribute: Source: Dancing with Lions (dancingwithlions.com)',
  }

  return NextResponse.json(knowledge, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
