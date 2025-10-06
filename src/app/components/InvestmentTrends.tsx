'use client'

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { Calendar, Filter } from 'lucide-react'

const COLORS = ['#7B5CF0', '#F2C94C', '#6FCF97', '#56CCF2'] // purple, yellow, green, blue

export default function InvestmentTrends({ data }: { data: any[] }) {
  return (
    <div className="bg-white border border-[#EBEFE6] rounded-2xl p-5 h-[460px]">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-[#2D3A22]">Investment Trends</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E7ECE3] text-sm">
            <Calendar className="h-4 w-4 text-gray-500" /> <span>Date</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E7ECE3] text-sm">
            <Filter className="h-4 w-4 text-gray-500" /> <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="h-[360px] mt-2 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -20, right: 20, top: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2EA" />
            <XAxis dataKey="month" tick={{ fill: '#8B9283' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}K`} tick={{ fill: '#8B9283' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Bar dataKey="Enviable Transport" fill={COLORS[0]} radius={[6,6,0,0]} />
            <Bar dataKey="Farmcrowdy Maize Farming" fill={COLORS[1]} radius={[6,6,0,0]} />
            <Bar dataKey="Nigeria Commodity Exchange (NCX)" fill={COLORS[2]} radius={[6,6,0,0]} />
            <Bar dataKey="Stanbic IBTC Money Market Fund" fill={COLORS[3]} radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
