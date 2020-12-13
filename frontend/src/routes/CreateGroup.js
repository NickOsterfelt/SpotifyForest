import React, { useEffect, useState } from "react";
import Api from "../engine/Api";
import CreateGroupForm from "../components/CreateGroupForm";

/**
 * CreateGroup component is the route for creating new groups
 * It displays the CreateGroupForm, and handles the data associated
 * with the form and telling the backend to create a new group.
 */
function CreateGroup(props) {
    const [formData, setFormData] = useState({name: "", info: ""});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function createGroup() {
            if (loading) {
                setLoading(false);
                let userId = localStorage.getItem("userId")
                await Api.createGroup({ data: formData, userId: userId });
                props.history.push("/");
            }
        }
        createGroup();
    }, [loading, formData]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
    }

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-6 bg-dark text-left text-light rounded p-5">
                    <CreateGroupForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>

        </div>
    )
}

export default CreateGroup;
