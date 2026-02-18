'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

interface RegionProperties {
  name: string
  name_ar: string
  population: number
  area_km2: number
  density: number
  capital: string
  urban_pct: number
}

interface RegionFeature {
  type: string
  properties: RegionProperties
  geometry: {
    type: string
    coordinates: [number, number]
  }
}

interface GeoJSONData {
  type: string
  features: RegionFeature[]
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n.toString()
}

export default function MoroccoPopulationMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<RegionProperties | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-7.09, 31.79],
      zoom: 5.2,
      minZoom: 4,
      maxZoom: 9,
      attributionControl: false,
      pitchWithRotate: false,
      dragRotate: false,
    })

    map.current.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      'bottom-left'
    )

    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-right'
    )

    map.current.on('load', () => {
      if (!map.current) return

      fetch('/data/morocco-regions.json')
        .then(res => res.json())
        .then((data: GeoJSONData) => {
          if (!map.current) return

          map.current.addSource('regions', {
            type: 'geojson',
            data: data as unknown as GeoJSON.FeatureCollection,
          })

          // Heatmap layer — soft glow behind circles
          map.current.addLayer({
            id: 'region-heat',
            type: 'heatmap',
            source: 'regions',
            paint: {
              'heatmap-weight': [
                'interpolate', ['linear'],
                ['get', 'population'],
                200000, 0.1,
                7800000, 1,
              ],
              'heatmap-intensity': 0.6,
              'heatmap-radius': [
                'interpolate', ['linear'],
                ['get', 'population'],
                200000, 30,
                7800000, 80,
              ],
              'heatmap-color': [
                'interpolate', ['linear'],
                ['heatmap-density'],
                0, 'rgba(0,0,0,0)',
                0.1, 'rgba(10,10,10,0.02)',
                0.3, 'rgba(10,10,10,0.06)',
                0.5, 'rgba(10,10,10,0.12)',
                0.7, 'rgba(10,10,10,0.22)',
                1, 'rgba(10,10,10,0.35)',
              ],
              'heatmap-opacity': 0.8,
            },
          })

          // Circle layer — sized by population
          map.current.addLayer({
            id: 'region-circles',
            type: 'circle',
            source: 'regions',
            paint: {
              'circle-radius': [
                'interpolate', ['linear'],
                ['get', 'population'],
                200000, 8,
                500000, 12,
                1800000, 18,
                3000000, 24,
                5000000, 32,
                7800000, 42,
              ],
              'circle-color': '#0a0a0a',
              'circle-opacity': 0.85,
              'circle-stroke-width': 1,
              'circle-stroke-color': '#ffffff',
              'circle-stroke-opacity': 0.3,
            },
          })

          // Population labels inside circles
          map.current.addLayer({
            id: 'region-labels',
            type: 'symbol',
            source: 'regions',
            layout: {
              'text-field': [
                'step',
                ['get', 'population'],
                '',
                400000, ['concat',
                  ['to-string', ['/', ['round', ['/', ['get', 'population'], 100000]], 10]], 'M'
                ],
              ],
              'text-size': [
                'interpolate', ['linear'],
                ['get', 'population'],
                400000, 9,
                7800000, 14,
              ],
              'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
              'text-allow-overlap': true,
              'text-ignore-placement': true,
            },
            paint: {
              'text-color': '#ffffff',
            },
          })

          // Hover interaction
          map.current.on('mouseenter', 'region-circles', (e) => {
            if (!map.current) return
            map.current.getCanvas().style.cursor = 'pointer'
            if (e.features && e.features[0]) {
              setHoveredRegion(e.features[0].properties as unknown as RegionProperties)
            }
          })

          map.current.on('mouseleave', 'region-circles', () => {
            if (!map.current) return
            map.current.getCanvas().style.cursor = ''
            setHoveredRegion(null)
          })

          // Mobile: tap
          map.current.on('click', 'region-circles', (e) => {
            if (e.features && e.features[0]) {
              setHoveredRegion(e.features[0].properties as unknown as RegionProperties)
            }
          })

          setMapLoaded(true)
        })
    })

    return () => {
      map.current?.remove()
    }
  }, [])

  return (
    <div className="relative w-full">
      {/* Map */}
      <div
        ref={mapContainer}
        className="w-full h-[500px] md:h-[700px]"
        style={{ background: '#f2f0eb' }}
      />

      {/* Legend — bottom left */}
      <div className="absolute bottom-12 left-4 md:left-6 bg-white/95 backdrop-blur-sm p-4 max-w-[200px]">
        <p className="text-[10px] uppercase tracking-[0.12em] text-dwl-gray font-medium mb-3">
          Population
        </p>
        <div className="flex items-end gap-2 mb-2">
          {[8, 14, 22, 32, 42].map((size, i) => (
            <div
              key={i}
              className="rounded-full bg-dwl-black flex-shrink-0"
              style={{ width: size, height: size }}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] text-dwl-gray">200K</span>
          <span className="text-[10px] text-dwl-gray">7.7M</span>
        </div>
      </div>

      {/* Tooltip — top right */}
      {hoveredRegion && (
        <div className="absolute top-4 right-4 md:right-6 bg-white/95 backdrop-blur-sm p-5 max-w-[280px] border border-dwl-border">
          <p className="font-serif text-[22px] text-dwl-black italic leading-tight">
            {hoveredRegion.name}
          </p>
          <p className="text-[13px] text-dwl-gray mt-1 mb-4" dir="rtl">
            {hoveredRegion.name_ar}
          </p>
          <div className="space-y-2">
            {[
              { label: 'Population', value: formatNumber(hoveredRegion.population) },
              { label: 'Density', value: `${hoveredRegion.density}/km²` },
              { label: 'Area', value: `${hoveredRegion.area_km2.toLocaleString()} km²` },
              { label: 'Urban', value: `${hoveredRegion.urban_pct}%` },
              { label: 'Capital', value: hoveredRegion.capital },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-baseline">
                <span className="text-[11px] uppercase tracking-[0.08em] text-dwl-gray">{row.label}</span>
                <span className="text-[14px] text-dwl-black font-medium tabular-nums">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f2f0eb]">
          <p className="text-[13px] text-dwl-gray uppercase tracking-[0.08em]">Loading map...</p>
        </div>
      )}
    </div>
  )
}
