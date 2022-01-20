import { Flex, Heading, Stat, Text, Box,  useColorModeValue as mode, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import WalletTokens from "./WalletTokens/WalletTokens";


const Wallet = () => {


    return (
        <Flex px={5} py={5} flexDir="column">
            <WalletTokens/>
        </Flex>
    );
};

export default Wallet;
