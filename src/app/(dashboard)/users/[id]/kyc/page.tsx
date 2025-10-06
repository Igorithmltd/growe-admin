'use client'

import { SectionCard, GridHeader, GridRow, Toolbar, Pill } from '@/app/components/users/Ui'

const rows = [
  { type: 'BVN', number: '1234567810', phone: '08163149876', date: 'Jan 1st, 2025', status: 'Completed' },
]

export default function KYC() {
  const cols = 'grid-cols-[24px_repeat(5,minmax(0,1fr))]'

  return (
    <SectionCard title="KYC">
      <div className="mb-3 flex items-center justify-between"><div /><Toolbar /></div>

      <div className="rounded-xl border border-gray-100 text-gray-500 text-sm">
        <GridHeader cols={cols}>
          <div />
          <div>Document Type</div>
          <div>Document Number</div>
          <div>Phone Number Attached</div>
          <div>KYC Date</div>
          <div>KYC Status</div>
        </GridHeader>

        {rows.map((r, i) => (
          <GridRow key={i} cols={cols}>
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            <div>{r.type}</div>
            <div>{r.number}</div>
            <div>{r.phone}</div>
            <div>{r.date}</div>
            <div><Pill tone="success">Completed</Pill></div>
          </GridRow>
        ))}
      </div>
    </SectionCard>
  )
}
