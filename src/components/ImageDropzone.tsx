'use client'

import { useEdgeStore } from '@/lib/edgestore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'

interface ImageDropzoneProps {
  handleSubmit: (formData: FormData, imageUrl: string) => Promise<void>
}

export function ImageDropzone({ handleSubmit }: ImageDropzoneProps) {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const { edgestore } = useEdgeStore()
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  async function handleClick(formData: FormData) {
    if (acceptedFiles[0]) {
      const res = await edgestore.myPublicImages.upload({ file: acceptedFiles[0], onProgressChange: (progress) => setProgress(progress) })
      await handleSubmit(formData, res.url)
      router.push('/homes')
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new FileReader

    file.onload = () => {
      setPreview(file.result)
    }

    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  })

  return (
    <>
      <div className='bg-stone-100/75 rounded-xl h-96 w-full flex justify-center items-center flex-wrap'>
        <div className={twMerge('h-3/4 w-3/4 flex justify-center items-center cursor-pointer', !preview ? 'border-dashed border-2 border-slate-300 rounded-xl' : null)} {...getRootProps()}>
          <input name='image' {...getInputProps()} />
          {
            !preview && <p className='mx-16 text-center font-bold text-xl'>Upload a photo of your place</p>
          }
          {preview && (
            <Image alt='image preview' src={preview as string} style={{ aspectRatio: '1/1', maxHeight: '320px' }} width={320} height={320} />
          )}
        </div>
        {(preview && progress !== 0 && progress !== 100) && (
          <div className='h-2 w-44 border rounded overflow-hidden duration-150'>
            <div className='h-full bg-black' style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      <button type='submit' formAction={handleClick} className='bg-custom-black px-14 py-2 xs:text-lg text-base text-white rounded-xl flex justify-center items-center gap-x-2 active:scale-95 transition-transform duration-200 cursor-pointer'>
        Publish
      </button >
    </>
  )
}