import {Flex, Heading, useColorMode} from '@chakra-ui/react'
import "@fontsource/metropolis"
import {useEffect, useMemo, useState} from "react";
import {WalletAddressContext} from './common/contexts/WalletAddressContext';
import {TokenPricesContext} from "./common/contexts/TokenPricesContext";
import TopNavBar from "./common/components/TopNavBar/TopNavBar";
import {useColorModeValue as mode } from "@chakra-ui/react";
import React from 'react';
import "./common/assets/main.css"
import {busdAddress, CHARGE_LP_ADDRESS, CHARGE_ADDRESS, STATIC_LP_ADDRESS, staticAddress} from "./common/helpers/consts";
import chargeABI from "./common/contracts/charge_abi.json"
import lpABI from "./pages/overview/contracts/lp-token-boardroom.json"
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {default as OverviewMain} from "./pages/overview/Main"
import {default as EarningsMain} from "./pages/earnings/Main"
import {ThemeProvider} from "styled-components";
import {ModalProvider} from "@pancakeswap-libs/uikit";
import {dark, light, PancakeTheme} from "@pancakeswap-libs/uikit";
import { AggregateWalletsContext } from './common/contexts/AggregateWalletsContext';


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

function App() {
    const { colorMode } = useColorMode();

    const [walletAddress, setWalletAddress] = useState<string>();
    const providedWallet = useMemo<any>(() => ({walletAddress, setWalletAddress}), [walletAddress, setWalletAddress])

    const [aggregateWallets, setAggregateWallets] = useState<Array<string>>();
    const providedAggregateWallets = useMemo<any>(() => ({aggregateWallets, setAggregateWallets}), [aggregateWallets, setAggregateWallets])

    const [tokens, setTokens] = useState<any>({})
    const providedTokens = useMemo<any>(() => ({tokens, setTokens}), [tokens, setTokens])


    const queryClient = new QueryClient()

    const getTokenPrices = async () => {
        const busdToken = new web3.eth.Contract(chargeABI, busdAddress, )
        const staticToken = new web3.eth.Contract(chargeABI, staticAddress, )
        const chargeToken = new web3.eth.Contract(chargeABI, CHARGE_ADDRESS, )
        const staticLpToken = new web3.eth.Contract(lpABI, STATIC_LP_ADDRESS, )
        const chargeLpToken = new web3.eth.Contract(lpABI, CHARGE_LP_ADDRESS, )

        // Regular coin prices
        const chargePrice = await busdToken.methods.balanceOf(CHARGE_LP_ADDRESS).call() / await chargeToken.methods.balanceOf(CHARGE_LP_ADDRESS).call()
        const staticPrice = await busdToken.methods.balanceOf(STATIC_LP_ADDRESS).call() / await staticToken.methods.balanceOf(STATIC_LP_ADDRESS).call()
        const pulsePrice = staticPrice
        const busdPrice = 1

        // Static LP token calculations
        const tokensInPool0 = (await staticToken.methods.balanceOf(STATIC_LP_ADDRESS).call()) / 1e18
        const busdInPool0 = (await busdToken.methods.balanceOf(STATIC_LP_ADDRESS).call()) / 1e18;
        const totalLPtokens0 = (await staticLpToken.methods.totalSupply().call()) / 1e18;

        const tokenPerLP0 = tokensInPool0 / totalLPtokens0;
        const busdPerLP0 = busdInPool0 / totalLPtokens0;

        const staticLp = tokenPerLP0 * staticPrice + busdPerLP0 * busdPrice;

        // Charge LP token calculations
        const tokensInPool1 = (await chargeToken.methods.balanceOf(CHARGE_LP_ADDRESS).call()) / 1e18
        const busdInPool1 = (await busdToken.methods.balanceOf(CHARGE_LP_ADDRESS).call()) / 1e18;
        const totalLPtokens1 = (await chargeLpToken.methods.totalSupply().call()) / 1e18;

        const tokenPerLP1 = tokensInPool1 / totalLPtokens1;
        const busdPerLP1 = busdInPool1 / totalLPtokens1;

        const chargeLp = tokenPerLP1 * chargePrice + busdPerLP1 * busdPrice;

        setTokens(
            {
                chargePrice: parseFloat(chargePrice.toFixed(3)),
                staticPrice: parseFloat(staticPrice.toFixed(3)),
                pulsePrice: parseFloat(pulsePrice.toFixed(3)),
                staticLp: parseFloat(staticLp.toFixed(3)),
                chargeLp: parseFloat(chargeLp.toFixed(3))
            })
    }

    useEffect(() => {
        getTokenPrices()
        setInterval(() => getTokenPrices(), 300000)
    }, [])

    return (
        <ThemeProvider theme={colorMode === "dark" ? dark as PancakeTheme : light as PancakeTheme}>
            <ModalProvider >
                <QueryClientProvider client={queryClient}>
                    <TokenPricesContext.Provider value={providedTokens}>
                        <WalletAddressContext.Provider value={providedWallet}>
                            <AggregateWalletsContext.Provider value={providedAggregateWallets}>
                            <Flex w="100vw" h="100vh" flexDir="column" px={{xl:7, md: 5}} py={4} overflowX="hidden"
                                  bg={mode("#F5F5F5", "gray.800")}>
                                <Router>
                                    {tokens && <TopNavBar/>}
                                    <Routes>
                                        <Route path="/" element={<OverviewMain/>}/>
                                        <Route path="/overview" element={<OverviewMain/>}/>
                                        <Route path="/earnings" element={<EarningsMain/>}/>
                                    </Routes>
                                </Router>
                            </Flex>
                            </AggregateWalletsContext.Provider>
                        </WalletAddressContext.Provider>
                    </TokenPricesContext.Provider>
                </QueryClientProvider>
            </ModalProvider>
        </ThemeProvider>
    )
}
export default App
