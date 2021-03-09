import React from "react";

type Props = {
  collection: any[];
  role: string;
};

const TotalOfCharacters = ({ collection, role }: Props) => (
  <span role={role} style={{ color: "cyan", margin: "0 1rem" }}>
    {collection?.length}
  </span>
);

export default TotalOfCharacters;
