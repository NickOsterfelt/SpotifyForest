import React, { useEffect, useState } from "react";
import Api from "../engine/Api";
import GroupCard from "../components/GroupCard";
import GroupHelper from "../components/GroupHelper";
import { v4 as uuid } from "uuid"

function Groups() {
    const [groupData, setGroupData] = useState([])
    const [loading, setLoading] = useState(true);
    const userGroupIds = JSON.parse(localStorage.getItem("userGroups"));
    useEffect(function () {
        async function getGroups() {
            if (loading) {
                const groups = []
                for (let groupId of userGroupIds) {
                    const curr = await Api.getGroup(groupId);
                    groups.push(curr);
                }
                setGroupData(groups);
                console.log(groupData);
                setLoading(false);
            }
        }
        getGroups();
    }, [groupData, setGroupData, loading, userGroupIds])

    const groupList = [];
    for (let group of groupData) {
        groupList.push(
            <GroupCard key={uuid()}
                id={group.groupId}
                groupName={group.groupName}
                numUsers={group.users.length}
                groupInfo={group.groupInfo}
                canJoin={false}
                onJoinClick={(() => { })}
            />
        );
    }
    if (groupList.length === 0) {
        return (
            <div className="container mt-2 ">
                <div className="row d-flex justify-content-center">
                    <div className="col-8 bg-secondary rounded text-light p-3 px-5 mt-3 text-left">
                        <GroupHelper />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="container mt-2 ">
            <div className="row d-flex justify-content-center">
                <div className="col-8 bg-dark rounded text-light p-3 px-5 mt-3 text-left">
                    <h4 className="text-center">Here's the groups you are currently in:</h4>
                </div>
                <div className="col-10 bg-dark rounded text-light p-3 my-3 text-left d-flex justify-content-around group-card-container">
                    {groupList}
                </div>
            </div>
        </div>
    );
}

export default Groups;