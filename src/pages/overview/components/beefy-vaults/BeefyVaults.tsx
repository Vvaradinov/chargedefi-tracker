import {Flex, Heading, SimpleGrid, Text} from '@chakra-ui/react'
import React from 'react';
import {IconStatCard} from "../../../../common/components/IconStatCard/IconStatCard";
import {useBeefyVault} from "./hooks/useBeefyVaults";

const BeefyVaults = () => {
    const { staticVault, chargeVault } = useBeefyVault()
    return (
        <Flex flexDir="column" px={5} >
            <Heading>Beefy Vaults</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" pt={5}>
                <IconStatCard
                    token="charge-busd"
                    data={{
                      symbol: 'Charge-BUSD LP',
                      value: chargeVault.toDollar,
                      topValue: chargeVault.lp,
                      changeDaily: { value: chargeVault.dailyChange, percent: chargeVault.dailyApr },
                  }}
                />
                <IconStatCard
                    token="static-busd"
                    data={{
                        symbol: 'Static-BUSD LP',
                        value: staticVault.toDollar,
                        topValue: staticVault.lp,
                        changeDaily: { value: staticVault.dailyChange, percent: staticVault.dailyApr },
                    }}
                />
            </SimpleGrid>
        </Flex>
    );
};

export default BeefyVaults;
