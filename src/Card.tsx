import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import './Card.css';
import React from "react";

interface CardProps {
    id: number;
    text: string;
    max_hp: number;
    value: number;
    initiative: number;
    updateCardText: (id: number, text: string) => void;
    updateCardValue: (id: number, value: string) => void;
    updateCardMaxHp: (id: number, maxHp: string) => void;
    updateCardInitiative: (id: number, initiative: string) => void;
    deleteCard: (id: number) => void;
}

const Card: React.FC<CardProps> = ({
                                       id,
                                       text,
                                       max_hp,
                                       value,
                                       initiative,
                                       updateCardText,
                                       updateCardValue,
                                       updateCardMaxHp,
                                       updateCardInitiative,
                                       deleteCard,
                                   }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        willChange: 'transform',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}         className={`card ${isDragging ? 'card-dragging' : ''}`}
        >
            <div className="card-content">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => updateCardText(id, e.target.value)}
                    className="card-input card-name-input"
                />
                <div className="initiative-health-container">
                    <div className="initiative-container">
                        <label className={'card-label'}>Инициатива</label>
                        <input
                            type="number"
                            min={-999}
                            value={initiative}
                            onChange={(e) => updateCardInitiative(id, e.target.value)}
                            className="card-input input-numeric"
                        />
                    </div>
                    <div className="hp-container">
                        <label className={'card-label'}>Здоровье</label>
                        <div className="health-inputs">
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => updateCardValue(id, e.target.value)}
                                className="card-input input-numeric"
                            />
                            <span className="health-separator">/</span>
                            <input
                                type="number"
                                min={-999}
                                value={max_hp}
                                onChange={(e) => updateCardMaxHp(id, e.target.value)}
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