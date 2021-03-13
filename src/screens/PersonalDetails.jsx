import React, { useEffect } from "react";
import PersonalDetailForm from "../containers/PersonalDetailForm";

function PersonalDetails() {
  useEffect(() => {
    document.title = "Personal Detail | Car Insurance";
  }, []);

  return <PersonalDetailForm />;
}

export { PersonalDetails };
