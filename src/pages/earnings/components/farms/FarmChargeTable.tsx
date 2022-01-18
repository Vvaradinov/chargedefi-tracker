import React from 'react';
import {useFarmsChargeEarnings} from "./hooks/useFarmsChargeEarnings";
import ChargeEarningsTable from "../../../../common/components/ChargeEarningsTable/ChargeEarningsTable";
import {Skeleton, Text} from "@chakra-ui/react";


const FarmChargeTable = () => {
    const { data, isLoading, isError} = useFarmsChargeEarnings()

    if(!data || data.length === 0){
        return <Text textAlign="center"> Having in mind this is the first time you are using this app (with this wallet), the table will be populated at the start of the next epoch (in the first 5 minutes).
            A future version of this will record all your past earnings and will automatically listen and record deposit and withdrawal events</Text>
    }

    return (
        <Skeleton isLoaded={!isLoading && !isError}>
            <ChargeEarningsTable data={data}/>
        </Skeleton>
    );
};

export default FarmChargeTable;
