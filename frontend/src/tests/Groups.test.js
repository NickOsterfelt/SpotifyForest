import React from "react";
import { render } from "@testing-library/react";
import Groups from "../routes/Groups";

it("renders without crashing", function() {
  render(<Groups />);
});

it("matches snapshot with no Groups and user", function() {
  const { asFragment } = render(<Groups />);
  expect(asFragment()).toMatchSnapshot();
});
