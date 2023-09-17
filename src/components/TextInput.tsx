import { ComponentProps } from 'react';

export function TextInput({ placeholder, name, id, }: ComponentProps<'input'>) {
  return <input placeholder={placeholder} type="text" name={name} id={id} className='bg-[#D9D9D9] rounded-3xl rounded-l-none xs:text-xl text-lg h-12 pl-2 xs:w-96 w-52 focus:outline-none focus:ring-1 focus:ring-slate-500 font-extralight xs:placeholder:text-lg placeholder:text-base placeholder:text-custom-gray' />
}