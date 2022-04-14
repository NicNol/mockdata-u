import React from "react";
import { Flex, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";

export default function HomeCard({ title, description }) {
    return (
        <Flex w={"100%"} maxW={"800px"}>
            <LinkBox w={"100%"}>
                <Flex
                    bg={"#0083b022"}
                    flexDirection={"column"}
                    borderRadius={8}
                    w={"100%"}
                    shadow={"md"}
                    border={"#0083b044 solid 1px"}
                    alignItems={"center"}
                    py={8}
                    _hover={{ backgroundColor: "#0083b044" }}
                    _active={{ backgroundColor: "#0083b066" }}
                    transition={"background-color .25s"}
                >
                    <LinkOverlay href="#">
                        <Heading color={"141e30"}>{title}</Heading>
                    </LinkOverlay>
                    <Text color={"#666666"}>{description}</Text>
                </Flex>
            </LinkBox>
        </Flex>
    );
}
