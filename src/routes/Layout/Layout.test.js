import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Layout } from "../index";

afterEach(cleanup);

describe("Layout component", () => {
  it("should render", () => {
    const wrapper = render(<Layout />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  it("should show heading text", () => {
    const wrapper = render(<Layout />);
    const heading = wrapper.getByText("Car Insurance");
    expect(heading).toBeDefined();
  });
});
