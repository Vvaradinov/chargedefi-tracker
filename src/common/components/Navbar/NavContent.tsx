import {
    Box,
    BoxProps,
    Button,
    Center,
    HStack,
    Stack,
    StackDivider,
    StackProps,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import * as React from 'react'
import { NavLink } from './NavLink'
import { NavList } from './NavList'
import { NavListItem } from './NavListItem'
import {HiX} from "@react-icons/all-files/hi/HiX";
import {HiOutlineMenu} from "@react-icons/all-files/hi/HiOutlineMenu";

const links = [
    { label: 'Overview', to: 'overview' },
    { label: 'Earnings', to: 'earnings' },
    // { label: 'Strategy', to: 'strategy' },
]

const MobileNavContent = (props: BoxProps) => {
    const { isOpen, onToggle } = useDisclosure()
    return (
        <Box {...props}>
            <Center
                as="button"
                p="2"
                fontSize="2xl"
                color={useColorModeValue('gray.600', 'gray.400')}
                onClick={onToggle}
            >
                {isOpen ? <HiX /> : <HiOutlineMenu />}
            </Center>
            <NavList
                pos="absolute"
                zIndex={222}
                insetX="0"
                bg="gray.600"
                top="64px"
                animate={isOpen ? 'enter' : 'exit'}
            >
                <Stack spacing="0" divider={<StackDivider borderColor="whiteAlpha.200" />}>
                    {links.map((link, index) => (
                        <NavListItem key={index}>
                            <NavLink.Mobile to={link.to}>{link.label}</NavLink.Mobile>
                        </NavListItem>
                    ))}
                </Stack>
            </NavList>
        </Box>
    )
}

const DesktopNavContent = (props: StackProps) => {
    return (
        <HStack spacing="8" align="stretch" {...props} my="auto">
            {links.map((link, index) => (
                <NavLink.Desktop key={index} to={link.to}>
                    {link.label}
                </NavLink.Desktop>
            ))}
        </HStack>
    )
}

export const NavContent = {
    Mobile: MobileNavContent,
    Desktop: DesktopNavContent,
}
