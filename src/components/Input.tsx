import { twMerge } from 'tailwind-merge'

interface InputProps {
  type?: 'email' | 'text' | 'number'
  name: string
  id: string
  className?: string
  placeholder: string
  label?: string
  step?: string
}

export function Input({ id, name, type, className, placeholder, label, step }: InputProps) {
  return (
    <div className='flex items-start justify-center flex-col w-full'>
      <label htmlFor={id}>{label}</label>
      <input
        type={type ?? 'text'}
        step={step}
        name={name}
        id={id}
        className={twMerge('w-full bg-[#D9D9D9] focus:bg-[#e1e1e1] border-[#c8c8c8] border drop-shadow-sm rounded-xl xs:text-xl text-lg h-12 pl-3 focus:outline-none focus:ring-1 focus:ring-slate-500 font-extralight xs:placeholder:text-lg placeholder:text-base placeholder:text-custom-gray', className)}
        placeholder={placeholder}
      />
    </div>
  )
}