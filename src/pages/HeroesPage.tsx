import React, { useState } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { queryClient } from '../App';
import TitleBar from '../components/TitleBar';
import UpdateUiLabel from '../components/UpdateUiLabel';
import FormSubmission from '../components/FormSubmission';
import useFetchHeroes from '../features/heroes/hooks/useFetchHeroes';
import useRemoveHero from '../features/heroes/hooks/useRemoveHero';
import useAddHero from '../features/heroes/hooks/useAddHero';
import { HeroModel } from '../features/heroes/hero';

const HeroesPage = () => {
  const { data: response, status } = useFetchHeroes();
  const { mutate: removeHero } = useRemoveHero();
  const { mutate: addHero } = useAddHero();
  /*local state*/
  const [counter, setCounter] = useState('0');

  const smallScreen = useMediaQuery('(max-width:600px)');
  const classes = useStyles();

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: HeroModel[] }>('heroes', input => ({
      data: input?.data?.filter(h => h.id !== id) as any,
    }));
  };

  if (status === 'error') return <p>Error :(</p>;

  return (
    <div>
      <TitleBar title={'Super Heroes Page'} />
      <FormSubmission handleMutate={addHero} />
      <UpdateUiLabel />
      <>
        {status === 'loading' ? (
          <Typography data-testid={'loading'} variant={'h2'}>
            Loading.. Please wait..
          </Typography>
        ) : (
          response?.data?.map(h => (
            <Box
              key={h.id}
              role={'card'}
              mb={2}
              display={'flex'}
              flexDirection={smallScreen ? 'column' : 'row'}
              justifyContent={'space-between'}
              data-testid={'card'}
            >
              <Typography>
                <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
                {counter === h.id && <span> - marked</span>}
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(h.id)}
                  variant={'contained'}
                  data-testid={'mark-button'}
                >
                  Mark
                </Button>{' '}
                <Button
                  className={classes.button}
                  variant={'contained'}
                  color={'secondary'}
                  onClick={() => handleSoftDelete(h.id)}
                  data-testid={'remove-button'}
                >
                  Remove
                </Button>{' '}
                <Button
                  className={classes.button}
                  variant={'outlined'}
                  color={'secondary'}
                  onClick={() => removeHero(h.id)}
                  data-testid={'delete-button'}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {response?.data?.length === 0 && status !== 'loading' && (
        <Button
          data-testid={'refetch-button'}
          className={classes.button}
          variant={'contained'}
          color={'primary'}
          onClick={() => queryClient.invalidateQueries('heroes')}
        >
          Re-fetch
        </Button>
      )}
    </div>
  );
};

export default HeroesPage;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: '0 0.5rem',
      '&:focus': {
        outline: 'none',
      },
    },
  }),
);
