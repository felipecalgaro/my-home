import { Card } from '@/components/Card';
import { DateInput } from '@/components/DateInput';
import { IconLabel } from '@/components/IconLabel';
import { PaginationButton } from '@/components/PaginationButton';
import { TextInput } from '@/components/TextInput';
import { getHomesByAvailabilityService } from '@/services/getHomesByAvailabilityService';
import Image from 'next/image';

export default async function Homes() {
  const homes = await getHomesByAvailabilityService({
    availableFrom: new Date(),
    availableUntil: new Date('2023-10-09')
  })

  return (
    <main className='px-4'>
      <form className='flex justify-evenly items-center flex-wrap gap-x-12 gap-y-10 mt-10'>
        <section className='flex justify-center items-center'>
          <IconLabel htmlFor='location'>
            <Image src='/pin.svg' alt='Pin Icon' width={20} height={20} />
          </IconLabel>
          <TextInput placeholder='Ex.: "Salvador, Bahia"' name="place" id="place" />
        </section>
        <section className='flex justify-center items-center'>
          <IconLabel htmlFor='checkIn'>
            <Image src='/calendar.svg' alt='Calendar Icon' width={24} height={24} />
          </IconLabel>
          <DateInput placeholder='Check-in' id='checkIn' />
          <DateInput className='ml-0.5 rounded-r-3xl' placeholder='Check-out' />
        </section>
        <button className='bg-custom-black px-12 py-2 xs:text-lg text-base text-white rounded-xl flex justify-center items-center gap-x-2 active:scale-95 transition-transform duration-200'>
          Search
          <Image src='/search.svg' alt='Search Icon' width={20} height={20} />
        </button>
      </form>
      <section className='py-20 md:px-16 px-4 px flex justify-center items-start flex-wrap gap-x-10 gap-y-20'>
        {homes.map((home) => (
          <Card id={home.id} availableFrom={home.availableFrom!} availableUntil={home.availableUntil!} imageUrl={home.image_url} location={home.location} price={home.price} key={home.id} />
        ))}
      </section>
      <section className='flex justify-center items-center mb-10 gap-x-8'>
        <PaginationButton iconUrl='/previous.svg' />
        <PaginationButton iconUrl='/next.svg' />
      </section>
    </main>
  )
}
