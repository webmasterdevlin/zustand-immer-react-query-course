import React from 'react';
import { Field, useFormikContext } from 'formik';
import { Box, TextField } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

type Props = {
  id: string;
  label: string;
  dataTestId?: string;
};

const SharedInput = ({ id, label, dataTestId }: Props) => {
  const classes = useStyles();
  const formik = useFormikContext<any>();

  return (
    <Box mb={2}>
      <Field
        label={label}
        id={id}
        data-testid={dataTestId}
        className={classes.field}
        type={'text'}
        name={id}
        as={TextField}
        error={!!(formik.touched[id] && formik.errors[id])}
        helperText={formik.touched[id] ? formik.errors[id] : null}
      />
    </Box>
  );
};

export default SharedInput;

const useStyles = makeStyles(() =>
  createStyles({
    field: {
      marginBottom: '2rem',
      width: '100%',
    },
  }),
);
