// lib/users.ts
export type UserStatus = 'active' | 'inactive' | 'suspended'
export type KycStatus = 'completed' | 'pending' | 'failed'

export type User = {
  id: string
  name: string
  email: string
  phone: string
  registeredAt: string
  kyc: KycStatus
  status: UserStatus
  avatar?: string
}

export const users: User[] = [
  { id: 'u-01', name: 'John Doe', email: 'johndoe@gmail.com', phone: '08163149876', registeredAt: 'Jan 1st, 2025', kyc: 'completed', status: 'active', avatar: '' },
  { id: 'u-02', name: 'James Clinton', email: 'jamescl@gmail.com', phone: '0908765248', registeredAt: 'Jan 2nd, 2025', kyc: 'completed', status: 'active' },
  { id: 'u-03', name: 'Daniel Dickson', email: 'daniel@gmail.com', phone: '0816543678', registeredAt: 'Jan 3rd, 2025', kyc: 'completed', status: 'inactive' },
  { id: 'u-04', name: 'Henry Hills', email: 'henryhills@gmail.com', phone: '08165436782', registeredAt: 'Jan 4th, 2025', kyc: 'completed', status: 'suspended' },
  { id: 'u-05', name: 'Jane Smith', email: 'janesmith@gmail.com', phone: '09078904322', registeredAt: 'Jan 5th, 2025', kyc: 'completed', status: 'active' },
  { id: 'u-06', name: 'Victor Ben', email: 'victorben@gmail.com', phone: '09045678019', registeredAt: 'Jan 5th, 2025', kyc: 'completed', status: 'inactive' },
  { id: 'u-07', name: 'Chioma Charity', email: 'chiomacharity@gmail.com', phone: '09078904322', registeredAt: 'Jan 5th, 2025', kyc: 'completed', status: 'active' },
  { id: 'u-08', name: 'David Lookman', email: 'davidlookman@gmail.com', phone: '09045321589', registeredAt: 'Jan 5th, 2025', kyc: 'completed', status: 'suspended' },
  { id: 'u-09', name: 'Adetutu Gift', email: 'adetutu@gmail.com', phone: '09045789090', registeredAt: 'Jan 5th, 2025', kyc: 'completed', status: 'suspended' },
  { id: 'u-10', name: 'Goodluck Ben', email: 'goodluckben@gmail.com', phone: '090456789901', registeredAt: 'Jan 5th,2025', kyc: 'completed', status: 'inactive' },
]

// Mock KYC rows for profile page
export type KycRow = { id: string; type: string; number: string; phoneAttached: string; kycDate: string; kycStatus: 'Completed' | 'Pending' | 'Failed' }
export const kycRows: KycRow[] = [
  { id: 'k-1', type: 'BVN', number: '1234567810', phoneAttached: '08163149876', kycDate: 'Jan 1st, 2025', kycStatus: 'Completed' },
]
