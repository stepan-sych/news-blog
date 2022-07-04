import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import axios, {AxiosResponse} from "axios";
import {CurrencyRateType} from "../../types/CurrencyRateType";
import {colors} from "../theme/colors";
import {MenuItem, OutlinedInput, TextField} from "@mui/material";

const useStyles = makeStyles({
    currencyConverter: {
        backgroundColor: colors.blues[1],
        padding: "20px",
    },
    goHome: {
        width: "100px",
        height: "50px",
        backgroundColor: colors.blues[0],
    },
    currencyForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    fields: {
        backgroundColor: colors.green[0],
    }
});

export const CurrencyCalculation: FC = (): ReactElement => {
    const classes = useStyles();


    const [rates, setRates] = useState<CurrencyRateType[]>([])
    const [currency, setCurrency] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");

    const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };
    const handleCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    useEffect(() => {
        axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then((response: AxiosResponse<CurrencyRateType[]>) => {
                setRates(response.data);
            });
    }, []);

    return (
        <div className={classes.currencyConverter}>
            <Link to={'*'}>
                <button className={classes.goHome}>Go home</button>
            </Link>
            <form className={classes.currencyForm}>
                <div className={classes.fields}>
                    <div>
                        <OutlinedInput
                            id="outlined-adornment-currency"
                            value={amount}
                            onChange={handleAmount}
                        />
                        <TextField
                            id="outlined-select-currency"
                            select
                            value={currency}
                            onChange={handleCurrency}
                        >
                            {rates.map((option: CurrencyRateType, index: number) => (
                                <MenuItem key={index} value={option.ccy}>
                                    {option.ccy}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <h2>Converted Amount:</h2>
                        {rates.filter(rate => rate.ccy === currency)
                            .map((rate: CurrencyRateType, index: number) => (
                                <p key={index}>{amount + " " + currency + " = " + rate.sale * Number(amount) + " " + rate.base_ccy}</p>))}
                    </div>
                </div>
            </form>
        </div>
    );
};
