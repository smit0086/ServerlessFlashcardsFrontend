import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { deleteCard, getCards } from '../service/cards';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { decksQueryOptions } from '../decksQueryOptions';
import { deleteDeck } from '../service/decks';
import { Avatar, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Loading from '../Loading';

export const Route = createLazyFileRoute('/')({
  component: Index,
  loader: ({context: {queryClient}}) => {
    return queryClient.ensureQueryData(decksQueryOptions);
  },
  pendingComponent: Loading,
})

function Index() {
  const decksQuery = useSuspenseQuery(decksQueryOptions)
  const decks = decksQuery.data;
  const {mutate} = useMutation({
    mutationFn: (id) => {
      deleteDeck(id)
    },
    onSuccess: () => {
      decksQuery.refetch();
    }
  })
  return (
    <div className="p-2 bg-gray h-screen">
      <h1 className='text-3xl font-medium'>Welcome to Serverless Flashcards!</h1>
      <div className='flex justify-between'><p>Select a deck to continue</p>
      <Link to="/add"><Button variant='contained' color='primary'>Create new Deck</Button></Link></div>
      <ul>
        
        {decks.map(deck => (
          <li key={deck.id}>
            <div className='my-4 p-4 border-2'>
              <h2 className='text-xl font-medium'>{deck.name}</h2>
              <Link to={`/deck/${deck.id}`}><Button variant='contained' >Learn this deck</Button></Link>
              <Button variant='contained' color='error' onClick={() => mutate(deck.id)}>Delete deck</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}