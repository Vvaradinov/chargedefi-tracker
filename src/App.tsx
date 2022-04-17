import {
    Box,
    Button,
    Flex,
    Popover,
    PopoverContent,
    PopoverTrigger,
    useColorMode,
    VStack
} from '@chakra-ui/react'
import "@fontsource/metropolis"
import {useEffect, useMemo, useState} from "react";
import {WalletAddressContext} from './common/contexts/WalletAddressContext';
import {TokenPricesContext} from "./common/contexts/TokenPricesContext";
import TopNavBar from "./common/components/TopNavBar/TopNavBar";
import {useColorModeValue as mode } from "@chakra-ui/react";
import React from 'react';
import "./common/assets/main.css"
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {default as OverviewMain} from "./pages/overview/Main"
import {default as EarningsMain} from "./pages/earnings/Main"
import {default as ProtocolMain} from "./pages/protocol/Main"
import {ThemeProvider} from "styled-components";
import {ModalProvider} from "@pancakeswap-libs/uikit";
import {dark, light, PancakeTheme} from "@pancakeswap-libs/uikit";
import {getLibrary} from "./common/utils/web3React";
import {useWeb3React, Web3ReactProvider} from "@web3-react/core";
import {getSavedChain, setChain} from "./service/chain_cookie.service";
import {ReactComponent as Bnb} from "./common/assets/tokens/bnb.svg"
import {ReactComponent as Ftm} from "./common/assets/tokens/fantom.svg"
import {useTokenPrices} from "./common/hooks/useTokenPrices";


function App() {
    const { colorMode } = useColorMode();
    const queryClient = new QueryClient()

    const [walletAddress, setWalletAddress] = useState<any>({})
    const providedWalletAddress = useMemo<any>(() => ({walletAddress, setWalletAddress}), [walletAddress, setWalletAddress])

    const { tokens, providedTokens } = useTokenPrices()

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <WalletAddressContext.Provider value={providedWalletAddress}>
                <ThemeProvider theme={colorMode === "dark" ? dark as PancakeTheme : light as PancakeTheme}>
                    <ModalProvider >
                        <QueryClientProvider client={queryClient}>
                            <TokenPricesContext.Provider value={providedTokens}>
                                <Flex w="100vw" h="100vh" flexDir="column" px={{xl:7, md: 5}} py={4} overflowX="hidden"
                                      bg={mode("#F5F5F5", "gray.800")} >
                                    <Router>
                                        {tokens && <TopNavBar/>}
                                        <Routes>
                                            <Route path="/" element={<OverviewMain/>}/>
                                            <Route path="/overview" element={<OverviewMain/>}/>
                                            <Route path="/earnings" element={<EarningsMain/>}/>
                                            <Route path="/protocol" element={<ProtocolMain/>}/>
                                        </Routes>
                                    </Router>
                                    <Box rounde="lg" position="fixed" bottom='15px' right={['16px', '24px']}>
                                        <Popover isLazy>
                                            <PopoverTrigger>

                                                {getSavedChain() === "BSC" || getSavedChain() === undefined
                                                    ? <Button size="lg" colorScheme="yellow" variant="solid" leftIcon={<Bnb  width="35px" height="35px"/>}>BNB Chain</Button>
                                                    : <Button size="lg" colorScheme="blue" variant="solid" leftIcon={<Ftm  width="35px" height="35px"/>}>Fantom</Button>
                                                }

                                            </PopoverTrigger>
                                            <PopoverContent w='max' bg={mode("#FAFAFA", "gray.800")} rounded="lg" px={2} py={4}>
                                                <VStack spacing={3} mx={2}>
                                                    <Button size="lg" colorScheme="yellow" variant="outline" leftIcon={<Bnb  width="35px" height="35px"/>} onClick={() => setChain("BSC")}>BNB Chain</Button>
                                                    <Button size="lg" colorScheme="blue" variant="outline" leftIcon={<Ftm  width="35px" height="35px"/>} onClick={() => setChain("FTM")}>Fantom</Button>
                                                </VStack>
                                            </PopoverContent>
                                        </Popover>
                                    </Box>
                                </Flex>
                            </TokenPricesContext.Provider>
                        </QueryClientProvider>
                </ModalProvider>
            </ThemeProvider>
            </WalletAddressContext.Provider>
        </Web3ReactProvider>
    )
}
export default App
