import React from 'react';
import './App.css';
import {CardsProvider} from "./componnents/CardsProvider";
import AddCardForm from "./componnents/addCardForm/AddCardForm";
import DnDWrapper from "./componnents/DnDWrapper";


const App: React.FC = () => {
    return (
        <div className="App">
            <CardsProvider>
                <AddCardForm/>
                <DnDWrapper/>
            </CardsProvider>
        </div>
    );
};

export default App;