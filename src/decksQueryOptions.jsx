import { queryOptions } from '@tanstack/react-query'
import { getDecks } from './service/decks'

export const decksQueryOptions = queryOptions({
    queryKey: ['decks'],
    queryFn: () => getDecks(),
  })
