import { Flex, Heading, Stat, Text, Box,  useColorModeValue as mode, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import BoardroomCharge from "./BoardroomCharge";
import BoardRoomLp from "./BoardRoomLp";


const BoardRoom = () => {


    return (
        <Flex px={5} py={5} flexDir="column">
            <BoardroomCharge/>
            <BoardRoomLp/>
        </Flex>
    );
};

export default BoardRoom;
