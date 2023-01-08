import { Alert, Box, Input } from '@mantine/core';
import React from 'react';
import { FormSchemaType } from '../validations/hero';
import { FieldErrors } from 'react-hook-form';

type Props = {
  label: string;
  type?: string;
  name?: string;
  errors: FieldErrors<FormSchemaType>;
};

const InputBox = ({ label, errors, type = 'text', ...props }: Props) => {
  return (
    <Box mb={20}>
      <Input type={type} {...props} />
      {errors.lastName && <Alert color={'red'}>{errors[label]?.message}</Alert>}
    </Box>
  );
};

export default InputBox;
