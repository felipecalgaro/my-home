'use client'

import DatePicker from 'react-datepicker';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import formatDate from '@/utils/formatDate';
import { useRouter, useSearchParams } from 'next/navigation';

import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  className?: string
  placeholderText: string
  id: string
  name: string
}

export function DateInput({ className, placeholderText, id, name }: DateInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>()
  const router = useRouter()
  const params = useSearchParams()

  return (
    <DatePicker
      className={
        twMerge('bg-[#D9D9D9] border-[#c8c8c8] focus:bg-[#e1e1e1] border drop-shadow-sm xs:text-xl text-base xs:pl-5 pl-2 placeholder:text-left h-12 xs:w-40 w-28 focus:outline-none focus:ring-1 focus:ring-slate-500 font-extralight xs:placeholder:text-lg placeholder:text-base placeholder:text-custom-gray', className)
      }
      selected={selectedDate}
      onChange={(date, event) => {
        setSelectedDate(date)
        const newParams = new URLSearchParams(params.toString())
        if (!date) {
          newParams.delete(name)
          router.push(`?${newParams.toString()}`)
          return
        }
        newParams.set(name, formatDate(date, 'us'))
        router.push(`?${newParams.toString()}`)
      }}
      id={id}
      placeholderText={placeholderText}
      dateFormat='dd/MM/yy'
      minDate={new Date()}
      autoComplete='off'
      isClearable
      clearButtonClassName='xs:mr-3 mr-1 react-datepicker-clear-button'
    />
  )
}