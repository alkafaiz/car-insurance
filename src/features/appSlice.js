import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  stepIndex: 0,
  data: {
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    plateNumber: "",
    hasClaim: "yes",
    licenseYear: "0",
    carMake: "",
    carModel: "",
    carManufacturerDate: ""
  },
  isLoading: false,
  success: false
};

const mockApi = scenario =>
  new Promise(resolve => {
    setTimeout(function() {
      const response =
        scenario === "failed"
          ? { success: false, message: "Unable to process requests." }
          : { success: true };

      resolve(response);
    }, 3000);
  });

export const submit = createAsyncThunk(
  "app/submit",
  async (payload, thunkApi) => {
    const { plateNumber } = thunkApi.getState().app.data;

    const mockFailed = plateNumber === "111";

    if (mockFailed) {
      const response = await mockApi("failed");
      return thunkApi.rejectWithValue(response);
    } else {
      const response = await mockApi("success");
      return response;
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setStepIndex: (state, action) => {
      state.stepIndex = action.payload;
    },
    setPersonalDetails: (state, action) => {
      state.data.firstName = action.payload.firstName;
      state.data.lastName = action.payload.lastName;
      state.data.dob = action.payload.dob;
      state.data.email = action.payload.email;
    },
    setCarDetails: (state, action) => {
      state.data.plateNumber = action.payload.plateNumber;
      state.data.hasClaim = action.payload.hasClaim;
      state.data.licenseYear = action.payload.licenseYear;
      state.data.carMake = action.payload.carMake;
      state.data.carModel = action.payload.carModel;
      state.data.carManufacturerDate = action.payload.carManufacturerDate;
    }
  },
  extraReducers: {
    [submit.pending]: state => {
      state.isLoading = true;
    },
    [submit.rejected]: state => {
      state.isLoading = false;
      state.success = false;
    },
    [submit.fulfilled]: state => {
      state.isLoading = false;
      state.success = true;
    }
  }
});

export const {
  setStepIndex,
  setPersonalDetails,
  setCarDetails
} = appSlice.actions;

export default appSlice.reducer;
