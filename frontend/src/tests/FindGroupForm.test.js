import React from "react";
import { render } from "@testing-library/react";
import FindGroupForm from "../components/FindGroupForm";

const handleChange = () => {};
const handleSubmit = () => {};
it("renders without crashing", function() {
  render(<FindGroupForm 
    handleSubmit={handleSubmit}
    handleChange={handleChange} 
    formData={{ search: "" }}/>);
});

it("matches snapshot", function() {
  const { asFragment } = render(<FindGroupForm 
    handleSubmit={handleSubmit}
    handleChange={handleChange} 
    formData={{ search: "" }}/>);
  expect(asFragment()).toMatchSnapshot();
});
