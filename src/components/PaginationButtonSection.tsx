import { PaginationButton } from './PaginationButton'

interface PaginationButtonSectionProps {
  previous?: boolean
  next?: boolean
  currentSkip: number
  homesPerPage: number
}

export function PaginationButtonSection({ previous, next, currentSkip, homesPerPage }: PaginationButtonSectionProps) {
  return (
    <section className='flex justify-center items-center mb-10 gap-x-8'>
      {previous && (
        <PaginationButton currentSkip={currentSkip} navigationType='PREVIOUS' skip={homesPerPage} iconUrl='/previous.svg' />
      )}
      {next && (
        <PaginationButton currentSkip={currentSkip} navigationType='NEXT' skip={homesPerPage} iconUrl='/next.svg' />
      )}
    </section>
  )
}