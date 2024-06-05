import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { addCard } from '../service/cards';
import { Button, Card, TextField } from '@mui/material';
import Loading from '../Loading';

export const Route = createLazyFileRoute('/deck/$deck_id/add')({
  component: Add,
  pendingComponent: Loading,
})

function Add() {
  const deckId = Route.useParams().deck_id;
  const navigate = Route.useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({e})
    const formData = new FormData();
    console.log('file', e.target[4].files[0]);
    formData.append('deck_id', deckId);
    formData.append('question', e.target[0].value);
    formData.append('answer', e.target[2].value);
    formData.append('file', e.target[4].files[0]);
    await addCard(formData)
    navigate({
      to: `/deck/${deckId}`,
    });

  }
  return <div className="p-2 bg-gray h-screen">
    <h1 className='text-3xl font-medium'>Add new card</h1>
    <Link to={`/deck/${deckId}`} className="font-medium">Go back</Link>
    <form onSubmit={onSubmit}>
      <Card className='p-4'>
        <TextField label="Question"  type="text" placeholder="Question" /><br />
      <TextField type="text" placeholder="Answer" /><br />
      <input type="file" /><br />
      <Button type="submit" variant='contained'>Add</Button>
      </Card>
    </form>
  </div>
}