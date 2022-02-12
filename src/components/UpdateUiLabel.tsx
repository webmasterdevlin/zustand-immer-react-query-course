import React from "react";
import { Box } from "@mui/material";

const UpdateUiLabel = () => (
  <Box
    mb={1}
    display={"flex"}
    flexDirection={"row"}
    justifyContent={"flex-end"}
  >
    <div>local-state updates, non-async actions, async actions</div>
  </Box>
);

export default UpdateUiLabel;
