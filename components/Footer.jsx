import React from "react";
import { Flex, Heading, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { IoSchoolSharp } from "react-icons/io5";
import { default as NextLink } from "next/link";

export default function Footer() {
    return (
        <Flex
            bg={"#000"}
            w={"100%"}
            bgGradient={"linear-gradient(to top, #141e30, #243b55)"}
            pt={16}
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
                <Stack color={"white"}>
                    <Heading size={"sm"}>API Documentation</Heading>
                    <NextLink
                        href={"https://github.com/NicNol/mockdata-u#api-calls"}
                        passHref
                    >
                        <Link isExternal>Mock Data</Link>
                    </NextLink>
                    <NextLink
                        href={
                            "https://github.com/NicNol/mockdata-u/tree/main/pages/api/pie-chart#api-calls"
                        }
                        passHref
                    >
                        <Link isExternal>Pie Chart Microservice</Link>
                    </NextLink>
                </Stack>
            </Flex>
            <Text color={"white"} size={"xs"} my={16}>
                MockData U. is an open source project by Nic Nolan.{" "}
                <NextLink
                    href={"https://github.com/NicNol/mockdata-u"}
                    passHref
                >
                    <Link isExternal fontStyle={"italic"}>
                        View the source code on GitHub.
                    </Link>
                </NextLink>
            </Text>
        </Flex>
    );
}
