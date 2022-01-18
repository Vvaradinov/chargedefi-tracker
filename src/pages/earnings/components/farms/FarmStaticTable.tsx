import React from 'react';
import {useFarmsStaticEarnings} from "./hooks/useFarmsStaticEarnings";
import {Skeleton, Text} from "@chakra-ui/react";
import ChargeEarningsTable from "../../../../common/components/ChargeEarningsTable/ChargeEarningsTable";


const FarmStaticTable = () => {
    const { data, isLoading, isError} = useFarmsStaticEarnings()

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

export default FarmStaticTable;
