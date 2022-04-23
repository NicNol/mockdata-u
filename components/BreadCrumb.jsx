import React from "react";
import { Flex, Icon, Link } from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function BreadCrumb({ currentPageName }) {
    return (
        <Flex alignItems={"center"} alignSelf={"flex-start"}>
            <NextLink href={"/"} passHref>
                <Link
                    color={"#0083b0cc"}
                    _hover={{ color: "#0083b0ee" }}
                    _active={{ color: "#0083b0ff" }}
                    fontWeight={"bold"}
                    textDecoration={"underline"}
                >
                    Home
                </Link>
            </NextLink>
            <Icon
                as={MdOutlineKeyboardArrowRight}
                w={6}
                h={6}
                position={"relative"}
                top={"2px"}
            />{" "}
            {currentPageName}
        </Flex>
    );
}
