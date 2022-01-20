import React from 'react';
import {Heading, SimpleGrid} from "@chakra-ui/react";
import {IconStatCard} from "../../../../common/components/IconStatCard/IconStatCard";
import {useFarms} from "./hooks/useFarms";
import {InvestedCard} from "../boardroom/cards/InvestedCard";

const Farms = () => {

    const {stats} = useFarms()

    return (
      <>
          <Heading py={5} px={5}>Farms </Heading>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing="6" pt={5} px={5}>
              <InvestedCard
                 token="static-busd"
                  data={{
                      symbol: 'Static-BUSD',
                      value: stats.staticLpValue,
                      topValue: stats.staticLpAmount,
                      tvl: stats.staticTVL
                  }}
              />
              <IconStatCard
                  token="charge"
                  data={{
                      symbol: 'Charge Earned',
                      value: stats.staticRewardValue,
                      topValue: stats.staticPoolReward,
                      changeDaily: stats.staticChangeDaily
                  }}
              />
              <InvestedCard
                  token="charge-busd"
                  data={{
                      symbol: 'Charge-BUSD',
                      value: stats.chargeLpValue,
                      topValue: stats.chargeLpAmount,
                      tvl: stats.chargeTVL
                  }}
              />
              <IconStatCard
                  token="charge"
                  data={{
                      symbol: 'Charge Earned',
                      value: stats.chargeRewardValue,
                      topValue: stats.chargePoolReward,
                      changeDaily: stats.chargeChangeDaily
                  }}
              />
          </SimpleGrid>
      </>
    );
};

export default Farms;
