import {
    Badge,
    Flex,
    Heading,
    Img,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Tag,
    useMediaQuery
} from '@chakra-ui/react';
import React from 'react';
import {getTokenUrl} from "../../common/helpers/util";
import BoardRoomLpTable from "./components/boardroom/BoardRoomLpTable";
import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import BoardRoomChargeTable from "./components/boardroom/BoardRoomChargeTable";
import FarmChargeTable from "./components/farms/FarmChargeTable";
import FarmStaticTable from "./components/farms/FarmStaticTable";
import ConnectDapp from "../../common/components/ConnectDapp/ConnectDapp";
import Footer from "../../common/components/Footer/Footer";
import {useBoardroomChargeEarnings} from "./components/boardroom/hooks/useBoardroomChargeEarnings";
import {useBoardroomLpEarnings} from "./components/boardroom/hooks/useBoardroomLpEarnings";
import {useFarmsChargeEarnings} from "./components/farms/hooks/useFarmsChargeEarnings";
import {useFarmsStaticEarnings} from "./components/farms/hooks/useFarmsStaticEarnings";
import {useWeb3React} from "@web3-react/core";
import {lpPair} from "../../config";

const Main = () => {

    const {account } = useWeb3React()!
    const { walletAddress} = useWalletAddress()!
    const isEmpty = Object.keys(walletAddress).length === 0;
    const { data: brChargeData, isLoading: brChargeLoading, isError: brChargeError} = useBoardroomChargeEarnings()
    const { data: brLPData, isLoading: brLPLoading, isError: brLPError} = useBoardroomLpEarnings()
    const { data: farmChargeData, isLoading: farmChargeLoading, isError: farmChargeError} = useFarmsChargeEarnings()
    const { data: farmStaticData, isLoading: farmStaticLoading, isError: farmStaticError} = useFarmsStaticEarnings()

    const [isMobile] = useMediaQuery('(max-width: 860px)')

    if(isEmpty){
        return <ConnectDapp/>
    }
    return (
        <Flex flexDir="column" py={5} h="100%">
            <Tabs isFitted w="100%">
                <TabList w="100%" flexWrap="wrap" flexDir={isMobile ? "column": "row"} >
                    <Tab  _focus={{outline: "none"}} px={3} >
                        <Img src={getTokenUrl("static-busd")} w="50px" h="30px"/>
                        <Text px={2}>{lpPair} Boardroom</Text>
                        <Tag borderRadius='full' textColor="white" colorScheme="blue">{brLPData && brLPData.length > 0 ? brLPData.length : "Empty" }</Tag>
                    </Tab>
                    <Tab _focus={{outline: "none"}} px={3}>
                        <Img src={getTokenUrl("charge")} w="30px" h="30px"/>
                        <Text px={2}>Charge Boardroom</Text>
                        <Tag borderRadius='full' textColor="white" colorScheme="blue">{brChargeData && brChargeData.length > 0 ? brChargeData.length : "Empty" }</Tag>

                    </Tab>
                    <Tab  _focus={{outline: "none"}} px={3}>
                        <Img src={getTokenUrl("charge-busd")} w="50px" h="30px"/>
                        <Text px={2}>Charge-BUSD Farm</Text>
                        <Tag borderRadius='full' textColor="white" colorScheme="blue">{farmChargeData && farmChargeData.length > 0 ? farmChargeData.length : "Empty" }</Tag>
                    </Tab>
                    <Tab  _focus={{outline: "none"}} px={3}>
                        <Img src={getTokenUrl("static-busd")} w="50px" h="30px"/>
                        <Text px={2}>{lpPair} Farm</Text>
                        <Tag borderRadius='full' textColor="white" colorScheme="blue">{farmStaticData && farmStaticData.length > 0 ? farmStaticData.length : "Empty" }</Tag>
                    </Tab>
                </TabList>

                <TabPanels overflow="auto">
                    <TabPanel>
                        <BoardRoomLpTable data={brLPData} isLoading={brLPLoading} isError={brLPError}/>
                    </TabPanel>
                    <TabPanel>
                        <BoardRoomChargeTable data={brChargeData} isLoading={brChargeLoading} isError={brChargeError}/>
                    </TabPanel>
                    <TabPanel>
                        <FarmChargeTable data={farmChargeData} isLoading={farmChargeLoading} isError={farmChargeError} />
                    </TabPanel>
                    <TabPanel>
                        <FarmStaticTable data={farmStaticData} isLoading={farmStaticLoading} isError={farmStaticError}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Spacer/>
            <Footer/>
        </Flex>
    );
};

export default Main;
