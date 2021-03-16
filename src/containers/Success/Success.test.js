import React from "react";
import {
  render,
  cleanup,
  waitForDomChange,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved
} from "@testing-library/react";
import Success from ".";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(() => ({
    search: ""
  }))
}));

import { useLocation } from "react-router-dom";

afterEach(cleanup);

describe("Success container", () => {
  it("should render", () => {
    const { getByText } = render(<Success />);

    const successText = getByText("success");

    expect(successText).toBeDefined();
    expect(successText).toBeTruthy();
  });

  it("should render without crashing", () => {
    const wrapper = render(<Success />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should handle newuser query param", async () => {
    useLocation.mockImplementation(() => ({
      search: "?newuser=true"
    }));

    const { getByText } = render(<Success />);

    const welcomeHeading = await waitFor(() => getByText("Welcome!"));
    expect(welcomeHeading).toBeDefined();
    expect(welcomeHeading).toBeTruthy();
  });
});
