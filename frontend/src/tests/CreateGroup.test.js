import React from "react";
import { render } from "@testing-library/react";
import CreateGroup from "../routes/CreateGroup";

it("renders without crashing", function() {
  render(<CreateGroup />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<CreateGroup />);
  expect(asFragment()).toMatchSnapshot();
});