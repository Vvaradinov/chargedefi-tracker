import { Flex, Heading, SimpleGrid, Input, FormLabel, FormControl, Tooltip } from '@chakra-ui/react';
import StatCard from "../../../../common/components/StatCard/StatCard";
import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import {useBeefyVault} from '../beefy-vaults/hooks/useBeefyVaults';
import {useFarms} from "../farms/hooks/useFarms";
import {useBoardRoomCharge} from "../boardroom/hooks/useBoardroomCharge";
import {useBoardRoomLp} from "../boardroom/hooks/useBoardRoomLp";
import { isNumber } from '@chakra-ui/utils';
import {useWalletCharge} from "../wallet/hooks/useWalletCharge";
import {useWalletStatic} from "../wallet/hooks/useWalletStatic";
import InfoTooltip from "../../../../common/components/InfoTooltip/InfoTooltip";

type Props = {
    includeBeefy: boolean
    includeFarms: boolean
    includeBoardroom: boolean
    includeWallet: boolean
}

const UserStats = ({ includeBeefy, includeFarms, includeBoardroom, includeWallet} : Props) => {

    const [investment, setInvestment] = useState<string>("");

    const { chargeStats } = useWalletCharge()
    const { staticStats } = useWalletStatic()
    const { staticVault, chargeVault } = useBeefyVault();
    const { stats } = useFarms();
    const statsBoardRoomLp = useBoardRoomLp()
    const statsBoardRoomCharge = useBoardRoomCharge()

    let totalValue = 0;
    if (includeWallet) {
        totalValue += Number(chargeStats.value);
        totalValue += Number(staticStats.value);
    }

    if (includeBeefy) {
        totalValue += Number(chargeVault.toDollar);
        totalValue += Number(staticVault.toDollar);
    }

    if (includeFarms) {
        totalValue += Number(stats.staticLpValue);
        totalValue += Number(stats.staticRewardValue);
        totalValue += Number(stats.chargeLpValue);
        totalValue += Number(stats.chargeRewardValue);
    }

    if (includeBoardroom) {
        totalValue += Number(statsBoardRoomLp.stats.value);
        totalValue += Number(statsBoardRoomLp.stats.chargeValue);
        totalValue += Number(statsBoardRoomLp.stats.staticValue);
        totalValue += Number(statsBoardRoomCharge.stats.value);
        totalValue += Number(statsBoardRoomCharge.stats.earnedValue);
    }

    const cookies = new Cookies();

    if (totalValue > 0) {
        let historical_data = new Map();

        // if we have historical data save in cookie, retrieve it
        if (cookies.get('historical_data') != undefined ) {
            historical_data = new Map(Object.entries(cookies.get('historical_data')));
        }

        const today = (new Date(new Date().setHours(0,0,0,0))).toLocaleDateString();
        const walletTotal = Number(chargeStats.value) + Number(staticStats.value);
        const beefyTotal = Number(chargeVault.toDollar) + Number(staticVault.toDollar);
        const farmTotal = Number(stats.staticLpValue) + Number(stats.staticRewardValue) + Number(stats.chargeLpValue) + Number(stats.chargeRewardValue);
        const boardroomTotal = Number(statsBoardRoomLp.stats.value) + Number(statsBoardRoomLp.stats.chargeValue) + Number(statsBoardRoomLp.stats.staticValue) + Number(statsBoardRoomCharge.stats.value) + Number(statsBoardRoomCharge.stats.earnedValue);
        const total = walletTotal + beefyTotal + farmTotal + boardroomTotal;
        const roiToday = total/Number(investment)-1;

        const historical_object = {
            investment: investment,
            wallet: walletTotal,
            beefy: beefyTotal,
            farms: farmTotal,
            boardroom: boardroomTotal,
            total: total,
            roi: roiToday,
        };

        historical_data.set(today, historical_object);
        const hist_string = JSON.stringify(Object.fromEntries(historical_data));
        cookies.set('historical_data', hist_string, { path: '/' });
        // console.log("saving new value to cookie: " + hist_string);
    }

    let roi = 0;

    if (isNumber(Number(investment)) && Number(investment) != 0) {
        roi = (totalValue/Number(investment)-1)*100;
    }

    function updateInvestment (value:string) {
        const numberValue = Number(value);
        if (isNumber(numberValue) && numberValue != 0) {
            cookies.set('investment', value, { path: '/' });
            setInvestment(value);
        } else {
            cookies.set('investment', 0, { path: '/' });
            setInvestment('0');
        }
    }

    if (investment == "" && cookies.get('investment') !== undefined) {
        console.log("retrieving investment from cookie!");
        setInvestment(cookies.get('investment'));
    }

    return (
        <Flex px={5} py={5} flexDir="column">
            <Flex>
                <Heading>ROI Calculator</Heading>
                <InfoTooltip iconSize={8} label="Input your initial investment below to track your ROI to date from Boardroom, Farms and Beefy (check the ones you want to include in the calculation) "/>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" pt={5}>

                <Flex w="100%">
                    <FormControl>
                        <FormLabel>Initial $ Investment</FormLabel>
                        <Input value={investment} size="lg" onChange={e => updateInvestment(e.target.value)}/>
                    </FormControl>
                </Flex>
                <StatCard label={"Total Value"} value={"$" + totalValue.toFixed(2)} />
                <StatCard label={"Return on investment"} value={roi.toFixed(2) + '%'}/>
            </SimpleGrid>
        </Flex>
    );
};

export default UserStats;
