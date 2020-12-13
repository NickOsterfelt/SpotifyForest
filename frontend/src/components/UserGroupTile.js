import React from "react";
import "../static/GroupTiles.css"
import classNames from "classnames";

//Simple component used in GroupDetails, which serves to add table
//cells for active users.
function UserGroupTile({ userId, username, photo_url, currUser = false, handleClick = () => {}, selected=false }) {
    const classes = classNames({
        'user-tile' : true,
        'curr-user' : currUser,
        'selected' : selected
    });
    return (
        <td className={classes} onClick={handleClick}>
            <div className="item">
                <div className="header">
                    <h5 href={`/users/${userId}`}><u>{currUser ? "You" : username}</u></h5>
                </div>
                <div className="image-container">
                    <img alt="" src={photo_url ? photo_url : "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"} />
                </div>
            </div>
        </td>
    )
}

export default UserGroupTile;