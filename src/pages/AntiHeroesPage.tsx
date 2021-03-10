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
import useFetchAntiHeroes from "../features/anti-heroes/hooks/useFetchAntiHeroes";
import useRemoveAntiHero from "../features/anti-heroes/hooks/useRemoveAntiHero";
import useAddAntiHero from "../features/anti-heroes/hooks/useAddAntiHero";
import { queryClient } from "../App";
import { AntiHeroModel } from "../features/anti-heroes/antiHero";

const AntiHeroesPage = () => {
  const { data, status } = useFetchAntiHeroes();
  const { mutate: removeAntiHero } = useRemoveAntiHero();
  const { mutate: addAntiHero } = useAddAntiHero();
  /*local state*/
  const [counter, setCounter] = useState("0");

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: AntiHeroModel[] }>(
      "antiHeroes",
      (input) => ({
        data: input?.data?.filter((ah) => ah.id !== id) as any,
      })
    );
  };

  if (status === "error") return <p>Error :(</p>;

  return (
    <div>
      <TitleBar title={"Anti HeroesPage"} />
      <FormSubmission handleMutate={addAntiHero} />
      <UpdateUiLabel />
      <>
        {status === "loading" ? (
          <Typography variant={"h2"}>Loading.. Please wait..</Typography>
        ) : (
          data?.data?.map((ah) => (
            <Box
              mb={2}
              role={"card"}
              key={ah.id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
            >
              <div>
                <Typography>
                  <span>{`${ah.firstName} ${ah.lastName} is ${ah.knownAs}`}</span>
                  {counter === ah.id && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(ah.id)}
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

export default AntiHeroesPage;

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
