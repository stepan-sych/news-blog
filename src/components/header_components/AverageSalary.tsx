import React, {ReactElement} from "react";
import {averageSalaries} from "../../items/ArrayAverageSalary";
import {AverageSalaryType} from "../../types/AverageSalaryType";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    averageSalary: {
       width: "100%",
        maxHeight: "150px",
        backgroundColor: "#b70e0e",
        padding: "0 20px",
        fontSize: "20px",
        '& h3': {
            padding: "10px 0",
        },
    },
    boxSalary: {
        display: "flex",
        justifyContent: "space-between",
    },
    salary: {
        padding: "0 20px 20px 0",
    },
});

export const AverageSalary = (): ReactElement => {
    const classes = useStyles();
    return (<div className={classes.averageSalary}>
            <h3>СЕРЕДНЯ ЗАРПЛАТА В УКРАЇНІ</h3>
            <div className={classes.boxSalary}>
                {averageSalaries.map((averageSalary: AverageSalaryType, index: number) =>
                    <div key={index} className={classes.salary}>
                        <p>{averageSalary.salary}</p>
                        <p>{averageSalary.positionName}</p>
                    </div>)}
            </div>
        </div>
    );
}
