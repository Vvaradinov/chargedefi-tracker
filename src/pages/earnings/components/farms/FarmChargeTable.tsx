import React from 'react';
import {useFarmsChargeEarnings} from "./hooks/useFarmsChargeEarnings";
import ChargeEarningsTable from "../../../../common/components/ChargeEarningsTable/ChargeEarningsTable";
import {Skeleton, Text} from "@chakra-ui/react";


const FarmChargeTable = () => {
    const { data, isLoading, isError} = useFarmsChargeEarnings()

    if(!data || data.length === 0){
        return <Text textAlign="center"> This table is being populated at the start of each new epoch (in the first 5 minutes). A future version of this will record all your past earnings and will automatically listen and record deposit and withdrawal events</Text>
    }

    return (
        <Skeleton isLoaded={!isLoading && !isError}>
            <ChargeEarningsTable data={data}/>
        </Skeleton>
    );
};

export default FarmChargeTable;
