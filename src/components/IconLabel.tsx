import { ReactNode } from 'react'

interface IconLabelProps {
  children: ReactNode
  htmlFor: string
}

export function IconLabel({ children, htmlFor }: IconLabelProps) {
  return (
    <label htmlFor={htmlFor} className='bg-[#D9D9D9] border-[#c8c8c8] border drop-shadow-sm xs:w-14 w-10 rounded-full rounded-r-none mr-0.5 text-xl h-12 flex justify-center items-center pl-2 pr-1'>
      {children}
    </label>
  )
}