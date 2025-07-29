import {createContext, useContext} from 'react';

export interface CardType {
    id: number;
    text: string;
    max_hp: number;
    value: number;
    initiative: number;
}

interface CardsContextType {
    cards: CardType[];
    updateCard: (id: number, updatedFields: Partial<CardType>) => void;
    deleteCard: (id: number) => void;
    addCard: (newCard: CardType) => void;
}

export const CardsContext = createContext<CardsContextType | null>(null);

export const useCards = () => {
    const context = useContext(CardsContext);
    if (!context) throw new Error('useCards must be used within CardsProvider');
    return context;
};
