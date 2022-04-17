import React from "react";
import { Flex, Heading, Icon, Link, Stack } from "@chakra-ui/react";
import { IoSchoolSharp } from "react-icons/io5";
import { default as NextLink } from "next/link";

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
                        <NextLink href={"/"} passHref>
                            <Link>Home</Link>
                        </NextLink>
                    </Flex>
                </Stack>
                <Stack color={"white"}>
                    <Heading size={"sm"}>Mock Data</Heading>
                    <NextLink href={"/mock-student"} passHref>
                        <Link>Student Data</Link>
                    </NextLink>
                    <NextLink href={"/mock-class"} passHref>
                        <Link>Class Data</Link>
                    </NextLink>
                    <NextLink href={"/mock-university"} passHref>
                        <Link>University Data</Link>
                    </NextLink>
                </Stack>
            </Flex>
        </Flex>
    );
}
