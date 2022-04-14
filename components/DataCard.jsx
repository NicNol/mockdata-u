import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

export default function DataCard() {
    return (
        <Flex w={"100%"} maxW={"800px"}>
            <Flex
                bg={"#0083b022"}
                flexDirection={"column"}
                borderRadius={8}
                w={"100%"}
                shadow={"md"}
                border={"#0083b044 solid 1px"}
                alignItems={"center"}
                py={8}
            >
                <Heading color={"141e30"}>FirstName LastName</Heading>
                <Text color={"#666666"}>Email@university.edu</Text>
                <Text color={"#666666"}>ID: 123-456-789</Text>
            </Flex>
        </Flex>
    );
}
