import { ReactNode } from 'react';

interface HomeDetailProps {
  children: ReactNode
}

export function HomeDetail({ children }: HomeDetailProps) {
  return (
    <div className='flex gap-4 justify-center items-center'>
      {children}
    </div>
  )
}