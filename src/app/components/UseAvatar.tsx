// src/admin_tw/components/UserAvatar.tsx
"use client";

export default function UserAvatar() {
  return (
    <div className="relative inline-block">
      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
        GA
      </div>
      <span className="absolute -bottom-0 -right-0 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
    </div>
  );
}
