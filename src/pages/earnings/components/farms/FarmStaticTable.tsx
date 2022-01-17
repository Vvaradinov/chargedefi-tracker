import React from 'react';
import {useFarmsStaticEarnings} from "./hooks/useFarmsStaticEarnings";
import {Skeleton} from "@chakra-ui/react";
import ChargeEarningsTable from "../../../../common/components/ChargeEarningsTable/ChargeEarningsTable";
import {Heading} from "@pancakeswap-libs/uikit";


const FarmStaticTable = () => {
    const { data, isLoading, isError} = useFarmsStaticEarnings()

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

export default FarmStaticTable;
