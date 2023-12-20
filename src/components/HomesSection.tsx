import { getHomesService } from '@/services/getHomesService';
import { Card } from './Card';
import { Location } from '@/entities/Home';
import { PaginationButton } from './PaginationButton';

interface HomesSectionProps {
  filter: {
    location: string | null,
    minPrice: number | null,
    maxPrice: number | null
  }
}

export async function HomesSection({ filter }: HomesSectionProps) {
  const homes = await getHomesService()

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

  const validFilters = (Object.keys(filter) as (keyof typeof filter)[]).filter(filterKey => filter[filterKey] !== null) // check which filters should be applied (the ones that are not null)

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
          <section className='py-20 md:px-16 px-4 px flex justify-center items-start flex-wrap gap-x-10 gap-y-20'>
            {filteredHomes.map((home) => (
              <Card id={home.id} isAvailable={home.isAvailable} imageUrl={home.image_url} location={home.location} price={home.price} key={home.id} />
            ))}
          </section>
          <section className='flex justify-center items-center mb-10 gap-x-8'>
            <PaginationButton iconUrl='/previous.svg' />
            <PaginationButton iconUrl='/next.svg' />
          </section>
        </>
      ) : (
        <h1 className='text-center mt-60 text-xl'>No homes match the specifications given.</h1>
      )}
    </>
  )
}