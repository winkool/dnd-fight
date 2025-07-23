import React, {useEffect, useState} from 'react';
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from "@dnd-kit/core";
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';

import Column from './componnents/Column/Column';
import AddCardForm from "./componnents/addCardForm/AddCardForm";
import "./App.css";
const App: React.FC = () => {
    const initialCards = [
        {id: 1, text: 'Игрок 1', max_hp: 100}
    ];

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // px — перетаскивание начнётся только после движения мыши на 8px
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const deleteCard = (id: number) => {
        setCards(cards.filter((card: { id: number; }) => card.id !== id));
    };
    const [cards, setCards] = useState(() => {
        const savedCards = localStorage.getItem('cards');
        return savedCards
            ? JSON.parse(savedCards)
            : initialCards.map((card: { id: number; text: string; max_hp: number }) => ({
                ...card,
                value: card.max_hp,
                initiative: 0,
            }));
    });
    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards));
    }, [cards]);
    const getTaskPos = (id: number) => cards.findIndex((card: { id: number }) => card.id === id);

    const handleDragEnd = (event: { active: any; over: any }) => {
        const {active, over} = event;
        if (active.id === over.id) return;
        setCards((cards: { id: number; text: string; max_hp: number }[]) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);

            return arrayMove(cards, originalPos, newPos);
        });
    };

    const updateCardText = (id: number, newText: string) => {
        setCards(cards.map((card: { id: number, text: string; }) =>
            card.id === id ? {...card, text: newText} : card
        ));
    };


    const updateCardValue = (id: number, newValue: string) => {
        if (newValue.length <= 4) {
            setCards(cards.map((card: { id: number; }) => (card.id === id ? {...card, value: newValue} : card)));
        }
    };

    const updateCardMaxHp = (id: number, newMaxHp: string) => {
        if (newMaxHp.length <= 4) {
            setCards(cards.map((card: { id: number; }) => (card.id === id ? {...card, max_hp: newMaxHp} : card)));
        }
    };

    const updateCardInitiative = (id: number, newInitiative: string) => {
        if (newInitiative.length <= 3) {
            setCards(cards.map((card: { id: number; }) => (card.id === id ? {
                ...card,
                initiative: newInitiative
            } : card)));
        }
    };
    const sortByInitiative = () => {
        const sortedCards = [...cards].sort((a, b) => b.initiative - a.initiative);
        setCards(sortedCards);
    };
    return (
        <div className="App">
            <AddCardForm
                cards={cards}
                setCards={setCards}
            />
            <button onClick={sortByInitiative} className="button sort-button">
                Sort by Initiative
            </button>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <Column
                    cards={cards}
                    updateCardText={updateCardText}
                    updateCardValue={updateCardValue}
                    updateCardMaxHp={updateCardMaxHp}
                    updateCardInitiative={updateCardInitiative}
                    deleteCard={deleteCard}
                />
            </DndContext>
        </div>
    );
};

export default App;