import React from "react";
import { CloseButton, Flex, Heading, Text } from "@chakra-ui/react";
import CopyButton from "./CopyButton";
import DataCardContextMenu from "./DataCardContextMenu";

export default function DataCard({ title, textArray, deleteCard }) {
    const content = textArray.reduce(
        (previous, current) => `${previous}\n${current}`,
        title
    );

    return (
        <Flex w={"100%"} maxW={"800px"} px={4} my={4}>
            <Flex
                bg={"#0083b022"}
                borderRadius={8}
                w={"100%"}
                shadow={"md"}
                border={"#0083b044 solid 1px"}
            >
                <Flex
                    alignItems={"center"}
                    flexGrow={1}
                    flexDirection={"column"}
                >
                    <Flex flexDirection={"row-reverse"} w={"100%"}>
                        <DataCardContextMenu
                            content={content}
                            deleteCard={deleteCard}
                        />
                    </Flex>
                    <Flex w={"100%"} pb={8}>
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
        </Flex>
    );
}
