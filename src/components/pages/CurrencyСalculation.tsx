import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import axios, {AxiosResponse} from "axios";
import {CurrencyRateType} from "../../types/CurrencyRateType";
import {colors} from "../theme/colors";
import {Button, FormControlLabel, MenuItem, OutlinedInput, Radio, RadioGroup, TextField} from "@mui/material";
import {CurrencyState} from "../../types/CurrencyStateType";

const useStyles = makeStyles({
    currencyConverter: {
        fontFamily: "sans-serif",
        backgroundColor: colors.blues.mat,
        minHeight: "100vh",
        padding: "20px",
    },
    goHome: {
        width: "100px",
        height: "50px",
        backgroundColor: colors.blues.light,
    },
    currencyForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    outlinedInput: {
        margin: "0 20px 0 0",
        backgroundColor: colors.white.dark,
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
        margin: "20px 0",
    },
});

export const CurrencyCalculation: FC = (): ReactElement => {
    const classes = useStyles();

    const [rates, setRates] = useState<CurrencyRateType[]>([])
    const [output, setOutput] = useState<number | undefined>(undefined);
    const [disableButton, setDisableButton] = useState<boolean>(true);
    const [values, setValues] = useState<CurrencyState>({
        amount: "",
        currency: "",
        valueRadio: "",
    });

    const handleChange =
        (prop: keyof CurrencyState) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    useEffect(() => {
        axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then((response: AxiosResponse<CurrencyRateType[]>) => {
                setRates(response.data);
            });
    }, []);

    const showResult = () => {
        if (values.valueRadio === "Buy") {
            rates.filter(rate => rate.ccy === values.currency)
                .map((rate: CurrencyRateType) =>
                    setOutput(rate.sale * Number(values.amount)))
        } else {
            rates.filter(rate => rate.ccy === values.currency)
                .map((rate: CurrencyRateType) =>
                    setOutput(rate.buy * Number(values.amount)))
        }
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
                            value={values.amount}
                            onChange={handleChange("amount")}
                        />
                        <TextField
                            id="outlined-select-currency"
                            select
                            value={values.currency}
                            onChange={handleChange("currency")}
                        >
                            {rates.map((option: CurrencyRateType, index: number) => (
                                <MenuItem key={index} value={option.ccy}>
                                    {option.ccy}
                                </MenuItem>
                            ))}
                        </TextField>
                        <RadioGroup
                            value={values.valueRadio}
                            onChange={handleChange("valueRadio")}
                        >
                            <FormControlLabel onClick={() => setDisableButton(false)} value="Buy" control={<Radio/>}
                                              label="Buy"/>
                            <FormControlLabel onClick={() => setDisableButton(false)} value="Sell" control={<Radio/>}
                                              label="Sell"/>
                        </RadioGroup>
                    </div>
                    <div className={classes.conversionResult}>
                        <Button style={{backgroundColor: colors.blues.veryDark}}
                                disabled={disableButton}
                                onClick={showResult}
                                variant="contained">Convert</Button>
                        <h2 className={classes.titleResult}>Converted Amount:</h2>
                        {rates.filter(rate => rate.ccy === values.currency)
                            .map((rate: CurrencyRateType, index: number) => (
                                <p key={index} className={classes.result}>
                                    {values.amount + " " + values.currency + " = " + Number(output).toFixed(2) + " " + rate.base_ccy}
                                </p>))}
                    </div>
                </div>
            </form>
        </div>
    );
};