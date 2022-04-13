import React from "react";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { IoSchoolSharp } from "react-icons/io5";

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
                <Heading
                    bgGradient={"linear-gradient(to top, #00b4db, #0083b0)"}
                    bgClip={"text"}
                >
                    MockData U.
                </Heading>
            </Flex>
        </Flex>
    );
}
