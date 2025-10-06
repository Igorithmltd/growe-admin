// src/app/components/Topbar.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiSearch, FiBell, FiChevronDown, FiMenu, FiX,
  FiHome, FiUsers, FiCreditCard, FiLayers, FiBarChart2, FiShare2, FiSettings, FiFileText
} from "react-icons/fi";
import UserAvatar from "./UseAvatar";

type TopbarProps = { title: React.ReactNode; showSearch?: boolean };

export default function Topbar({ title, showSearch = true }: TopbarProps) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const nav = useMemo(
    () => [
      { href: "/", label: "Dashboard", icon: FiHome },
      { href: "/users", label: "Users Management", icon: FiUsers },
      { href: "/transactions", label: "Transactions", icon: FiCreditCard },
      { href: "/investments", label: "Investments", icon: FiLayers },
      { href: "/savings", label: "Savings", icon: FiBarChart2 },
      { href: "/referrals", label: "Referrals", icon: FiShare2 },
      { href: "/reports", label: "Reports", icon: FiFileText },
      { href: "/notifications", label: "Notifications", icon: FiBell },
      { href: "/settings", label: "Settings", icon: FiSettings },
    ],
    []
  );

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
          <h1 className="text-[18px] sm:text-[22px] font-semibold text-neutral-700">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          {showSearch && (
            <label className="hidden md:flex w-72 items-center gap-2 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
              <FiSearch className="text-gray-500" aria-hidden />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search users, transactions…"
                className="bg-transparent outline-none w-full text-sm"
                aria-label="Search"
              />
            </label>
          )}
          <button aria-label="Notifications" className="p-2 rounded-lg hover:bg-gray-100">
            <FiBell />
          </button>
          <button className="px-2.5 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3">
            <UserAvatar />
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium">Admin</div>
              <div className="text-xs text-gray-500">Super Admin</div>
            </div>
            <FiChevronDown aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" onClick={() => setOpen(false)} />
          <div
            className={`
              absolute inset-y-0 left-0 w-[86%] max-w-[360px]
              bg-white shadow-xl border-r border-gray-100
              flex flex-col translate-x-0
              animate-[slideIn_.2s_ease-out]
            `}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <div className="text-lg font-semibold text-[#2E3B2D]">Growe Admin</div>
              <button
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="px-4 pt-4">
              {showSearch && (
                <label className="flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
                  <FiSearch className="text-gray-500" aria-hidden />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search…"
                    className="bg-transparent outline-none w-full text-sm"
                    aria-label="Search"
                  />
                </label>
              )}
            </div>

            <nav className="mt-3 flex-1 overflow-y-auto px-2">
              {nav.map((n) => {
                const active = pathname === n.href;
                const Icon = n.icon;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center gap-3 rounded-xl px-3 py-3 my-0.5",
                      active
                        ? "bg-[#E8F3DC] text-[#476E31] ring-1 ring-[#CFE7B9]"
                        : "text-gray-700 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <Icon className={active ? "opacity-90" : "text-gray-500"} />
                    <span className="text-[15px] font-medium">{n.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-gray-100 p-4">
              <button className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Make keyframes global to avoid styled-jsx hashing in attributes */}
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(-8%); opacity: 0.9; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}
