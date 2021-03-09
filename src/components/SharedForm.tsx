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
            <SharedInput id={"firstName"} />
            <SharedInput id={"lastName"} />
            <SharedInput id={"house"} />
            <SharedInput id={"knownAs"} />
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
