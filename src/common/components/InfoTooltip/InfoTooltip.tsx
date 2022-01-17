import React from 'react';
import {
    Flex,
    Icon,
    Tooltip,
} from '@chakra-ui/react'
import {AiOutlineInfoCircle} from "@react-icons/all-files/ai/AiOutlineInfoCircle";

type Props = {
    iconSize: number
    label: string
}

const InfoTooltip = ({ iconSize, label }: Props) => {
    return (

        <Tooltip label={label} placement="bottom" position="relative">
            <Flex>
                <Icon as={AiOutlineInfoCircle}  h={iconSize} w={iconSize} mx={2} my="auto"  />
            </Flex>
        </Tooltip>
    );
};

export default InfoTooltip;
