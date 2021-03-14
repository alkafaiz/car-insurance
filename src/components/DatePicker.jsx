import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from "@chakra-ui/react";

function CustomDatePicker({
  label,
  isRequired,
  placeholder,
  value,
  onChange,
  error,
  isInvalid,
  inputProps,
  minDate,
  maxDate
}) {
  const CustomInput = forwardRef(({ value, onClick, inputProps }, ref) => (
    <Input
      {...inputProps}
      onClick={onClick}
      ref={ref}
      value={value}
      placeholder={placeholder}
      readOnly
    />
  ));

  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired} mt={4}>
      <FormLabel>{label}</FormLabel>
      <DatePicker
        wrapperClassName="datepicker-container"
        selected={value}
        onChange={onChange}
        customInput={<CustomInput inputProps={inputProps} />}
        minDate={minDate}
        maxDate={maxDate}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

CustomDatePicker.defaultProps = {
  isRequired: false,
  placeholder: ""
};

CustomDatePicker.propTypes = {
  onChange: PropTypes.func,
  isInvalid: PropTypes.bool,
  error: PropTypes.string,
  inputProps: PropTypes.object,
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  minDate: PropTypes.object,
  maxDate: PropTypes.object
};

export default CustomDatePicker;
