import React from 'react';
import {HStack, Image, Heading, Flex, Icon, Link, useColorModeValue as mode, Divider, Spacer } from "@chakra-ui/react";
import {AiOutlineMedium} from "@react-icons/all-files/ai/AiOutlineMedium";
import {FiTwitter} from "@react-icons/all-files/fi/FiTwitter";
import {FaTelegram} from "@react-icons/all-files/fa/FaTelegram";
import {FaDiscord} from "@react-icons/all-files/fa/FaDiscord";
import {FaClipboardList} from "@react-icons/all-files/fa/FaClipboardList";
import certikWhite from "../../assets/certik-icon-white.png"
import {FaYoutube} from "@react-icons/all-files/fa/FaYoutube";

const Footer = () => {


    return (
        <>
            <Divider />
            <Flex  pt={3} px={5} flexWrap="wrap">
                <Heading>Our channels</Heading>
                <Spacer/>
                <HStack spacing={8} pt={2} flexDir="row" flexWrap="wrap">
                    <Link ml={9} href="https://twitter.com/ChargeDeFi"  target="_blank" >
                        <Icon as={FiTwitter}  w="30px" h="30px"/>
                    </Link>
                    <Link href="https://t.me/chargedefi"  target="_blank"  >
                        <Icon as={FaTelegram}  w="30px" h="30px"/>
                    </Link>
                    <Link href="https://discord.gg/TDFHtWj7b5"  target="_blank" >
                        <Icon as={FaDiscord}  w="30px" h="30px" />
                    </Link>
                    <Link href="https://chargedefi.medium.com" target="_blank"  >
                        <Icon as={AiOutlineMedium}  w="35px" h="35px"/>
                    </Link>
                    <Link href="https://docs.chargedefi.fi/"  target="_blank" >
                        <Image src={mode("https://www.svgrepo.com/show/330505/gitbook.svg", "https://i.imgur.com/1h1N9Rp.png")}
                               bgColor={mode('transparent', 'transparent')}  w="100%" h="40px" minW="100%" maxW="100%"/>
                    </Link>
                    <Link  href="https://www.chargedefi.fi/charge_whitepaper.pdf" target="_blank" >
                        <Icon as={FaClipboardList} w="30px" h="30px"  />
                    </Link>
                    <Link  href="https://www.youtube.com/channel/UCi60sDOAOOMS7UrXLrsuk_Q" target="_blank">
                        <Icon as={FaYoutube} w="30px" h="30px"  />
                    </Link>
                    <Link href="https://www.certik.com/projects/chargedefi"  target="_blank" >
                        <Image src={mode("https://www.chargedefi.fi/static/media/certik-icon.37c78b75.png", certikWhite)}
                               minW="100%" maxW="100%" w="100%" h="30px"/>
                    </Link>
                </HStack>
            </Flex>
        </>
    )
};


export default Footer;
