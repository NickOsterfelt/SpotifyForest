import React from "react";
import { Form, Button } from "react-bootstrap"

/**
 * CreateGroupFrom is a form for creating new groups.
 */
function CreateGroupForm({ formData, handleChange, handleSubmit}) {
    return (
        <Form onSubmit={handleSubmit} >
            <Form.Group controlId="groupName">
                <Form.Label>Group Name</Form.Label>
                <Form.Control 
                    name="name"
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Enter a name for the group"
                    value={formData.name} 
                />
            </Form.Group>

            <Form.Group controlId="groupInfo">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    name="info"
                    onChange={handleChange} 
                    type="text" 
                    placeholder="What should people know about the group?"
                    value={formData.info} 
                />
            </Form.Group>
            
            <Button variant="success" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default CreateGroupForm;