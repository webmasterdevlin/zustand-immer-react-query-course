import React, { useState } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { queryClient } from "App";
import TitleBar from "components/TitleBar";
import UpdateUiLabel from "components/UpdateUiLabel";
import FormSubmission from "components/FormSubmission";
import useFetchAntiHeroes from "features/anti-heroes/hooks/useFetchAntiHeroes";
import useRemoveAntiHero from "features/anti-heroes/hooks/useRemoveAntiHero";
import useAddAntiHero from "features/anti-heroes/hooks/useAddAntiHero";
import { AntiHeroModel } from "features/anti-heroes/antiHero";

const AntiHeroesPage = () => {
  const { data: response, status } = useFetchAntiHeroes();
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
      <TitleBar title={"Anti Heroes Page"} />
      <FormSubmission handleMutate={addAntiHero} />
      <UpdateUiLabel />
      <>
        {status === "loading" ? (
          <Typography data-testid="loading" variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          response?.data?.map((ah) => (
            <Box
              mb={2}
              role={"card"}
              key={ah.id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
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
                  data-testid={"mark-button"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"contained"}
                  color={"secondary"}
                  onClick={() => handleSoftDelete(ah.id)}
                  data-testid={"remove-button"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"secondary"}
                  onClick={() => removeAntiHero(ah.id)}
                  data-testid={"delete-button"}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {response?.data?.length === 0 && status !== "loading" && (
        <Button
          data-testid={"refetch-button"}
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={() => queryClient.invalidateQueries("antiHeroes")}
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
