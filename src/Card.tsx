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
    updateCardValue: (id: number, newValue: number) => void;
    updateCardInitiative: (id: number, newInitiative: number) => void;
    updateCardText: (id: number, newText: string) => void;
    updateCardMaxHp: (id: number, newMaxHp: number) => void;
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
                <input
                    type="number"
                    min={0}
                    max={max_hp}
                    value={value}
                    onChange={(e) => updateCardValue(id, Number(e.target.value))}
                    className="card-input"
                />
                /
                <input
                    type="number"
                    min={0}
                    value={max_hp}
                    onChange={(e) => updateCardMaxHp(id, Number(e.target.value))}
                    className="card-input"
                />
                <input
                    type="number"
                    min={0}
                    value={initiative}
                    onChange={(e) => updateCardInitiative(id, Number(e.target.value))}
                    className="card-input"
                />
            </div>
            <button onClick={() => deleteCard(id)} className="card-delete-button">
                Delete
            </button>
        </div>
    );
};

export default Card;