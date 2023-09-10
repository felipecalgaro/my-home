'use client'

import { ComponentProps, useState } from 'react'
import DatePicker from 'react-datepicker';
import { twMerge } from 'tailwind-merge';

import "react-datepicker/dist/react-datepicker.css";

export function DateInput({ className, placeholder, id }: ComponentProps<'input'>) {
  const [selectedDate, setSelectedDate] = useState<Date | null>()

  return (
    <DatePicker
      className={
        twMerge('bg-[#D9D9D9] xs:text-xl text-lg text-center placeholder:text-left placeholder:pl-2 h-12 xs:w-28 w-24 focus:outline-none focus:ring-1 focus:ring-slate-500 font-extralight xs:placeholder:text-lg placeholder:text-base placeholder:text-custom-gray', className)
      }
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      id={id}
      placeholderText={placeholder}
      dateFormat='dd/MM'
      minDate={new Date()}
      autoComplete='off'
    />
  )
}