import React, { useState } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { queryClient } from '../App';
import TitleBar from '../components/TitleBar';
import UpdateUiLabel from '../components/UpdateUiLabel';
import FormSubmission from '../components/FormSubmission';
import useFetchVillains from '../features/villains/hooks/useFetchVillains';
import useRemoveVillain from '../features/villains/hooks/useRemoveVillain';
import useAddVillain from '../features/villains/hooks/useAddVillain';
import { VillainModel } from '../features/villains/villain';

const VillainsPage = () => {
  const { data: response, status } = useFetchVillains();
  const { mutate: removeVillain } = useRemoveVillain();
  const { mutate: addVillain } = useAddVillain();
  /*local state*/
  const [counter, setCounter] = useState('0');

  const classes = useStyles();
  const smallScreen = useMediaQuery('(max-width:600px)');

  const handleSoftDelete = (id: string) => {
    queryClient.setQueryData<{ data: VillainModel[] }>('villains', input => ({
      data: input?.data?.filter(v => v.id !== id) as any,
    }));
  };

  if (status === 'error') return <p>Error :(</p>;

  return (
    <div>
      <TitleBar title={'Super Villains Page'} />
      <FormSubmission handleMutate={addVillain} />
      <UpdateUiLabel />
      <>
        {status === 'loading' ? (
          <Typography data-testid={'loading'} variant={'h2'}>
            Loading.. Please wait..
          </Typography>
        ) : (
          response?.data?.map(v => (
            <Box
              key={v.id}
              role={'card'}
              mb={2}
              display={'flex'}
              flexDirection={smallScreen ? 'column' : 'row'}
              justifyContent={'space-between'}
              data-testid={'card'}
            >
              <Typography>
                <span>{`${v.firstName} ${v.lastName} is ${v.knownAs}`}</span>
                {counter === v.id && <span> - marked</span>}
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(v.id)}
                  variant={'contained'}
                  data-testid={'mark-button'}
                >
                  Mark
                </Button>{' '}
                <Button
                  className={classes.button}
                  variant={'contained'}
                  color={'secondary'}
                  onClick={() => handleSoftDelete(v.id)}
                  data-testid={'remove-button'}
                >
                  Remove
                </Button>{' '}
                <Button
                  className={classes.button}
                  variant={'outlined'}
                  color={'secondary'}
                  onClick={() => removeVillain(v.id)}
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
          onClick={() => queryClient.invalidateQueries('villains')}
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
      margin: '0 0.5rem',
      '&:focus': {
        outline: 'none',
      },
    },
  }),
);
