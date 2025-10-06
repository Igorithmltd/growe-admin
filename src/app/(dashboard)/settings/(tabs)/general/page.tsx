'use client'

export default function GeneralSettings() {
  return (
    <div className="space-y-8 w-full max-w-lg">
      <header>
        <h2 className="text-[18px] font-semibold text-[#2f3c23]">General Settings</h2>
      </header>

      {/* Timezone */}
      <div className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Timezone Settings</p>
        <p className="text-[12px] text-[#98a29a]">
          Set the default time zone for all users and transactions
        </p>
        <div className="relative">
          <select
            defaultValue="wat"
            className="h-12 w-full rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 pr-10 text-[14px] text-[#384235] outline-none"
          >
            <option value="wat">West Africa Time (WAT) – UTC+1</option>
            <option value="utc">UTC</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa7b1]">▾</span>
        </div>
      </div>

      {/* Allow change tz */}
      <div className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Allow Users to Change Time Zone</p>
        <p className="text-[12px] text-[#98a29a]">
          Enable or disable user-level timezone customization
        </p>
        <label className="inline-flex cursor-pointer items-center">
          <input type="checkbox" defaultChecked className="peer sr-only" />
          <span className="h-6 w-11 rounded-full bg-[#e7efe0] peer-checked:bg-[#86b04a] relative after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></span>
        </label>
      </div>

      {/* Date format */}
      <div className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Date Format</p>
        <p className="text-[12px] text-[#98a29a]">
          Select how dates are displayed on the platform
        </p>
        <div className="relative">
          <select className="h-12 w-full rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 pr-10 text-[14px] text-[#6b7280] outline-none">
            <option>Select Date Format</option>
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa7b1]">▾</span>
        </div>
      </div>

      {/* Time format */}
      <div className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Time Format</p>
        <p className="text-[12px] text-[#98a29a]">Select 12-hour or 24-hour time display</p>
        <div className="relative">
          <select defaultValue="12" className="h-12 w-full rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 pr-10 text-[14px] text-[#384235] outline-none">
            <option value="12">12-hours</option>
            <option value="24">24-hours</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa7b1]">▾</span>
        </div>
      </div>

      {/* Display seconds */}
      <div className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Display Seconds</p>
        <p className="text-[12px] text-[#98a29a]">Toggle to show or hide seconds in timestamps</p>
        <label className="inline-flex cursor-pointer items-center">
          <input type="checkbox" className="peer sr-only" />
          <span className="h-6 w-11 rounded-full bg-[#e7efe0] peer-checked:bg-[#86b04a] relative after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></span>
        </label>
      </div>

      <div>
        <button className="rounded-lg bg-[#86b04a] px-4 py-2 text-[13px] font-medium text-white hover:brightness-105">
          Save Changes
        </button>
      </div>
    </div>
  )
}
