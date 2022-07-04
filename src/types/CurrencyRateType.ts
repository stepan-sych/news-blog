import {CurrencyName} from "../components/enums/CurrencyName";

export type CurrencyRateType = {
    ccy: CurrencyName,
    base_ccy: CurrencyName,
    buy: number,
    sale: number,
}