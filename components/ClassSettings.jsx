import React, { useState } from "react";
import { Button, Collapse, Flex, Switch, Text } from "@chakra-ui/react";
import NumberInput from "./NumberInput";

export default function ClassSettings({
    factorySize,
    setFactorySize,
    toggles,
    toggleValues,
}) {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);
    const {
        setShowTitle,
        setShowDepartment,
        setShowQuarter,
        setShowInstructor,
    } = toggles;
    const { showTitle, showDepartment, showQuarter, showInstructor } =
        toggleValues;

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
                        <Text>Display Course Number?</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                        <Switch
                            size={"md"}
                            isChecked={showDepartment}
                            onChange={() => setShowDepartment(!showDepartment)}
                        />
                        <Text>Display Department?</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                        <Switch
                            size={"md"}
                            isChecked={showQuarter}
                            onChange={() => setShowQuarter(!showQuarter)}
                        />
                        <Text>Display Quarter?</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                        <Switch
                            size={"md"}
                            isChecked={showInstructor}
                            onChange={() => setShowInstructor(!showInstructor)}
                        />
                        <Text>Display Instructor?</Text>
                    </Flex>
                </Flex>
            </Collapse>
        </Flex>
    );
}
