import React from "react";
import { render } from "@testing-library/react";
import GroupDetails from "../components/GroupDetails"

it("renders without crashing", function() {
  render(<GroupDetails userData={{id: 1}}/>);
});

it("matches snapshot", function() {
  const { asFragment } = render(<GroupDetails userData={{id: 1}}/>);
  expect(asFragment()).toMatchSnapshot();
});
