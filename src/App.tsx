import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {CurrencyCalculation} from "./components/pages/CurrencyСalculation";
import Application from "./components/Application";



const App = () => {

    return (
        <div className="App">
                <Routes>
                    <Route path={'/'} element={<Application/>}></Route>
                    <Route path={'/currency'} element={<CurrencyCalculation/>}>
                    </Route>
                </Routes>

        </div>
    );
}

export default App;
