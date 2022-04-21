
// import BSC from './assets/img/svg/chains/bsc.svg';
// import FTM from './assets/img/svg/chains/ftm.svg';

import {getSavedChain} from "./service/chain_cookie.service";

export const CHAIN_ID_BSC = { mainnet: 56, testnet: 97 };
export const CHAIN_ID_FTM = { mainnet: 250, testnet: 4002 };
export const CHAIN_IDS = [CHAIN_ID_BSC, CHAIN_ID_FTM];

export const Chain = {
    BSC: CHAIN_ID_BSC,
    Fantom: CHAIN_ID_FTM,
};

export const chains: { [chain: string]: { [env: string]: any } } = {
    BSC: {
        mainnet: {
            chainId: CHAIN_ID_BSC.mainnet,
            shortName: 'BSC',
            name: 'Binance Smart Chain',
            multicall: "0x41263cBA59EB80dC200F3E2544eda4ed6A90E76C",
            icon: "",
            scanUrl: 'https://bscscan.com',
            defaultProvider: 'https://bsc-dataseed.binance.org/',
            deployments: require('./common/deployments/bsc/mainnet.json'),
            blockExplorerUrl: 'https://bscscan.com/block',
            chargeBoardroom: '0x53D55291c12EF31b3f986102933177815DB72b3A',
            staticLpBoardroom: '0x7692bCB5F646abcdFA436658dC02d075856ac33C',
            bankDefinitions: {},
            poolDefinitions: {},
            doubleEarnBoardrooms: [
                {
                    name: 'Static_LP',
                    address: '0x69758726b04e527238B261ab00236AFE9F34929D',
                },
                {
                    name: 'Charge_LP',
                    address: '0xB73b4eeb4c4912C1d1869219A22660eB478B57eA',
                },
            ],
            externalTokens: {
                BUSD: ['0xe9e7cea3dedca5984780bafc599bd69add087d56', 18],
                Static_LP: ['0x69758726b04e527238B261ab00236AFE9F34929D', 18],
                Charge_LP: ['0xB73b4eeb4c4912C1d1869219A22660eB478B57eA', 18],
                WBNB: ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18],
                BTD: ['0xd1102332a213e21faf78b69c03572031f3552c33', 18],
                BTS: ['0xc2e1acef50ae55661855e8dcb72adb182a3cc259', 18],
                BTB: ['0x6019BFf77503B804F186AaE8aAf947761a46bCEA', 18],
                CAKE: ['0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', 18],
            },
        },
        testnet: {
            chainId: CHAIN_ID_BSC.testnet,
            shortName: 'BSC',
            name: 'Binance Smart Chain',
            icon: "",
            scanUrl: 'https://testnet.bscscan.com/',
            defaultProvider: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            deployments: require('./common/deployments/bsc/testnet.json'),
            blockExplorerUrl: 'https://testnet.bscscan.com/block',
            chargeBoardroom: '0x28c5d224Ec92cc18602d65164062e37D5F3354d7',
            staticLpBoardroom: '0xbdEC80355e8b6834a8bf461A7637eDe54f440e75',
            bankDefinitions: {},
            poolDefinitions: {},
            doubleEarnBoardrooms: [
                {
                    name: 'Static_LP',
                    address: '0x07B7FC6277FfeF90d8Bf836b670C30c76bEAE67a',
                },
                {
                    name: 'Charge_LP',
                    address: '0x4b79977D8F53105D2681Df4AB82831bBbd024718',
                },
            ],
            externalTokens: {
                BUSD: ['0x2CB113f57Aa3637e9E4672fEEF18642B15974530', 18],
                Static_LP: ['0x07B7FC6277FfeF90d8Bf836b670C30c76bEAE67a', 18],
                Charge_LP: ['0x4b79977D8F53105D2681Df4AB82831bBbd024718', 18],
                WBNB: ['0x1a555CF57ee9BC6176bB649e6c8D815355999214', 18],
                BTD: ['0xb56F28f82AEf76433fbaE30F67087249E31c3f90', 18],
                BTS: ['0xEB7f3d040eE16a5af4522d64203144E8dcA763d9', 18],
                BTB: ['0x06681e525d63c9cB0C16CC36841704bFF49D48Df', 18],
                CAKE: ['0x5b40A6b7b5842140A560716861eb91Af6a312D0B', 18],
            },
        },
    },
    FTM: {
        mainnet: {
            chainId: CHAIN_ID_FTM.mainnet,
            shortName: 'FTM',
            name: 'Fantom',
            multicall: "0xD98e3dBE5950Ca8Ce5a4b59630a5652110403E5c",
            icon: "",
            scanUrl: 'https://ftmscan.com',
            defaultProvider: 'https://rpc.ftm.tools/',
            deployments: require('./common/deployments/ftm/prod.json'),
            blockExplorerUrl: 'https://ftmscan.com/block',
            // TO CHANGE
            bankDefinitions: {},
            poolDefinitions: {},
            chargeBoardroom: '0x7E8eCc1671E01788eC2Fe9090c71e54Cb6Ad0110',
            staticLpBoardroom: '0xf6dfeE99a7F2cE4431B641d1154b6c1B192a839C',

            doubleEarnBoardrooms: [
                {
                    name: 'Static_LP',
                    address: '0x34011465A924C554220E768dcB27d59124Ce3Fa6',
                },
                {
                    name: 'Charge_LP',
                    address: '0x5d2e8a24028F5749eC58b053B38D5aaFa57c2691',
                },
            ],
            externalTokens: {
                USDC: ['0x04068da6c83afcfa0e13ba15a6696662335d5b75', 6],
                Static_LP: ['0x34011465A924C554220E768dcB27d59124Ce3Fa6', 18],
                Charge_LP: ['0x5d2e8a24028F5749eC58b053B38D5aaFa57c2691', 18],
                WFTM: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
                FTM: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
            },
            ////////////////////////
        },
        testnet: {
            chainId: CHAIN_ID_FTM.mainnet,
            shortName: 'FTM',
            name: 'Fantom',
            multicall: "0xD98e3dBE5950Ca8Ce5a4b59630a5652110403E5c",
            icon: "",
            scanUrl: 'https://ftmscan.com',
            defaultProvider: 'https://rpc.ftm.tools/',
            deployments: require('./common/deployments/ftm/dev.json'),
            blockExplorerUrl: 'https://ftmscan.com/block',
            // TO CHANGE
            bankDefinitions: {},
            poolDefinitions: {},
            chargeBoardroom: '0x7bf505faF7d74D9E773cA9E13fDBBb59345D5957',
            staticLpBoardroom: '0x8573D0022a3f7f0615926F5393A6EB38B3E70b50',

            doubleEarnBoardrooms: [
                {
                    name: 'Static_LP',
                    address: '0xBBAC5dc1e0310289Bc25EA54b04153e60E352f26',
                },
                {
                    name: 'Charge_LP',
                    address: '0xa4603EeB120D995152982A8666e64BC87f48f4B9',
                },
            ],
            externalTokens: {
                USDC: ['0x84Dc641996449f321AB008426A4f644a71af9791', 6],
                Static_LP: ['0xBBAC5dc1e0310289Bc25EA54b04153e60E352f26', 18],
                Charge_LP: ['0xa4603EeB120D995152982A8666e64BC87f48f4B9', 18],
                WFTM: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
                FTM: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
            },
        },
    },
};

// default to BSC testnet if no ENV is found

export const defaultChain =
    chains[getSavedChain() || 'BSC'][
    process.env.REACT_APP_ENVIRONMENT || 'mainnet'];

export const currentEnvironmentChains = {
    BSC: { ...chains.BSC[process.env.REACT_APP_ENVIRONMENT || 'testnet'] },
    FTM: { ...chains.FTM[process.env.REACT_APP_ENVIRONMENT || 'testnet'] },
};

export const priceStableMultiplier = Math.pow(
    10,
    18 - (process.env.REACT_APP_CHAIN == 'FTM' ? 6 : 18)
);

export const lpPair = defaultChain.shortName === "BSC" ? "Static-BUSD" : "Static-USDC"
