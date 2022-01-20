import React from 'react';
import {Flex, Heading, SimpleGrid} from "@chakra-ui/react";
import {IconStatCard} from "../../../../../common/components/IconStatCard/IconStatCard";
import {useExpansionStats} from "../hooks/useExpansionStats";
import InfoTooltip from "../../../../../common/components/InfoTooltip/InfoTooltip";

const ExpansionStats = () => {
    const { staticDollarAmount, staticAmount, chargeDollarAmount, chargeAmount, pulseRepayAmount, pulseRepay } = useExpansionStats()
    return (
        <Flex px={5} py={5} flexDir="column">
            <Flex>
                <Heading>Expansion / Debt</Heading>
                <InfoTooltip iconSize={8} label={"1. New Charge is emitted every new epoch. " +
                "2. New Static emitted in BR when above peg. " +
                "3. When Static is negative and rebase is about to happen that amount will be burned " +
                "4. Pulse debt is the amount of Pulse the treasury needs to payout to users. This affects BR APR "}/>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" pt={5}>
                <IconStatCard
                    token="static"
                    data={{
                        symbol: 'Static Expansion',
                        value: staticDollarAmount!,
                        topValue: staticAmount,
                    }
                }/>

                <IconStatCard
                    token="charge"
                    data={{
                        symbol: "Charge Expansion",
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
