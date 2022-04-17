import {useCallback, useEffect} from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { NoBscProviderError } from '@binance-chain/bsc-connector';
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import {
    ConnectorNames,
    connectorLocalStorageKey,
} from '@pancakeswap-libs/uikit';
import { connectorsByName } from '../utils/web3React';
import { useToast } from '@chakra-ui/react';
import {setupNetwork} from "../utils/wallet";

const useAuth = () => {
    const toast = useToast()
    const { activate, deactivate, library, account } = useWeb3React();
    // const addPopup = useAddPopup();

    const login = useCallback((connectorID: ConnectorNames) => {

        const connector = connectorsByName[connectorID];
        if (connector) {
            activate(connector, async (error: Error) => {
                if (error instanceof UnsupportedChainIdError) {
                    const hasSetup = await setupNetwork();
                    if (hasSetup) {
                        activate(connector);
                    }
                } else {
                    window.localStorage.removeItem(connectorLocalStorageKey);
                    if (
                        error instanceof NoEthereumProviderError ||
                        error instanceof NoBscProviderError
                    ) {
                        console.log("ERROR")
                        // addPopup({
                        //     error: {
                        //         title: 'Provider Error',
                        //         message: 'No provider was found',
                        //     },
                        // });
                    } else if (
                        error instanceof UserRejectedRequestErrorInjected ||
                        error instanceof UserRejectedRequestErrorWalletConnect
                    ) {
                        if (connector instanceof WalletConnectConnector) {
                            console.log(connector)
                            const walletConnector = connector as WalletConnectConnector;
                            // @ts-ignore
                            walletConnector.walletConnectProvider = null;
                        }
                        console.log("ERROR 1")

                        // addPopup({
                        //     error: {
                        //         title: 'Authorization Error',
                        //         message: 'Please authorize to access your account',
                        //     },
                        // });
                    } else {
                        console.log("ERROR 2")

                        // addPopup({
                        //     error: {
                        //         title: error.name,
                        //         message: error.message,
                        //     },
                        // });
                    }
                }

            });
        } else {
            console.log("ERROR 3")

            // addPopup({
            //     error: {
            //         title: "Can't find the connector",
            //         message: 'The connector config is wrong',
            //     },
            // });
        }
    }, []);

    // console.log(library)

    return { login, logout: deactivate };
};

export default useAuth;
