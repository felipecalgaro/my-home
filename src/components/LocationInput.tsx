'use client'

import { useRouter, useSearchParams } from 'next/navigation';

interface LocationInputProps {
  placeholder: string
  name: string
  id: string
}

export function LocationInput({ placeholder, name, id, }: LocationInputProps) {
  const router = useRouter()
  const params = useSearchParams()

  return <input
    onChange={e => {
      const newParams = new URLSearchParams(params.toString())
      newParams.set(name, e.target.value)
      if (!e.target.value) {
        newParams.delete(name)
      }
      router.push(`?${newParams.toString()}`)
    }}
    placeholder={placeholder}
    type="text"
    name={name}
    id={id}
    className='bg-[#D9D9D9] border-[#c8c8c8] border drop-shadow-sm rounded-3xl rounded-l-none xs:text-xl text-lg h-12 pl-2 xs:w-96 w-52 focus:outline-none focus:ring-1 focus:ring-slate-500 font-extralight xs:placeholder:text-lg placeholder:text-base placeholder:text-custom-gray'
  />
}