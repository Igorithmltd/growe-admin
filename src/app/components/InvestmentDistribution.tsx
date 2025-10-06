'use client'

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { FiCalendar } from 'react-icons/fi'

type Slice = { name: string; value: number }

const COLORS = ['#8B5CF6', '#FACC15', '#22C55E', '#3B82F6']

export default function InvestmentDistribution({ data }: { data: Slice[] }) {
  const total = data.reduce((a, b) => a + b.value, 0)

  return (
    <div className="rounded-2xl border border-[#F0F2ED] bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 pt-5">
        <h3 className="text-[20px] font-semibold tracking-tight text-[#2D3A22]">
          Investment Distribution
        </h3>
        <button className="flex items-center gap-2 rounded-lg border border-[#E7EAE4] px-3 py-1.5 text-[13px] text-[#616A5A]">
          <FiCalendar className="h-4 w-4" /> Date
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 pt-3">
        <div className="h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={130}
                paddingAngle={2}
                cornerRadius={8}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* center label */}
          <div className="pointer-events-none -mt-[210px] text-center">
            <div className="text-[13px] text-[#7A8471]">Total Investment</div>
            <div className="mt-1 text-xl font-semibold text-[#2D3A22]">
              {total}%
            </div>
          </div>
        </div>

        <ul className="space-y-3 pt-2">
          {data.map((d, i) => (
            <li key={d.name} className="flex items-center justify-between text-[14px]">
              <div className="inline-flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-[#2D3A22]">{d.name}</span>
              </div>
              <span className="text-[#647060]">{d.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
