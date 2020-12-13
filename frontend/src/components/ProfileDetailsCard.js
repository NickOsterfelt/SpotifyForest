import React, { useState, useEffect } from "react";
import Api from "../engine/Api";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { v4 as uuid } from "uuid";

/**
 * ProfileDetailsCard is the sidebar for displaying the current user
 * profile and selected user profiles. 
 * 
 * Upon loading, it gets the user's top tracks and artists.
 */
function ProfileDetailsCard({ userData, currUser = false }) {
    const [profileData, setProfileData] = useState({});
    let [key, setKey] = useState("Tracks")

    //Get user data upon having a userId to load.
    useEffect(function () {
        const getProfileData = async function () {
            if (currUser) {
                const userTracks = await Api.getCurrUserTracks(userData.id);
                const userArtists = await Api.getCurrUserArtists(userData.id);
                setProfileData({ userTracks: userTracks, userArtists: userArtists });
                const userTrackIds = userTracks.map((track) => (track.id));
                const userArtistIds = userTracks.map((artist) => (artist.id))
                localStorage.setItem("userData", JSON.stringify({ userTracks: userTrackIds, userArtists: userArtistIds }));
            }
            else {
                const userTracks = await Api.getUserTracks(userData.id);
                const userArtists = await Api.getUserArtists(userData.id);
                setProfileData({ userTracks: userTracks, userArtists: userArtists })
            }
        }
        getProfileData();
    }, [currUser, userData.id]);

    let tracks = [];
    let artists = [];

    //Lots of conditionals based on how spotify responds with data.
    //But ultimately lists the artists and tracks.
    if (Object.keys(profileData).length > 0) {
        if (profileData.userTracks && profileData.userTracks.length > 0) {
            for (let track of profileData.userTracks) {
                tracks.push(
                    <li key={uuid()}>
                        <a href={track.external_urls ? track.external_urls.spotify : track.spotify_url}>{track.track_name ? track.track_name : track.name}</a>
                    </li>
                );
            }
        }
        if (profileData.userArtists && profileData.userArtists.length > 0) {
            for (let artist of profileData.userArtists) {
                artists.push(
                    <li key={uuid()}>
                        <a href={artist.href ? artist.href : artists.spotify_url}>{artist.artist_name ? artist.artist_name : artist.name}</a>
                    </li>
                )
            }
        }
    }
    return (
        <div className="container d-flex justify-content-center">
            <div className="row text-light">
                <div className="col-12 d-flex mt-2 justify-content-center">
                    <h5 className="display-5">{userData.username}</h5>
                </div>
                <div className="col-12 d-flex mt-2 justify-content-center">
                    <div className="profile-image">
                        <img alt="" src={userData.photo_url ? userData.photo_url : "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"} />
                    </div>
                </div>
                <div className="col-12 mt-2 justify-content-center user-details">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                    >
                        <Tab eventKey="Tracks" title="Top Tracks" variant="primary" className="mt-3">
                            <div>
                                <ul>
                                    {tracks}
                                </ul>
                            </div>
                        </Tab>
                        <Tab eventKey="Artists" title="Top Artists" variant="primary" className="mt-3">
                            <div>
                                <ul>
                                    {artists}
                                </ul>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetailsCard; 