'use client'

import { useMemo, useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/* ---------- Types & mock data (swap with your API later) ---------- */
type TxType = 'deposit' | 'withdrawal' | 'transfer' | 'investment'
type TxStatus = 'successful' | 'pending' | 'failed'
type Tx = {
  id: string
  date: string // ISO
  user: string
  email: string
  type: TxType
  method: 'Bank' | 'Card' | 'USSD' | 'Wallet'
  amount: number
  reference: string
  status: TxStatus
}

const seed: Tx[] = [
  { id:'TX-19283', date:'2025-01-31', user:'John Doe',    email:'john@growe.app',    type:'deposit',     method:'Bank',  amount:100000, reference:'REF-91301', status:'successful' },
  { id:'TX-19284', date:'2025-02-01', user:'James Clinton',email:'james@growe.app',  type:'withdrawal',  method:'Card',  amount:82000,  reference:'REF-91302', status:'pending' },
  { id:'TX-19285', date:'2025-02-02', user:'Daniel Dickson',email:'daniel@growe.app',type:'investment',  method:'Wallet',amount:250000, reference:'REF-91303', status:'successful' },
  { id:'TX-19286', date:'2025-02-03', user:'Henry Hills', email:'henry@growe.app',   type:'transfer',    method:'USSD',  amount:56000,  reference:'REF-91304', status:'failed' },
  { id:'TX-19287', date:'2025-02-03', user:'Jane Smith',  email:'jane@growe.app',    type:'deposit',     method:'Bank',  amount:42000,  reference:'REF-91305', status:'successful' },
  { id:'TX-19288', date:'2025-02-04', user:'Victor Ben',  email:'victor@growe.app',  type:'investment',  method:'Card',  amount:120000, reference:'REF-91306', status:'successful' },
  { id:'TX-19289', date:'2025-02-05', user:'Chioma Charity',email:'chioma@growe.app',type:'withdrawal',  method:'Bank',  amount:99000,  reference:'REF-91307', status:'failed' },
  { id:'TX-19290', date:'2025-02-06', user:'Goodluck Ben',email:'goodluck@growe.app',type:'transfer',    method:'Wallet',amount:65000,  reference:'REF-91308', status:'pending' },
]

/* ---------- Small UI helpers to match your style ---------- */
function Pill({
  tone = 'neutral',
  children,
}: { tone?: 'neutral'|'success'|'warning'|'danger'|'brand'|'muted'; children: React.ReactNode }) {
  const map: Record<string,string> = {
    neutral:'bg-gray-100 text-gray-700',
    success:'bg-green-50 text-green-700 ring-1 ring-green-200',
    warning:'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',
    danger:'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
    brand:'bg-[#E8F3DC] text-[#476E31] ring-1 ring-[#CFE7B9]',
    muted:'bg-gray-50 text-gray-500'
  }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${map[tone]}`}>{children}</span>
}

const toneByStatus: Record<TxStatus, 'success'|'warning'|'danger'> = {
  successful:'success', pending:'warning', failed:'danger'
}

/* ---------- URL helpers (App Router) ---------- */
function useQueryState<T extends Record<string, string | undefined>>() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function set(next: Partial<T>) {
    const sp = new URLSearchParams(searchParams.toString())
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === '') sp.delete(k)
      else sp.set(k, String(v))
    })
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false })
  }

  return { get: (k: string) => searchParams.get(k), all: searchParams, set }
}

/* ---------- Page ---------- */
export default function TransactionsPage() {
  const { get, set } = useQueryState()
  const [raw] = useState<Tx[]>(seed)

  // read current filters from URL
  const q       = (get('q') || '').trim()
  const tab     = (get('tab') || 'all') as 'all'|TxType
  const status  = (get('status') as TxStatus | 'any' | null) || 'any'
  const from    = get('from') || ''
  const to      = get('to')   || ''
  const mmin    = get('min')  || ''
  const mmax    = get('max')  || ''

  const data = useMemo(() => {
    const f = raw.filter(tx => {
      if (tab !== 'all' && tx.type !== tab) return false
      if (status !== 'any' && tx.status !== status) return false
      if (q && !(`${tx.user} ${tx.email} ${tx.id} ${tx.reference}`.toLowerCase().includes(q.toLowerCase()))) return false

      if (from && tx.date < from) return false
      if (to && tx.date > to) return false

      const minOk = mmin ? tx.amount >= Number(mmin) : true
      const maxOk = mmax ? tx.amount <= Number(mmax) : true
      return minOk && maxOk
    })
    // newest first
    return f.sort((a,b)=> a.date < b.date ? 1 : -1)
  }, [raw, q, tab, status, from, to, mmin, mmax])

  // derived stats (optional top KPIs)
  const kpi = useMemo(() => {
    const total = data.reduce((s, x)=> s + x.amount, 0)
    return { count: data.length, total }
  }, [data])

  // CSV export
  const exportCsv = () => {
    const rows = [
      ['ID','Date','User','Email','Type','Method','Amount','Reference','Status'],
      ...data.map(t => [t.id,t.date,t.user,t.email,t.type,t.method,`₦${t.amount.toLocaleString()}`,t.reference,t.status])
    ]
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transactions_${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ensure mobile doesn’t overflow
  useEffect(() => { document.body.classList.add('bg-gray-50'); return () => { document.body.classList.remove('bg-gray-50') } }, [])

  const tabs: {key:'all'|TxType; label:string}[] = [
    { key:'all',         label:'All' },
    { key:'deposit',     label:'Deposit' },
    { key:'withdrawal',  label:'Withdrawal' },
    { key:'transfer',    label:'Transfer' },
    { key:'investment',  label:'Investment' },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[22px] font-semibold text-[#2E3B2D]">Transactions</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Export
          </button>
        </div>
      </div>

      {/* KPI Strip (optional) */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="text-xs text-gray-500">Results</div>
          <div className="mt-1 text-lg font-semibold">{kpi.count.toLocaleString()}</div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="text-xs text-gray-500">Amount (filtered)</div>
          <div className="mt-1 text-lg font-semibold">₦{kpi.total.toLocaleString()}</div>
        </div>
      </div>

      {/* Tabs + search */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map(t => {
            const active = tab === t.key
            return (
              <button
                key={t.key}
                onClick={() => set({ tab: t.key === 'all' ? undefined : t.key })}
                className={[
                  'rounded-lg px-3.5 py-2 text-sm',
                  active ? 'bg-[#E8F3DC] text-[#476E31] ring-1 ring-[#CFE7B9]' : 'text-gray-600 hover:bg-gray-100'
                ].join(' ')}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="relative">
              <input
                placeholder="Search by user, ID or reference…"
                defaultValue={q}
                onChange={(e)=> set({ q: e.target.value || undefined })}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pl-9 text-sm outline-none placeholder:text-gray-400"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none"><path d="m21 21-4.3-4.3m1.3-4.7a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" stroke="currentColor" strokeWidth="1.5"/></svg>
            </div>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs text-gray-500">Status</label>
            <select
              value={status}
              onChange={(e)=> set({ status: e.target.value === 'any' ? undefined : e.target.value })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm"
            >
              <option value="any">Any</option>
              <option value="successful">Successful</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Date range */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs text-gray-500">From</label>
            <input
              type="date"
              value={from}
              onChange={(e)=> set({ from: e.target.value || undefined })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs text-gray-500">To</label>
            <input
              type="date"
              value={to}
              onChange={(e)=> set({ to: e.target.value || undefined })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm"
            />
          </div>

          {/* Amount range */}
          <div className="md:col-span-1">
            <label className="mb-1 block text-xs text-gray-500">Min ₦</label>
            <input
              inputMode="numeric"
              value={mmin}
              onChange={(e)=> set({ min: e.target.value || undefined })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm"
              placeholder="0"
            />
          </div>
          <div className="md:col-span-1">
            <label className="mb-1 block text-xs text-gray-500">Max ₦</label>
            <input
              inputMode="numeric"
              value={mmax}
              onChange={(e)=> set({ max: e.target.value || undefined })}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm"
              placeholder="—"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={()=> set({ q: undefined, status: undefined, from: undefined, to: undefined, min: undefined, max: undefined })}
            className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            Clear
          </button>
          <button
            onClick={()=> {/* values already live-bound via set() above */}}
            className="rounded-lg bg-[#82B440] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#759E3B]"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Table (desktop) */}
      <div className="hidden overflow-x-auto rounded-xl border border-gray-100 bg-white md:block">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="bg-gray-50/60 text-xs text-gray-500">
            <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:text-left">
              <th className="w-10"></th>
              <th>Date</th>
              <th>User</th>
              <th>Type</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Reference</th>
              <th className="text-right">Status</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map(tx => (
              <tr key={tx.id} className="hover:bg-gray-50/60">
                <td className="px-4 py-4"><input type="checkbox" className="h-4 w-4 rounded border-gray-300" /></td>
                <td className="px-4 py-4 text-gray-600">{new Date(tx.date).toLocaleDateString()}</td>
                <td className="px-4 py-4">
                  <div className="font-medium text-gray-800">{tx.user}</div>
                  <div className="text-xs text-gray-500">{tx.email}</div>
                </td>
                <td className="px-4 py-4 capitalize text-gray-700">{tx.type}</td>
                <td className="px-4 py-4 text-gray-700">{tx.method}</td>
                <td className="px-4 py-4 font-medium">₦{tx.amount.toLocaleString()}</td>
                <td className="px-4 py-4 text-gray-600">{tx.reference}</td>
                <td className="px-4 py-4 text-right">
                  <Pill tone={toneByStatus[tx.status]}>{tx.status}</Pill>
                </td>
                <td className="px-4 py-4">
                  <button title="View" className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {data.map(tx => (
          <div key={tx.id} className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[15px] font-semibold text-gray-800">₦{tx.amount.toLocaleString()}</div>
                <div className="mt-0.5 text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()} • {tx.method}</div>
                <div className="mt-1 text-sm text-gray-700">{tx.user}</div>
                <div className="text-xs text-gray-500">{tx.reference}</div>
              </div>
              <Pill tone={toneByStatus[tx.status]}>{tx.status}</Pill>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
              <span className="capitalize">{tx.type}</span>
              <button className="rounded-lg border border-gray-200 px-2 py-1">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
