import React, {useEffect, useState} from 'react';
import {
    DndContext,
    KeyboardSensor,
    useSensor,
    useSensors,
    closestCorners, MouseSensor, TouchSensor,
} from "@dnd-kit/core";
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';

import Column from './componnents/Column/Column';
import AddCardForm from "./componnents/addCardForm/AddCardForm";
import "./App.css";
import {CardsContext, CardType} from './CardsContext';

const App: React.FC = () => {
    const initialCards = [
        {id: 1, text: 'Игрок 1', max_hp: 100}
    ];

    const sensors = useSensors(
        useSensor(MouseSensor, {
            // Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            // Press delay of 250ms, with tolerance of 5px of movement
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const [cards, setCards]: [CardType[], React.Dispatch<React.SetStateAction<CardType[]>>] = useState(() => {
        const savedCards = localStorage.getItem('cards');
        return savedCards
            ? JSON.parse(savedCards)
            : initialCards.map((card: { id: number; text: string; max_hp: number }) => ({
                ...card,
                value: card.max_hp,
                initiative: 0,
            }));
    });
    const addCard = (newCard: CardType) => {
        setCards((prev: CardType[]) => [...prev, newCard]);
    }

    const updateCard = (id: number, updatedFields: Partial<CardType>) => {
        setCards((prev: CardType[]) =>
            prev.map(card =>
                card.id === id ? {...card, ...updatedFields} : card
            )
        );
    };
    const deleteCard = (id: number) => {
        setCards(cards.filter((card: { id: number; }) => card.id !== id));
    };
    const getTaskPos = (id: number) => cards.findIndex((card: { id: number }) => card.id === id);

    const handleDragStart = () => {
        window.addEventListener('touchmove', preventScroll, {passive: false});
    };

    const handleDragEnd = (event: { active: any; over: any }) => {
        console.log('Drag End:', event);
        window.removeEventListener('touchmove', preventScroll);
        const {active, over} = event;
        if (active.id === over.id) return;
        setCards((cards) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);

            return arrayMove(cards, originalPos, newPos);
        });
    };
    useEffect(() => {
        console.log('Cards updated:', cards);
        localStorage.setItem('cards', JSON.stringify(cards));
    }, [cards]);
    const preventScroll = (e: TouchEvent) => {
        e.preventDefault();
    };

    const sortByInitiative = () => {
        const sortedCards = [...cards].sort((a, b) => b.initiative - a.initiative);
        setCards(sortedCards);
    };

    return (
        <div className="App">
            <CardsContext.Provider value={{cards, updateCard, deleteCard, addCard}}>
                <AddCardForm/>
                <button onClick={sortByInitiative} className="button sort-button">
                    Sort by Initiative
                </button>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
                >

                    <Column/>
                </DndContext>
            </CardsContext.Provider>

        </div>
    );
};

export default App;