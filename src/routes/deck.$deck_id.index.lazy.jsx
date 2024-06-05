import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { cardsQueryOptions } from "../cardsQueryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { deleteCard } from "../service/cards";
import { decksQueryOptions } from "../decksQueryOptions";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { useState } from "react";
import Loading from "../Loading";

export const Route = createLazyFileRoute("/deck/$deck_id/")({
    component: DeckCards,
    loader: ({ context: { queryClient } }) => {
        return async () => {
            await queryClient.ensureQueryData(decksQueryOptions);
            await queryClient.ensureQueryData(cardsQueryOptions);
        };
    },
  pendingComponent: Loading,
});

function DeckCards() {
    const [currentCard, setCurrentCard] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const cardsQuery = useSuspenseQuery(cardsQueryOptions);
    const decksQuery = useSuspenseQuery(decksQueryOptions);
    const deckId = Route.useParams().deck_id;
    const cards = cardsQuery.data.filter((card) => card.deck_id === deckId);
    const deck = decksQuery.data.find((deck) => deck.id === deckId);
    return (
        <div className="p-4 bg-gray h-screen">
            <h1 className="text-3xl font-medium">{deck.name}</h1>
            <div className="flex justify-between items-center">
                <div>
                    <Link to={`/`}> Go back</Link>
                </div>
                <Link to={`/deck/${deckId}/add`}>
                    <Button variant="contained">Add Card</Button>
                </Link>
            </div>
            {cards.length === 0 && <p>No cards found</p>}
            {cards.length === 1 && (
                <p> Add more cards to toggle through cards</p>
            )}
            {cards[currentCard] && (
                <>
                    <Card className="my-3 w-96">
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {showAnswer ? "Answer " : "Question "} #
                                {currentCard + 1}
                            </Typography>
                            {showAnswer && (
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={cards[currentCard].file_url}
                                    alt="answer image"
                                />
                            )}
                            <Typography variant="h5" component="div">
                                {showAnswer
                                    ? cards[currentCard].a
                                    : cards[currentCard].q}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                onClick={() => {
                                    setShowAnswer(!showAnswer);
                                }}
                            >
                                {showAnswer ? "Hide " : "Reveal "} Answer
                            </Button>
                        </CardActions>
                    </Card>
                    {currentCard !== 0 && (
                        <Button
                            style={{
                                marginRight: "10px",
                            }}
                            variant="contained"
                            onClick={() => {
                                setCurrentCard(currentCard - 1);
                                setShowAnswer(false);
                            }}
                        >
                            Previous Question
                        </Button>
                    )}
                    {currentCard !== cards.length - 1 && (
                        <Button
                            variant="contained"
                            onClick={() => {
                                setCurrentCard(currentCard + 1);
                                setShowAnswer(false);
                            }}
                        >
                            Next Question
                        </Button>
                    )}{" "}
                </>
            )}
        </div>
    );
}
