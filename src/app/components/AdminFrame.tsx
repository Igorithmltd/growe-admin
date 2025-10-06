// src/admin_tw/components/AdminFrame.tsx
"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { AdminTitleProvider, useAdminTitle } from "./AdminTitleContext";

function FrameInner({ children }: { children: React.ReactNode }) {
  const { title } = useAdminTitle();
  return (
    <div className="flex">
      <aside className="hidden md:block">
        <Sidebar />
      </aside>
      <main className="min-h-screen bg-[#FAFBF9] w-full">
        <Topbar title={title} />
        <div className="px-5 md:px-6 pt-2">{children}</div>
      </main>
    </div>
  );
}

export default function AdminFrame({ children }: { children: React.ReactNode }) {
  return (
    <AdminTitleProvider initialTitle="Dashboard">
      <FrameInner>{children}</FrameInner>
    </AdminTitleProvider>
  );
}
