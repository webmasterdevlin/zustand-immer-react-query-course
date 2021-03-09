import React from "react";

import { Formik } from "formik";
import * as yup from "yup";
import SharedForm from "../components/SharedForm";

type Props = {
  handleCreateAction: (values: any) => void;
};

const FormSubmission = ({ handleCreateAction }: Props) => {
  return (
    <Formik
      initialValues={{
        id: "",
        firstName: "",
        lastName: "",
        house: "",
        knownAs: "",
      }}
      validationSchema={yup.object({
        firstName: yup.string().label("First Name").min(2).required(),
        lastName: yup.string().label("Last Name").min(2).required(),
        house: yup.string().label("House").required(),
        knownAs: yup.string().label("Known as").required(),
      })}
      onSubmit={(values, actions) => {
        actions.resetForm();
      }}
    >
      {() => <SharedForm />}
    </Formik>
  );
};

export default FormSubmission;
