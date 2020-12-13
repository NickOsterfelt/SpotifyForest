import React, { useEffect, useState } from "react";
import "../static/Home.css"
import Api from "../engine/Api";
import ProfileDetailsCard from "../components/ProfileDetailsCard";
import GroupDetails from "../components/GroupDetails";
import GroupHelper from "../components/GroupHelper";

function Home() {
    let [userData, setUserData] = useState({});
    let [groups, setGroups] = useState(undefined);
    let [selectedUserId, setSelectedUserId] = useState(undefined)
    let [selectedUser, setSelectedUser] = useState({});
    let [selectedGroup, setSelectedGroup] = useState(0);

    const handleTileClick = function (userId) {
        return function () {
            setSelectedUserId(userId);
        }
    }

    const groupControlClick = function (behavior = "increment") {
        if (groups) {
            if (behavior === "increment") {
                return function () {
                    setSelectedGroup(selectedGroup + 1 >= groups.length ? groups.length - 1 : selectedGroup + 1);
                }
            }
            else {
                return function () {
                    setSelectedGroup(selectedGroup - 1 <= 0 ? 0 : selectedGroup - 1);
                }
            }
        }
        else {
            return () => { };
        }
    }

    const getUserData = async function () {
        let data = await Api.getCurrentUserData();
        setUserData(data);
        localStorage.setItem("userId", data.id)
    }

    const getSelectedUserData = async function (id) {
        let data = await Api.getUser(id);
        setSelectedUser(data);
    }

    const getUserGroups = async function (id) {
        let data = await Api.getUserGroups(id);
        let groupIds = data.map((group) => (group.group_id));
        localStorage.setItem("userGroups", JSON.stringify(groupIds));
        setGroups(data);
    }

    useEffect(function () {
        getUserData();
        if (selectedUserId) {
            getSelectedUserData(selectedUserId);
        }
    }, [selectedUserId])

    useEffect(function () {
        if (userData.id) {
            getUserGroups(userData.id);
        }
    }, [userData.id]);

    let groupDisplay;
    if (groups) {
        if (groups.length > 0) {
            groupDisplay = <GroupDetails
                groupId={groups[selectedGroup].group_id}
                userData={userData}
                handleTileClick={handleTileClick}
                selectedUserId={selectedUserId}
                incrementGroupControl={groupControlClick("increment")}
                decrementGroupControl={groupControlClick("decrement")}
                numGroups={groups.length}
                currentGroupIdx={selectedGroup}
            />
        }
        else {
            groupDisplay = (
                <div className="mt-5">
                    <GroupHelper />
                </div>
            );
        }
    } else {
        groupDisplay = <div>Loading Group data....</div>
    }

    let userProfile;
    if (Object.keys(userData).length > 0) {
        userProfile = <ProfileDetailsCard userData={userData} key="left" currUser={true} />
    } else {
        userProfile = <div>Loading user details...</div>
    }

    let selectedUserProfile;
    if (Object.keys(selectedUser).length > 0) {
        selectedUserProfile = <ProfileDetailsCard userData={selectedUser} key="right" />
    } else {
        selectedUserProfile = <div className="text-light">Click on a user's tile to see more info!</div>
    }
    return (
        <div className="container-fluid">
            <div className="row justify-content-center ">
                <div className="col-sm-4 col-md-3 col-lg-2 px-2 profile-sidebar">
                    <h4 className="text-light mt-3">Your profile:</h4>
                    {userProfile}
                </div>
                <div className="col-sm-4 col-md-6 col-lg-8 middle-section">
                    <div>
                        {groupDisplay}
                    </div>
                </div>
                <div className="col-sm-4 col-md-3 col-lg-2 px-2 profile-sidebar">
                    <div>
                        {selectedUserProfile}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;