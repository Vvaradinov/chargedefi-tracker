import React from 'react';
import {useFarmsStaticEarnings} from "./hooks/useFarmsStaticEarnings";
import {Skeleton, Text} from "@chakra-ui/react";
import ChargeEarningsTable from "../../../../common/components/ChargeEarningsTable/ChargeEarningsTable";


type Props = {
    data: Array<any>
    isLoading: boolean
    isError: boolean
}

const FarmStaticTable = ({ data, isLoading, isError}: Props) => {

    if(!data || data.length === 0){
        return <Text textAlign="center"> This table is being populated at the start of each new epoch (in the first 5 minutes). A future version of this will record all your past earnings and will automatically listen and record deposit and withdrawal events</Text>
    }

    return (
        <Skeleton isLoaded={!isLoading && !isError}>
            <ChargeEarningsTable data={data}/>
        </Skeleton>
    );
};

export default FarmStaticTable;
