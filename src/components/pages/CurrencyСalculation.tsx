import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";

export const CurrencyCalculation: FC = (): ReactElement => {
    return (
        <div style={{padding: "20px"}}>
            <Link to={'/'}><button style={{width: "100px", height: "50px", backgroundColor: "blue"}}>Go home</button></Link>
            <p style={{display: "flex", justifyContent: "center", alignSelf: "center"}}>test</p>
        </div>
    );
};

