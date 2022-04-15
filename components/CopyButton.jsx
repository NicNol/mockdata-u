import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { IoCopyOutline } from "react-icons/io5";

export default function CopyButton() {
    return (
        <Flex
            w={"100%"}
            maxW={"100px"}
            alignItems={"center"}
            flexDirection={"column"}
            color={"#0083b044"}
        >
            <Icon as={IoCopyOutline} w={16} h={16} />
            <Text size={"xs"} position={"relative"} bottom={10} left={1}>
                Copy
            </Text>
        </Flex>
    );
}
