'use client'

import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside className="hidden md:block">
        <Sidebar />
      </aside>
      <main className="min-h-screen bg-[#FAFBF9] w-full">
        <Topbar title={title} />
        <div className="px-5 md:px-6 pt-2">
          {/* <h1 className="text-3xl font-semibold text-[#2D3A22] mb-5">{title}</h1> */}
          {children}
        </div>
      </main>
    </div>
  )
}
