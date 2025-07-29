import React from 'react';
import Card from '../Card/Card';
import './Column.css';
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {CardType, useCards} from "../../CardsContext";



const Column: React.FC = () => {
    const {cards} = useCards();

    return (
        <div className="column">
            <SortableContext items={cards} strategy={verticalListSortingStrategy}>
                {cards.map((card: CardType) => (
                    <Card key={card.id} card={card}/>
                ))}
            </SortableContext>
        </div>
    );
};

export default Column;