'use client'

import React, { type PropsWithChildren } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'brand' | 'muted'
}) {
  const map: Record<string, string> = {
    neutral: 'bg-gray-100 text-gray-700',
    success: 'bg-green-50 text-green-700 ring-1 ring-green-200',
    warning: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',
    danger: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
    brand: 'bg-[#E8F3DC] text-[#476E31] ring-1 ring-[#CFE7B9]',
    muted: 'bg-gray-50 text-gray-500',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${map[tone]}`}>
      {children}
    </span>
  )
}

export function Toolbar() {
  return (
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
  )
}

export function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,.04)]">
      <div className="mb-4 text-[15px] font-semibold text-[#2E3B2D]">{title}</div>
      {children}
    </div>
  )
}

/** ✅ FIX: accept and render `children` */
export function GridHeader({
  cols,
  className = '',
  children,
}: PropsWithChildren<{
  cols: string
  className?: string
}>) {
  return (
    <div
      className={[
        ' grid gap-4 w-full border-b border-red-800 border-gray-50/60  px-4 py-3 text-xs font-medium text-gray-500',
        cols,
        className,
      ].join(' ')}  
    >
      {children}
    </div>
  )
}

export function GridRow({
  cols,
  children,
}: {
  cols: string
  children: React.ReactNode
}) {
  return (
    <div className={`grid ${cols} items-center gap-4 border-b border-gray-100 px-4 py-4 last:border-0`}>
      {children}
    </div>
  )
}

export function Tabs({ id }: { id: string }) {
  const pathname = usePathname()
  const base = `/users/${id}`

  const tabs = [
    { href: `${base}/kyc`, label: 'KYC' },
    { href: `${base}/finance`, label: 'Finance Details' },
    { href: `${base}/referrals`, label: 'Referrals' },
    { href: `${base}/personal-savings`, label: 'Personal Savings' },
    { href: `${base}/group-savings`, label: 'Group savings' },
    { href: `${base}/investments`, label: 'Investments' },
  ]

  return (
    <div className="mt-5 border-t border-gray-100 pt-3">
      <div className="flex gap-2">
        {tabs.map((t) => {
          const active = pathname.startsWith(t.href)
          return (
            <Link
              key={t.href}
              href={t.href}
              className={[  
                'rounded-lg px-3.5 py-2 text-sm',
                active ? 'bg-[#E8F3DC] text-[#476E31] ring-1 ring-[#CFE7B9]' : 'text-gray-600 hover:bg-gray-100',
              ].join(' ')}
            >
              {t.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
