import React from 'react';

type Props = {
  label?: string;
  collection: any[] | undefined;
  dataTestId?: string;
};

const TotalOfCharacters = ({ label, collection }: Props) => {
  return (
    <p className={'mr-10 text-red-500'}>
      {label} has {collection?.length}
    </p>
  );
};

export default TotalOfCharacters;
