import React, { useState, useEffect, useCallback } from "react";
import "../static/GroupDetails.css";
import Api from "../engine/Api"
import UserGroupTile from "./UserGroupTile";
import InactiveGroupTile from "./InactiveGroupTile";
import GroupControl from "./GroupControl";

/**
 * GroupDetails Component displays the members of a group in a grid
 * allowing users to click on tiles to access more information on a given user's
 * profile.
 * 
 * Css classes determine how tiles look when hovered over and currently selected,
 * as well as the current user's own tile.
 */
function GroupDetails({ groupId, userData, handleTileClick, selectedUserId = 0, incrementGroupControl, decrementGroupControl, currentGroupIdx, numGroups }) {
    const [groupData, setGroupData] = useState({});
    const [tableData, setTableData] = useState([])

    //Get group data and users that are in the group.
    useEffect(function () {
        const getGroup = async function () {
            let res = await Api.getGroup(groupId);
            //remove current user from users in group
            let filtered = res.users.filter((user) => user.id !== userData.id);
            res.users = filtered;
            //set groupUsers in local storage for use in other components.
            localStorage.setItem("groupUsers", JSON.stringify(res.users));
            setGroupData(res);
        }
        getGroup();
    }, [groupId, userData.id]);

    //Fill table with entires based on
    const populateTable = useCallback(() => {
        let tableEntries = []
        let users = JSON.parse(localStorage.getItem("groupUsers"));
        if (Object.keys(groupData).length !== 0 && users.length > 0) {
            for (let i = 0; i < 9; i++) {
                if (i === 4) {
                    //The center tile always goes to the current user
                    tableEntries.push(<UserGroupTile
                        userId={userData.id}
                        username={userData.username}
                        photo_url={userData.photo_url}
                        currUser={true}
                        selected={true}
                    />);
                }
                else {
                    //Active members get active tiles, inactive members get inactive tiles.
                    let curr = users.pop();
                    if (curr) {
                        tableEntries.push(<UserGroupTile
                            userId={curr.id}
                            username={curr.username}
                            photo_url={curr.photo_url}
                            handleClick={handleTileClick(curr.id)}
                            selected={curr.id === selectedUserId ? true : false}
                        />)
                    }
                    else {
                        tableEntries.push(<InactiveGroupTile />);
                    }
                }
            }
        }
        else {
            //if there are no other members in the group, just the current user has a tile.
            tableEntries = new Array(9).fill(<InactiveGroupTile />);
            tableEntries[4] = (<UserGroupTile
                userId={userData.id}
                username={userData.username}
                photo_url={userData.photo_url}
                currUser={true}
            />);
        }
        setTableData(tableEntries)
    }, [groupData, handleTileClick, userData, selectedUserId]);

    //populates on page load, and also when populateTable's dependancies change
    useEffect(function () {
        populateTable();
    }, [populateTable]);


    return (
        <div>
            <GroupControl 
                groupName={groupData.groupName}
                incrementControl={incrementGroupControl} 
                decrementControl={decrementGroupControl} 
                idx={currentGroupIdx} 
                numGroups={numGroups}
            />
            <div className="main pt-2">
                <table>
                    <tbody>
                        <tr>
                            {tableData[0]}
                            {tableData[1]}
                            {tableData[2]}
                        </tr>
                        <tr>
                            {tableData[3]}
                            {tableData[4]}
                            {tableData[5]}
                        </tr>
                        <tr>
                            {tableData[6]}
                            {tableData[7]}
                            {tableData[8]}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default GroupDetails;