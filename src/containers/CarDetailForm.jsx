import React from "react";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  RadioGroup,
  Select,
  HStack,
  Radio,
  Flex,
  IconButton,
  Icon
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { PERSONAL_DETAILS, SUCCESS } from "../routes";
import { FiArrowLeft } from "react-icons/fi";
import DatePicker from "../components/DatePicker";

function PersonalDetailForm() {
  const history = useHistory();

  const onSubmit = values => {
    console.log(values);
    history.push(SUCCESS);
  };

  const onBack = () => {
    history.push(PERSONAL_DETAILS);
  };

  return (
    <Formik
      initialValues={{
        plateNumber: "",
        hasClaim: "yes",
        licenseYear: "0",
        carMake: "",
        carModel: "",
        carManufacturerDate: ""
      }}
      validationSchema={Yup.object({
        plateNumber: Yup.string().required("Required"),
        licenseYear: Yup.string().required("Required"),
        carMake: Yup.string().required("Required"),
        carModel: Yup.string().required("Required"),
        carManufacturerDate: Yup.date().required("Required")
      })}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form onSubmit={formik.handleSubmit}>
          <Field name="plateNumber">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isRequired
                isInvalid={form.errors.plateNumber && form.touched.plateNumber}
              >
                <FormLabel htmlFor="plate-number">Plate number</FormLabel>
                <Input
                  {...field}
                  id="plate-number"
                  placeholder="Plate number"
                />
                <FormErrorMessage>{form.errors.plateNumber}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="hasClaim">
            {({ field, form }) => (
              <FormControl
                as="fieldset"
                mb={4}
                isRequired
                isInvalid={form.errors.hasClaim && form.touched.hasClaim}
              >
                <FormLabel as="legend">
                  Do you made any Claims in last 5 years?
                </FormLabel>
                <RadioGroup
                  // {...field}
                  value={formik.values.hasClaim}
                  onChange={value => {
                    formik.setFieldValue("hasClaim", value);

                    console.log("val", value);
                  }}
                >
                  <HStack spacing="24px">
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            )}
          </Field>
          <Field name="licenseYear">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isRequired
                isInvalid={form.errors.licenseYear && form.touched.licenseYear}
              >
                <FormLabel>
                  How many Years do you have Driving Licence?
                </FormLabel>
                <Select {...field}>
                  {["0", "1", "2", "3", "4", "5+"].map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </Field>
          <Field name="carMake">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isRequired
                isInvalid={form.errors.carMake && form.touched.carMake}
              >
                <FormLabel htmlFor="car-make">Car make</FormLabel>
                <Input {...field} id="car-make" placeholder="Car make" />
                <FormErrorMessage>{form.errors.carMake}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="carModel">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isRequired
                isInvalid={form.errors.carModel && form.touched.carModel}
              >
                <FormLabel htmlFor="car-model">Car model</FormLabel>
                <Input {...field} id="car-model" placeholder="Car model" />
                <FormErrorMessage>{form.errors.carModel}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <DatePicker
            label="Car manufacturer date"
            placeholder="Car manufacturer date"
            isRequired={true}
            value={formik.values.carManufacturerDate}
            onChange={date => formik.setFieldValue("carManufacturerDate", date)}
            error={formik.errors.carManufacturerDate}
            inputProps={formik.getFieldProps("carManufacturerDate")}
            isInvalid={
              formik.errors.carManufacturerDate &&
              formik.touched.carManufacturerDate
            }
            maxDate={new Date()}
          />

          <Flex mt={8}>
            <IconButton
              mr={2}
              variant="outline"
              colorScheme="teal"
              aria-label="go-back"
              icon={<Icon as={FiArrowLeft} />}
              onClick={onBack}
            />
            <Button
              colorScheme="teal"
              isLoading={formik.isSubmitting}
              type="submit"
              isFullWidth
            >
              Next
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default PersonalDetailForm;
