
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Tabs } from '@/app/components/investments/Tabs'
import Topbar from '@/app/components/Topbar'

export default function InvestmentsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5">

      {/* KPI row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <KPICard
          iconBg="bg-[#E8F3DC]"
          iconStroke="#7FB24C"
          value="₦4.5M"
          label="Total Investments Volume"
          delta="+12.5%"
        />
        <KPICard
          iconBg="bg-[#E8F3DC]"
          iconStroke="#7FB24C"
          value="10"
          label="Active Investors"
          delta="40% Of User"
        />
        <KPICard
          iconBg="bg-[#E8F3DC]"
          iconStroke="#7FB24C"
          value="₦2M"
          label="Revenue"
          delta="+8.3%"
        />
      </div>

      {/* Add product + Tabs */}
      <div className="flex items-center justify-between">
        <Link
          href="#"
          className="inline-flex items-center gap-2 rounded-lg bg-[#6FA043] px-4 py-2 text-sm font-medium text-white hover:opacity-95"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Add Product
        </Link>
        <Tabs base="/investments" />
      </div>

      {/* Card shell for tables */}
      <div className="rounded-2xl border border-gray-100 bg-white p-0 shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        {children}
      </div>
    </div>
  )
}

/* Local tiny KPI card */
function KPICard({
  iconBg,
  iconStroke,
  value,
  label,
  delta,
}: {
  iconBg: string
  iconStroke: string
  value: string
  label: string
  delta: string
}) {
  return (
    <>
    {/* <Topbar title='Investments'/> */}
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" style={{ color: iconStroke }}>
          <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      <div className="min-w-0">
        <div className="text-[18px] font-semibold text-[#2E3B2D] leading-tight">{value}</div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
          <span className="truncate">{label}</span>
          <span className="text-[#6FA043]">↑ {delta}</span>
        </div>
      </div>
    </div>
    </>
  )
}
