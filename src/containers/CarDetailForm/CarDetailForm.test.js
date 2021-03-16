import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  screen
} from "@testing-library/react";
import { CarDetailForm } from ".";
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
  setCarDetails: jest.fn(),
  initialValues: {
    plateNumber: "",
    hasClaim: "yes",
    licenseYear: "0",
    carMake: "",
    carModel: "",
    carManufacturerDate: ""
  },
  prevStep: jest.fn(),
  submit: jest.fn(),
  isSubmitting: false,
  stepIndex: 1
};

const setup = props => render(<CarDetailForm {...defaultProps} {...props} />);

describe("CarDetailForm container", () => {
  it("should render", () => {
    const wrapper = setup();

    expect(wrapper.getByText("Car detail")).toBeDefined();
    expect(wrapper.getByText("Car detail")).toBeTruthy();
  });

  it("should render without crashing", () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it("should validate required fields", async () => {
    const { getByText, getAllByText } = setup();

    const button = getByText("Submit");

    fireEvent.click(button);

    const requiredLabel = await waitFor(() => getAllByText("Required"));

    expect(requiredLabel.length).toBe(4);
  });

  it("should fill form", async () => {
    const initialValues = {
      plateNumber: "",
      hasClaim: "yes",
      licenseYear: "0",
      carMake: "",
      carModel: "",
      carManufacturerDate: subYears(new Date(), 20)
    };

    const mockData = {
      plateNumber: "1112",
      carMake: "Honda",
      carModel: "City"
    };

    const { getByPlaceholderText, getByText } = setup({
      initialValues
    });

    const plateNumberInput = getByPlaceholderText("Plate number");
    const carMakeInput = getByPlaceholderText("Car make");
    const carModelInput = getByPlaceholderText("Car model");

    fireEvent.change(plateNumberInput, {
      target: { value: mockData.plateNumber }
    });
    fireEvent.change(carMakeInput, { target: { value: mockData.carMake } });
    fireEvent.change(carModelInput, { target: { value: mockData.carModel } });

    await waitFor(() => plateNumberInput);
    await waitFor(() => carMakeInput);
    await waitFor(() => carModelInput);

    expect(plateNumberInput.value).toBe(mockData.plateNumber);
    expect(carMakeInput.value).toBe(mockData.carMake);
    expect(carModelInput.value).toBe(mockData.carModel);
  });

  it("should submit form", async () => {
    const initialValues = {
      plateNumber: "1111",
      hasClaim: "yes",
      licenseYear: "0",
      carMake: "Honda",
      carModel: "City",
      carManufacturerDate: subYears(new Date(), 20)
    };

    defaultProps.submit.mockImplementation(() => Promise.resolve());

    const { getByText } = setup({
      initialValues
    });

    const button = getByText("Submit");

    await waitFor(() => fireEvent.click(button));
    expect(defaultProps.submit).toHaveBeenCalledTimes(1);
    expect(defaultProps.submit).toHaveBeenCalledWith();
    expect(defaultProps.setCarDetails).toHaveBeenCalledTimes(1);
    expect(defaultProps.setCarDetails).toHaveBeenCalledWith({
      ...initialValues,
      carManufacturerDate: initialValues.carManufacturerDate.toISOString()
    });
  });
});
