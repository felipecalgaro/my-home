'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export function PriceInputButtons() {
  const router = useRouter()
  const params = useSearchParams()

  function updateParams(type: 'increment' | 'decrement') {
    const newParams = new URLSearchParams(params.toString())
    const price = Number(newParams.get('price')) ?? 0
    newParams.set('price', type === 'increment' ? String(price + 1) : String(price - 1))
    router.push(`?${newParams.toString()}`)
  }

  return (
    <div className='text-3xl flex justify-center items-center bg-[#D9D9D9] border-[#c8c8c8] border border-l-0 drop-shadow-sm rounded-xl rounded-l-none h-12 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-slate-500 font-extralight select-none'>
      <span onClick={() => updateParams('increment')} className='cursor-pointer font-light w-full px-4'>+</span>
      <hr className='w-px h-3/4 bg-[#9f9f9f]' />
      <span onClick={() => updateParams('decrement')} className='cursor-pointer text-4xl w-full px-4'>-</span>
    </div>
  )
}