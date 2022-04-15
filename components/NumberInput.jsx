import React from "react";
import { HStack, Button, Input } from "@chakra-ui/react";

export default function NumberInput({ factorySize, setFactorySize }) {
    const checkForValidityOnBlur = () => {
        const currentVal = document.getElementById("factoryInputBox").value;
        if (currentVal === "" || currentVal === "0") {
            document.getElementById("factoryInputBox").value = 1;
            setFactorySize(1);
        }
        if (parseInt(currentVal) < 1) {
            document.getElementById("factoryInputBox").value = 1;
            setFactorySize(1);
        }
        if (parseInt(currentVal) > 200) {
            document.getElementById("factoryInputBox").value = 200;
            setFactorySize(200);
        }
    };

    const sanitizeInputOnChange = () => {
        const newVal = parseInt(
            document
                .getElementById("factoryInputBox")
                .value.replace(/[^0-9.]/g, "")
        );
        setFactorySize(newVal);
    };

    function handleButtonPress(step) {
        const min = 1;
        const max = 200;
        if (factorySize + step >= min && factorySize + step <= max) {
            document.getElementById("factoryInputBox").value =
                factorySize + step;
            setFactorySize(factorySize + step);
        }
    }

    return (
        <HStack>
            <Button w={6} onClick={() => handleButtonPress(-1)}>
                -
            </Button>
            <Input
                id={"factoryInputBox"}
                w={16}
                textAlign={"center"}
                onChange={sanitizeInputOnChange}
                onBlur={checkForValidityOnBlur}
                defaultValue={1}
                min={1}
                max={200}
                type={"number"}
            />
            <Button w={6} onClick={() => handleButtonPress(1)}>
                +
            </Button>
        </HStack>
    );
}
