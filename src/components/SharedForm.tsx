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
            <SharedInput id={"firstName"} label={"First Name"} />
            <SharedInput id={"lastName"} label={"Last Name"} />
            <SharedInput id={"house"} label={"House"} />
            <SharedInput id={"knownAs"} label={"Known As"} />
          </div>

          <Button
            disabled={!formik.dirty || !formik.isValid}
            type="submit"
            color={"primary"}
            variant={"outlined"}
          >
            Save Character
          </Button>
        </Form>
      </Paper>
    </Box>
  );
};

export default SharedForm;
