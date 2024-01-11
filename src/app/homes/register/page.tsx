import { ImageDropzone } from '@/components/ImageDropzone';
import { Input } from '@/components/Input';
import { registerHomeService } from '@/services/registerHomeService';

type RegisterFormData = {
  email: string
  city: string
  state: string
  price: string
  description: string
}

export default async function Register() {
  async function handleSubmit(formData: FormData, imageUrl: string) {
    'use server'

    const data = Object.fromEntries(formData) as RegisterFormData

    if ([imageUrl, ...Object.values(data)].includes('')) return

    await registerHomeService({ location: [data.city, data.state], ownerEmail: data.email, price: Number(data.price), image_url: imageUrl, description: data.description })
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
          <Input id='price' label='Preço da diária' name='price' placeholder='Digite o preço da diária (R$)' className='price-input' type='number' />
        </div>
        <div className='flex items-start justify-center flex-col w-full'>
          <label htmlFor='description'>Descrição</label>
          <textarea name='description' id='description' rows={8} placeholder='Descreva o local' className='bg-[#D9D9D9] focus:bg-[#e1e1e1] border-[#c8c8c8] border drop-shadow-sm rounded-xl xs:text-xl text-lg p-3 xs:w-full w-64 focus:outline-none focus:ring-1 focus:ring-slate-500 font-extralight xs:placeholder:text-lg placeholder:text-base placeholder:text-custom-gray'></textarea>
        </div>
        <ImageDropzone handleSubmit={handleSubmit} />
      </form>
    </div>
  )
}