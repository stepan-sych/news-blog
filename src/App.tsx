import React from 'react';
import {FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaViber, FaYoutube} from "react-icons/fa";
import './App.css';
import CurrentDate from "./components/CurrentDate";

const App = () => {

    return (
        <div className="App">
            <header className="Header">
                <CurrentDate/>
                <div className="App-icons">
                    <a className="Icon" href="https://facebook.com/"><FaFacebook size={20}/></a>
                    <a className="Icon" href="https://youtube.com/"><FaYoutube size={20}/></a>
                    <a className="Icon" href="https://instagram.com/"><FaInstagram size={20}/></a>
                    <a className="Icon" href="https://telegram.com/"><FaTelegram size={20}/></a>
                    <a className="Icon" href="https://viber.com/"><FaViber size={20}/></a>
                    <a className="Icon" href="https://twitter.com/"><FaTwitter size={20}/></a>
                </div>
            </header>
            <div className="App-background-image">
            </div>
        </div>
    );
}

export default App;
