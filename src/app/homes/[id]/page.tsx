import { HomeDetail } from '@/components/HomeDetail'
import { IconLabel } from '@/components/IconLabel'
import { Input } from '@/components/Input'
import { getHomeByIdService } from '@/services/getHomeByIdService'
import formatLocation from '@/utils/formatLocation'
import formatPrice from '@/utils/formatPrice'
import Image from 'next/image'

interface HomeProps {
  params: {
    id: string
  }
}

export default async function Home({ params }: HomeProps) {
  const home = await getHomeByIdService({ id: params.id })

  return (
    <main className='flex flex-col justify-center items-center gap-32 pb-16 px-8'>
      <section className='flex justify-center items-center flex-wrap lg:gap-x-32 gap-x-20 gap-y-20 pt-16'>
        <Image alt='House Image' src={'/example.png'} width={400} height={400} />
        <hr className='lg:h-80 h-px lg:w-px w-2/3 bg-[#d4d1d1]' />
        <div className='flex justify-center items-start flex-col lg:gap-12 gap-8'>
          <HomeDetail>
            <Image src='/pin.svg' alt='pin-icon' width={24} height={24} />
            <h1 className='text-2xl font-semibold'>{formatLocation(home.location)}</h1>
          </HomeDetail>
          <HomeDetail>
            <Image src='/calendar.svg' alt='calendar-icon' width={24} height={24} />
            <h1 className='text-xl font-semibold'>{home.isAvailable ? 'Disponível' : 'Não disponível'}</h1>
          </HomeDetail>
          <HomeDetail>
            <Image src='/tags.svg' alt='tags-icon' width={24} height={24} />
            <h1 className='text-lg text-[#666666]'><span className='font-semibold text-black'>{formatPrice(home.price)}</span> por noite</h1>
          </HomeDetail>
          <HomeDetail>
            <Image src='/star.svg' alt='star-icon' width={24} height={24} />
            <h1 className='text-2xl font-medium'>4.5</h1>
          </HomeDetail>
        </div>
      </section>
      <section className='flex justify-center items-center w-full lg:gap-x-64 gap-x-24 flex-wrap'>
        <form className='flex flex-col justify-center items-start gap-12'>
          <h1 className='text-4xl font-medium'>Contate o proprietário</h1>
          <div className='flex flex-col justify-center items-start gap-2 w-full'>
            <label className='ml-2 text-xl font-medium' htmlFor="email">Email</label>
            <div className='flex justify-center items-center w-full'>
              <IconLabel htmlFor='email'>
                <Image src='/email.svg' alt='email-icon' width={24} height={24} />
              </IconLabel>
              <Input placeholder='Digite seu email' name='email' id='email' className='rounded-l-none rounded-r-3xl' />
            </div>
          </div>
          <div className='flex flex-col justify-center items-start gap-2 w-full'>
            <label className='ml-2 text-xl font-medium' htmlFor="message">Mensagem</label>
            <textarea name='message' id='message' rows={8} placeholder='Digite a mensagem' className='bg-[#D9D9D9] focus:bg-[#e1e1e1] border-[#c8c8c8] border drop-shadow-sm rounded-3xl xs:text-xl text-lg p-4 xs:w-full w-64 focus:outline-none focus:ring-1 focus:ring-slate-500 font-extralight xs:placeholder:text-lg placeholder:text-base placeholder:text-custom-gray'></textarea>
          </div>
          <button className='hover:bg-custom-black border border-custom-black px-12 py-1.5 xs:text-lg text-base text-custom-black hover:text-white rounded-xl flex justify-center items-center gap-x-2 active:scale-95 transition-all duration-200'>Enviar</button>
        </form>
        <div className='h-full self-start pt-32'>
          <h1 className='text-2xl font-semibold'>Enviando email para:</h1>
          <h1 className='text-2xl text-center text-custom-gray'>{home.ownerEmail}</h1>
        </div>
      </section>
    </main>
  )
}