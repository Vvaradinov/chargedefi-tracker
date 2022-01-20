import React from 'react';
import {Flex, Heading, SimpleGrid} from "@chakra-ui/react";
import {IconStatCard} from "../../../../../common/components/IconStatCard/IconStatCard";
import {useBoardRoomCharge} from "../hooks/useBoardroomCharge";
import {InvestedCard} from "../cards/InvestedCard";

const BoardroomCharge = () => {
    const { stats} = useBoardRoomCharge()
    return (
        <>
            <Heading>Boardroom - Charge</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" pt={5}>
                <InvestedCard
                    token="charge"
                    data={{
                        symbol: 'Charge',
                        value: stats.value,
                        topValue: stats.tokens,
                        tvl: stats.tvl
                    }}
                />
                <IconStatCard
                    token="static"
                    data={{
                        symbol: 'Static Earned',
                        value: stats.earnedValue,
                        topValue: stats.earnedTokens,
                        changeDaily: stats.changeDaily,
                    }
                    }/>

            </SimpleGrid>
        </>
    );
};

export default BoardroomCharge;
