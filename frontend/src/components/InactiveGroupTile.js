import React from "react";


//A simple component which is used in GroupDisplay for inactive tiles.
function InactiveGroupTile() {
    return (
        <td className="placeholder-tile">
            <div className="item"></div>
        </td>
    );
}

export default InactiveGroupTile;