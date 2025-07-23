export interface CardProps {
    id: number;
    text: string;
    max_hp: number;
    value: number;
    initiative: number;
    updateCardText: (id: number, text: string) => void;
    updateCardValue: (id: number, newValue: string) => void;
    updateCardMaxHp: (id: number, newMaxHp: string) => void;
    updateCardInitiative: (id: number, newInitiative: string) => void;
}