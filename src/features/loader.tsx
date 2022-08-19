import * as React from 'react';
import {ReactElement} from "react";
import {ClipLoader} from "react-spinners";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    loaderContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
});

export const Loader = (): ReactElement => {
    const classes = useStyles();

    return (
        <div className={classes.loaderContainer}>
            <ClipLoader color={'#fff'} size={150}/>
        </div>
    )

}