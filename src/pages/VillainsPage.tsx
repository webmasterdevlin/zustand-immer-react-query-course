import React, { useState } from "react";
import {
  Box,
  Button,
  createStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import TitleBar from "../components/TitleBar";
import UpdateUiLabel from "../components/UpdateUiLabel";
import FormSubmission from "../components/FormSubmission";
import useFetchVillains from "../features/villains/hooks/useFetchVillains";
import useRemoveVillain from "../features/villains/hooks/useRemoveVillain";
import useAddVillain from "../features/villains/hooks/useAddVillain";
import { queryClient } from "../App";
import { VillainModel } from "../features/villains/villain";

const VillainsPage = () => {
  const { data, status } = useFetchVillains();
  const { mutate: removeVillain } = useRemoveVillain();
  const { mutate: addVillain } = useAddVillain();
  /*local state*/
  const [counter, setCounter] = useState("0");

  const classes = useStyles();
  const smallScreen = useMediaQuery("(max-width:600px)");

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: VillainModel[] }>("villains", (input) => ({
      data: input?.data?.filter((v) => v.id !== id) as any,
    }));
  };

  if (status === "error") return <p>Error :(</p>;

  return (
    <div>
      <TitleBar title={"Super VillainsPage"} />
      <FormSubmission handleMutate={addVillain} />
      <UpdateUiLabel />
      <>
        {status === "loading" ? (
          <Typography variant={"h2"}>Loading.. Please wait..</Typography>
        ) : (
          data?.data?.map((v) => (
            <Box
              key={v.id}
              role={"card"}
              mb={2}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
            >
              <Typography>
                <span>{`${v.firstName} ${v.lastName} is ${v.knownAs}`}</span>
                {counter === v.id && <span> - marked</span>}
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(v.id)}
                  variant={"contained"}
                  color={"default"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"contained"}
                  color={"secondary"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"secondary"}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {data?.data?.length === 0 && status === "loading" && (
        <Button
          className={classes.button}
          variant={"contained"}
          color={"primary"}
        >
          Re-fetch
        </Button>
      )}
    </div>
  );
};

export default VillainsPage;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: "0 0.5rem",
      "&:focus": {
        outline: "none",
      },
    },
  })
);
