import React from 'react';
import { Flex, Title } from '@mantine/core';

const HomePage = () => {
  return (
    <Flex h={'100%'} justify="center" align="center">
      <Title order={2} data-testid={'welcome'}>
        Welcome to Zustand, Immer, and React Query Course 🧑‍🏫 💻
      </Title>
    </Flex>
  );
};

export default HomePage;
