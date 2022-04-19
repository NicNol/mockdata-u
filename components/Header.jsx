import React from "react";
import { Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { IoSchoolSharp } from "react-icons/io5";
import { default as NextLink } from "next/link";

export default function Header() {
    return (
        <Flex
            bg={"#000"}
            w={"100%"}
            bgGradient={"linear-gradient(to bottom, #141e30, #243b55)"}
            flexDirection={"column"}
            py={4}
        >
            <Flex gap={4} w={"100%"} justifyContent={"center"}>
                <Icon color={"white"} w={12} h={12} as={IoSchoolSharp} />
                <NextLink href={"/"} passHref>
                    <Link>
                        <Heading
                            bgGradient={
                                "linear-gradient(to top, #00b4db, #0083b0)"
                            }
                            bgClip={"text"}
                            userSelect={"none"}
                        >
                            MockData U.
                        </Heading>
                    </Link>
                </NextLink>
            </Flex>
        </Flex>
    );
}
