import { ReactNode } from 'react'

interface IconLabelProps {
  children: ReactNode
  htmlFor: string
}

export function IconLabel({ children, htmlFor }: IconLabelProps) {
  return (
    <label htmlFor={htmlFor} className='bg-[#D9D9D9] xs:w-14 w-10 rounded-full rounded-r-none border-r-2 border-white text-xl h-12 flex justify-center items-center pl-2 pr-1'>
      {children}
    </label>
  )
}