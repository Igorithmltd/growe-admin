'use client'

import { SectionCard, GridHeader, GridRow, Toolbar, Pill } from '@/app/components/users/Ui'

const rows = [
  { name:'Rent', target:'₦800,000', saved:'₦133,000', rate:'10%', expected:'₦80,000', start:'Jan 31st, 2025', end:'Jun 31st, 2025', progress:'60%', duration:'6 Months', status:'Active', withdraw:'Pending' },
  { name:'Vacation Fund', target:'₦500,000', saved:'₦62,500', rate:'14%', expected:'₦70,000', start:'Feb 5th, 2025', end:'Sept 5th, 2025', progress:'10%', duration:'8 Months', status:'Active', withdraw:'Pending' },
]
const cols = 'grid-cols-[24px_repeat(12,minmax(0,1fr))]'

export default function PersonalSavings() {
  return (
    <SectionCard title="Personal Savings">
      <div className="mb-3 flex items-center justify-between"><div /><Toolbar /></div>

      <div className="rounded-xl border border-gray-100">
        <GridHeader cols={cols}>
          <div />
          <div>Savings Name</div>
          <div>Target Amount</div>
          <div>Amount Saved</div>
          <div>Interest %</div>
          <div>Expected Interest</div>
          <div>Start Date</div>
          <div>End Date</div>
          <div>Savings Progress</div>
          <div>Duration</div>
          <div>Status</div>
          <div>Withdrawal Status</div>
          <div />
        </GridHeader>

        {rows.map((r, i) => (
          <GridRow key={i} cols={cols}>
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            <div>{r.name}</div>
            <div>{r.target}</div>
            <div>{r.saved}</div>
            <div>{r.rate}</div>
            <div>{r.expected}</div>
            <div>{r.start}</div>
            <div>{r.end}</div>
            <div>{r.progress}</div>
            <div>{r.duration}</div>
            <div><Pill tone="brand">✓ {r.status}</Pill></div>
            <div><Pill tone="warning">{r.withdraw}</Pill></div>
            <div />
          </GridRow>
        ))}
      </div>
    </SectionCard>
  )
}
