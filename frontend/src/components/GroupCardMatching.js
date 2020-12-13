import React from "react";
import { Card, Button } from "react-bootstrap"

/**
 * GroupCardMatching is a variation of the groupCard component, 
 * however includes information on how effectively the group was matched.
 */
function GroupCardMatching({ id, groupName, numUsers, groupInfo, matchScore, canJoin, onJoinClick }) {
    let button;
    if(canJoin) {
        button =  <Button variant={"primary btn btn-block"} onClick={onJoinClick}>Join<i className="fas fa-plus text-success border bg-light rounded p-1 mx-2"></i> </Button>
    }
    else {
        button = <Button variant={"primary btn btn-block disabled"}>Joined</Button>
    }

    return (
        <div key={id}>
            <Card style={{ width: '18rem' }} className="m-3">
                <Card.Body className="mb-2 text-dark">
                    <Card.Title >{groupName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">matching score: {matchScore}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                        Number of users: {numUsers}
                    </Card.Subtitle>
                    <Card.Text>
                        Description: {groupInfo} 
                    </Card.Text>
                    {button}
                </Card.Body>
            </Card>
        </div>
    )
}

export default GroupCardMatching;