import React from 'react';
import { Text } from '@mantine/core';

type Props = {
  label?: string;
  collection: any[] | undefined;
  dataTestId?: string;
};

const TotalOfCharacters = ({ label, collection, dataTestId }: Props) => (
  <Text style={{ color: 'crimson', marginRight: '2rem' }}>
    {label} has {collection?.length}
  </Text>
);

export default TotalOfCharacters;
