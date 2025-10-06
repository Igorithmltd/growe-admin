'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutGrid, Users, Layers, PiggyBank, CreditCard, Share2, BarChart2, Bell, Settings, LogOut
} from 'lucide-react'

const items = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/investments', label: 'Investments', icon: Layers },
  { href: '/savings', label: 'Savings', icon: PiggyBank },
  { href: '/transactions', label: 'Transactions', icon: CreditCard },
  { href: '/referrals', label: 'Referrals', icon: Share2 },
  { href: '/reports', label: 'Reports', icon: BarChart2 },
]

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between w-[260px] bg-[#8BB464] text-white">
      <div>
        <div className="px-6 py-6 text-2xl font-bold">Growe</div>
        <nav className="px-3">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href === '/admin' && pathname === '/admin')
            return (
              <Link key={href} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2
                ${active ? 'bg-[rgba(255,255,255,0.18)]' : 'hover:bg-[rgba(255,255,255,0.12)]'}`}>
                <Icon size={18} />
                <span className="font-medium">{label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="px-3 pb-6">
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[rgba(255,255,255,0.12)] mb-2">
          <Settings size={18} /> <span className="font-medium">Settings</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[rgba(255,255,255,0.12)]">
          <LogOut size={18} /> <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
    