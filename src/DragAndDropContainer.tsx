import React, { useState, useEffect } from 'react';
import Card from './Card';
import './DragAndDropContainer.css'; // Import CSS file

interface DragAndDropContainerProps {
    initialCards: { id: number; text: string; max_hp: number }[];
}

const DragAndDropContainer: React.FC<DragAndDropContainerProps> = ({ initialCards }) => {
    const [cards, setCards] = useState(() => {
        const savedCards = localStorage.getItem('cards');
        return savedCards
            ? JSON.parse(savedCards)
            : initialCards.map(card => ({ ...card, value: card.max_hp, initiative: 0 }));
    });
    const [newCardText, setNewCardText] = useState('');
    const [newCardMaxHp, setNewCardMaxHp] = useState(100);
    const [newCardInitiative, setNewCardInitiative] = useState(0);

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards));
    }, [cards]);

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCardText.trim() === '') return;

        const newCard = {
            id: Date.now(),
            text: newCardText,
            max_hp: newCardMaxHp,
            value: newCardMaxHp,
            initiative: newCardInitiative,
        };

        setCards([...cards, newCard]);
        setNewCardText('');
        setNewCardMaxHp(100);
        setNewCardInitiative(0);
    };

    const sortByInitiative = () => {
        const sortedCards = [...cards].sort((a, b) => b.initiative - a.initiative);
        setCards(sortedCards);
    };
    const moveCard = (draggedId: number, targetId: number) => {
        const draggedIndex = cards.findIndex((card: { id: number; }) => card.id === draggedId);
        const targetIndex = cards.findIndex((card: { id: number; }) => card.id === targetId);

        const updatedCards = [...cards];
        const [draggedCard] = updatedCards.splice(draggedIndex, 1);
        updatedCards.splice(targetIndex, 0, draggedCard);

        setCards(updatedCards);
    };

    const deleteCard = (id: number) => {
        setCards(cards.filter((card: { id: number; }) => card.id !== id));
    };

    const updateCardText = (id: number, newText: string) => {
        setCards(cards.map((card: { id: number; }) => (card.id === id ? { ...card, text: newText } : card)));
    };

    const updateCardValue = (id: number, newValue: number) => {
        setCards(cards.map((card: { id: number; }) => (card.id === id ? { ...card, value: newValue } : card)));
    };

    const updateCardMaxHp = (id: number, newMaxHp: number) => {
        setCards(cards.map((card: { id: number; }) => (card.id === id ? { ...card, max_hp: newMaxHp } : card)));
    };

    const updateCardInitiative = (id: number, newInitiative: number) => {
        setCards(cards.map((card: { id: number; }) => (card.id === id ? { ...card, initiative: newInitiative } : card)));
    };
    return (
        <div className="container">
            <form onSubmit={handleAddCard} className="form">
                <input
                    type="text"
                    placeholder="Enter card text"
                    value={newCardText}
                    onChange={(e) => setNewCardText(e.target.value)}
                    className="input"
                />
                <input
                    type="number"
                    min={0}
                    placeholder="Max HP"
                    value={newCardMaxHp}
                    onChange={(e) => setNewCardMaxHp(Number(e.target.value))}
                    className="input"
                />
                <input
                    type="number"
                    min={0}
                    placeholder="Initiative"
                    value={newCardInitiative}
                    onChange={(e) => setNewCardInitiative(Number(e.target.value))}
                    className="input"
                />
                <button type="submit" className="button">Add Card</button>
            </form>
            <button onClick={sortByInitiative} className="button sort-button">
                Sort by Initiative
            </button>
            <div className="cards-container">
                {cards.map((card: { id: number; text: string; max_hp: number; value: number; initiative: number; }) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        text={card.text}
                        max_hp={card.max_hp}
                        value={card.value}
                        initiative={card.initiative}
                        moveCard={moveCard}
                        deleteCard={deleteCard}
                        updateCardValue={updateCardValue}
                        updateCardInitiative={updateCardInitiative}
                        updateCardText={updateCardText}
                        updateCardMaxHp={updateCardMaxHp}
                    />
                ))}
            </div>
        </div>
    );
};

export default DragAndDropContainer;