'use client'
import { UseSetAdminTitle } from "@/app/components/AdminTitleContext";
import StatCard from '@/app/components/StatCard'
import InvestmentTrends from '@/app/components/InvestmentTrends'
import InvestmentDistribution from '@/app/components/InvestmentDistribution'
import ActivitiesTable from '@/app/components/ActivitiesTable'
import {
  dashboardKPIs,
  trendsData,
  distributionData,
  activities,
} from '@/lib/admin-mock'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <UseSetAdminTitle title="Dashboard" />
      {/* top tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          label="Total Users"
          value={dashboardKPIs.totalUsers.toLocaleString()}
          icon="users"
          iconBg="#EEF6E6"
          iconColor="#7BA74E"
        />
        <StatCard
          label="Total Investments"
          value={dashboardKPIs.totalInvestments.toLocaleString()}
          icon="coins"
          iconBg="#E9F7EF"
          iconColor="#22C55E"
        />
        <StatCard
          label="Active Group Savings"
          value={dashboardKPIs.activeGroups.toLocaleString()}
          icon="group"
          iconBg="#EFF4FF"
          iconColor="#6C8CFF"
        />
        <StatCard
          label="Total Revenue"
          value={`₦${dashboardKPIs.revenue.toLocaleString()}`}
          icon="chart"
          iconBg="#ECFEFF"
          iconColor="#06B6D4"
        />
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <InvestmentTrends data={trendsData} />
        <InvestmentDistribution data={distributionData} />
      </div>

      {/* table */}
      <ActivitiesTable rows={activities} />
    </div>
  )
}
