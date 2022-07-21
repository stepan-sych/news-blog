import React, {FC, ReactElement, useEffect, useState} from "react";
import {FaDollarSign, FaEuroSign} from "react-icons/fa";
import axios, {AxiosResponse} from "axios";
import {CurrencyRateType} from "../../types/CurrencyRateType";
import {CurrencyName} from "../enums/CurrencyName";
import {Link, useNavigate} from "react-router-dom";

export const CurrencyRate: FC = (): ReactElement => {
    const [rateValues, setRateValues] = useState<CurrencyRateType[]>([]);

    const navigate = useNavigate();
    const openConverter = (select: CurrencyName): void => {
        navigate(`/currency/${select}`)
    }

    const mapIcons: Map<CurrencyName, ReactElement> = new Map<CurrencyName, ReactElement>([
        [CurrencyName.USD, <FaDollarSign/>],
        [CurrencyName.EUR, <FaEuroSign/>],
    ]);

    useEffect(() => {
        axios.get<CurrencyRateType[]>('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
            .then((response: AxiosResponse<CurrencyRateType[]>) => {
                setRateValues(response.data);
            })
            .catch((error) => {
                console.error("Error gating currency!", error.message)
            });
    }, []);

    return (<div style={{display: "flex",}}>
        {rateValues
            .filter(rateValue => rateValue.ccy !== CurrencyName.BTC)
            .map((rateValue: CurrencyRateType, index: number) =>
                <Link onClick={() => openConverter(rateValue.ccy)} key={index} to={`/currency/${rateValue.ccy}`}
                >
                    <div className="Currency">
                        {mapIcons.get(rateValue.ccy)}{Number(rateValue.buy).toFixed(2)}
                    </div>
                </Link>)}
    </div>)
}