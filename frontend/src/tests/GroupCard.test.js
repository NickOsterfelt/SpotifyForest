import React from "react";
import { render } from "@testing-library/react";
import GroupCard from "../components/GroupCard";

it("renders without crashing", function() {
  render(<GroupCard />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<GroupCard />);
  expect(asFragment()).toMatchSnapshot();
});
