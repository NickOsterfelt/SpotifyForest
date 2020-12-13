import React from "react";
import { render } from "@testing-library/react";
import UserGroupTile from "../components/UserGroupTile";

it("renders without crashing", function () {
    render(
        <table>
            <tbody>
                <tr>
                    <UserGroupTile />
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
                    <UserGroupTile />
                </tr>
            </tbody>
        </table>
    );
    expect(asFragment()).toMatchSnapshot();
});
