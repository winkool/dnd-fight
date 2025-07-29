import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import './Card.css';
import React from "react";
import {CardType, useCards} from "../../CardsContext";

interface CardProps {
    card: CardType;
}

const Card: React.FC<CardProps> = ({
                                       card
                                   }) => {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id:card.id});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        willChange: 'transform',
    };
    const {updateCard, deleteCard} = useCards();
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCard(card.id, {text: e.target.value});
    };
    const handleInitiativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCard(card.id, {initiative: Number(e.target.value)});
    };
    const handleCardValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCard(card.id, {value: Number(e.target.value)});
    }
    const handleCardMaxHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCard(card.id, {max_hp: Number(e.target.value)});
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
             className={`card ${isDragging ? 'card-dragging' : ''}`}
        >
            <div className="card-content">
                <input
                    type="text"
                    value={card.text}
                    onChange={handleTextChange}
                    className="card-input card-name-input"
                />
                <div className="initiative-health-container">
                    <div className="initiative-container">
                        <label className={'card-label'}>Инициатива</label>
                        <input
                            type="number"
                            min={-999}
                            value={card.initiative}
                            onChange={handleInitiativeChange}
                            className="card-input input-numeric"
                        />
                    </div>
                    <div className="hp-container">
                        <label className={'card-label'}>Здоровье</label>
                        <div className="health-inputs">
                            <input
                                type="number"
                                value={card.value}
                                onChange={handleCardValueChange}
                                className="card-input input-numeric"
                            />
                            <span className="health-separator">/</span>
                            <input
                                type="number"
                                min={-999}
                                value={card.max_hp}
                                onChange={handleCardMaxHpChange}
                                className="card-input input-numeric"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button className="card-delete-button" onClick={() => deleteCard(card.id)}>Удалить</button>
        </div>
    );
};

export default Card;