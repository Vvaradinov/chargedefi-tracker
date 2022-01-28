import React from 'react';
import {Flex, Skeleton, Table, TableCaption, Tag, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import InfoTooltip from "../../../common/components/InfoTooltip/InfoTooltip";
import dayjs from "dayjs";
import {timeZone} from "../../../common/helpers/util";
import {formatUS} from "../../../common/helpers/formating";


type Props = {
    data: Array<any>
}
const RebaseTable = ({data}: Props) => {
    return (
        <Skeleton isLoaded={data !== undefined}>
            <Table variant="simple" >
                <TableCaption placement="top"> New records will be added right before new epoch starts (5 minutes before new epoch starts) </TableCaption>
                <Thead>
                    <Tr>
                        <Th>
                            <Flex>
                                <Text>Epoch</Text>
                                <InfoTooltip iconSize={4} label={"The Epoch recorded"}/>
                            </Flex>
                        </Th>
                        <Th>
                            <Flex>
                                <Text>Date & Time</Text>
                                <InfoTooltip iconSize={4} label={"The Date and Time recorded"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>TWAP</Text>
                                <InfoTooltip iconSize={4} label={"The Average price of Static recorded for the current epoch"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Static Burned</Text>
                                <InfoTooltip iconSize={4} label={"The Static token amount burned"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Static Dollar Value</Text>
                                <InfoTooltip iconSize={4} label={"The Static dollar value"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Static Burned %</Text>
                                <InfoTooltip iconSize={4} label={"The percentage Static burned of Static Circulating Supply"}/>
                            </Flex>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data && data.map((i:any, key:number) =>
                        <Tr key={key}>
                            <Td>{i.epoch}</Td>
                            <Td>
                                <Tag textColor="white" colorScheme="blue">{dayjs.utc(i.date).tz(timeZone).toDate().toLocaleString()}</Tag>
                            </Td>
                            <Td isNumeric>${formatUS(i.twap.toFixed(2))}</Td>
                            <Td isNumeric>{formatUS(i.static_burned.toFixed(3))}</Td>
                            <Td isNumeric>${formatUS(i.static_burn_dollar_amount.toFixed(2))}</Td>
                            <Td isNumeric>{formatUS(i.burn_percent.toFixed(2))}%</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </Skeleton>
    );
};

export default RebaseTable;
