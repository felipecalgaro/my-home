import Image from 'next/image'

interface PaginationButtonProps {
  iconUrl: string
}

export function PaginationButton({ iconUrl }: PaginationButtonProps) {
  return <button className='rounded-full border border-custom-black bg-transparent p-4 aspect-square'>
    <Image src={iconUrl} alt='Icon' width={32} height={32} />
  </button>
}