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
      text: 'Terrible',
      icon: '😡'
    },
    {
      text: 'Bad',
      icon: '☹️'
    },
    {
      text: 'Acceptable',
      icon: '🫤'
    },
    {
      text: 'Good',
      icon: '🙂'
    },
    {
      text: 'Excellent',
      icon: '🤩'
    },
  ]

  return (
    <div className='flex justify-center items-center flex-col xs:px-20 px-10 gap-16 pt-12 pb-20'>
      <h1 className='text-3xl font-medium text-center'>Rate the place you just visited</h1>
      <Image alt='home' src={home.image_url} width={320} height={320} />
      <h3 className='text-xl font-medium text-center'>How was your stay?</h3>
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