import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import axios, {AxiosResponse} from "axios";
import {CurrencyRateType} from "../../types/CurrencyRateType";
import {colors} from "../theme/colors";
import {Button, FormControlLabel, MenuItem, OutlinedInput, Radio, RadioGroup, TextField} from "@mui/material";

const useStyles = makeStyles({
    currencyConverter: {
        backgroundColor: colors.blues[1],
        minHeight: "100vh",
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
    outlinedInput: {
        margin: "0 20px 0 0",
        backgroundColor: colors.white[0],
    },
    conversionResult: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px 0 0 0",
    },
    titleResult: {
        padding: "0 0 5px 0",
        margin: "20px 0",
    },
    result: {
        fontSize: "20px",
    },
    buttonConvert: {
        backgroundColor: colors.blues[2],
        margin: "20px 0",
    },
});

export const CurrencyCalculation: FC = (): ReactElement => {
    const classes = useStyles();

    const [rates, setRates] = useState<CurrencyRateType[]>([])
    const [currency, setCurrency] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [output, setOutput] = useState<any>("");

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

    const showResult = () => {
        setOutput(Number(amount))
    };

    return (
        <div className={classes.currencyConverter}>
            <Link to={'*'}>
                <button className={classes.goHome}>Go home</button>
            </Link>
            <form className={classes.currencyForm}>
                <div>
                    <div>
                        <OutlinedInput
                            className={classes.outlinedInput}
                            id="outlined-adornment-amount"
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
                        <RadioGroup
                            // value={value}
                            // onChange={handleChange}
                        >
                            <FormControlLabel value="Buy" control={<Radio/>} label="Buy"/>
                            <FormControlLabel value="Sell" control={<Radio/>} label="Sell"/>
                        </RadioGroup>
                    </div>
                    <div className={classes.conversionResult}>
                        <Button onClick={showResult} variant="contained">Convert</Button>
                        <h2 className={classes.titleResult}>Converted Amount:</h2>
                        {rates.filter(rate => rate.ccy === currency)
                            .map((rate: CurrencyRateType, index: number) => (
                                <p key={index} className={classes.result}>
                                    {output}
                                    {/*{amount + " " + currency + " = " + (rate.sale * Number(amount)).toFixed(2) + " " + rate.base_ccy}*/}
                                </p>))}
                    </div>
                </div>
            </form>
        </div>
    );
};