import React, { useEffect } from "react";
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
  Icon,
  useToast,
  Heading
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { PERSONAL_DETAILS, SUCCESS } from "../routes";
import { FiArrowLeft } from "react-icons/fi";
import DatePicker from "../components/DatePicker";
import { connect } from "react-redux";
import { setStepIndex, setCarDetails, submit } from "../features/appSlice";
import { unwrapResult } from "@reduxjs/toolkit";

function PersonalDetailForm({
  nextStep,
  prevStep,
  initialValues,
  setCarDetails,
  submit,
  isSubmitting,
  stepIndex
}) {
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    if (stepIndex !== 1) {
      prevStep();
      history.push(PERSONAL_DETAILS);
    }
  }, [stepIndex, prevStep, history]);

  const onSubmit = values => {
    const carManufacturerDate = new Date(
      values.carManufacturerDate
    ).toISOString();

    setCarDetails({ ...values, carManufacturerDate });
    submit()
      .then(unwrapResult)
      .then(response => {
        history.push({
          pathname: SUCCESS,
          search: "?newuser=true"
        });
        nextStep();
      })
      .catch(error => {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true
        });
      });
  };

  const onBack = () => {
    prevStep();
    history.push(PERSONAL_DETAILS);
  };

  return (
    <>
      <Heading mb={6} size="md">
        Car detail
      </Heading>
      <Formik
        initialValues={{
          plateNumber: initialValues.plateNumber,
          hasClaim: initialValues.hasClaim,
          licenseYear: initialValues.licenseYear,
          carMake: initialValues.carMake,
          carModel: initialValues.carModel,
          carManufacturerDate:
            initialValues.carManufacturerDate === ""
              ? initialValues.carManufacturerDate
              : new Date(initialValues.carManufacturerDate)
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
                  isInvalid={
                    form.errors.plateNumber && form.touched.plateNumber
                  }
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
                  isInvalid={
                    form.errors.licenseYear && form.touched.licenseYear
                  }
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
              onChange={date =>
                formik.setFieldValue("carManufacturerDate", date)
              }
              error={formik.errors.carManufacturerDate}
              inputProps={formik.getFieldProps("carManufacturerDate")}
              isInvalid={
                formik.errors.carManufacturerDate &&
                formik.touched.carManufacturerDate
              }
              maxDate={new Date()}
            />

            <Flex my={8}>
              <IconButton
                mr={2}
                variant="outline"
                colorScheme="teal"
                aria-label="go-back"
                icon={<Icon as={FiArrowLeft} />}
                onClick={onBack}
                disabled={isSubmitting}
              />
              <Button
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                isFullWidth
              >
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = state => ({
  initialValues: {
    plateNumber: state.app.data.plateNumber,
    hasClaim: state.app.data.hasClaim,
    licenseYear: state.app.data.licenseYear,
    carMake: state.app.data.carMake,
    carModel: state.app.data.carModel,
    carManufacturerDate: state.app.data.carManufacturerDate
  },
  isSubmitting: state.app.isLoading,
  stepIndex: state.app.stepIndex
});

const mapDispatchToProps = dispatch => ({
  setCarDetails: payload => dispatch(setCarDetails(payload)),
  submit: () => dispatch(submit()),
  nextStep: () => dispatch(setStepIndex(2)),
  prevStep: () => dispatch(setStepIndex(0))
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetailForm);
