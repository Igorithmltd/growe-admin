// app/admin/(dashboard)/referrals/page.tsx
'use client'

import * as React from 'react'

type Referral = {
  id: string
  dateISO: string
  dateLabel: string
  referrer: string
  referred: string
  rewardNaira: number | 'Null'
  status: 'Successful' | 'Pending' | 'Failed'
}
type RewardRow = {
  dateISO: string
  dateLabel: string
  rewardId: string
  referrer: string
  referralCode: string
  amountNaira: number
  status: 'Paid' | 'Pending' | 'Rejected'
}

const referralsSeed: Referral[] = [
  { id: 'REF123456', dateISO: '2024-01-31', dateLabel: 'Jan 31st, 2024', referrer: 'John Doe', referred: 'Jane Smith', rewardNaira: 500, status: 'Successful' },
  { id: 'REF789012', dateISO: '2024-01-31', dateLabel: 'Jan 31st, 2024', referrer: 'Daniel Dickson', referred: 'Victor Ben', rewardNaira: 500, status: 'Successful' },
  { id: 'REF345678', dateISO: '2024-01-31', dateLabel: 'Jan 31st, 2024', referrer: 'John Doe', referred: 'Chioma Charity', rewardNaira: 1500, status: 'Successful' },
  { id: 'REF1234565', dateISO: '2024-01-31', dateLabel: 'Jan 31st, 2024', referrer: 'David Lookman', referred: 'Goodluck Ben', rewardNaira: 500, status: 'Successful' },
  { id: 'REF345677', dateISO: '2024-01-31', dateLabel: 'Jan 31st, 2024', referrer: 'Jude Favvor', referred: 'Chidi Emma', rewardNaira: 500, status: 'Successful' },
  { id: 'REF345672', dateISO: '2024-01-31', dateLabel: 'Jan 31st, 2024', referrer: 'Adetutu Gift', referred: 'Queen Faith', rewardNaira: 'Null', status: 'Failed' },
]
const rewardsSeed: RewardRow[] = [
  { dateISO: '2024-01-31', dateLabel: 'Jan 31st, 2024', rewardId: 'REV123456', referrer: 'John Doe', referralCode: 'REF123456', amountNaira: 2500, status: 'Paid' },
  { dateISO: '2024-01-31', dateLabel: 'Jan 31st, 2024', rewardId: 'REV789012', referrer: 'Daniel Dickson', referralCode: 'REF789012', amountNaira: 1000, status: 'Paid' },
  { dateISO: '2024-01-31', dateLabel: 'Jan 31st, 2024', rewardId: 'REV456013', referrer: 'John Doe', referralCode: 'REF345678', amountNaira: 1000, status: 'Pending' },
]

function cn(...c: Array<string | false | undefined>) { return c.filter(Boolean).join(' ') }
function naira(n: number) { return '₦' + n.toLocaleString() }

function Pill({
  children, tone = 'muted',
}: { children: React.ReactNode; tone?: 'success' | 'warning' | 'danger' | 'muted' | 'paid' }) {
  const map = {
    success: 'bg-[#E8F3DC] text-[#476E31] ring-1 ring-[#CFE7B9]',
    warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    danger:  'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
    muted:   'bg-gray-50 text-gray-600 ring-1 ring-gray-100',
    paid:    'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  } as const
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', map[tone])}>{children}</span>
}

export default function ReferralsPage() {
  const [referrals] = React.useState<Referral[]>(referralsSeed)
  const [rewards] = React.useState<RewardRow[]>(rewardsSeed)

  // --- filter state
  const [panelOpen, setPanelOpen] = React.useState(false)
  const [statusOpen, setStatusOpen] = React.useState(false)
  const [dateOpen, setDateOpen] = React.useState(false)
  const [status, setStatus] = React.useState<null | Referral['status']>(null)
  const [dateRange, setDateRange] = React.useState<null | '24h' | '7d' | '30d' | 'custom'>(null)
  const [customFrom, setCustomFrom] = React.useState<string>('')
  const [customTo, setCustomTo] = React.useState<string>('')
  const [query, setQuery] = React.useState('')

  const closeAllMenus = () => { setStatusOpen(false); setDateOpen(false) }

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPanelOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const applyDateGuard = (dISO: string) => {
    if (!dateRange) return true
    const d = new Date(dISO).getTime()
    const now = Date.now()
    const DAY = 24 * 60 * 60 * 1000
    if (dateRange === '24h') return d >= now - DAY
    if (dateRange === '7d') return d >= now - 7 * DAY
    if (dateRange === '30d') return d >= now - 30 * DAY
    if (dateRange === 'custom') {
      if (!customFrom || !customTo) return true
      const from = new Date(customFrom + 'T00:00:00Z').getTime()
      const to = new Date(customTo + 'T23:59:59Z').getTime()
      return d >= from && d <= to
    }
    return true
  }

  const filtered = referrals.filter(r => {
    const matchStatus = !status || r.status === status
    const matchDate = applyDateGuard(r.dateISO)
    const q = query.trim().toLowerCase()
    const matchQ = !q || [r.id, r.referrer, r.referred].some(x => x.toLowerCase().includes(q))
    return matchStatus && matchDate && matchQ
  })

  const totalReferrals = referrals.length
  const totalBonus = referrals.reduce((sum, r) => sum + (typeof r.rewardNaira === 'number' ? r.rewardNaira : 0), 0)

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-5 lg:px-6">
      {/* Page Title + Search (kept minimal for this page) */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-[22px] font-semibold text-[#2E3B2D]">Referrals</h1>
        <div className="hidden md:block">
          <input
            className="w-[320px] rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none placeholder:text-gray-400"
            placeholder="Search type of Keywords"
          />
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
        <KPICard
          icon={<CircleIcon />}
          label="Total Referrals"
          value={totalReferrals.toString()}
        />
        <KPICard
          icon={<GiftIcon />}
          label="Total Referral Bonus"
          value={naira(totalBonus)}
        />
      </div>

      {/* Lead text */}
      <p className="mt-6 text-sm text-gray-500">
        Comprehensive Referral Management And Tracking
      </p>

      {/* Referrals Table Card */}
      <div className="mt-3 rounded-2xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-[15px] font-semibold text-[#2E3B2D]">Referrals</div>
          <div className="flex items-center gap-2">
            <ToolbarIconButton onClick={() => setPanelOpen(true)} label="Filter" />
            <ToolbarIconButton label="Export" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[880px] w-full text-sm">
            <thead className="bg-gray-50/60 text-xs text-gray-500">
              <tr>
                <Th className="w-10"><input type="checkbox" /></Th>
                <Th>Date</Th>
                <Th>Referral ID</Th>
                <Th>Referrer Name</Th>
                <Th>Referred User</Th>
                <Th>Reward Earned</Th>
                <Th>Status</Th>
                <Th className="text-right pr-4">Action</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, idx) => (
                <tr key={r.id} className={cn('border-b last:border-0', idx % 2 ? 'bg-white' : 'bg-white')}>
                  <Td className="w-10"><input type="checkbox" /></Td>
                  <Td>{r.dateLabel}</Td>
                  <Td className="font-medium text-gray-700">{r.id}</Td>
                  <Td>{r.referrer}</Td>
                  <Td>{r.referred}</Td>
                  <Td>{typeof r.rewardNaira === 'number' ? naira(r.rewardNaira) : '#Null'}</Td>
                  <Td>
                    {r.status === 'Successful' && <Pill tone="success">✓ Successful</Pill>}
                    {r.status === 'Pending'     && <Pill tone="warning">Pending</Pill>}
                    {r.status === 'Failed'      && <Pill tone="danger">✕ Failed</Pill>}
                  </Td>
                  <Td className="text-right pr-4">
                    <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50">
                      View
                    </button>
                  </Td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-500">
                    No referrals match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rewards table */}
      <div className="mt-6 rounded-2xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-[15px] font-semibold text-[#2E3B2D]">Referral Rewards</div>
          <div className="flex items-center gap-2">
            <ToolbarIconButton label="Filter" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[880px] w-full text-sm">
            <thead className="bg-gray-50/60 text-xs text-gray-500">
              <tr>
                <Th className="w-10"><input type="checkbox" /></Th>
                <Th>Date</Th>
                <Th>Reward ID</Th>
                <Th>Referrer Name</Th>
                <Th>Referral Code</Th>
                <Th>Amount Earned</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((rw, i) => (
                <tr key={rw.rewardId} className="border-b last:border-0">
                  <Td className="w-10"><input type="checkbox" /></Td>
                  <Td>{rw.dateLabel}</Td>
                  <Td className="font-medium text-gray-700">{rw.rewardId}</Td>
                  <Td>{rw.referrer}</Td>
                  <Td>{rw.referralCode}</Td>
                  <Td>{naira(rw.amountNaira)}</Td>
                  <Td>
                    {rw.status === 'Paid' && <Pill tone="paid">Paid</Pill>}
                    {rw.status === 'Pending' && <Pill tone="warning">Pending</Pill>}
                    {rw.status === 'Rejected' && <Pill tone="danger">Rejected</Pill>}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FILTER OVERLAY PANEL (matches your second/third images) */}
      {panelOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30"
          onClick={() => { setPanelOpen(false); closeAllMenus() }}
        >
          <div
            className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[15px] font-semibold text-[#2E3B2D]">Referral Filter</div>
              <button
                className="rounded-md p-1 text-gray-400 hover:bg-gray-50"
                onClick={() => setPanelOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Status & Date Range */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Status */}
              <div className="relative">
                <label className="mb-1 block text-xs text-gray-500">Status</label>
                <button
                  onClick={() => { setStatusOpen(v => !v); setDateOpen(false) }}
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-left text-sm"
                >
                  <span className="truncate">
                    {status ?? 'Select'}
                  </span>
                  <Chevron />
                </button>
                {statusOpen && (
                  <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-sm shadow-lg">
                    {(['Successful', 'Pending', 'Failed'] as const).map(opt => (
                      <div
                        key={opt}
                        onClick={() => { setStatus(opt); setStatusOpen(false) }}
                        className={cn(
                          'cursor-pointer px-3 py-2 hover:bg-gray-50',
                          status === opt && 'bg-gray-50'
                        )}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Range */}
              <div className="relative">
                <label className="mb-1 block text-xs text-gray-500">Date Range</label>
                <button
                  onClick={() => { setDateOpen(v => !v); setStatusOpen(false) }}
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-left text-sm"
                >
                  <span className="truncate">
                    {dateRange === '24h' && 'Last 24 Hours'}
                    {dateRange === '7d'  && 'Last 7 Days'}
                    {dateRange === '30d' && 'Last 30 Days'}
                    {dateRange === 'custom' && (customFrom && customTo ? `${customFrom} → ${customTo}` : 'Custom Range')}
                    {!dateRange && 'Select Date'}
                  </span>
                  <Chevron />
                </button>

                {dateOpen && (
                  <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-sm shadow-lg">
                    <div
                      className="cursor-pointer px-3 py-2 hover:bg-gray-50"
                      onClick={() => { setDateRange('24h'); setDateOpen(false) }}
                    >
                      Last 24 Hours
                    </div>
                    <div
                      className="cursor-pointer px-3 py-2 hover:bg-gray-50"
                      onClick={() => { setDateRange('7d'); setDateOpen(false) }}
                    >
                      Last 7 Days
                    </div>
                    <div
                      className="cursor-pointer px-3 py-2 hover:bg-gray-50"
                      onClick={() => { setDateRange('30d'); setDateOpen(false) }}
                    >
                      Last 30 Days
                    </div>
                    <div
                      className={cn(
                        'px-3 py-2',
                        dateRange === 'custom' ? 'bg-gray-50' : 'hover:bg-gray-50 cursor-pointer'
                      )}
                      onClick={() => setDateRange('custom')}
                    >
                      Custom Range
                    </div>
                    {dateRange === 'custom' && (
                      <div className="border-t border-gray-100 p-3">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="date"
                            value={customFrom}
                            onChange={(e) => setCustomFrom(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm"
                          />
                          <input
                            type="date"
                            value={customTo}
                            onChange={(e) => setCustomTo(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="mt-3">
              <label className="mb-1 block text-xs text-gray-500">Search Referral</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by user or details"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
              />
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setPanelOpen(false)}
                className="rounded-xl bg-[#6CAB3D] px-3 py-2 text-sm font-medium text-white hover:brightness-95"
              >
                Apply filters
              </button>
              <button
                onClick={() => { setStatus(null); setDateRange(null); setCustomFrom(''); setCustomTo(''); setQuery('') }}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                Reset filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function KPICard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.04)]">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E8F3DC] text-[#476E31] ring-1 ring-[#CFE7B9]">
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-lg font-semibold text-[#2E3B2D]">{value}</div>
      </div>
    </div>
  )
}

function ToolbarIconButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
    >
      {label}
      <Chevron small />
    </button>
  )
}

function Th({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <th className={cn('whitespace-nowrap px-4 py-3 text-left font-medium', className)}>{children}</th>
  )
}
function Td({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <td className={cn('whitespace-nowrap px-4 py-4 text-gray-700', className)}>{children}</td>
  )
}

function Chevron({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={cn('text-gray-400', small ? 'h-3.5 w-3.5' : 'h-4 w-4')}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function CircleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M3 9h18v11H3z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 9v11M3 9h18M8 6c0-1.1.9-2 2-2 1 0 2 .9 2 2 0 0-2 .5-4 0Zm8 0c0-1.1-.9-2-2-2-1 0-2 .9-2 2 0 0 2 .5 4 0Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
