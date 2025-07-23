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
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        willChange: 'transform',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="card">
            <div className="card-content">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => updateCardText(id, e.target.value)}
                    className="card-input"
                />
                <label>Initiative</label>
                <input
                    type="number"
                    min={-999}
                    value={initiative}
                    onChange={(e) => updateCardInitiative(id, e.target.value)}
                    className="card-input input-numeric"
                />
                <div className="health-container">
                    <label>Health</label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => updateCardValue(id, e.target.value)}
                        className="card-input input-numeric"
                    />
                    <span>/</span>
                    <input
                        type="number"
                        min={-999}
                        value={max_hp}
                        onChange={(e) => updateCardMaxHp(id, e.target.value)}
                        className="card-input input-numeric"
                    />
                </div>
            </div>
            <button className="card-delete-button" onClick={() => deleteCard(id)}>Delete</button>
        </div>
    );
};

export default Card;