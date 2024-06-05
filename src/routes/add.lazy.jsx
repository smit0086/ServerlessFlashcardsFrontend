import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { addDeck } from '../service/decks';
import { Button, Card, Input, TextField } from '@mui/material';

export const Route = createLazyFileRoute('/add')({
  component: AddDeck,
})

function AddDeck() {
  const navigate = Route.useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: e.target[0].value
    }
    await addDeck(body);
    navigate({
      to: '/',
    });
  }
  return <div className="p-2 bg-gray h-screen">
    <h1 className='text-3xl font-medium'>Add new Deck</h1>
    <Link to="/" className="font-medium">Go back</Link>
    <form onSubmit={onSubmit}>
      <Card className='p-4'>
      <TextField label="Deck name" variant="outlined" type="text" placeholder="Deck name" /><br />
      <Button variant='contained' color='primary' type="submit">Add deck</Button>
      </Card>
    </form>
  </div>
}