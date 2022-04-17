import React from 'react';
import StatCard from "../../../../common/components/StatCard/StatCard";
import {Flex, Heading, SimpleGrid} from "@chakra-ui/react";
import {useProtocolStats} from "./hooks/useProtocolStats";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import {formatUS} from "../../../../common/helpers/formating";

const ProtocolStats = () => {

    const { epoch, timer, epochsUnderOne, twap} = useProtocolStats()
    return (
        <Flex px={5} py={5} flexDir="column">
            <Heading>Basics</Heading>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing="6" pt={5}>
                <StatCard label={"Time to next epoch"} value={timer}/>
                <StatCard label={"Current Epoch"} value={epoch} />
                <StatCard label={"Epochs Under Peg"} value={epochsUnderOne}/>
                <StatCard label={"Epoch TWAP"} value={`$${formatUS(twap)}`}/>
            </SimpleGrid>
        </Flex>
    );
};

export default ProtocolStats;
