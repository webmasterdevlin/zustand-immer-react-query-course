import React from 'react';

type Props = {
  title: string;
};

const TitleBar = ({ title }: Props) => {
  return (
    <div className={'mb-10'}>
      <h1 data-testid="title-page">{title}</h1>
    </div>
  );
};

export default TitleBar;
