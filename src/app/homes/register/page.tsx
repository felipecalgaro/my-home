import { ImageDropzone } from '@/components/ImageDropzone';
import { Input } from '@/components/Input';
import { PriceInputButtons } from '@/components/PriceInputButtons';
import { registerHomeService } from '@/services/registerHomeService';

type RegisterFormData = {
  email: string
  city: string
  state: string
  price: string
}

export default async function Register() {
  async function handleSubmit(formData: FormData, imageUrl: string) {
    'use server'

    const data = Object.fromEntries(formData) as RegisterFormData

    if ([imageUrl, ...Object.values(data)].includes('')) return

    await registerHomeService({ location: [data.city, data.state], ownerEmail: data.email, price: Number(data.price), image_url: imageUrl })
  }

  return (
    <div className='flex justify-center items-center flex-col xs:px-20 px-2 gap-16 pt-12 pb-20'>
      <h1 className='text-4xl font-medium'>Criar novo anúncio</h1>
      <form className='flex justify-center items-start flex-col gap-12'>
        <Input id='email' name='email' type='email' placeholder='Digite o seu email' label='Email' />
        <div className='flex justify-center items-center gap-8 sm:flex-nowrap flex-wrap'>
          <Input id='city' name='city' placeholder='Ex.: "Salvador"' label='Cidade' />
          <Input id='state' name='state' placeholder='Ex.: "Bahia"' label='Estado' />
        </div>
        <div className='flex justify-center items-end w-full'>
          <Input id='price' label='Preço da diária' name='price' placeholder='Digite o preço da diária' className='rounded-r-none price-input border-r-0' type='number'>
            <PriceInputButtons />
          </Input>
        </div>
        <ImageDropzone handleSubmit={handleSubmit} />
      </form>
    </div>
  )
}