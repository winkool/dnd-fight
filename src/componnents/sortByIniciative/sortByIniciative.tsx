import {useCards} from "../../context/CardsContext";


const SortByInitiative = () => {
    const {sortCardsByInitiativeAsc} = useCards();
    return <button onClick={sortCardsByInitiativeAsc} className="button sort-button">
        Sort by Initiative
    </button>
}

export default SortByInitiative;