'use client'

import { UseSetAdminTitle } from '@/app/components/AdminTitleContext'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import UsersTabs, { type UsersTab } from '@/app/components/UsersTabs'
import UsersTable from '@/app/components/UsersTable'
import { users } from '@/lib/users'

export default function UsersPage() {
  const params = useSearchParams()
  const tab = (params.get('tab') ?? 'all') as UsersTab

  const filtered = useMemo(() => {
    if (tab === 'all') return users
    return users.filter((u) => u.status === tab)
  }, [tab])

  return (
    <div className="space-y-4 sm:space-y-5">
      <UseSetAdminTitle title="Users Management" />

      {/* Header: tabs + (reserved) right controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0 overflow-x-auto -mx-3 sm:mx-0">
          {/* keep tabs from wrapping; allow horizontal scroll on small screens */}
          <div className="min-w-max px-3 sm:px-0">
            <UsersTabs />
          </div>
        </div>

        {/* Right controls placeholder keeps layout stable on desktop; hide on mobile */}
        <div className="hidden sm:block w-[160px]" />
      </div>

      {/* Table: enable horizontal scroll on small screens to prevent overflow */}
      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <div className="min-w-[680px] sm:min-w-0">
          <UsersTable data={filtered} />
        </div>
      </div>
    </div>
  )
}
