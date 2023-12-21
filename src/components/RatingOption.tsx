'use client'

import { useRouter } from 'next/navigation'

interface RatingOptionProps {
  ratingValue: number
  icon: string
  text: string
  submitRating: (newRating: number) => Promise<void>
}

export function RatingOption({ ratingValue, text, icon, submitRating }: RatingOptionProps) {
  const router = useRouter()

  async function handleSubmit(newRating: number) {
    await submitRating(newRating)
    router.refresh()
    router.push('/homes')
  }

  return (
    <button formAction={() => handleSubmit(ratingValue)} className='xs:w-32 w-20 cursor-pointer active:scale-[0.98] active:drop-shadow-sm transition-all duration-200 border-[1px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border-[rgba(102, 102, 102, 0.2)] bg-gradient-to-br from-gray-100 to-gray-50 drop-shadow-xl rounded-lg px-5 py-3 flex flex-col justify-center items-center gap-y-2'>
      <p className='xs:text-2xl text-xl'>{icon}</p>
      <p className='xs:text-base text-sm'>{text}</p>
    </button>
  )
}