// components/UsersTable.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Card, KycPill, StatusPill } from './ui'
import type { User } from '@/lib/users'
import { MoreHorizontal, Pencil, Eye, Trash2, Filter, ChevronDown, Download } from 'lucide-react'

export default function UsersTable({ data }: { data: User[] }) {
  const router = useRouter()
  return (
    <Card className="px-5 pb-4 pt-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[18px] font-semibold text-neutral-800">Users</h3>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
            <Filter className="h-4 w-4" />
            Filter
            <ChevronDown className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#6EA83F] px-3 py-2 text-sm text-white hover:bg-[#639A3A]">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-xs text-neutral-500">
              <th className="w-10 px-3 py-3">
                <input type="checkbox" className="h-4 w-4 rounded border-neutral-300" />
              </th>
              {['User Name', 'Email', 'Phone Number', 'Registration Date', 'KYC', 'Status', 'Action'].map((h) => (
                <th key={h} className="px-3 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((u, idx) => (
              <tr
                key={u.id}
                className="group cursor-pointer border-t border-neutral-100 text-sm text-neutral-700 hover:bg-neutral-50"
                onClick={(e) => {
                  // Don't bubble from action buttons
                  const target = e.target as HTMLElement
                  if (target.closest('[data-row-action]')) return
                  router.push(`/users/${u.id}`)
                }}
              >
                <td className="px-3 py-4">
                  <input type="checkbox" className="h-4 w-4 rounded border-neutral-300" />
                </td>
                <td className="px-3 py-4">{u.name}</td>
                <td className="px-3 py-4 text-neutral-600">{u.email}</td>
                <td className="px-3 py-4">{u.phone}</td>
                <td className="px-3 py-4">{u.registeredAt}</td>
                <td className="px-3 py-4">
                  <KycPill value={u.kyc} />
                </td>
                <td className="px-3 py-4">
                  <StatusPill value={u.status} />
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center justify-end gap-2" data-row-action>
                    <button className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700" title="View">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="rounded-md p-1.5 text-rose-500 hover:bg-rose-50" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100" title="More">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-12 text-center text-sm text-neutral-500">
                  No users in this view.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
