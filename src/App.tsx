import React from 'react';
import './App.css';
import {CardsProvider} from "./componnents/CardsProvider";
import AddCardForm from "./componnents/addCardForm/AddCardForm";
import DnDWrapper from "./componnents/DnDWrapper";
import SortByInitiative from "./componnents/sortByIniciative/sortByIniciative";


const App: React.FC = () => {
    return (
        <div className="App">
            <CardsProvider>
                <AddCardForm/>
                <SortByInitiative/>
                <DnDWrapper/>
            </CardsProvider>
        </div>
    );
};

export default App;