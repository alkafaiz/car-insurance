import React from "react";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { CAR_DETAILS } from "../routes";
import DatePicker from "../components/DatePicker";
import { subYears } from "date-fns";

function PersonalDetailForm() {
  const history = useHistory();

  const onSubmit = values => {
    console.log(values);
    history.push(CAR_DETAILS);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        dob: "",
        email: ""
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string()
          .email("Invalid email format")
          .required("Required"),
        dob: Yup.date().required("Required")
      })}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form onSubmit={formik.handleSubmit}>
          <Field name="firstName">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isRequired
                isInvalid={form.errors.firstName && form.touched.firstName}
              >
                <FormLabel htmlFor="first-name">First name</FormLabel>
                <Input {...field} id="first-name" placeholder="First name" />
                <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="lastName">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isRequired
                isInvalid={form.errors.lastName && form.touched.lastName}
              >
                <FormLabel htmlFor="last-name">Last name</FormLabel>
                <Input {...field} id="last-name" placeholder="Last name" />
                <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isRequired
                isInvalid={form.errors.email && form.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="Email address" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <DatePicker
            label="Date of birth"
            placeholder="Date of birth"
            isRequired={true}
            value={formik.values.dob}
            onChange={date => formik.setFieldValue("dob", date)}
            error={formik.errors.dob}
            inputProps={formik.getFieldProps("dob")}
            isInvalid={formik.errors.dob && formik.touched.dob}
            maxDate={subYears(new Date(), 18)}
            minDate={subYears(new Date(), 100)}
          />
          <Button
            mt={8}
            colorScheme="teal"
            isLoading={formik.isSubmitting}
            type="submit"
            isFullWidth
          >
            Next
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default PersonalDetailForm;
