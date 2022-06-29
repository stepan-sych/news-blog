import React, {ReactElement} from 'react';
import {makeStyles} from "@mui/styles";
import PropTypes from "prop-types";
import {colors} from "../theme/colors";

const useStyles = makeStyles({
    inputAmount: {
        border: "1px solid black",
        height: "30px"
    },
    fields: {
        padding: "0 0 20px 0"
    },
    selectCurrency: {
        height: "30px",
        border: `1px solid ${colors.black}`,
        padding: "0 0 0 5px",
        margin: "0 0 0 5px"
    },
});

export const CurrencyInput = (props: any): ReactElement => {
    const classes = useStyles();

    return (
        <div className={classes.fields}>
            <input className={classes.inputAmount} type="number" value={props.amount}/>
            <select className={classes.selectCurrency} value={props.currency}>
                {props.currencies.map((currency: string) => (
                <option value={currency}>{currency}</option>))}
            </select>
        </div>
    );
};
 CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
     currencies: PropTypes.array,
};