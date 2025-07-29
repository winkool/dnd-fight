// DnDWrapper.tsx
import React from 'react';
import {
    DndContext,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    closestCorners
} from '@dnd-kit/core';
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import {useCards} from "../context/CardsContext";
import Column from "./Column/Column";

const DnDWrapper: React.FC = () => {
    const {cards, setCards} = useCards();

    const getCardPos = (id: number) => cards.findIndex(c => c.id === id);

    const sensors = useSensors(
        useSensor(MouseSensor, {activationConstraint: {distance: 10}}),
        useSensor(TouchSensor, {activationConstraint: {delay: 250, tolerance: 5}}),
        useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    );

    const preventScroll = (e: TouchEvent) => e.preventDefault();

    const handleDragStart = () => {
        window.addEventListener('touchmove', preventScroll, {passive: false});
    };

    const handleDragEnd = (event: { active: any; over: any }) => {
        window.removeEventListener('touchmove', preventScroll);
        const {active, over} = event;
        if (active.id === over.id) return;
        setCards((cards) => {
            const originalPos = getCardPos(active.id);
            const newPos = getCardPos(over.id);
            return arrayMove(cards, originalPos, newPos);
        });
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
        >
            <Column/>
        </DndContext>
    );
};

export default DnDWrapper;
