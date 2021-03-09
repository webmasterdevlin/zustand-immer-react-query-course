import React from "react";
import { Field, useFormikContext } from "formik";
import { Box, createStyles, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

type Props = {
  id: string;
};

const SharedInput = ({ id }: Props) => {
  const classes = useStyles();
  const formik = useFormikContext<any>();

  return (
    <Box mb={2}>
      <Field
        className={classes.field}
        type={"text"}
        label={id.toUpperCase()}
        name={id}
        as={TextField}
        error={formik.touched[id] && formik.errors[id]}
        helperText={formik.touched[id] && formik.errors[id]}
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
