import { EdgeStoreProvider } from '@/lib/edgestore'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyHome',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <header className='flex flex-col gap-y-8 justify-center items-center py-6'>
          <Image src='/logo.svg' alt='My Home logo' width={250} height={250} priority={true} />
          <hr className='w-2/3' />
        </header>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  )
}
