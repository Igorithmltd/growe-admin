// app/admin/(dashboard)/savings/page.tsx
'use client'

import * as React from 'react'
import { UseSetAdminTitle } from "@/app/components/AdminTitleContext";

/* ------------------------------ Types & Data ------------------------------ */

type Duration = '6 Months' | '8 Months' | '1 Year'
type SavingStatus = 'Active' | 'Completed'
type WithdrawStatus = 'Pending' | 'Completed' | 'Cancel'

type PersonalSaving = {
  id: string
  user: string
  goal: string
  target: number
  saved: number
  interestPct: number
  expected: number
  startISO: string
  startLabel: string
  endISO: string
  endLabel: string
  progressPct: number
  duration: Duration
  status: SavingStatus
  withdrawStatus: WithdrawStatus
}

type BreakingSaving = {
  withdrawalId: string
  userId: string
  user: string
  goal: string
  withdrawAmount: number
  dateISO: string
  dateLabel: string
  penaltyFee: number
  netAmount: number
  goalStatus: SavingStatus | 'Active' | 'Cancel'
}

const personalSeed: PersonalSaving[] = [
  {
    id: 'PS-1',
    user: 'John Doe',
    goal: 'Rent',
    target: 800_000,
    saved: 133_000,
    interestPct: 10,
    expected: 80_000,
    startISO: '2024-01-31',
    startLabel: 'Jan 31st, 2024',
    endISO: '2025-06-30',
    endLabel: 'Jun 31st, 2025',
    progressPct: 60,
    duration: '6 Months',
    status: 'Active',
    withdrawStatus: 'Pending',
  },
  {
    id: 'PS-2',
    user: 'John Doe',
    goal: 'Vacation Fund',
    target: 500_000,
    saved: 62_500,
    interestPct: 14,
    expected: 70_000,
    startISO: '2025-02-05',
    startLabel: 'Feb 5th, 2025',
    endISO: '2025-09-05',
    endLabel: 'Sept 5th, 2025',
    progressPct: 10,
    duration: '8 Months',
    status: 'Active',
    withdrawStatus: 'Pending',
  },
  {
    id: 'PS-3',
    user: 'Daniel Dickson',
    goal: 'Tourism',
    target: 300_000,
    saved: 113_320,
    interestPct: 10,
    expected: 30_000,
    startISO: '2025-02-22',
    startLabel: 'Feb 22nd, 2025',
    endISO: '2025-09-22',
    endLabel: 'Sept 22nd, 2025',
    progressPct: 20,
    duration: '8 Months',
    status: 'Active',
    withdrawStatus: 'Pending',
  },
  {
    id: 'PS-4',
    user: 'David Lookman',
    goal: 'Tuition Fee',
    target: 400_000,
    saved: 400_000,
    interestPct: 18,
    expected: 72_000,
    startISO: '2024-01-02',
    startLabel: 'Jan 2nd, 2024',
    endISO: '2024-06-02',
    endLabel: 'Jun 2nd, 2024',
    progressPct: 20,
    duration: '1 Year',
    status: 'Completed',
    withdrawStatus: 'Completed',
  },
  {
    id: 'PS-5',
    user: 'Goodluck Ben',
    goal: 'Easter Celebration',
    target: 140_000,
    saved: 4_662,
    interestPct: 18,
    expected: 25_200,
    startISO: '2025-04-20',
    startLabel: 'Apr 2nd, 2025',
    endISO: '2024-04-24',
    endLabel: 'Apr 2nd, 2024',
    progressPct: 20,
    duration: '1 Year',
    status: 'Active',
    withdrawStatus: 'Pending',
  },
]

const breakingSeed: BreakingSaving[] = [
  {
    withdrawalId: 'WD123456789',
    userId: 'U12345',
    user: 'John Doe',
    goal: 'Rent',
    withdrawAmount: 133_000,
    dateISO: '2025-01-31',
    dateLabel: 'Jan 31st, 2025',
    penaltyFee: 6_650,
    netAmount: 126_350,
    goalStatus: 'Active',
  },
  {
    withdrawalId: 'WD123456789',
    userId: 'U12345',
    user: 'Ben Gift',
    goal: 'Rent',
    withdrawAmount: 133_000,
    dateISO: '2025-01-31',
    dateLabel: 'Jan 31st, 2025',
    penaltyFee: 6_650,
    netAmount: 126_350,
    goalStatus: 'Cancel',
  },
]

/* ---------------------------------- Utils --------------------------------- */

function cn(...a: Array<string | false | undefined>) {
  return a.filter(Boolean).join(' ')
}
const fmtNaira = (n: number) => `₦${n.toLocaleString()}`
const Chevron = ({ className = '' }: { className?: string }) => (
  <svg className={cn('h-4 w-4 text-gray-400', className)} viewBox="0 0 24 24" fill="none">
    <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

function Pill({
  children,
  tone = 'muted',
}: {
  children: React.ReactNode
  tone?: 'brand' | 'success' | 'warning' | 'danger' | 'muted'
}) {
  const map = {
    brand: 'bg-[#E8F3DC] text-[#476E31] ring-1 ring-[#CFE7B9]',
    success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    danger: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
    muted: 'bg-gray-50 text-gray-600 ring-1 ring-gray-100',
  } as const
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', map[tone])}>
      {children}
    </span>
  )
}

/** Export helper: downloads an array of rows to CSV */
function exportCSV(filename: string, rows: Array<Record<string, any>>) {
  if (!rows.length) return
  const headers = Object.keys(rows[0])
  const lines = [headers.join(',')]
  for (const r of rows) {
    lines.push(headers.map(h => JSON.stringify(r[h] ?? '')).join(','))
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

/* ------------------------------- Main Page -------------------------------- */

export default function SavingsPage() {
  const [personal] = React.useState<PersonalSaving[]>(personalSeed)
  const [breaking] = React.useState<BreakingSaving[]>(breakingSeed)

  // Filters (for Personal Savings)
  const [panelOpen, setPanelOpen] = React.useState(false)
  const [statusMenu, setStatusMenu] = React.useState(false)
  const [durationMenu, setDurationMenu] = React.useState(false)
  const [dateMenu, setDateMenu] = React.useState(false)

  const [status, setStatus] = React.useState<null | SavingStatus | 'All'>(null)
  const [withdrawStatus, setWithdrawStatus] = React.useState<null | WithdrawStatus | 'All'>(null)
  const [duration, setDuration] = React.useState<null | Duration | 'All'>(null)

  const [dateRange, setDateRange] = React.useState<null | '24h' | '7d' | '30d' | 'custom'>(null)
  const [customFrom, setCustomFrom] = React.useState('')
  const [customTo, setCustomTo] = React.useState('')
  const [query, setQuery] = React.useState('')

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPanelOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const byDateRange = (iso: string) => {
    if (!dateRange) return true
    const d = new Date(iso).getTime()
    const now = Date.now()
    const DAY = 24 * 60 * 60 * 1000
    if (dateRange === '24h') return d >= now - DAY
    if (dateRange === '7d') return d >= now - 7 * DAY
    if (dateRange === '30d') return d >= now - 30 * DAY
    if (dateRange === 'custom') {
      if (!customFrom || !customTo) return true
      const from = new Date(`${customFrom}T00:00:00Z`).getTime()
      const to = new Date(`${customTo}T23:59:59Z`).getTime()
      return d >= from && d <= to
    }
    return true
  }

  const filteredPersonal = personal.filter(row => {
    const qs = query.trim().toLowerCase()
    const qok = !qs || [row.user, row.goal].some(x => x.toLowerCase().includes(qs))
    const sok = !status || status === 'All' || row.status === status
    const wok = !withdrawStatus || withdrawStatus === 'All' || row.withdrawStatus === withdrawStatus
    const dok = !duration || duration === 'All' || row.duration === duration
    const dates = byDateRange(row.startISO)
    return qok && sok && wok && dok && dates
  })

  const exportPersonal = () => {
    exportCSV('personal-savings.csv', filteredPersonal.map(p => ({
      id: p.id,
      user: p.user,
      goal: p.goal,
      target: p.target,
      saved: p.saved,
      interestPct: p.interestPct,
      expected: p.expected,
      start: p.startLabel,
      end: p.endLabel,
      progressPct: p.progressPct,
      duration: p.duration,
      status: p.status,
      withdrawStatus: p.withdrawStatus,
    })))
  }
  const exportBreaking = () => {
    exportCSV('breaking-savings.csv', breaking.map(b => ({
      withdrawalId: b.withdrawalId,
      userId: b.userId,
      user: b.user,
      goal: b.goal,
      withdrawAmount: b.withdrawAmount,
      date: b.dateLabel,
      penaltyFee: b.penaltyFee,
      netAmount: b.netAmount,
      goalStatus: b.goalStatus,
    })))
  }

  const totalSavings = 50_000_000
  const personalSavings = 20_000_000
  const groupSavings = 30_000_000

  return (
      <div className="mx-auto max-w-[1400px] px-4 py-5 lg:px-6">
        <UseSetAdminTitle title="Savings" />
      {/* Title */}
      {/* <div className="mb-4 flex items-center justify-between">
        <h1 className="text-[22px] font-semibold text-[#2E3B2D]">Savings</h1>
        <div className="hidden md:block">
          <input
            className="w-[320px] rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none placeholder:text-gray-400"
            placeholder="Search type of Keywords"
          />
        </div>
      </div> */}

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
        <KPI label="Total Savings" value={fmtNaira(totalSavings)} />
        <KPI label="Personal Savings" value={fmtNaira(personalSavings)} />
        <KPI label="Group Savings" value={fmtNaira(groupSavings)} />
      </div>

      {/* Tabs + toolbar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button className="rounded-lg bg-[#E8F3DC] px-3.5 py-2 text-sm text-[#476E31] ring-1 ring-[#CFE7B9]">
            Personal savings
          </button>
          <button className="rounded-lg px-3.5 py-2 text-sm text-gray-600 hover:bg-gray-100">
            Group Savings
          </button>
        </div>
        <div className="flex items-center gap-2">
          <ToolbarButton onClick={() => setPanelOpen(true)} label="Filter" />
          <ToolbarButton onClick={exportPersonal} label="Export" />
        </div>
      </div>

      {/* Personal Savings table */}
      <div className="mt-3 rounded-2xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="px-4 py-3 text-[15px] font-semibold text-[#2E3B2D]">Personal Savings</div>
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full text-sm">
            <thead className="bg-gray-50/60 text-xs text-gray-500">
              <tr>
                <Th className="w-10"><input type="checkbox" /></Th>
                <Th>User Name</Th>
                <Th>Savings Name</Th>
                <Th>Target Amount</Th>
                <Th>Amount Saved</Th>
                <Th>Interest %</Th>
                <Th>Expected Interest</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Savings Progress</Th>
                <Th>Duration</Th>
                <Th>Status</Th>
                <Th>Withdrawal Status</Th>
              </tr>
            </thead>
            <tbody>
              {filteredPersonal.map((p, i) => (
                <tr key={p.id} className="border-b last:border-0">
                  <Td className="w-10"><input type="checkbox" /></Td>
                  <Td>{p.user}</Td>
                  <Td>{p.goal}</Td>
                  <Td>{fmtNaira(p.target)}</Td>
                  <Td>{fmtNaira(p.saved)}</Td>
                  <Td>{p.interestPct}%</Td>
                  <Td>{fmtNaira(p.expected)}</Td>
                  <Td>{p.startLabel}</Td>
                  <Td>{p.endLabel}</Td>
                  <Td>{p.progressPct}%</Td>
                  <Td>{p.duration}</Td>
                  <Td>
                    {p.status === 'Active' && <Pill tone="brand">✓ Active</Pill>}
                    {p.status === 'Completed' && <Pill tone="success">Completed</Pill>}
                  </Td>
                  <Td>
                    {p.withdrawStatus === 'Pending' && <Pill tone="warning">Pending</Pill>}
                    {p.withdrawStatus === 'Completed' && <Pill tone="success">Completed</Pill>}
                    {p.withdrawStatus === 'Cancel' && <Pill tone="danger">Cancel</Pill>}
                  </Td>
                </tr>
              ))}
              {filteredPersonal.length === 0 && (
                <tr>
                  <td colSpan={13} className="px-4 py-10 text-center text-sm text-gray-500">
                    No savings match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Breaking Savings */}
      <div className="mt-6 rounded-2xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-[15px] font-semibold text-[#2E3B2D]">Breaking Savings</div>
          <div className="flex items-center gap-2">
            <ToolbarButton onClick={() => setPanelOpen(true)} label="Filter" />
            <ToolbarButton onClick={exportBreaking} label="Export" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full text-sm">
            <thead className="bg-gray-50/60 text-xs text-gray-500">
              <tr>
                <Th className="w-10"><input type="checkbox" /></Th>
                <Th>Withdrawal ID</Th>
                <Th>User ID</Th>
                <Th>User Name</Th>
                <Th>Savings Goal</Th>
                <Th>Withdrawal Amount</Th>
                <Th>Date Of Withdrawal</Th>
                <Th>Penalty Fee (5%)</Th>
                <Th>Net Amount Received</Th>
                <Th>Savings Goal Status</Th>
              </tr>
            </thead>
            <tbody>
              {breaking.map(b => (
                <tr key={b.withdrawalId} className="border-b last:border-0">
                  <Td className="w-10"><input type="checkbox" /></Td>
                  <Td>{b.withdrawalId}</Td>
                  <Td>{b.userId}</Td>
                  <Td>{b.user}</Td>
                  <Td>{b.goal}</Td>
                  <Td>{fmtNaira(b.withdrawAmount)}</Td>
                  <Td>{b.dateLabel}</Td>
                  <Td>{fmtNaira(b.penaltyFee)}</Td>
                  <Td>{fmtNaira(b.netAmount)}</Td>
                  <Td>
                    {b.goalStatus === 'Active' && <Pill tone="brand">✓ Active</Pill>}
                    {b.goalStatus === 'Completed' && <Pill tone="success">Completed</Pill>}
                    {b.goalStatus === 'Cancel' && <Pill tone="danger">Cancel</Pill>}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------ Filter Overlay ----------------------------- */}
      {panelOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30"
          onClick={() => setPanelOpen(false)}
        >
          <div
            className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[15px] font-semibold text-[#2E3B2D]">Savings Filter</div>
              <button
                className="rounded-md p-1 text-gray-400 hover:bg-gray-50"
                onClick={() => setPanelOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Status */}
              <div className="relative">
                <label className="mb-1 block text-xs text-gray-500">Status</label>
                <button
                  onClick={() => {
                    setStatusMenu(s => !s)
                    setDurationMenu(false)
                    setDateMenu(false)
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-left text-sm"
                >
                  <span className="truncate">{status ?? 'Select'}</span>
                  <Chevron />
                </button>
                {statusMenu && (
                  <Menu>
                    {(['All', 'Active', 'Completed'] as const).map(opt => (
                      <MenuItem key={opt} active={status === opt} onClick={() => { setStatus(opt); setStatusMenu(false) }}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </div>

              {/* Withdrawal status */}
              <div className="relative">
                <label className="mb-1 block text-xs text-gray-500">Withdrawal Status</label>
                <button
                  onClick={() => {
                    setDurationMenu(false)
                    setDateMenu(false)
                    setStatusMenu(false)
                    // reuse statusMenu-like popup by toggling durationMenu for simplicity
                    setDurationMenu(s => !s)
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-left text-sm"
                >
                  <span className="truncate">{withdrawStatus ?? 'Select'}</span>
                  <Chevron />
                </button>
                {durationMenu && (
                  <Menu>
                    {(['All', 'Pending', 'Completed', 'Cancel'] as const).map(opt => (
                      <MenuItem key={opt} active={withdrawStatus === opt} onClick={() => { setWithdrawStatus(opt); setDurationMenu(false) }}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </div>

              {/* Duration */}
              <div className="relative">
                <label className="mb-1 block text-xs text-gray-500">Duration</label>
                <button
                  onClick={() => {
                    setDateMenu(false)
                    setStatusMenu(false)
                    setDurationMenu(s => !s)
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-left text-sm"
                >
                  <span className="truncate">{duration ?? 'Select'}</span>
                  <Chevron />
                </button>
                {durationMenu && (
                  <Menu>
                    {(['All', '6 Months', '8 Months', '1 Year'] as const).map(opt => (
                      <MenuItem key={opt} active={duration === opt} onClick={() => { setDuration(opt as any); setDurationMenu(false) }}>
                        {opt}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </div>

              {/* Date Range */}
              <div className="relative">
                <label className="mb-1 block text-xs text-gray-500">Date Range</label>
                <button
                  onClick={() => {
                    setStatusMenu(false)
                    setDurationMenu(false)
                    setDateMenu(s => !s)
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-left text-sm"
                >
                  <span className="truncate">
                    {dateRange === '24h' && 'Last 24 Hours'}
                    {dateRange === '7d' && 'Last 7 Days'}
                    {dateRange === '30d' && 'Last 30 Days'}
                    {dateRange === 'custom' && (customFrom && customTo ? `${customFrom} → ${customTo}` : 'Custom Range')}
                    {!dateRange && 'Select Date'}
                  </span>
                  <Chevron />
                </button>
                {dateMenu && (
                  <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-sm shadow-lg">
                    <MenuItem onClick={() => { setDateRange('24h'); setDateMenu(false) }}>Last 24 Hours</MenuItem>
                    <MenuItem onClick={() => { setDateRange('7d'); setDateMenu(false) }}>Last 7 Days</MenuItem>
                    <MenuItem onClick={() => { setDateRange('30d'); setDateMenu(false) }}>Last 30 Days</MenuItem>
                    <div
                      className={cn('px-3 py-2', dateRange === 'custom' ? 'bg-gray-50' : 'hover:bg-gray-50 cursor-pointer')}
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
              <label className="mb-1 block text-xs text-gray-500">Search</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by user or goal"
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
                onClick={() => {
                  setStatus(null)
                  setWithdrawStatus(null)
                  setDuration(null)
                  setDateRange(null)
                  setCustomFrom(''); setCustomTo('')
                  setQuery('')
                }}
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

/* ------------------------------ small bits ------------------------------ */

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.04)]">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E8F3DC] text-[#476E31] ring-1 ring-[#CFE7B9]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-lg font-semibold text-[#2E3B2D]">{value}</div>
      </div>
    </div>
  )
}

function ToolbarButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
    >
      {label}
      <Chevron className="-mr-0.5" />
    </button>
  )
}

function Th({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <th className={cn('whitespace-nowrap px-4 py-3 text-left font-medium', className)}>{children}</th>
}
function Td({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
  return <td className={cn('whitespace-nowrap px-4 py-4 text-gray-700', className)}>{children}</td>
}
function Menu({ children }: React.PropsWithChildren) {
  return (
    <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white text-sm shadow-lg">
      {children}
    </div>
  )
}
function MenuItem({ children, onClick, active = false }: React.PropsWithChildren<{ onClick?: () => void; active?: boolean }>) {
  return (
    <div
      className={cn('cursor-pointer px-3 py-2 hover:bg-gray-50', active && 'bg-gray-50')}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
