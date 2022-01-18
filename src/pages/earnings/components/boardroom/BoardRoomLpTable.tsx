import React from 'react';
import {useBoardroomLpEarnings} from "./hooks/useBoardroomLpEarnings";
import {Flex, Img, Skeleton, Table, TableCaption, Tag, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {getTokenUrl, timeZone} from "../../../../common/helpers/util";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
import {Heading} from "@pancakeswap-libs/uikit";
import InfoTooltip from "../../../../common/components/InfoTooltip/InfoTooltip";

const BoardRoomLpTable = () => {

    const { data, isLoading, isError} = useBoardroomLpEarnings()

    if(!data || data.length === 0){
        return <Heading> Having in mind this is the first time you are using this app (with this wallet), the table will be populated at the start of the next epoch (in the first 5 minutes).
            A future version of this will record all your past earnings and will automatically listen and record deposit and withdrawal events</Heading>
    }

    return (
        <Skeleton isLoaded={!isLoading && !isError}>
            <Table variant="simple">
            <TableCaption placement="top"> Table is updated at the end of every epoch (approximately 5 minutes after epoch ends)</TableCaption>
            <Thead>
                <Tr>
                    <Th>
                        <Flex>
                            <Text>Date & Time</Text>
                            <InfoTooltip iconSize={4} label={"The Date and Time recorded"}/>
                        </Flex>
                    </Th>
                    <Th>
                        <Flex>
                            <Text>Charge Earned</Text>
                            <InfoTooltip iconSize={4} label={"The amount of Charge tokens earned"}/>
                        </Flex>
                    </Th>
                    <Th>
                        <Flex>
                            <Text>Charge Value</Text>
                            <InfoTooltip iconSize={4} label={"The market value of Charge token at the time of recording"}/>
                        </Flex>
                    </Th>
                    <Th>
                        <Flex>
                            <Text>Static Earned</Text>
                            <InfoTooltip iconSize={4} label={"The amount of Static tokens earned"}/>
                        </Flex>
                    </Th>
                    <Th>
                        <Flex>
                            <Text>Static Value</Text>
                            <InfoTooltip iconSize={4} label={"The market value of Static token at the time of recording"}/>
                        </Flex>
                    </Th>
                    <Th>
                        <Flex>
                            <Text>Total Value</Text>
                            <InfoTooltip iconSize={4} label={"The Total market value of earnings tokens at the time of recording"}/>
                        </Flex>
                    </Th>
                    <Th>
                        <Flex>
                            <Text>Percentage</Text>
                            <InfoTooltip iconSize={4} label={"The percentage increase of value & tokens since last epoch"}/>
                        </Flex>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {data && data.map((i:any, key:number) =>
                    <Tr>
                        <Td>
                            <Tag colorScheme="blue">{dayjs.utc(i.date).tz(timeZone).toDate().toLocaleString()}</Tag>
                        </Td>
                        <Td>
                            <Flex>
                                <Img src={getTokenUrl("charge")} h="30px" w="30px" my="auto"/>
                                <Text my="auto" px={2}>{i.earned_charge.toFixed(4)}</Text>
                            </Flex>
                        </Td>
                        <Td>${i.earned_charge_value.toFixed(3)}</Td>
                        <Td>
                            <Flex>
                                <Img src={getTokenUrl("static")} h="30px" w="30px" my="auto"/>
                                <Text my="auto" px={2}>{i.earned_static.toFixed(3)}</Text>
                            </Flex>
                        </Td>
                        <Td>${i.earned_static_value.toFixed(3)}</Td>
                        <Td>${i.total_earned.toFixed(3)}</Td>
                        <Td>{i.percent_increase}%</Td>
                    </Tr>

                )}
            </Tbody>
        </Table>
        </Skeleton>
    );
};

export default BoardRoomLpTable;
