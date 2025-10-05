import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import React from "react";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const MultiStepForm: React.FC<object>= () =>{
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()

            .max(15, "Must be 15 characters or less")

            .required("Required"),

          lastName: Yup.string()

            .max(20, "Must be 20 characters or less")

            .required("Required"),

          email: Yup.string()

            .email("Invalid email address")

            .required("Required"),
        })}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default MultiStepForm;
