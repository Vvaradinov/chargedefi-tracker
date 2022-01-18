import {VStack, Heading, Input, Text, Flex, Button, useToast, InputLeftElement, InputGroup} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {useWalletAddress} from "../../contexts/WalletAddressContext";
import {isAddress} from "../../helpers/web3-helpers";
import {IoWalletOutline} from "@react-icons/all-files/io5/IoWalletOutline";
import Cookies from 'universal-cookie';
import {useMutation} from "react-query";
import * as api from "../../api/api";
import {useColorModeValue as mode} from "@chakra-ui/react";
import {formatWalletAddr} from "../../helpers/formating";
import {useWalletProvider} from "../../hooks/useWalletProvider";

const cookies = new Cookies();

const ConnectDapp = () => {

    const { setWalletAddress } = useWalletAddress()!
    const [addr, setAddr] = useState<string>()
    const toast = useToast()
    const postWalletAddress = useMutation("postAddress", api.postWalletAddress)


    useEffect(() => {
        if (cookies.get('walletAddress') !== undefined) {
            setWalletAddress(cookies.get('walletAddress'));
        }
    },[])

    const onSubmit = () => {
        if(isAddress(addr!)){
            setWalletAddress(addr)
            postWalletAddress.mutate(addr!)
            cookies.set('accessType', 2, { path: '/' });
            cookies.set('walletAddress', addr, {path: '/'})
        } else {
            toast({
                title: "Invalid address",
                description: "Please provide a wallet BSC address",
                status: "error",
                duration: 6000,
                isClosable: true
            })
        }
    }

    const { walletAddress, onPresentAccountModal, onPresentConnectModal } = useWalletProvider()


    return (
        <VStack my="auto"  textAlign="center" spacing="24px">
            <Heading >Connect wallet to get started</Heading>
            <Button
                bg={mode('white', 'gray.700')}
                my="auto" w="300px" fontSize="24px" border={mode("2px solid rgb(0, 0, 0)", "2px solid white")}
                onClick={walletAddress ? onPresentAccountModal : onPresentConnectModal}>
                {walletAddress ? formatWalletAddr(walletAddress) : "Connect Wallet"}
            </Button>
            <Text  fontSize="24px">Or</Text>
            <Heading >Paste wallet address</Heading>
            <Flex w={{base: "100%", lg: "60%"}}>
                <InputGroup size="lg">
                    <InputLeftElement
                        my="auto"
                        pointerEvents='none'
                        children={<IoWalletOutline size="25px"  />}
                    />
                    <Input placeholder="Wallet address..." size="lg" onChange={e => setAddr(e.target.value)}/>
                </InputGroup>
                <Button mx={2} size="lg" bg="primaryDark" onClick={onSubmit} isDisabled={!addr}>Submit</Button>
            </Flex>
        </VStack>
    );
};

export default ConnectDapp;
