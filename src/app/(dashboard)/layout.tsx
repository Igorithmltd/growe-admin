// app/admin/layout.tsx (or app/admin/(dashboard)/layout.tsx)
import "../globals.css";
import AdminFrame from "@/app/components/AdminFrame";
import { Suspense } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminFrame>
          <Suspense fallback={<div className="p-6">Loading…</div>}>
            {children}
          </Suspense>
        </AdminFrame>
      </body>
    </html>
  );
}
