import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import SharedForm from '../components/SharedForm';

type Props = {
  handleMutate: (values: any) => void;
};

const FormSubmission = ({ handleMutate }: Props) => {
  return (
    <Formik
      initialValues={{
        id: '',
        firstName: '',
        lastName: '',
        house: '',
        knownAs: '',
      }}
      validationSchema={yup.object({
        firstName: yup.string().label('First Name').min(2).required(),
        lastName: yup.string().label('Last Name').min(2).required(),
        house: yup.string().label('House').required(),
        knownAs: yup.string().label('Known as').required(),
      })}
      onSubmit={(values, actions) => {
        handleMutate(values);
        actions.resetForm();
      }}
    >
      {() => <SharedForm />}
    </Formik>
  );
};

export default FormSubmission;
