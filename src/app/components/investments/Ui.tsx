// components/investments/ui.tsx
'use client'
import React from 'react'

export function TableToolbar({ title, placeholder }: { title: string; placeholder: string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
      <div className="text-[15px] font-semibold text-[#2E3B2D]">{title}</div>
      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M6 12h12M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Filter
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Export
        </button>
      </div>
    </div>
  )
}

export function RiskBadge({ level }: { level: 'Low' | 'Medium' | 'High' }) {
  const map = {
    Low: 'bg-green-50 text-green-700 ring-1 ring-green-200',
    Medium: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',
    High: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
  } as const
  return <span className={`rounded-full px-2.5 py-1 text-xs ${map[level]}`}>{level}</span>
}

export function StatusBadge({ status }: { status: 'Active' | 'Closed' }) {
  return status === 'Active' ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2ECFF] px-2.5 py-1 text-xs text-[#6A5ACD]">
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs text-rose-600">
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      Closed
    </span>
  )
}

export function ActionButtons() {
  return (
    <div className="flex justify-end gap-2 text-gray-500">
      <IconBtn title="Edit">
        <path d="M4 20h4l10-10-4-4L4 16v4Z" />
      </IconBtn>
      <IconBtn title="View">
        <circle cx="12" cy="12" r="3" />
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      </IconBtn>
      <IconBtn title="Delete">
        <path d="M6 7h12M9 7v12m6-12v12M5 7l1-2h12l1 2v0a0 0 0 0 1 0 0" />
      </IconBtn>
    </div>
  )
}

function IconBtn({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <button
      title={title}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        {children}
      </svg>
    </button>
  )
}
