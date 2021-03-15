import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { PersonalDetailForm } from "./index";
import React from "react";
import { subYears } from "date-fns";

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn()
  })
}));

const defaultProps = {
  nextStep: jest.fn(),
  setPersonalDetails: jest.fn(),
  initialValues: {
    firstName: "",
    lastName: "",
    dob: "",
    email: ""
  }
};

const setup = props =>
  render(<PersonalDetailForm {...defaultProps} {...props} />);

describe("PersonalDetailForm container", () => {
  it("should render", () => {
    const wrapper = setup();

    expect(wrapper.getByText("Personal detail")).toBeDefined();
    expect(wrapper.getByText("Personal detail")).toBeTruthy();
  });

  it("should render without crashing", () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it("should validate required fields", async () => {
    const { getByText, getAllByText } = setup();

    const button = getByText("Next");

    fireEvent.click(button);

    const requiredLabel = await waitFor(() => getAllByText("Required"));

    expect(requiredLabel.length).toBe(4);
  });

  it("should validate email format", async () => {
    const { getByText, getByPlaceholderText } = setup();

    const emailInput = getByPlaceholderText("Email address");
    const button = getByText("Next");

    fireEvent.change(emailInput, { target: { value: "test.com" } });
    fireEvent.click(button);

    const invalidEmailText = await waitFor(() =>
      getByText("Invalid email format")
    );

    expect(invalidEmailText).toBeDefined();
  });

  it("should submit form", async () => {
    const initialValues = {
      firstName: "",
      lastName: "",
      dob: subYears(new Date(), 20),
      email: ""
    };

    const mockData = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com"
    };

    const { getByPlaceholderText, getByText } = setup({
      initialValues
    });

    const firstNameInput = getByPlaceholderText("First name");
    const lastNameInput = getByPlaceholderText("Last name");
    const emailInput = getByPlaceholderText("Email address");
    const button = getByText("Next");

    fireEvent.change(firstNameInput, { target: { value: mockData.firstName } });
    fireEvent.change(lastNameInput, { target: { value: mockData.lastName } });
    fireEvent.change(emailInput, { target: { value: mockData.email } });

    await waitFor(() => firstNameInput);
    await waitFor(() => lastNameInput);
    await waitFor(() => emailInput);

    expect(firstNameInput.value).toBe("John");
    expect(lastNameInput.value).toBe("Doe");
    expect(emailInput.value).toBe("johndoe@gmail.com");

    await waitFor(() => fireEvent.click(button));

    const loading = getByText("Loading...");
    expect(loading).toBeDefined();
    expect(loading).toBeTruthy();
    expect(defaultProps.setPersonalDetails).toHaveBeenCalledTimes(1);
    expect(defaultProps.setPersonalDetails).toHaveBeenCalledWith({
      ...mockData,
      dob: initialValues.dob.toISOString()
    });
  });
});
