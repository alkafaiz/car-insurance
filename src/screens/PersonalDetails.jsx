import React, { useEffect } from "react";

function PersonalDetails() {
  useEffect(() => {
    document.title = "Personal Detail | Car Insurance";
  }, []);

  return <div>personal details</div>;
}

export { PersonalDetails };
