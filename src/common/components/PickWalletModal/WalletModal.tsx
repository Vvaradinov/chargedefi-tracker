import { Modal, ModalHeader, ModalContent, ModalOverlay, useColorModeValue as mode,
    ModalBody, ModalCloseButton, ModalFooter, List, ListItem, Text, Image, Box, Flex, Button } from '@chakra-ui/react';
import wallets from "./wallets.json"
import React from 'react';
import {useWalletAddress} from "../../contexts/WalletAddressContext";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

type Props = {
    isOpen: boolean
    onClose: () => void
    onSelectWallet: (providerName: string) => void
}

const WalletModal = ({isOpen, onClose, onSelectWallet}: Props) => {

    const { walletAddress, setWalletAddress } = useWalletAddress()!
    const logout = () => {
        setWalletAddress(undefined)
        cookies.remove('addr');

        localStorage.removeItem("wallet")
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={walletAddress ? "lg": "sm"} closeOnOverlayClick={false}>
            <ModalOverlay />
            {!walletAddress &&
            <ModalContent my="auto">
                <ModalHeader>Connect Wallet</ModalHeader>
                <ModalCloseButton mt={2}/>
                <ModalBody>
                    <List spacing={2}>
                        {wallets.map((i:any, key:number) => {
                            return <ListItem key={i.name}  onClick={() => onSelectWallet(i.name)} className="hovEl">
                                <Flex justify="space-between" px={5}>
                                    <Text my="auto" textColor={mode("black", "white")}>{i.name}</Text>
                                    <Image my="auto" src={i.icon} h="40px" w="40px"/>
                                </Flex>
                            </ListItem>
                        })}
                    </List>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
            }
            {walletAddress &&
            <ModalContent my="auto">
                <ModalHeader>Your Wallet</ModalHeader>
                <ModalCloseButton mt={2}/>
                <ModalBody>
                    <Flex flexDir="column">
                        <Text>{walletAddress}</Text>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={logout}>Logout</Button>
                </ModalFooter>
            </ModalContent>
            }
        </Modal>
    );
};

export default WalletModal;
