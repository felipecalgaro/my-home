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
  const { location } = searchParams

  return (
    <main className='px-4'>
      <form className='flex justify-evenly items-center flex-wrap gap-x-12 gap-y-10 mt-10'>
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
        location: location || null
      }} />
    </main>
  )
}
