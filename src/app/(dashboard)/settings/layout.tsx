'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiSettings, FiShield, FiBell, FiHome, FiCreditCard } from 'react-icons/fi'
import clsx from 'clsx'

const items = [
  { href: '/settings/general', label: 'General settings', icon: FiSettings },
  { href: '/settings/financial', label: 'Financial Settings', icon: FiCreditCard },
  { href: '/settings/security', label: 'Security', icon: FiShield },
  { href: '/settings/notification', label: 'Notification', icon: FiBell },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="mx-auto w-11/12 px-4 pb-16">
      <h1 className="pt-4 text-[28px] font-semibold tracking-[-0.02em] text-[#2f3c23]">Settings</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[260px,1fr]">
        {/* Left menu */}
        <aside className="rounded-2xl border border-[#eef0ea] bg-white/70 p-2 shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <nav className="space-y-1">
            {items.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] transition-colors',
                    active
                      ? 'bg-[#f2f6ee] text-[#6a8b3a]'
                      : 'text-[#6b7280] hover:bg-[#f7faf5]'
                  )}
                >
                  <Icon className={clsx('shrink-0', active ? 'text-[#7aa046]' : 'text-[#9aa7b1]')} />
                  <span>{label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Right content */}
        <section className="rounded-2xl border border-[#eef0ea] bg-white p-6 md:p-8 shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          {children}
        </section>
      </div>
    </div>
  )
}
