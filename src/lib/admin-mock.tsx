export const dashboardKPIs = {
  totalUsers: 20,
  totalInvestments: 4,
  activeGroups: 1,
  revenue: 2_000_000,
}

export const trendsData = [
  { month: 'Jan', 'Enviable Transport': 980_000, 'Farmcrowdy Maize Farming': 620_000, 'Nigeria Commodity Exchange (NCX)': 520_000, 'Stanbic IBTC Money Market Fund': 480_000 },
  { month: 'Feb', 'Enviable Transport': 720_000, 'Farmcrowdy Maize Farming': 830_000, 'Nigeria Commodity Exchange (NCX)': 660_000, 'Stanbic IBTC Money Market Fund': 700_000 },
  { month: 'Mar', 'Enviable Transport': 790_000, 'Farmcrowdy Maize Farming': 210_000, 'Nigeria Commodity Exchange (NCX)': 880_000, 'Stanbic IBTC Money Market Fund': 710_000 },
  { month: 'Apr', 'Enviable Transport': 240_000, 'Farmcrowdy Maize Farming': 1_020_000, 'Nigeria Commodity Exchange (NCX)': 660_000, 'Stanbic IBTC Money Market Fund': 800_000 },
  { month: 'May', 'Enviable Transport': 860_000, 'Farmcrowdy Maize Farming': 760_000, 'Nigeria Commodity Exchange (NCX)': 740_000, 'Stanbic IBTC Money Market Fund': 1_120_000 },
]

export const distributionData = [
  { name: 'Enviable Transport', value: 400 },
  { name: 'Farmcrowdy Maize Farming', value: 50 },
  { name: 'Nigeria Commodity Exchange (NCX)', value: 100 },
  { name: 'Stanbic IBTC Money Market Fund', value: 450 },
]

export const activities = [
  { id: '1', date: '2024-01-31', user: 'John Doe', type: 'Personal Savings', group: null, amount: 1_000, status: 'Successful' as const },
  { id: '2', date: '2024-01-31', user: 'James Clinton', type: 'Investment', group: 'Enviable Transport', amount: 100_000, status: 'Successful' as const },
  { id: '3', date: '2024-01-31', user: 'Daniel Dickson', type: 'Group Savings', group: 'Educational Savings Group', amount: 2_000, status: 'Successful' as const },
]
