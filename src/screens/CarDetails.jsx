import React, { useEffect } from "react";
import CarDetailForm from "../containers/CarDetailForm";

function CarDetails() {
  useEffect(() => {
    document.title = "Car Detail | Car Insurance";
  }, []);

  return <CarDetailForm />;
}

export { CarDetails };
