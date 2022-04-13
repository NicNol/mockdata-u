import React from "react";
import { Flex, Heading, Link } from "@chakra-ui/react";

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
                <Link>Home</Link>
            </Flex>
            <Flex direction={"column"}>
                <Heading size={"sm"}>Mock Data</Heading>
                <Link>Student Data</Link>
                <Link>Class Data</Link>
                <Link>University Data</Link>
            </Flex>
            {children}
        </Flex>
    );
}
