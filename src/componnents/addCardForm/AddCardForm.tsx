import React, {useState} from "react";
import {CardProps} from "../../CardProps";

interface DragAndDropContainerProps {
    cards: any;
    setCards: React.Dispatch<React.SetStateAction<any>>;
}
const AddCardForm: React.FC<DragAndDropContainerProps> = ({cards, setCards}) => {
    const [newCardText, setNewCardText] = useState('');
    const [newCardMaxHp, setNewCardMaxHp] = useState(100);
    const [newCardInitiative, setNewCardInitiative] = useState(0);

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCardText.trim() === '') return;

        const newCard = {
            id: Date.now(),
            text: newCardText,
            max_hp: newCardMaxHp,
            value: newCardMaxHp,
            initiative: newCardInitiative,
        };
        setCards([...cards, newCard]);
        setNewCardText('');
        setNewCardMaxHp(100);
        setNewCardInitiative(0);
    };
    return (
        <form onSubmit={handleAddCard} className="form">
            <input
                type="text"
                placeholder="Добавить карточку"
                value={newCardText}
                onChange={(e) => setNewCardText(e.target.value)}
                className="input"
            />
            <div className="initiative-container">
                <label htmlFor={`initiative`} className="card-label">Инициатива</label>
                <input
                    type="number"
                    min={0}
                    placeholder="Initiative"
                    value={newCardInitiative}
                    onChange={(e) => setNewCardInitiative(Number(e.target.value))}
                    className="card-input input-numeric"
                />
            </div>
            <label htmlFor="max_hp" className="card-label">Максимальное здоровье</label>
            <input
                type="text"
                placeholder="Max HP"
                value={newCardMaxHp}
                onChange={(e) => setNewCardMaxHp(Number(e.target.value))}
                className="card-input input-numeric"
            />

            <button type="submit" className="card-button">Add Card</button>
        </form>
    )
}

export default AddCardForm;