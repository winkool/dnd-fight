import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragAndDropContainer from './DragAndDropContainer';

const App: React.FC = () => {
    const initialCards = [
        { id: 1, text: 'Игрок 1', max_hp: 100 }
    ];

    return (
        <DndProvider backend={HTML5Backend}>
            <DragAndDropContainer initialCards={initialCards} />
        </DndProvider>
    );
};

export default App;