'use client'

import * as React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

/* ---------------------- mock data ---------------------- */
const kpis = [
  { label: 'Total Rewards', value: '₦8,000', delta: '+2.5%' },
  { label: 'Total Referrals', value: '20,450', delta: '+12.5%' },
  { label: 'Total Referrers', value: '320', delta: '+4.2%' },
  { label: 'Active Campaigns', value: '6', delta: '+1' },
]

const trend = [
  { m: 'Jan', v: 54000 },
  { m: 'Feb', v: 68000 },
  { m: 'Mar', v: 42000 },
  { m: 'Apr', v: 59000 },
  { m: 'May', v: 76000 },
  { m: 'Jun', v: 71000 },
  { m: 'Jul', v: 86000 },
  { m: 'Aug', v: 78000 },
  { m: 'Sep', v: 91000 },
  { m: 'Oct', v: 84000 },
  { m: 'Nov', v: 98000 },
  { m: 'Dec', v: 103000 },
]

const donut = [
  { name: 'Deposits', value: 35 },
  { name: 'Investments', value: 20 },
  { name: 'Savings', value: 25 },
  { name: 'Service Contribs', value: 20 },
]
const donutColors = ['#6EE7B7', '#60A5FA', '#FBBF24', '#A78BFA']

const topReferrers = [
  { name: 'Education Savings Group', count: 320, reward: '₦100K', progress: 72 },
  { name: 'Valentine’s Day Celebration', count: 220, reward: '₦70K', progress: 58 },
  { name: 'Travel Savings Group', count: 180, reward: '₦50K', progress: 44 },
]

/* ---------------------- tiny UI bits ---------------------- */
function Card({
  title,
  children,
  right,
  className = '',
}: {
  title: string
  children: React.ReactNode
  right?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)] ${className}`}>
      <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-4 md:px-5">
        <div className="text-[15px] font-semibold text-[#2E3B2D]">{title}</div>
        {right}
      </div>
      {children}
    </div>
  )
}

function Kpi({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 md:p-5">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#E8F3DC] text-[#476E31]">
        {/* ticket/award icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M6 3h12v12H6z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 21l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="min-w-0">
        <div className="text-xl font-semibold leading-6 tracking-tight text-[#1F2A1F]">{value}</div>
        <div className="text-[13px] text-gray-500">{label}</div>
      </div>
      {delta && <div className="ml-auto text-[12px] font-medium text-emerald-600">{delta}</div>}
    </div>
  )
}

function Chip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        'rounded-md px-2.5 py-1.5 text-xs',
        active ? 'bg-[#E8F3DC] text-[#476E31] ring-1 ring-[#CFE7B9]' : 'text-gray-600 hover:bg-gray-100',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function LegendDot({ color }: { color: string }) {
  return <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
}

/* ---------------------- page ---------------------- */
export default function ReferralsPage() {
  const [range, setRange] = React.useState<'1M' | '2M' | '6M' | '1Y'>('1M')

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Title + fake search on larger screens to match your header spacing */}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#2B3A2B]">Referrals</h1>
        <div className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 md:flex">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="m20 20-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input placeholder="Search type of Keywords" className="w-72 border-0 p-0 text-sm focus:outline-none" />
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Kpi key={k.label} {...k} />
        ))}
      </div>

      {/* Trend card */}
      <Card
        title="Referral Performance Trend"
        right={
          <div className="flex items-center gap-1">
            {(['1M', '2M', '6M', '1Y'] as const).map((k) => (
              <Chip key={k} active={range === k} onClick={() => setRange(k)}>
                {k}
              </Chip>
            ))}
          </div>
        }
      >
        <div className="h-64 w-full px-2 pb-4 pt-2 md:h-80 md:px-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gReferrals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A3E635" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#A3E635" stopOpacity={0.06} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" />
              <XAxis dataKey="m" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} width={48} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: '1px solid #E5E7EB' }}
                labelStyle={{ color: '#374151' }}
              />
              <Area type="monotone" dataKey="v" stroke="#84CC16" strokeWidth={3} fill="url(#gReferrals)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Bottom: list + donut */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column list */}
        <Card title="Top Referrers">
          <div className="divide-y divide-gray-100">
            {topReferrers.map((r) => (
              <div key={r.name} className="flex items-center gap-3 p-4">
                {/* avatar-ish icon */}
                <div className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-[#E8F3DC]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="3" stroke="#476E31" strokeWidth="1.5" />
                    <path d="M6 20a6 6 0 1112 0" stroke="#476E31" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-gray-800">{r.name}</p>
                    <p className="shrink-0 text-xs text-gray-500">{r.reward}</p>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-[#84CC16]"
                      style={{ width: `${r.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{r.count} referrals</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right column donut (spans 2 on desktop like screenshot layout mirrors) */}
        <Card title="Transaction Distribution" className="lg:col-span-2">
          <div className="grid grid-cols-1 items-center gap-6 p-4 md:grid-cols-2 md:gap-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donut}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {donut.map((_, i) => (
                      <Cell key={i} fill={donutColors[i % donutColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {donut.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <LegendDot color={donutColors[i % donutColors.length]} />
                    <span className="text-sm text-gray-700">{d.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
