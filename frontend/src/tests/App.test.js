import React from "react";
import { render } from "@testing-library/react";
import App from "../components/App";

it("renders without crashing", function() {
  render(<App />);
});