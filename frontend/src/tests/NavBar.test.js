import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NavBar from "../components/NavBar";

it("renders without crashing", function () {
    render(
    <MemoryRouter>
        <NavBar />
    </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
