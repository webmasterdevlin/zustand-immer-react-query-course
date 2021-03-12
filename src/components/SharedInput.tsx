import React from "react";
import { Field, useFormikContext } from "formik";
import { Box, createStyles, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

type Props = {
  id: string;
  label: string;
};

const SharedInput = ({ id, label }: Props) => {
  const classes = useStyles();
  const formik = useFormikContext<any>();

  return (
    <Box mb={2}>
      <Field
        label={label}
        id={id}
        className={classes.field}
        type={"text"}
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
      marginBottom: "2rem",
      width: "100%",
    },
  })
);
