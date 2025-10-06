'use client'

export default function SecuritySettings() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-[18px] font-semibold text-[#2f3c23]">Security & Authentication</h2>
      </header>

      {/* 2FA */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">2FA Authentication</p>
        <p className="text-[12px] text-[#98a29a]">Enable or disable Two-Factor Authentication</p>
        <label className="inline-flex cursor-pointer items-center">
          <input type="checkbox" defaultChecked className="peer sr-only" />
          <span className="h-6 w-11 rounded-full bg-[#e7efe0] peer-checked:bg-[#86b04a] relative after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></span>
        </label>
      </section>

      {/* Max login attempts */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Maximum Login Attempts</p>
        <p className="text-[12px] text-[#98a29a]">
          Set the number of failed login tries allowed before an account is locked.
        </p>
        <div className="relative">
          <select defaultValue="4" className="h-12 w-full rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 pr-10 text-[14px] text-[#384235] outline-none">
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa7b1]">▾</span>
        </div>
      </section>

      {/* Session timeout */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Session Timeout (Minutes)</p>
        <p className="text-[12px] text-[#98a29a]">
          Set how long a user can be inactive before being automatically logged out for security.
        </p>
        <div className="relative">
          <select defaultValue="15s" className="h-12 w-full rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 pr-10 text-[14px] text-[#384235] outline-none">
            <option value="5m">5 minutes</option>
            <option value="15s">15 seconds</option>
            <option value="15m">15 minutes</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa7b1]">▾</span>
        </div>
      </section>

      <div>
        <button className="rounded-lg bg-[#86b04a] px-4 py-2 text-[13px] font-medium text-white hover:brightness-105">
          Save Changes
        </button>
      </div>
    </div>
  )
}
