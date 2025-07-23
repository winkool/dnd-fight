import React, {useState} from "react";
import './AddCardForm.css';

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
                        onChange={(e) => setNewCardInitiative(Number(e.target.value))}
                        className="card-input input-numeric"
                    />
                </div>

                <div className="hp-container">
                    <label htmlFor="max_hp" className="card-label">Максимальное здоровье</label>
                    <input
                        type="number"
                        placeholder="Max HP"
                        value={newCardMaxHp}
                        onChange={(e) => setNewCardMaxHp(Number(e.target.value))}
                        className="card-input input-numeric"
                    />
                </div>

                <button type="submit" className="card-button">Добавить карточку</button>
            </form>
        </div>
    )
}

export default AddCardForm;