import React from 'react';
import "./App.css";
import {Route, Routes} from "react-router-dom";
import {CurrencyCalculation} from "./components/pages/CurrencyСalculation";
import {ApplicationMain} from "./components/pages/ApplicationMain ";

const App = () => {
    const currencyConverter: string = "/currency";
    const mainPage: string = "/*";


    return (
        <div className="App">
            <Routes>
                <Route path={`${currencyConverter}/:id`} element={<CurrencyCalculation/>}></Route>
                <Route path={`${mainPage}`} element={<ApplicationMain/>}></Route>
            </Routes>
        </div>
    );
}

export default App;