import { HomesSection } from '@/components/HomesSection';
import { IconLabel } from '@/components/IconLabel';
import { LocationInput } from '@/components/LocationInput';
import { PriceDropdown } from '@/components/PriceDropdown';
import Image from 'next/image';

export type SearchParams = {
  [key: string]: string | undefined
}

interface HomesProps {
  searchParams: SearchParams
}

export default function Homes({ searchParams }: HomesProps) {
  const { location, min, max, skip } = searchParams

  const homesPerPage = 2
  const currentSkip = Number(skip) || 0

  return (
    <main className='px-4'>
      <form className='flex justify-evenly items-center flex-wrap gap-x-12 gap-y-10 mt-10'>
        <section className='flex justify-center items-center'>
          <IconLabel htmlFor='location'>
            <Image src='/pin.svg' alt='Pin Icon' width={20} height={20} />
          </IconLabel>
          <LocationInput placeholder='Ex.: "Salvador" ou "Bahia"' name="location" id="location" />
        </section>
        <section className='flex justify-center items-center'>
          <PriceDropdown />
        </section>
      </form>
      <HomesSection
        filter={{
          location: location || null,
          minPrice: Number(min) || null,
          maxPrice: Number(max) || null,
        }}
        currentSkip={currentSkip}
        homesPerPage={homesPerPage}
      />
    </main>
  )
}
