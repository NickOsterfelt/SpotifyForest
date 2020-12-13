
import React from "react";
import { render } from "@testing-library/react";
import GroupControl from "../components/GroupControl";

it("renders without crashing", function() {
  render(<GroupControl />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<GroupControl />);
  expect(asFragment()).toMatchSnapshot();
});
