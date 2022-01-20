import { Flex, Heading, Img, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import React from 'react';
import {getTokenUrl} from "../../common/helpers/util";
import BoardRoomLpTable from "./components/boardroom/BoardRoomLpTable";
import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import BoardRoomChargeTable from "./components/boardroom/BoardRoomChargeTable";
import BeefyStaticTable from "./components/beefy-vaults/BeefyStaticTable";
import BeefyChargeTable from "./components/beefy-vaults/BeefyChargeTable";
import FarmChargeTable from "./components/farms/FarmChargeTable";
import FarmStaticTable from "./components/farms/FarmStaticTable";
import ConnectDapp from "../../common/components/ConnectDapp/ConnectDapp";
import Footer from "../../common/components/Footer/Footer";

const Main = () => {
    const { walletAddress} = useWalletAddress()!

    if(!walletAddress){
        return <ConnectDapp/>
    }
    return (
        <Flex flexDir="column" py={5} h="100%">
            <Tabs isFitted>
                <TabList>
                    <Tab  _focus={{outline: "none"}}>
                        <Img src={getTokenUrl("static-busd")} w="50px" h="30px"/>
                        <Text px={2}>Static-BUSD Boardroom</Text>
                    </Tab>
                    <Tab _focus={{outline: "none"}}>
                        <Img src={getTokenUrl("charge")} w="30px" h="30px"/>
                        <Text px={2}>Charge Boardroom</Text>
                    </Tab>
                    <Tab  _focus={{outline: "none"}}>
                        <Img src={getTokenUrl("charge-busd")} w="50px" h="30px"/>
                        <Text px={2}>Charge-BUSD Farm</Text>
                    </Tab>
                    <Tab  _focus={{outline: "none"}}>
                        <Img src={getTokenUrl("static-busd")} w="50px" h="30px"/>
                        <Text px={2}>Static-BUSD Farm</Text>
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <BoardRoomLpTable/>
                    </TabPanel>
                    <TabPanel>
                        <BoardRoomChargeTable/>
                    </TabPanel>
                    <TabPanel>
                        <FarmChargeTable/>
                    </TabPanel>
                    <TabPanel>
                        <FarmStaticTable/>
                    </TabPanel>
                    <TabPanel>
                        <BeefyChargeTable/>
                    </TabPanel>
                    <TabPanel>
                        <BeefyStaticTable/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Spacer/>
            <Footer/>
        </Flex>
    );
};

export default Main;
