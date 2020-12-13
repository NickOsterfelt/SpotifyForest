import React from "react";
import { render } from "@testing-library/react";
import Routes from "../routes/Routes";
import { MemoryRouter } from "react-router";


it("renders without crashing", function() {
  render(
    <MemoryRouter>
        <Routes />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
        <Routes />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
