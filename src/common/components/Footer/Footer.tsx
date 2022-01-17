import React from 'react';
import styled from 'styled-components';
import Nav from "./Nav";


const Footer: React.FC = () => (
    <StyledFooter>
        <StyledFooterInner>
            <Nav />
        </StyledFooterInner>
    </StyledFooter>
);

const StyledFooter = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
  background: transparent;
  height: 120px;
  margin-top: 15px;

  @media (max-width: 818px) {
    align-items: flex-start;
    padding-top: 25px;
  }
`;

const StyledFooterInner = styled.div`
  align-items: start;
  display: flex;
  border-top: 2px solid rgb(49,47,48, 0.2);
  padding-top: 0%;
  justify-content: center;
  height: ${(props) => props.theme.topBarSize}px;
  max-width: ${(props) => props.theme.siteWidth};
  width: 100%;


  @media (max-width: 1468px) {
    max-width: 96vw;
  }
  
  @media (max-width: 818px) {
    padding-top: 2.5rem;
  }
`;

export default Footer;
