import React from 'react';
import Card from '../../Card';
import './Column.css';
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CardProps} from "../../CardProps";

interface DragAndDropContainerProps {
    cards: CardProps[];
    updateCardText: (id: number, newText: string) => void;
    updateCardValue: (id: number, newValue: string) => void;
    updateCardMaxHp: (id: number, newMaxHp: string) => void;
    updateCardInitiative: (id: number, newInitiative: string) => void;
    deleteCard: (id: number) => void;
}

const Column: React.FC<DragAndDropContainerProps> = (
    {
        cards,
        updateCardText,
        updateCardValue,
        updateCardMaxHp,
        updateCardInitiative,
        deleteCard
    }) => {
    return (
        <div className="column">
            <SortableContext items={cards} strategy={verticalListSortingStrategy}>
                {cards.map((card: CardProps) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        text={card.text}
                        max_hp={card.max_hp}
                        value={card.value}
                        initiative={card.initiative}
                        updateCardText={updateCardText}
                        updateCardValue={updateCardValue}
                        updateCardMaxHp={updateCardMaxHp}
                        updateCardInitiative={updateCardInitiative}
                        deleteCard={deleteCard}
                    />
                ))}
            </SortableContext>
        </div>
    );
};

export default Column;