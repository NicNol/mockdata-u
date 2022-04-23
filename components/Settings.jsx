import React, { useState } from "react";
import { Button, Collapse, Flex, Switch, Text } from "@chakra-ui/react";
import NumberInput from "./NumberInput";

export default function Settings({
    factorySize,
    setFactorySize,
    toggles,
    toggleValues,
}) {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);
    const { setShowTitle, setShowEmail, setShowIdNumber } = toggles;
    const { showTitle, showEmail, showIdNumber } = toggleValues;

    return (
        <Flex flexDirection={"column"}>
            <Button onClick={handleToggle} w={48} alignSelf={"flex-end"}>
                {show ? "Collapse" : "Show"} Settings
            </Button>
            <Collapse startingHeight={0} in={show}>
                <Flex flexDirection={"column"} gap={2} my={4} ml={2}>
                    <Flex alignItems={"center"} gap={2}>
                        <Text>Objects to Mock:</Text>
                        <NumberInput
                            setFactorySize={setFactorySize}
                            factorySize={factorySize}
                        />
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                        <Switch
                            size={"md"}
                            isChecked={showTitle}
                            onChange={() => setShowTitle(!showTitle)}
                        />
                        <Text>Display First Name and Last Name?</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                        <Switch
                            size={"md"}
                            isChecked={showEmail}
                            onChange={() => setShowEmail(!showEmail)}
                        />
                        <Text>Display Email Address?</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                        <Switch
                            size={"md"}
                            isChecked={showIdNumber}
                            onChange={() => setShowIdNumber(!showIdNumber)}
                        />
                        <Text>Display Student ID Number?</Text>
                    </Flex>
                </Flex>
            </Collapse>
        </Flex>
    );
}
