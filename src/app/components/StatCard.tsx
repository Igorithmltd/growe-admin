'use client'

import { FiUsers, FiTrendingUp, FiUser, FiPieChart } from 'react-icons/fi'

type Props = {
  label: string
  value: string
  icon: 'users' | 'coins' | 'group' | 'chart'
  iconBg: string
  iconColor: string
}

const mapIcon = {
  users: FiUser,
  coins: FiTrendingUp,
  group: FiUsers,
  chart: FiPieChart,
}

export default function StatCard({ label, value, icon, iconBg, iconColor }: Props) {
  const Icon = mapIcon[icon]
  return (
    <div className="rounded-2xl border border-[#F0F2ED] bg-white shadow-sm">
      <div className="flex items-center gap-4 px-6 py-5">
        <div
          className="grid h-10 w-10 place-items-center rounded-full"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <Icon className="h-[18px] w-[18px]" />
        </div>
        <div>
          <div className="text-[32px] leading-9 tracking-tight text-[#1B1F1A]">{value}</div>
          <div className="mt-1 text-[13px] leading-5 text-[#7A8471]">{label}</div>
        </div>
      </div>
    </div>
  )
}
