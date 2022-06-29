import React, {FC, ReactElement, useEffect, useState} from "react";
import {FaDollarSign, FaEuroSign} from "react-icons/fa";
import axios, {AxiosResponse} from "axios";
import {CurrencyRateType} from "../../types/CurrencyRateType";
import {CurrencyName} from "../enums/CurrencyName";

export const CurrencyRate: FC = (): ReactElement => {

    const mapIcons: Map<CurrencyName, ReactElement> = new Map<CurrencyName, ReactElement>([
        [CurrencyName.USD, <FaDollarSign/>],
        [CurrencyName.EUR, <FaEuroSign/>],

    ]);

    const [rateValues, setRateValues] = useState<CurrencyRateType[]>([]);
    useEffect(() => {
        axios.get<CurrencyRateType[]>('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then((response: AxiosResponse<CurrencyRateType[]>) => {
                setRateValues(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error gating currency!", error.message)
            });
    }, []);

    return (<div style={{display: "flex", }}>
        {rateValues
            .filter(rateValue => rateValue.ccy !== CurrencyName.BTC)
            .map((rateValue: CurrencyRateType, index: number) => <div key={index} className="Currency">
                {mapIcons.get(rateValue.ccy)}{Number(rateValue.buy).toFixed(2)}</div>)}
    </div>)
}

