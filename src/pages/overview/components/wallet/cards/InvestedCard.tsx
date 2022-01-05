import {
    Box,
    Flex,
    Heading,
    HStack,
    Text,
    Image,
    useColorModeValue as mode, Skeleton
} from '@chakra-ui/react'
import * as React from 'react'
import {getTokenUrl} from "../../../../../common/helpers/util";

export interface StatCardProps {
    token: string,
    data: {
        symbol: string
        topValue: any,
        value: number
        tvl: number
    }
}

function format(value: number) {
    return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(value)
}

export const InvestedCard = (props: StatCardProps) => {
    const { data, token } = props
    const { value, tvl, symbol, topValue } = data

    return (
        <Box bg={mode('white', 'gray.700')} px="6" py="4" shadow="base" rounded="lg" w="100%" mr={5}>
            <HStack>
                <Image layerStyle={token} src={getTokenUrl(token)} bg={mode('white', 'gray.500')} rounded="full"/>
                <Skeleton isLoaded={topValue !== undefined && !isNaN(topValue)} w="100%" h="30px">
                    <Text fontWeight="bold" fontSize="20px" color={mode('gray.500', 'white')}>
                        {topValue}
                    </Text>
                </Skeleton>
            </HStack>
            <Skeleton isLoaded={value !== undefined && !isNaN(value)}>
                <Heading as="h4" size="lg" my="3" fontWeight="extrabold">${format(value)}</Heading>
            </Skeleton>

            <Flex justify="space-between" align="center" fontWeight="medium" fontSize="sm">
                {tvl &&
                <HStack spacing="0" color={mode('black', 'gray.400')}>
                    <Skeleton isLoaded={tvl !== undefined && !isNaN(tvl)}>
                        <Flex>
                            <Text>${format(tvl)}</Text>
                            <Text mx={2}> TVL</Text>
                        </Flex>
                    </Skeleton>
                </HStack>
                }
                <Text color={mode('black', 'white')}>{symbol}</Text>
            </Flex>
        </Box>
    )
}
