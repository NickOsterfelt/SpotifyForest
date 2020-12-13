import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomeAnon from "../routes/HomeAnon";


it("renders without crashing", function () {
    render(
        <MemoryRouter>
                <HomeAnon />
       </MemoryRouter>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
                <HomeAnon />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});
