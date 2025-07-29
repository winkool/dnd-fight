import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import './Card.css';
import React from "react";
import {CardType, useCards} from "../../context/CardsContext";

const Card: React.FC<CardType> = ({
                                      id,
                                      text,
                                      max_hp,
                                      value,
                                      initiative,
                                  }) => {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        willChange: 'transform',
    };
    const {updateCard, deleteCard} = useCards();
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCard(id, {text: e.target.value});
    };
    const handleInitiativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCard(id, {initiative: Number(e.target.value)});
    };
    const handleCardValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCard(id, {value: Number(e.target.value)});
    }
    const handleCardMaxHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCard(id, {max_hp: Number(e.target.value)});
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
             className={`card ${isDragging ? 'card-dragging' : ''}`}
        >
            <div className="card-content">
                <input
                    type="text"
                    value={text}
                    onChange={handleTextChange}
                    className="card-input card-name-input"
                />
                <div className="initiative-health-container">
                    <div className="initiative-container">
                        <label className={'card-label'}>Инициатива</label>
                        <input
                            type="number"
                            min={-999}
                            value={initiative}
                            onChange={handleInitiativeChange}
                            className="card-input input-numeric"
                        />
                    </div>
                    <div className="hp-container">
                        <label className={'card-label'}>Здоровье</label>
                        <div className="health-inputs">
                            <input
                                type="number"
                                value={value}
                                onChange={handleCardValueChange}
                                className="card-input input-numeric"
                            />
                            <span className="health-separator">/</span>
                            <input
                                type="number"
                                min={-999}
                                value={max_hp}
                                onChange={handleCardMaxHpChange}
                                className="card-input input-numeric"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button className="card-delete-button" onClick={() => deleteCard(id)}>Удалить</button>
        </div>
    );
};

export default Card;