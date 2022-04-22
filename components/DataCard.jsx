import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import CopyButton from "./CopyButton";

export default function DataCard({ title, textArray }) {
    const content = textArray.reduce(
        (previous, current) => `${previous}\n${current}`,
        title
    );

    return (
        <Flex w={"100%"} maxW={"800px"} px={4}>
            <Flex
                bg={"#0083b022"}
                flexDirection={"column"}
                borderRadius={8}
                w={"100%"}
                shadow={"md"}
                border={"#0083b044 solid 1px"}
                alignItems={"center"}
                py={8}
                flexGrow={1}
            >
                <Flex w={"100%"}>
                    <CopyButton content={content} />
                    <Flex flexDirection={"column"} flexGrow={1}>
                        <Heading size={"md"} color={"141e30"}>
                            {title}
                        </Heading>
                        {textArray.map((text) => (
                            <Text key={text} color={"#666666"}>
                                {text}
                            </Text>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
