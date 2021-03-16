import { api } from "./index";

describe("Fake API test", () => {
  it("should return value", async () => {
    const apiCall = success => api.submit("/submit", success);

    const expectedSuccessValue = { success: true };
    const success = await apiCall(true);

    expect(success).toStrictEqual(expectedSuccessValue);

    const expectedFailedValue = {
      success: false,
      message: "Unable to process requests."
    };
    const failed = await apiCall(false);
    expect(failed).toStrictEqual(expectedFailedValue);
  });
});
