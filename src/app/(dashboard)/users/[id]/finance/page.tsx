'use client'

import { SectionCard, GridHeader, GridRow, Toolbar, Pill } from '@/app/components/users/Ui'

const rows = [{ bank: 'UBA', name: 'John Doe', number: '8163149876', status: 'Verified' }]
const cols = 'grid-cols-[24px_repeat(4,minmax(0,1fr))]'

export default function Finance() {
  return (
    <SectionCard title="Finance Details">
      <div className="mb-3 flex items-center justify-between"><div /><Toolbar /></div>

      <div className="rounded-xl border border-gray-100 text-sm text-gray-500">
        <GridHeader cols={cols}>
          <div />
          <div>Bank Name</div>
          <div>Account Name</div>
          <div>Account Number</div>
          <div>Status</div>
        </GridHeader>

        {rows.map((r, i) => (
          <GridRow key={i} cols={cols}>
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            <div>{r.bank}</div>
            <div>{r.name}</div>
            <div>{r.number}</div>
            <div><Pill tone="success">Verified</Pill></div>
          </GridRow>
        ))}
      </div>
    </SectionCard>
  )
}
