'use client'

import { IconLabel } from './IconLabel'
import Image from 'next/image'
import { DateInput } from './DateInput'
import { useRouter } from 'next/navigation'
import { Reservation } from '@/entities/Home'

interface ReservationFormProps {
  submitReservation: () => Promise<void>
  reservations: Reservation[]
}

export function ReservationForm({ submitReservation, reservations }: ReservationFormProps) {
  const router = useRouter()

  async function handleSubmit() {
    await submitReservation()
    router.refresh()
    router.push('/homes')
  }

  return (
    <form action={handleSubmit} className='h-full self-start flex flex-col justify-center items-start gap-16'>
      <h1 className='text-4xl font-medium'>Make a reservation</h1>
      <div className='flex flex-col justify-center items-start gap-2 w-full'>
        <label className='ml-2 text-xl font-medium' htmlFor="reservation">Reservation</label>
        <div className='flex justify-center items-center'>
          <IconLabel htmlFor='reservation'>
            <Image src='/calendar.svg' width={24} height={24} alt='icon' />
          </IconLabel>
          <DateInput id='reservation' name='reservation' placeholderText='Select the period' reservations={reservations} />
        </div>
      </div>
      <button className='hover:bg-custom-black border border-custom-black px-12 py-1.5 xs:text-lg text-base text-custom-black hover:text-white rounded-xl flex justify-center items-center gap-x-2 active:scale-95 transition-all duration-200'>Submit</button>
    </form>
  )
}