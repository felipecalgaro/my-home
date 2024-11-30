'use client'

import DatePicker from 'react-datepicker';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';
import formatDate from '@/utils/formatDate';
import { useRouter, useSearchParams } from 'next/navigation';
import { Reservation } from '@/entities/Home';

import "react-datepicker/dist/react-datepicker.css";

interface DateInputProps {
  className?: string
  placeholderText: string
  id: string
  name: string
  reservations: Reservation[]
}

export function DateInput({ className, placeholderText, id, name, reservations }: DateInputProps) {
  const [startDate, setStartDate] = useState<Date | null>()
  const [endDate, setEndDate] = useState<Date | null>()
  const router = useRouter()
  const params = useSearchParams()

  return (
    <DatePicker
      className={
        twMerge('bg-[#D9D9D9] border-[#c8c8c8] focus:bg-[#e1e1e1] border rounded-r-3xl drop-shadow-sm xs:text-xl text-base xs:pl-4 pl-2 placeholder:text-left h-12 xs:w-56 w-40 focus:outline-none focus:ring-1 focus:ring-slate-500 font-extralight xs:placeholder:text-lg placeholder:text-base placeholder:text-custom-gray', className)
      }
      selected={startDate}
      onChange={(dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
        const newParams = new URLSearchParams(params.toString())
        if (!start || !end) {
          newParams.delete('start')
          newParams.delete('end')
          router.push(`?${newParams.toString()}`, { scroll: false })
          return
        }
        newParams.set('start', formatDate(start, 'us'))
        newParams.set('end', formatDate(end, 'us'))
        router.push(`?${newParams.toString()}`, { scroll: false })
      }}
      name={name}
      startDate={startDate}
      endDate={endDate}
      id={id}
      placeholderText={placeholderText}
      dateFormat='dd/MM'
      minDate={new Date()}
      autoComplete='off'
      isClearable
      clearButtonClassName='xs:mr-3 mr-1 react-datepicker-clear-button'
      withPortal
      selectsRange
      excludeDateIntervals={reservations.map(reservation => ({
        start: reservation.from,
        end: reservation.until
      }))}
    />
  )
}