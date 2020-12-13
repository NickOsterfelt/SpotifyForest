import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "../routes/Home";


it("renders without crashing", function () {
    render(
        <MemoryRouter>
                <Home />
       </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
                <Home />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
