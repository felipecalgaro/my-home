import { Input } from '@/components/Input';
import { PriceInputButtons } from '@/components/PriceInputButtons';
import { registerHomeService } from '@/services/registerHomeService';

export default async function Register() {
  async function handleSubmit(formData: FormData) {
    'use server'

    const email = formData.get('email') as string
    const city = formData.get('city') as string
    const state = formData.get('state') as string
    const price = Number(formData.get('price'))

    await registerHomeService({ location: [city, state], ownerEmail: email, price: Number(price) })
  }

  return (
    <div className='flex justify-center items-center flex-col px-20 gap-16 pt-12'>
      <h1 className='text-4xl font-medium'>Criar novo anúncio</h1>
      <div className='flex justify-center items-center gap-20'>
        <form action={handleSubmit} className='flex justify-center items-start flex-col gap-12'>
          <Input id='email' name='email' type='email' placeholder='Digite o seu email' label='Email' />
          <div className='flex justify-center items-center gap-8'>
            <Input id='city' name='city' placeholder='Ex.: "Salvador"' label='Cidade' />
            <Input id='state' name='state' placeholder='Ex.: "Bahia"' label='Estado' />
          </div>
          <div className='flex justify-center items-end w-full'>
            <Input id='price' label='Price' name='price' placeholder='Digite o preço por noite' className='rounded-r-none price-input border-r-0' type='number'>
              <PriceInputButtons />
            </Input>
          </div>
          <button className='bg-custom-black px-14 py-2 xs:text-lg text-base text-white rounded-xl flex justify-center items-center gap-x-2 active:scale-95 transition-transform duration-200 cursor-pointer'>
            Criar
          </button>
        </form>
        <div className='bg-zinc-600 w-40 h-96'></div>
      </div>
    </div>
  )
}