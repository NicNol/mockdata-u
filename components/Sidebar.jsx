import React from "react";
import { Flex, Heading, Link } from "@chakra-ui/react";
import { default as NextLink } from "next/link";

export default function Sidebar({ children }) {
    return (
        <Flex
            maxW={"300px"}
            w={"100%"}
            h={"100%"}
            bg={"#0083b022"}
            flexDirection={"column"}
            py={4}
            px={4}
            gap={4}
            color={"#222"}
        >
            <Flex direction={"column"}>
                <Heading size={"sm"}>Navigation</Heading>
                <NextLink href={"/"} passHref>
                    <Link>Home</Link>
                </NextLink>
            </Flex>
            <Flex direction={"column"}>
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
            </Flex>
            {children}
        </Flex>
    );
}
