import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid"
import Api from "../engine/Api";
import FindGroupForm from "../components/FindGroupForm";
import GroupCard from "../components/GroupCard";
import GroupCardMatching from "../components/GroupCardMatching";
/**
 *  FindGroups is the route which is used to search for new groups.
 * Users can search by name, similar tracks, and similar artists.
 * 
 * The component handles sending the data to the server, adding users to groups,
 * updating form data.
 */
function FindGroups() {
    const [formData, setFormData] = useState({ search: "" });
    const [loading, setLoading] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [groups, setGroups] = useState([])
    const [userGroups, setUserGroups] = useState(JSON.parse(localStorage.getItem("userGroups")));
    
    //Used when clicking on a join button in a GroupCard component.
    function onJoinClick(groupId) {
        return async function () {
            //Add user to group is join is clicked.
            Api.addUserToGroup(groupId, localStorage.getItem("userId"));
            let newUserGroups = userGroups;
            newUserGroups.push(groupId);
            localStorage.setItem("userGroups", JSON.stringify(newUserGroups));
            setUserGroups(newUserGroups)
        }
    }
    //Get usergroups from local storage so that groups that the user is 
    //currently in are not displayed as available to join.
    useEffect(function () {
        if(localStorage.getItem("userGroups")) {
            setUserGroups(JSON.parse(localStorage.getItem("userGroups")));
        }
    }, [setGroups, groups])
    /**
     * Send the request to search groups, based on form input.
    */
    useEffect(() => {
        async function search() {
            if (loading) {
                if (formData.searchType === "name") {
                    setLoading(false);
                    let res = await Api.searchGroupsByName(formData.search);
                    setGroups(res);
                }
                if (formData.searchType === "track") {
                    setLoading(false);
                    let userTracks = JSON.parse(localStorage.getItem("userData")).userTracks;
                    let res = await Api.searchGroupsByTracks(userTracks);
                    setGroups(res);
                }
                if (formData.searchType === "artist") {
                    setLoading(false);
                    let userArtists = JSON.parse(localStorage.getItem("userData")).userArtists;
                    let res = await Api.searchGroupsByArtists(userArtists);
                    setGroups(res);
                }
            }
        }
        search();
    }, [loading, formData]);

    //Update form data as user input is collected.
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
        if (name === "searchType" && value === "name") {
            setShowSearchBox(true);
        }
        if ((name === "searchType") && (value === "artist" || value === "track")) {
            setShowSearchBox(false);
        }
    }
    //on submit, set loading to false to trigger the useEffect search
    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
    }
    //Process groups into actual GroupCards, based on whether they were searched or not.
    const groupList = []
    if (groups.length > 0) {
        if (!showSearchBox) {
            for (let group of groups) {
                groupList.push(
                    <div key={uuid()}>
                        <GroupCardMatching
                            id={group.groupId}
                            groupName={group.groupName}
                            numUsers={group.numUsers}
                            matchScore={group.matchScore}
                            groupInfo={group.groupInfo}
                            canJoin = {userGroups.includes(group.groupId) ? false : true}
                            onJoinClick = {onJoinClick(group.groupId)}
                        />
                    </div>
                )
            }
        }
        else {
            for (let group of groups) {
                groupList.push(
                    <div key={uuid()}>
                        <GroupCard
                            id={group.groupId}
                            groupName={group.groupName}
                            numUsers={group.numUsers}
                            groupInfo={group.groupInfo}
                            canJoin={userGroups.includes(group.groupId) ? false : true}
                            onJoinClick={onJoinClick(group.groupId)}
                        />
                    </div>
                )
            }
        }
    }

    return (
        <div className="container mt-2 ">
            <div className="row d-flex justify-content-center">
                <div className="col-6 bg-dark rounded text-light p-3 px-5 text-left">
                    <FindGroupForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        showSearchBox={showSearchBox}
                    />
                </div>
                <div className="col-8 bg-dark rounded text-light p-3 my-3 text-left d-flex justify-content-center group-card-container">
                    {groupList}
                </div>
            </div>
        </div>
    )

}

export default FindGroups;