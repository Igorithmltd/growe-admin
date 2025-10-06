import { redirect } from 'next/navigation'

export default function Page({ params }: { params: { id: string } }) {
  // default -> KYC
  redirect(`/users/${params.id}/kyc`)
}
