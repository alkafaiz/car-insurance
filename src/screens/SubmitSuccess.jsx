import React, { useEffect } from "react";
import Success from "../containers/Success";

function SubmitSuccess() {
  useEffect(() => {
    document.title = "Success | Car Insurance";
  }, []);

  return <Success />;
}

export { SubmitSuccess };
