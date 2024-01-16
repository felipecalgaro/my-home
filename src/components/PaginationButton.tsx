'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationButtonProps {
  iconUrl: string
  navigationType: 'NEXT' | 'PREVIOUS',
  currentSkip: number
  skip: number
}

export function PaginationButton({ iconUrl, navigationType, skip, currentSkip }: PaginationButtonProps) {
  const router = useRouter()
  const params = useSearchParams()

  const newParams = new URLSearchParams(params.toString())

  const newSkip = navigationType === 'NEXT' ? String(currentSkip + skip) : String(currentSkip - skip)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        newParams.set('skip', newSkip)
        router.push(`?${newParams.toString()}`, { scroll: false })
      }}
      className='rounded-full border border-custom-black bg-transparent p-3 aspect-square'
    >
      <Image src={iconUrl} alt='Icon' width={24} height={24} />
    </button>
  )
}