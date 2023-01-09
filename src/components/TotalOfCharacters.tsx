import React from 'react';

type Props = {
  label?: string;
  collection: any[] | undefined;
  dataTestId?: string;
};

const TotalOfCharacters = ({ label, collection, dataTestId }: Props) => (
  <p className={'text-red-500 mr-10'}>
    {label} has {collection?.length}
  </p>
);

export default TotalOfCharacters;
