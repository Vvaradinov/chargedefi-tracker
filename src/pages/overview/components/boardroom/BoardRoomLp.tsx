import React from 'react';
import {Heading, SimpleGrid} from "@chakra-ui/react";
import {IconStatCard} from "../../../../common/components/IconStatCard/IconStatCard";
import {useBoardRoomLp} from "./hooks/useBoardRoomLp";
import {InvestedCard} from "./cards/InvestedCard";
import {lpPair} from "../../../../config";

const BoardRoomLp = () => {
    const { earnedStaticTokens, earnedStaticValue, earnedChargeTokens, earnedChargeValue,
        tokens, value, tvl, chargeChangeDaily, staticChangeDaily
    } = useBoardRoomLp()
    return (
        <>
            <Heading pt={5}>Boardroom - {lpPair}</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" pt={5}>
                <InvestedCard
                    token="static-busd"
                    data={{
                        symbol: lpPair,
                        value: value,
                        topValue: tokens,
                        tvl: tvl
                    }}
                />
                <IconStatCard
                    token="charge"
                    data={{
                        symbol: 'Charge Earned',
                        value: earnedChargeValue,
                        topValue: earnedChargeTokens,
                        changeDaily: chargeChangeDaily
                    }}
                />
                <IconStatCard
                    token="static"
                    data={{
                        symbol: 'Static Earned',
                        value: earnedStaticValue,
                        topValue: earnedStaticTokens,
                        changeDaily: staticChangeDaily
                    }}
                />
            </SimpleGrid>
        </>
    );
};

export default BoardRoomLp;
