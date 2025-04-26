import React, { useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './Card.css'; // Импорт CSS

const ItemType = {
    CARD: 'card',
};

interface CardProps {
    id: number;
    text: string;
    max_hp: number;
    value: number;
    initiative: number;
    moveCard: (draggedId: number, targetId: number) => void;
    deleteCard: (id: number) => void;
    updateCardValue: (id: number, newValue: string) => void;
    updateCardInitiative: (id: number, newInitiative: string) => void;
    updateCardText: (id: number, newText: string) => void;
    updateCardMaxHp: (id: number, newMaxHp: string) => void;
}

const Card: React.FC<CardProps> = ({
                                       id,
                                       text,
                                       max_hp,
                                       value,
                                       initiative,
                                       moveCard,
                                       deleteCard,
                                       updateCardValue,
                                       updateCardInitiative,
                                       updateCardText,
                                       updateCardMaxHp,
                                   }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const [, drop] = useDrop({
        accept: ItemType.CARD,
        hover: (item: { id: number }) => {
            if (item.id !== id) {
                moveCard(item.id, id);
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType.CARD,
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    useEffect(() => {
        if (ref.current) {
            drag(drop(ref.current));
        }
    }, [drag, drop]);

    const cardClass = isDragging ? 'card dragging' : 'card';

    return (
        <div ref={ref} className={cardClass}>
            <div className="card-content">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => updateCardText(id, e.target.value)}
                    className="card-input"
                />
                <label htmlFor={`health-${id}`}>Здоровье</label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => updateCardValue(id, e.target.value)}
                    className="card-input, input-numeric"
                /><span>/</span>
                <input
                    type="number"
                    min={-999}
                    value={max_hp}
                    onChange={(e) => updateCardMaxHp(id, e.target.value)}
                    className="card-input, input-numeric"
                /><label htmlFor={`iniciative-${id}`}>Инициатива</label> <input
                type="number"
                min={-999}
                value={initiative}
                onChange={(e) => updateCardInitiative(id, e.target.value)}
                className="card-input, input-numeric"
            />
            </div>
            <button onClick={() => deleteCard(id)} className="card-delete-button">
                Delete
            </button>
        </div>
    );
};

export default Card;