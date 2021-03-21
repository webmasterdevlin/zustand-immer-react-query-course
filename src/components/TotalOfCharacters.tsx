import React from "react";

type Props = {
  collection: any[] | undefined;
  dataTestId: string;
};

const TotalOfCharacters = ({ collection, dataTestId }: Props) => (
  <span data-testid={dataTestId} style={{ color: "cyan", margin: "0 1rem" }}>
    {collection?.length}
  </span>
);

export default TotalOfCharacters;
