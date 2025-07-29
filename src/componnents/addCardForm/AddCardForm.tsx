import React, {useState} from "react";
import './AddCardForm.css';
import {useCards} from "../../CardsContext";

interface DragAndDropContainerProps {
}

const AddCardForm: React.FC<DragAndDropContainerProps> = () => {
    const [newCardText, setNewCardText] = useState('');
    const [newCardMaxHp, setNewCardMaxHp] = useState(100);
    const [newCardInitiative, setNewCardInitiative] = useState(0);

    const {addCard} = useCards();
    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCardText.trim() === '') return;
        addCard({
            id: Date.now(),
            text: newCardText,
            max_hp: newCardMaxHp,
            value: newCardMaxHp,
            initiative: newCardInitiative,
        });
        setNewCardText('');
        setNewCardMaxHp(100);
        setNewCardInitiative(0);
    };

    const createHandleNumChange = (setValue: React.Dispatch<React.SetStateAction<number>>) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value || '0'; // Default to '0' if the input is empty
            const numericValue = Number(value); // Convert to a number
            e.target.value = String(numericValue)
            setValue(numericValue); // Update the state
        };
    };

// Usage
    const handleInitiativeChange = createHandleNumChange(setNewCardInitiative);
    const handleMaxHpChange = createHandleNumChange(setNewCardMaxHp);
    return (
        <div className="add-card-form-container">
            <form onSubmit={handleAddCard} className="form">
                <input
                    type="text"
                    placeholder="Добавить карточку"
                    value={newCardText}
                    onChange={(e) => setNewCardText(e.target.value)}
                    className="input"
                />

                <div className="initiative-container">
                    <label htmlFor="initiative" className="card-label">Инициатива</label>
                    <input
                        type="number"
                        min={0}
                        placeholder="Initiative"
                        value={newCardInitiative}
                        onChange={handleInitiativeChange}
                        className="card-input input-numeric"
                    />
                </div>

                <div className="hp-container">
                    <label htmlFor="max_hp" className="card-label">Максимальное здоровье</label>
                    <input
                        type="number"
                        placeholder="Max HP"
                        value={newCardMaxHp}
                        onChange={handleMaxHpChange}
                        className="card-input input-numeric"
                    />
                </div>

                <button type="submit" className="card-button">Добавить карточку</button>
            </form>
        </div>
    )
}

export default AddCardForm;