import React, { useState } from "react";
import { Button, Collapse, Flex, Switch, Text } from "@chakra-ui/react";
import NumberInput from "./NumberInput";

export default function UniversitySettings({
    factorySize,
    setFactorySize,
    toggles,
    toggleValues,
}) {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);
    const { setShowTitle, setShowStreetAddress, setShowCityStateZip } = toggles;
    const {
        showTitle,
        showDepartment: showStreetAddress,
        showQuarter: showCityStateZip,
    } = toggleValues;

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
                        <Text>Display Institution Name?</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                        <Switch
                            size={"md"}
                            isChecked={showStreetAddress}
                            onChange={() =>
                                setShowStreetAddress(!showStreetAddress)
                            }
                        />
                        <Text>Display Street Address?</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                        <Switch
                            size={"md"}
                            isChecked={showCityStateZip}
                            onChange={() =>
                                setShowCityStateZip(!showCityStateZip)
                            }
                        />
                        <Text>Display City, State, and Zip Code?</Text>
                    </Flex>
                </Flex>
            </Collapse>
        </Flex>
    );
}
