import React from 'react';
import {Flex, Heading, SimpleGrid} from "@chakra-ui/react";
import {IconStatCard} from "../../../../common/components/IconStatCard/IconStatCard";
import {useBoardRoomCharge} from "./hooks/useBoardroomCharge";
import {InvestedCard} from "./cards/InvestedCard";

const BoardroomCharge = () => {
    const { daily, dailyIncrease, earnedTokens, earnedValue, tokens, value, tvl } = useBoardRoomCharge()
    return (
        <>
            <Heading>Boardroom - Charge</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6" pt={5}>
                <InvestedCard
                    token="charge"
                    data={{
                        symbol: 'Charge',
                        value: value,
                        topValue: tokens,
                        tvl: tvl
                    }}
                />
                <IconStatCard
                    token="static"
                    data={{
                        symbol: 'Static Earned',
                        value: earnedValue,
                        topValue: earnedTokens,
                        changeDaily: {
                            percent: daily,
                            value: dailyIncrease
                        },
                    }
                    }/>

            </SimpleGrid>
        </>
    );
};

export default BoardroomCharge;
