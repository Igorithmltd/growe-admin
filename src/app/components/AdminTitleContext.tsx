// src/admin_tw/components/AdminTitleContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Ctx = {
  title: React.ReactNode;
  setTitle: (t: React.ReactNode) => void;
};

const AdminTitleContext = createContext<Ctx | null>(null);

export function AdminTitleProvider({
  children,
  initialTitle = "Dashboard",
}: {
  children: React.ReactNode;
  initialTitle?: React.ReactNode;
}) {
  const [title, setTitle] = useState<React.ReactNode>(initialTitle);
  return (
    <AdminTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </AdminTitleContext.Provider>
  );
}

export function useAdminTitle() {
  const ctx = useContext(AdminTitleContext);
  if (!ctx) throw new Error("useAdminTitle must be used within AdminTitleProvider");
  return ctx;
}

/** Tiny helper component you can drop into any page to set the title */
export function UseSetAdminTitle({ title }: { title: React.ReactNode }) {
  const { setTitle } = useAdminTitle();
  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);
  return null;
}

