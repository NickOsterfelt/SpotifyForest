import React from "react";
import { render } from "@testing-library/react";
import CreateGroupForm from "../components/CreateGroupForm";
const handleChange = () => {};
const handleSubmit = () => {};
it("renders without crashing", function() {
  render(<CreateGroupForm 
    handleSubmit={handleSubmit}
    handleChange={handleChange} 
    formData={{name: "", password: ""}}/>);
});

it("matches snapshot", function() {
  const { asFragment } = render(<CreateGroupForm 
    handleSubmit={handleSubmit}
    handleChange={handleChange} 
    formData={{name: "", password: ""}}/>);
  expect(asFragment()).toMatchSnapshot();
});
