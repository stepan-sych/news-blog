import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {CurrencyInput} from "../header_components/CurrencyInput";
import axios, {AxiosResponse} from "axios";
import {CurrencyRateType} from "../../types/CurrencyRateType";

const useStyles = makeStyles({
    goHome: {
        width: "100px",
        height: "50px",
        backgroundColor: "blue"
    },
    currencyForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
});

export const CurrencyCalculation: FC = (props): ReactElement => {
    const classes = useStyles();

    const [amountBuy, setAmountSale] = useState<number>(1);
    const [amountSale, setAmountBuy] = useState<number>(1);
    const [currencyBuy, setCurrencySale] = useState<string>("USD");
    const [currencySale, setCurrencyBuy] = useState<string>("USD");
    const [rates, setRates] = useState<CurrencyRateType[]>([]);



    useEffect(() => {
        axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then((response: AxiosResponse<CurrencyRateType[]>) => {
                setRates(response.data);
            });
    }, []);

    return (
        <div style={{padding: "20px"}}>
            <Link to={'*'}>
                <button className={classes.goHome}>Go home</button>
            </Link>
            <form className={classes.currencyForm}>
                <CurrencyInput currencies={[]} amount={amountBuy} currency={currencyBuy}/>
                <CurrencyInput currencies={[]} amount={amountSale} currency={currencySale}/>
            </form>
        </div>
    );
};
