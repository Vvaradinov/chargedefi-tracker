import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import {Flex, Heading} from "@pancakeswap-libs/uikit";
import { Box, HStack } from '@chakra-ui/react';
import {Certik, Discord, Gitbook, Medium, Telegram, Twitter, Whitepaper} from "./Icons";


const Nav: React.FC = () => {
    const { account } = useWeb3React();

    return (
        <StyledNav>
            <Heading>Our channels</Heading>
                <HStack spacing={5} pt={2}>
                        {/*<Twitter href={'https://twitter.com/ChargeDeFi'} />*/}
                        {/*<Telegram href={'https://t.me/chargedefi'} />*/}
                        {/*<Discord href={'https://discord.gg/TDFHtWj7b5'} />*/}
                        {/*<Medium href={'https://chargedefi.medium.com'} />*/}
                        {/*<Gitbook href={'https://docs.chargedefi.fi/'} />*/}
                        {/*<Whitepaper href={'/charge_whitepaper.pdf'} />*/}
                        {/*<Certik href={'https://www.certik.com/projects/chargedefi'} />*/}
                </HStack>
        </StyledNav>
    );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  height: 80%;
`;


const FloatingButtonsPlacement = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  text-align: right;
`;

const StyledSpan = styled.span`
  font-weight: 700;
  text-decoration: none;
  font-size: clamp(1.25rem, 0.9vw, 2rem);
  color: ${(props) => props.theme.color.grey.primary};
  padding-left: 1rem;
  padding-right: ${(props) => props.theme.spacing[5]}px;
`;

export default Nav;
