'use client'

import { SectionCard, GridHeader, GridRow, Toolbar, Pill } from '@/app/components/users/Ui'

const rows = [
  { name:'Family Support Savings 2025', target:'₦1,000,000', total:'₦500,000', userContrib:'₦100,000', rate:'6%', expected:'₦3,000', start:'Jan 31st, 2025', end:'Jun 31st, 2025', duration:'6 Months', role:'Admin', status:'Active', payout:'Pending' },
  { name:'Community Project Savings', target:'₦800,000', total:'₦800,000', userContrib:'₦200,000', rate:'14%', expected:'₦5,600', start:'Jan 31st, 2025', end:'Aug 31st, 2025', duration:'8 Months', role:'Member', status:'Closed', payout:'Completed' },
]
const cols = 'grid-cols-[24px_repeat(14,minmax(0,1fr))]'

export default function GroupSavings() {
  return (
    <SectionCard title="Group Savings">
      <div className="mb-3 flex items-center justify-between "><div /><Toolbar /></div>

      <div className="rounded-xl border border-gray-100 text-sm text-gray-500 w-full">
        <GridHeader cols={cols}>
          <div />
          <div>Group Name</div>
          <div>Group Target Amount</div>
          <div>Total Contributions</div>
          <div>User's Contribution</div>
          <div>Interest Rate</div>
          <div>Expected Interest</div>
          <div>Start Date</div>
          <div>End Date</div>
          <div>Duration</div>
          <div>Role</div>
          <div>Group Status</div>
          <div>Payout Status</div>
          <div />
          <div />
        </GridHeader>

        {rows.map((r, i) => (
          <GridRow key={i} cols={cols}>
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            <div>{r.name}</div>
            <div>{r.target}</div>
            <div>{r.total}</div>
            <div>{r.userContrib}</div>
            <div>{r.rate}</div>
            <div>{r.expected}</div>
            <div>{r.start}</div>
            <div>{r.end}</div>
            <div>{r.duration}</div>
            <div>{r.role}</div>
            <div>{r.status === 'Active' ? <Pill tone="brand">✓ Active</Pill> : <Pill tone="danger">Closed</Pill>}</div>
            <div>{r.payout === 'Completed' ? <Pill tone="success">Completed</Pill> : <Pill tone="warning">Pending</Pill>}</div>
            <div />
            <div />
          </GridRow>
        ))}
      </div>
    </SectionCard>
  )
}
