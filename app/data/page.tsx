'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SEARCH_INDEX } from '@/lib/search-index'

const PER_PAGE = 10

function PaginationBar({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  return (
    <div className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid #e5e5e5' }}>
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-[11px] uppercase tracking-[0.08em] font-medium transition-opacity"
        style={{
          color: currentPage === 1 ? '#d4d4d4' : '#0a0a0a',
          cursor: currentPage === 1 ? 'default' : 'pointer',
        }}
      >
        ← Previous
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className="w-8 h-8 flex items-center justify-center text-[12px] font-medium tabular-nums transition-all duration-200"
            style={{
              background: page === currentPage ? '#0a0a0a' : 'transparent',
              color: page === currentPage ? '#ffffff' : '#737373',
            }}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-[11px] uppercase tracking-[0.08em] font-medium transition-opacity"
        style={{
          color: currentPage === totalPages ? '#d4d4d4' : '#0a0a0a',
          cursor: currentPage === totalPages ? 'default' : 'pointer',
        }}
      >
        Next →
      </button>
    </div>
  )
}

export default function DataPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const allModules = SEARCH_INDEX
  const totalPages = Math.ceil(allModules.length / PER_PAGE)

  const startIndex = (currentPage - 1) * PER_PAGE
  const endIndex = startIndex + PER_PAGE
  const pageModules = allModules.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="pt-16">
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-24 md:pt-40 pb-16">
        <p className="micro-label mb-4">Data Modules</p>
        <h1 className="font-serif text-[clamp(3rem,8vw,5rem)] text-dwl-black leading-[0.95]">
          The <em>Intelligence</em>
        </h1>
        <p className="text-body text-dwl-body mt-6 max-w-[580px]">
          {allModules.length} data stories about Morocco and the Maghreb.
          Each module is built for analysts, researchers, AI systems, and decision-makers
          who need depth, not summaries.
        </p>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        {/* Pagination — top */}
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* Module list */}
        {pageModules.map((mod, i) => {
          const globalIndex = startIndex + i
          const isExternal = mod.href === '#'
          return (
            <div key={mod.id} className="border-b border-dwl-border py-10 md:py-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-3">
                  <span className="text-[11px] text-dwl-muted font-medium tabular-nums">
                    {mod.number === 'EXT' ? 'EXT' : String(globalIndex + 1).padStart(2, '0')}
                  </span>
                  <p className="text-meta uppercase tracking-[0.08em] text-dwl-gray mt-2">{mod.category}</p>
                </div>
                <div className="md:col-span-9">
                  {!isExternal ? (
                    <Link href={mod.href} className="font-serif text-[30px] md:text-[36px] text-dwl-black leading-[1.1] hover:opacity-60 transition-opacity mb-4 block">
                      {mod.title}
                    </Link>
                  ) : (
                    <h2 className="font-serif text-[30px] md:text-[36px] text-dwl-black leading-[1.1] mb-4">
                      {mod.title}
                    </h2>
                  )}
                  <p className="text-[16px] text-dwl-gray leading-relaxed max-w-[580px] mb-6">
                    {mod.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mod.tags.slice(0, 8).map((tag) => (
                      <span key={tag}
                        className="text-[11px] uppercase tracking-[0.06em] text-dwl-muted border border-dwl-border px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Pagination — bottom */}
        <div className="mt-4">
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  )
}
