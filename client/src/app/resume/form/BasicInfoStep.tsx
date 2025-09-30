'use client'
import { useResumeContext } from "@/context/ResumeData";
import React from "react";
import { Formik ,Form , Field } from "formik";
import { BasicInfoSchema } from "@/lib/validator";

export default function BasicInfo() {
  const { basicInfo, setBasicInfo } = useResumeContext();

  return (
    <div>
      <Formik
        initialValues={basicInfo}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            actions.setSubmitting(false);
            setBasicInfo(values);
          }, 1000);
        }}
        validationSchema={BasicInfoSchema}
      >
       {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            {touched.name && errors.name && <div id="feedback">{errors.name}</div>}
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <Field type="text" name="phone" />
            {touched.phone && errors.phone && <div id="feedback">{errors.phone}</div>}
          </div>

          <div>
            <label htmlFor="linkedin">LinkedIn</label>
            <Field type="text" name="linkedin" />
            {touched.linkedin && errors.linkedin && <div id="feedback">{errors.linkedin}</div>}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            {touched.email && errors.email && <div id="feedback">{errors.email}</div>}
          </div>

          <button type="submit">Submit</button>
        </Form>
        )}
      </Formik>
      ;
    </div>
  );
}
