import { Flex, Heading, Img, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
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

const Main = () => {
    const { walletAddress} = useWalletAddress()!

    if(!walletAddress){
        return <ConnectDapp/>
    }
    return (
        <Flex flexDir="column" py={5}>
            <Tabs isFitted>
                <TabList>
                    <Tab>
                        <Img src={getTokenUrl("static-busd")} w="50px" h="30px"/>
                        <Text px={2}>Boardroom LP</Text>
                    </Tab>
                    <Tab>
                        <Img src={getTokenUrl("charge")} w="30px" h="30px"/>
                        <Text px={2}>Boardroom</Text>
                    </Tab>
                    <Tab>
                        <Img src={getTokenUrl("charge-busd")} w="50px" h="30px"/>
                        <Text px={2}>Farm</Text>
                    </Tab>
                    <Tab>
                        <Img src={getTokenUrl("static-busd")} w="50px" h="30px"/>
                        <Text px={2}>Farm</Text>
                    </Tab>
                    <Tab>
                        <Img src={getTokenUrl("charge-busd")} w="50px" h="30px"/>
                        <Text px={2}>Beefy</Text>
                    </Tab>
                    <Tab>
                        <Img src={getTokenUrl("static-busd")} w="50px" h="30px"/>
                        <Text px={2}>Beefy</Text>
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
        </Flex>
    );
};

export default Main;
