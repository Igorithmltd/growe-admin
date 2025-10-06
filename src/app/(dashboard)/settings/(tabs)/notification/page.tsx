'use client'

export default function NotificationSettings() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-[18px] font-semibold text-[#2f3c23]">Notification Settings</h2>
      </header>

      {/* Email */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Email Notifications</p>
        <p className="text-[12px] text-[#98a29a]">Enable or disable email alerts for users</p>
        <label className="inline-flex cursor-pointer items-center">
          <input type="checkbox" defaultChecked className="peer sr-only" />
          <span className="h-6 w-11 rounded-full bg-[#e7efe0] peer-checked:bg-[#86b04a] relative after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></span>
        </label>
      </section>

      {/* SMS */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">SMS Notifications</p>
        <p className="text-[12px] text-[#98a29a]">Allow SMS notifications for transactions</p>
        <label className="inline-flex cursor-pointer items-center">
          <input type="checkbox" defaultChecked className="peer sr-only" />
          <span className="h-6 w-11 rounded-full bg-[#e7efe0] peer-checked:bg-[#86b04a] relative after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></span>
        </label>
      </section>

      {/* Admin alerts */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Admin Alerts</p>
        <p className="text-[12px] text-[#98a29a]">
          Notify admins about unusual activity or failed transactions
        </p>
        <label className="flex items-center gap-3 text-[14px] text-[#384235]">
          <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#cfd7c9] text-[#86b04a]" />
          Enable Admin Alerts
        </label>
      </section>

      {/* Referral alerts */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Referral Activity Alerts</p>
        <p className="text-[12px] text-[#98a29a]">
          Notify referrers when someone signs up using their link
        </p>
        <label className="flex items-center gap-3 text-[14px] text-[#384235]">
          <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#cfd7c9] text-[#86b04a]" />
          Enable Referral Alerts
        </label>
      </section>

      <div>
        <button className="rounded-lg bg-[#86b04a] px-4 py-2 text-[13px] font-medium text-white hover:brightness-105">
          Save Changes
        </button>
      </div>
    </div>
  )
}
