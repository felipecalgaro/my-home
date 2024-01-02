import { HomeDetail } from '@/components/HomeDetail'
import { ReservationForm } from '@/components/ReservationForm'
import { bookReservationService } from '@/services/bookReservationService'
import { getHomeByIdService } from '@/services/getHomeByIdService'
import formatLocation from '@/utils/formatLocation'
import formatPrice from '@/utils/formatPrice'
import Image from 'next/image'

interface HomeProps {
  params: {
    id: string
  },
  searchParams: {
    start: string
    end: string
  }
}

export default async function Home({ params, searchParams }: HomeProps) {
  const home = await getHomeByIdService({ id: params.id })

  async function submitReservation() {
    'use server'

    await bookReservationService({ homeId: params.id, reservation: { from: new Date(searchParams.start), until: new Date(searchParams.end) } })
  }

  return (
    <main className='flex flex-col justify-center items-center lg:gap-32 gap-20 pb-16 px-8'>
      <section className='flex justify-center items-center flex-wrap lg:gap-x-32 gap-x-20 gap-y-20 pt-16'>
        <Image alt='House Image' src={home.image_url} width={400} height={400} />
        <hr className='lg:h-80 h-px lg:w-px w-2/3 bg-[#d4d1d1]' />
        <div className='flex justify-center items-start flex-col lg:gap-12 gap-8'>
          <HomeDetail className='xl:w-auto w-72 items-start'>
            <Image src='/pin.svg' alt='pin-icon' width={24} height={24} />
            <h1 className='text-2xl font-semibold'>{formatLocation(home.location)}</h1>
          </HomeDetail>
          <HomeDetail>
            <Image src='/calendar.svg' alt='calendar-icon' width={24} height={24} />
            <h1 className='text-xl font-semibold'>{home.isAvailable ? 'Disponível' : 'Não disponível'}</h1>
          </HomeDetail>
          <HomeDetail>
            <Image src='/tags.svg' alt='tags-icon' width={24} height={24} />
            <h1 className='text-lg text-[#666666]'><span className='font-semibold text-black'>{formatPrice(home.price)}</span> por dia</h1>
          </HomeDetail>
          <HomeDetail>
            <Image src='/star.svg' alt='star-icon' width={24} height={24} />
            <h1 className='text-2xl font-medium'>{home.rating.amount > 0 ? home.rating.average : 'Sem avaliações'}</h1>
          </HomeDetail>
        </div>
      </section>
      <hr className='h-px lg:w-1/3 w-1/2 bg-[#d4d1d1]' />
      <section className='flex justify-center items-center w-full lg:gap-32 gap-20 flex-wrap'>
        <ReservationForm submitReservation={submitReservation} reservations={home.reservations} />
        <hr className='lg:h-80 h-px lg:w-px w-2/3 bg-[#d4d1d1]' />
        <div className='flex flex-col justify-center items-start gap-12 w-1/4'>
          <h1 className='text-4xl font-medium'>Descrição do local</h1>
          <p className='break-words'>{home.description}</p>
        </div>
      </section>
    </main>
  )
}