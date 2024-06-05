import { queryOptions } from '@tanstack/react-query'
import { getCards } from './service/cards'

export const cardsQueryOptions = queryOptions({
    queryKey: ['cards'],
    queryFn: () => getCards(),
  })