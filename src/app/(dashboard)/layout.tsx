// app/admin/layout.tsx (or app/admin/(dashboard)/layout.tsx)
import "../globals.css";
import AdminFrame from "@/app/components/AdminFrame";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminFrame>{children}</AdminFrame>
      </body>
    </html>
  );
}
