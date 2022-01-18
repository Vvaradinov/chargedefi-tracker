import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import { ChakraProvider } from '@chakra-ui/react'
import {theme} from "./theme/theme";
import * as bsc from "@binance-chain/bsc-use-wallet";


const rpcUrl = "https://bsc-dataseed.binance.org/"
const chainId = 56;


const appElement =  document.getElementById('root')

ReactDOM.render(
    <bsc.UseWalletProvider chainId={chainId} connectors={{walletconnect: {rpcUrl}, bsc}}>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </bsc.UseWalletProvider>, appElement
)
