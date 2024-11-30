import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface IconLabelProps {
  children: ReactNode
  htmlFor: string
  hideOnLowScreenSize?: boolean
}

export function IconLabel({ children, htmlFor, hideOnLowScreenSize }: IconLabelProps) {
  return (
    <label htmlFor={htmlFor} className={twMerge('bg-[#D9D9D9] border-[#c8c8c8] border drop-shadow-sm xs:w-14 w-10 rounded-full rounded-r-none mr-0.5 text-xl h-12 justify-center items-center pl-2 pr-1', hideOnLowScreenSize ? 'xs:flex hidden' : 'flex')}>
      {children}
    </label>
  )
}