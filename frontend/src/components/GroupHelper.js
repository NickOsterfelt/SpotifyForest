import React from "react";

//A simple component to assist when the user is not in any groups.
function GroupHelper() {

    return (
        <div className="">
            <h4>Looks like you are not in any groups yet!</h4>
            <h5>Click the "Find Groups" button to find groups that have similar music tastes.</h5>
        </div>
    );
}
 
export default GroupHelper