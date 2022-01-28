import React from 'react';
import {Flex, Img, Table, TableCaption, Tag, Tbody, Td, Text, Th, Thead, Tr, Skeleton} from "@chakra-ui/react";
import InfoTooltip from "../../../common/components/InfoTooltip/InfoTooltip";
import dayjs from "dayjs";
import {getTokenUrl, timeZone} from "../../../common/helpers/util";
import {formatUS} from "../../../common/helpers/formating";

type Props = {
    data: Array<any>
}

const GeneralProtocolTable = ({data}: Props) => {
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
                                <Text>Static Supply</Text>
                                <InfoTooltip iconSize={4} label={"Static token circulating supply"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Charge Supply</Text>
                                <InfoTooltip iconSize={4} label={"Charge token circulating supply"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Charge BR TVL</Text>
                                <InfoTooltip iconSize={4} label={"Charge Boardroom Total Value Locked"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Static-BUSD BR TVL</Text>
                                <InfoTooltip iconSize={4} label={"Static-BUSD Boardroom Total Value Locked"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Charge-BUSD Farm TVL</Text>
                                <InfoTooltip iconSize={4} label={"Charge Farm Total Value Locked"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Static-BUSD Farm TVL</Text>
                                <InfoTooltip iconSize={4} label={"Static-BUSD Farm Total Value Locked"}/>
                            </Flex>
                        </Th>
                        <Th isNumeric>
                            <Flex justify="end">
                                <Text>Total TVL</Text>
                                <InfoTooltip iconSize={4} label={"Total Value Locked in ChargeDefi"}/>
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
                            <Td isNumeric>{formatUS(i.static_circulating_supply.toFixed(0))}</Td>
                            <Td isNumeric>{formatUS(i.charge_circulating_supply.toFixed(0))}</Td>
                            <Td isNumeric>${formatUS(i.charge_boardroom_tvl.toFixed(2))}</Td>
                            <Td isNumeric>${formatUS(i.static_boardroom_tvl.toFixed(2))}</Td>
                            <Td isNumeric>${formatUS(i.charge_farm_tvl.toFixed(2))}</Td>
                            <Td isNumeric>${formatUS(i.static_farm_tvl.toFixed(2))}</Td>
                            <Td isNumeric>${formatUS(i.total_tvl)}</Td>

                        </Tr>

                    )}
                </Tbody>
            </Table>
        </Skeleton>
    );
};

export default GeneralProtocolTable;
