import React from "react";
import styled from "styled-components";

const Toolbar = ({ children }) => <StyledToolbar>{children}</StyledToolbar>;

export default Toolbar;

const StyledToolbar = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  margin: 1rem 0;
  min-height: 3rem;

  &:after {
    content: "";
    position: absolute;
    height: 1px;
    background: #696969;
    width: 100%;
    bottom: -0.5rem;
  }

  @media (min-width: 481px) {
    flex-flow: row wrap;
  }
`;
