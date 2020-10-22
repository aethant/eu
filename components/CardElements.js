import React from "react";
import styled from "styled-components";

import CardElement from "./CardElement";

const CardElements = ({ capital, languages, subregion, population }) => (
  <CardElementsList>
    <CardElement label="Captial" datapoint={capital} />
    <CardElement label="Subregion" datapoint={subregion} />
    <CardElement label="Total Population" datapoint={population} />
    <CardElement
      label="Total Languages"
      datapoint={[...(languages || [])].length}
    />
  </CardElementsList>
);

export default CardElements;

export const CardElementsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;
