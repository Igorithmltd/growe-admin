'use client'

export default function FinancialSettings() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-[18px] font-semibold text-[#2f3c23]">Financial Settings</h2>
      </header>

      {/* Breaking fee */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Breaking Fee Percentage</p>
        <p className="text-[12px] text-[#98a29a]">
          Set penalty charged when users withdraw funds from locked savings or investments before the maturity date
        </p>
        <div className="relative">
          <select defaultValue="5" className="h-12 w-full rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 pr-10 text-[14px] text-[#384235] outline-none">
            <option value="5">5%</option>
            <option value="10">10%</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa7b1]">▾</span>
        </div>
      </section>

      {/* Referral reward */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Referral Reward Amount</p>
        <p className="text-[12px] text-[#98a29a]">
          Set the reward given to users for successfully referring new members to the platform
        </p>
        <input
          defaultValue="₦500"
          className="h-12 w-full rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 text-[14px] text-[#384235] outline-none"
        />
      </section>

      {/* Minimum savings period (chips) */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Minimum Savings Period</p>
        <p className="text-[12px] text-[#98a29a]">Set the shortest duration a user can define for their savings goal.</p>
        <div className="flex flex-wrap gap-3">
          {['6 months', '9 months', '1 year', 'Others'].map((x, i) => (
            <button
              key={x}
              className={`rounded-full px-5 py-2 text-[14px] ${
                i === 0 ? 'bg-[#e7efe0] text-[#476225]' : 'bg-[#f7f8f7] text-[#6b7280]'
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      </section>

      {/* Savings interest rate */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Savings Interest Rate</p>
        <p className="text-[12px] text-[#98a29a]">
          Set the interest rate for each savings duration or period
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <input defaultValue="10%" className="h-12 rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 text-[14px] text-[#384235] outline-none" />
          <input defaultValue="9 Months" className="h-12 rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 text-[14px] text-[#6b7280] outline-none" />
          <input defaultValue="1 Year" className="h-12 rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 text-[14px] text-[#6b7280] outline-none" />
          <input defaultValue="Other" className="h-12 rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 text-[14px] text-[#6b7280] outline-none" />
        </div>
      </section>

      {/* Minimum investment amount */}
      <section className="space-y-2">
        <p className="text-[13px] font-medium text-[#2f3c23]">Minimum Investment Amount</p>
        <p className="text-[12px] text-[#98a29a]">
          Set the lowest amount a user can invest in any investment plan
        </p>
        <input
          defaultValue="₦100,000"
          className="h-12 w-full rounded-xl border border-[#eef0ea] bg-[#f7f8f7] px-4 text-[14px] text-[#384235] outline-none"
        />
      </section>

      <div>
        <button className="rounded-lg bg-[#86b04a] px-4 py-2 text-[13px] font-medium text-white hover:brightness-105">
          Save Changes
        </button>
      </div>
    </div>
  )
}
