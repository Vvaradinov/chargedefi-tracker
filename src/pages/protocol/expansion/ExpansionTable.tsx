import React from 'react';
import {Flex, Skeleton, Table, TableCaption, Tag, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import InfoTooltip from "../../../common/components/InfoTooltip/InfoTooltip";
import dayjs from "dayjs";
import {timeZone} from "../../../common/helpers/util";
import {formatUS} from "../../../common/helpers/formating";

type Props = {
    data: Array<any>
}

const ExpansionTable = ({data}: Props) => {
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
                                <Text>Static Amount</Text>
                                <InfoTooltip iconSize={4} label={"New Static Token amount minted"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Static Dollar Value</Text>
                                <InfoTooltip iconSize={4} label={"Static Dollar Value at the time of recording"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Static Mint %</Text>
                                <InfoTooltip iconSize={4} label={"The percentage New Static of Static Circulating Supply"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Charge Amount</Text>
                                <InfoTooltip iconSize={4} label={"New Charge Token amount minted"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Charge Dollar Value</Text>
                                <InfoTooltip iconSize={4} label={"Charge Dollar Value at the time of recording"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Charge Mint %</Text>
                                <InfoTooltip iconSize={4} label={"The percentage New Charge of Charge Circulating Supply"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Pulse Repay</Text>
                                <InfoTooltip iconSize={4} label={"Total Pulse Re-payed"}/>
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
                            <Td isNumeric>{formatUS(i.new_static.toFixed(3))}</Td>
                            <Td isNumeric>${formatUS(i.new_static_dollar_value.toFixed(2))}</Td>
                            <Td isNumeric>{formatUS(i.static_mint_percent.toFixed(2))}%</Td>
                            <Td isNumeric>{formatUS(i.new_charge.toFixed(2))}</Td>
                            <Td isNumeric>${formatUS(i.new_charge_dollar_value.toFixed(2))}</Td>
                            <Td isNumeric>{formatUS(i.charge_mint_percent.toFixed(2))}%</Td>
                            <Td isNumeric>{formatUS(i.pulse_repay)}</Td>

                        </Tr>

                    )}
                </Tbody>
            </Table>
        </Skeleton>
    );
};

export default ExpansionTable;
