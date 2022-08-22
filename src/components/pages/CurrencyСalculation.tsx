import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import axios, {AxiosResponse} from "axios";
import {CurrencyRateType} from "../../types/CurrencyRateType";
import {colors} from "../theme/colors";
import {Button, FormControlLabel, MenuItem, Radio, RadioGroup, TextField} from "@mui/material";
import {mainPage} from "../../constants/PathConstants";
import {CurrencyName} from "../enums/CurrencyName";
import {Loader} from "../../features/loader";

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

    const param = useParams();
    const classes = useStyles();

    enum RadioButtons {
        Buy = "Buy",
        Sell = "Sell",
    }

    type CurrencyStateTypes = {
        currency: CurrencyName | undefined;
        valueRadio: RadioButtons | null;
    }

    const [rates, setRates] = useState<CurrencyRateType[]>([])
    const [output, setOutput] = useState<number | null>(null);
    const [amount, setAmount] = useState<string>("");
    const [helperText, setHelperText] = useState<string | undefined>(undefined);
    const [errorValidation, setErrorValidation] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [values, setValues] = useState<CurrencyStateTypes>({
        currency: "" as CurrencyName,
        valueRadio: null,
    });

    useEffect(() => {
        values.currency = param.select as CurrencyName;
    }, [])

    const handleChangeConverter =
        (prop: keyof CurrencyStateTypes) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
        };

    const handleError = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value.match(/^[\d\b]*$/)) {
            setErrorValidation(false);
            setAmount(event.target.value);
        } else {
            setErrorValidation(true);
            setHelperText("The field must contain a number!")
        }
    };

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then((response: AxiosResponse<CurrencyRateType[]>) => {
                setRates(response.data);
                setIsLoading(false);
            });
    }, []);

    const showResult = (): void => {
        let radioButtonCondition: CurrencyRateType | undefined = rates.find((rate: CurrencyRateType) => rate.ccy === values.currency)
        if (radioButtonCondition) {
            if (!values.valueRadio) return
            if (values.valueRadio === RadioButtons.Buy) {
                setOutput(radioButtonCondition.sale * Number(amount))
            } else if (values.valueRadio === RadioButtons.Sell) {
                setOutput(radioButtonCondition.buy * Number(amount))
            }
        }
    };

    return (
        <div className={classes.currencyConverter}>
            {isLoading ? (
               <Loader/>
            ) : (
                <div>
                    <Link to={`${mainPage}`}>
                        <button className={classes.goHome}>Go home</button>
                    </Link>
                    <form className={classes.currencyForm}>
                        <div>
                            <div>
                                <TextField
                                    style={{
                                        margin: "0 20px 30px 0",
                                        backgroundColor: colors.white.dark,
                                        borderRadius: "4px"
                                    }}
                                    variant="outlined"
                                    value={amount}
                                    error={errorValidation}
                                    helperText={errorValidation ? helperText : undefined}
                                    onChange={handleError}
                                />
                                <TextField
                                    select
                                    value={values.currency}
                                    onChange={handleChangeConverter("currency")}
                                >
                                    {rates.map((currencyName: CurrencyRateType, index: number) => (
                                        <MenuItem key={index} value={currencyName.ccy}>
                                            {currencyName.ccy}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <RadioGroup
                                    value={values.valueRadio}
                                    onChange={handleChangeConverter("valueRadio")}
                                >
                                    <FormControlLabel value={RadioButtons.Buy} control={<Radio/>}
                                                      label={RadioButtons.Buy}/>
                                    <FormControlLabel value={RadioButtons.Sell} control={<Radio/>}
                                                      label={RadioButtons.Sell}/>
                                </RadioGroup>
                            </div>
                            <div className={classes.conversionResult}>
                                <Button style={{backgroundColor: colors.blues.veryDark, height: "46px"}}
                                        disabled={!amount || !values.valueRadio}
                                        onClick={showResult}
                                        variant="contained">Convert</Button>
                                <h2 className={classes.titleResult}>Converted Amount:</h2>
                                {rates.filter((rate: CurrencyRateType) => rate.ccy === values.currency)
                                    .map((rate: CurrencyRateType, index: number) => (
                                        <p key={index} className={classes.result}>
                                            {amount + " " + values.currency + " = " + Number(output).toFixed(2) + " " + rate.base_ccy}
                                        </p>))}
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};