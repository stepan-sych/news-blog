import React, {useState} from 'react';
import "./App.css";
import {Route, Routes} from "react-router-dom";
import {CurrencyCalculation} from "./components/pages/CurrencyСalculation";
import {ApplicationMain} from "./components/pages/ApplicationMain ";
import {currencyConverter, errorPage, mainPage} from "./constants/PathConstants";
import {PageNotFound} from "./components/pages/PageNotFound";
import {ClipLoader} from "react-spinners";

const App = () => {
    const [loadingInProgress, setLoading] = useState(false);

    return (
        <div className="App">
            {loadingInProgress ? (
                <div className="loader-container">
                    <ClipLoader color={'#fff'} size={150} />
                </div>
            ) : (
            <Routes>
                <Route path={`${mainPage}`} element={<ApplicationMain/>}/>
                <Route path={`${currencyConverter}:select`} element={<CurrencyCalculation/>}/>
                <Route path={`${errorPage}`} element={<PageNotFound/>}/>
            </Routes>
                )}
        </div>
    );
}

export default App;