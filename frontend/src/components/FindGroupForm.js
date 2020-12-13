import React from "react";
import { Form, Col, Button, Row } from "react-bootstrap"

/**
 * FindGroupForm is a form for searching for groups to join
 * 
 * The search box for searching groups by name is only visible if 
 * the radio button to search by name is selected
 */

function FindGroupForm({ formData, handleChange, handleSubmit, showSearchBox }) {
    //Search box input
    const searchBox = (
        <Form.Group as={Row}>
            <Col sm={10}>
                <Form.Control
                    onChange={handleChange}
                    type="text"
                    name="search"
                    value={formData.search}
                    placeholder="group name"
                    key={"formSearchBox"}
                />
            </Col>
        </Form.Group>
    )
        
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
                <Col sm={10}>
                    <Form.Check
                        onChange={handleChange}
                        type="radio"
                        label="Search groups with matching top tracks"
                        name="searchType"
                        id="searchType1"
                        value="track"
                    />
                    <Form.Check
                        onChange={handleChange}
                        type="radio"
                        label="Search groups with matching top artists"
                        name="searchType"
                        id="searchType2"
                        value="artist"
                    />
                    <Form.Check
                        onChange={handleChange}
                        type="radio"
                        label="Search by group name"
                        name="searchType"
                        id="searchType3"
                        value="name"
                    />

                </Col>
            </Form.Group>
            {showSearchBox ? searchBox : ""}
            <Form.Group as={Row}>
                <Col sm={{ span: 10 }}>
                    <Button type="submit" variant={"success"}>Search Groups</Button>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default FindGroupForm;