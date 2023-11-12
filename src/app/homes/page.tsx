import { DateInput } from '@/components/DateInput';
import { HomesSection } from '@/components/HomesSection';
import { IconLabel } from '@/components/IconLabel';
import { LocationInput } from '@/components/LocationInput';
import Image from 'next/image';

export type SearchParams = {
  [key: string]: string | undefined
}

interface HomesProps {
  searchParams: SearchParams
}

export default function Homes({ searchParams }: HomesProps) {
  const { checkIn, checkOut, location } = searchParams

  return (
    <main className='px-4'>
      <form className='flex justify-evenly items-center flex-wrap gap-x-12 gap-y-10 mt-10'>
        <section className='flex justify-center items-center'>
          <IconLabel htmlFor='checkIn'>
            <Image src='/calendar.svg' alt='Calendar Icon' width={24} height={24} />
          </IconLabel>
          <DateInput placeholderText='Check-in' id='checkIn' name='checkIn' />
          <DateInput className='ml-0.5 rounded-r-3xl' id='checkOut' placeholderText='Check-out' name='checkOut' />
        </section>
        <section className='flex justify-center items-center'>
          <IconLabel htmlFor='location'>
            <Image src='/pin.svg' alt='Pin Icon' width={20} height={20} />
          </IconLabel>
          <LocationInput placeholder='Ex.: "Salvador" ou "Bahia"' name="location" id="location" />
        </section>
        <button type='submit' className='bg-custom-black px-12 py-2 xs:text-lg text-base text-white rounded-xl flex justify-center items-center gap-x-2 active:scale-95 transition-transform duration-200 cursor-pointer'>
          Search
          <Image src='/search.svg' alt='Search Icon' width={20} height={20} />
        </button>
      </form>
      <HomesSection filter={{
        availableFrom: checkIn ? new Date(checkIn) : new Date(),
        availableUntil: checkOut ? new Date(checkOut) : new Date(),
        location: location || null
      }} />
    </main>
  )
}
