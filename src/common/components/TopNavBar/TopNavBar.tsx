import React, {useEffect} from 'react';
import {
    Button,
    Flex,
    Heading,
    Spacer,
    Text,
    useDisclosure,
    Image,
    useMediaQuery,
    Box,
    HStack,
    Popover, PopoverTrigger, PopoverContent, VStack
} from "@chakra-ui/react";
import {formatWalletAddr} from "../../helpers/formating";
import {useColorModeValue as mode} from "@chakra-ui/react";
import {useWalletProvider} from "../../hooks/useWalletProvider";
import { ColorModeSwitcher } from '../ColorModeSwitcher/ColorModeSwitcher';
import { Skeleton } from "@chakra-ui/react"
import {useTokenPrices} from "../../contexts/TokenPricesContext";
import {getTokenUrl} from "../../helpers/util";

import {NavContent} from "../Navbar/NavContent";
import "../../assets/main.css"


const TopNavBar = () => {

    const {tokens} = useTokenPrices()!
    const { staticPrice, chargePrice, staticLp, chargeLp} = tokens
    const [isMobile] = useMediaQuery('(max-width: 1400px)')

    const { wallet, isEmpty, walletAddress, accessType, onPresentAccountModal, onPresentConnectModal, logoutWallet, } = useWalletProvider()


    const tokenView = <HStack spacing={3} experimental_spaceY={isMobile ? 2 : 0} flexWrap={isMobile ? "wrap": "nowrap"}
                              mt={isMobile ? 5 : 0} justifyContent={isMobile ? "center" : "none"}>
        <Flex mx={3}>
            <Image mx={2} my="auto" src={getTokenUrl("static")} width="35px" height="35px"/>
            <Skeleton isLoaded={staticPrice > 0}  my="auto">
                <Text my="auto"  fontWeight="bold">${staticPrice}</Text>
            </Skeleton>
        </Flex>
        <Flex>
            <Image mx={2} my="auto" src={getTokenUrl("charge")} width="35px" height="35px"/>
            <Skeleton isLoaded={chargePrice > 0}  my="auto">
                <Text my="auto"  fontWeight="bold">${chargePrice}</Text>
            </Skeleton>
        </Flex>
        <Flex>
            <Image mx={2} my="auto" src={getTokenUrl("static-busd")} width="58px" height="35px"/>
            <Skeleton isLoaded={chargePrice > 0}  my="auto">
                <Text my="auto"  fontWeight="bold">${staticLp}</Text>
            </Skeleton>
        </Flex>
        <Flex>
            <Image mx={2} my="auto" src={getTokenUrl("charge-busd")} width="58px" height="35px"/>
            <Skeleton isLoaded={chargePrice > 0}  my="auto">
                <Text my="auto"  fontWeight="bold">${chargeLp}</Text>
            </Skeleton>
        </Flex>
    </HStack>

    if(!tokens){
        return null
    }

    return (
        <Box>
            <Flex>
                {!isMobile && <Image src={getTokenUrl("charge")} w="50px" h="50px" my="auto" mx={4}/>}
                <NavContent.Desktop display={{ base: 'none', md: 'flex' }} />
                <NavContent.Mobile display={{ base: 'flex', md: 'none' }} />
                <Spacer/>
                {!isMobile && tokenView}
                <ColorModeSwitcher my="auto" mx={5}/>
                <Button
                    bg={mode('white', 'gray.700')}
                    my="auto" w="150px" border={mode("2px solid rgb(0, 0, 0)", "2px solid white")}
                    onClick={!isEmpty ? logoutWallet : !isEmpty ? onPresentAccountModal : onPresentConnectModal}>
                    {!isEmpty ? formatWalletAddr(walletAddress) : "Connect Wallet"}
                </Button>
            </Flex>
            {isMobile && tokenView}
        </Box>
    );
};

export default TopNavBar;
