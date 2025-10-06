// app/admin/(dashboard)/investments/(tabs)/personal/page.tsx
import { TableToolbar, RiskBadge, StatusBadge, ActionButtons } from '@/app/components/investments/Ui'
import Topbar from '@/app/components/Topbar'
const rows = [
  { date: 'Jan 31st, 2024', product: 'Enviable Transport', total: '₦30M', risk: 'Medium', min: '₦1M', returns: '20% P.A', active: 10, status: 'Active' },
  { date: 'Jan 31st, 2024', product: 'Coscharis Stable Fund', total: '₦65M', risk: 'Low', min: '₦5M', returns: '10% P.A', active: 20, status: 'Active' },
  // …
]

export default function PersonalInvestmentsPage() {
  return (
    <>
      <TableToolbar title="Investment Products" placeholder="Search type of Keywords" />
      <div className="overflow-x-auto">
        <table className="min-w-[960px] w-full text-sm">
          <thead>
            <tr className="bg-gray-50/60 text-xs text-gray-500">
              <Th className="w-10"><input type="checkbox" className="h-4 w-4 rounded border-gray-300" /></Th>
              <Th>Investment Date</Th><Th>Product Name</Th><Th>Total Amount Invested</Th>
              <Th>Risk Level</Th><Th>Min Investment</Th><Th>Returns</Th>
              <Th>Active Investors</Th><Th>Status</Th><Th className="text-right">Action</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((r,i)=>(
              <tr key={i} className="hover:bg-gray-50/40">
                <Td className="w-10"><input type="checkbox" className="h-4 w-4 rounded border-gray-300" /></Td>
                <Td>{r.date}</Td><Td className="text-[#2E3B2D]">{r.product}</Td>
                <Td>{r.total}</Td><Td><RiskBadge level={r.risk as any} /></Td>
                <Td>{r.min}</Td><Td>{r.returns}</Td><Td>{r.active}</Td>
                <Td><StatusBadge status={r.status as any} /></Td>
                <Td className="text-right"><ActionButtons /></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function Th({ children, className='' }:{children:React.ReactNode; className?:string}) {
  return <th className={`px-4 py-3 text-left font-medium ${className}`}>{children}</th>
}
function Td({ children, className='' }:{children:React.ReactNode; className?:string}) {
  return <td className={`px-4 py-4 text-gray-700 ${className}`}>{children}</td>
}
