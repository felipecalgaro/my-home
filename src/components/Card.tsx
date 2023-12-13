import formatPrice from '@/utils/formatPrice'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  imageUrl: string
  location: [string, string]
  isAvailable: boolean
  price: number
  id: string
}

export function Card({ imageUrl, location, price, id, isAvailable }: CardProps) {
  return (
    <Link href={`homes/${id}`} className='cursor-pointer active:scale-[0.98] active:drop-shadow-sm transition-all duration-200 border-[1px] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border-[rgba(102, 102, 102, 0.2)] bg-gradient-to-br from-gray-100 to-gray-50 drop-shadow-xl w-fit rounded-lg p-5 flex flex-col justify-center gap-y-6'>
      <Image src='/example.png' alt='House image' width={240} height={240} style={{ borderRadius: '8px' }} />
      <div className='flex flex-col gap-y-1 w-60'>
        <h1 className='font-semibold text-lg break-words'>{`${location[0]}, ${location[1]}`}</h1>
        <p className='text-[#666666] text-[15px]'>{isAvailable ? 'Disponível' : 'Não disponível'}</p>
        <p className='text-[#666666] text-[15px]'><span className='font-semibold text-black'>{formatPrice(price)}</span> por dia</p>
      </div>
    </Link>
  )
}