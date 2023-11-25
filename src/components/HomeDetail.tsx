import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface HomeDetailProps {
  children: ReactNode
  className?: string
}

export function HomeDetail({ children, className }: HomeDetailProps) {
  return (
    <div className={twMerge('flex gap-4 justify-center items-center', className)}>
      {children}
    </div>
  )
}