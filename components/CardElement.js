import React from "react";
import styled from "styled-components";

const CardElement = ({ label, datapoint }) => (
  <CardDataElementItem>
    <CardDataElementLabel>{label}</CardDataElementLabel>
    <CardDataElementData>{datapoint}</CardDataElementData>
  </CardDataElementItem>
);

export default React.memo(CardElement);

const CardDataElementItem = styled.li`
  display: flex;
  font-size: 0.875rem;
  justify-content: space-between;
  padding: 0.25rem;

  &:nth-child(even) {
    background: #eaeaea;
  }
`;

const CardDataElementLabel = styled.span`
  flex: 0 0 50%;
  font-weight: 700;
`;

const CardDataElementData = styled.span`
  flex: auto;
  font-weight: 200;
  text-align: right;
`;
