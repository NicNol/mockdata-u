import React, { useState } from "react";
import { Box, Button, Collapse, Flex, Switch, Text } from "@chakra-ui/react";
import NumberInput from "./NumberInput";

export default function Settings() {
    const [show, setShow] = useState(true);

    const handleToggle = () => setShow(!show);

    return (
        <>
            <Box w={"100%"}>
                <Button onClick={handleToggle} w={48}>
                    {show ? "Collapse" : "Show"} Settings
                </Button>
                <Collapse startingHeight={0} in={show}>
                    <Flex flexDirection={"column"} gap={2} my={4}>
                        <Flex alignItems={"center"} gap={2}>
                            <Text>Objects to Mock:</Text>
                            <NumberInput />
                        </Flex>
                        <Flex alignItems={"center"} gap={2}>
                            <Switch size={"md"} />
                            <Text>Display First Name and Last Name?</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={2}>
                            <Switch size={"md"} />
                            <Text>Display Email Address?</Text>
                        </Flex>
                        <Flex alignItems={"center"} gap={2}>
                            <Switch size={"md"} />
                            <Text>Display Student ID Number?</Text>
                        </Flex>
                    </Flex>
                </Collapse>
            </Box>
        </>
    );
}
