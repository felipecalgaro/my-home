import { getHomesService } from '@/services/getHomesService';
import { Card } from './Card';
import { Location } from '@/entities/Home';
import { PaginationButton } from './PaginationButton';
import { ObjectKeys } from '@/types';

interface HomesSectionProps {
  filter: {
    location: string | null,
    minPrice: number | null,
    maxPrice: number | null
  },
  currentSkip: number
  homesPerPage: number
}

export async function HomesSection({ filter, homesPerPage, currentSkip }: HomesSectionProps) {
  const homes = await getHomesService({ skip: currentSkip, take: homesPerPage })

  function formatStringToFilter(text: string) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") // São Paulo => sao paulo
  }

  function getFilterMethods(homeLocation: Location, homePrice: number) {
    return {
      location() {
        return formatStringToFilter(homeLocation[0]).startsWith(formatStringToFilter(filter.location!)) || formatStringToFilter(homeLocation[1]).startsWith(formatStringToFilter(filter.location!))
      },
      minPrice() {
        return homePrice > filter.minPrice!
      },
      maxPrice() {
        return homePrice < filter.maxPrice!
      }
    }
  }

  const validFilters = (Object.keys(filter) as ObjectKeys<typeof filter>).filter(filterKey => filter[filterKey] !== null) // check which filters should be applied (the ones that are not null)

  const filteredHomes = homes.filter(home => {
    const filterMethods = getFilterMethods(home.location, home.price)

    return validFilters.map(filter => {
      return filterMethods[filter]()
    }).every(res => res === true)
  })

  return (
    <>
      {filteredHomes.length > 0 ? (
        <>
          <section className='pt-20 pb-12 md:px-16 px-4 px flex justify-center items-start flex-wrap gap-x-10 gap-y-20 min-h-[500px]'>
            {filteredHomes.map((home) => (
              <Card id={home.id} isAvailable={home.isAvailable} imageUrl={home.image_url} location={home.location} price={home.price} key={home.id} />
            ))}
          </section>
          {currentSkip === 0 ? (
            <section className='flex justify-center items-center mb-10 gap-x-8'>
              <PaginationButton currentSkip={currentSkip} navigationType='NEXT' skip={homesPerPage} iconUrl='/next.svg' />
            </section>
          ) : (
            <section className='flex justify-center items-center mb-10 gap-x-8'>
              <PaginationButton currentSkip={currentSkip} navigationType='PREVIOUS' skip={homesPerPage} iconUrl='/previous.svg' />
              <PaginationButton currentSkip={currentSkip} navigationType='NEXT' skip={homesPerPage} iconUrl='/next.svg' />
            </section>
          )}
        </>
      ) : (
        <>
          <div className='h-[515px] flex justify-center items-center'>
            <h1 className='text-center text-xl'>No homes could be found.</h1>
          </div>
          <section className='flex justify-center items-center mb-10 gap-x-8'>
            <PaginationButton currentSkip={currentSkip} navigationType='PREVIOUS' skip={homesPerPage} iconUrl='/previous.svg' />
          </section>
        </>
      )}
    </>
  )
}