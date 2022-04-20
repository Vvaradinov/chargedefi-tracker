import {
    Box,
    BoxProps,
    Button,
    Center,
    HStack,
    Stack,
    Link,
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
import {getSavedChain} from "../../../service/chain_cookie.service";


const links = getSavedChain() === "BSC" ?  [
    { label: 'Account Overview', to: 'overview' },
    { label: 'Earnings History', to: 'earnings' },
    { label: 'Protocol History', to: 'protocol' },
] : [
    { label: 'Account Overview', to: 'overview' },
    { label: 'Protocol History', to: 'protocol' },
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
                            <NavLink.Mobile onClick={onToggle} to={link.to}>{link.label}</NavLink.Mobile>
                        </NavListItem>
                    ))}
                    <Link href="https://docs.chargedefi.fi/" target="_blank">
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
                            > Gitbook</Box>
                    </Link>
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
            <a href="https://docs.chargedefi.fi/" target="_blank">GitBook</a>
        </HStack>
    )
}

export const NavContent = {
    Mobile: MobileNavContent,
    Desktop: DesktopNavContent,
}
