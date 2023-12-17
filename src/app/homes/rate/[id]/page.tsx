import { RatingOption } from '@/components/RatingOption'
import { getHomeByIdService } from '@/services/getHomeByIdService'
import { rateHomeService } from '@/services/rateHomeService'
import Image from 'next/image'

interface RateProps {
  params: {
    id: string
  }
}

export default async function Rate({ params }: RateProps) {
  const home = await getHomeByIdService({ id: params.id })

  async function submitRating(newRating: number) {
    'use server'

    await rateHomeService({
      ratingId: home.rating.id,
      currentAverageRating: Number(home.rating.average),
      amountOfRatings: Number(home.rating.amount),
      newRating
    })
  }

  const ratingOptions = [
    {
      text: 'Péssima',
      icon: '😡'
    },
    {
      text: 'Ruim',
      icon: '☹️'
    },
    {
      text: 'Aceitável',
      icon: '🫤'
    },
    {
      text: 'Boa',
      icon: '🙂'
    },
    {
      text: 'Excelente',
      icon: '🤩'
    },
  ]

  return (
    <div className='flex justify-center items-center flex-col xs:px-20 px-10 gap-16 pt-12 pb-20'>
      <h1 className='text-3xl font-medium text-center'>Avalie o lugar que você reservou</h1>
      <Image alt='home' src={home.image_url} width={320} height={320} />
      <h3 className='text-xl font-medium text-center'>Como foi a sua estadia?</h3>
      <form className='flex justify-center items-center xs:gap-x-16 gap-x-8 flex-wrap gap-y-8'>
        {ratingOptions.map((option, index) => (
          <RatingOption
            submitRating={submitRating}
            icon={option.icon}
            ratingValue={index + 1}
            text={option.text}
            key={index}
          />
        ))}
      </form>
    </div>
  )
}