import React, {createContext, useContext} from 'react';

export interface CardType {
    id: number;
    text: string;
    max_hp: number;
    value: number;
    kd: number;
    initiative: number;
}

interface CardsContextType {
    cards: CardType[];
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
    updateCard: (id: number, updatedFields: Partial<CardType>) => void;
    deleteCard: (id: number) => void;
    addCard: (newCard: CardType) => void;
    sortCardsByInitiativeAsc: () => void;
}

export const CardsContext = createContext<CardsContextType>({} as CardsContextType);

export const useCards = () => {
    const context = useContext(CardsContext);
    if (!context) throw new Error('useCards must be used within CardsProvider');
    return context;
};
