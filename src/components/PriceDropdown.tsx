'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { MouseEvent, useState } from 'react'

type PriceRangeOption = {
  min?: string
  max?: string
  text: string
}

export function PriceDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState<string | undefined>()
  const params = useSearchParams()
  const router = useRouter()

  function updateSearchParams(e: MouseEvent, range: Omit<PriceRangeOption, 'text'>) {
    e.preventDefault()
    const newParams = new URLSearchParams(params.toString())
    const searchParamsOptions = {
      'max': () => {
        newParams.set('max', range.max!)
        router.push(`?${newParams.toString()}`, { scroll: false })
      },
      'min': () => {
        newParams.set('min', range.min!)
        router.push(`?${newParams.toString()}`, { scroll: false })
      }
    }

    const validSearchParams = (Object.keys(range) as (keyof typeof range)[]).filter(key => range[key] !== undefined) // check which search params to apply to the URL (the ones that are not undefined)

    newParams.delete('max')
    newParams.delete('min')
    router.push(`?${newParams.toString()}`, { scroll: false })

    if (validSearchParams.length > 0) {
      validSearchParams.forEach(param => {
        searchParamsOptions[param]()
      })
    }
  }

  const priceOptions: PriceRangeOption[] = [
    {
      text: 'Qualquer'
    },
    {
      max: '100',
      text: 'Menos de R$ 100'
    },
    {
      min: '100',
      max: '200',
      text: 'R$ 100 a R$ 200'
    },
    {
      min: '200',
      max: '400',
      text: 'R$ 200 a R$ 400'
    },
    {
      min: '400',
      max: '700',
      text: 'R$ 400 a R$ 700'
    },
    {
      min: '700',
      text: 'Mais de R$ 700'
    }
  ]

  return (
    <div className='relative'>
      <button onClick={() => setIsOpen(prev => !prev)} className="w-52 text-custom-black border border-custom-black focus:ring-1 focus:outline-none focus:ring-custom-gray rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center justify-center" type="button">
        {selectedPrice || 'Escolha por preço'}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      {isOpen && (
        <div className="z-10 rounded-lg shadow w-44 bg-gray-700 absolute right-4">
          <ul className="py-2 text-sm text-gray-200">
            {priceOptions.map((option, index) => (
              <li key={index}>
                <button
                  onClick={(e) => {
                    updateSearchParams(e, { max: option.max, min: option.min })
                    setSelectedPrice(option.text)
                  }}
                  className="w-full block px-4 py-2 hover:bg-gray-600 hover:text-white"
                >
                  {option.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}