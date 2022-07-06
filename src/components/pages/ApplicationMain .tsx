import React from 'react';
import CurrentDate from "../header_components/CurrentDate";
import {Link} from "react-router-dom";
import {CurrencyRate} from "../api/CurrencyRate";
import {WiCelsius, WiCloudRefresh} from "react-icons/wi";
import SocialIcons from "../header_components/SocialIcons";
import NavigationMenu from "../header_components/NavigationMenu";
import {FaSearch} from "react-icons/fa";
import {MainArticles} from "../header_components/MainArticles";
import {AverageSalary} from "../header_components/AverageSalary";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    wrapper: {
        backgroundImage: "url(/free-website-background-07.jpg)",
        objectFit: "cover",
    },
});

export const ApplicationMain = () => {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className="Container">
                <header className="Header">
                    <div className="Header-items">
                        <CurrentDate/>
                        <Link to={'/currency'}><CurrencyRate/></Link>
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
                    <img src="/public/mainLogo.svg" alt=""/>
                    <h2>ЗАГОЛОВОК ГОЛОВНОЇ НОВИНИ ДНЯ!</h2>
                </div>
                <MainArticles/>
            </div>
            <AverageSalary/>
        </div>

    );
};
