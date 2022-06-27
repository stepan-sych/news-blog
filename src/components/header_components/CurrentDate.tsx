import React, {ReactElement} from "react";

const CurrentDate = (): ReactElement => {
    const showDate = new Date().toLocaleString("uk-Uk", {weekday: "short", day: "numeric", month: "long"});
    return (
        <div className="Current-date">{showDate}</div>
    );
}
export default CurrentDate;