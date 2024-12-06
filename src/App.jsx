import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card.jsx';
import Scoreboard from './ScoreBoard.jsx';
const App = () => {
    const [cards, setCards] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [clickedCards, setClickedCards] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        const fetchedCards = data.results.map((pokemon, index) => ({
            id: index,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
        setCards(fetchedCards);
    };

    const handleCardClick = (id) => {
        if (clickedCards.includes(id)) {
            setCurrentScore(0);
            setClickedCards([]);
            setFeedbackMessage("You clicked the same card again! Score reset.");
        } else {
            setCurrentScore(prevScore => prevScore + 1);
            setClickedCards([...clickedCards, id]);
            
            if (currentScore + 1 > bestScore) {
                setBestScore(currentScore + 1);
            }
            shuffleCards();
            setFeedbackMessage("");
        }
    };
    
    const shuffleCards = () => {
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
    };

    return (
        <div>
            <h1 className='text-4xl font-bold text-left text-blue-600' >Memory Card Game</h1>
            <Scoreboard currentScore={currentScore} bestScore={bestScore} />
            {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
            <div className="card-container">
                {cards.map(card => (
                    <Card
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        image={card.image}
                        onClick={handleCardClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;