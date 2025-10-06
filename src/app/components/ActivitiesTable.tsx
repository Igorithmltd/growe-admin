'use client'

import { Filter } from 'lucide-react'

export type Activity = {
  id: string
  date: string
  user: string
  type: string
  group: string | null
  amount: number
  status: 'Successful' | 'Pending' | 'Failed'
}

export default function ActivitiesTable({ rows }: { rows: Activity[] }) {
  return (
    <div className="bg-white border border-[#EBEFE6] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-[#2D3A22]">Recent Activities</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E7ECE3] text-sm">
          <Filter className="h-4 w-4 text-gray-500" /> <span>Filter</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-gray-500">
            <tr className="text-left">
              <th className="w-10 px-3 py-3">
                <input type="checkbox" className="accent-[#8BB464]" />
              </th>
              <th className="px-3 py-3">Date</th>
              <th className="px-3 py-3">User Name</th>
              <th className="px-3 py-3">Activity Type</th>
              <th className="px-3 py-3">Group Name</th>
              <th className="px-3 py-3">Amount</th>
              <th className="px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.id}
                className={`border-t border-[#F1F4EE] ${i % 2 === 0 ? '' : 'bg-[#FCFDFB]'}`}
              >
                <td className="px-3 py-4">
                  <input type="checkbox" className="accent-[#8BB464]" />
                </td>
                <td className="px-3 py-4 text-gray-600">{new Date(r.date).toLocaleDateString(undefined, {
                  month: 'short', day: '2-digit', year: 'numeric'
                })}</td>
                <td className="px-3 py-4">{r.user}</td>
                <td className="px-3 py-4">{r.type}</td>
                <td className="px-3 py-4">{r.group ?? 'Null'}</td>
                <td className="px-3 py-4">{'₦' + r.amount.toLocaleString()}</td>
                <td className="px-3 py-4">
                  <span className={`font-medium ${r.status === 'Successful' ? 'text-green-600' : r.status === 'Pending' ? 'text-orange-500' : 'text-red-500'}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <button className="ml-auto block px-4 py-2 rounded-lg border border-[#E7ECE3] text-sm text-[#2D3A22] hover:bg-[#F6FAF1]">
          View More &gt;&gt;
        </button>
      </div>
    </div>
  )
}
