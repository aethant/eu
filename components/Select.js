import React from "react";
import styled from "styled-components";

const Select = ({ children, onChangeHandler = () => null }) => (
  <StyledSelectInput onChange={onChangeHandler}>{children}</StyledSelectInput>
);

export default Select;

const StyledSelectInput = styled.select`
  height: 2rem;
  width: 100%;

  @media (min-width: 481px) {
    width: auto;
  }
`;
