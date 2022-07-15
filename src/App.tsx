import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {CurrencyCalculation} from "./components/pages/CurrencyСalculation";
import {ApplicationMain} from "./components/pages/ApplicationMain ";

const App = () => {

    return (
        <div className="App">
            <Routes>
                <Route path={"/currency/:id"} element={<CurrencyCalculation/>}></Route>
                <Route path={"/*"} element={<ApplicationMain/>}></Route>
            </Routes>
        </div>
    );
}

export default App;