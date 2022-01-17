import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import { ChakraProvider } from '@chakra-ui/react'
import {theme} from "./theme/theme";
import bsc from "@binance-chain/bsc-use-wallet";
import {ModalProvider} from "@pancakeswap-libs/uikit";


const rpcUrl = "https://bsc-dataseed.binance.org/"
const chainId = 56;

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <bsc.UseWalletProvider chainId={chainId} connectors={{walletconnect: {rpcUrl}, bsc}}>
            <ModalProvider >
                <App />
            </ModalProvider>
        </bsc.UseWalletProvider>
    </ChakraProvider>,
    document.getElementById('root'
    )
)
