
import React from "react";
import { render } from "@testing-library/react";
import InactiveGroupTile from "../components/InactiveGroupTile";

it("renders without crashing", function () {
    render(
        <table>
            <tbody>
                <tr>
                    <InactiveGroupTile />
                </tr>
            </tbody>
        </table>
    );
});

it("matches snapshot", function () {
    const { asFragment } = render(
        <table>
            <tbody>
                <tr>
                    <InactiveGroupTile />
                </tr>
            </tbody>
        </table>
    );
    expect(asFragment()).toMatchSnapshot();
});
