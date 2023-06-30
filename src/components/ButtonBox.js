import React from "react";
// Grab children 
const ButtonBox = ({children}) => {
    return (
        // render the children inside this div
        <div className="buttonBox">{children}</div>
    )
}

export default ButtonBox;