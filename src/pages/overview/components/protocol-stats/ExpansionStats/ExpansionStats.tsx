import React from 'react';
import {Flex, Heading, SimpleGrid} from "@chakra-ui/react";
import {IconStatCard} from "../../../../../common/components/IconStatCard/IconStatCard";
import {useExpansionStats} from "../hooks/useExpansionStats";

const ExpansionStats = () => {
    const { staticDollarAmount, staticAmount, chargeDollarAmount, chargeAmount, pulseRepayAmount, pulseRepay } = useExpansionStats()
    return (
        <Flex px={5} py={5} flexDir="column">
            <Heading>Expansion / Debt</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" pt={5}>
                <IconStatCard
                    token="static"
                    data={{
                        symbol: 'New Static',
                        value: staticDollarAmount!,
                        topValue: staticAmount,
                    }
                }/>

                <IconStatCard
                    token="charge"
                    data={{
                        symbol: "New Charge",
                        value: chargeDollarAmount!,
                        topValue: chargeAmount
                    }}
                    />
                <IconStatCard
                    token="pulse"
                    data={{
                        symbol: "Pulse Debt",
                        value: pulseRepayAmount!,
                        topValue: pulseRepay
                    }}
                />
            </SimpleGrid>
        </Flex>
    );
};

export default ExpansionStats;
