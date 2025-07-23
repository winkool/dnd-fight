import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import './Card.css';
import React from "react";
import {CardProps} from "./CardProps";


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
                                   }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } =
        useSortable({id});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        willChange: 'transform', // Оптимизация

    };


    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={'card'}
        >
            <div className="card-content">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => updateCardText(id, e.target.value)}
                    className="card-input"
                />
                <label htmlFor={`iniciative-${id}`}>Инициатива</label>
                <input
                    type="number"
                    min={-999}
                    value={initiative}
                    onChange={(e) => updateCardInitiative(id, e.target.value)}
                    className="card-input, input-numeric"
                />
                <div className="health-container">
                    <label htmlFor={`health-${id}`}>Здоровье</label>
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
            <button
                // onClick={() => deleteCard(id)}
                className="card-delete-button">
                Delete
            </button>
        </div>
    );
};

export default Card;