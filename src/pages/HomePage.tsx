import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { x } from '@xstyled/emotion';
import { ReactQueryDevtools } from 'react-query/devtools';

const HomePage = () => {
  return (
    <Container>
      <x.div
        w={'100%'}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'flex-start'}
        alignItems={'center'}
      >
        <Typography variant={'h2'}>
          Welcome to Zustand, Immer, and React Query Course 🧑‍🏫 💻
        </Typography>
      </x.div>
      <ReactQueryDevtools initialIsOpen />
    </Container>
  );
};

export default HomePage;
