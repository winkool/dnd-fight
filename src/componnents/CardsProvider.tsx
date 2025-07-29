// CardsProvider.tsx
import React, {useState, useEffect} from 'react';
import {CardType, CardsContext} from "../context/CardsContext";

interface CardsProviderProps {
    children: React.ReactNode;
}


export const CardsProvider: React.FC<CardsProviderProps> = ({children}) => {
    const [cards, setCards] = useState<CardType[]>(() => {
        const saved = localStorage.getItem('cards');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards));
    }, [cards]);

    const addCard = (newCard: CardType) => setCards(prev => [...prev, newCard]);

    const updateCard = (id: number, updatedFields: Partial<CardType>) => {
        setCards(prev =>
            prev.map(card => (card.id === id ? {...card, ...updatedFields} : card))
        );
    };

    const deleteCard = (id: number) => {
        setCards(prev => prev.filter(card => card.id !== id));
    };

    return (
        <CardsContext.Provider value={{cards, setCards, updateCard, deleteCard, addCard}}>
            {children}
        </CardsContext.Provider>
    );
};
