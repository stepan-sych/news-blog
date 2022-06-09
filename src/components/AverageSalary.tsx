import React, {ReactElement} from "react";
import {averageSalaries} from "../items/ArrayAverageSalary";
import {AverageSalaryType} from "../types/AverageSalaryType";

export const AverageSalary = (): ReactElement => {
    return (<div className="Average-salary">
            <h3>СЕРЕДНЯ ЗАРПЛАТА В УКРАЇНІ</h3>
            <div className="Box-salary">
                {averageSalaries.map((averageSalary:AverageSalaryType) => <div key={averageSalary.positionId} className="Salary">
                    <p>{averageSalary.salary}</p>
                    <p>{averageSalary.positionName}</p>
                </div>)}
            </div>
        </div>
    );
}
