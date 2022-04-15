import React from "react";
import { Button, Flex } from "@chakra-ui/react";

export default function DataButtonGroup({
    data,
    setData,
    factory,
    factorySize,
}) {
    return (
        <Flex
            w={"100%"}
            maxW={"800px"}
            justifyContent={"center"}
            gap={4}
            flexWrap={"wrap"}
        >
            <Button flexGrow={1}>Copy All Data</Button>
            <Button
                flexGrow={1}
                onClick={() => setData([...factory(factorySize), ...data])}
            >
                Mock More Data
            </Button>
            <Button flexGrow={1} onClick={() => setData([])}>
                Delete All Data
            </Button>
        </Flex>
    );
}
