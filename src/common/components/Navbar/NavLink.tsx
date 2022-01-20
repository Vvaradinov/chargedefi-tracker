import {Box, chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { Link } from 'react-router-dom'

const DesktopNavLink = (props: HTMLChakraProps<'a'> & any) => {
    return (
        <Link to={props.to}>
            <Box
            fontWeight="medium"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderBottom="2px"
            borderColor="transparent"
            transition="all 0.2s"
            _hover={{
                borderColor: 'currentcolor',
                color: useColorModeValue('blue.600', 'blue.200'),
            }}
            {...props}
        />
        </Link>
    )
}

const MobileNavLink = (props: HTMLChakraProps<'a'> & any) => {
    return (
        <Link to={props.to}>
            <Box
                display="block"
                textAlign="center"
                fontWeight="bold"
                py="5"
                fontSize="lg"
                color="white"
                w="full"
                _hover={{
                    bg: 'blackAlpha.200',
                }}
                {...props}
            />
        </Link>
    )
}

export const NavLink = {
    Mobile: MobileNavLink,
    Desktop: DesktopNavLink,
}
