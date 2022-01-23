import {VStack, Heading, Input, Text, Flex, Button, useToast, InputLeftElement, InputGroup} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {IoWalletOutline} from "@react-icons/all-files/io5/IoWalletOutline";
import {useColorModeValue as mode} from "@chakra-ui/react";
import {formatWalletAddr} from "../../helpers/formating";
import {useWalletProvider} from "../../hooks/useWalletProvider";
import {useConnectDapp} from "../../hooks/useConnectDapp";


const ConnectDapp = () => {

    const { walletAddress, onPresentAccountModal, onPresentConnectModal } = useWalletProvider()
    const { onAddNewWallet, onUpdateWallets, onRemoveWallet, onSubmit, wallets, areWallets } = useConnectDapp()

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
            <Flex w={{base: "100%", lg: "60%"}} flexDir="column">
                {wallets.map((wallet:string, key:number) =>
                    <Flex>
                        <InputGroup size="lg" my={2}>
                            <InputLeftElement
                                my="auto"
                                pointerEvents='none'
                                children={<IoWalletOutline size="25px"  />}
                            />
                            <Input placeholder="Wallet address..." size="lg" value={wallet} onChange={e => onUpdateWallets(e.target.value, key)}/>
                        </InputGroup>
                        {key > 0 && <Button size="lg" colorScheme="red" my="auto" mx={2} onClick={() => onRemoveWallet(key)}>Delete</Button> }
                    </Flex>
                )}

            </Flex>
            <Flex>
                <Button mx={2} size="lg" colorScheme="blue" onClick={onAddNewWallet}>New Wallet</Button>
                <Button mx={2} size="lg" bg={mode('white', 'gray.700')}
                        my="auto" border={mode("2px solid rgb(0, 0, 0)", "2px solid white")}
                        onClick={onSubmit} isDisabled={!areWallets}>Submit</Button>
            </Flex>
        </VStack>
    );
};

export default ConnectDapp;
