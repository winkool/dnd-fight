import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragAndDropContainer from './DragAndDropContainer';

const App: React.FC = () => {
    const initialCards = [
        { id: 1, text: 'Игрок 1', max_hp: 100 },
        { id: 2, text: 'Игрок 2', max_hp: 100 },
        { id: 3, text: 'Игрок 3', max_hp: 100 },
        { id: 4, text: 'Игрок 4', max_hp: 100 },
        { id: 5, text: 'Зомби 1', max_hp: 100 },
        { id: 6, text: 'Зомби 2', max_hp: 100 },
        { id: 7, text: 'Зомби 3', max_hp: 100 },
        { id: 8, text: 'Зомби 4', max_hp: 100 },
        { id: 9, text: 'Зомби 5', max_hp: 100 },
    ];

    return (
        <DndProvider backend={HTML5Backend}>
            <DragAndDropContainer initialCards={initialCards} />
        </DndProvider>
    );
};

export default App;