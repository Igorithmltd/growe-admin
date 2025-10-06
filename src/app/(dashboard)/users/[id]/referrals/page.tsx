'use client'

import { SectionCard, GridHeader, GridRow, Toolbar, Pill } from '@/app/components/users/Ui'

const rows = [
  { date: 'Jan 31st, 2024', id: 'REF123456', user: 'Jane Smith', reward: '₦500', status: 'Successful', action: 'Approved' },
  { date: 'Jan 31st, 2024', id: 'REF123456', user: 'Victor Ben', reward: '₦500', status: 'Successful', action: 'Approved' },
  { date: 'Jan 31st, 2024', id: 'REF123456', user: 'Queen Faith', reward: '#Null', status: 'Failed', action: 'Rejected' },
]
const cols = 'grid-cols-[24px_repeat(7,minmax(0,1fr))]'

export default function Referrals() {
  return (
    <SectionCard title="Referrals">
      <div className="mb-3 flex items-center justify-between"><div /><Toolbar /></div>

      <div className="rounded-xl border border-gray-100">
        <GridHeader cols={cols}>
          <div />
          <div>Date</div>
          <div>Referral ID</div>
          <div>Referred User</div>
          <div>Reward Earned</div>
          <div>Status</div>
          <div>Action</div>
          <div />
        </GridHeader>

        {rows.map((r, i) => (
          <GridRow key={i} cols={cols}>
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            <div>{r.date}</div>
            <div>{r.id}</div>
            <div>{r.user}</div>
            <div>{r.reward}</div>
            <div>{r.status === 'Successful' ? <Pill tone="success">✓ Successful</Pill> : <Pill tone="danger">✕ Failed</Pill>}</div>
            <div>{r.action === 'Approved' ? <Pill tone="brand">Approved</Pill> : <Pill tone="danger">Rejected</Pill>}</div>
            <div />
          </GridRow>
        ))}
      </div>
    </SectionCard>
  )
}
