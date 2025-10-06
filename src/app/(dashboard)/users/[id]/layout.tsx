'use client'

import { UseSetAdminTitle } from "@/app/components/AdminTitleContext";
import Link from "next/link";
import { Tabs } from "@/app/components/users/Ui";
import { Pill } from "@/app/components/users/Ui";

export default function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const { id } = params;

  return (
    <div className="space-y-4 sm:space-y-5">
      <UseSetAdminTitle title="User Profile" />

      {/* Back */}
      <div className="-mt-1 sm:-mt-2">
        <Link
          href="/users"
          className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Back
        </Link>
      </div>

      {/* Header Card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 sm:gap-6">
          {/* Left: Avatar + identity */}
          <div className="flex w-full items-start gap-4">
            <img
              src="/avatar-placeholder.png"
              alt="avatar"
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover ring-2 ring-white shadow shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="space-y-1 text-sm">
                <div className="text-gray-900 truncate">Name: John Doe</div>
                <div className="text-gray-600 break-words">
                  Email Address: johndoe@gmail.com
                </div>
                <div className="text-gray-600">Phone Number: 08163149876</div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">KYC Status:</span>
                  <Pill tone="success">Completed</Pill>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Status:</span>
                  <Pill tone="brand">✓ Active</Pill>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions (wrap on mobile) */}
          <div className="flex w-full xl:w-auto flex-wrap items-center gap-2">
            <button className="flex-1 sm:flex-none rounded-lg bg-[#E8F3DC] px-3.5 py-2 text-sm font-medium text-[#476E31] hover:bg-[#DFF0CD]">
              Activate
            </button>
            <button className="flex-1 sm:flex-none rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Suspend
            </button>
            <button className="flex-1 sm:flex-none rounded-lg border border-rose-200 bg-white px-3.5 py-2 text-sm text-rose-600 hover:bg-rose-50">
              Delete
            </button>
          </div>
        </div>

        {/* Tabs: scrollable on small screens */}
        <div className="-mx-4 sm:mx-0 mt-4 overflow-x-auto">
          <div className="min-w-max px-4 sm:px-0">
            <Tabs id={id} />
          </div>
        </div>
      </div>

      {/* Routed Content: prevent overflow on small screens */}
      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <div className="min-w-[680px] sm:min-w-0">{children}</div>
      </div>
    </div>
  );
}
