// components/ui.tsx
import { type ComponentProps } from 'react'
import clsx from 'clsx'

export const cn = (...c: Array<string | undefined | false>) => clsx(c)

export function KycPill({ value }: { value: 'completed' | 'pending' | 'failed' }) {
  const map = {
    completed: 'bg-green-50 text-green-700 ring-1 ring-green-100',
    pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    failed: 'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
  } as const
  return <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', map[value])}>{cap(value)}</span>
}

export function StatusPill({ value }: { value: 'active' | 'inactive' | 'suspended' }) {
  const map = {
    active: 'bg-violet-50 text-violet-700 ring-1 ring-violet-100',
    inactive: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-100',
    suspended: 'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
  } as const
  const icon = value === 'active' ? '✓' : value === 'inactive' ? '⚠️' : '✖'
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium', map[value])}>
      <span className="text-[10px] leading-none">{icon}</span>
      {cap(value)}
    </span>
  )
}

export function Card(props: ComponentProps<'div'>) {
  return <div {...props} className={cn('rounded-2xl border border-neutral-200 bg-white', props.className)} />
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
