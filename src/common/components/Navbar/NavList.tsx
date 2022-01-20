import React from 'react'
import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { HTMLMotionProps, motion, Variants } from 'framer-motion'

export type MotionListProps = HTMLChakraProps<'ul'> & HTMLMotionProps<'ul'>
export const MotionList = motion<MotionListProps>(chakra.ul)

export const NavList = (props: MotionListProps) => (
    <MotionList opacity="0" initial="init" variants={variants} {...props} />
)

const variants: Variants = {
    init: {
        opacity: 0,
        y: -4,
        display: 'none',
        transition: { duration: 0 },
    },
    enter: {
        opacity: 1,
        y: 0,
        display: 'block',
        transition: {
            duration: 0.15,
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        y: -4,
        transition: { duration: 0.1 },
        transitionEnd: {
            display: 'none',
        },
    },
}
