import React from 'react';
import {
    Flex,
    Icon,
    Img,
    Skeleton,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    Text,
    useMediaQuery
} from "@chakra-ui/react";
import {getTokenUrl} from "../../common/helpers/util";
import Footer from "../../common/components/Footer/Footer";
import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import ConnectDapp from "../../common/components/ConnectDapp/ConnectDapp";
import {FaBurn} from "@react-icons/all-files/fa/FaBurn";
import {GrMoney} from "@react-icons/all-files/gr/GrMoney";
import {AiOutlineInfoCircle} from "@react-icons/all-files/ai/AiOutlineInfoCircle";
import {FaRegMoneyBillAlt} from "@react-icons/all-files/fa/FaRegMoneyBillAlt";
import GeneralProtocolTable from "./general/GeneralProtocolTable";
import ExpansionTable from "./expansion/ExpansionTable";
import RebaseTable from "./rebase/RebaseTable";
import {useQuery} from "react-query";
import * as api from "./api"

const Main = () => {
    const { walletAddress } = useWalletAddress()!
    const [isMobile] = useMediaQuery('(max-width: 860px)')

    const {data, isLoading, isError} = useQuery("getProtocolStats", () => api.getFarmsEarnings())

    console.log(data)



    if(!walletAddress){
        return <ConnectDapp/>
    }

    return (
        <Flex flexDir="column" py={5} h="100%">
            <Tabs isFitted w="100%">
                <TabList w="100%" flexWrap="wrap" flexDir={isMobile ? "column": "row"} >
                    <Tab  _focus={{outline: "none"}} px={3} >
                        <Icon as={AiOutlineInfoCircle} w="30px" h="30px"/>
                        <Text px={2}>General</Text>
                        <Tag borderRadius='full' textColor="white" colorScheme="blue">{data && data.protocol_stats.length > 0 ? data.protocol_stats.length : "Empty" }</Tag>
                    </Tab>
                    <Tab _focus={{outline: "none"}} px={3}>
                        <Icon as={FaRegMoneyBillAlt} w="30px" h="30px"/>
                        <Text px={2}>Expansion</Text>
                        <Tag borderRadius='full' textColor="white" colorScheme="blue">{data && data.expansion_stats.length > 0 ? data.protocol_stats.length : "Empty" }</Tag>

                    </Tab>
                    <Tab  _focus={{outline: "none"}} px={3}>
                        <Icon as={FaBurn} w="30px" h="30px"/>
                        <Text px={2}>Rebase</Text>
                        <Tag borderRadius='full' textColor="white" colorScheme="blue">{data && data.rebase_stats.length > 0 ? data.protocol_stats.length : "Empty" }</Tag>
                    </Tab>
                </TabList>

                <TabPanels overflow="auto">
                    <TabPanel>
                        <GeneralProtocolTable data={data && data.protocol_stats}/>
                    </TabPanel>
                    <TabPanel>
                        <ExpansionTable data={data && data.expansion_stats}/>
                    </TabPanel>
                    <TabPanel>
                        <RebaseTable data={data && data.rebase_stats}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Spacer/>
            <Footer/>
        </Flex>
    );
};

export default Main;
