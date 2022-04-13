import React from "react";
import { Flex, Heading, Icon, Link, Stack } from "@chakra-ui/react";
import { IoSchoolSharp } from "react-icons/io5";

export default function Footer() {
    return (
        <Flex
            bg={"#000"}
            w={"100%"}
            bgGradient={"linear-gradient(to top, #141e30, #243b55)"}
            py={16}
            alignItems={"center"}
            flexDirection={"column"}
            gap={4}
        >
            <Flex gap={4}>
                <Icon color={"white"} w={6} h={6} as={IoSchoolSharp} />
                <Heading color={"white"} size={"md"}>
                    MockData U.
                </Heading>
            </Flex>
            <Flex gap={16}>
                <Stack>
                    <Flex color={"white"}>
                        <Link>Home</Link>
                    </Flex>
                </Stack>
                <Stack color={"white"}>
                    <Heading size={"sm"}>Mock Data</Heading>
                    <Link>Student Data</Link>
                    <Link>Class Data</Link>
                    <Link>University Data</Link>
                </Stack>
            </Flex>
        </Flex>
    );
}
