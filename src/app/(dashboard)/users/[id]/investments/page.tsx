'use client'

import { SectionCard, GridHeader, GridRow, Toolbar, Pill } from '@/app/components/users/Ui'

const rows = [
  { product:'Enviable Transport', amount:'₦100,000', investDate:'Jan 31st, 2024', matureDate:'Jun 1st, 2024', expected:'12%', actual:'10%', risk:'Medium', status:'Active' },
  { product:'Farmcrowdy Maize Farming', amount:'₦200,000', investDate:'Feb 1st, 2024', matureDate:'Dec 1st, 2024', expected:'14%', actual:'10%', risk:'High', status:'Active' },
]
const cols = 'grid-cols-[24px_repeat(10,minmax(0,1fr))]'

export default function Investments() {
  return (
    <SectionCard title="Investment Products">
      <div className="mb-3 flex items-center justify-between"><div /><Toolbar /></div>

      <div className="rounded-xl border border-gray-100">
        <GridHeader cols={cols}>
          <div />
          <div>Product Name</div>
          <div>Amount Invested</div>
          <div>Investment Date</div>
          <div>Maturity Date</div>
          <div>Expected ROI</div>
          <div>Actual ROI</div>
          <div>Risk Level</div>
          <div>Status</div>
          <div />
          <div />
        </GridHeader>

        {rows.map((r, i) => (
          <GridRow key={i} cols={cols}>
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            <div>{r.product}</div>
            <div>{r.amount}</div>
            <div>{r.investDate}</div>
            <div>{r.matureDate}</div>
            <div>{r.expected}</div>
            <div>{r.actual}</div>
            <div><Pill tone={r.risk === 'High' ? 'danger' : 'warning'}>{r.risk}</Pill></div>
            <div><Pill tone="brand">✓ {r.status}</Pill></div>
            <div />
            <div />
          </GridRow>
        ))}
      </div>
    </SectionCard>
  )
}
