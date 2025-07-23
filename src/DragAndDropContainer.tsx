import React from 'react';
import Card from './Card';
import './DragAndDropContainer.css';
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CardProps} from "./CardProps";

interface DragAndDropContainerProps {
    cards: CardProps[];
    updateCardText: (id: number, newText: string) => void;
    updateCardValue: (id: number, newValue: string) => void;
    updateCardMaxHp: (id: number, newMaxHp: string) => void;
    updateCardInitiative: (id: number, newInitiative: string) => void;
}

const DragAndDropContainer: React.FC<DragAndDropContainerProps> = (
    {
        cards,
        updateCardText,
        updateCardValue,
        updateCardMaxHp,
        updateCardInitiative
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
                    />
                ))}
            </SortableContext>
        </div>
    );
};

export default DragAndDropContainer;