import React from "react";
import { render } from "@testing-library/react";
import GroupCardMatching from "../components/GroupCardMatching";

it("renders without crashing", function() {
  render(<GroupCardMatching />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<GroupCardMatching />);
  expect(asFragment()).toMatchSnapshot();
});
