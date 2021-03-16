export const api = {
  submit: (url, success = true) =>
    new Promise(resolve => {
      setTimeout(function() {
        const response =
          success === false
            ? { success: false, message: "Unable to process requests." }
            : { success: true };

        resolve(response);
      }, 2000);
    })
};
