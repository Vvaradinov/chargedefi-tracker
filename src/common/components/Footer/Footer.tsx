import React from 'react';
import {HStack, Image, Heading, Flex, Icon, Link, useColorModeValue as mode, Divider } from "@chakra-ui/react";
import {AiOutlineMedium} from "@react-icons/all-files/ai/AiOutlineMedium";
import {FiTwitter} from "@react-icons/all-files/fi/FiTwitter";
import {FaTelegram} from "@react-icons/all-files/fa/FaTelegram";
import {FaDiscord} from "@react-icons/all-files/fa/FaDiscord";
import {FaClipboardList} from "@react-icons/all-files/fa/FaClipboardList";

const Footer = () => {


    return (
        <>
            <Divider />
            <Flex justify="space-between" pt={3} px={5}>
                <Heading>Our channels</Heading>
                <HStack spacing={8} pt={2}>
                    <Link href="https://twitter.com/ChargeDeFi"  target="_blank" >
                        <Icon as={FiTwitter}  w="30px" h="30px"/>
                    </Link>
                    <Link href="https://t.me/chargedefi"  target="_blank"  >
                        <Icon as={FaTelegram}  w="30px" h="30px"/>
                    </Link>
                    <Link href="https://discord.gg/TDFHtWj7b5"  target="_blank" >
                        <Icon as={FaDiscord}  w="30px" h="30px" />
                    </Link>
                    <Link href="https://chargedefi.medium.co" target="_blank"  >
                        <Icon as={AiOutlineMedium}  w="35px" h="35px"/>
                    </Link>
                    <Link href="https://docs.chargedefi.fi/"  target="_blank" >
                        <Image src="https://www.svgrepo.com/show/330505/gitbook.svg"
                               bgColor={mode('transparent', 'white')}  w="35px" h="40px"/>
                    </Link>
                    <Link  href="https://www.chargedefi.fi/charge_whitepaper.pdf" target="_blank" >
                        <Icon as={FaClipboardList} w="30px" h="30px"  />
                    </Link>
                    <Link href="https://www.certik.com/projects/chargedefi"  target="_blank" >
                        <Image src="https://www.chargedefi.fi/static/media/certik-icon.37c78b75.png" w="30px" h="30px"
                        bgColor={mode('transparent', 'white')}/>
                    </Link>
                </HStack>
            </Flex>
        </>
    )
};


export default Footer;
