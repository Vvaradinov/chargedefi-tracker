import { useEffect, useState, useRef } from 'react'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import {getWeb3NoAccount} from "../utils/web3";

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
const useWeb3 = () => {
    const { library } = useWeb3React()
    const proxy = library ? library : library
    const refEth = useRef(proxy)
    const [web3, setWeb3] = useState(proxy ? new Web3(proxy) : getWeb3NoAccount())

    useEffect(() => {
        if (proxy !== refEth.current) {
            setWeb3(proxy ? new Web3(proxy) : getWeb3NoAccount())
            refEth.current = proxy
        }
    }, [library, proxy])
    return web3
}

export default useWeb3
