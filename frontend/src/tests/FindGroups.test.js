import React from "react";
import { render } from "@testing-library/react";
import FindGroups from "../routes/FindGroups";

it("renders without crashing", function() {
  render(<FindGroups />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<FindGroups />);
  expect(asFragment()).toMatchSnapshot();
});