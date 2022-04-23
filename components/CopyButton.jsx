import React, { useState } from "react";
import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { IoCopyOutline } from "react-icons/io5";
import copy from "copy-to-clipboard";

export default function CopyButton({ content }) {
    const [openStatus, setOpenStatus] = useState(false);

    function handleCopy() {
        copy(content);
        setOpenStatus(true);
        setTimeout(() => setOpenStatus(false), 2000);
    }

    return (
        <Tooltip
            label={"Copied to Clipboard!"}
            placement={"top"}
            hasArrow
            isOpen={openStatus}
            gutter={4}
            bgGradient={"linear-gradient(to top, #141e30, #243b55)"}
        >
            <Flex
                w={"100%"}
                maxW={"100px"}
                alignItems={"center"}
                flexDirection={"column"}
                color={"#0083b044"}
                _hover={{
                    cursor: "pointer",
                    userSelect: "none",
                    color: "#0083b088",
                }}
                _active={{ color: "#0083b0cc" }}
                onClick={() => handleCopy()}
                transition={".25s"}
            >
                <Icon as={IoCopyOutline} w={16} h={16} />
                <Text size={"xs"} position={"relative"} bottom={10} left={1}>
                    Copy
                </Text>
            </Flex>
        </Tooltip>
    );
}
