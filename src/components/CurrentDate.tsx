import React from "react";

const CurrentDate = () => {
    const showDate = new Date().toLocaleString("uk-Uk", {weekday: "short", day: "numeric", month: "long"});
    return (
        <div className="Current-date">{showDate}</div>
    );
}
export default CurrentDate;