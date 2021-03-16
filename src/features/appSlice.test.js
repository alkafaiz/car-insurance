import store from "../app/store";
import * as slice from "./appSlice";
import { api } from "../api";

jest.mock("../api");

describe("Form actions", () => {
  const setPersonalDetailsPayload = {
    firstName: "John",
    lastName: "Doe",
    dob: new Date("2000-03-16T05:05:46.822Z").toISOString(),
    email: "johndoe@gmail.com"
  };

  const setCarDetailsPayload = {
    plateNumber: "1212",
    hasClaim: "yes",
    licenseYear: "2",
    carMake: "Honda",
    carModel: "City",
    carManufacturerDate: new Date("2003-03-16T05:05:46.822Z").toISOString()
  };

  it("should check setStepIndex action creator", () => {
    const payload = 1;
    const expectedAction = { type: slice.setStepIndex.type, payload };

    expect(slice.setStepIndex(payload)).toStrictEqual(expectedAction);
  });

  it("should check setPersonalDetails action creator", () => {
    const expectedAction = {
      type: slice.setPersonalDetails.type,
      payload: setPersonalDetailsPayload
    };

    expect(slice.setPersonalDetails(setPersonalDetailsPayload)).toStrictEqual(
      expectedAction
    );
  });

  it("should check setCarDetails action creator", () => {
    const expectedAction = {
      type: slice.setCarDetails.type,
      payload: setCarDetailsPayload
    };

    expect(slice.setCarDetails(setCarDetailsPayload)).toStrictEqual(
      expectedAction
    );
  });

  it("should setStepIndex action creator updates the store", () => {
    let state = store.getState().app;
    const index = 1;

    store.dispatch(slice.setStepIndex(index));
    state = store.getState().app;

    expect(state.stepIndex).toStrictEqual(index);
  });

  it("should setPersonalDetails action creator updates the store", () => {
    let state = store.getState().app;

    store.dispatch(slice.setPersonalDetails(setPersonalDetailsPayload));
    state = store.getState().app;

    const updatedPersonalDetail = {
      firstName: state.data.firstName,
      lastName: state.data.lastName,
      dob: state.data.dob,
      email: state.data.email
    };

    expect(updatedPersonalDetail).toStrictEqual(setPersonalDetailsPayload);
    expect(updatedPersonalDetail).toMatchSnapshot();
  });

  it("should setCarDetails action creator updates the store", () => {
    let state = store.getState().app;

    store.dispatch(slice.setCarDetails(setCarDetailsPayload));
    state = store.getState().app;

    const updatedCarDetail = {
      plateNumber: state.data.plateNumber,
      hasClaim: state.data.hasClaim,
      licenseYear: state.data.licenseYear,
      carMake: state.data.carMake,
      carModel: state.data.carModel,
      carManufacturerDate: state.data.carManufacturerDate
    };

    expect(updatedCarDetail).toStrictEqual(setCarDetailsPayload);
    expect(updatedCarDetail).toMatchSnapshot();
  });
});

describe("Submit thunk actions", () => {
  it("should check submit thunk action creator", async () => {
    store.dispatch(slice.setCarDetails({ plateNumber: "111" }));
    store.dispatch(slice.submit());

    expect(api.submit).toHaveBeenCalledTimes(1);
    expect(api.submit).toHaveBeenCalledWith("/submit", false);
  });
});
