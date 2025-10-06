// components/UsersTabs.tsx
'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { cn } from './ui'

const tabs = ['all', 'active', 'inactive', 'suspended'] as const
export type UsersTab = typeof tabs[number]

export default function UsersTabs() {
  const params = useSearchParams()
  const pathname = usePathname()
  const current = (params.get('tab') ?? 'all') as UsersTab

  return (
    <div className="flex gap-2">
      {tabs.map((t) => {
        const href = `${pathname}?tab=${t}`
        const active = current === t
        return (
          <Link
            key={t}
            href={href}
            scroll={false}
            className={cn(
              'rounded-full px-3.5 py-2 text-sm',
              active ? 'bg-[#EAF5DD] text-[#6EA83F]' : 'bg-neutral-100 text-neutral-600 hover:text-neutral-800'
            )}
          >
            {label(t)}
          </Link>
        )
      })}
    </div>
  )
}

function label(t: UsersTab) {
  if (t === 'all') return 'All users'
  return t[0].toUpperCase() + t.slice(1)
}
