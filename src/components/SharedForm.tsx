import React from "react";
import { Form, useFormikContext } from "formik";
import SharedInput from "./SharedInput";
import { Box, Button, Paper } from "@material-ui/core";

const SharedForm = () => {
  const formik = useFormikContext<any>();

  return (
    <Box mb={4}>
      <Paper>
        <Form style={{ padding: "1rem" }}>
          <div>
            <SharedInput
              id={"firstName"}
              dataTestId={"firstName"}
              label={"First Name"}
            />
            <SharedInput
              id={"lastName"}
              dataTestId={"lastName"}
              label={"Last Name"}
            />
            <SharedInput id={"house"} dataTestId={"house"} label={"House"} />
            <SharedInput
              id={"knownAs"}
              dataTestId={"knownAs"}
              label={"Known As"}
            />
          </div>

          <Button
            disabled={!formik.dirty || !formik.isValid}
            type="submit"
            color={"primary"}
            variant={"outlined"}
            data-testid={"save-character"}
          >
            Save Character
          </Button>
        </Form>
      </Paper>
    </Box>
  );
};

export default SharedForm;
