import React, { useState } from "react";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import copy from "copy-to-clipboard";

export default function DataButtonGroup({
    data,
    setData,
    factory,
    factorySize,
}) {
    const contentStringArray = data.map((object) => {
        return Object.keys(object).reduce(
            (previous, current) => `${previous}${object[current]}\n`,
            ""
        );
    });

    const content = contentStringArray.reduce(
        (previous, current) => `${previous}${current}\n`,
        ""
    );
    const [openStatus, setOpenStatus] = useState(false);

    function handleCopy() {
        copy(content);
        setOpenStatus(true);
        setTimeout(() => setOpenStatus(false), 2000);
    }

    return (
        <Flex
            w={"100%"}
            maxW={"800px"}
            justifyContent={"center"}
            gap={4}
            flexWrap={"wrap"}
        >
            <Tooltip
                label={"Copied to Clipboard!"}
                placement={"top"}
                hasArrow
                isOpen={openStatus}
                gutter={4}
                bgGradient={"linear-gradient(to top, #141e30, #243b55)"}
            >
                <Button flexGrow={1} onClick={() => handleCopy()}>
                    Copy All Data
                </Button>
            </Tooltip>
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
