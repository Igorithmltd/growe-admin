// components/investments/Tabs.tsx
'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export function Tabs({ base }: { base: string }) {
  const segment = useSelectedLayoutSegment() // "personal" | "group" | null (first child segment)
  const tabs = [
    { key: 'personal', href: `${base}/personal`, label: 'Personal Investment' },
    { key: 'group',    href: `${base}/group`,    label: 'Group Investment' },
  ]

  return (
    <div className="flex gap-2">
      {tabs.map(t => {
        const active = segment === t.key
        return (
          <Link
            key={t.key}
            href={t.href}
            scroll={false}
            className={[
              'rounded-lg px-3.5 py-2 text-sm transition',
              active
                ? 'bg-[#E8F3DC] text-[#476E31] ring-1 ring-[#CFE7B9]'
                : 'text-gray-600 hover:bg-gray-100',
            ].join(' ')}
          >
            {t.label}
          </Link>
        )
      })}
    </div>
  )
}
