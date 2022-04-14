import React from "react";
import { HStack, Button, Input, useNumberInput } from "@chakra-ui/react";

export default function NumberInput() {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 1,
            min: 1,
            max: 200,
            precision: 0,
        });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();

    return (
        <HStack>
            <Button {...dec} w={6}>
                -
            </Button>
            <Input {...input} w={16} textAlign={"center"} />
            <Button {...inc} w={6}>
                +
            </Button>
        </HStack>
    );
}
