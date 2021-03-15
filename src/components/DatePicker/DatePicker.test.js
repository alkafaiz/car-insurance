import { render } from "@testing-library/react";
import DatePicker from "./index";
import React from "react";

const defaultProps = {
  label: "Date picker"
};

const setup = props =>
  render(<DatePicker {...{ ...defaultProps, ...props }} />);

describe("DatePicker component", () => {
  it("should render", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("render without crashing", () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper).toBeTruthy();
  });

  it("should render label", () => {
    const labelText = "Testing label";
    const { getByText } = setup({ label: labelText });

    const label = getByText(labelText);
    expect(label).toBeDefined();
    expect(label.textContent).toBe(labelText);
  });

  it("should render error text", () => {
    const errorText = "Required";
    const { getByTestId } = setup({ isInvalid: true, error: errorText });

    const error = getByTestId("error-text");
    expect(error).toBeDefined();
    expect(error.textContent).toBe(errorText);
  });
});
