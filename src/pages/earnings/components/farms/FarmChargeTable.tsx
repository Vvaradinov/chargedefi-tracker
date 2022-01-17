import React from 'react';
import {useFarmsChargeEarnings} from "./hooks/useFarmsChargeEarnings";
import ChargeEarningsTable from "../../../../common/components/ChargeEarningsTable/ChargeEarningsTable";
import { Skeleton } from '@chakra-ui/react';
import {Heading} from "@pancakeswap-libs/uikit";

const FarmChargeTable = () => {
    const { data, isLoading, isError} = useFarmsChargeEarnings()

    if(!data || data.length === 0){
        return <Heading> Table is updated at the end of every epoch (approximately 5 minutes after epoch ends).
            For now this table will only show earnings from the moment you have first connected your account.
            A future version of this will record all your past earnings and will automatically listen and record deposit and withdraw events</Heading>
    }

    return (
        <Skeleton isLoaded={!isLoading && !isError}>
            <ChargeEarningsTable data={data}/>
        </Skeleton>
    );
};

export default FarmChargeTable;
