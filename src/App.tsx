import React from 'react';
import './App.css';
import CurrentDate from "./components/CurrentDate";
import SocialIcons from './components/SocialIcons';
import {MainArticles} from "./components/MainArticles";
import {AverageSalary} from "./components/AverageSalary";
import NavigationMenu from "./components/NavigationMenu";
import {makeStyles} from "@mui/styles";
import {FaDollarSign, FaEuroSign, FaSearch} from "react-icons/fa";
import {WiCelsius, WiCloudRefresh} from "react-icons/wi";



const useStyles = makeStyles({
    wrapper: {
        backgroundImage: "url(/free-website-background-07.jpg)",
        objectFit: "cover",
    },
});



const App = () => {
    const classes = useStyles();
    return (
        <div className="App">
            <div className={classes.wrapper}>
                <div className="Container">
                    <header className="Header">
                        <div className="Header-items">
                            <CurrentDate/>
                            <div className="Currency"><FaDollarSign/>29.25</div>
                            <div className="Currency"><FaEuroSign/>31.50</div>
                            <div className="Weather">
                                <WiCloudRefresh/>
                                <div className="Value">+17</div>
                                <WiCelsius/>
                            </div>
                        </div>
                        <SocialIcons/>
                    </header>
                    <nav>
                        <NavigationMenu/>
                        <div className="Special-menu">
                            <div className="Menu Live">LIVE
                                <div className="Red-point">
                                </div>
                            </div>
                            <div className="Menu">RU</div>
                            <div className="Menu">EN</div>
                            <div className="Menu Search"><FaSearch/></div>
                        </div>
                    </nav>
                    <div className="Logo-title">
                        <img src="/mainLogo.svg" alt=""/>
                        <h2>ЗАГОЛОВОК ГОЛОВНОЇ НОВИНИ ДНЯ!</h2>
                    </div>
                    <MainArticles/>
                </div>
                <AverageSalary/>
            </div>
        </div>
    );
}

export default App;
